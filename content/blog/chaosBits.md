---
title: "Chaos in Bits"
date: 2021-01-07T15:01:47+01:00
tags: [processing]
draft: false 
---

One of the things I try a lot is to make cool looking images with the least effort on my part. The easiest way to do that is to let the computer do my work. At least, that's the theory; in practice I spend a lot of time tweaking the various functions and tidbits that make the final product. Maybe some day I'll just paint the individual pixel myself, it'll probably be a bit less trouble. [As usual, the code is available here](https://github.com/epsln/processingSketches/tree/main/chaosBits)

![A nice wallpaper](/chaosBit/img.jpg)

Anyway. A simple way to create nice looking patterns is to compute a function based on the coordinates of each pixel that outputs an integer, then check a particular bit on the binary representation of this integer. If this bit is 1, then the pixel is white, else the pixel is black. What's nice about this is that it's fairly easy to port it to a shader, and get it to work blazing fast.

![A nice wallpaper](/chaosBit/img2.jpg)

I usually use trigonometric functions since they are periodic and tend to create nice looking patterns that are all kind of symmetric. Iterating on them also tends to make things look interesting. Since the variations in those functions are much smaller than the sampling frequency of our pixels, we get some sweet Moire Patterns happening. 

![A nice wallpaper](/chaosBit/img3.jpg)

There's a sweet spot to be found in the place of the bit that you check: a lower order bit will be flipped more often than higher order ones. Low order bits will create a lot of details but also kind of a noise blob, while higher order creates a more simple image that can be kinda boring. 
![Showing how higher order bits affect the final image](/chaosBit/nbits.gif)
