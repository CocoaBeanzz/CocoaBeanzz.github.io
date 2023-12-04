---
title: "InfeStation: Generative Ambient Music with MetaSounds (First Draft)"
date: 2023-09-20
tags: [InfeStation, Composition, Audio Programming, Sound Design, Tech, Unreal Engine, MetaSounds]
style: border
color: danger
description: "Building a generative ambient horror soundtrack with MetaSounds in Unreal Engine 5."
image: "/docs/assets/images/projects/infestation/posts/InfeStation-Generative-Ambient-Music-MetaSound-First-Draft/postpreview.png"
---

<img src="/docs/assets/images/projects/infestation/posts/InfeStation-Generative-Ambient-Music-MetaSound-First-Draft/postpreview.png" alt="Title Image">

## Generative Ambient Music with MetaSounds in Unreal Engine 5

InfeStation, the upcoming sci-fi horror shooter from Black Hole Syndicate, 
will feature a generative ambient music system using MetaSounds in Unreal Engine 5.

This first draft of the music system lays the foundation for the style of the game's atmospheric sound. 

{% include elements/video.html id="JQxVQkRO5qA" %}

### Setting the Tone

The game's setting is a derelict space station named the StarBright 12. This craft has been overrun by vicious creatures. 
The crew is long gone, either via the ship's escape pods or as treats to the station's ravenous new inhabitants. 
The player awakens from stasis well after the initial chaos and is tasked with escaping this infested ship.

<img src="/docs/assets/images/projects/infestation/posts/InfeStation-Generative-Ambient-Music-MetaSound-First-Draft/sc1.png" alt="Screenshot">

I sought to capture the cold, empty feeling of an abandoned space station, 
ridden with the horrific tension of monsters scittering throughout its hull. 
This took the form of piercing ethereal screeches echoing in a reverberant abyss,
nervous clicks and taps that rattle through your head, 
and booming impacts like the shudders of the station's decaying frame, 
all encased in a bed of static grit reminiscent of a distant, dying radio.

My colleague [Max van Ginneken](https://www.linkedin.com/in/maxvgn/) had drafted some music for this project previously from which I drew heavy inspiration.
My task upon joining this team has been to refine and develop upon the groundwork Max had set.

References for InfeStation's musical style include Martin Stig Andersen's work on Control,
Morton Subotnick's Silver Apples of the Moon, Mikko Tarmia's soundtrack for SOMA, 
Mick Gordon's compositions for Prey and Doom, and Allessandro Cortini's album SCURO CHAIRO. 

### Specialized Instruments

I built this system with abstraction in mind, designing individual segments with general purposes that would come into use again elsewhere.

This structure is similar to how I've approached my work with modular synthesizers. 
Rather than build an "ambient drone" synth, I prefer to design several smaller modules with precise scopes, 
such as a voltage-controlled amplifier with adjustable response curvature, 
an oscillator with waveshaping to give access to a particular palette of tones, 
and a delay with stereo inserts on the feedback path. 

This is also much like "abstraction" in the context of programming. 
As Professor Doug Schilling at DigiPen Institute of Technology often preaches:

> *"Give each entity one cohesive responsibility."*

Don't create a C++ class that runs the whole game. 
Create a class that handles vector data, a class that processes vector data, a class that interprets vector data as physical attributes, et cetera.

As I set forth outlining InfeStation's ambient music system, I had to consider which tools would find repeated use throughout the process.
It quickly became apparent that our project would benefit from an in-house custom MetaSound node library.
With two audio programmers on the team (myself and [Ander Weiss](https://www.linkedin.com/in/xweiss/)) experienced in digital signal processing, 
we had the opportunity to build powerful new tools with which to create our sounds.

{% include elements/video.html id="XX8Iij5tuZU" %}

Some of my favorite MetaSound tools we've created for the project so far include:
- Clompit: Clipper, noise, limiter, and compressor with a range of subtle color and glue to utter tonal destruction.
- Clicker Swarm: An array of pinged resonant filters, mixed and distorted into a mind-splitting cacophony of scratches and grit.
- Delphine Delay: A gritty, warbly delay with a dirty and smeared character driven by both simulated tape and digital degradation in the feedback path.
- Cosmic Roar: A bizarre synthesizer with a voice ranging from colossal ethereal wails to deep shuddering rumbles.

{% include elements/video.html id="6gqRVUb5LhU" %}

These sounds are all used in the current generative music draft.

### Next Step: Driving Parameters

I wrapped all the major controls into a handful of "macro" parameters for the system, 
a set of musically playable inputs that significantly change the tone of the music.

{% include elements/video.html id="b-moqIVEz9M" %}

The next step is to tie these settings to gameplay drivers. 
For example, a scripted event could increase the abrasiveness of the music, or an enemy lurking nearby could make it more eery.
With the right parameters in place, the creative implementation opportunities are endless. 
I hope to work closely with the game design department to create some immersive and engaging soundscapes.