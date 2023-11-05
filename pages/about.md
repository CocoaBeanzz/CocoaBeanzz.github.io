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

<b>Hey, I'm K.</b><br><br>
I'm a musician, composer, audio programmer, synthesizer designer, student, and general creative enthusiast. <br><br>
My projects blend my artistic and technical passions to bring forth new sonic experiences, be it through the sound of a video game, a cinematic score, an inspired album, or new tools to help other musicians realize their artistic visions.<br><br>
Let's make something amazing together.

</div>
</div>
<br>
<br>
<hr>

# **Skills**

<div class="row">
<div class="container-fluid" style="display: grid; @media screen and (max-width:720px) {grid-template-columns: repeat(auto-fill, 50%);} grid-template-columns: repeat(auto-fill, 25%)">
<div class="col">
{% include about/skills.html title="Languages" source=site.data.languages %}
</div>
<div class="col">
{% include about/skills.html title="Packages" source=site.data.packages %}
</div>
<div class="col">
{% include about/skills.html title="Instruments" source=site.data.instruments %}
</div>
<div class="col">
{% include about/skills.html title="Software" source=site.data.software %}
</div>
</div>
</div>
<hr>

# **Project Timeline**
<div class="row">
{% include about/timeline.html %}
</div>