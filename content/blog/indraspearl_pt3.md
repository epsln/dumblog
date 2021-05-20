---
title: "Indras Pearl III : Searching for a place to stop"
date: 2021-05-04T00:23:07+02:00
draft: true
---

In the past article we've seen an overview of what kind of objects we were talking about, and how to create generators that would be interesting to explore. In this part, we'll talk about the bread and butter of Indra's Pearl, namely the Depth First Exploration Algorithm, or DFS. For the sake of simplicity, i'll refer to the inverse of a generator using the uppercase version of it's associated letter, so the inverse of a is A, and the inverse of b is B. 

Remind yourself about what exactly we are doing here. We have 2 generators (a and b), which are Mobius Transforms which you can just think of them as 2x2 matrices with complex elements and determinant 1, along with their inverses (A and B, respectively). In total we have 4 "actions", and we'd like to see all the possibilities, or words that can be creating by arranging those generators. For now, the only rule we'll have is that we cannot combine a word with a generator who is the inverse of the last character of the word. For example, aaaaaB is a valid word, but babbAa is not since a is the inverse of A. 

You can think of this as the exploration of a tree. The root of this tree is the identity matrix. Then, we have four branches, since we have four actions (a, b, A, B). From then on, each node on the tree only have 3 branches, since we can't use the inverse of an action. 

So why the DFS you ask ? Exploring Breadth First seems simple and adequate, why should we waste our time on this ? Well, because we'd like to plot some _limit sets_. Using the BFS means that we'd waste a lot of time exploring all the branches before diving into a deeper level and that we cannot draw a continuous line between all the endpoints. During exploration, the order matter ! Moreover, BFS implies that we need to keep in memory all the matrices because they will all be needed to go to the next level. This implies an *exponential* memory cost, which is unacceptable.

## What's Depth First Search anyway ?
We've established that we're searching along a tree. Depth First means that we first want to go _deep_ rather than _wide_. We'll take a branch, go as deep as we need, usually until we hit an exit condition be it a maximum depth level or something else, then come back one level, chose the next branch and repeat. Once we have explored all branches of a certain node, we go back one level, chose the next branch and again we go. 

Here, we always chose the next branch using the same criterion. We'll call it "turning right", even though we aren't on a road. We need to chose carefully how we chose the next direction. If we want to draw a lines between close limit points, by for example joining the last explored point and the current, we need to make sure that the points we are exploring will stay close together.  

## Cyclic Permutations
The order in which we chose our branch to explore matters. 

## What are we plotting ?
With the BFS algorithm, what we essentially did was applying a Mobius transform on each of the 4 circles of the initial Shottky array. As it turns out, we don't need to do apply this transform to a specific circle. What we could do, is simply chose a seed point \\(P\\) in the initial Shottky circles, and apply the transform not to the entire circle, but simply to this point, saving us some computations. This also means that if we chose seed two points \\(P\\) and \\(Q\\) that are initially in the same tile, then their image by the word \\(W\\) will be very close. Sadly, this means that we need to chose initial points which are in a tile mapped by a word. Choosing random points to apply this transformation too is a bad idea since most of them won't be in those tiles, and in longer word the tiles shrink to nothing. After all we want to plot the _limit set_ of a particular group, i.e what happens when the initial Shottky circles are transformed by long words. With the BFS, we usually do this at each step, but this is fairly slow, and also require the position and radius of all initial circles, which might not be straightforward to obtain using more complicated recipes (or no recipes at all). So, we need a way to have points \\(P\\) which are always in the initial Shottky tiles.

The answer here is to take advantage of an equivalency between fixed points of generators and limit points. But we first need to know how to deal with those infinite words that we so desperately need to draw limit sets. I'm gonna paraphrase a bit here, so bear with me.

## Rules of da Game
There are a few rules that we'll take advantages when exploring longer and longer words. Ideally we'd like to explore infinitely long words, but I can't wait that long so we'll approximate them using those simple rules:

* Words that begin the same and stay the same for a long time have close limit points

* If \\(P\\) is a limit point, then \\(W(P)\\) is the infinite word made by fusing \\(W\\) in front of \\(P\\) and making the necessary cancellations 

* Infinite words with repetends correspond to fixed points of transformations in the group. For example if \\(W\\) and \\(V\\) are finite reduced words, we have:

	* If the first and last letter of \\(W\\) are not inverses of each other, then \\(\bar{W} = \text{Fix}^+ (W)\\) 

	* If the first and last letter of \\(W\\) are inverses of each other then \\( \text{Fix}^+ (W)\\) is the infinite reduced word made from \\(\hat{W}\\) by making all the necessary cancellations at the join

	* With the necessary cancelations done, \\(V\hat{W} = \text{Fix}^+ (VWV^-1) = V \text{Fix}^+ (W)\\)  = 


## Special words for special people
Alright, we're back in the game, and we know the rules. If we need to plot the point \\(P\\) associated to an infinite word \\(BBBaabAABB...\\), using the first rule we know that \\(P\\) will be close to any limit point whose word also begin with \\(BBBaabAABB...\\) like \\(BBBaabAABB\hat{a}\\). Using the third rule, we also know that \\(BBBaabAABB\hat{a} = BBBaabAABB \text{Fix}^+ (a)\\). And that's it !

Our algorithm will basically explore all reduced words of a maximum length which afterwards consist of simply a repetition of a single letter. Another way to put it is that we're looking at all the possible points which are \\(W(Fix^+ (a),  W(Fix^+ (b), W(Fix^+ (A), W(Fix^+ (B)\\). Chosing a higher maximum word length will let us draw much more points, increasing exponentially, and adding much more details. 

## Endpoints Conditions
So we know _what_ branch to take when exploring. How do we know _when_ to stop ? The first thing that could come to mind is simply stop using a maximum depth level. Once we have reached this depth, immediately come one level up and start again. But we could use another trick. We could stop once the image of a few fixed points are close enough together, let's say under an \\(\vareps\\). Using the BFS algorithm, we used to apply the obtained Mobius Transform onto a circle, and plot this. But we don't have those initial circles anymore, and this operation was fairly expensive. An easy fix to this is to simply draw a point only if the newly obtained point is at a distance smaller than an \\(vareps\\) of the old point. If yes, the newpoint becomes the old point and we start again. The first oldpoint should be the fixed point of the first generator used, so that we can start the show. Drawing a line in this context is trivial: simply connect the old point and the new point if their distance \\(< \vareps\\)

There is actually another way, slightly more complicated.

## Faster, faster !
Now this is all fine and dandy, but we're quite slow. Is there anything we could optimise ? The obvious idea would be to parallelize this affair. Turns out it's _fairly_ easy to do. Since we explore branches of the tree, and that this exploration is entirely independant from one another, we can simply 

