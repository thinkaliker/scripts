@echo off
title OBS Monstercat FM Helper
rem livestreamer
start livestreamer twitch.tv/monstercat audio
echo Livestreamer started with Monstercat FM
rem MCFMPython
cd ..\python\mcfmpython
start start.bat
echo MCFMPython started
exit