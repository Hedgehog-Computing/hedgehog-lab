#!/bin/sh

docker run -v /tmp/.X11-unix:/tmp/.X11-unix --device /dev/dri -e DISPLAY=:0 hedgehog-lab