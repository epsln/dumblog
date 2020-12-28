---
title: "Ulam Spiral"
date: 2020-12-28T18:38:23+01:00
draft: false 
tags: [processing, primes, math]
---

This post is the first part of an attempt at explaining most of the small animations I have done in the past few years. 

The Ulam Spiral is fairly straight forward: by arranging the integers in a spiral, and only marking the primes, you obtain strange, and frankly cool looking patterns.

Creating this sort of image is very simple. I simply created a basic loop that construct the spiral, which follows the following pattern: ULDDRRRUUUULLLL..., assigning an integer to each step and checking if it was prime. 

Honestly could have done a much simpler way by checking pixel wise, but hey, it was years ago, and one of my first experiments with computer graphics. [Code is available here](https://github.com/epsln/processingSketches/tree/main/Ullam).

Primes seems to amass and form lines, but not clear ordering can be made. 


![A big ullam spiral](/ullam/ullam.gif)

At higher level of zoom, the pattern seems to become harder to distinguish from noise, however.

![A big ullam spiral](/ullam/ullam1080.png)


