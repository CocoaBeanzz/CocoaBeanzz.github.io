---
title: "Kouncil: Soloing a Band Without Clicks or Clipping"
date: 2026-10-02

tags: [Audio Programming, DSP, Tech, Python, Tech Overview]
project: "Kouncil"
description: "Letting a user drag a band-pass filter across a mastered track in real time: two ways it fails, and how Kouncil gets around both."
image: /docs/assets/images/projects/kouncil/posts/band-audition/band-over-full-scale.png
also_in: [dev]
published: false
---
{%- assign img = '/docs/assets/images/projects/kouncil/' | relative_url -%}

{% capture list_items %}
Overview
The Feature
Moving a Filter Without Clicking
Why a Quieter Signal Gets Louder
Picking a Fix
The Peak Guard
{% endcapture %}
{% include elements/list.html title="" type="toc" %}

#### Overview
Every spectrum chart in [Kouncil](/tools/projects/2610-kouncil) doubles as a filter.
Press on it while the track plays and you hear only that part of the spectrum.
It's the fastest way to find out what a bump, phase issue, or dynamic artifact at 3 kHz actually *is*.

A band-pass filter is about the simplest thing in DSP, so this should have been a quick feature.
It failed in two ways.
The first is a well-known problem with a well-known fix.
The second is less obvious, and says something about how mastered audio is built.

### **The Feature**
While you hold the mouse button on a spectrum, the horizontal position sets the band's center and the vertical position sets its width.
The bottom of the chart is 7.5 octaves wide, most of the spectrum.
The top is a tenth of an octave, about a single note's worth.

The band is measured in octaves around the center, half below and half above.
On the chart's logarithmic frequency axis it's then the same width wherever you put it.
*An earlier version used the center ± half the bandwidth in Hz, which is lopsided on a log axis and ran into 20 Hz at the low end.*

Band charts work the same way with a press and hold: hold on the Air band, hear the Air band.

<img src="{{ img }}posts/band-audition/band-audition.gif" alt="A drag across Kouncil's spectrum: a dashed band follows the pointer from the low end up to the top, narrows and widens as the pointer moves up and down, and settles in the mids">
A drag across the Spectrum tab while a track plays. Left and right move the band, up and down change its width.
{: .figure-caption}

The filter itself is a third-order Butterworth band-pass, as second-order sections.
It runs in Kouncil's playback process, which hands the sound card a block of 1,024 samples every 23 ms.

### **Moving a Filter Without Clicking**
A filter's output depends on its internal state, the memory of the last few samples it processed.
That state only makes sense for the coefficients that produced it.

The two obvious ways to move a filter both click:

- **Swap the coefficients and keep the state.** The old state fed through the new coefficients produces a jump in the output.
- **Swap the coefficients and reset the state.** The new filter starts from silence while the signal doesn't, which is also a jump.

A drag moves the band on every block, so either would be a constant crackle.

Kouncil does two things instead.
First, the band's edges don't jump to where the mouse is.
Each block they move a third of the remaining distance, in log frequency, so a sudden move becomes a quick glide.
That gets about four fifths of the way in four blocks, fast enough that stepping between bands on a band chart still sounds immediate.

Second, each step is a crossfade.
For one block, the audio runs through both the old filter (with its state, so it carries on undisturbed) and a new filter at the new edges.
The output fades from one to the other across the block, and the new filter becomes the running one.

The new filter does start from silence, so its first few samples are wrong.
They're also exactly where the crossfade gives it no weight.
*Hiding a filter's startup transient under the start of its own fade-in costs nothing extra.*

```python
before, _ = signal.sosfilt(running_sos, block, axis=0, zi=running_state)
after, state = signal.sosfilt(new_sos, block, axis=0, zi=silence)
ramp = np.linspace(0, 1, len(block))[:, None]
out = before * (1 - ramp) + after * ramp
```

Engaging and releasing the filter get a 10 ms fade of their own.

### **Why a Quieter Signal Gets Louder**
Even without clicks, the audition clipped.

That seems impossible at first.
A Butterworth band-pass has a flat passband and no resonance at its edges.
It never adds gain at any frequency.
Filtering only removes energy, so the result should always be quieter than what went in.

It is quieter on average.
Its peaks are another matter.

A mastered track is limited so that all of its parts *together* just reach full scale.
The limiter controls the sum, not the parts.
Where the parts happen to cancel each other at a peak, removing some of them takes the cancellation away.

The textbook case is a square wave.
Its fundamental alone peaks at 4/π of the square's height, about 2.1 dB higher than the square wave it came from.

On a real master it's worse.
On a loud drum and bass track, the full mix peaks at −0.1 dBFS.
The 200 Hz to 5 kHz band of the same track peaks at **+3.1 dBFS**, with more than 4,000 samples over full scale.

<img src="{{ img }}posts/band-audition/band-over-full-scale.png" alt="The 200 Hz to 5 kHz band of a mastered track peaking above full scale, and the same band through the peak guard staying under it">
The worst 120 ms of that band, before and after the peak guard described below.
{: .figure-caption}

Any filter does this.
A high-pass and low-pass pair overshoots the same way.

### **Picking a Fix**
There were three obvious options, and each one was worse than the problem for this use.

- **A fixed gain cut**, say 6 dB whenever the filter is on. It turns every band down to protect against peaks only some bands have, and it still isn't enough for every track.
- **Let it clip.** Hard clipping adds distortion right in the band you're trying to judge. That's the one thing an audition can't do.
- **Normalize each band to its own peak.** The level jumps every time the band moves, so a drag across the spectrum turns into a volume knob.

What I wanted was something that leaves the audio alone almost all of the time, and only acts on the few milliseconds that would actually go over.
That's a look-ahead peak limiter.

### **The Peak Guard**
For each sample, the guard works out the gain that sample needs to stay under a ceiling of 0.999.
For nearly every sample that's 1, and when every sample in reach is at 1 the block passes through bit-identical.

Around a sample that would go over, the gain has to come down without a step, because a step in gain is a click.
Two smoothing passes handle that.

1. **Hold.** A sliding minimum spreads each peak's needed gain over 50 ms after it, so the peaks of one bass note share one dip instead of each getting a dip of its own. A dip per cycle would be distortion.
2. **Ramp.** A moving average over 5 ms before it means the gain is already on its way down when the peak arrives. Each sample's gain is an average of values that all cover that sample, so it's never above what the sample needs.

```python
# Simplified: the real version carries both windows across block boundaries.
held = minimum_filter1d(needed, size=hold + lookahead + 1)   # each dip held 50 ms
gain = moving_average(held, lookahead)                       # and ramped over 5 ms
```

The 5 ms ramp before a peak means the guard has to see 5 ms into the future.
So the filter runs ahead of the playhead.
Each block, it processes 5 ms of audio beyond what's played and keeps that as the start of the next block.
A seek or a loop's wraparound throws the read-ahead away and starts the filter fresh.

In the figure above, the guarded band peaks at −0.01 dBFS.
Everything outside those few dips is untouched.

The guard has three tests, which together say what it's for:

- Overs are always brought under the ceiling.
- Audio under the ceiling passes through exactly, sample for sample.
- A single peak's gain dip has no step larger than its ramp allows, and the gain is back to unity well away from it on both sides.

*Most of the work in an audition filter turned out to be everything except the filter.*
