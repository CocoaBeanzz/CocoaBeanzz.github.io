// Band audition, as Kouncil's playback engine does it (audioengine.py's
// Renderer._band_passed and playbacklib.PeakGuard), ported to an AudioWorklet.
//
// Messages in:  {band: [loHz, hiHz] | null}, {smooth: bool}, {guard: bool}
// Messages out: {bandPeak, guardDb, overs} about every 50 ms

// Kouncil renders 1024-sample blocks; a worklet gets 128. The filter still
// steps once per 1024 samples, crossfading across all eight quanta, so the
// glide sounds the same as in the app.
const STEP = 1024;
// How far the edges move toward the target each step, in log frequency.
const FILTER_GLIDE = 0.33;
// Turning the filter on or off fades the output in from silence over 10 ms.
const SWITCH_FADE_S = 0.01;
const CEILING = 0.999;
const LOOKAHEAD_S = 0.005;
const HOLD_S = 0.05;

// ── Filter design ────────────────────────────────────────────────────────────

// Complex numbers as [re, im].
const cAdd = (a, b) => [a[0] + b[0], a[1] + b[1]];
const cSub = (a, b) => [a[0] - b[0], a[1] - b[1]];
const cMul = (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]];
const cDiv = (a, b) => {
  const d = b[0] * b[0] + b[1] * b[1];
  return [(a[0] * b[0] + a[1] * b[1]) / d, (a[1] * b[0] - a[0] * b[1]) / d];
};
const cSqrt = (a) => {
  const r = Math.hypot(a[0], a[1]);
  const re = Math.sqrt((r + a[0]) / 2);
  const im = Math.sqrt(Math.max(0, (r - a[0]) / 2));
  return [re, a[1] < 0 ? -im : im];
};
const cAbs = (a) => Math.hypot(a[0], a[1]);

// Third-order Butterworth band-pass as three biquads, each [b0, b1, b2, a1, a2]:
// the same filter as scipy's butter(3, [lo, hi], 'band', output='sos').
// Analog prototype poles, moved to a band-pass around sqrt(w1 * w2) and then
// to the z plane with the bilinear transform, edges prewarped so they land
// where asked.
function butterBand(lo, hi, fs) {
  const fs2 = 2 * fs;
  const w1 = fs2 * Math.tan(Math.PI * lo / fs);
  const w2 = fs2 * Math.tan(Math.PI * hi / fs);
  const bw = w2 - w1;
  const w0sq = w1 * w2;
  const toZ = (s) => cDiv(cAdd([fs2, 0], s), cSub([fs2, 0], s));
  // Each prototype pole p becomes the two roots of s^2 - p*bw*s + w0^2.
  const bandRoots = (p) => {
    const pb = [p[0] * bw, p[1] * bw];
    const disc = cSqrt(cSub(cMul(pb, pb), [4 * w0sq, 0]));
    return [cMul(cAdd(pb, disc), [0.5, 0]), cMul(cSub(pb, disc), [0.5, 0])];
  };
  // Prototype poles at 120, 180 and 240 degrees. The 240 one is the 120
  // one's conjugate, so its roots are the conjugates of the 120 one's.
  const upper = bandRoots([Math.cos(2 * Math.PI / 3), Math.sin(2 * Math.PI / 3)]).map(toZ);
  const real = bandRoots([-1, 0]).map(toZ);
  const pairs = [
    [upper[0], [upper[0][0], -upper[0][1]]],
    [upper[1], [upper[1][0], -upper[1][1]]],
    real,
  ];
  // Every section gets one zero at z = 1 and one at z = -1 (1 - z^-2).
  const sections = pairs.map(([r1, r2]) => [1, 0, -1, -(r1[0] + r2[0]), cMul(r1, r2)[0]]);
  // Unity gain at the center frequency, shared evenly between the sections.
  const wc = 2 * Math.atan(Math.sqrt(w0sq) / fs2);
  const z1 = [Math.cos(wc), -Math.sin(wc)];       // z^-1
  const z2 = cMul(z1, z1);
  let mag = 1;
  for (const [b0, b1, b2, a1, a2] of sections) {
    const num = cAdd(cAdd([b0, 0], cMul([b1, 0], z1)), cMul([b2, 0], z2));
    const den = cAdd(cAdd([1, 0], cMul([a1, 0], z1)), cMul([a2, 0], z2));
    mag *= cAbs(num) / cAbs(den);
  }
  const k = Math.cbrt(1 / mag);
  for (const s of sections) { s[0] *= k; s[1] *= k; s[2] *= k; }
  return sections;
}

// A cascade of biquads over two channels, transposed direct form II like
// scipy's sosfilt. New filters start from silence (zero state).
class Cascade {
  constructor(sections) {
    this.sections = sections;
    this.state = sections.map(() => new Float64Array(4));   // z1, z2 for L and R
  }
  run(x, ch) {
    for (let i = 0; i < this.sections.length; i++) {
      const [b0, b1, b2, a1, a2] = this.sections[i];
      const z = this.state[i];
      const o = ch * 2;
      const y = b0 * x + z[o];
      z[o] = b1 * x - a1 * y + z[o + 1];
      z[o + 1] = b2 * x - a2 * y;
      x = y;
    }
    return x;
  }
}

// ── Peak guard ───────────────────────────────────────────────────────────────

// playbacklib.PeakGuard one sample at a time. For each sample the gain it
// needs is min(1, ceiling / peak). Held: the lowest of those from `hold`
// before the sample to `lookahead` after it, so one dip covers a whole note.
// Gain: the mean of the held values over the `lookahead` samples up to it,
// so the dip ramps down before the peak instead of stepping. The output is
// late by `lookahead` samples, always, so switching the guard never jumps.
class PeakGuard {
  constructor(fs) {
    this.ahead = Math.max(1, Math.round(fs * LOOKAHEAD_S));
    this.window = Math.round(fs * HOLD_S) + this.ahead + 1;
    // Sliding minimum: a monotonic queue of (sample index, needed gain).
    this.qIdx = new Float64Array(this.window + 1);
    this.qVal = new Float64Array(this.window + 1);
    this.qHead = 0; this.qLen = 0;
    // The last ahead + 1 held values, and their sum, for the ramp.
    this.held = new Float64Array(this.ahead + 1).fill(1);
    this.heldSum = this.ahead + 1;
    this.heldPos = 0;
    // The audio itself, delayed by `ahead`.
    this.delay = [new Float32Array(this.ahead), new Float32Array(this.ahead)];
    this.delayPos = 0;
    this.n = 0;
  }
  // Takes one stereo frame; returns the gain for the frame `ahead` back and
  // leaves that frame's delayed samples in this.outL / this.outR.
  push(l, r) {
    const need = Math.min(1, CEILING / Math.max(Math.abs(l), Math.abs(r), 1e-9));
    const cap = this.qIdx.length;
    while (this.qLen && this.qVal[(this.qHead + this.qLen - 1) % cap] >= need) this.qLen--;
    this.qIdx[(this.qHead + this.qLen) % cap] = this.n;
    this.qVal[(this.qHead + this.qLen) % cap] = need;
    this.qLen++;
    while (this.qIdx[this.qHead] <= this.n - this.window) { this.qHead = (this.qHead + 1) % cap; this.qLen--; }
    const heldNow = this.qVal[this.qHead];
    this.heldSum += heldNow - this.held[this.heldPos];
    this.held[this.heldPos] = heldNow;
    this.heldPos = (this.heldPos + 1) % this.held.length;
    this.n++;
    this.outL = this.delay[0][this.delayPos];
    this.outR = this.delay[1][this.delayPos];
    this.delay[0][this.delayPos] = l;
    this.delay[1][this.delayPos] = r;
    this.delayPos = (this.delayPos + 1) % this.ahead;
    // Floating-point drift in the running sum can leave 1 + 1e-16.
    return Math.min(1, this.heldSum / this.held.length);
  }
}

// ── The processor ────────────────────────────────────────────────────────────

class BandAudition extends AudioWorkletProcessor {
  constructor() {
    super();
    this.fs = sampleRate;
    this.target = null;       // [lo, hi] while a band is held, else null
    this.smooth = true;
    this.guardOn = true;
    this.running = null;      // {edges, filter}
    this.incoming = null;     // the filter being crossfaded to during a step
    this.stepPos = 0;
    this.fade = 1;            // output fade after an on / off switch, 0..1
    this.fadeStep = 1 / (SWITCH_FADE_S * this.fs);
    this.guard = new PeakGuard(this.fs);
    this.report = { bandPeak: 0, minGain: 1, overs: 0, count: 0 };
    this.port.onmessage = (e) => this.receive(e.data);
  }

  receive(msg) {
    if ('band' in msg) {
      const band = msg.band && [Math.max(20, msg.band[0]), Math.min(msg.band[1], this.fs * 0.49)];
      const usable = band && band[1] > band[0] * 1.01;
      if (!!usable !== !!this.target) {
        this.fade = 0;                                          // on or off: fade in from silence
        this.stepPos = 0;   // a new band starts a step, which is where its filter is made
      }
      this.target = usable ? band : null;
      if (!usable) { this.running = null; this.incoming = null; }
    }
    if ('smooth' in msg) this.smooth = msg.smooth;
    if ('guard' in msg) this.guardOn = msg.guard;
  }

  // At the start of each 1024-sample step: finish the last crossfade and,
  // if the edges still have somewhere to go, start the next one.
  beginStep() {
    if (this.incoming) { this.running = this.incoming; this.incoming = null; }
    const target = this.target;
    if (!this.running) {
      this.running = { edges: target, filter: new Cascade(butterBand(target[0], target[1], this.fs)) };
      return;
    }
    const was = this.running.edges;
    const glideTo = was.map((e, i) => e * Math.pow(target[i] / e, FILTER_GLIDE));
    if (Math.max(...glideTo.map((e, i) => Math.abs(e / was[i] - 1))) < 0.002) return;
    this.incoming = { edges: glideTo, filter: new Cascade(butterBand(glideTo[0], glideTo[1], this.fs)) };
  }

  // The naive version, for comparison: the new coefficients go straight in
  // under the running filter's state, every quantum.
  swapInPlace() {
    if (!this.running) {
      this.running = { edges: this.target, filter: new Cascade(butterBand(this.target[0], this.target[1], this.fs)) };
    } else if (this.running.edges !== this.target) {
      this.running.edges = this.target;
      this.running.filter.sections = butterBand(this.target[0], this.target[1], this.fs);
    }
    this.incoming = null;
  }

  process(inputs, outputs) {
    const input = inputs[0];
    const output = outputs[0];
    if (!output.length) return true;
    const frames = output[0].length;
    const inL = input[0] || new Float32Array(frames);
    const inR = input[1] || inL;
    const outL = output[0];
    const outR = output[1] || output[0];
    const rep = this.report;
    if (this.target && !this.smooth) this.swapInPlace();

    for (let i = 0; i < frames; i++) {
      let l = inL[i], r = inR[i];
      if (this.target) {
        if (this.smooth && this.stepPos === 0) this.beginStep();
        const run = this.running.filter;
        let fl = run.run(l, 0), fr = run.run(r, 1);
        if (this.incoming) {
          const ramp = this.stepPos / (STEP - 1);
          const nl = this.incoming.filter.run(l, 0), nr = this.incoming.filter.run(r, 1);
          fl = fl * (1 - ramp) + nl * ramp;
          fr = fr * (1 - ramp) + nr * ramp;
        }
        l = fl; r = fr;
        rep.bandPeak = Math.max(rep.bandPeak, Math.abs(l), Math.abs(r));
      }
      this.stepPos = (this.stepPos + 1) % STEP;
      if (this.fade < 1) { l *= this.fade; r *= this.fade; this.fade = Math.min(1, this.fade + this.fadeStep); }
      const gain = this.guard.push(l, r);
      let ol = this.guard.outL, or = this.guard.outR;
      if (this.guardOn) { ol *= gain; or *= gain; rep.minGain = Math.min(rep.minGain, gain); }
      if (Math.abs(ol) > 1 || Math.abs(or) > 1) rep.overs++;
      outL[i] = ol;
      if (output[1]) outR[i] = or;
    }

    rep.count += frames;
    if (rep.count >= this.fs * 0.05) {
      this.port.postMessage({
        bandPeak: this.target ? rep.bandPeak : null,
        guardDb: 20 * Math.log10(rep.minGain),
        overs: rep.overs,
      });
      this.report = { bandPeak: 0, minGain: 1, overs: 0, count: 0 };
    }
    return true;
  }
}

registerProcessor('band-audition', BandAudition);
