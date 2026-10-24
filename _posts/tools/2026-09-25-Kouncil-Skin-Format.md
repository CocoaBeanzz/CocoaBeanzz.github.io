---
title: "Kouncil: A Skin Format Other Apps Can Use"
date: 2026-09-25
tags: [Tech, Design, Python, Tech Overview]
project: "Kouncil"
description: "How Kouncil's skins became a small shared format: colors by role and rank instead of by widget, derived defaults, and why a heatmap's two colors have to be neighbors."
image: /docs/assets/images/projects/kouncil/posts/skins/skin-grid.png
also_in: [dev]
published: false
---
{%- assign fig = '/docs/assets/images/projects/kouncil/posts/skins/' | relative_url -%}
{%- assign img = '/docs/assets/images/projects/kouncil/product/' | relative_url -%}

{% capture list_items %}
Overview
Colors by Role
Graphs by Rank
What a Skin Can Leave Out
Heatmaps
Skins Are Files
{% endcapture %}
{% include elements/list.html title="" type="toc" %}

#### Overview
[Kouncil](/tools/projects/2610-kouncil) ships with twenty skins, from high-contrast light to phosphor green.
Each one is a small JSON file of colors.

The format started out as Kouncil's private theme dictionary.
It ended up as something any app can read, documented on its own page and deliberately free of anything Kouncil-specific, which allows skins to be shared globally between all future kaud.io programs.
This post is about the decisions that got it there.

<img src="{{ fig }}skin-grid.png" alt="Every built-in Kouncil skin as a row of color swatches">
All twenty built-in skins, resolved the way the app reads them.
{: .figure-caption}

### **Colors by Role**
The naive theme names a color after the thing it paints.
Kouncil's first version had keys like "sub band" and "bass band," because those were the spectrum regions the fourth and fifth accents happened to color.

That works until a second chart wants a fourth color, or the spectrum's regions change.
Then the key's name is wrong, and every skin author has to guess what it now means.

So a skin describes *roles* instead:

```json
{
  "bg": "#0e1117",       "panel": "#161b22",    "border": "#21262d",
  "text": "#e6edf3",     "muted": "#6e8a94",
  "accent": "#00d4aa",   "accent2": "#f5c518",  "accent3": "#ff6b8a",
  "ok": "#3fb950",       "warn": "#d29922",     "bad": "#f85149",
  "cmp": "#b48cff",
  "heat_cool": "#00a88a", "heat_hot": "#f5c518"
}
```

Surfaces, text, three interface accents, three status colors, and a color for "the thing you're comparing against."
None of those say anything about audio.
What each role paints is the app's business, not the skin's.

The old "sub" and "bass" keys are still read, and are written back under their new names when a skin is saved.

### **Graphs by Rank**
The interface's colors and the graphs' colors are separate keys.
Changing an accent to make a button stand out shouldn't recolor a line on every chart.

Graph colors, `data1` to `data5`, are a ranked set.
A chart with one thing to show draws it in the first color.
A second series, or a reference line, gets the second.
Five spectrum regions use all five, from the lowest up.

The rule that keeps this honest: *never pick a later color to make one chart look different from its neighbor.*
If a chart's one line is the first color, it's the first color everywhere, and a skin author can predict what every chart will look like from five swatches.

Every built-in skin names its own five, picked from its palette to stay clear of its target, compare and status colors.
Monochrome and Print, which have no hues to spend, space their grays by lightness instead, with the first three furthest apart, since most charts with more than one line use three.

### **What a Skin Can Leave Out**
A format other apps can use has to tolerate skins written for other apps, and skins written before a key existed.
So only the core keys are required.
Everything else has a fallback derived from the colors the skin does define:

- **Graph colors** fall back to the accents, in order.
- **The fourth and fifth graph colors**, for a skin with only three accents, come from its compare color and a blend of compare and accent. They used to fall back to two stock blues, which looked foreign in half the skins.
- **Heatmap colors** are picked by hue from the skin's own palette. A grayscale skin gets its muted and text colors.
- **The plot area** falls back to the panel, its outline to the grid color.

An app may also carry keys of its own.
Kouncil's are its four characters' colors and font overrides.
A reader ignores keys it doesn't know and keeps them when it saves the skin again, so one file can carry several apps' extras without any of them losing data.

### **Heatmaps**
Kouncil's heatmaps share one color ramp: transparent for the weakest eighth of the scale, then a skin's `heat_cool` color, then its `heat_hot` color, then hot pushed further from the background.

The ramp between cool and hot is a straight line in RGB.
That's simple and predictable, and it has a trap.
The midpoint of two opposite colors is gray.

<img src="{{ fig }}heat-ramp.png" alt="The same stereo width heatmap drawn with a teal to gold ramp and with a blue to orange ramp">
The same Stereo Width Heatmap drawn with two ramps. Teal to gold passes through green, a color. Blue to orange passes through a muddy mauve, and the middle of the heatmap goes with it.
{: .figure-caption}

Every value between the cool stop and the hot one is drawn from that blend, so a gray midpoint grays out a whole band of the scale, and with it every part of the chart that lands there.
The fix is a rule for skin authors, not more code: pick two colors whose midpoint is still a color.
Neighbors on the color wheel work (teal and gold, purple and orange), and so do two strengths of one hue.

Interpolating in a perceptual color space would avoid this too, at the cost of the format being less portable to other apps.
A straight RGB line takes one line of code in any language.

### **Skins Are Files**
No skin exists in the code.
The built-in skins are files in a folder, read at startup, and an empty folder is an error, not a silent fallback.
The app refers to a few skins by job (the default, the light and dark export styles) through one table, so renaming a skin means changing one line.

User skins are just as plain.
Drop a file in the user folder and it's in the list.
Hand-written JSON is forgiving here: a missing comma at the end of a line, or a trailing comma after the last one, is accepted.
A file that still can't be read is listed on the Skins tab with the reason, never skipped silently.

Each built-in skin has one idea behind it.
Monochrome is grays with red only for trouble. Terminal is phosphor green. Candlelight is flame in a dark room, with a heatmap that glows red to yellow. Print is grays on white for a mono printer, where a chart's three lines are told apart by lightness alone.

<img src="{{ img }}skin-terminal.jpg" alt="Kouncil in the Terminal skin">

Three skins sit beside the tools they resemble, Pro Tools, Logic and FabFilter's plugins, and are named Toolbox, Logical and Fabricator instead.
Those names are trademarks.

The full format is documented in the skins folder's README, written for any app that wants to read it.
