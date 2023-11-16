---
name: InfeStation
tools: [C#, Unreal 5.2, Wwise, MetaSounds]
image: "/docs/assets/images/projects/infestation/edited/infestation-1-square.png"
description: Horror shooter on a derelict space station.
---

<div class="row">
<div class="col" style="min-width:300px; " markdown="1">
# InfeStation
(Horror, Action, FPS)

#### [ Currently in Development ]
</div>
<div class="col">
</div>
<div class="col" style="max-width:30%;">
{% capture list_items %}
Gallery
Blog Posts
{% endcapture %}
{% include elements/list.html title="" type="toc" %}
</div>
</div>

<div class="row">
<div class="col">
<img src="/docs/assets/images/projects/infestation/edited/infestation-1-square.png" alt="Title Image">
</div>
<div class="col">
InfeStation is an action horror game where you must escape a space station overrun with hostile alien creatures.<br><br>
Carefully make your way through the Starbright 12 while uncovering the fates of your crewmembers.<br><br>
Sneak, blast, and complete puzzles until you make it out alive... or die trying.<br><br>
</div>
</div>

### Credits:

Sabrina Black - Narrative Designer, Associate Producer\
Kaleb Brown - UI / UX Designer\
Carlos Garrido - Design Director, Level Designer\
Alexander Weiss - Build Master, Audio Programmer\
Harrison Neiyer - Producer, Programmer\
Osprey Varboncoeur - Technical Director, Programmer\
Bruce McCubbin - Creative Director, Level Designer\
K Preston - Audio Director, Audio Designer, Audio Programmer\
David Saulnier - Level Designer\
Austin Zhu - AI Programmer\
Maximiliaan van Ginneken - Audio Designer

#### Special Thanks To:

Jonathan Larson - Silas\
Evelyn Cullen - Player

#### Former Team Members:

Brillan Morgan\
Dongho Lee\
Frank Bartkus\
Jinhyun Choi\
Julian Palomaria\
Mahin Goban\
Raj Saini

## Gallery
{% assign prefix="/docs/assets/images/projects/infestation/infestation-" -%}
{% assign filetype=".png" -%}
{% capture carousel_images %}
{{prefix}}1{{filetype}}
{{prefix}}2{{filetype}}
{{prefix}}3{{filetype}}
{% endcapture %}
{% include elements/carousel.html %}

## Blog Posts
{% assign tagfilter="InfeStation" -%}
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