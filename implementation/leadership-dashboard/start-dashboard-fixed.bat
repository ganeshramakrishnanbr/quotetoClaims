@echo off
REM Fixed Quick Start Script for Leadership Dashboard

echo Starting Leadership Dashboard in development mode with debugging...
echo.
echo This will:
echo 1. Install dependencies (if needed)
echo 2. Install Angular CLI locally (if needed)
echo 3. Start the Angular development server with full logging
echo.
echo Press Ctrl+C to stop the server when done.
echo.

REM Check if node_modules exists
if not exist node_modules (
    echo Node modules not found. Installing dependencies...
    call npm install
    
    if errorlevel 1 (
        echo Error installing dependencies. Please check the error message above.
        pause
        exit /b 1
    )
) else (
    echo Dependencies already installed.
)

REM Ensure Angular CLI is installed locally
if not exist node_modules\.bin\ng.cmd (
    echo Angular CLI not found. Installing...
    call npm install --save-dev @angular/cli
    
    if errorlevel 1 (
        echo Error installing Angular CLI. Please check the error message above.
        pause
        exit /b 1
    )
)

echo.
echo Starting development server with verbose logging...
echo.
echo Once started, open your browser and navigate to:
echo http://localhost:4200/
echo.

REM Start the Angular development server using the local installation with full logging
echo Using local Angular CLI from node_modules...
call npx --no-install ng serve --verbose --configuration=development

if errorlevel 1 (
    echo Error starting the Angular development server. Please check the error message above.
    pause
    exit /b 1
)
