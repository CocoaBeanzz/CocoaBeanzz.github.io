---
name: Wally the Wobblesynth
role: Engineer (Solo)
tools: [Hardware]
tags: [Audio]
image: /docs/assets/images/projects/wally/wally-on-5.jpg
description: Simple analog wobble synthesizer.
---

<div class="project-header" markdown="1">
<img  src="/docs/assets/images/projects/wally/wally-title.png" width="100%" alt="Title Image" align="left">
(Hardware, Synthesizer, Standalone)
</div>

{% capture list_items %}
Quick Start Guide
Manual
Schematic
Gallery
{% endcapture %}
{% include elements/list.html title="" type="toc" %}

<div class="project-intro">
<div class="project-intro-media">
<img src="/docs/assets/images/projects/wally/wally-on-5.jpg" alt="Title Image">
</div>
<div class="project-intro-text" markdown="1">
Wally is a fully analog "Wobblesynth" designed to generate the classic wobble sound reminiscent of early dubstep.

Wally is designed to be simple, handheld, and easily accessible to those without prior experience with synthesizers. The controls have immediate and gratifying results and are calibrated to ranges more likely to produce "acceptable" sounds.

<img src="/docs/assets/images/projects/wally/wally-art.png" alt="Artwork">
</div>
</div>

## Quick Start Guide
{% assign pdf="/docs/assets/pdfs/projects/wally/wally-quick-start-guide.pdf" -%}
<object data="{{pdf}}" type="application/pdf" width="100%" height="1000px">
    <embed src="{{pdf}}" type="application/pdf">
        <p>This browser does not support PDFs. Please <a href="{{pdf}}">download the PDF</a> to view it.</p>
    </embed>
</object>

## Manual
{% assign pdf="/docs/assets/pdfs/projects/wally/wally-manual.pdf" -%}
<object data="{{pdf}}" type="application/pdf" width="100%" height="1000px">
    <embed src="{{pdf}}" type="application/pdf">
        <p>This browser does not support PDFs. Please <a href="{{pdf}}">download the PDF</a> to view it.</p>
    </embed>
</object>

## Schematic
{% assign prefix="/docs/assets/images/projects/wally/wally-" -%}
{% assign filetype=".jpg" -%}
<img src="{{prefix}}schematic{{filetype}}" alt="Schematic">

## Gallery
### Beauty Shots
{% assign prefix="/docs/assets/images/projects/wally/wally-on-" -%}
{% assign filetype=".jpg" -%}
{% capture carousel_images %}
{{prefix}}1{{filetype}}
{{prefix}}2{{filetype}}
{{prefix}}3{{filetype}}
{{prefix}}4{{filetype}}
{{prefix}}5{{filetype}}
{% endcapture %}
{% include elements/carousel.html %}
### Hardware
{% assign prefix="/docs/assets/images/projects/wally/wally-off-" -%}
{% assign filetype=".jpg" -%}
{% capture carousel_images %}
{{prefix}}1{{filetype}}
{{prefix}}2{{filetype}}
{{prefix}}3{{filetype}}
{{prefix}}4{{filetype}}
{{prefix}}5{{filetype}}
{% endcapture %}
{% include elements/carousel.html %}
### Development
{% assign prefix="/docs/assets/images/projects/wally/wally-dev-" -%}
{% assign filetype=".jpg" -%}
{% capture carousel_images %}
{{prefix}}1{{filetype}}
{{prefix}}2{{filetype}}
{{prefix}}3{{filetype}}
{{prefix}}4{{filetype}}
{% endcapture %}
{% include elements/carousel.html %}
