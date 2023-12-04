---
title: "InfeStation: Mathematically Emotion-Driven Adaptive Music"
date: 2023-11-14
tags: [InfeStation, Composition, Audio Programming, Sound Design, Tech, Unreal Engine, MetaSounds]
style: border
color: danger
description: "Generative music driven by an emotional algorithm."
image: "/docs/assets/images/projects/infestation/posts/InfeStation-Mathematically-Emotion-Driven-Adaptive-Music/InfeStation_e_11_edit.png"
---

<img src="/docs/assets/images/projects/infestation/posts/InfeStation-Mathematically-Emotion-Driven-Adaptive-Music/InfeStation_e_11_edit.png" alt="Title Image">
<br>
### See [this post](InfeStation-Generative-Ambient-Music-MetaSound-First-Draft) for a brief overview of InfeStation's music system.

## Mathematically Emotion-Driven Adaptive Music

InfeStation, the upcoming sci-fi horror shooter from Black Hole Syndicate, 
will feature a generative ambient music system using MetaSounds in Unreal Engine 5.

The music in InfeStation is driven by a mathematical model of emotional parameters guided by gameplay environments and events.

{% include elements/video.html id="5cg8jPFeIaQ" %}

The first half of this video demonstrates some of the effects of emotional parameter modulation in the game's generative soundtrack system.

<br>
##### [Ander Weiss](https://www.linkedin.com/in/xweiss/) is the lead developer of InfeStation's emotion system, so I will only give a brief overview.
<br>

### The PAD Emotional State Model

The PAD Emotional State Model generalizes human emotions into three scales. 
Each complex emotion can be represented as a combination of values on each scale.

From [WikiPedia](https://en.wikipedia.org/wiki/PAD_emotional_state_model):

> The *Pleasure-Displeasure Scale* measures how pleasant or unpleasant one feels about something. For instance, both anger and fear are unpleasant emotions, and both score on the displeasure side. However, joy is a pleasant emotion.
>
> The *Arousal-Nonarousal* Scale measures how energized or soporific one feels. It is not the intensity of the emotion -- for grief and depression can be low arousal intense feelings. While both anger and rage are unpleasant emotions, rage has a higher intensity or a higher arousal state. However boredom, which is also an unpleasant state, has a low arousal value.
>
> The *Dominance-Submissiveness* Scale represents the controlling and dominant versus controlled or submissive one feels. For instance, while both fear and anger are unpleasant emotions, anger is a dominant emotion, while fear is a submissive emotion.

InfeStation uses an additional *Cognitive* Scale to represent the range of surprise to anticipation, which we saw particularly fit for a horror game.

These values are represented as four-dimensional vectors in the game engine, managed by an emotion system that interprets data from dialogue, environments, and events.

These vectors are normalized to a range of -1 to 1, with influence diminishing in effect as each axis nears a minimum or maximum.
The generative music system then interprets these values to control musical parameters that influence the nature of the game's soundtrack.

#### The Plutchik Emotion Map

The Plutchik Emotion Map is another popular approach to emotional analysis, often used in psychology and design studies.
We found this map to be more intuitive for our narrative designers, so Plutchik terminology is prevalent in our design documents and scripts.
We then converted these emotions to the PAD Model with an algorithm in Microsoft Excel.

Below are some examples of how common complex emotions map to our system.

<img src="/docs/assets/images/projects/infestation/posts/InfeStation-Mathematically-Emotion-Driven-Adaptive-Music/PlutchikToPAD.png" alt="PlutchikToPAD">
<img src="/docs/assets/images/projects/infestation/posts/InfeStation-Mathematically-Emotion-Driven-Adaptive-Music/Dyads.png" alt="Dyads">
<img src="/docs/assets/images/projects/infestation/posts/InfeStation-Mathematically-Emotion-Driven-Adaptive-Music/ScaledVectors.png" alt="ScaledVectors">

### Emotion-Driven Generative Soundtrack

Within the ambient music MetaSound, the PAD vocabulary is reinterpreted to more general musical descriptors.
These values are then scaled, shifted, and mapped to some of the macro controls I had already configured in the main MetaSound music patch,
as well as distributed to several less consequential modulation inputs throughout the graph.

<img src="/docs/assets/images/projects/infestation/posts/InfeStation-Mathematically-Emotion-Driven-Adaptive-Music/EmotionalProcessing.png" alt="EmotionalProcessing">

With everything in place, emotional descriptors assigned to gameplay elements, Ander's incredible emotion framework up and running, and emotional vectors
integrated into the generative music system, the game's atmosphere suddenly takes on a life of its own.
As the player navigates through the levels and interacts with the world around them, the music shifts and turns to reflect the narrative of the game.

In this video, emotions are randomly modulated with interpolated Perlin noise to simulate their changes during gameplay. 
The music is entirely generated in real-time with no loops or pre-recorded segments.
After starting the patch, pseudorandom chaos was the sole musician of this piece, constrained to a cohesive musical realm I had crafted.
{% include elements/video.html id="7kJlcUJgIAE" %}