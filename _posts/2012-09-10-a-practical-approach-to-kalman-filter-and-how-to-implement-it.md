---
layout: post
title: "A practical approach to Kalman filter and how to implement it"
date: 2012-09-10 01:25:14
comments: false
description: "A practical approach to Kalman filter and how to implement it"
keywords: ""
category: project
blog_url: http://blog.tkjelectronics.dk/2012/09/a-practical-approach-to-kalman-filter-and-how-to-implement-it
---

I have for a long time been interrested in Kalman filers and how they work, I also used a Kalman filter for my [Balancing robot](/2012/03/the-balancing-robot/), but I never explained how it actually was implemented. Actually I had never taken the time to sit down with a pen and a piece of paper and try to do the math by myself, so I actually did not know how it was implemented. It turned out to be a good thing, as I actually discovered a mistake in the original code, but I will get back to that later. I actually wrote about the Kalman filter as my master assignment in high school back in December 2011. But I only used the Kalman filter to calculate the true voltage of a DC signal modulated by known Gaussian white noise. My assignment can be found in the following zip file: <http://www.tkjelectronics.dk/uploads/Kalman_SRP.zip>. It is in danish, but you can properly use google translate to translate some of it. If you got any specific questions regarding the assignment, then ask in the comments below. Okay, but back to the subject. As I sad I had never taken the time to sit down and do the math regarding the Kalman filter based on an accelerometer and a gyroscope. It was not as hard as I expected, but I must confess that I still have not studied the deeper theory behind, on why it actually works. But for me, and most people out there, I am more interrested in implementing the filter, than in the deeper theory behind and why the equations works.  Before we begin you must have some basic knowledge about matrices like multiplication of matrices and transposing of matrices. If not then please take a look at the following websites:

  * <http://en.wikipedia.org/wiki/Matrix_multiplication#Matrix_product_.28two_matrices.29>
  * <http://www.mathwarehouse.com/algebra/matrix/multiply-matrix.php>
  * <http://en.wikipedia.org/wiki/Transpose>
  * <http://en.wikipedia.org/wiki/Covariance_matrix>

For those of you who do not know what a Kalman filter is, it is an algorithm which uses a series of measurements observed over time, in this context an accelerometer and a gyroscope. These measurements will contain noise that will contribute to the error of the measurement. The Kalman filter will then try to estimate the state of the system, based on the current and previous states, that tend to be more precise that than the measurements alone. In this context the problem is that the accelerometer is in general very noise when it is used to measure the gravitational acceleration since the robot is moving back and forth. The problem with the gyro is that it drifts over time - just like a spinning wheel-gyro will start to fall down when it is losing speed. In short you can say that you can only trust the gyroscope on a short term while you can only trust the accelerometer on a long term. There is actually a very easy way to deal with this by using a complimentary filter, which basicly just consist of a digital low-pass filter on the accelerometer and digital high-pass filter on the gyroscope readings. But it is not as accurate as the Kalman filter, but other people have succesfully build balancing robots using a fine-tuned complimentary filter. More information about gyroscopes, accelerometer and complimentary filters can be found in this [pdf](http://web.mit.edu/scolton/www/filter.pdf). A comparison between a complimentary filter and a Kalman filter can be found in the following [blog post](http://robottini.altervista.org/kalman-filter-vs-complementary-filter). The Kalman filter operates by producing a statistically optimal estimate of the system state based upon the measurement(s). To do this it will need to know the noise of the input to the filter called the measurement noise, but also the noise of the system itself called the process noise. To do this the noise has to be [Gaussian distributed](http://en.wikipedia.org/wiki/Normal_distribution) and have a mean of zero, luckily for us most random noise have this characteristic. For more information about the theory behind the filter take a look at the following pages:

  * <http://en.wikipedia.org/wiki/Kalman_filter>
  * <http://www.cs.unc.edu/~welch/media/pdf/kalman_intro.pdf>
  * <http://academic.csuohio.edu/simond/courses/eec644/kalman.pdf>

**The system state $$\boldsymbol{x}_k$$**

The next of this article might seem very confusing for some, but I promise you if you grab a pen and a piece of paper and try to follow along it is not that hard if you are reasonable at math.

If you, like me, do not have a calculator or computer program that can work with matrices, then I recommend the free online calculator [Wolfram Alpha](http://www.wolframalpha.com/). I used it for all the calculations in this article.

I will use the same notation as the [wikipedia article](http://en.wikipedia.org/wiki/Kalman_filter), but I will like to note that when the matrixes are constants and does not depend on the current time you do not have to write the k after them. So for instance $F_k$ can be simplified to $F$.

Also I would like to write a small explanation of the other aspects of the notations. First I will make a note about whats called the _previous state_:

$$\boldsymbol{\hat{x}}_{k-1 | k-1}$$

Which is the previous estimated state based on the previous state and the estimates of the states before it. The next is the _a priori state_:

$$\boldsymbol{\hat{x}}_{k | k-1}$$

A priori means the estimate of the state matrix at the current time k based on the previous state of the system and the estimates of the states before it. The last one is called _a posteriori state_:

$$\boldsymbol{\hat{x}}_{k | k}$$

Is the estimated of the state at time k given observations up to and including at time k. The problem is that the system state itself is hidden and can only be observed through observation $z_k$. This is also called a [Hidden Markov model](http://en.wikipedia.org/wiki/Hidden_Markov_model). This means that the state will be based upon the state at time k and all the previous states. That also means that you can not trust the estimate of the state before the Kalman filter has stabilized - take a look at the graph at the front page of [my assignment](http://www.tkjelectronics.dk/uploads/Kalman_SRP.zip). The hat over the $\hat{x}$ means that is the estimate of the state. Unlike just a single $x$ which means the true state - the one we are trying to estimate. So the notation for the state at time k is:

$$\boldsymbol{x}_k$$

The state of the system at time k if given by:

$$\boldsymbol{x}_k = \boldsymbol{F}x_{k-1} + \boldsymbol{B}u_k + w_k$$

Where $x_k$ is the state matrix which is given by:

$$\boldsymbol{x}_k = \begin{bmatrix} \theta \\\ \dot{\theta}_b \end{bmatrix}_k$$

As you can see the output of the filter will be the angle $\theta$ but also the bias $\dot{\theta}_b$ based upon the measurements from the accelerometer and gyroscope. The bias is the amount the gyro has drifted. This means that one can get the true rate by subtracting the bias from the gyro measurement.
