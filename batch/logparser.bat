@echo off
setlocal enabledelayedexpansion
set source=C:\Users\Adam\AppData\Roaming\.purple\logs\irc\thinkaliker@irc.twitch.tv\#thinkaliker.chat
set dest=D:\nowplaying.txt
set cpy=%temp%\lp_cpy.txt
set trim=%temp%\lp_trim.txt
set mcat=%temp%\lp_mcat.txt
set line=%temp%\lp_line.txt
set sa=%temp%\lp_sa.txt

:start

for /f "tokens=*" %%G in ('dir *.txt /b /a-d /od %source% 2^> NUL') do (
	set newest=%%G
)

copy /V /Y %source%\%newest% %cpy% > NUL

SET file=%cpy%

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

type %line% | jrepl ".*Playing: (.*) by (.*) -.*" "$2 // $1" /O %sa%
set /p string= < %sa%
upper "%string%" | jrepl "\q(.*)\q" "$1" /B /X > %dest%
type %dest%

timeout /t 20 /nobreak > NUL

GOTO :start