@echo off
rem Enables Hyper-V on non-Win 10 Pro and up
rem Run systeminfo command before running this file and verify that under Hyper-V Requirements:
rem 1) VM Monitor Mode Extensions: Yes
rem 2) Virtualization Enabled In Firmware: Yes
rem 3) Second Level Address Translation: Yes
rem 4) Data Execution Prevention Available: Yes
rem Once all of those say yes, run this file as Administrator
rem Original sources: https://pastebin.com/cX6nupy4 and https://github.com/MicrosoftDocs/Virtualization-Documentation/issues/915

pushd "%~dp0"
 
dir /b %SystemRoot%\servicing\Packages\*Hyper-V*.mum >hyper-v.txt
 
for /f %%i in ('findstr /i . hyper-v.txt 2^>nul') do dism /online /norestart /add-package:"%SystemRoot%\servicing\Packages\%%i"
 
del hyper-v.txt
 
Dism /online /enable-feature /featurename:Microsoft-Hyper-V-All /LimitAccess /ALL