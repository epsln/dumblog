---
title: "Chaos in Logic"
date: 2021-01-09T00:13:28+01:00
tags: [processing, shader, math, logic, chaos]
draft: false 
---

Keeping up with the traditions I've set-up a few days ago, we're going to talk about chaos. "Oh no, yet another boring example of a Henon map ? Maybe with colors this time ? Or just the Lorentz Attractor with some platitudes on the chaos in life itself ?", you may say, snarkily. Well, voices in my head, no, not quite.

I kinda dig logic as a field. And by "dig", I mean looking from afar and vaguely nodding when someones talks to me about consistency of a formal system. A few months ago I fell onto a great paper that talks about a particular kind of paradoxes, and using real valued logic, transform those paradoxes into discrete dynamical systems. Those systems are then shown to have complicated dynamics. 

[This all sounds kinda complicated until you actually read the paper](https://pdfs.semanticscholar.org/c14b/baa0cf8a198c6069eec278eea39ca0490374.pdf). Real valued logic is something that is actually fairly straightforward, especially if you've grappled a bit with Machine Learning. Instead of using binary truth value, like 0 for False and 1 for True, you can use all the reals in between. You can reassure yourself that you're not doing magic by pretending this number just represents how confident you are in an assertion. Paradoxes, such as the liar paradoxes are now function real to real, that takes a confidence level and outputs another. If you keep iterating this operation, _tadam_ you get dynamics.

The author first uses the "Simple Liar" as an example, i.e:

$$P: \text{This Sentence is False}$$

Using standard logic, starting from the assumption that \\(P\\) is True, then \\(P\\) must be False, then True, then... Or just (1,0,1,0...). We can model the behavior of the "Simple Liar" using the following function : 

$$x\_{n+1} = 1 - x\_n$$

Analysis will show that this dynamical systems contains a period two fixed point, _i.e_ it never settles on a truth value. This is true for all starting value of \\(x \in [0;1]\\) (except 0.5): it's an attractive cycle. 

Remind yourself that you don't have to only use 1 and 0: you can use every real in between ! So if you use a "confidence level" of 0.7 on this proposition, you will get 0.3 as your confidence level on this proposition. Doing this again will create a cycle : \\(0.7, 0.3, 0.7...\\). There is a fixed point actually: 0.5. If you "ain't so sure it's true, but ain't so sure it isn't", being very precisely "so-so" on this proposition, then you always get 0.5, because \\(1 - 0.5 = 0.5\\).

A variation can be done using two propositions: the Dualist.

$$X: X\text{ is True to half the extent that } Y \text{ is True}$$
$$Y: Y\text{ is True to the extent that } X \text{ is False}$$

Transforming this into function form we get a function mapping \\(\mathbb{R}^2\\) to  \\(\mathbb{R}^2\\) (because we have two inputs, X and Y):

$$x\_{n+1} = 1 - abs(0.5 * y\_{n+1} - x\_{n})$$
$$y\_{n+1} = 1 - abs((1 - x\_{n+1}) - y\_n)$$

Now, we can use our traditional tool for looking at those kind of dynamical systems: the standard escape time diagram, from Mandelbrot _et al._ fame. For all points \\(p \in \mathbb{R}^2\\), iterate using our function system using \\(p\\) as a starting point, and color the point based on the number of iterations until it exploded into infinity. Since we don't have the kind of patience to iterate an countably infinite number of time for a uncountably infinite number of points, we'll just do that for every pixel, and iterate something like ten times. Sorry, **all computer scientist are ultra finitists in pratice**.

![At least we get good pictures out of all this work !](/chaoticLogic/dualist.jpg)

Nice ! Darker shades of gray indicates starting values of \\(X, Y\\) that diverges very quickly. Whiter pixels indicates values that go into cycles or just converge to some fixed point.

A variation on this could be. 

$$X: X\text{ is as True as } Y $$
$$Y: Y\text{ is as True as } X \text{ is False}$$

One model of this is :
$$x\_{n+1} = 1 - abs(y\_{n} - x\_{n})$$
$$y\_{n+1} = 1 - abs((1 - x\_{n+1}) - y\_n)$$

Applying our escape time method from earlier, we get this beauty:

![I know it's not centered, but whatcanido heyyyy](/chaoticLogic/dualistChaos.jpg)

So, it turns out that certain paradoxes can be modeled as discrete dynamical systems using real valued logic, that those paradoxes have complex dynamics, and of course, that they make great looking fractals.
[The code is available here, as always](https://github.com/epsln/processingSketches/tree/main/chaosParadox). But now the link is at the bottom of the page!
