---
name: Moorer Reverb
tools: [C++, JUCE, DSP]
image: /docs/assets/images/projects/wally/wally-on-5.jpg
description: Realtime delay-based reverb.
---

<div class="row">
<div class="col" style="min-width:300px; max-width:500px;">
<img  src="/docs/assets/images/projects/wally/wally-title.png" width="100%" alt="Title Image" align="left">
(Software, Effect, Standalone)
</div>
<div class="col">
</div>
<div class="col" style="max-width:30%;">
{% capture list_items %}
Quick Start Guide
Manual
Schematic
Gallery
{% endcapture %}
{% include elements/list.html title="" type="toc" %}
</div>
</div>

<div class="row">
<div class="col">
<img src="/docs/assets/images/projects/wally/wally-on-5.jpg" alt="Title Image">
</div>
<div class="col">

<div class="row">
A realtime 6 tap delay and all-pass modeled after <a href="https://www.researchgate.net/publication/239735102_About_This_Reverberation_Business">James A. Moorer's paper</a> for Computer Music Journal titled "About This Reverberation Business."

</div>
<br>
<div class="row">
<div class="col">
</div>
<div class="col" style="min-width:80%;">
<img src="/docs/assets/images/projects/wally/wally-art.png" alt="Artwork">
</div>
</div>
</div>
</div>

## Design


## Parameters


## Videos
{% assign prefix="/docs/assets/images/projects/wally/wally-" -%}
{% assign filetype=".jpg" -%}
<img src="{{prefix}}schematic{{filetype}}" alt="Schematic">

## Gallery
{% assign prefix="/docs/assets/images/projects/wally/wally-dev-" -%}
{% assign filetype=".jpg" -%}
{% capture carousel_images %}
{{prefix}}1{{filetype}}
{{prefix}}2{{filetype}}
{{prefix}}3{{filetype}}
{{prefix}}4{{filetype}}
{% endcapture %}
{% include elements/carousel.html %}

## James A. Moorer - About This Reverberation Business
{% assign pdf="/docs/assets/pdfs/projects/moorer-reverb/moorer-paper.pdf" -%}
<object data="{{pdf}}" type="application/pdf" width="100%" height="1000px">
    <embed src="{{pdf}}" type="application/pdf">
        <p>This browser does not support PDFs. Please <a href="{{pdf}}">download the PDF</a> to view it.</p>
    </embed>
</object>