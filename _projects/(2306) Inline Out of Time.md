---
name: "Inline: Out of Time"
tools: [C++, Custom Engine, FMOD Core]
image: "/docs/assets/images/projects/inline-out-of-time/edits/inline-5-edit.png"
description: Time-attack speedrunning platformer.
---

<div class="row">
<div class="col" style="min-width:300px; ">
<img  src="/docs/assets/images/projects/inline-out-of-time/inline-logo.png" width="100%" alt="Title Image" align="left">
<br>
(Platformer, Speedrunning, Arcade)
<a href="https://games.digipen.edu/games/inline-out-of-time">Available for Free on the DigiPen Game Gallery</a>
<a href="https://store.steampowered.com/app/2865360/Inline_Out_Of_Time/">Coming to Steam March 29</a>
</div>
<div class="col">
</div>
<div class="col" style="max-width:30%;">
{% capture list_items %}
Videos
Soundtrack
Gallery
Blog Posts
{% endcapture %}
{% include elements/list.html title="" type="toc" %}
</div>
</div>

{% include elements/steam-widget.html id="2865360" %}

<img src="/docs/assets/images/projects/inline-out-of-time/inline-endsplash.png" alt="Title Image">

<div class="row">
<div class="col">
<img src="/docs/assets/images/projects/inline-out-of-time/inline-5.png" alt="Title Image">
</div>
<div class="col">
<div class="row">
Inline: Out of Time is a 2D time-attack action platformer where you play as a roller-skating delivery person in a retro-futuristic 90s inspired city. You must complete your delivery routes as fast as possible to appease your corporate overlord, while still finding time to enjoy the sights of the city and your tunes.
</div>
<div class="row">
<div class="col">
<img src="/docs/assets/images/projects/inline-out-of-time/inline-mc-idle.gif" style="width:60px;" alt="Player">
</div>
<div class="col">
</div>
<div class="col">
<img src="/docs/assets/images/projects/inline-out-of-time/inline-yuna.png" alt="Yuna">
</div>
</div>
</div>
</div>


## Videos
{% include elements/video.html id="p-EAY_UiTBI" %}

## Soundtrack
(Electronica, Hip Hop, Techno)\
Instruments: Synthesizer, Vocals, Guitar
<iframe width="100%" height="600" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/1684824804&color=%23e7091f&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>

## Gallery
{% assign prefix="/docs/assets/images/projects/inline-out-of-time/inline-" -%}
{% assign filetype=".png" -%}
{% capture carousel_images %}
{{prefix}}1{{filetype}}
{{prefix}}2{{filetype}}
{{prefix}}3{{filetype}}
{{prefix}}4{{filetype}}
{{prefix}}5{{filetype}}
{{prefix}}6{{filetype}}
{{prefix}}7{{filetype}}
{{prefix}}8{{filetype}}
{{prefix}}9{{filetype}}
{{prefix}}10{{filetype}}
{{prefix}}menu{{filetype}}
{% endcapture %}
{% include elements/carousel.html %}

## Blog Posts
{% assign tagfilter="Inline: Out of Time" -%}
<div style="max-width: 1fr">
    <div class="row">
        <div class="container-fluid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));">
            {% for post in site.posts %}
                {% for tag in post.tags %}
                    {%- if tag == tagfilter -%}
                        <div class="col pl-1 pr-1">
                            {% include blog/post-card.html %}

                            {%- if forloop.index0 == 3 -%}
                                {%- break -%}
                            {%- endif -%}
                        </div>
                    {%- endif -%}
                {% endfor %}
            {% endfor %}
        </div>
    </div>
</div>