---
name: SNURRR
heading: SNURRR
role: Developer (Solo)
tools: [C++, iPlug2, DSP, VST3]
tags: [Audio, Instrument, Tool]
image: /docs/assets/images/projects/SNURRR/SNURRR_Main.png
description: Percussion instrument that can reimagine the spectral profile of anything.
---

<div class="project-header" markdown="1">
<img src="/docs/assets/images/projects/SNURRR/SNURRR_Main.png" width="100%" alt="SNURRR main interface">
SNURRR is a drum and percussion sound design instrument built around a simple idea. Freeze the tone of a sound, then rebuild the hit around it. A sample can become a sustained spectral texture, a playable additive voice, one layer in a hybrid drum, or the starting point for something unrecognisable.
</div>

{% capture list_items %}
Overview
SMURRR
Sound engines
The Body
Processing and routing
Visualisation and batch work
Under the hood
{% endcapture %}
{% include elements/list.html title="" type="toc" %}

## Overview

SNURRR runs as VST3, VST2, CLAP, AAX and AU, with a standalone version for sound design without a DAW. Its three sound sources, two distortion stages and reorderable effects chain are designed to work as one instrument rather than a collection of separate utilities.

The core workflow is to separate a drum's transient from its tone, then take control of both. Keep the original attack in one sampler, turn the tail into a playable texture in the other, and add a synthesised body underneath. The same process works for tonal one-shots, risers and abstract textures.

<img src="/docs/assets/images/projects/SNURRR/SNURRR_Main_2.png" alt="SNURRR sampler page with two samplers, Body and the processing chain">

## SMURRR

SMURRR freezes the spectral character of a selected audio region. It takes an FFT across the selection, preserves the magnitude of each frequency component, randomises phase, and transforms the result back into audio. The original timing disappears while the source's frequency content remains, turning a short snare tail into a continuous tone that loops without a seam.

Selection is part of the sound design. A slice around the transient tends to produce a bright, noisy texture, while a slice from the tail captures more of the drum's resonance. Random phase can change on each run for variation, or use a fixed seed for repeatable results.

<div class="row">
<div class="col" style="width:58%;" markdown="1">
<img src="/docs/assets/images/projects/SNURRR/SNURRR_SMURRR.png" alt="SMURRR spectral processor with waveform and time selection">
</div>
<div class="col" markdown="1">
<img src="/docs/assets/images/projects/SNURRR/SNURRR_SMURRR_2.png" alt="SMURRR spectrogram with transient and low-frequency detail">
</div>
</div>

The spectrogram is designed specifically for percussive material. A short analysis window resolves sharp transients, while a longer window gives bass frequencies enough resolution to show individual notes. The two views are blended into one display.

## Sound engines

Each of the two independent samplers can play an untouched recording, a SMURRR texture, or synthesised noise. That makes it possible to combine a real transient with an artificial tail, or build a hit entirely from generated components.

**Sample playback** loops the frozen texture and adds a second, slightly detuned playhead for movement. Resonance shaping is derived from the sample itself, while grain randomisation changes each hit's starting point.

**Additive playback** reconstructs the texture using up to 384 sine oscillators tuned to the strongest frequencies SMURRR finds. Because the partials are independent, the sound can be reshaped beyond what a conventional filter allows. Focus, harmonic emphasis and fixed-frequency shifting can take the same source from a stable tone to an inharmonic, metallic sound.

**Noise** provides five synthesised sources, from saturated sample-and-hold noise to filtered, metallic, granular and resonant noise. These engines can supply everything from a transient layer to a complete synthetic hat or percussion sound.

<img src="/docs/assets/images/projects/SNURRR/SNURRR_Additive.png" alt="Additive engine with its partials display">

## The Body

The Body is an independent synthesiser for the weight and impact beneath the upper layers. It has three engines, each polyphonic to eight voices so fast rolls can overlap naturally.

- **Tonal** uses a struck resonator for tuned kicks and toms, with options for saturation, pitch sweep and a noise component that follows the resonator.
- **Modal** models a drum head using ten resonant modes and a separate four-mode shell. Its modes respond differently to damping, while variation can introduce small per-hit changes in pitch and decay.
- **Swept** recreates the pitched drop of a classic analogue drum machine oscillator, with selectable waveforms, glide, detuning and drive.

<img src="/docs/assets/images/projects/SNURRR/SNURRR_Body.png" alt="SNURRR Body synthesiser with its three sound engines">

## Processing and routing

Sampler A, Sampler B and the Body feed two independently routable distortion modules, a six-stage effects chain, master EQ and output envelope. The modules can be routed to distort one layer or the whole mix. Routing the two drives into each other creates a feedback path for more extreme results.

The distortion engines include smooth saturation, hard clipping, polynomial clipping, wavefolding, bit crushing and asymmetric diode clipping. Each drive has four-band EQ before and after the distortion, so the frequencies entering the nonlinear stage can be shaped separately from its output. Global 2x and 4x oversampling helps reduce aliasing.

The six effects can be reordered freely. They cover transient control, resonant filtering, phase dispersion, clipping, multiband compression and a three-engine reverb that blends room, plate and convolution. The full chain is designed to move from subtle cleanup to heavily reshaped, synthetic percussion.

<img src="/docs/assets/images/projects/SNURRR/SNURRR_FX.png" alt="SNURRR Drive modules, six-stage effects chain, master EQ and output section">

## Visualization and batch work

SNURRR's graphs are part of the instrument, not just meters. Waveforms and spectrograms expose the source selection, while the Additive and Body displays show the partials or resonances that shape the resulting sound. Every module's envelope can be edited directly on its graph, with a rendered preview of the current settings.

Batch mode turns a folder of recordings into a set of selectable sources. The spectral display stacks one curve per file, SMURRR processes the group together, and each sampler can select its own track. This makes it practical to explore variations across a collection of kicks, snares or found sounds without repeating the same setup for every file.

<img src="/docs/assets/images/projects/SNURRR/SNURRR_Batch.png" alt="Batch spectral processing with stacked curves for multiple source files">

## Under the hood

SNURRR is written in C++ on iPlug2, with a shared codebase for the plugin formats and standalone app. The DSP and interface layers are reusable outside the plugin itself.

The audio thread avoids memory allocation, locks and file access. Parameter updates use atomics, trigger events use serial counters, and sample data is passed through atomically swapped shared pointers. Preview rendering and spectrogram analysis run on a background worker so graph interaction does not interrupt audio.

The FFT, spectrogram analysis, WAV and AIFF decoding, and DSP modules are custom. The Additive engine runs up to 384 oscillators per channel per sampler using a rotation recurrence instead of per-sample sine calls. The interface is custom drawn with GPU-cached layers, four colour themes and high-DPI scaling.
