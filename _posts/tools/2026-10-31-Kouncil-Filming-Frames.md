---
title: "Kouncil: Filming an App One Exact Frame at a Time"
date: 2026-10-31
tags: [Python, Tech, Tech Overview]
project: "Kouncil"
description: "How I film Kouncil's animations at any frame rate and resolution by handing the app a clock the script controls, and what that took inside a Tk main loop."
image: /docs/assets/images/projects/kouncil/posts/filming/held-clock-frames.jpg
also_in: [dev]
published: false
---
{%- assign fig = '/docs/assets/images/projects/kouncil/posts/filming/' | relative_url -%}

{% capture list_items %}
Overview
Why Screen Recording Doesn't Work
Holding the Clock
Running Inside the Main Loop
What the Clock Can't Hold
Results
{% endcapture %}
{% include elements/list.html title="" type="toc" %}

#### Overview
When [Kouncil](/tools/projects/2610-kouncil) shows a track, each tab animates in: charts grow, numbers count up, text fades in and a character's note types out.
I wanted that footage for launch videos, at 4K and a steady frame rate, which the app can't actually draw live.
This post covers `film_tab.py`, a script that runs the real app and films it frame by frame on a clock it controls, so frame n always shows the app at exactly n / fps seconds.

<img src="{{ fig }}held-clock-frames.jpg" alt="Four frames of Kouncil's Loudness tab animating in: empty charts with numbers at zero, then curves filling in and numbers counting up, then the finished tab">
Frames 3, 12, 24 and 60 of the Loudness tab at 30 frames a second, filmed in a 4K window.
{: .figure-caption}

### Why Screen Recording Doesn't Work
A 4K window with six charts animating at once runs at about 11 frames a second.
A screen recorder captures what the app manages to draw, so the recording comes out choppy no matter what frame rate it's set to, and the recorder itself takes CPU time from the app.
Each take is also a little different, since the app's timers fire whenever the machine gets to them.

Game engines have dealt with this for a long time.
A fixed time step decouples the simulation from how long a frame takes to render, so a replay or a capture can step time forward by exactly 1/60 of a second however long each frame takes.
Kouncil's animations were already written so that this could work.

### Holding the Clock
Every animation in Kouncil reads the time from `time.perf_counter()` and works out where it should be at that moment, rather than counting frames.
A chart's intro is a function of elapsed time, the count-up is a function of elapsed time, and so is the typing.
So if `perf_counter` returns whatever time I tell it to, the app draws whatever moment I ask for.

The script swaps the `time` module the app's two animation files use for a stand-in:

```python
class _HeldClock:
    def __init__(self):
        self.held = None

    def perf_counter(self):
        return time.perf_counter() if self.held is None else self.held

    def __getattr__(self, name):
        return getattr(time, name)

clock = _HeldClock()
kouncil.time = tkwidgets.time = clock
```

Everything else is passed through to the real module, so `sleep` and the rest keep working, and when `held` is `None` the app runs on real time as usual.
Nothing in the app knows it's being filmed.

Filming a tab is then a loop.
I set the held time to the start plus n / fps, give the app a moment to run its timers and repaint, capture the window, and move to the next frame:

```python
clock.held = start = time.perf_counter()
app.nb.select(tab_index)
while not done:
    clock.held = start + frame / fps
    yield ('wait', FRAME_SETTLE_S)      # the app's timers run, at the held time
    app.update_idletasks()              # and its repaints
    grab_window(app).save(folder / f'frame_{frame:04d}.png')
    frame += 1
```

A frame can take half a second to capture and the result is still a perfect 60 frames a second, at any window size the machine can hold.
The capture draws the window into a bitmap (Windows' `PrintWindow`) rather than grabbing the screen, so the window can sit behind others or partly off screen while it films.

### Running Inside the Main Loop
My first version drove the app with a plain loop of `update()` calls, which is the usual way to script a Tk app.
It fell over as soon as a track loaded.
Kouncil analyzes on worker threads that hand their results back to the interface with `after()`, and Tk only accepts that while `mainloop()` is running.
Under a loop of `update()` they failed with "main thread is not in main loop."

So the filming script is a generator, and a small driver runs it from inside the app's own main loop.
Each step yields either a wait or a condition to wait for, and the driver schedules the next step with `after()`:

```python
def advance():
    request = next(steps)
    if request[0] == 'wait':
        app.after(int(request[1] * 1000), advance)
    else:
        _kind, test, timeout, what = request
        poll_until(test, timeout, what, then=advance)

app.after(0, advance)
app.mainloop()
```

The script reads top to bottom like a normal sequence (load the track, wait until the analysis is done, open the tab, film it), while Tk stays in charge of the thread.
A condition that never comes true stops the run with a message saying what it was waiting for, so a run doesn't hang waiting on, say, an analysis that failed.

### What the Clock Can't Hold
A few things don't run on that clock.

Playback is one.
Kouncil plays audio from a [separate process](/tools/blog/Kouncil-Audio-Process) whose clock is the sound card, and the meters, the live goniometer and the playheads follow it.
For a shot of the track playing, the script switches to real time and captures the window as fast as it can, stamping each capture with its time.
Each film frame then takes the latest capture at or before its own time.
The app redraws its meters every 50 ms, so at about 20 captures a second nothing on screen is lost, and the film still comes out at an exact frame rate.

The other was the pause before a chart's text fades in once its intro ends.
That pause is measured in real time on purpose, so where it lands in the film depends slightly on how fast frames are captured.
I tried setting it to zero for filming, but that changed the layout, since one column measured its width before the text had arrived.
So it stays, and I adjust for it in editing.

The last one is the first visit.
A tab's first intro does work the replays don't, like saving what a replay needs, so the script shows the tab once, switches away, and films the second showing with the app set to replay intros every time.

### Results
A full tab's intro at 4K and 30 frames a second takes a few minutes to film and comes out frame-exact on every run, which matters when the footage gets cut to music.
The same script also writes out where each chart and table sits in the frames, which my Blender pipeline uses to split the interface into separate screens for 3D shots.
A sibling script does the same for single charts without opening a window at all, which I covered in the [chart intro post](/tools/blog/Kouncil-Chart-Intros).
