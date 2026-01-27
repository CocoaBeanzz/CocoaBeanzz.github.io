---
name: InfeStation
role: Audio Lead, Composer, Sound Designer
tools: [C#, Unreal 5.2, Wwise, MetaSounds]
image: "/docs/assets/images/projects/infestation/edited/InfeStation_gp_10_edit_crop.png"
description: Horror shooter on a derelict space station.
---

<div class="row">
<div class="col" style="min-width:300px; " markdown="1">
# InfeStation
(Horror, Action, FPS)

</div>
<div class="col">
</div>
<div class="col" style="max-width:30%;">
{% capture list_items %}
Videos
Gallery
Credits
Blog Posts
{% endcapture %}
{% include elements/list.html title="" type="toc" %}
</div>
</div>

<div class="row">
<div class="col">
<img src="/docs/assets/images/projects/infestation/edited/InfeStation_gp_10_edit.png" alt="Title Image">
</div>
<div class="col">
InfeStation is an action horror game where the player must escape a space station overrun with hostile alien creatures.<br><br>
Carefully make your way through the Starbright 12 while uncovering the fates of your crewmembers.<br><br>
Sneak, blast, and complete puzzles until you make it out alive... or die trying.<br><br>
</div>
</div>

## Videos
{% include elements/video.html id="eq-zq8Y37mI" %}
{% include elements/video.html id="7kJlcUJgIAE" %}

## Gallery
#### Marketing
{% assign prefix="/docs/assets/images/projects/infestation/231203/editor/InfeStation_e_" -%}
{% assign filetype=".png" -%}
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
{{prefix}}12{{filetype}}
{{prefix}}13{{filetype}}
{% endcapture %}
{% include elements/carousel.html %}
#### Gameplay
{% assign prefix="/docs/assets/images/projects/infestation/231203/gameplay/InfeStation_gp_" -%}
{% assign filetype=".png" -%}
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
{{prefix}}12{{filetype}}
{{prefix}}13{{filetype}}
{{prefix}}14{{filetype}}
{{prefix}}15{{filetype}}
{% endcapture %}
{% include elements/carousel.html %}

### Credits:
Hyperlinks connect to LinkedIn or personal websites.

<div class="row">
<div class="col" markdown="1">
#### Development Phase 2:
Sabrina Black - Narrative Designer, Associate Producer<br>
[Kaleb Brown](https://www.linkedin.com/in/kalebbrown42/) - UI / UX Designer<br>
[Carlos Garrido](https://www.linkedin.com/in/carlos-garrido-65707522a/) - Design Director, Level Designer<br>
[Alexander Weiss](https://www.linkedin.com/in/xweiss/) - Build Master, Audio Programmer<br>
[Harrison Neiyer](https://www.linkedin.com/in/hneiyer/) - Producer, Programmer<br>
[Osprey Varboncoeur](https://www.docnosv.com/) - Technical Director, Programmer<br>
[Bruce McCubbin](https://www.linkedin.com/in/bruce-mccubbin/) - Creative Director, Level Designer<br>
[K Preston](/) - Audio Director, Audio Designer, Audio Programmer<br>
[David Saulnier](https://www.linkedin.com/in/david-saulnier-093340277/) - Level Designer<br>
[Austin Zhu](https://www.linkedin.com/in/austin-zhu-264659195/) - AI Programmer<br>
[Maximiliaan van Ginneken](https://www.linkedin.com/in/maxvgn/) - Audio Designer

</div>
<div class="col">
<div class="col" markdown="1">
#### Development Phase 1:

[Brillan Morgan](https://www.linkedin.com/in/brillanmorgan/)<br>
[Dongho Lee](https://www.linkedin.com/in/dongho-lee-softdev/)<br>
Frank Bartkus<br>
[Jinhyun Choi](https://www.linkedin.com/in/choijinhyun-dev/)<br>
[Julian Palomaria](https://www.linkedin.com/in/julian-palomaria-5416b320b/)<br>
[Mahin Goban](https://www.linkedin.com/in/mahin-goban/)<br>
[Raj Saini](https://www.linkedin.com/in/raj-s-8037a2177/)

#### Special Thanks To:

[Jonathan Larson](https://www.linkedin.com/in/jonathan-larson-3b4759291/) - Silas VA<br>
[Evelyn Cullen](https://www.linkedin.com/in/evelyn-cullen-764499238/) - Player VA
</div>
</div>
</div>
<img src="/docs/assets/images/projects/infestation/team/BHS.jpg" alt="Team Image">
Left to right: Alexander Weiss, Kaleb Brown, Maximiliaan van Ginneken, David Saulnier, K Preston, Quasar, Sabrina Black,
Osprey Varboncoeur, Harrison Neiyer, Carlos Garrido, Austin Zhu, Bruce McCubbin


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