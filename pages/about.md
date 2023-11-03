---
layout: page
title: About
permalink: /about/
weight: 3
---

<div class="row">
<div class="col">
    <!-- Fine Circle Responsive Image -->
    <div id="container" class="my-2">
      <div id="dummy"></div>
      <div id="element">
        <img src="{{ "/docs/assets/images/site/me_painting_5_12_23_SMALL.png" }}" alt="{{ Portrait }}" class="circle-image wow animated zoomIn" data-wow-delay=".1s">
      </div>
    </div>
</div>

<div class="col">

Hey, I'm K.<br>
I'm a musician, composer, audio programmer, synthesizer designer, student, and general creative hobbyist. This is my blog for my music-related projects. 

</div>
</div>

# **About Me**

<div class="row">
{% include about/skills.html title="Languages" source=site.data.languages %}
{% include about/skills.html title="Packages" source=site.data.packages %}
{% include about/skills.html title="Software" source=site.data.software %}
</div>

<div class="row">
{% include about/timeline.html %}
</div>