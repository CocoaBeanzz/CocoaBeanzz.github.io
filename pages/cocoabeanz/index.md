---
layout: default
permalink: /cocoabeanz/
---

{% capture hero_intro %}
<div class="hero-intro-portrait">
{% assign prefix="/docs/assets/images/site/headshots/headshot-" -%}
{% assign filetype=".jpg" -%}
{% capture carousel_images %}
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
<p>
    <b>Hello!</b><br><br>
    I write game soundtracks of all genres and all kinds of fun experimental stuff.<br><br><br>
    Everything is free to download on Soundcloud.<br><br>
    <i>Enjoy :)</i>
</p>
{% endcapture %}
{% include landing/hero.html %}

<div class="media-pair band">
    {% include elements/video.html id="4h-pSsVyKsg" %}
    <iframe title="SoundCloud" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/soundcloud%253Aplaylists%253A1308055663&color=%238500ff&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=TRUE&show_teaser=TRUE&visual=true"></iframe>
</div>

{% include projects/features.html %}
{% include blog/highlights.html %}
