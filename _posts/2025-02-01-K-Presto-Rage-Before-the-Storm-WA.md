---
title: "K Presto | DAMAG3 - Rage Before the Storm Tour (Washington)"
date: 2025-02-01
tags: [K Presto, Live Performance, Shows]
style: border
color: danger
description: "Raging with the homi3s in my hometown for DAMAG3's Rage Before the Storm Tour in Seattle. "
image: "/docs/assets/images/projects/k-presto/RBTS/Seattle/RBTS-Seattle-1.jpg"
location: "The Funhouse | Seattle, WA, USA"
---

## K Presto @ The Funhouse Seattle, WA, USA
### DAMAG3 - Rage Before the Storm Tour

<br>
I performed with DAMAG3, Figgy Babge, Rob Apollo, and Shno Xavier in my hometown of Seattle!

#### Lineup
- DAMAG3
- Rob Apollo
- Figgy Baby
- Shno Xavier
- K Presto

<hr>
#### Tour Recap (Pt. 2)
{% include elements/video.html id="QyaoFde8PhY" %}

<hr>

<div row markdown=1 style="max-height:1080px; ">
## Gallery
{% assign prefix="/docs/assets/images/projects/k-presto/RBTS/Seattle/RBTS-Seattle-" -%}
{% assign filetype=".jpg" -%}
{% capture carousel_images %}
{%- assign height = 720px -%}
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
{{prefix}}12{{filetype}}
{{prefix}}13{{filetype}}
{% endcapture %}
{% include elements/carousel.html %}
</div>

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