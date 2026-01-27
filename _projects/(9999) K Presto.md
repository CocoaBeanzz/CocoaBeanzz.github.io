---
name: K Presto
heading: Ongoing Independent Music Project
role: Composer, Vocals, Bass, DJ
image: /docs/assets/images/projects/k-presto/KPLogo_3D_MED.png
description: Musical project melding electronic music with metal and baroque influences.
---

<div class="row">
<div class="col" style="min-width:100px; " markdown="1">
<img  src="/docs/assets/images/projects/k-presto/KPLogo_3D_MED.png" width="100%" alt="Title Image" align="left">
</div>
<div class="col" style="min-width:300px; " markdown="1">

# K Presto
Ongoing musical project

</div>
<div class="col">
</div>
<div class="col" style="max-width:30%;">
{% capture list_items %}
Links
Booking
Blog Posts
{% endcapture %}
{% include elements/list.html title="" type="toc" %}
</div>
</div>

K Presto is a musical project melding contemporary electronic music with metal and baroque influences.

<hr>
{% include elements/video.html id="k8nJvnkhVJ0" %}
<hr>

## Links

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
## Blog Posts
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