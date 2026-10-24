---
title: "Kouncil: Animating Matplotlib Charts Without Drawing Them Again"
date: 2026-10-20
published: false

tags: [Python, Tech, Tech Overview, Data Visualization]
project: "Kouncil"
description: "Bars that grow, curves that rise, heatmaps that fill in: how Kouncil animates its charts in while rendering each one only once."
image: /docs/assets/images/projects/kouncil/posts/chart-intros/intro-frames.png
also_in: [dev]
published: false
---
{%- assign img = '/docs/assets/images/projects/kouncil/' | relative_url -%}

{% capture list_items %}
Overview
Why Not Just Redraw
The Background Is Free
Four Ways In
Where the Frames Went
Filming It
{% endcapture %}
{% include elements/list.html title="" type="toc" %}

#### Overview
When [Kouncil](/tools/projects/2610-kouncil) shows a track, its charts now draw themselves in.
Bars grow from their base one after another, spectra rise from the floor, time charts and heatmaps fill in from left to right, and the goniometer opens out of its center.
It plays once per tab per track, takes about two thirds of a second per chart, and is off with one switch in Settings.

<img src="{{ img }}posts/chart-intros/intro.gif" alt="Tonal Balance's bars growing one after another, then the spectrum rising from the floor">
Two of the intros, rendered frame by frame from the app's own code.
{: .figure-caption}

That's decoration, and decoration shouldn't cost anything.
The charts are Matplotlib figures, though, and Matplotlib is not built to animate a window full of them.

### **Why Not Just Redraw**
The obvious way to animate a chart is to change its data a little and draw it again, sixty times a second.

A full draw of one of Kouncil's charts on a 4K window takes 30 to 130 ms.
Every axis, tick label, legend, grid line and heatmap cell is laid out and rasterized again.
A tab has six to eight charts.
Animated that way, a tab would get two frames a second at best, with the window frozen in between.

Matplotlib's own answer is **blitting**: draw everything that doesn't move once, keep that image, and each frame put it back and draw only the parts that move.
The usual recipe still needs one extra full draw per chart to make that background.
Kouncil already renders each chart once, off the main thread, before it's shown.
A second render per chart, on the main thread, would be most of the cost again.

### **The Background Is Free**
Matplotlib has a flag for exactly this.
An artist marked *animated* is left out of a normal full draw.
It's meant for after the background is drawn: you mark your moving lines animated so they don't get baked into it.

Kouncil marks them *before the first draw*, on the worker thread, right after the figure is built.
The chart's one and only full render, the one that was happening anyway, then comes out as the chart without its data: the axes, the ticks, the grid, the legend.
That's the background, for free.

```python
for artist in data_artists(ax):      # lines, bars, fills, dots, heatmap cells
    artist.set_animated(True)       # left out of the render that follows
```

What counts as data is anything placed in the axes' data coordinates.
A reference line drawn across the whole plot (Matplotlib's `axhline`) is placed partly in the axes' own coordinates, so it stays still and is part of the background.
That turned out to be the right split almost everywhere: targets and gates are already there when the data arrives.

*The one exception is images. Matplotlib draws an `AxesImage` even when it's marked animated, so an image would be in the background and in every frame. Kouncil's heatmaps are mesh collections, not images, which sidesteps it.*

There's an obligation that comes with this.
A chart whose data is marked shows only its background until its intro runs.
So the app has to start every marked chart's intro once it's actually on screen: after the chart's draw, when a tab's loading cover comes off, and on every tab change.
Miss one and the chart stays empty.
The tests check that the background really is empty and that the figure is ordinary again afterwards.

### **Four Ways In**
Each frame puts the background back and draws only the data, moved by a transform stacked on top of the artist's own.
Matplotlib transforms compose with `+`, so "this bar, squashed toward its own base" is one line:

```python
base_y = data_transform.transform((0, bar.get_y()))[1]      # the bar's base, in pixels
squash = Affine2D().translate(0, -base_y).scale(1, amount).translate(0, base_y)
bar.set_transform(data_transform + squash)
ax.draw_artist(bar)
```

`amount` runs from 0 to 1 on an ease-out curve, so things arrive fast and settle.
Which motion a chart gets is decided from what's in it:

- **Bars** grow from their own base, one after another across a quarter of a second. Bars lying on their side (L/R balance) grow sideways from zero.
- **Curves and fills** rise from the floor of the plot.
- **The radar and the goniometer** open out of their center with a small turn.
- **Time charts and heatmaps** fill in from left to right, which reads as time passing.

The left-to-right fill doesn't move anything, so it doesn't redraw anything either.
At the start, the data is drawn once over the background and that picture is kept.
Each frame then puts back the background and copies across the left part of the finished picture, wider each frame.
Matplotlib's Agg renderer can restore part of a saved region, so a frame of a heatmap with tens of thousands of cells is a memory copy.

When the intro ends, the artists are made ordinary again and the chart gets one real draw, which puts text and legends back on top of the data.

### **Where the Frames Went**
The first version worked, but each chart got only a handful of frames across its intro.
The frames themselves weren't the problem: one cost 8 to 30 ms per chart.

Three things were in the way.

1. **A lock.** Matplotlib draws one figure at a time across the whole process, and Kouncil's background workers were busy rendering the tabs you haven't opened yet. The frames waited their turn and were skipped. The lock exists because text rendering shares a font cache. An intro frame draws no text, only lines, patches and collections into the chart's own renderer, so frames now skip the lock. Building tabs in the background also waits while intros play.
2. **The finishing draws.** When one chart's intro ended, its real draw (a tenth of a second or more on a large chart) froze every other chart still animating. They now wait until no intro has run for 0.4 s.
3. **Copying to the screen.** Each frame copied the whole figure to the window. Copying only the plot areas cut a frame's cost by about a third.

On a 4K window with six charts animating at once it runs at about 11 frames a second, faster as charts finish, and several times faster on a smaller window.
The goniometer is the most expensive at about 30 ms a frame: it's thousands of dots.

### **Filming It**
Screen-recording a 4K window can't keep up with that, and a recording would only show what the app manages live.
But the intro doesn't read the clock itself: each frame is asked for *the frame at time t*.

So a small script, `tools/film_charts.py`, builds a chart with the app's own code, then steps the same intro on a clock of its own: frame *n* is the intro at *n* / 60 seconds.
A frame can take as long as it likes and the sequence is still exactly 60 frames a second, at any size, with a clear background if you want to put it on something else.

<img src="{{ img }}posts/chart-intros/projection.jpg" alt="Kouncil's Loudness tab on a 3D screen, its loudness histogram halfway through growing in">
The whole Loudness tab's intro, filmed the same way by a sibling script and played on the 3D screen of a launch video. The histogram at the bottom is still growing in.
{: .figure-caption}

*The cheapest animation is the one where you never draw the expensive part again.*
