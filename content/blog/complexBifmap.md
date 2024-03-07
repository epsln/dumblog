---
title: "Complex Bifurcation Diagrams and Hilbert Curves"
date: 2023-03-13T16:29:08+01:00
tags: [processing, math, dynamical systems, fractals]
draft: false 
---

# Bifurcation diagrams
A bifurcation diagram is a pretty great way to observe the dynamics of a parametrized one dimensional map. On the x-axis, the parameter and on the y axis is shown the trajectory of the point after a few iteration (so that the system settle down into the attractor). For example, with the logistic map :

$$x\_{n+1} = r * x\_{n} (1 - x\_{n}), r, x_0 \in \mathbb[R] $$

We usually draw a logistic map with the \\(r\\) parameter usually being between \\([2; 4]\\). For \\(r\\) between \\(2\\) and \\(3\\), the map converges into a limit point. However, at \\(r = 3\\), the dynamic changes, and the system ocillates between two values: a 2-cycle. After \\(r = 3.44949\\) the system then oscillates settles into a 4-cycle. Then, period doubling occurs faster and faster, until the systems become chaotic at around \\(r = 3.56995\\).  

![1D bifurcation diagram.](/complexBifMap/logmap1d.jpg)

# But what about \\(\mathbb[R]^N\\) ??
So this is pretty great and all, but not all functions are one dimensional. I wanted to see the dynamics of complex valued functions. However, this poses an interesting problem, as we don't really have the capabilities to correctly understand 4 dimensional space: we'd need two dimensions for input, and two for the output. We evidently need to reduce the dimensionnality, but how ? 

We'd like to visualise the trajectories, so we cannot really cut down there. We could always fix the real or complex part to some number, and use time as our 3rd axis, gradually changing and creating some cute animation. We could also do a 3D scatter plot, and use time as our 3rd dimension, but this can be hard to read.

There is another way however, and it involves fractals.

# Hilbert Curves
Another trick to visualise all possible values of a complex parametrised function is to use a Hilbert curve. In fact, we can use all type of space filling curves, but Hilbert's ones are pretty simple to implement. Space filling curves are useful because they also preserve locality, meaning that points which are close together in the input space will stay close together in the output space. 

In our case, we use the curve to move through all values of the parameter space, preserving locality and for each point in the curve plotting the trajectory. The \\(x\\) axis will be the values of the parameter, and on the \\((y, z)\\) the trajectories. We get a nice and smooth graph. 

![Wow!](/complexBifMap/logmap3d.jpg)

This figure shows a bifurcation diagram in 3D for the logisistic map, but with complex parameters and values. To plot this, we follow a Hilbert curve through the complex plane. The values on this curves gives us our parameter \\(r\\). We then chose a random \\(z_0\\), such as \\\-1 < \Re(z_0) < 1, -1 < \Im(z_0) < 1\\). We then iterate, and for each \\(z_n\\) we plot a point in 3D space with the coordinates given by the real and complex part of \\(z_n\\), and the real part of the \\(r\\) parameter. 

This figure actually lives in 3D space, so it might be better as a video, so you can understand depth a bit better. 

![3D bifurcation diagram oof mandelbrot!](/complexBifMap/logmap3d_mandelbrot.jpg)

The figure above shows the same process but with the Mandelbrot map, given by (but you should know it by now !):

$$z\_{n+1} = x\_{n}^2 + c, z, c \in \mathbb[C]$$

Here, we use the Hilbert curve on the \\(c\\) parameter.

While this gives us some pretty pictures (which was the whole point), this representation has its issues. We don't represent all of the possible trajectories of a given parameter, since we only iterate on one value for each parameter. I have tried using more, but the figure quickly becomes unreadable. Since the Hilbert curve likes to ... curve a lot, the representation of 2 numbers on a single axis is not readily understandable. I do think it's still a nice way to reduce the dimensionality a bit. 
