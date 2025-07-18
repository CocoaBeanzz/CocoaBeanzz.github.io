---
title: "Lucky Break (Seattle)"
date: 2025-07-25
tags: [K Presto, Live Performance, Shows]
style: border
color: warning
description: A hard-hitting bouncy bassy rave in Seattle with K Presto and friends!
image: "/docs/assets/images/projects/k-presto/LuckyBreak/LB_Kpresto_Square.png"
location: "REBL 1 Studios | Seattle, WA, USA"
---

## K Presto @ The Moroccan Lounge | Los Angeles, CA USA

<img src="/docs/assets/images/projects/k-presto/LuckyBreak/Banner.png" alt="banner">

##### SEATTLE RAVERS, YOU’RE IN LUCK!

*Friday July 25th Swiftheart Events presents* **LUCKY BREAK!**

Claim your blessings on the dance floor to the sounds of club, bass, jungle, breaks, wubs and more. We’re bringing eclectic and creative curation to the function with multigenre sets from local DJs Dimage, K Presto, Hamwich and guest iko to raise your spirits, get your body moving, and celebrate each other. This is your midsummer boost, a chance to make your own luck.

Let’s show up and show out, see and be seen, express ourselves to the maximum, and let go of our worries with community. Come together and connect from a place of love and unity to strengthen the inner fire in uncertain times. 

Make some magic with us!

$20 Presale
$25 Door
9PM-1AM
Location: Rebl1 - 55 Bell St, Seattle WA, 98121

## TICKETS
> PRESALE -> Venmo @Oscar-Prieto with memo: LUCKY BREAK + Your full name

<div row markdown=1>
{% assign prefix="/docs/assets/images/projects/k-presto/LuckyBreak/LB_" -%}
{% assign filetype=".png" -%}
{% assign height="720px" -%}
{% capture carousel_images %}
{{prefix}}iko{{filetype}}
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