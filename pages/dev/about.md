---
layout: page
title: About
permalink: /dev/about/
weight: 6
---

{%- comment -%}
An About page is three blocks, each optional, in this order:

  1. Intro      portrait beside the text and links        (.about-intro)
  2. Skills     groups of skills from _data/ files        (.skill-groups)
  3. Timeline   dated roles from a _data/ file            (about/timeline.html)

To make another department's About page, copy this file, change the
permalink, and keep the blocks that apply. Everything after the front matter
is content: the layout and styling come from the includes in
_includes/about/ and from _sass/_about.scss.
{%- endcomment -%}

<div class="about-intro">
<div class="about-portrait">
{% comment %} One image per line. With more than one, they fade from one to the next. {% endcomment %}
{% capture portrait_images %}
/docs/assets/images/site/headshots/headshot-1.jpg
/docs/assets/images/site/headshots/headshot-2.jpg
/docs/assets/images/site/headshots/headshot-3.jpg
/docs/assets/images/site/headshots/headshot-4.jpg
/docs/assets/images/site/headshots/headshot-5.jpg
/docs/assets/images/site/headshots/headshot-6.jpg
/docs/assets/images/site/headshots/headshot-7.jpg
/docs/assets/images/site/headshots/headshot-8.jpg
{% endcapture %}
{% include about/portrait.html %}
</div>
<div class="about-text" markdown="1">

# About Me

**Hey, I'm K.**
{: .about-lead}

I'm a musician, composer, audio programmer, synthesizer designer, and general creative enthusiast.

My projects blend my artistic and technical passions to bring forth new sonic experiences, be it through the sound of a video game, a cinematic score, an inspired album, or new tools to help other musicians realize their artistic visions.

I am an alum of DigiPen Institute of Technology with a Bachelor's in Science in Computer Science and Digital Audio
and a minor in mathematics.

Let's make something amazing together.

### Links

<div class="link-buttons" markdown="1">
[LinkedIn](https://www.linkedin.com/in/kl-preston)
[GitHub](https://www.github.com/CocoaBeanzz)
[Email](mailto:k@kaud.io)
[Spotify](https://open.spotify.com/artist/6YVhlNw952WlFsXddTPgOY)
[SoundCloud](https://www.soundcloud.com/CocoaBeanz)
[YouTube](https://www.youtube.com/KPresto)
</div>

</div>
</div>

## Skills

{% comment %} Each group is a title and a file in _data/ listing `name` and `percentage`. {% endcomment %}

<div class="skill-groups">
{% include about/skills.html title="Languages" source=site.data.languages %}
{% include about/skills.html title="Packages" source=site.data.packages %}
{% include about/skills.html title="Performance" source=site.data.performance %}
{% include about/skills.html title="Software" source=site.data.software %}
</div>

## Project Timeline

{% include about/timeline.html %}
