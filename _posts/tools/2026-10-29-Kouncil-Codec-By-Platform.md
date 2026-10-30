---
title: "What Each Streaming Platform Actually Plays"
date: 2026-10-29
tags: [Audio, Mastering, Streaming, Data]
project: "Kouncil"
description: "The codec each streaming platform turns your master into, which of them have a lossless tier, and the Bluetooth step that comes after all of them."
image: /docs/assets/images/projects/kouncil/posts/codecs/codec_by_platform.png
---
{%- assign fig = '/docs/assets/images/projects/kouncil/posts/codecs/' | relative_url -%}

{% capture list_items %}
Overview
The Table
Lossless Is Opt-In
Then Bluetooth
What to Do With It
{% endcapture %}
{% include elements/list.html title="" type="toc" %}

#### Overview
Someone asked me which codec each streaming service uses.
It's a fair question, and the answers are scattered across support pages, press releases and a lot of guesswork.
Here's the short version, with how sure I am of each line.

The file you upload is almost never what a listener hears.
Each platform turns it into its own format first, and most of those formats are lossy: they throw away what the encoder thinks you won't miss, and the decoded audio isn't the same waveform you delivered.
That's why a master at -1 dBTP can come back from a codec over 0.

### **The Table**

| Platform | Lossy | Lossless |
|---|---|---|
| **Spotify** | Ogg Vorbis up to 320 kbps in the apps; AAC in the web player (128 Free, 256 Premium) | FLAC up to 24-bit / 44.1 kHz, Premium |
| **Apple Music** | AAC 256 kbps | ALAC up to 24 / 192 |
| **YouTube / YouTube Music** | Opus (about 130 to 160 kbps) or AAC 128; AAC 256 on Music Premium | none |
| **Tidal** | AAC 96 / 320 kbps on the lower settings | FLAC up to 24 / 192 |
| **Amazon Music** | lossy on the SD tier | FLAC, up to 24 / 192 on Ultra HD |
| **Deezer** | MP3 128 / 320 kbps | FLAC 16 / 44.1, Premium |
| **Qobuz** | none | FLAC up to 24 / 192 |
| **SoundCloud** | MP3 128 and Opus 64; AAC 256 on Go+ | none |
| **Instagram / TikTok** | AAC, bitrate not published | none |

<img src="{{ fig }}codec_by_platform.png" alt="The same table as an image: each streaming platform's lossy and lossless formats, with Bluetooth as the last row">
The same rundown as an image, for sharing.
{: .figure-caption}

How sure I am:
- **Documented by the platform:** Spotify's bitrates, its web player's AAC and its FLAC tier; Apple Music; Tidal; Qobuz.
- **Widely reported but not stated by the platform:** Spotify's apps using Ogg Vorbis (its support page lists bitrates but never names the codec); YouTube's Opus and AAC streams; SoundCloud; Deezer's MP3 tiers.
- **Not published at all:** Amazon's SD codec, and anything about Instagram or TikTok beyond "AAC". I plan to measure those two myself.

### **Lossless Is Opt-In**
Spotify added lossless in September 2025, Apple Music has had it since 2021, and Tidal, Amazon, Deezer and Qobuz all offer it.
But on every one of them it's a setting the listener has to find and turn on, on each device.
On Spotify, Free listeners don't have it at all, and the web player is AAC whatever you pay for.

Loudness normalization applies to lossless too.
Spotify turns a loud master down to its listener's level (-14 LUFS by default) whatever the format, and its Loud setting raises quiet masters to -11 LUFS with a limiter.

### **Then Bluetooth**
Whatever the app plays, wireless headphones encode it again before it reaches your ears:
- **SBC** on most Android phones and cheap earbuds.
- **AAC** on iPhones and AirPods.
- **LDAC or aptX** on some Android devices and headphones.

So a lossless stream over AirPods is AAC, and an Apple Music stream over AirPods is AAC encoded twice.
For most listeners most of the time, the last codec in the chain is the one in their headphones.

### **What to Do With It**
You can't choose a listener's codec, but you can check what each one does to your master before you release it.
Every codec handles a dense, limited master a little differently: how far the true peak climbs, how much pre-echo smears the transients, how much the stereo image narrows.

[Kouncil](/tools/projects/2610-kouncil) runs a master through eight of them, among them Apple Music's AAC 256, Vorbis, YouTube's Opus, and the Bluetooth chains, and measures each.
You can listen to every version, and to only what each codec changed.
Most masters come through fine. The point is knowing which of yours don't, while you can still do something about it.

Sources: [Spotify audio quality](https://support.spotify.com/us/article/audio-quality/), [Spotify loudness normalization](https://support.spotify.com/au/artists/article/loudness-normalization/), [Spotify Lossless launch](https://alternativeto.net/news/2025/9/spotify-finally-launches-lossless-audio-streaming-for-all-premium-users-at-no-extra-cost/).
