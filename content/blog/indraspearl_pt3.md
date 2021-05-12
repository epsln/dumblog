---
title: "Indras Pearl III : Searching for a place to stop"
date: 2021-05-04T00:23:07+02:00
draft: true
---

In the past article we've seen an overview of what kind of objects we were talking about, and how to create generators that would be interesting to explore. In this part, we'll talk about the bread and butter of Indra's Pearl, namely the Depth First Exploration Algorithm, or DFS. For the sake of simplicity, i'll refer to the inverse of a generator using the uppercase version of it's associated letter, so the inverse of a is A, and the inverse of b is B. 

Remind yourself about what exactly we are doing here. We have 2 generators (a and b), which are Mobius Transforms which you can just think of them as 2x2 matrices with complex elements and determinant 1, along with their inverses (A and B, respectively). In total we have 4 "actions", and we'd like to see all the possibilities, or words that can be creating by arranging those generators. For now, the only rule we'll have is that we cannot combine a word with a generator who is the inverse of the last character of the word. For example, aaaaaB is a valid word, but babbAa is not since a is the inverse of A. 

You can think of this as the exploration of a tree. The root of this tree is the identity matrix. Then, we have four branches, since we have four actions (a, b, A, B). From then on, each node on the tree only have 3 branches, since we can't use the inverse of an action. 

So why the DFS you ask ? Exploring Breadth First seems simple and adequate, why should we waste our time on this ? Well, because we'd like to plot some _limit sets_. Using the BFS means that we'd waste a lot of time exploring all the branches before diving into a deeper level and that we cannot draw a continuous line between all the endpoints. During exploration, the order matter ! Moreover, BFS implies that we need to keep in memory all the matrices because they will all be needed to go to the next level. This implies an *exponential* memory cost, which is unacceptable.
## What are we plotting ?
With the BFS algorithm, what we essentially did was applying a Mobius transform on each of the 4 circles of the initial Shottky array. As it turns out, we don't need to do apply this transform to a specific circle. What we could do, is simply chose a seed point \\(P\\) in the initial Shottky circles, and apply the transform not to the entire circle, but simply to this point, saving us some computations. This also means that if we chose seed two points \\(P\\) and \\(Q\\) that are initially in the same tile, then their image by the word \\(W\\) will be very close. Sadly, this means that we need to chose initial points which are in a tile mapped by a word,

## What's Depth First Search anyway ?
We've established that we're searching along a tree. Depth First means that we first want to go _deep_ rather than _wide_. We'll take a branch, go as deep as we need, usually until we hit an exit condition be it a maximum depth level or something else, then come back one level, chose the next branch and repeat. Once we have explored all branches of a certain node, we go back one level, chose the next branch and again we go. 

Here, we always chose the next branch using the same criterion. We'll call it "turning right", even though we aren't on a road. 
## Cyclic Permutations
The order in which we chose our branch to explore matters. 

## Endpoints Conditions
So we know _what_ branch to take when exploring. How do we know _when_ to stop ? The first thing that could come to mind is simply stop using a maximum depth level. Once we have reached this depth, immediatly come one level up and start again. But we could use another trick. We could stop once the image of a few fixed points are close enough together, let's say under an \\(\vareps\\). 

## Faster, faster !
Now this is all fine and dandy, but we're quite slow. Is there anything we could optimise ? The obvious idea would be to parallelize this affair. Turns out it's _fairly_ easy to do. Since we explore branches of the tree, and that this exploration is entirely independant from one another, we can simply 

