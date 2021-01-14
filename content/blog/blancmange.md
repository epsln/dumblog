---
title: "Blancmange"
date: 2021-01-14T16:16:35+01:00
draft: true
---

Another short and sweet post on some pathological curve that I spent a good afternoon coding back in 2018. It's called a "Blancmange curve" apparently in relation to some french cake. Well I'm French and I don't think I've ever eaten any self similar cakes. Doesn't sounds that good actually.[Cake or not, the code is available here](https://github.com/epsln/processingSketches).

Anyway, this curve is defined as an infinite sum of smaller and smaller triangle waves. The amplitude and period of each wave is two time smaller than the previous. It's fairly easy to draw (and to describe). Funnily enough I though this curve was nowhere differentiable, like the Weierstrass function, but turns out this one is, but only at points  \\(x \in \mathbb{R}\\) where \\(x\\) is not a dyadic rational _i.e._, numbers who cannot be expressed in the form \\(\frac{a}{2^b}\\). Armed with this knowledge, we shall move forward with our lives. The function is defined as follows:

$$ \sum\_{n=0}^\infty \frac{s(2^n x)}{2^n} $$

With \\(s(x)\\) being the Triangle function, which returns the distance to the closest integer.

![Wow, it DOES look like a cake, said no one](/blancmange/blancmange.gif)

The Blancmange function can also be (slightly) generalized in the form of the Takagi-Landsberg curve. 

Keeping the previous iterations on the screen gives us a look at how those curves add up.

![Spikey](/blancmange/blancmangeBack.gif)

$$T_w(x) = \sum\_{n=0}^\infty w^n s(2^n x) $$ 

Using \\(w = 1/2\\), you get the Blancmange curve. I've plotted a few values of w, ranging from 0 to 2 below, for your viewing pleasure. It does breakdown with \\(w > 2/3\\) and get quite big, but it still looks neat.

![Cake.](/blancmange/wParam.gif)
