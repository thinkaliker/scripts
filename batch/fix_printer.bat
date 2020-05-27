rem Fixes the print spooler by stopping print services and clearing out the print spooler.
rem Only use if printed document does not go away after print job completes.
rem Run as Administrator. If it fails, just follow the steps as is.

@echo off

rem Stop the print spooler service
net stop spooler

rem Wait 5 seconds
timeout 5

rem Kill the printfilterpipelinesvc.exe process (needed to clear out the spool directory)
taskkill /F /IM printfilterpipelinesvc.exe

rem Wait 1 second
timeout 1

rem Delete all files inside of the print spooler directory
del "C:\Windows\System32\spool\PRINTERS\*.*?"

rem Start the print spooler service
net start spooler