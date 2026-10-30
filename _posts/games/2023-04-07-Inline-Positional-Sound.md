---
title: "Inline: Out of Time - Positional Sound"
date: 2023-04-07
tags: [Tech Overview, Tech, Audio Programming, Custom Engine, Spatial Audio]
project: "Inline: Out of Time"
style: border
color: warning
description: "Breaking down the formulae driving Inline: Out of Time's stereo imaging."
image: "/docs/assets/images/projects/inline-out-of-time/posts/inline-positionalsound-postpreview.png"
also_in: [dev]
math: true
---
{%- comment -%}
Text and figures copied from the original design document, which stays
linked at the bottom. Figures were rendered out of that PDF.
{%- endcomment -%}
{%- assign fig = '/docs/assets/images/projects/inline-out-of-time/posts/inline-positionalsound/' | relative_url -%}
{%- assign pdf = '/docs/assets/pdfs/projects/inline-out-of-time/inline-positionalsound.pdf' | relative_url -%}

{% capture list_items %}
Goal
Notes
Algorithm
Figures
{% endcapture %}
{% include elements/list.html title="" type="toc" %}

## Goal
Simulate basic distance and position driven acoustic properties including stereo panning, inverse-square law, and Doppler effect.

## Notes
- For this model to more accurately respond to relative velocities and not be affected by framerate, the comparison of distance to last distance in the Doppler formula should be replaced with a velocity comparison scaled by $$\Delta \mathit{time}$$.
- The volume scale formula modifies the powers of the inverse-square law to better fit gameplay, tuned to accentuate the volume ramp when the distance between the source and listener is either very small or greater than one screen width. When the distance is between these ranges, the change in volume with distance is less dramatic.

## Algorithm
### Driving Data:
- Relative positions of source and listener objects

### Logic:
#### Each frame:
- Set the stereo pan as a proportion of horizontal distance to camera bounds width.

  $$\mathit{pan} = \frac{\mathit{source\ x} - \mathit{listener\ x}}{\mathit{width}}$$

  where $$\mathit{pan}$$ controls left/right stereo balance, with -1 being fully left and 1 being fully right, $$\mathit{source\ x}$$ is the source's x position, $$\mathit{listener\ x}$$ is the listener's x position, and $$\mathit{width}$$ is the width of the camera bounds.
- If the horizontal distance between the source and listener is less than two screen widths (scaled by a given parameter):
  - Scale volume with the following function:

    $$\mathit{volume} \mathrel{*}= \frac{(\mathit{width} - \mathit{distance})^3}{(2 * \mathit{width})^3} + 0.5$$

    where $$\mathit{volume}$$ scales the output volume from 0-1, $$\mathit{distance}$$ refers to the 2-dimensional distance between the source and listener, and $$\mathit{width}$$ is the width of the camera bounds.
  - Offset frequency with the following function:

    $$\mathit{frequency} \mathrel{-}= \frac{\Delta \mathit{distance}}{(2 * \mathit{width})}$$

    where $$\mathit{frequency}$$ offsets the sound's frequency multiplier, $$\Delta \mathit{distance}$$ refers to the change in 2-dimensional distance between the source and listener this frame, and $$\mathit{width}$$ is the width of the camera bounds.
- If the horizontal distance between the source and listener is greater than two screen widths (scaled by a given parameter), set the source volume to 0.

## Figures
### Pan
<img src="{{ fig }}pan.png" alt="Linear relationship between pan and horizontal distance between the source and listener.">
Linear relationship between pan and horizontal distance between the source and listener.
{: .figure-caption}

$$\mathit{pan} = \frac{\mathit{source\ x} - \mathit{listener\ x}}{\mathit{width}}$$

### Volume Scale
<img src="{{ fig }}volume-scale.png" alt="Relationship between volume scale and distance between the source and listener.">
Relationship between volume scale and distance between the source and listener.
{: .figure-caption}

$$\mathit{volume} \mathrel{*}= \frac{(\mathit{width} - \mathit{distance})^3}{(2 * \mathit{width})^3} + 0.5$$

### Frequency Offset
<img src="{{ fig }}frequency-offset.png" alt="Linear relationship between frequency scale offset and distance between the source and listener.">
Linear relationship between frequency scale offset and distance between the source and listener.
{: .figure-caption}

$$\mathit{frequency} \mathrel{-}= \frac{\Delta \mathit{distance}}{(2 * \mathit{width})}$$

Note that because the calculation result is subtracted from the frequency multiplier, the audible result is the inverse of the illustration above.

<div class="link-buttons" markdown="1">
[Original document (PDF)]({{ pdf }})
</div>
