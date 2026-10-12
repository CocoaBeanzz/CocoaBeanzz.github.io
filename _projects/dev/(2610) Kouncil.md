---
name: Kouncil
heading: Kouncil
role: Developer (Solo)
tools: [Python, NumPy, SciPy, Matplotlib, Tkinter, ffmpeg]
tags: [Audio, Analysis, Tool]
image: /docs/assets/images/projects/kouncil/kouncil_overview.png
description: A desktop mastering analyzer for loudness, spectrum, imaging, dynamics, and codec resilience. Actionable, accessible feedback from a cast of charming characters. 
---

<div class="project-header" markdown="1">
<img src="/docs/assets/images/projects/kouncil/kouncil_overview.png" width="100%" alt="Kouncil audio analysis interface">
Kouncil is a desktop analyzer for finished audio masters. It brings loudness, dynamics, tonal balance, stereo compatibility and real-world codec tests into one view, then puts the findings against a target and a profile built from commercial releases. Instead of treating every deviation as a fault, it asks whether the result is unusual for this kind of music.
</div>

{% capture list_items %}
Overview
Context-aware analysis
Codec round-trips
Album comparison
Four ways to explain the results
Export and custom profiles
Under the hood
{% endcapture %}
{% include elements/list.html title="" type="toc" %}

## Overview

Kouncil is built for the final stage of a release, when the question is no longer just how a mix sounds, but how the master measures, translates and sits beside its references. Load one track for a detailed analysis or a whole album to compare tonal balance, loudness, stereo image and dynamics across the sequence.

The interface combines summary findings with detailed charts. A health score and prioritised notes provide a quick read, while the analysis tabs expose the measurements behind each finding.

<img src="/docs/assets/images/projects/kouncil/kouncil_overview_2.png" alt="Kouncil overview with health score, findings and summary charts">

## Context-aware analysis

Kouncil judges a master against two things. A **target** defines the intended delivery level and true-peak ceiling. A **profile** describes how a selected style of music tends to measure, using ranges for individual metrics and an average spectrum as a reference.

The bundled library contains 39 profiles built from 1,060 commercial masters, covering material from early big band and jazz through rock, hip hop and electronic music to contemporary pop. With a profile active, values are flagged only when they fall outside the selected reference range. A low dynamic-range figure that fits a dense thrash master can be unusual for a cool jazz recording.

The analysis is organised around the questions that come up during mastering. Loudness reports integrated LUFS, true peak, loudness range and streaming target offsets. Spectrum views cover tonal balance, resonances, tilt and mid-side energy. Stereo analysis tracks width and phase correlation by frequency and over time. Dynamics views expose crest factor, transient density, micro-dynamics and signs of compression pumping.

<div class="row">
<div class="col" markdown="1">
<img src="/docs/assets/images/projects/kouncil/kouncil_spectrum.png" alt="Kouncil spectrum analysis with a reference profile curve">
</div>
<div class="col" markdown="1">
<img src="/docs/assets/images/projects/kouncil/kouncil_stereo.png" alt="Kouncil stereo analysis with correlation and width charts">
</div>
</div>

Kouncil also performs render quality checks for issues such as non-standard sample rates, lossy files passed off as masters, excess silence, premature cutoffs, clicks, dropouts and sudden DC offset changes. These are separated from subjective or style-dependent judgements.

## Codec round-trips

Codec analysis is one of Kouncil's central features. Rather than estimating what a delivery format might do, it actually encodes and decodes the master with ffmpeg, aligns the decoded result to the original at sample level, then measures the difference.

The test set includes AAC, Vorbis, Opus, MP3 and SBC, plus chains that represent common listening paths such as streaming playback over Bluetooth. The resulting scorecard compares codec behaviour across metrics, while the error spectrum is measured against a psychoacoustic masking threshold. Other views show when artifacts occur, how transients change, whether stereo width shifts and how much pre-echo appears.

<img src="/docs/assets/images/projects/kouncil/kouncil_codec.png" alt="Codec comparison scorecard, error spectrum and artifact analysis">

The Codec tab also supports direct listening to each encoded version. A difference mode isolates what the codec removed or added, making subtle artifacts easier to hear instead of relying on a metric alone.

## Album comparison

Kouncil treats a collection of masters as an album, not just a stack of unrelated files. The Compare view overlays spectra and stereo width, puts each track's metrics side by side, and visualises the loudness step from one track to the next in sequence.

Tracks can be reordered in the sequence view and auditioned from the transition point. This makes it easier to spot a song that jumps in level, a shift in tonal balance, or a stereo image that breaks the album's overall feel.

<img src="/docs/assets/images/projects/kouncil/kouncil_compare.png" alt="Album comparison with track metrics, spectrum overlays and sequence chart">

## Four ways to explain the results

The same measurement can mean different things to different people. Kouncil has four characters who interpret findings from distinct perspectives, from an everyday listener to an audio scientist. The chosen voice also shapes the Overview summary and the explanations attached to metrics and charts.

The dedicated Kouncil view brings the characters together around the track's findings. Selecting a character reveals their points one at a time, and relevant charts appear on a whiteboard behind them. The conversation is tied directly to the analysis, so a criticism is only raised when the corresponding measurement is flagged elsewhere in the application. Each criticism includes a practical direction for what to change.

<img src="/docs/assets/images/projects/kouncil/kouncil_feedback.png" alt="The four Kouncil characters presenting analysis findings beside relevant charts">

## Export and custom profiles

Reports can be exported as text, image sets, PDFs, snapshots or reusable profiles. Image export includes an automatic layout mode and a page editor for arranging charts, notes, portraits and custom artwork. Layouts can span multiple pages and be saved as presets for repeatable reports.

Custom profiles let a user define a reference set from selected masters. Target statistics can use a mean, median or trimmed mean, while ranges can use standard deviation, interquartile range, percentiles or minimum and maximum. The result works like a bundled profile and can be shared as a single `.kprofile` file without storing source file paths.

<img src="/docs/assets/images/projects/kouncil/kouncil_export_image.png" alt="Kouncil report layout editor with charts, notes and custom page composition">

## Under the hood

Kouncil is built in Python with Tkinter, NumPy, SciPy, Matplotlib and Pillow. The desktop builds bundle Python and an audio-only LGPL build of ffmpeg. Loudness measurement follows ITU-R BS.1770 and is tested against EBU Tech 3341 reference signals, with additional cross-checks against ffmpeg's `ebur128`. True peak is oversampled, and codec measurements come from real encode-decode round-trips rather than modelled approximations.

Analysis is staged so early results are available before the full report is complete. Chart rendering and spectrogram work run on worker threads, and playback uses a separate process with decoded audio shared through shared memory. This separation keeps analysis and rendering from interrupting playback.

The same analysis code powers a headless command-line tool for batch snapshots and profile creation. The application also includes a custom skin system, a multi-page report layout editor and explanatory content written for four levels of audio expertise.
