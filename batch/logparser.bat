@echo off
setlocal enabledelayedexpansion

title Monstercat FM Twitch IRC Log Parser for OBS
echo Tool created by thinkaliker.
echo Your currently playing song text file will be located at: %dest%
echo Artist and song will be listed below everytime the log is checked.

set /p username="Enter channel username (Pidgin config only, press enter otherwise): "
set /p dest="Enter text file output location (eg. D:\nowplaying.txt ): "

:: change this source line to match whatever DIRECTORY your chat logs are stored in - please make sure this is correct for your system
::
set source=%AppData%\.purple\logs\irc\%username%@irc.twitch.tv\#%username%.chat
::

::use the line below if you are using hexchat - just uncomment out the line below and comment out the line above
:: 
::set source=%AppData%\HexChat\logs\twitch
::
::make sure that you set the twitch server room to NOT log and DELETE twitch.log

::TODO prompt for hexchat or Pidgin configuration

echo Press (Ctrl+C) to exit, or close the window.
echo ------------------------------------------------------------------

set cpy=%temp%\lp_cpy.txt
set mcat=%temp%\lp_mcat.txt
set line=%temp%\lp_line.txt
set sa=%temp%\lp_sa.txt

:start

::TODO change file get logic based on pidgin or hexchat choice

for /f "tokens=*" %%G in ('dir *.txt /b /a-d /od %source% 2^> NUL') do (
	set newest=%%G
)

copy /V /Y %source%\%newest% %cpy% > NUL

break>%mcat%
break>%line%

findstr ".*monstercat.*.*Now Playing:.*" %cpy% > %mcat%

for /f %%C in ('find /V /C "" ^< %mcat%') do set LINES=%%C

set /a LINES=LINES-1

more +%LINES% %mcat% > %line%

:: this is where the formatting happens
:: you will need to know a little bit of regex, but if you want to make changes to what your text looks like you don't
:: the part of the line below containing "$2 // $1" is how your final output text is going to look
:: $1 is the song name
:: $2 is the artist name
:: simply rearrange to change the order and formatting you desire
type %line% | jrepl ".*Playing: (.*) by (.*) -.*" "$2 // $1" /O %sa%
:: replace the above^ %sa% with %dest% and delete the second two lines if you DO NOT want all caps
set /p string= < %sa%
upper "%string%" | jrepl "\q(.*)\q" "$1" /B /X > %dest%

:: this just shows you what the string you're putting into the OBS text file looks like
type %dest%

:: adjust this time to be shorter or longer depending on how quickly you want to check for a new song in IRC
timeout /t 20 /nobreak > NUL

GOTO :start