---
title: "K Presto | DAMAG3 - BLiND US Tour (San Francisco)"
date: 2025-08-03
tags: [K Presto, Live Performance, Shows]
style: border
color: danger
description: San Francisco went freaking crazy!
image: "/docs/assets/images/projects/k-presto/BLiND/SF/BLiND_SF_2.jpg"
location: "The Faight Collective | San Francisco, CA USA"
---

## K Presto @ The Faight Collective | San Francisco, CA USA
### DAMAG3 - BLiND Tour

<div row markdown=1 style="height:800px; ">
## Gallery
{% assign prefix="/docs/assets/images/projects/k-presto/BLiND/SF/BLiND_SF_" -%}
{% assign filetype=".jpg" -%}
{% capture carousel_images %}
{%- assign height = "720px" -%}
{{prefix}}1{{filetype}}
{{prefix}}2{{filetype}}
{% endcapture %}
{% include elements/carousel.html %}
</div>

#### Lineup
- DAMAG3
- Rob Apollo
- Hadji Gaviota
- Shno Xavier
- K Presto

<hr>
<img src="https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=1,background=white,quality=75,width=400,height=400/event-covers/iz/d2114cc6-ba41-48d1-85e9-c14410f2ea4e.png" alt="info">

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