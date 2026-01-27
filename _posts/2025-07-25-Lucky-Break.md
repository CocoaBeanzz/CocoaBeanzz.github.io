---
title: "Lucky Break (Seattle)"
date: 2025-07-25
tags: [K Presto, Live Performance, Shows, Highlight]
style: border
color: warning
description: A hard-hitting bouncy bassy rave in Seattle with K Presto and friends!
image: "/docs/assets/images/projects/k-presto/LuckyBreak/LB_Thumb.jpg"
location: "REBL 1 Studios | Seattle, WA, USA"
---

## LUCKY BREAK | REBL 1 Studios | Seattle, WA, USA

<img src="/docs/assets/images/projects/k-presto/LuckyBreak/Banner.png" alt="banner">

I played a delightful little rave with my friends Iko, Hamwich, and Dimage! 
We shared a colorful assortment of bass, breaks, garage, dnb, house, and more among a 
energetic, intimate crowd. It was a blast!

I'm grateful for the opportunity to work with such a sweet and talented team to put this night together. 

<div row markdown=1 style="height:800px; ">
## Gallery
{% assign prefix="/docs/assets/images/projects/k-presto/LuckyBreak/LB_" -%}
{% assign filetype=".jpg" -%}
{% capture carousel_images %}
{%- assign height = "720px" -%}
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
{{prefix}}11{{filetype}}
{% endcapture %}
{% include elements/carousel.html %}
</div>

<div row markdown=1>
{% assign prefix="/docs/assets/images/projects/k-presto/LuckyBreak/LB_" -%}
{% assign filetype=".png" -%}
{% assign height="720px" -%}
{% capture carousel_images %}
{{prefix}}Iko{{filetype}}
{{prefix}}KPresto{{filetype}}
{{prefix}}Dimage{{filetype}}
{{prefix}}Hamwich{{filetype}}
{% endcapture %}
{% include elements/carousel.html %}
</div>

#### Lineup
- iko
- K Presto
- Dimage
- Hamwich

<hr>

### About K Presto:
K Presto is a musical project melding contemporary electronic music with metal and baroque influences.<br><br>

### Links:
<div class="row" markdown="1">
<div class="col" markdown="1">
### [Spotify](https://open.spotify.com/artist/6YVhlNw952WlFsXddTPgOY)
</div>

<div class="col" markdown="1">
### [Apple Music](https://music.apple.com/us/artist/k-presto/1073441282)
</div>

<div class="col" markdown="1">
### [YouTube Music](https://music.youtube.com/channel/UC3LezgQLQx0Y832j3)
</div>

<div class="col" markdown="1">
### [SoundCloud](https://soundcloud.com/kpresto/the-tower-k10-anniversary-remix)
</div>
</div>

<div class="row" markdown="1">
<div class="col" markdown="1">
### [Amazon Music](https://www.amazon.com/music/player/artists/B01A52DFU4/k-presto)
</div>

<div class="col" markdown="1">
### [Instagram](http://instagram.com/officialkpresto/)
</div>

<div class="col" markdown="1">
### [Facebook](www.facebook.com/kprestomusic)
</div>

<div class="col" markdown="1">
### [YouTube](www.youtube.com/channel/UCUen6Z997mMG6Q5OqhFu2eg)
</div>
</div>

## Booking
[mgmt@kaud.io](mailto:mgmt@kaud.io)

<hr>
## Related Posts
{% assign tagfilter="K Presto" -%}
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