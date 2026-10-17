@echo off
title SmartInstitute CRM - Stop Servers
color 0C
cls

echo ======================================================================
echo          SMARTINSTITUTE CRM SUITE - STOP SERVERS
echo ======================================================================
echo.
echo Stopping Node.js processes on Port 5000 and 5173...

for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":5000" ^| findstr "LISTENING"') do (
    taskkill /f /pid %%a >nul 2>&1
)

for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":5173" ^| findstr "LISTENING"') do (
    taskkill /f /pid %%a >nul 2>&1
)

echo.
echo [DONE] Both Backend and Frontend servers have been stopped.
echo.
pause
