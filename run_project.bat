@echo off
title SmartInstitute CRM - 1-Click Startup
color 0B
cls

echo ======================================================================
echo          SMARTINSTITUTE CRM SUITE - 1-CLICK LAUNCHER
echo ======================================================================
echo.
echo [1/4] Checking Node.js environment...
node -v >nul 2>&1
if %errorlevel% neq 0 (
    color 0C
    echo [ERROR] Node.js is not installed or not in PATH!
    echo Please install Node.js from https://nodejs.org/ and try again.
    pause
    exit /b
)
echo       Node.js is detected!

cd /d "%~dp0"

echo.
echo [2/4] Checking dependencies...
if not exist "node_modules\" (
    echo       First run detected. Installing dependencies...
    call npm install
) else (
    echo       Dependencies are ready.
)

echo.
echo [3/4] Starting Backend Database Server (Port 5000)...
start "SmartInstitute Backend Server (Port 5000)" cmd /k "color 0A && echo Starting SmartInstitute Database API Server... && node server/server.js"

echo.
echo [4/4] Starting Frontend Web Application (Port 5173)...
start "SmartInstitute Frontend (Vite Port 5173)" cmd /k "color 09 && echo Starting Vite Dev Server... && npm run dev"

echo.
echo ======================================================================
echo  Servers are starting up!
echo  Opening browser at http://localhost:5173/ ...
echo ======================================================================
echo.

timeout /t 3 >nul
start http://localhost:5173/

echo.
echo  [DONE] Both Frontend and Backend are running.
echo  You can minimize this window. Close the opened server windows to stop.
echo.
timeout /t 5 >nul
exit
