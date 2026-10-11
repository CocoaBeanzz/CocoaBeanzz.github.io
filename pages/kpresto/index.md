---
layout: default
permalink: /kpresto/
---

{% capture hero_intro %}
K Presto is a lil bonk bonk rave frog who makes silly bouncy scratchy screamy thrashy electronic music with metal and baroque influences.
{% endcapture %}
{% include landing/hero.html %}

{% include projects/features.html %}
{% include blog/highlights.html %}

{%- comment -%}
The ten most recent shows as rows, then a link to the Shows tab, which has
all of them.
{%- endcomment -%}
<section class="band">
    <h2 class="section-heading">Shows:</h2>
    {%- assign shows = site.posts | where_exp: "item", "item.sections contains page.section" | where_exp: "post", "post.tags contains 'Shows'" -%}
    {% for post in shows limit: 10 %}
        {% include shows/show-row.html %}
    {% endfor %}
    {%- assign shows_page = site.html_pages | where: "url", "/kpresto/shows/" | first -%}
    <a class="more-link" href="{{ shows_page.url | relative_url }}">{{ shows_page.title }}</a>
</section>
