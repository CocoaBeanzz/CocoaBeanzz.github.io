---
title: "Kouncil: Borrowed From Radar, Sonar and Spectroscopy"
date: 2026-10-13
tags: [Audio Programming, DSP, Tech, Python, Tech Overview]
project: "Kouncil"
description: "Three audio problems in Kouncil that other fields had already worked through: finding clicks, telling resonances from notes, and lining up a codec's output. One of the borrowed methods didn't survive real masters."
image: /docs/assets/images/projects/kouncil/posts/borrowed/sbc-alignment.png
also_in: [dev]
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
Most of [Kouncil](/tools/projects/2610-kouncil) is built from audio's own toolkit, like the BS.1770 loudness standard, psychoacoustic masking, and the short-time Fourier transform.
A few of its methods come from other fields, where it turned out the audio problem I was working on had already been solved for something else.
I'm not claiming to have invented any of these, and adaptive thresholds and baseline subtraction do show up in audio tools, just rarely under these names or for these jobs.
One of them also didn't hold up against released music, which I'll get into below.

### Clicks and Radar
A click in a master is a short impulse, usually left by a render glitch like a buffer underrun, a plugin hiccup, or a bad edit.
Finding one sounds easy: high-pass the audio, since a click is mostly high frequencies, and look for samples that jump much more than the audio around them.
The tricky part is defining "the audio around them."
Music's level changes constantly, so the threshold has to adapt, and the obvious way to adapt is to compare each sample against the average of its neighborhood.
The problem is that a drum hit raises that average enormously.

Radar runs into the same problem.
A radar looks for a target's echo in clutter whose strength varies from place to place, so it can't use a fixed threshold either.
Constant false-alarm rate (CFAR) detection compares each cell against a threshold taken from the cells around it.
The basic version uses their mean, which fails when a second strong target sits nearby, since the neighbor raises the mean and hides the first target.
Hermann Rohling's fix in 1983 was order-statistic CFAR, which uses one of the neighbors' ranks, like the 25th percentile, instead of their mean.
A few strong neighbors can push a mean around, but they barely move a low percentile.

Kouncil's first click detector was OS-CFAR with a rank of one quarter:

1. High-pass the mono mix at 6 kHz and take the size of each sample-to-sample step.
2. Score each step against the 25th percentile of its 75 ms block.
3. Treat anything scoring over 20 as a candidate, and merge candidates within 10 ms of each other into one event.
4. Drop events wider than 5 ms, since those are drum attacks rather than clicks. This is radar's target-size gate.
5. Drop events quieter than about -60 dBFS as noise.

<img src="{{ fig }}click-score.png" alt="A click beside a drum hit, scored against the block mean and against the block's 25th percentile">
A click added to a commercial master, 26 ms before a drum hit in the same 75 ms block. Against the block mean it scores 3 and is missed. Against the block's 25th percentile it scores 41 and is found. The drum hit crosses the threshold too, but it's wider than 5 ms and gets rejected.
{: .figure-caption}

On paper the design held up, but the reference library disagreed.
Run over about 2,400 released masters, it found clicks in every single one, an average of 674 per track and more than 30 a minute on every track.
In a dense master the high end is full of tiny click-like transients, and no threshold on step size can separate them from a render fault.
A detector that fires on every record I'd hold up as a reference wasn't telling anyone anything, so I removed it.

The replacement doesn't borrow from anywhere.
A buffer underrun leaves marks that music doesn't: the output holds one value while it waits, or plays the same buffer twice.
Kouncil now looks for exactly those, bit for bit, as runs of identical samples and as stretches that match the audio one buffer earlier, for the usual buffer sizes from 32 to 8,192 samples.
Masters do hold exact values on purpose sometimes, in digital silence, a hard gate, or a clipped waveform repeating at full scale, but they arrive there smoothly, while a missing buffer cuts in mid-waveform.
Keeping only the findings with a jump into or out of them brought the library from 46 flagged tracks down to 3, one of which is SOPHIE's deliberate gating.
On the same masters with glitches inserted, it finds 96% of silent and held buffers and 98% of repeated ones.

The radar approach was sound, but it was answering a question finished music doesn't really ask.

### Resonances and Spectroscopy
A resonance is a narrow peak that sticks out from the shape of the spectrum around it, like a ringing snare, a room mode baked into a recording, or a harsh EQ boost.
Finding one means estimating what the spectrum would look like without the peak, then measuring how far the peak stands above that.

Spectroscopy has been doing this for about a century.
To find absorption lines in a spectrum, you first remove the broad baseline underneath them, often with a running median, since a median follows the slow shape and ignores narrow lines where a mean would get pulled up by them.
Kouncil does the same thing, with two changes the music required.

The first is that the baseline is a median over one octave on a log-frequency axis, so the window is the same musical width at 100 Hz as at 10 kHz.
A median over a fixed number of hertz is wide in the bass and narrow in the treble, and a broad boost up high ends up lifting its own baseline.
A peak's prominence is then its height above that baseline.
Prominence is borrowed from topography, where it's the height of a peak above the saddle connecting it to higher ground, simplified here to the height above the baseline.

The second change has to do with notes.
Music is made of narrow peaks, and a track in a key has sustained notes and harmonics that look exactly like resonances on an average spectrum.
Suggesting a notch filter for each of them would be terrible advice.
So instead of measuring prominence once on the average spectrum, Kouncil measures it in every frame against that frame's own baseline and takes the median over time.
A resonance from a boost or a room mode lifts every frame, while a note's partials only stand up while it plays, so the median removes them.

A drone or a pad on the key center plays for most of the track and survives the median.
Those are spectral lines in a harmonic series, and spectroscopy has an answer for that too: a series of lines at whole-number multiples belongs to one source.
A narrow peak that sits in a harmonic series with at least two others is treated as a note and dropped, while a resonance is usually a lone, wider bell.

Peaks are reported from 7 dB of prominence.
The warning levels, 12 and 18 dB, are where the strongest resonance of 11% and 2% of the reference library's releases sits.
The first version also weighted prominence by the ear's sensitivity, which halved every prominence under about 150 Hz so that a boom could never be reported.
A peak's height above its neighbors doesn't depend on the ear, so I took the weighting out.

To test it, I multiplied peaking EQ boosts of +6 to +12 dB into the spectra of the library's tracks.
The detector this replaced, which used one average spectrum, a median over a fixed number of hertz, the ear weighting, and a comparison against the track's other peaks, found a +12 dB boost 27% of the time.
The new one finds it 81% of the time, and 87 to 100% of the time from 2 kHz up, with slightly fewer false reports on the masters as released (0.8 per track against 0.9).
Low boosts are still the hard case because they look the most like bass notes, and from 120 to 500 Hz it finds 21 to 58% of them.

### Codec Delay and Sonar
Kouncil's codec simulation encodes the track with real codecs, decodes it again, and measures the difference.
Every codec figure is computed from the original minus the decoded audio, sample by sample, so the two have to line up exactly.

The naive way to align them is to trim the decoded file to the original's length, which assumes the decode starts where the original did.
For AAC, MP3 and Opus it does, because ffmpeg reads the encoder's delay from the container and removes it.
Raw SBC, the Bluetooth codec, has no container to carry that information, and it comes back 73 samples late and a little short.

Finding how late an echo arrived is called time-delay estimation, and sonar and radar solve it by cross-correlating what was sent with what came back.
The correlation peaks at the lag where the two line up best.
Kouncil cross-correlates a 65,536-sample stretch from the middle of the track, where there's music to match on, since a fade-in or a silent intro gives it nothing to work with.
It then shifts the decode by that lag before comparing anything.

<img src="{{ fig }}sbc-alignment.png" alt="Cross-correlation of an SBC decode with its original, peaking at 73 samples, and the error signal before and after alignment">
A real SBC 192 round trip of 30 seconds of the same master. The correlation peaks at 73 samples. Before alignment, the "error" is mostly the delay itself, at 0.43 rms. Aligned, it's 0.06.
{: .figure-caption}

The correlation curve is broad here because the track is bass-heavy, and low frequencies correlate well over a wide range of lags, but the peak is still sharp enough to read.

Before this fix, the Codec tab's SBC figures, along with the Spotify-over-Bluetooth chain built on SBC, were mostly measuring the 73-sample offset, and SBC looked several times worse than every other codec.
Once aligned, it sits right alongside the rest.

### More Borrowing
Two smaller ones:

- Envelope modulation spectrum - Borrows the modulation transfer function behind the Speech Transmission Index (Houtgast and Steeneken, 1970s), which measures how much of a signal's slow loudness movement survives a room. Kouncil applies it to a limiter instead of a room: a squashed master has a flat modulation spectrum, and a pumping compressor shows up as a peak at 2 to 4 Hz.
- Timeline downsampling - Works the way a digital oscilloscope draws. Each pixel column keeps its minimum and maximum, so a one-frame spike survives at any zoom level where ordinary decimation would skip over it.
