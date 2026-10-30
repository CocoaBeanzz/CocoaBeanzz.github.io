// The band audition demo on the Kouncil Band Audition post. Press and drag on
// the spectrum: x is the band's center, y its width, as in the app (7.5
// octaves at the bottom to a tenth of one at the top). The audio work is in
// worklet.js; this file draws the plot and passes the pointer along.
(function () {
  // The clip's average spectrum, dB relative to its loudest point, at 160
  // log-spaced points from 20 Hz to 20 kHz (precomputed from the clip).
  const SPECTRUM = [-29.3,-28.8,-28.3,-27.6,-27.6,-26.0,-25.1,-24.3,-23.1,-23.1,-23.1,-19.3,-17.4,-17.4,-17.4,-11.7,-9.7,-9.7,-6.0,-3.8,-3.8,-0.8,-0.8,-0.8,0.0,0.0,-0.4,-0.9,-1.5,-2.3,-2.6,-2.9,-2.5,-1.6,-1.2,-0.7,-0.3,-1.2,-1.2,-3.1,-5.1,-7.5,-7.8,-8.6,-9.0,-9.3,-9.9,-10.0,-9.9,-10.2,-11.5,-11.8,-11.6,-12.5,-13.0,-13.3,-13.6,-14.5,-14.3,-15.0,-16.5,-17.3,-17.7,-18.7,-19.9,-19.8,-20.6,-21.2,-21.1,-21.1,-20.3,-20.4,-20.5,-22.6,-19.2,-19.4,-19.6,-18.2,-18.5,-18.5,-20.8,-20.4,-21.6,-20.3,-18.6,-18.9,-21.4,-21.8,-22.3,-24.2,-23.0,-23.2,-24.1,-24.9,-25.1,-25.0,-25.4,-25.4,-26.0,-25.7,-24.9,-25.3,-26.0,-26.1,-26.1,-26.4,-26.1,-26.4,-26.8,-27.4,-28.0,-27.8,-28.0,-28.5,-28.6,-28.0,-27.9,-29.4,-31.0,-31.6,-32.1,-32.2,-32.3,-32.7,-33.1,-33.7,-34.1,-34.0,-34.7,-35.3,-35.4,-34.9,-35.0,-35.1,-36.2,-36.7,-37.0,-37.0,-37.2,-37.4,-37.8,-38.1,-38.4,-39.1,-39.9,-40.8,-40.8,-41.3,-41.3,-42.0,-42.8,-44.3,-46.0,-47.7,-50.6,-52.4,-54.5,-56.9,-62.1,-93.9];
  const F_LO = 20, F_HI = 20000, DB_FLOOR = -66;
  const xToHz = (fx) => F_LO * Math.pow(F_HI / F_LO, fx);
  const hzToX = (hz) => Math.log(hz / F_LO) / Math.log(F_HI / F_LO);

  document.querySelectorAll('.band-demo').forEach(function (root) {
    const canvas = root.querySelector('canvas');
    const playBtn = root.querySelector('.band-demo-play');
    const smoothBox = root.querySelector('.band-demo-smooth');
    const guardBox = root.querySelector('.band-demo-guard');
    const volumeSlider = root.querySelector('.band-demo-volume');
    const readout = root.querySelector('.band-demo-readout');
    let ctx = null, node = null, volume = null, source = null, buffer = null;
    let band = null;          // [lo, hi, center] while pressed
    let shownPeak = null, shownGuard = 0, heldUntil = 0;

    function draw() {
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.clientWidth, h = canvas.clientHeight;
      if (canvas.width !== Math.round(w * dpr)) { canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr); }
      const g = canvas.getContext('2d');
      const css = getComputedStyle(root);
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
      g.clearRect(0, 0, w, h);
      g.font = '11px ' + css.fontFamily;
      g.fillStyle = g.strokeStyle = css.getPropertyValue('--text-dim');
      g.globalAlpha = 0.35;
      [100, 1000, 10000].forEach(function (hz) {
        const x = hzToX(hz) * w;
        g.fillRect(Math.round(x), 0, 1, h);
        g.globalAlpha = 1; g.fillText(hz >= 1000 ? hz / 1000 + 'k' : String(hz), x + 4, h - 6); g.globalAlpha = 0.35;
      });
      g.globalAlpha = 1;
      if (band) {
        const x0 = hzToX(band[0]) * w, x1 = hzToX(band[1]) * w;
        g.fillStyle = css.getPropertyValue('--accent');
        g.globalAlpha = 0.25; g.fillRect(x0, 0, x1 - x0, h);
        g.globalAlpha = 1; g.fillRect(Math.round(hzToX(band[2]) * w), 0, 1, h);
      }
      g.strokeStyle = css.getPropertyValue('--text');
      g.lineWidth = 1.5;
      g.beginPath();
      SPECTRUM.forEach(function (db, i) {
        const x = i / (SPECTRUM.length - 1) * w;
        const y = Math.min(1, db / DB_FLOOR) * h;
        i ? g.lineTo(x, y) : g.moveTo(x, y);
      });
      g.stroke();
    }

    function setBand(e) {
      const r = canvas.getBoundingClientRect();
      const fx = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width));
      const fromBottom = Math.max(0, Math.min(1, 1 - (e.clientY - r.top) / r.height));
      const center = xToHz(fx);
      const octaves = 7.5 - fromBottom * 7.4;
      band = [center * Math.pow(2, -octaves / 2), center * Math.pow(2, octaves / 2), center];
      if (node) node.port.postMessage({ band: [band[0], band[1]] });
      draw();
    }

    function showReport(msg) {
      const now = performance.now();
      // Hold the loudest reading for a second so it can be read.
      if (msg.bandPeak !== null && (shownPeak === null || msg.bandPeak > shownPeak || now > heldUntil)) {
        shownPeak = msg.bandPeak; heldUntil = now + 1000;
      }
      if (msg.guardDb < shownGuard || now > heldUntil) shownGuard = msg.guardDb;
      if (!band) { readout.textContent = 'Press and drag on the spectrum'; shownPeak = null; return; }
      const db = 20 * Math.log10(Math.max(shownPeak, 1e-6));
      let text = Math.round(band[0]) + ' Hz to ' + Math.round(band[1]) + ' Hz, band peak ' + (db > 0 ? '+' : '') + db.toFixed(1) + ' dBFS';
      if (guardBox.checked && shownGuard < -0.05) text += ', guard ' + shownGuard.toFixed(1) + ' dB';
      if (!guardBox.checked && msg.overs) text += ', clipping';
      readout.textContent = text;
    }

    async function start() {
      if (!ctx) {
        ctx = new AudioContext();
        await ctx.audioWorklet.addModule(root.dataset.worklet);
        node = new AudioWorkletNode(ctx, 'band-audition', { outputChannelCount: [2] });
        // Volume comes after the guard, as Kouncil's fader does: the guard
        // and the readout see the band itself, not the listening level.
        volume = ctx.createGain();
        volume.gain.value = sliderGain();
        node.connect(volume).connect(ctx.destination);
        node.port.onmessage = function (e) { showReport(e.data); };
        node.port.postMessage({ smooth: smoothBox.checked, guard: guardBox.checked });
        const data = await (await fetch(root.dataset.audio)).arrayBuffer();
        buffer = await ctx.decodeAudioData(data);
      }
      await ctx.resume();
      source = ctx.createBufferSource();
      source.buffer = buffer;
      source.loop = true;
      source.connect(node);
      source.start();
      playBtn.textContent = 'Stop';
      readout.textContent = 'Press and drag on the spectrum';
    }

    function stop() {
      if (source) { source.stop(); source.disconnect(); source = null; }
      playBtn.textContent = 'Play';
    }

    playBtn.addEventListener('click', function () {
      if (source) { stop(); return; }
      playBtn.disabled = true;
      start().catch(function () { readout.textContent = 'This browser can\'t run the demo.'; })
             .finally(function () { playBtn.disabled = false; });
    });
    // The slider is in dB, from -40 to 0; the bottom end is silence.
    function sliderGain() {
      const db = Number(volumeSlider.value);
      return db <= -40 ? 0 : Math.pow(10, db / 20);
    }
    volumeSlider.addEventListener('input', function () {
      if (volume) volume.gain.setTargetAtTime(sliderGain(), ctx.currentTime, 0.015);   // glide, no zipper noise
    });
    smoothBox.addEventListener('change', function () { if (node) node.port.postMessage({ smooth: smoothBox.checked }); });
    guardBox.addEventListener('change', function () { if (node) node.port.postMessage({ guard: guardBox.checked }); });

    canvas.addEventListener('pointerdown', function (e) {
      canvas.setPointerCapture(e.pointerId);
      setBand(e);
    });
    canvas.addEventListener('pointermove', function (e) { if (band) setBand(e); });
    ['pointerup', 'pointercancel'].forEach(function (type) {
      canvas.addEventListener(type, function () {
        band = null;
        if (node) node.port.postMessage({ band: null });
        draw();
      });
    });
    window.addEventListener('resize', draw);
    draw();
  });
})();
