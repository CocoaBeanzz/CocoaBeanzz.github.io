---
layout: page
title: About
permalink: /about/
weight: 6
---

# About Me

<div class="row">
<div class="col">
    <!-- Fine Circle Responsive Image -->
    <div id="container" class="my-2">
      <div id="dummy"></div>
      <div id="element">
        <img src="{{ "/docs/assets/images/site/240626-headshot-4-square.jpg" }}" alt="{{ Portrait }}" class="circle-image wow animated zoomIn" data-wow-delay=".1s">
      </div>
    </div>
</div>

<div class="col">

<b>Hey, I'm K.</b><br><br>
I'm a musician, composer, audio programmer, synthesizer designer, student, and general creative enthusiast. <br><br>
My projects blend my artistic and technical passions to bring forth new sonic experiences, be it through the sound of a video game, a cinematic score, an inspired album, or new tools to help other musicians realize their artistic visions.<br><br>
I am currently attending my fourth and final year at DigiPen Institute of Technology in pursuit of a Bachelor's in Science in Computer Science and Digital Audio
and a minor in mathematics.<br><br>
Let's make something amazing together.
<br><br>
<hr>
<div class="col" markdown="1">
<div class="row" markdown="1">
# **Links**
</div>
<div class="row" markdown="1">
<div class="col" markdown="1">
#### [LinkedIn](https://www.linkedin.com/in/kl-preston)

#### [GitHub](https://www.github.com/CocoaBeanzz)

#### [Email](k@kaud.io)
</div>
<div class="col" markdown="1">
#### [Spotify](https://open.spotify.com/artist/6YVhlNw952WlFsXddTPgOY)

#### [SoundCloud](https://www.soundcloud.com/CocoaBeanz)

#### [YouTube](https://www.youtube.com/KPresto)
</div>
</div>
</div>
</div>
</div>
<br>
<br>
<hr>

# **Skills**

<div class="row">
<div class="container-fluid" style="display: grid; @media screen and (max-width:720px) {grid-template-columns: repeat(auto-fill, 50%);} grid-template-columns: repeat(auto-fill, minmax(200px, 1fr))">
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