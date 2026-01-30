---
title: "Rage Before the Storm Tour: Live Bass Rig Walkthrough"
date: 2025-02-09
tags: [Tech, Live Performance]
style: border
color: danger
description: "A detailed walkthrough of the live bass setup used for the Rage Before the Storm tour."
image: "/docs/assets/images/projects/k-presto/posts/rbts-bass/bass.jpg"
---

<div class="row">
<div class="col" style="width:70% ">

<img src="/docs/assets/images/projects/k-presto/posts/rbts-bass/bass.jpg" alt="TOI UI">

The bass rig I used during the Rage Before the Storm tour with DAMAG3 sparked some attention, so here's a detailed walkthrough
of the hardware and software pipeline.

</div>
<div class="col" style="max-width:30%;">
{% capture list_items %}
Reference Track
Hardware
Software
FX Chain Breakdown
Related Posts
{% endcapture %}
{% include elements/list.html title="" type="toc" %}
</div>
</div>

<br>

### **Reference Track**
<div class="row">
<div class="col" markdown=1>
Many of the sounds described in this article are present in my track Bone Idol. I suggest using this recording as reference to better understand these descriptions.
</div>
<div class="col" style="max-width:35%;">
{% include elements/video.html id="WmE-39CVxK0" %}
</div>
</div>

### **Hardware**
<div class="row">
<div class="col">
<div class="row" markdown=1>
<br>

The setup is pretty straightforward: I used velcro to stick a [Numark Orbit](https://www.numark.com/product/orbit) to my bass guitar.

The Numark Orbit is an experimental DJ controller that only ran production for a couple years around 2013.
It features 16 pads, 1 encoder, and 2 axes of gyroscope control with 4 banks of controls. 
It can be used wirelessly, but mine seems to prefer being wired.

This controller was primarily marketed for use with the proprietary OrbitDJ software that provided some simple effects and DJ functionality.
However, I've found it to be extremely powerful mapped to Ableton Live and DJ software.

<div class="row">
<div class="col" style="max-width:35%;">
<img src="/docs/assets/images/projects/k-presto/posts/rbts-bass/bass-scrunchie.jpg" alt="Scrunchie">
</div>
<div class="col" markdown=1>
The bass runs directly into a [Focusrite Scarlett 18i20](https://focusrite.com/products/scarlett-18i20), alongside vocals and the DJ setup output. 
The entire live rig is then processed and mixed in [Ableton Live](https://www.ableton.com/en/live/) to be sent to the main output as a single tidy stereo pair, 
which comes in handy because this unwieldy setup can use any wiring optimization it can get.

*You may have also noticed that I keep a scrunchie by the tuning pegs of my bass. 
This makes for a cool-sounding mute, which plays especially nicely with the dynamic range compression I have running in Ableton Live.
This also helps dampen the decay of my highly loosened strings.*
</div>
</div>
</div>
</div>
<div class="col" style="max-width:35%;">
<img src="/docs/assets/images/projects/k-presto/posts/rbts-bass/bass-orbit.jpg" alt="Numark Orbit">
</div>
</div>

### **Software**

<div class="row">
<div class="col" markdown=1>
#### FX Chain Overview
The general approach is to give the signal a ton of gain and sharp transients with compressors, scoop the moods and tame the highs, distort, and repeat.
This chain applies that architecture three times in series.
</div>
<div class="col" style="max-width:35%;">
<img src="/docs/assets/images/projects/k-presto/posts/rbts-bass/FX-Chain.png" alt="FX Chain Overview">
</div>
</div>

#### FX Chain Breakdown
<div class="row">
<div class="col" markdown=1>
##### Gate
This chain runs **very** hot, so the first gate is essential for minimizing ground hum on the input.
</div>
<div class="col" style="max-width:35%;">
<img src="/docs/assets/images/projects/k-presto/posts/rbts-bass/gate-1.png" alt="Gate">
</div>
</div>

<div class="row">
<div class="col" markdown=1>
##### Tuner
Many of my songs require runing my strings extremely low, so it's essential to meticulously check tuning throughout the set.
</div>
</div>

<div class="row">
<div class="col" markdown=1>
##### Multiband Dynamics
This 2-band multiband compressor serves to accentuate the transient attack of the signal before being fed to distortion.
</div>
<div class="col" style="max-width:40%;">
<img src="/docs/assets/images/projects/k-presto/posts/rbts-bass/multiband-comp-1.png" alt="Multiband Compressor">
</div>
</div>

<div class="row">
<div class="col" markdown=1>
##### Compressor
This compressor rounds out the recovery from the transient emphasis. It functions as decay curve shaper.
</div>
<div class="col" style="max-width:35%;">
<img src="/docs/assets/images/projects/k-presto/posts/rbts-bass/comp-1.png" alt="Compressor">
</div>
</div>

<div class="row">
<div class="col" markdown=1>
##### Bass FX Groups
This rack features seven parallel [Native Instruments Guitar Rig](https://www.native-instruments.com/en/products/komplete/guitar/guitar-rig-7-pro/) distortion chains, labeled eloquently on the right. The macros in the middle control the routing to each chain. The snapshots on the left correspond to preset routing schemes that approximate tones I've used in my recorded tracks.

*The buttons on the Numark Orbit are MIDI mapped to each snapshot, allowing me to select sounds while playing bass, so I can jump between presets as I progress through a song.*
</div>
<div class="col" style="max-width:40%;">
<img src="/docs/assets/images/projects/k-presto/posts/rbts-bass/bass-group.png" alt="Bass FX Groups">
</div>
</div>

<div class="row">
<div class="col" markdown=1 style="max-width:20%;">
###### CLEAN
This is just a classic clean amp simulation, often used as a core layer in mixed snapshots.
</div>
<div class="col" style="max-width:30%;">
<img src="/docs/assets/images/projects/k-presto/posts/rbts-bass/fx-clean.png" alt="Bass FX Groups">
</div>
<div class="col" markdown=1 style="max-width:20%;">
###### BEEG
This is an exceptionally gritty, nasally tone, similar to the first drop of Bone Idol ([1:02](https://www.youtube.com/watch?v=WmE-39CVxK0&t=62s)).
</div>
<div class="col" style="max-width:30%;">
<img src="/docs/assets/images/projects/k-presto/posts/rbts-bass/fx-beeg.png" alt="Bass FX Groups">
</div>
</div>

<div class="row">
<div class="col" markdown=1 style="max-width:20%;">
###### OOMPA
This provides thumpy, low-mid support and some high range grit.
</div>
<div class="col" style="max-width:30%;">
<img src="/docs/assets/images/projects/k-presto/posts/rbts-bass/fx-oompa.png" alt="Bass FX Groups">
</div>
<div class="col" markdown=1 style="max-width:20%;">
###### SCREAM
This is a high range dynamically flat guitar-like tone. The rack pitches the signal up two octaves and crushes the dynamics and timbre into a classic lead guitar sound. This is present in the third build of Bone Idol ([3:24](https://www.youtube.com/watch?v=WmE-39CVxK0&t=204s)).
</div>
<div class="col" style="max-width:30%;">
<img src="/docs/assets/images/projects/k-presto/posts/rbts-bass/fx-scream.png" alt="Bass FX Groups">
</div>
</div>

<div class="row">
<div class="col" markdown=1 style="max-width:20%;">
###### NYAH
This is an **extremely** clipped, bassy, sizzly tone resemblant of a highly driven techno rumble. The tone is shaped such that the initial attack is deep and pure, followed by a gradual ramp in high frequency noise to provide a pumping rhythmic drive. This is in the final drop of Bone Idol ([3:39](https://www.youtube.com/watch?v=WmE-39CVxK0&t=219s)).
</div>
<div class="col" style="max-width:30%;">
<img src="/docs/assets/images/projects/k-presto/posts/rbts-bass/fx-nyah.png" alt="Bass FX Groups">
</div>
<div class="col" markdown=1 style="max-width:20%;">
###### Classic
This is a classic twangy bass guitar tone with a supported low end, similar to the intro to [DAMAG3 - DOUBL3 TAK3](https://www.youtube.com/watch?v=4hiVF9w3kMo).
</div>
<div class="col" style="max-width:30%;">
<img src="/docs/assets/images/projects/k-presto/posts/rbts-bass/fx-classic.png" alt="Bass FX Groups">
</div>
</div>

<div class="row">
<div class="col" markdown=1 style="max-width:40%;">
###### freak :)
This is the most complex chain. The filters and phasers modulate peaks around the high-mid frequency range of the sound. A stereo split enables distinct harmonic scanning (wah filters) across each channel. The signal is clipped such that these notches distort to generate related overtones. After this rack, the signal receives additional stereo widening.

The result is a collection of modulating whines, blips, and "watery" sounds that move around the stereo field. This gives a bit of an acid techno sound, alongside some of the formant tone common in midtempo electro. These overtones are apparent in the second drop of Bone Idol ([2:12](https://www.youtube.com/watch?v=WmE-39CVxK0&t=192s)).
</div>
<div class="col" style="max-width:30%;">
<img src="/docs/assets/images/projects/k-presto/posts/rbts-bass/fx-freak-1.png" alt="Bass FX Groups">
</div>
<div class="col" style="max-width:30%;">
<img src="/docs/assets/images/projects/k-presto/posts/rbts-bass/fx-freak-2.png" alt="Bass FX Groups">
</div>
</div>

<div class="row">
<div class="col" markdown=1>
##### Compressor
This compressor serves a similar decay curve shaping purpose as the previous one, as the distortion stage can lose some of this dynamic control.
</div>
<div class="col" style="max-width:35%;">
<img src="/docs/assets/images/projects/k-presto/posts/rbts-bass/comp-2.png" alt="Compressor">
</div>
</div>

<div class="row">
<div class="col" markdown=1>
##### Multiband Dynamics
Similarly, this compressor compensates for the transient flattening from the clipping stage. Bolstering the attack of the signal feeds nicely into the upcoming stages as well, as the dynamic range is about to be completely crushed.
</div>
<div class="col" style="max-width:40%;">
<img src="/docs/assets/images/projects/k-presto/posts/rbts-bass/multiband-comp-2.png" alt="Multiband Compressor">
</div>
</div>

<div class="row">
<div class="col" markdown=1>
##### Gate
This highly aggressive gate ensures that absolutely no excess signal makes it to the next stage. Anything and everything will be absolutely smashed, so we need to ensure that no unwanted background noise deafens the audience.
</div>
<div class="col" style="max-width:35%;">
<img src="/docs/assets/images/projects/k-presto/posts/rbts-bass/gate-2.png" alt="Gate">
</div>
</div>

<div class="row">
<div class="col" markdown=1>
##### PHAT RACK
Every producer needs to build a phat rack at some point in their career. This is my secret sauce, and the contents of the rack will remain a trade secret. The purpose is to flatten, shape, beef up, and enhance the sound. This can range from subtle warmth to sturdy brightening to transformation into an earth-shaking wall of sound. 

In this particular setting, the phat rack serves to squash and burn the sound for spice, heft, and the power to rattle the rafters and make Changeline shout **"GOD DAMN!!"**
</div>
<div class="col" style="max-width:40%;">
<img src="/docs/assets/images/projects/k-presto/posts/rbts-bass/multiband-comp-2.png" alt="Multiband Compressor">
</div>
</div>

> That's it! The rest just comes down to relentless practice and familiarity with the instrument. I hope this was helpful!

