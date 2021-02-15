---
title: "Arnold and its Tongues"
date: 2021-02-16T00:04:25+01:00
tags: [math, processing, shader] 
draft: false 
---

Hi, I'm back. I have been working a lot on my Indra's Pearl implementation, available here. I'll write an article about it soon, since it's pretty interesting, but not now. Now we're talking about tongues. [Code is available here](https://github.com/epsln/processingSketches/tree/main/circleMap)

The Arnold Tongue(s) are a particular kind of fractal that arises when we plot the rotation number of a particular circle map. Circle maps are functions from the circle to itself. They are particularly conducive to chaotic motions, and are pretty simple so it's a good start. We are interested in the following circle map:

$$ \theta\_{i+1} = \theta\_i + \Omega + \sin(2  \pi  \theta\_i) * \frac{K}{2 \pi} $$

The \\(\Omega\\) and \\(K\\) are fixed parameters, and \\(\theta\_i\\) is to be computed using mod 1. If you're following carefully, you might remember this function from our article on the Devil's Staircase. It's because it is the same thing, and the rotation number as a function \\(Omega\\), when \\(K = 1\\) _is_ the Devil's  Staircase. It's also known as the kicked rotor in physics. Quite a handy function.

Arnold tongue are created by visualising its rotation number, and by varying the \\(K\\) and \\(\Omega\\) parameters. In certain combinations of parameters, the map advances by a rational multiple of the previous iterate _i.e._ \\(\theta\_{i+1} = \frac{p}{q} \theta\_i\\). The rotation number is an invariant that gives the limiting behavior of this move. It is defined as follows

$$ \omega = \lim\_{n \to +\infty}\frac{\theta\_i}{n} $$ 


We now have everything in our hands to create our tongues.


![A nice wallpaper](/tongues/FHD.jpg)

Looks neat. Here, the \\(\Omega\\) varies from 0 to 1 along the y axis, and \\(K\\) varies from \\(2 \pi \\) to 0 along the x axis. The rotation number colors the image in grayscale, with 0 being black and 1 being... white. 
