---
title: "Cats N Critters Week 6 Demo"
date: 2024-02-14
tags: [Cats N Critters, Composition]
style: border
color: success
description: "Week 6 composition update for the dungeon-crawling party game Cats N Critters."
image: "/docs/assets/images/projects/cats-n-critters/posts/cats-n-critters-week6post.png"
---

(Orchestral, Fantasy, Cinematic)\
Instruments: Orchestra

{% include elements/video.html id="3ntWC2I2nnU" %}
<div class="row" markdown="1">

<div class="col" markdown="1">
A quick medly of the major themes from week 6 of the audio development of the upcoming dungeon-crawling party game Cats N Critters.
</div>
</div>

<br>
## The Themes So Far
<br>

##### "Main Menu Theme A"
<img src="/docs/assets/images/projects/cats-n-critters/motifs/week6/catsncritters-mainmenu-a.png" alt="mainmenu-a">
##### "Main Menu Theme A - Variation I (Best Paw Forward)”
<img src="/docs/assets/images/projects/cats-n-critters/motifs/week6/catsncritters-mainmenu-a-var-i.png" alt="mainmenu-a-var-i">
##### "Main Menu Theme A - Variation II (A Tail of Legends)”
<img src="/docs/assets/images/projects/cats-n-critters/motifs/week6/catsncritters-mainmenu-a-var-ii.png" alt="mainmenu-a-var-ii">
##### "Main Menu Theme B”
<img src="/docs/assets/images/projects/cats-n-critters/motifs/week6/catsncritters-mainmenu-b.png" alt="mainmenu-b">
##### "Main Menu Theme B - Variation (Fight Fur the Claws)”
<img src="/docs/assets/images/projects/cats-n-critters/motifs/week6/catsncritters-mainmenu-b-var.png" alt="mainmenu-b-var">
##### "Kalico Coasts Theme A”
<img src="/docs/assets/images/projects/cats-n-critters/motifs/week6/catsncritters-kalicocoasts-a.png" alt="kalicocoasts-a">
##### "Kalico Coasts Theme B”
<img src="/docs/assets/images/projects/cats-n-critters/motifs/week6/catsncritters-kalicocoasts-b.png" alt="kalicocoasts-b">
##### "Kalico Coasts Theme B - Variation”
<img src="/docs/assets/images/projects/cats-n-critters/motifs/week6/catsncritters-kalicocoasts-b-var.png" alt="kalicocoasts-b-var">
##### "Kalico Coasts Theme C”
<img src="/docs/assets/images/projects/cats-n-critters/motifs/week6/catsncritters-kalicocoasts-c.png" alt="kalicocoasts-c">
##### "A Tail of Legends Theme A”
<img src="/docs/assets/images/projects/cats-n-critters/motifs/week6/catsncritters-atailoflegends-a.png" alt="atailoflegends-a">
##### "A Tail of Legends Theme A - Variation”
<img src="/docs/assets/images/projects/cats-n-critters/motifs/week6/catsncritters-atailoflegends-a-var.png" alt="atailoflegends-a-var">
##### "A Tail of Legends Theme B”
<img src="/docs/assets/images/projects/cats-n-critters/motifs/week6/catsncritters-atailoflegends-b.png" alt="atailoflegends-b">
##### "Catventure Theme A”
<img src="/docs/assets/images/projects/cats-n-critters/motifs/week6/catsncritters-catventure-a.png" alt="catventure-a">
##### "Whimsy on the Wind Theme A”
<img src="/docs/assets/images/projects/cats-n-critters/motifs/week6/catsncritters-whimsyonthewind-a.png" alt="whimsyonthewind-a">
##### "Whimsy on the Wind Theme B”
<img src="/docs/assets/images/projects/cats-n-critters/motifs/week6/catsncritters-whimsyonthewind-b.png" alt="whimsyonthewind-b">
##### "Best Paw Forward Theme B”
<img src="/docs/assets/images/projects/cats-n-critters/motifs/week6/catsncritters-bestpawforward-b.png" alt="bestpawforward-b">

*Overall, the full scores for all these cues have amassed to a hefty stack of pages I've been lugging around, 
but it's well worth the effort because the opportunity to pop away for a quick instrumental session has been such fun.
This project has been tremendously rewarding and I'm looking forward to the next nine weeks seeing it to completion.*<br>
*:)*

## Related Posts
{% assign tagfilter="Cats N Critters" -%}
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