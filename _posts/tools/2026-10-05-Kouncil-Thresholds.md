---
title: "Kouncil: Where the Thresholds Come From"
date: 2026-10-05
tags: [Audio Programming, Tech, Python, Data, Tech Overview]
project: "Kouncil"
description: "Why every pass/fail line in Kouncil is measured from 2,499 released masters instead of written from rules of thumb."
image: /docs/assets/images/projects/kouncil/product/dlg_profiles.jpg
also_in: [dev]
published: false
---
{%- assign img = '/docs/assets/images/projects/kouncil/product/' | relative_url -%}
{%- assign fig = '/docs/assets/images/projects/kouncil/posts/thresholds/' | relative_url -%}

{% capture list_items %}
Overview
Rules of Thumb
Reference Intervals
Building the Library
What the Data Overturned
One Source of Truth
{% endcapture %}
{% include elements/list.html title="" type="toc" %}

#### Overview
A mastering analyzer is only as useful as its idea of "too much."
Every number [Kouncil](/tools/projects/2610-kouncil) shows gets judged against a range, and the color of that number, the health score, and what the characters say about it all follow from that range.

So where do the ranges come from?
For most tools, the honest answer is somebody's experience.
For Kouncil, it's 2,499 commercially released masters, measured.

### **Rules of Thumb**
Mastering has a lot of folklore. DR8 or above is healthy. Keep your PLR over 9 dB. Any clipped sample is a fault. Your noise floor should sit under −45 dBFS.

These sound reasonable, and some of them came from real listening.
The trouble is that they describe an ideal, not what gets released.
Measured against real records, they fall apart.

- **Noise floor:** Kouncil measures it as the level of a track's quietest stretch, and in continuous music that stretch is still music. A −45 dBFS warning fires on 98% of released masters.
- **Clipping:** "any clipped sample is a fault" flags 27% of them. It's also wildly uneven by genre: none of the modern pop tracks have a clipped sample, against 38% of 1980s thrash metal, where the 90th percentile has over 43,000. Judged per minute against each genre's own rate, Kouncil flags 7%.
- **PLR:** a 9 dB floor flags 21%. Against the range each genre actually uses, Kouncil flags 3%.

A tool that flags most of the records you admire isn't telling you anything.
And a fixed target has a second problem: it marks a metal master down for being as dense as metal masters are.

<img src="{{ fig }}rules-vs-releases.png" alt="Four histograms of the reference library: clipped samples, noise floor, PLR and click candidates, with the old rule and Kouncil's current threshold marked on each">
Four measurements across the 1,005 tracks behind the bundled profiles, with the share of released masters each threshold would flag.
{: .figure-caption}

### **Reference Intervals**
The model I landed on comes from laboratory medicine.

A blood test's "normal range" isn't a number a committee decided was ideal.
It's a *reference interval*, the central span of values measured in a population of healthy people.
You're judged against what healthy people actually measure.

A Kouncil profile is the same thing for masters.
Each one is built from a reference population of released records in one genre and era, and a track is judged against what that population does.

For every metric, a profile stores the full set of statistics: min, max, mean, standard deviation, median, 10% trimmed mean, 10th and 90th percentiles, and quartiles.
The range is drawn from those with one of four methods:

- **Mean ± 1.5σ**, clamped to the observed min and max. The default, and what the bundled profiles use.
- **Tukey fences**, the quartiles widened by 1.5 interquartile ranges. Robust when a reference set has an oddball in it.
- **10th to 90th percentile**
- **Min to max**

Because every statistic is stored, switching methods doesn't need the audio again.

Ranges also know which side is bad.
Low DR is a problem and high DR isn't, so a profile's lower bound on DR is strict while the upper bound gets slack.
True peak and harshness work the other way around.
Loudness and spectral tilt are judged on both sides.
*A master that's more dynamic than its genre shouldn't be marked down for it.*

<img src="{{ img }}dlg_profiles.jpg" alt="The Profile Library, with a profile's targets table">

### **Building the Library**
A reference profile starts as a folder of tracks and a short info file: the profile's name, its tags, a one-line description, and the track list.

```
1990s Grunge

rock, alternative, grunge, 1990s, loud, heavy, dark, compressed, punchy, analog

Heavy, dark 1990s rock with prominent low end and moderate dynamics.
```

A batch script runs Kouncil's command line over every folder and writes one profile per genre.
A track takes about 25 seconds with the codec simulation, so a full rebuild takes hours even with several tracks running at once.
Every track's analysis is cached beside it, and a rebuild only re-runs what changed.

The script also settles every question before the first track starts: which folders are missing an info file, and what to do about profiles that already exist.

The library started at 19 profiles and about 480 tracks.
It's now 100 profiles and 2,499 tracks, from 1930s big band to modern mainstream pop.

Which records go in is a project of its own, with written rules.
A track qualifies for how its mix and master are regarded, not for the song, and it needs evidence, strongest first.
That means an award for the recording's engineering, a named engineer discussing that mix in a trade interview, an audiophile publication's citation, or specific, citable praise of the production from the genre's own community.
Popularity alone is a last resort, and it's marked as one in the data.
Once an album qualifies, three to five of its best tracks can go in, but no single artist should fill a genre.

Each list is one genre, era and energy level, so 2000s pop punk anthems and ballads are separate profiles.
A list aims for about thirty tracks, and no genre gets priority over another.
Nothing is padded to reach the number.
A genre that can't find thirty documented tracks stays short, and a source that can't be found is logged as a gap, never invented.

Some limits are physical.
Pre-war Delta blues tops out at about fifteen recordings that sound good by any modern standard.
No strictly traditional bluegrass recording cleared the bar at all, so that profile is built from its progressive successors and says so in its title.

### **What the Data Overturned**
Measuring real records didn't just loosen a few thresholds. It exposed measurements that were wrong.

**Clicks.**
The click detector looked for short impulses that stand out from the audio around them.
Run over the library, it found clicks in every single release: a median of 674 a track, or 163 a minute.
A dense master is full of click-like transients, and the detector couldn't tell them apart from a render fault.

So it's gone.
The check that replaced it looks only for the exact signatures of a broken render: a run of identical samples held where the waveform should keep moving, or a buffer repeated sample for sample, and only where it cuts in mid-waveform rather than at a deliberate stop.
Across the reference library it flags a handful of tracks instead of all of them.
*The library didn't loosen this threshold. It showed the detector was measuring the wrong thing.*

**PLR and PSR.**
These had in-range floors of 9 and 6 dB, and for a long time the reference masters cleared them comfortably.
That turned out to be a loudness bug hiding a bad threshold.
Kouncil averaged the two channels' power where the BS.1770 standard sums them, so every stereo loudness figure read 3.01 dB low, and every peak-to-loudness ratio read 3.01 dB high.
On that inflated scale, almost none of the library fell under a 9 dB PLR.
Corrected, 21% of today's library does.
A fixed floor was the wrong tool anyway. PLR is now colored against the range each genre's own masters use, which flags 3% of them, and the "very squashed" finding needs both: under 6 dB, and lower than the genre's own records go.

**HF loss.**
The codec tab used to score how much top end each codec removed.
Across the library, the figure was set entirely by each codec's bandwidth and was the same for every master.
Nothing a mastering engineer could do would change it.
*If no master can move a number, it isn't a measurement of the master.*
It's gone from the consistency score, and the Error Spectrum chart still shows where each codec cuts off.

**Codec consistency.**
With HF loss gone and the Bluetooth codec's 73-sample delay corrected, the medians moved from 66–76 up to 81–94.
The in-range floor followed, from 65 to 70.

### **One Source of Truth**
Kouncil judges a value before any profile is chosen, too.
Those defaults live in four places: a block of constants in the app, the default profile, the Codec Scorecard's thresholds, and the health score's deductions.
They all carry the same figures, set from the reference library, with a comment beside the constants listing what the masters measured.

The four have to change together, and a new threshold gets checked against the reference profiles before it's trusted.
It's a small discipline, but it's the reason a number's color, the score, and what the characters say about it never disagree.

In practice that check is a script.
It scores every genre in the library before and after a change, along with a few releases broken on purpose (hard-clipped, far too quiet, one channel's polarity flipped, a harsh treble boost).
A change stands only if the genres' scores hold and the broken versions still land far below the real ones.
It has caught real problems: one audit found the colors and the score using two different ranges, so a profile's own reference records could show in green while being told to turn down.
