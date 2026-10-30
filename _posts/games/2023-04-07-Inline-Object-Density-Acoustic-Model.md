---
title: "Inline: Out of Time - Object Density Acoustic Model"
date: 2023-04-07
tags: [Tech Overview, Tech, Audio Programming, Custom Engine, Engine Architecture]
project: "Inline: Out of Time"
style: border
color: warning
description: "Deconstruction and analysis of Inline: Out of Time's highly optimized environmentally-driven acoustic model."
image: "/docs/assets/images/projects/inline-out-of-time/posts/inline-acousticmodel-postpreview.png"
also_in: [dev]
---
{%- comment -%}
Text and figures copied from the original design document, which stays
linked at the bottom. Figures were rendered out of that PDF.
{%- endcomment -%}
{%- assign fig = '/docs/assets/images/projects/inline-out-of-time/posts/inline-acousticmodel/' | relative_url -%}
{%- assign pdf = '/docs/assets/pdfs/projects/inline-out-of-time/inline-acousticmodel.pdf' | relative_url -%}

{% capture list_items %}
Goal
Notes
Algorithm
Test Level Data
Example Scenarios
Possible Optimizations
{% endcapture %}
{% include elements/list.html title="" type="toc" %}

## Goal
Simulate echo/reverb from the proximity of several objects to the listener.

## Notes
- This system applies to all sound effects in the game world, but parameters are only driven by object density around the listener. Modeling each source's acoustic response, as perceived by a separate listener, based on the source's unique surroundings would be far more complex and computationally expensive.
- This system foregoes stereo panning of reverberations. This would require independent echo/reverb DSPs for each channel with parameters driven by objects on each side of the listener.

## Algorithm
### Driving Data:
- Density of objects around the listener, determined by:
  - The number of objects near the listener
  - The average distance of nearby objects from the listener

### Logic:
#### Initialization:
- The listener stores the positions of all static objects.
  - Optionally, this may also record object sizes.

#### Each frame:
- Each dynamic collider reports its position to the listener.
  - Colliders may optionally report their sizes.
- The listener sorts through the position data and ignores objects over a certain distance from the listener.
- The listener sets its echo/reverb DSP parameters as following:
  - Echo/reverb balance:
    - Number of objects near the listener
      - More objects = biased toward reverb
      - Less objects = biased toward echo
    - Average distance of objects from listener
      - Greater distance = biased toward reverb
      - Lesser distance = biased toward echo
    - Optional: average objects size
      - More small objects = biased toward reverb
      - More large objects = biased toward echo
  - Echo time:
    - Average distance of objects from listener
      - Greater distance = longer time
      - Lesser distance = shorter time
  - Reverb time:
    - Number of objects near listener
      - More objects = shorter time
      - Less objects = longer time
  - Effect level:
    - Number of objects near listener
      - More objects = lower level
      - Less objects = higher level

## Test Level Data
<img src="{{ fig }}test-level.png" alt="">

The test level consisted of 3 sloped corridors, each gradually increasing in room size. The first ramp contained no objects, the second contained a single row of objects, and the third contained two rows of objects. During data collection, the listener moved at a constant horizontal speed through the level.

<img src="{{ fig }}object-density-over-time.png" alt="Level Object Density Over Time">
This graph illustrates the two parameters for the acoustic model, proximal object count and average object distance^2, as the listener moved through the test level at a constant rate. Frames below 250 may be disregarded, as they were affected by a mistakenly-placed foreground object.
{: .figure-caption}

<img src="{{ fig }}reflection-diffusion-times.png" alt="This graph illustrates the reflection and diffusion times in response to the object density parameters as the listener moved through the test level at a constant rate.">
This graph illustrates the reflection and diffusion times in response to the object density parameters as the listener moved through the test level at a constant rate.
{: .figure-caption}

<img src="{{ fig }}reflection-diffusion-mixes.png" alt="This graph illustrates the reflection and diffusion mixes, ranging 0-1, in response to the object density parameters as the listener moved through the test level at a constant rate.">
This graph illustrates the reflection and diffusion mixes, ranging 0-1, in response to the object density parameters as the listener moved through the test level at a constant rate.
{: .figure-caption}

## Example Scenarios
### Open Space
- **Reflection:**
  - Amount: Very low
  - Time: Short
- **Diffusion:**
  - Amount: Very low
  - Time: Long

### Large Enclosed Space
- **Reflection:**
  - Amount: Medium
  - Time: Long
- **Diffusion:**
  - Amount: Small
  - Time: Long

### Large Enclosed Space With Objects
- **Reflection:**
  - Amount: Medium
  - Time: Long
- **Diffusion:**
  - Amount: Medium
  - Time: Medium

### Medium Enclosed Space
- **Reflection:**
  - Amount: Medium
  - Time: Medium
- **Diffusion:**
  - Amount: Medium
  - Time: Medium

### Medium Enclosed Space With Objects
- **Reflection:**
  - Amount: Low
  - Time: Medium
- **Diffusion:**
  - Amount: Medium
  - Time: Short

### Small Enclosed Space
- **Reflection:**
  - Amount: High
  - Time: Short
- **Diffusion:**
  - Amount: Small
  - Time: Medium

### Small Enclosed Space With Objects
- **Reflection:**
  - Amount: Very low
  - Time: Very Short
- **Diffusion:**
  - Amount: Very low
  - Time: Very short

## Possible Optimizations
- A simplified data model could assume reverberation time and level solely from the number of objects near the listener.
- Updates could be distributed over multiple frames.

<div class="link-buttons" markdown="1">
[Original document (PDF)]({{ pdf }})
</div>
