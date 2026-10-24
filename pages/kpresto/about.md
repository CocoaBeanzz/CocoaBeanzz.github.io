---
layout: page
title: About
permalink: /kpresto/about/
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
/docs/assets/images/site/headshots/headshot-3.jpg
/docs/assets/images/site/headshots/headshot-4.jpg
/docs/assets/images/site/headshots/headshot-7.jpg
/docs/assets/images/site/headshots/headshot-8.jpg
/docs/assets/images/site/headshots/headshot-9.png
{% endcapture %}
{% include about/portrait.html %}
</div>
<div class="about-text" markdown="1">

# About K Presto

K Presto is a lil bonk bonk rave frog who makes silly bouncy scratchy 
screamy thrashy electronic music with metal and baroque influences.

Their signature style fuses hard-hitting complex electronic beats, thick layers of bass, roaring guitars, cute hypnotic vocals, and occasional screaming. 

K’s classical music training is apparent in their tight integration of traditional music theory and orchestral arrangement. 

K is known for their collaborations with hard-hitting rappers and hip hop vocalists including DAMAG3, Changeline, and CAVALIER BXLD.

### Links

<div class="link-buttons" markdown="1">
[Spotify](https://open.spotify.com/artist/6YVhlNw952WlFsXddTPgOY)
[Apple Music](https://music.apple.com/us/artist/k-presto/1073441282)
[YouTube Music](https://music.youtube.com/channel/UC3LezgQLQx0Y832j3)
[SoundCloud](https://www.soundcloud.com/CocoaBeanz)
[Amazon Music](https://www.amazon.com/music/player/artists/B01A52DFU4/k-presto)
[Instagram](http://instagram.com/officialkpresto/)
[Facebook](https://www.facebook.com/kprestomusic)
[YouTube](https://www.youtube.com/KPresto)
</div>

</div>
</div>