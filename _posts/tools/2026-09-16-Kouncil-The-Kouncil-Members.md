---
title: "Kouncil: The Kouncil Members"
date: 2026-09-16
tags: [Audio Programming, Tech, Design, Writing, Python]
project: "Kouncil"
description: "Kouncil's data-driven music feedback dialogue system."
image: /docs/assets/images/projects/kouncil/product/tab_kouncil.jpg
also_in: [dev]
---
{%- assign img = '/docs/assets/images/projects/kouncil/product/' | relative_url -%}

{% capture list_items %}
Overview
Purely Data-driven. No LLM.
Lines Behind Measurements
Four Voices
It Was Worth It
{% endcapture %}
{% include elements/list.html title="" type="toc" %}

#### Overview
[Kouncil](/tools/projects/2610-kouncil) explains its results through four characters, each speaking to a different reader:

- **Taylor**, a music fan with cheap earbuds and no idea what a snare drum is
- **Vexie Hex**, a bedroom musician with a passion for the craft and general technical understanding
- **Kate Adagio**, a mastering engineer with years of experience and an informed, practical approach
- **K0ndukt0r**, a robot that will simply run you through the numbers with no nonsense

These four characters were lovingly designed and illustrated by [@UneasyLex](https://www.instagram.com/uneasy.lex/)

Kouncil is meant to be inviting and accesible to users of any level of experience. For new engineers, it functions as a learning tool to translate musical concepts to actionable mix decisions. For the technically-fluent professionals, it provides some fresh new angles for fine tuning a master, alongside the expected suite of analytics.

<img src="{{ img }}tab_kouncil.jpg" alt="The Kouncil tab, with a character's line and the chart it is about">

### **Purely Data-driven. No LLM.**
The market is saturated with AI-assisted music tools, each one a magic black box to "fix" your song. 

A tool needs to be trusted.
That means the same track yields the same output every time, and every bit of feedback is backed up by an actual metric you can see.

So I donned the hats of four personas and (over the course of several weeks) wrote the *2000 line behemoth* that is "kouncil_text.json". This is the backbone behind all character text in Kouncil: thousands of lines contextually triggered by the measurement of the data of the loaded track against the distribution of data from reference tracks in the active Profile. 

Kouncil was not written with an LLM. Kouncil does not package an LLM. Kouncil does not send or receive anything over the network. Kouncil is driven by an entirely intentionally-constructed system of predictable, measurable conditions. 

### **Lines Behind Measurements**
Each line lives in a text file under a *trigger*, a condition the analysis checks.
`pump` fires when the envelope modulation spectrum has a peak in the 0.5 to 4 Hz range standing well above the rest of it.
`mono_bass` fires when summing to mono loses too much energy below 120 Hz.
There are 66 triggers, from loudness through codec artifacts to comparisons against another track.

A trigger holds one line per character, as a template the measured values are filled into:

```
"Modulation spectrum peak{hz_str}, severity {pump:.0f} out of 100. Envelope RMS
shows periodic fluctuation in the 0.5 to 4 Hz range. Indicates compressor pumping."
```

Feedback lines can also hold variations dependent on trigger severity.

### **Four Voices**
Here's the pumping finding as all four hear it:

> **Taylor:** "The volume kind of breathes in and out in a weird rhythmic way, like it's pulsing."
>
> **Vexie Hex:** "You've got some compression pumping. I assume you're trying to smooth out the levels, but the compressor is bringing the level up a little too high before getting hit again. Try a slower release, lower threshold, or lower ratio so the compressor keeps hugging the sound more consistently."
>
> **Kate Adagio:** "The modulation spectrum shows a rhythmic gain artifact, which is probably a compressor pumping. I'd smooth out that compressor to more tightly follow the sound without releasing too early between hits."
>
> **K0ndukt0r:** "Envelope RMS shows periodic fluctuation in the 0.5 to 4 Hz range. Indicates compressor pumping."

Taylor never reacts to a number, only to an experience.
Vexie guesses at what you were going for and offers knobs to turn.
Kate names the mechanism and the fix in a sentence.
K0ndukt0r reports the measurement and stops.

Keeping the distinct personalities consistent throughout development across 66 triggers took a style guide,
covering each character's vocabulary, sentence rhythm, and punctuation habits.

An Excerpt:
> ## 1. Listener (Taylor)
> 
> ### Who they are 
> A friend you asked to listen to your song while hanging out. Earbuds, maybe a bag/jacket, consumer gear. Easygoing, honest, sweet, but never fake-nice. Doesn't know what a snare drum is.
> 
> ### Sentence structure & cadence
> Short, self-interrupting, and often trails off mid-thought before restarting with "but" or "like." Listener frequently second-guesses their own read of the situation in real time rather than delivering a clean verdict:
> 
> > "It's just like... kinda quiet? Like it has its moments but I really have to turn it up to hear it compared to the rest of my > songs."
> 
> A hedge ("just like"), an ellipsis (pause to think), a self-check delivered as a question ("kinda quiet?"), a concession ("it has its moments"), then the actual real-world consequence (having to turn it up). 
> 
> Contrast with the confident, exclamatory register when something's genuinely good:
> 
> > "This genuinely just sounds really good! Really professional and clean."
> 
> No hedging at all here. Repetition ("really... really") for emphasis instead. Positive Listener is fast and certain. Negative/uncertain Listener is slow and circling.
> 
> ### Vocabulary & diction
> - Hedge words, constantly: *like, kind of/kinda, sort of, just, I guess, I feel like*.
> - Filler: *and stuff, and everything*.
> - Sensory/physical analogies only, never mechanism: *wall of sound, smushed, spiky, blurs together, makes my ears hurt, gonna break my speakers*.
> - Slang affirmations on the positive end: *legit, genuinely*.
> - Never gives a bare number. Describes only in felt terms ("REALLY loud," "a LOT of contrast, " never "-6 LUFS").
> - Personal-gear references matching the earbuds detail from the design notes: *my speakers, my ears, bluetooth speaker, headphones*. Always MY device, never "the master" or "the mix."
> 
> ### Punctuation quirks
> - Ellipses to mark a hesitation/self-correction: `"It's just like... kinda quiet?"`
> - Trailing question marks on statements that aren't real questions — Listener is checking their own perception out loud: `"kinda quiet?"`, `"completely flat?"`
> - ALL CAPS for emotional emphasis, never for information: `REALLY loud`, `FEELS`. No other persona does this
> - Exclamation points cluster on genuinely positive reactions and nowhere else
> 
> ...

Each character also speaks in a handwriting face of their own.

<div class="row">
<div class="col"><img src="{{ img }}face_listener_b.png" alt="Taylor"></div>
<div class="col"><img src="{{ img }}face_casual_b.png" alt="Vexie Hex"></div>
<div class="col"><img src="{{ img }}face_engineer_b.png" alt="Kate Adagio"></div>
<div class="col"><img src="{{ img }}face_robot_b.png" alt="K0ndukt0r"></div>
</div>

### It Was Worth It
Weeks of writing, four meticulously detailed personalities, tons of triggers, and a style guide to keep track of it all were what it took to build a predictable, trustworthy feedback system. No magic black box, no made up details, no meaningless praise. Users can trust that the advice they see is essentially given by a human and driven directly by real, visible values. 

Kouncil is meant to be a tool you can always consult for honest input. It's a human tool for human ears. Human music for humans, made by humans. That's the whole point. 