---
title: "Kouncil: Borrowed From Radar, Sonar and Spectroscopy"
date: 2026-10-13
tags: [Audio Programming, DSP, Tech, Python, Tech Overview]
project: "Kouncil"
description: "Three audio problems in Kouncil that other fields had already worked through: finding clicks, telling resonances from notes, and lining up a codec's output. One of the borrowed methods didn't survive real masters."
image: /docs/assets/images/projects/kouncil/posts/borrowed/sbc-alignment.png
also_in: [dev]
published: false
---
{%- assign fig = '/docs/assets/images/projects/kouncil/posts/borrowed/' | relative_url -%}

{% capture list_items %}
Overview
Clicks and Radar
Resonances and Spectroscopy
Codec Delay and Sonar
More Borrowing
{% endcapture %}
{% include elements/list.html title="" type="toc" %}

#### Overview
Most of [Kouncil](/tools/projects/2610-kouncil) is audio's own toolkit: the BS.1770 loudness standard, psychoacoustic masking, the short-time Fourier transform.
A few of its methods come from somewhere else.
In each case, the audio problem turned out to be a problem another field had already worked through.

This is lineage, not a claim to have invented anything.
Adaptive thresholds and baseline subtraction turn up in audio tools too, just rarely under these names or for these jobs.
And one of them didn't survive contact with released music, which is a story worth telling too.

### **Clicks and Radar**

A click in a master is a short impulse, usually from a render glitch: a buffer underrun, a plugin hiccup, a bad edit.
Finding one sounds easy.
High-pass the audio, since a click is mostly high frequencies, then look for samples that jump much more than the audio around them.

The catch is "the audio around them."
Music's level changes constantly, so the threshold has to adapt.
The obvious way to adapt is to compare each sample against the *average* of its neighborhood.
And a drum hit raises that average enormously.

Radar has exactly this problem.
A radar looks for a target echo in clutter whose strength changes from place to place, so it can't use a fixed threshold.
*Constant false-alarm rate* (CFAR) detection compares each cell against a threshold taken from the cells around it.
The plain version uses their mean, and it fails when a second strong target sits nearby: the neighbor raises the mean and hides the first target.

The fix, from Hermann Rohling in 1983, is *order-statistic* CFAR.
Instead of the neighbors' mean, use one of their ranks, like the 25th percentile.
A few strong neighbors can push a mean around, but they barely move a low percentile.

Kouncil's first click detector was OS-CFAR with a rank of one quarter:

1. High-pass the mono mix at 6 kHz and take the size of each sample-to-sample step.
2. Score each step against the 25th percentile of its 75 ms block.
3. Anything over 20 is a candidate. Candidates within 10 ms of each other are one event.
4. An event wider than 5 ms is a drum attack, not a click, and is dropped. That's radar's target-size gate.
5. An event quieter than about −60 dBFS is noise and is dropped.

<img src="{{ fig }}click-score.png" alt="A click beside a drum hit, scored against the block mean and against the block's 25th percentile">
A click added to a commercial master, 26 ms before a drum hit in the same 75 ms block. Against the block mean it scores 3 and is missed. Against the block's 25th percentile it scores 41 and is found. The drum hit crosses the threshold too, but it's wider than 5 ms and gets rejected.
{: .figure-caption}

That was the design, and it looked principled.
The reference library disagreed.
Run over about 2,400 released masters, it found clicks in every one of them: 674 a track on average, and every track over 30 a minute.
In a dense master the high end is full of tiny click-like transients, and no threshold on the size of a step separates them from a render fault.
A detector that fires on every record you admire isn't telling you anything, so it went.

What replaced it borrows nothing.
A buffer underrun leaves marks music doesn't: the output holds one value while it waits, or plays a buffer twice.
Kouncil now looks for exactly those, bit for bit: runs of identical samples, and stretches that equal the audio one buffer earlier, for the usual buffer sizes from 32 to 8,192 samples.
Masters hold exact values on purpose too (digital silence, a hard gate, a clipped waveform repeating at full scale), but they arrive there smoothly, and a missing buffer cuts in mid-waveform.
Keeping only the findings with a jump into or out of them took the library from 46 flagged tracks to 3, one of them SOPHIE's deliberate gating.
On the same masters with glitches put in, it finds 96% of silent and held buffers and 98% of repeated ones.

*The radar idea was sound. It answered a question finished music doesn't ask.*

### **Resonances and Spectroscopy**

A resonance is a narrow peak in the spectrum that sticks out from the shape around it: a ringing snare, a room mode baked into a recording, a harsh EQ boost.
Finding one means estimating what the spectrum *would* look like without the peak, then measuring how far the peak stands above that.

Spectroscopy has done this for a century.
To find absorption lines in a spectrum, you first remove the broad *baseline* under them, often with a running median.
A median follows the slow shape and ignores narrow lines, where a mean would get dragged up by them.

Kouncil does the same, with two changes the music forced.

The baseline is a median over one octave on a log-frequency axis, so the window is the same musical width at 100 Hz as at 10 kHz.
A median over a fixed number of hertz is wide in the bass and narrow in the treble, and a broad boost up high lifts its own baseline.
A peak's *prominence* is its height above that baseline.
That's a topographer's term: the height of a peak above the saddle that joins it to higher ground, simplified here to height above the baseline.

The second change is about notes.
Music is made of narrow peaks.
A track in a key has sustained notes and their harmonics, and on an average spectrum they look exactly like resonances.
Suggesting a notch filter for each would be terrible advice.

So the prominence isn't measured once on the average spectrum.
It's measured in every frame against that frame's own baseline, and Kouncil takes the median over time.
A resonance, from a boost or a room mode, lifts every frame.
A note's partials stand up only while it plays, and the median removes them.

A drone or a pad on the key center plays most of the track and survives the median.
Those are spectral lines in a harmonic series, and spectroscopy has an answer for that as well: a series of lines at whole-number multiples belongs to one source.
A narrow peak that sits in a harmonic series with at least two others is a note, and is dropped.
A resonance is a lone bell, usually a wider one.

Peaks are reported from 7 dB of prominence.
The warning levels, 12 and 18 dB, are where the strongest resonance of 11% and 2% of the reference library's releases sits.
The first version also weighted prominence by the ear's sensitivity, which halved every prominence under about 150 Hz, so a boom could never be reported.
A peak's height above its neighbors doesn't depend on the ear, so the weighting is gone.

To test it, peaking EQ boosts of +6 to +12 dB were multiplied into the spectra of the library's tracks.
The detector this replaced (one average spectrum, a median over a fixed number of hertz, the weighting, and a test against the track's other peaks) found a +12 dB boost 27% of the time.
This one finds it 81% of the time, and 87 to 100% from 2 kHz up, with fewer false reports on the masters as released (0.8 a track against 0.9).
Low boosts are still the hard case, because they look most like bass notes: from 120 to 500 Hz it finds 21 to 58% of them.

### **Codec Delay and Sonar**
Kouncil's codec simulation encodes the track with real codecs, decodes it again, and measures the difference.
Every codec figure is computed from `original − decoded`, sample by sample.
So the two have to line up exactly.

The naive alignment is to trim the decoded file to the original's length.
That assumes the decode starts where the original did.
For AAC, MP3 and Opus it does, because ffmpeg reads the encoder's delay from the container and removes it.
Raw SBC, the Bluetooth codec, has no container and no such note.
It comes back 73 samples late and a little short.

Finding how late an echo arrived is *time-delay estimation*, and sonar and radar solve it by cross-correlating what was sent with what came back.
The correlation peaks at the lag where the two line up best.
Kouncil cross-correlates a 65,536-sample stretch from the middle of the track, where there's music to match on (a fade-in or a silent intro has nothing).
Then it shifts the decode by that lag before anything is compared.

<img src="{{ fig }}sbc-alignment.png" alt="Cross-correlation of an SBC decode with its original, peaking at 73 samples, and the error signal before and after alignment">
A real SBC 192 round trip of 30 seconds of the same master. The correlation peaks at 73 samples. Before alignment, the "error" is mostly the delay itself, at 0.43 rms. Aligned, it's 0.06.
{: .figure-caption}

The correlation curve is broad because the track is bass-heavy, and low frequencies correlate well over a wide range of lags.
The peak is still sharp enough to read.

Before this was fixed, the Codec tab's SBC figures, and the Spotify-over-Bluetooth chain built on SBC, were mostly measuring the 73-sample offset.
SBC looked several times worse than every other codec.
Aligned, it sits with the rest.

### **More Borrowing**
Two smaller ones:

- **The envelope modulation spectrum** borrows the modulation transfer function behind the Speech Transmission Index (Houtgast and Steeneken, 1970s). It measures how much of a signal's slow loudness movement survives a room. Kouncil applies it to a limiter instead of a room: a squashed master has a flat modulation spectrum, and a pumping compressor shows a peak at 2 to 4 Hz.
- **Timeline downsampling** works the way a digital oscilloscope draws. Each pixel column keeps its minimum and its maximum, so a one-frame spike survives at any zoom where ordinary decimation would skip it.
