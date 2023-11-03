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
        <img src="{{ "/docs/assets/images/site/231103-headshot-7-square.jpg" }}" alt="{{ Portrait }}" class="circle-image wow animated zoomIn" data-wow-delay=".1s">
      </div>
    </div>
</div>

<div class="col">

Hey, I'm K.<br><br>
I'm a musician, composer, audio programmer, synthesizer designer, student, and general creative enthusiast. <br><br>
My projects blend my artistic and technical passions to bring forth new sonic experiences, be it through the sound of a video game, a cinematic score, an inspired album, or new tools to help other musicians realize their artistic visions.<br><br>
Let's make something amazing together.

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