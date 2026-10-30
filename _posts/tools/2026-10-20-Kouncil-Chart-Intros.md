---
title: "Kouncil: Animating Matplotlib Charts Without Drawing Them Again"
date: 2026-10-20

tags: [Python, Tech, Tech Overview, Data Visualization]
project: "Kouncil"
description: "Bars that grow, curves that rise, heatmaps that fill in: how Kouncil animates its charts in while rendering each one only once."
image: /docs/assets/images/projects/kouncil/posts/chart-intros/intro-frames.png
also_in: [dev]
---
{%- assign img = '/docs/assets/images/projects/kouncil/' | relative_url -%}

{% capture list_items %}
Overview
Why Not Just Redraw
Getting the Background for Free
Four Kinds of Motion
Finding the Missing Frames
Filming It
{% endcapture %}
{% include elements/list.html title="" type="toc" %}

#### Overview
When [Kouncil](/tools/projects/2610-kouncil) shows a track, its charts now animate in.
Bars grow from their base one after another, spectra rise from the floor, time charts and heatmaps fill in from left to right, and the goniometer opens out from its center.
The animation plays once per tab for each track, takes about two thirds of a second per chart, and can be turned off in Settings.

<img src="{{ img }}posts/chart-intros/intro.gif" alt="Tonal Balance's bars growing one after another, then the spectrum rising from the floor">
Two of the intros, rendered frame by frame from the app's own code.
{: .figure-caption}

Since this is purely decoration, I didn't want it to cost anything noticeable.
The charts are Matplotlib figures, though, and Matplotlib isn't built to animate a whole window of them at once.

### Why Not Just Redraw
The obvious way to animate a chart is to change its data a little and redraw it sixty times a second.
A full draw of one of Kouncil's charts in a 4K window takes 30 to 130 ms, since every axis, tick label, legend, grid line and heatmap cell is laid out and rasterized again, and a tab has six to eight charts.
Animated that way, a tab would get two frames a second at best, with the window frozen in between.

Matplotlib's own answer to this is blitting, where you draw everything that doesn't move once, save that image, and on each frame restore it and draw only the moving parts.
The usual approach still needs one extra full draw per chart to make that background image.
Kouncil already renders each chart once on a worker thread before showing it, so a second render on the main thread would bring back most of the cost.

### Getting the Background for Free
Matplotlib has a flag that fits this well.
An artist marked as animated is left out of a normal full draw.
It's normally used after the background is drawn, so the moving lines don't get baked into it.

I mark the data artists as animated before the first draw, on the worker thread, right after the figure is built.
The chart's one full render, which was happening anyway, then comes out as the chart without its data: just the axes, ticks, grid, and legend.
That render becomes the background without any extra drawing.

```python
for artist in data_artists(ax):      # lines, bars, fills, dots, heatmap cells
    artist.set_animated(True)       # left out of the render that follows
```

Anything placed in the axes' data coordinates counts as data.
A reference line drawn across the whole plot (Matplotlib's `axhline`) is placed partly in the axes' own coordinates, so it stays still and ends up in the background.
That turned out to be the right split almost everywhere, since targets and gates should already be there when the data arrives.

One exception is images.
Matplotlib draws an `AxesImage` even when it's marked as animated, so an image would end up in the background and in every frame.
Kouncil's heatmaps are mesh collections rather than images, so they avoid the problem.

This approach does come with a responsibility.
A chart whose data is marked only shows its background until its intro runs, so the app has to start every marked chart's intro once it's actually on screen: after the chart's draw, when a tab's loading cover comes off, and on every tab change.
If one is missed, that chart stays empty, so the tests check both that the background really is empty and that the figure goes back to normal afterwards.

### Four Kinds of Motion
Each frame restores the background and draws only the data, moved by a transform stacked on top of the artist's own.
Matplotlib transforms compose with `+`, so squashing a bar toward its own base takes one line:

```python
base_y = data_transform.transform((0, bar.get_y()))[1]      # the bar's base, in pixels
squash = Affine2D().translate(0, -base_y).scale(1, amount).translate(0, base_y)
bar.set_transform(data_transform + squash)
ax.draw_artist(bar)
```

`amount` runs from 0 to 1 on an ease-out curve, so things arrive quickly and then settle.
The motion each chart gets depends on what's in it:

- Bars - Grow from their own base, one after another, across a quarter of a second. Bars lying on their side, like L/R balance, grow sideways from zero.
- Curves and fills - Rise from the floor of the plot.
- Radar and goniometer - Open out from their center with a small turn.
- Time charts and heatmaps - Fill in from left to right, which reads as time passing.

The left-to-right fill doesn't move anything, so it doesn't need to redraw anything either.
At the start, the data is drawn once over the background and that picture is saved.
Each frame then restores the background and copies over a slightly wider strip of the finished picture.
Matplotlib's Agg renderer can restore part of a saved region, so a frame of a heatmap with tens of thousands of cells is just a memory copy.

When the intro ends, the artists go back to normal and the chart gets one real draw, which puts text and legends back on top of the data.

### Finding the Missing Frames
The first version worked, but each chart only got a handful of frames during its intro.
The frames themselves weren't the problem, at 8 to 30 ms each per chart.
Three other things were getting in the way:

1. A lock - Matplotlib only draws one figure at a time across the whole process, and Kouncil's background workers were busy rendering the tabs you hadn't opened yet, so the intro frames waited their turn and got skipped. The lock exists because text rendering shares a font cache, and an intro frame draws no text, only lines, patches and collections into the chart's own renderer. Intro frames now skip the lock, and building tabs in the background waits while intros are playing.
2. The finishing draws - When one chart's intro ended, its real draw (a tenth of a second or more on a large chart) froze every other chart still animating. Those draws now wait until no intro has run for 0.4 s.
3. Copying to the screen - Each frame copied the whole figure to the window. Copying only the plot areas cut a frame's cost by about a third.

In a 4K window with six charts animating at once, it runs at about 11 frames a second, getting faster as charts finish, and several times faster in a smaller window.
The goniometer is the most expensive at about 30 ms a frame, since it's made of thousands of dots.

### Filming It
Screen recording a 4K window can't keep up with that, and a recording would only show what the app manages live.
The intro doesn't read the clock itself, though; each frame is requested as the frame at time t.
So I wrote a small script, `tools/film_charts.py`, that builds a chart with the app's own code and steps the same intro on its own clock, where frame n is the intro at n / 60 seconds.
A frame can take as long as it needs and the sequence still comes out at exactly 60 frames a second, at any size, with a transparent background if needed for compositing.

<img src="{{ img }}posts/chart-intros/projection.jpg" alt="Kouncil's Loudness tab on a 3D screen, its loudness histogram halfway through growing in">
The whole Loudness tab's intro, filmed the same way by a sibling script and played on the 3D screen of a launch video. The histogram at the bottom is still growing in.
{: .figure-caption}
