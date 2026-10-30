---
title: "Kouncil: Keeping the Audio Callback Fed"
date: 2026-10-30

tags: [Audio Programming, Tech, Python, Tech Overview]
project: "Kouncil"
description: "Why Kouncil's playback moved into its own process, and how the app and the audio engine share audio and controls without waiting on each other."
also_in: [dev]
published: false
---

{% capture list_items %}
Overview
The Problem
A Separate Process
Sharing Audio
Sharing Controls
Meters
Starting and Stopping
Results
{% endcapture %}
{% include elements/list.html title="" type="toc" %}

#### Overview
[Kouncil](/tools/projects/2610-kouncil) plays back the tracks it analyzes, with looping, A/B comparison against a reference, a band-pass filter you can drag across the spectrum, and eight codec versions of the track to switch between.
Playback originally ran in the same Python process as the rest of the app, and it would drop out whenever the app was busy.
This post covers how I moved playback into a separate process, and how the two processes share audio and controls without ever blocking the audio callback.

### The Problem
The sound card requests a block of 1,024 samples about every 23 ms, and if the callback misses that deadline you hear a dropout.
The callback is Python, so it needs the interpreter's global lock (the GIL) to run, and only one thread can hold the GIL at a time.
In Kouncil's process, the analysis and codec simulation threads and Matplotlib's chart rendering all compete for that same lock.
While the app was busy, I measured the callback answering up to 126 ms late.

A bigger output buffer would have hidden the dropouts, but at the cost of an equally long delay on everything the user does during playback, like pressing play or switching between the original and a codec version.
That delay matters a lot in a tool built around A/B comparison.
Thread priority doesn't help either, since the audio thread still has to wait for whichever thread currently holds the GIL.

### A Separate Process
A second Python process has its own GIL, so I split playback into three parts:

- Renderer - Takes the sources and the current controls and produces one block of output. It has no device or process logic, so the tests can drive it one block at a time.
- Engine process - Owns the output stream and runs the renderer inside the audio callback. The packaged app launches a second copy of itself as the engine with a command-line flag, which is handled before the rest of the app is imported.
- Engine handle - The app's side, which starts the engine and tells it what to play.

The split itself was simple.
Most of the work was making sure the app and the engine could communicate without the callback ever waiting on the app.

### Sharing Audio
A decoded track is 60 to 180 MB, which is far too much to send through a pipe.
Instead, the decoder writes each track directly into a block of shared memory, and the engine maps that same block by name.
Codec versions stored on disk are memory-mapped files, which the engine opens the same way.

### Sharing Controls
Controls like the active source, playback mode, loop range, gain, filter band, and seek position live in a small shared array of floats.
The tricky part is consistency.
A loop range is a start and an end, and if the engine reads the new start alongside the old end it plays the wrong audio for a block.
A lock would solve this, but the callback can't afford to wait on one.

I used a sequence lock instead.
A generation counter is odd while the app is writing and even once it's done:

```python
def _write(self, slots):
    with self._write_lock:            # only orders the app's own threads
        control[GEN] += 1             # odd: write in progress
        for slot, value in slots.items():
            control[slot] = value
        control[GEN] += 1             # even: write finished
```

The engine reads the counter, copies the controls, and checks the counter again.
If it was odd, or changed during the copy, the engine tries again.
After four failed attempts it keeps using the last complete set of controls, which is at most one block old.

```python
for _attempt in range(4):
    generation = control[GEN]
    if generation % 2:
        continue                      # the app is mid-write
    values = control[:APP_END].copy()
    if control[GEN] == generation:
        self._asked = Controls.from_block(values)
        break
return self._asked
```

Information going back to the app, like playhead positions, peak levels, clipping and underrun counts, is written by the engine alone, one value per slot, so it needs no lock.
Seeking uses a pair of counters: the app increments a sequence number along with the target position, and the engine echoes that number back once it has jumped, so the app can tell an old playhead position from a new one.

### Meters
The meters, loudness reading, goniometer, and live spectrum all draw the audio that was just played.
The engine writes each output block into a shared ring buffer holding the last 1.5 seconds, then increments a block counter, so the app never reads a half-written block.
The app checks the ring every 50 ms and takes whatever is new.
If the app falls more than 1.5 seconds behind, the meters skip ahead instead of holding up the audio.

A pipe handles the few requests that need a reply, like loading sources, starting, stopping, and closing.
None of them run inside the audio callback.

### Starting and Stopping
Opening an output device takes about a third of a second, which is a noticeable delay after pressing play.
So stopping playback aborts the stream instead of closing it.
Aborting silences the output immediately and keeps the device open, while stopping would play out whatever was left in the device's buffer.
Restarting an open stream takes about 3 ms.
The engine closes the device a little while after playback stops, so it doesn't hold onto an output device the user has switched away from.

If the engine stops responding, the app drops it and starts a new one on the next press of play, picking up from the positions stored in the shared controls.

### Results
Under the same load that made the old callback 126 ms late, the longest gap between callbacks is now 31 ms, with no underruns at a 93 ms output buffer.
Analysis and chart rendering are just as heavy as before, but they no longer share a lock with the audio.
