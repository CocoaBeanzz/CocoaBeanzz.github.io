---
layout: page
title: About
permalink: /about/
weight: 6
---

# About Me
<div class="row">
<div class="col">
{% assign prefix="/docs/assets/images/site/headshots/headshot-" -%}
{% assign filetype=".jpg" -%}
{% capture carousel_images %}
{% assign height = "720px" -%}
{% assign interval="2500" -%}
{{prefix}}1{{filetype}}
{{prefix}}2{{filetype}}
{{prefix}}3{{filetype}}
{{prefix}}4{{filetype}}
{{prefix}}5{{filetype}}
{{prefix}}6{{filetype}}
{{prefix}}7{{filetype}}
{{prefix}}8{{filetype}}
{% endcapture %}
{% include elements/circlesel.html %}
</div>

<div class="col">

<b>Hey, I'm K.</b><br><br>
I'm a musician, composer, audio programmer, synthesizer designer, and general creative enthusiast. <br><br>
My projects blend my artistic and technical passions to bring forth new sonic experiences, be it through the sound of a video game, a cinematic score, an inspired album, or new tools to help other musicians realize their artistic visions.<br><br>
I recently graduated from DigiPen Institute of Technology with a Bachelor's in Science in Computer Science and Digital Audio
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