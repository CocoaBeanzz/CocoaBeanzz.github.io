---
layout: page
title: About
permalink: /games/about/
weight: 6
---

<div class="about-intro">
<div class="about-portrait">
{% capture portrait_images %}
/docs/assets/images/site/headshots/headshot-2.jpg
/docs/assets/images/site/headshots/headshot-6.jpg
/docs/assets/images/site/headshots/headshot-10.jpg
{% endcapture %}
{% include about/portrait.html %}
</div>
<div class="about-text" markdown="1">

# About Me

**Hey, I'm K.**
{: .about-lead}

I build complex audio systems for games, and then I write soundtracks tightly integrated into those systems for dynamic, expressive, cohesive virtual soundscapes.

That's meant an adaptive score driven by player emotion in Unreal MetaSounds for InfeStation, a tempo-synced FMOD audio engine in custom C++ for Inline: Out of Time, and a 9-track orchestral soundtrack for a co-op cat dungeon crawler. The genre goes wherever the game needs it: retrofuturistic skate punk, creepy-cozy, horror, Latin-American fantasy.

I have a BS in Computer Science and Digital Audio from DigiPen.

If your game needs a sound of its own, get in touch.

### Links

<div class="link-buttons" markdown="1">
[Email](mailto:k@kaud.io)
[LinkedIn](https://www.linkedin.com/in/kl-preston)
[SoundCloud](https://www.soundcloud.com/CocoaBeanz)
[YouTube](https://www.youtube.com/KPresto)
</div>

</div>
</div>

## Skills

<div class="skill-groups">
{% include about/skills.html title="Engines and Middleware" source=site.data.software %}
{% include about/skills.html title="Languages" source=site.data.languages %}
</div>

## Project Timeline

{% include about/timeline.html %}