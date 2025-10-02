---
title: "K Presto | DAMAG3 - BLiND US Tour (Los Angeles)"
date: 2025-07-31
tags: [K Presto, Live Performance, Shows]
style: border
color: danger
description: We kicked off the US tour in Los Angeles with a vibrant crowd of lovely people!
image: "/docs/assets/images/projects/k-presto/BLiND/LA/BLiND_LA_1.png"
location: "The Moroccan Lounge | Los Angeles, CA USA"
---

## K Presto @ The Moroccan Lounge | Los Angeles, CA USA
### DAMAG3 - BLiND Tour

<br>
We kicked off the US tour in Los Angeles with a vibrant crowd of lovely people!

I had the pleasure of performing for and connecting with some very inspiring fellow artists. 

Performing with My Favorite Color was such a joy! The energy onstage was captivating.

What a delightful start to this adventure.

<hr>
<img src="/docs/assets/images/projects/k-presto/BLiND/LA/BLiND_LA_1.png" alt="Show Photo">

#### Lineup
- DAMAG3
- Rob Apollo
- Hadji Gaviota
- My Favorite Color
- Shno Xavier
- K Presto

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