---
layout: page
title: About
permalink: /tools/about/
weight: 6
---

<div class="about-intro">
<div class="about-portrait">
{% capture portrait_images %}
/docs/assets/images/site/headshots/headshot-4.jpg
/docs/assets/images/site/headshots/headshot-8.jpg
{% endcapture %}
{% include about/portrait.html %}
</div>
<div class="about-text" markdown="1">

# About Me

**Hey, I'm K.**
{: .about-lead}

I build the tools I use to make music.

Some are big. Kouncil is a mastering analyzer that tells you whether your master is ready and explains why at four levels, from first-time producer to audio scientist. Some are small and silly, like a Nokia 2110 Ableton Live rack that resynthesizes telephone ringtones in your DAW, or SEA, a method of encoding hidden spectrogram messages into music.

The lower-level work (reverbs, synths, game audio engines) lives under Development. This is where the finished, usable things go.

### Links

<div class="link-buttons" markdown="1">
[GitHub](https://www.github.com/CocoaBeanzz)
[Ko-fi](https://ko-fi.com/kpresto)
[Email](mailto:k@kaud.io)
</div>

</div>
</div>

## Skills

<div class="skill-groups">
{% include about/skills.html title="Languages" source=site.data.languages %}
{% include about/skills.html title="Frameworks" source=site.data.packages %}
</div>