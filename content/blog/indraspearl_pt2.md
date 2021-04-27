---
title: "Indras Pearl II: Generating the Generators"
date: 2021-03-01T17:05:25+01:00
draft: false 

tags: [math, indras pearl, fractals, klein, C]
---

This post is a part of a series where I try to explain my work on implementing methods from the book "Indra's Pearl", from Mumford, Series and Wright. [In the first part]() I talked about the very basics. If you haven't read it, I'd recommend it, simply because I really like it, and also because you might not understand what I'm talking about.

In this post we'll talk about how we chose the specific Möbius Transform that we'll use for our exploration. Since we have two of those transforms, and that they use 4 complex parameters each, this means that we have 32 real numbers to chose from. This is quite a lot ! Chosing random parameters in our transforms tends to create "dust". While those images are quite beautiful in their own right, we'd like  to have more restrictions. Those random Möbius Transforms don't really converge to a satisfying limit set. They tend to "bounce around" all over the place. We'd like it if our transforms would converge to close points, so that we can draw a line between them. With the Width First Search, having nicely placed initial circles would mean that the limit set would be Fuschian or Pseudo Fuschian, instead of a mess. Ideally, we'd like to have _some_ kind of control over the generated generators (huh), by reducing down the number of degree of freedom to one or two complex parameters. We'll call those groups parametrized, because they are... parametrized.

![Looking good but pretty undefined](/indras2/nuage.png)

The image above shows a completely randomised group, with parameters whose real part is in \\([-2; 2]\\), and whose imaginary part is in \\([-2i; 2i]\\)

## Parametrised Schottky Groups
Those groups are fairly easy to understand. To have a (Pseudo)Fuschian group, we have to have initial Schottky circles who are tangent. If the circles intersect, we'll have some nasty outputs, and if they don't touch, our limit set will be disconnected. 

Our first group is the :
## \\(\theta\\)-Schottky Group 
We have already seen this group in the last post. The initial circles are placed on a square. Their position and size depends only on one parameter, \\(\theta\\).

## Grandma Recipes
A very (very) handy recipe to have on hand in the Grandma Recipe. This one reduce the number of degree of freedom from 16 to only 2. It comes with a bunch of very nice symmetries and is normalized, so that the determinant of all matrices are equal to 1. The only parameters we actually need are the two traces of the generators \\(a\\) and \\(b\\), and grandma will fill out the rest. Grandma also set up her recipe so that the trace of the matrix \\(abAB\\) is equal to -2.

Here's her recipe:
1. Chose two complex numbers, \\(t\_a, t\_b\\)
2. Chose one of the solutions to the equation: \\(x^2 - t\_a t\_b x + t\_a^2 + t\_b^2 = 0\\), and set \\(t\_{ab} = x\\) 
3. Compute \\(z\_0 = \frac{(t\_{ab} - 2)t\_b}{t\_b t\_{ab} - 2 t\_a + 2 i t\_{ab}}\\)
4. Simply compute the generator matrixes: 

$$
a = \begin{pmatrix}
\frac{t\_a}{2} & \frac{t\_a t\_{ab} - 2 t\_b + 4 i}{(2 t\_{ab} + 4)z\_0} \\\ 
\frac{(t\_a t\_{ab} - 2 t\_b - 4 i)z\_0}{2 t\_{ab} - 4} & \frac{t\_a}{2} 
\end{pmatrix}
$$
$$
b = \begin{pmatrix}
\frac{t\_b - 2i}{2} & \frac{t\_b}{2} \\\ 
\frac{t\_b}{2} & \frac{t\_b + 2i}{2}
\end{pmatrix}
$$

## Maskit's Cooking Show
Maskit Parametrization further reduces the number of parameter to only one: \\(t\_a\\). This parametrization produces parabolic commutators and interesting looking fractals. The generator are as follows:

$$
b(z) = z + 2
$$

$$
a(z) = \mu + 1/z
$$

Where \\(\mu = t\_a/i\\).

There are other parametrisation, but those are the one which are implemented in Ceendra's Pearl. 
