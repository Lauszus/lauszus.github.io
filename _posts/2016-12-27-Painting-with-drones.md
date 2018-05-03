---
layout: post
title: "Painting with drones"
date: 2016-12-27
comments: false
description: "Painting with drones"
keywords: ""
category: project
---

The purpose of this project was to come up with an interactive demonstration for the Pygmalion Festival 2016 at UIUC. The end result was a demo where an Android device was given to the visitors, each visitor could then draw any continuous path on the Android device. The x,y-coordinates would then be uploaded to the cloud and a trajectory based on Bézier curves would be generated using a Python script. Finally ROS was used to control a small drone. Camera software was then used to highlight the brightest light in the scene, in this case a LED on the drone. This resulted in the path being visualised in 3D-space.

Blog post: <https://blog.tkjelectronics.dk/2016/12/painting-with-drones>

Main Github: <https://github.com/HovakimyanResearch/crazyflie-demos>

Android app: <https://github.com/Lauszus/DroneDraw>

<img src="https://github.com/Lauszus/DroneDraw/raw/master/android_framed.png" height="400"/><img src="https://github.com/Lauszus/DroneDraw/raw/master/path.png" height="400"/>

<!-- Painting with drones -->
<div class="youtube" id="3WINNNvbyo4"></div>
