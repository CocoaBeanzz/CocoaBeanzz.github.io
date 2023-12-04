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

<div class="row">
<div class="col" markdown="1">
Sabrina Black - Narrative Designer, Associate Producer<br>
Kaleb Brown - UI / UX Designer<br>
Carlos Garrido - Design Director, Level Designer<br>
Alexander Weiss - Build Master, Audio Programmer<br>
Harrison Neiyer - Producer, Programmer<br>
Osprey Varboncoeur - Technical Director, Programmer<br>
Bruce McCubbin - Creative Director, Level Designer<br>
K Preston - Audio Director, Audio Designer, Audio Programmer<br>
David Saulnier - Level Designer<br>
Austin Zhu - AI Programmer<br>
Maximiliaan van Ginneken - Audio Designer

</div>
<div class="col">
<div class="col" markdown="1">
#### Special Thanks To:

Jonathan Larson - Silas<br>
Evelyn Cullen - Player

#### Former Team Members:

Brillan Morgan<br>
Dongho Lee<br>
Frank Bartkus<br>
Jinhyun Choi<br>
Julian Palomaria<br>
Mahin Goban<br>
Raj Saini
</div>
</div>
</div>
<img src="/docs/assets/images/projects/infestation/team/BHS.jpg" alt="Team Image">

## Videos
{% include elements/video.html id="eq-zq8Y37mI" %}
{% include elements/video.html id="7kJlcUJgIAE" %}

## Gallery
#### Marketing
{% assign prefix="/docs/assets/images/projects/infestation/231203/editor/InfeStation_e_" -%}
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
{{prefix}}11{{filetype}}
{{prefix}}12{{filetype}}
{{prefix}}13{{filetype}}
{% endcapture %}
{% include elements/carousel.html %}
#### Gameplay
{% assign prefix="/docs/assets/images/projects/infestation/231203/gameplay/InfeStation_gp_" -%}
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
{{prefix}}11{{filetype}}
{{prefix}}12{{filetype}}
{{prefix}}13{{filetype}}
{{prefix}}14{{filetype}}
{{prefix}}15{{filetype}}
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