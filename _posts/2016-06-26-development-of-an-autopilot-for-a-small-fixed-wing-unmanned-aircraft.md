---
layout: post
title: "Development of an Autopilot for a Small Fixed-Wing Unmanned Aircraft"
date: 2016-06-26
comments: false
description: "Development of an Autopilot for a Small Fixed-Wing Unmanned Aircraft"
keywords: ""
category: project
---

The goal of this project was to develop the navigation and guidance system for an autopilot for a small fixed-wing unmanned aircraft. The navigation system, which is implemented as a Kalman filter, used the attitude and sensor measurements from accelerometer, GPS, airspeed sensor and barometer to estimate the position and velocity of the aircraft along with the wind speed. The guidance system was implemented as a Dubins path and vector fields which takes a set of waypoints and an estimate of the position and outputs set-points for the low level controllers on the airplane in order to make it follow the desired path. The full system was tested in simulation and the results where analysed. The final navigation and guidance systems was implemented in C and C++.

The report is available at the following [link]({{ "/assets/files/Development of an Autopilot for a Small Fixed-Wing Unmanned Aircraft.pdf" | prepend: site.baseurl }}).
