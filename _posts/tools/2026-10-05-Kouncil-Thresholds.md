---
title: "Kouncil: Where the Thresholds Come From"
date: 2026-10-05
tags: [Audio Programming, Tech, Python, Data, Tech Overview]
project: "Kouncil"
description: "Why every pass/fail line in Kouncil is measured from 2,499 released masters instead of written from rules of thumb."
image: /docs/assets/images/projects/kouncil/product/dlg_profiles.jpg
also_in: [dev]
---
{%- assign img = '/docs/assets/images/projects/kouncil/product/' | relative_url -%}
{%- assign fig = '/docs/assets/images/projects/kouncil/posts/thresholds/' | relative_url -%}

{% capture list_items %}
Overview
Rules of Thumb
Reference Intervals
Building the Library
What the Data Overturned
Keeping the Thresholds in Sync
{% endcapture %}
{% include elements/list.html title="" type="toc" %}

#### Overview
Every number [Kouncil](/tools/projects/2610-kouncil) shows is judged against a range, and that range decides the number's color, how it affects the health score, and what the characters say about it.
Most analysis tools set those ranges from someone's experience.
For Kouncil, I set them by measuring 2,499 commercially released masters.

### Rules of Thumb
Mastering has a lot of folklore: DR8 or above is healthy, keep your PLR over 9 dB, any clipped sample is a fault, and the noise floor should sit under -45 dBFS.
These sound reasonable, and some of them came from real listening, but they describe an ideal rather than what actually gets released, and they fall apart when measured against real records:

- Noise floor - Kouncil measures it as the level of a track's quietest stretch, and in continuous music that stretch is still music. A -45 dBFS warning fires on 98% of released masters.
- Clipping - "Any clipped sample is a fault" flags 27% of them, and it's very uneven between genres. None of the modern pop tracks have a single clipped sample, against 38% of 1980s thrash metal, where the 90th percentile has over 43,000. Judged per minute against each genre's own rate, Kouncil flags 7%.
- PLR - A 9 dB floor flags 21%. Against the range each genre actually uses, Kouncil flags 3%.

A tool that flags most of the records you admire isn't telling you much.
A fixed target has a second problem too, since it marks a metal master down for being as dense as metal masters are.

<img src="{{ fig }}rules-vs-releases.png" alt="Three histograms of the reference library: clipped samples, noise floor and PLR, with the old rule marked on each">
Three measurements across the 2,475 analyzed tracks behind the bundled profiles, with the share of released masters each old rule flags and what Kouncil flags now.
{: .figure-caption}

### Reference Intervals
The model I settled on comes from laboratory medicine.
A blood test's normal range isn't a number a committee decided was ideal; it's a reference interval, the central span of values measured in a population of healthy people.
A Kouncil profile does the same thing for masters.
Each one is built from released records in a single genre and era, and a track is judged against what that population actually measures.

For every metric, a profile stores the full set of statistics: min, max, mean, standard deviation, median, 10% trimmed mean, 10th and 90th percentiles, and quartiles.
The range is drawn from those with one of four methods:

- Mean ± 1.5σ - Clamped to the observed min and max. This is the default, and what the bundled profiles use.
- Tukey fences - The quartiles widened by 1.5 interquartile ranges, which holds up well when a reference set has an outlier in it.
- 10th to 90th percentile
- Min to max

Since every statistic is stored, switching methods doesn't require analyzing the audio again.

Ranges also know which side is the problem.
Low DR is a problem and high DR isn't, so a profile's lower bound on DR is strict while the upper bound gets some slack.
True peak and harshness work the other way around, and loudness and spectral tilt are judged on both sides.
That way, a master that's more dynamic than its genre doesn't get marked down for it.

<img src="{{ img }}dlg_profiles.jpg" alt="The Profile Library, with a profile's targets table">

### Building the Library
A reference profile starts as a folder of tracks and a short info file with the profile's name, its tags, a one-line description, and the track list.

```
1990s Grunge

rock, alternative, grunge, 1990s, loud, heavy, dark, compressed, punchy, analog

Heavy, dark 1990s rock with prominent low end and moderate dynamics.
```

A batch script runs Kouncil's command line over every folder and writes one profile per genre.
A track takes about 25 seconds with the codec simulation, so a full rebuild takes hours even with several tracks running at once.
Each track's analysis is cached alongside it, so a rebuild only re-runs what changed.
The script also settles every question before the first track starts, like which folders are missing an info file and what to do with profiles that already exist, so a long run never stops halfway to ask something.

The library started at 19 profiles and about 480 tracks, and is now 100 profiles and 2,499 tracks, from 1930s big band to modern mainstream pop.

Choosing which records go in is a project of its own, with written rules.
A track qualifies for how its mix and master are regarded, not for the song, and it needs evidence, ranked from strongest to weakest: an award for the recording's engineering, a named engineer discussing that mix in a trade interview, a citation in an audiophile publication, or specific, citable praise of the production from the genre's own community.
Popularity alone is a last resort, and it's marked as one in the data.
Once an album qualifies, three to five of its best tracks can go in, but no single artist should fill a genre.

Each list covers one genre, era, and energy level, so 2000s pop punk anthems and ballads are separate profiles.
A list aims for about thirty tracks, and nothing is padded to reach that number.
A genre that can't find thirty documented tracks stays short, and a source that can't be found is logged as a gap rather than made up.
Some limits are physical, like pre-war Delta blues, which tops out at about fifteen recordings that sound good by any modern standard.
No strictly traditional bluegrass recording cleared the bar at all, so that profile is built from its progressive successors and says so in its title.

### What the Data Overturned
Measuring real records did more than loosen a few thresholds; it also exposed measurements that were wrong.

#### Clicks
The click detector looked for short impulses that stand out from the audio around them.
Run over the library, it found clicks in every single release, a median of 674 per track or 163 a minute, because a dense master is full of click-like transients the detector couldn't tell apart from a render fault.
I removed it.
The check that replaced it looks only for the exact signatures of a broken render, which are a run of identical samples held where the waveform should keep moving, or a buffer repeated sample for sample, and only where it cuts in mid-waveform rather than at a deliberate stop.
Across the reference library it flags a handful of tracks instead of all of them.
In this case the library didn't just loosen the threshold, it showed the detector was measuring the wrong thing.

#### PLR and PSR
These had in-range floors of 9 and 6 dB, and for a long time the reference masters cleared them comfortably.
That turned out to be a loudness bug hiding a bad threshold.
Kouncil averaged the two channels' power where the BS.1770 standard sums them, so every stereo loudness figure read 3.01 dB low and every peak-to-loudness ratio read 3.01 dB high.
On that inflated scale almost none of the library fell under a 9 dB PLR, but once corrected, 21% of today's library does.
A fixed floor was the wrong tool anyway, so PLR is now colored against the range each genre's own masters use, which flags 3% of them, and the "very squashed" finding requires both a PLR under 6 dB and a value lower than the genre's own records go.

#### HF Loss
The Codec tab used to score how much top end each codec removed.
Across the library, that figure was set entirely by each codec's bandwidth and came out the same for every master, so nothing a mastering engineer did could change it.
Since no master could move it, it wasn't really measuring the master, so I took it out of the consistency score.
The Error Spectrum chart still shows where each codec cuts off.

#### Codec Consistency
With HF loss gone and the Bluetooth codec's 73-sample delay corrected, the library's medians moved from 66-76 up to 81-94, and the in-range floor moved up with them.

### Keeping the Thresholds in Sync
Kouncil also judges values before any profile is chosen.
Those defaults live in four places: a block of constants in the app, the default profile, the Codec Scorecard's thresholds, and the health score's deductions.
They all carry the same figures, set from the reference library, with a comment beside the constants listing what the masters measured.

The four have to change together, and a new threshold gets checked against the reference profiles before I trust it.
That's what keeps a number's color, the score, and what the characters say about it from ever disagreeing.

In practice that check is a script.
It scores every genre in the library before and after a change, along with a few releases broken on purpose (hard-clipped, far too quiet, one channel's polarity flipped, a harsh treble boost).
A change stands only if the genres' scores hold and the broken versions still land far below the real ones.
It has caught real problems, like an audit that found the colors and the score using two different ranges, so a profile's own reference records could show up green while also being told to turn down.
