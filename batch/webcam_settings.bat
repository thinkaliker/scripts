@echo off
rem ffmpeg.exe must be on PATH
rem Defaults to default webcam name if not provided on parameter

set "param1=%~1"
setlocal EnableDelayedExpansion
if "!param1!" == "" ( set "camera=HD USB CAMERA" ) else ( set "camera=!param1!" )

echo %camera%
ffmpeg.exe -f dshow -show_video_device_dialog true -i video="%camera%"