---
title: "InfeStation: Generative Ambient Music with MetaSounds (Retrospective)"
date: 2023-12-03
tags: [InfeStation, Composition, Audio Programming, Sound Design, Tech, Unreal Engine, MetaSounds]
style: border
color: danger
description: "I built a generative ambient horror soundtrack with MetaSounds in Unreal Engine 5."
image: "/docs/assets/images/projects/infestation/posts/InfeStation-Generative-Ambient-Music-MetaSound-Retrospective/InfeStation_e_3_edit.png"
---


<img src="/docs/assets/images/projects/infestation/posts/InfeStation-Generative-Ambient-Music-MetaSound-Retrospective/InfeStation_e_3_edit.png" alt="Title Image">
<br>
### See the [InfeStation Project Overview](../projects/2312-InfeStation) for project info.
### See [this post](InfeStation-Generative-Ambient-Music-MetaSound-First-Draft) for a brief overview of InfeStation's music system.

## Generative Ambient Music with MetaSounds in Unreal Engine 5 (Retrospective)

InfeStation, the upcoming sci-fi horror shooter from Black Hole Syndicate, 
will feature a generative ambient music system using MetaSounds in Unreal Engine 5.

This is a December 2023 retrospective on developing the game's music system.

{% include elements/video.html id="5cg8jPFeIaQ" %}

### A Shift in Tone

With the latest testing and implementation of new audio assets, we found that the music was often too abrasive, taking the mainstage rather than 
subtly complementing the existing atmosphere. I reworked the design of each sonic component of the ambient patch for a denser wash of mid-low
frequency content. This was fairly straightforward with the macro controls I had already configured. 
Most notably, I chose to route the majority of each voice's distortion *before* applying lowpass or high shelf filtering, as I felt that the
rich harmonic density of these muffled ethereal screeches perfectly matched the cold and ominous atmosphere of the project.

<img src="/docs/assets/images/projects/infestation/231203/editor/InfeStation_e_6.png" alt="Screenshot">

### Familiar Voices

In seeking inspiration for developing further nuance in InfeStation's sonic style, I found myself revisiting the work that 
[Max van Ginneken](https://www.linkedin.com/in/maxvgn/) had drafted in the game's first iterations.
I found certain tones and textures particularly compelling, and I felt that some of his original leitmotifs captured the 
signature tone of the game at its heart. 

I sampled and resynthesized some of my favorite sounds from that original soundtrack and mixed them into the ambient music.
The combat music from the game's alpha stage also saw its themes recapitulated in the game's new combat music and final sequence.

### New Instruments

This phase of development brought forth the need for some new tools in our musical palette.

Some of the new MetaSound patches that entered the soundscape:
- Blonk - Simple, dirty bass synth, akin to the Roland TB-303.
- Modulators - Simple envelope, LFO, and VCA neatly packaged together.
- Bongo Party - Sample-driven randomized taiko instrument.
- Empty - A booming, hollow, gritty synth sampled from Max's original sketch of the soundtrack.
- Unexpected - A wailing, ominous, lonesome synth sampled from Max's original sketch of the soundtrack.
- Stutter Vox - An eerie chopped vocal sampler.

### Combat

<img src="/docs/assets/images/projects/infestation/posts/InfeStation-Generative-Combat-Music-MetaSound-Retrospective/InfeStation_e_4_edit.png" alt="Title Image">

This iteration of the game also features the addition of a combat music system. 
Rather than the typical switch to a new piece of music, this system modifies the existing ambient music in real-time, 
adjusting its tone to add excitement and introducing additional musical voices to distinguish this gameplay state
as a new compositional segment. With a single boolean parameter, the ambient music system generates an introductory sting, 
a fresh and exciting combat sequence, and a satisfying outro to transition back into its original mood.

The style of InfeStation's combat music drew inspiration from the works of Broken Note, Rawtekk, Current Value, and Vorso.

<img src="/docs/assets/images/projects/infestation/231203/gameplay/InfeStation_gp_5.png" alt="Screenshot">
