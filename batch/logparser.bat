@echo off
setlocal enabledelayedexpansion

:: change this source line to match whatever DIRECTORY your chat logs are stored in
set source=C:\Users\Adam\AppData\Roaming\.purple\logs\irc\thinkaliker@irc.twitch.tv\#thinkaliker.chat

:: change this destination line to match wherever you want the output text file to be
set dest=D:\nowplaying.txt

set cpy=%temp%\lp_cpy.txt
set trim=%temp%\lp_trim.txt
set mcat=%temp%\lp_mcat.txt
set line=%temp%\lp_line.txt
set sa=%temp%\lp_sa.txt

title Monstercat FM Twitch IRC Pidgin Log Parser for OBS
echo Parser has begun.
echo Artist and song will be listed below everytime the log is checked.
echo ------------------------------------------------------------------

:start

for /f "tokens=*" %%G in ('dir *.txt /b /a-d /od %source% 2^> NUL') do (
	set newest=%%G
)

copy /V /Y %source%\%newest% %cpy% > NUL

set LINES=0
for /f "delims==" %%I in (%cpy%) do (
    set /a LINES=LINES+1
)
set /a LINES=LINES-20

break>%trim%
break>%mcat%
break>%line%

more +%LINES% %cpy% > %trim%
findstr "monstercat: Now Playing:" %trim% > %mcat%

set LINES=0
for /f "delims==" %%I in (%mcat%) do (
    set /a LINES=LINES+1
)
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