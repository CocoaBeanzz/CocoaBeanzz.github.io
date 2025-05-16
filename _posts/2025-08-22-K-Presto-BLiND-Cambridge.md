---
title: "K Presto | DAMAG3 - BLiND US Tour (Cambridge)"
date: 2025-08-22
tags: [K Presto, Live Performance, Shows]
style: border
color: danger
description: Catch my first country-spanning tour with DAMAG3 and friends! Tickets on sale now.
image: "/docs/assets/images/projects/k-presto/BLiND/FigSleazyShno.jpg"
location: "The Middle East | Cambridge, MA USA"
---

## K Presto @ The Middle East | Cambridge, MA USA
### DAMAG3 - BLiND Tour

## [TICKETS](https://www.ticketweb.com/event/damag3-figgy-baby-leazy-middle-east-upstairs-tickets/14451033?pl=mideastclub)

#### Lineup
- DAMAG3
- Figgy Baby
- $leazy EZ
- Shno Xavier
- K Presto

<hr>
<img src="https://i.ticketweb.com//i/00/13/08/42/53_Edp.jpg?v=2" alt="info">

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