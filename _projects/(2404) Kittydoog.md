---
name: KittyDoog
tools: [Pure Data]
image: /docs/assets/images/projects/kittydoog/kittydoog-title.png
description: Pure Data Minimoog clone.
---

<div class="row">
<div class="col" style="min-width:300px; max-width:500px;" markdown="1">
# Kittydoog
(Software, Instrument, Standalone)

<div class="row">
<br>
</div>
<div class="row">
<div class="col" markdown="1" style="max-width:80%;">
Made with
<img src="/docs/assets/images/projects/kittydoog/pd-logo.jpg" alt="Pure Data Logo">
Pure Data
</div>
<div class="col">
</div>
</div>

</div>
<br>
<div class="row">
<div class="col">
</div>

</div>
<div class="col">
</div>
<div class="col" style="max-width:30%;">
{% capture list_items %}
Principle
Design
Interface
Documents
Related Posts
{% endcapture %}
{% include elements/list.html title="" type="toc" %}
</div>
</div>

<img src="/docs/assets/images/projects/kittydoog/kittydoog-panel.png" alt="Panel">

<div class="row">
<div class="col">
<img src="/docs/assets/images/projects/moorer-reverb/moorer-1.png" alt="Title Image">
</div>
<div class="col">

<div class="row" markdown="1">
<br>
A realtime 6 tap delay and allpass based stereo reverb modeled after <a href="#documents">James A. Moorer's paper</a> for Computer Music Journal titled "About This Reverberation Business."

Built from the ground up using a custom audio processing library. User interface rendered with JUCE.

<div class="row">
<br><br>
</div>
<div class="row">
<div class="col" style="max-width:70%;">
</div>
<div class="col">
</div>
<div class="col" markdown="1">
Made with
<img src="/docs/assets/images/projects/moorer-reverb/jucelogo.png" alt="JUCE Logo">
</div>
</div>

</div>
<br>
<div class="row">
<div class="col">
</div>
</div>
</div>
</div>

## Principle

<div class="row">
<div class="col" style="min-width:300px; max-width:500px;" markdown="1">
<br>
Moorer's model represents a rectangular room with six walls, each represented by a lowpass comb (delay) filter. 
Each delay time simulates its respective wall's distance from the source, allowing the emulation of spaces of varying size and proportion.

Each wall's lowpass coefficient corresponds to its high-frequency damping, which in practice is akin to the surface's roughness and affect's the echo's perceived diffusion.

The dry/wet mix emulates the listener's proximity to the source.

<br>
*Note that comb and delay filters are mathematically equivalent. I will use the terms interchangeably.*

</div>
<div class="col" markdown="1">
<div class="row">
<img src="/docs/assets/images/projects/moorer-reverb/moorer-fig-1.svg" alt="Figure 1">
</div>
<div class="row" markdown="1">
    Fig. 1: Room model with walls numbered by relative delay time
</div>
</div>
</div>

## Design

<div class="row">
<div class="col" markdown="1">
<div class="row">
<img src="/docs/assets/images/projects/moorer-reverb/moorer-fig-2.svg" alt="Figure 2">
</div>
<div class="row" markdown="1">
    Fig. 2: Moorer Reverb signal flow
</div>
</div>

<br>
<div class="col" style="min-width:300px; max-width:500px;" markdown="1">
##### DSP Architecture
After the signal is passed to the delay network, delay taps are summed, passed through an allpass filter, then mixed with a proportion of the dry signal (*K*). 

The allpass filter generates phase distortion across the frequency domain, emulating some of the "scrambling" of acoustic reverberation.
This also proves highly effective in stereo channel decorrelation (more on this later).

<br>
*Yes, this transfer function is daunting. Breaking the environment into modular filter blocks makes the project much more manageable.*

<div class="row">
<img src="/docs/assets/images/projects/moorer-reverb/moorer-eq-1.png" alt="Equation 1">
</div>
    Eq. 1: Moorer Reverb transfer function for N delay taps

</div>
</div>

<br>
<div class="row">
<div class="col" style="min-width:300px; max-width:500px;" markdown="1">
##### Lowpass Comb
This delay model allows for both feedforward (*Z<sup>-L</sup><sub>f</sub>*) and feedback (*Z<sup>-L</sup><sub>b</sub>*) delays. Dry signal can be introduced by coefficient *d*. The feedback insert path will operate on any DSP filters of any quantity, in parallel or in series. 

In the case of a Moorer Reverb, feedback passes through a lowpass filter to emulate high-frequency damping.

<br>
*As a fun aside, lowpass filters are also simply delays. 
In my implementation, this reverb is entirely composed of modules derived from my feedback+feedforward echo class.
This means that delays and lowpasses could be nested indefinitely for more complex reverb modeling.*

</div>

<div class="col" markdown="1">
<div class="row">
<img src="/docs/assets/images/projects/moorer-reverb/moorer-fig-3.svg" alt="Figure 3">
</div>
<div class="row" markdown="1">
    Fig. 3: Lowpass comb (delay) with lowpass feedback insert
</div>
</div>

</div>

<div class="row">

<div class="col" markdown="1">
<div class="row">
<img src="/docs/assets/images/projects/moorer-reverb/moorer-eq-2.png" alt="Equation 2">
</div>
    Eq. 2: Lowpass filter transfer function
</div>
<div class="col" markdown="1">
<div class="row">
<img src="/docs/assets/images/projects/moorer-reverb/moorer-eq-3.png" alt="Equation 3">
</div>
    Eq. 3: Lowpass comb transfer function
</div>

</div>

<div class="row">
<div class="col" markdown="1">
<div class="row">
<img src="/docs/assets/images/projects/moorer-reverb/moorer-fig-4.svg" alt="Figure 4">
</div>
<div class="row" markdown="1">
    Fig. 4: Allpass filter signal diagram
</div>
</div>

<div class="col" style="min-width:300px; max-width:500px;" markdown="1">
##### Allpass
The allpass is, once again, a variation on feedback and feedforward delay. 
The mix coefficients *a* and *-a* between the two *m*-delayed paths are inverted, producing the frequency-dependent phase distortion we need.

<div class="row">
<img src="/docs/assets/images/projects/moorer-reverb/moorer-eq-4.png" alt="Equation 4">
</div>
    Eq. 4: Allpass filter transfer function

</div>
</div>


## Interface
<img src="/docs/assets/images/projects/moorer-reverb/moorer-1.png" alt="Title Image">

#### Controls

<div class="row">
<div class="col">
<img src="/docs/assets/images/projects/moorer-reverb/moorer-input.png" alt="Input Image">
</div>
<div class="col">
<div class="row" markdown="1">
##### Input
</div>
<div class="row" markdown="1">
**Open...** : Opens file browser to select input file

**Play** : Starts playback of the input file.

**Stop** : Stops playback of the input file.

**Dry Percent** : Percent of dry signal in the output mix. <br>
*This is the inverse of a "dry/wet" control.*

</div>
</div>
</div>

<br>
<div class="row">
<div class="col">
<div class="row" markdown="1">
##### Output
</div>
<div class="row" markdown="1">
<br>
**Wet Gain** : Gain factor of the wet reverb signal.<br>
*This can make up for gain lost by the lowpass filters with highly dampened settings.*
</div>
</div>
<div class="col">
<img src="/docs/assets/images/projects/moorer-reverb/moorer-output.png" alt="Output Image">
</div>
</div>

<br>
<div class="row">
<div class="col">
<img src="/docs/assets/images/projects/moorer-reverb/moorer-delays.png" alt="Delay Network Image">
</div>
<div class="col">
<div class="row" markdown="1">
##### Delay Network
</div>
<div class="row" markdown="1">
*Each delay tap features the same parameters.*
<br>
<br>
**L** : Delay time (samples).

**g** : Lowpass feedback gain coefficient (see [transfer function](#lowpass-comb)).

**R** : Comb feedback gain coefficient (see [transfer function](#lowpass-comb)).

**gR Factor** : Zero-frequency loop gain. *g* and *R* are inversely related by R/(1-g) = *gR Factor*.

**Pan** : Left/right stereo mix.

**Gain** : Gain factor.

</div>
</div>
</div>

<br>
<div class="row">
<div class="col">
<div class="row" markdown="1">
##### Allpass
</div>
<div class="row" markdown="1">
**Allpass Coeff** : Allpass coefficient *a*. Affects amount of phase distortion (see [transfer function](#allpass)).

**Spread** (Allpass Coeff) : Offsets the allpass coefficient of the right stereo channel.

**Allpass Delay** : Allpass delay *m* (samples). Affects amount of phase distortion (see [transfer function](#allpass)).<br>
*Note that fractional sample values are possible via interpolation.*

**Spread** (Allpass Delay) : Offsets the allpass delay of the right stereo channel.

</div>
</div>
<div class="col">
<img src="/docs/assets/images/projects/moorer-reverb/moorer-allpass.png" alt="Allpass Image">
</div>
</div>

<br>
<div class="row">
<div class="col">
<img src="/docs/assets/images/projects/moorer-reverb/moorer-ir-2.png" alt="Impulse Response Image">
</div>
<div class="col">
<div class="row" markdown="1">
##### Impulse Response
</div>
<div class="row" markdown="1">
**IR Zoom** : Horizontal zoom factor for Impulse Response graph.

**Plot IR** : Recalculates Impulse Response graph.<br>
*This calculation can take a moment and controls may be unresponsive until it completes.*<br>
*This does not affect audio output.*

</div>
</div>
</div>

<br>
<div class="row">
<div class="col">
<div class="row" markdown="1">
##### Panic!
</div>
<div class="row" markdown="1">
**Panic!** : Clears all audio buffers. <br>
*This can be helpful in the case of accidental infinite feedback or DC offset buildup.* <br>
*This control will reset any ongoing reverb.* <br>

</div>
</div>
<div class="col">
<img src="/docs/assets/images/projects/moorer-reverb/moorer-panic.png" alt="Panic Image">
</div>
</div>

<br>
#### Displays

<div class="row">
<div class="col">
<img src="/docs/assets/images/projects/moorer-reverb/moorer-input.png" alt="Input Image">
</div>
<div class="col">
<div class="row" markdown="1">
##### Input
</div>
<div class="row" markdown="1">
**Signal-Time** : Charts the input signal values over time.<br>
*This is similar to typical oscilloscope analysis.*

**Magnitude-Frequency** : Charts magnitude of the input signal's frequency content from 0 Hz to the system's Nyquist frequency.<br>
*This is similar to typical spectrogram analysis or Fourier transform.*

</div>
</div>
</div>

<br>
<div class="row">
<div class="col">
<div class="row" markdown="1">
##### Output
</div>
<div class="row" markdown="1">
<br>
**Signal-Time** : Charts the output signal values over time.<br>
*This is similar to typical oscilloscope analysis.*

**Magnitude-Frequency** : Charts magnitude of the output signal's frequency content from 0 Hz to the system's Nyquist frequency.<br>
*This is similar to typical spectrogram analysis or Fourier transform.*
</div>
</div>
<div class="col">
<img src="/docs/assets/images/projects/moorer-reverb/moorer-output.png" alt="Output Image">
</div>
</div>

<br>
<div class="row">
<div class="col">
<img src="/docs/assets/images/projects/moorer-reverb/moorer-ir.png" alt="Impulse Response Image">
</div>
<div class="col">
<div class="row" markdown="1">
##### Impulse Response
</div>
<div class="row" markdown="1">
This displays the reverb's sample outputs over time when given an input of a single sample of maximum amplitude.

The purple samples represent the left channel while the red samples represent the right channel.

</div>
</div>
</div>

<br>
<div class="row">
<div class="col">
<div class="row" markdown="1">
##### Polar Graph
</div>
<div class="row" markdown="1">
<br>
Each circle illustrates the following parameters of each lowpass comb tap:
  - Distance from origin ∝ delay time
  - Fill opacity ∝ delay feedback factor
  - Outline opacity ∝ lowpass factor
  - Hue ∝ gR factor (purple = 0, red = 1)
  - Angle in range 0-π ∝ stereo pan
  - Size ∝ gain
</div>
</div>
<div class="col">
<img src="/docs/assets/images/projects/moorer-reverb/moorer-polar.png" alt="Polar Graph Image">
</div>
</div>

## Documents
#### James A. Moorer - About This Reverberation Business
{% assign pdf="/docs/assets/pdfs/projects/moorer-reverb/moorer-paper.pdf" -%}
<object data="{{pdf}}" type="application/pdf" width="100%" height="1000px">
    <embed src="{{pdf}}" type="application/pdf">
        <p>This browser does not support PDFs. Please <a href="{{pdf}}">download the PDF</a> to view it.</p>
    </embed>
</object>

## Related Posts
{% assign tagfilter="Spatial Audio" -%}
<div style="max-width: 1fr">
    <div class="row">
        <div class="container-fluid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));">
            {% for post in site.posts %}
                {% for tag in post.tags %}
                    {%- if tag == tagfilter -%}
                        <div class="col pl-1 pr-1">
                            {% include blog/post-card.html %}

                            {%- if forloop.index0 == 3 -%}
                                {%- break -%}
                            {%- endif -%}
                        </div>
                    {%- endif -%}
                {% endfor %}
            {% endfor %}
        </div>
    </div>
</div>