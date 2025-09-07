@echo off
REM Quick Start Script for Leadership Dashboard

echo Starting Leadership Dashboard in development mode...
echo.
echo This will:
echo 1. Install dependencies (if needed)
echo 2. Start the Angular development server
echo.
echo Press Ctrl+C to stop the server when done.
echo.

REM Check if node_modules exists
if not exist node_modules (
    echo Node modules not found. Installing dependencies...
    call npm install
) else (
    echo Dependencies already installed.
)

echo.
echo Starting development server...
echo.
echo Once started, open your browser and navigate to:
echo http://localhost:4200/
echo.

REM Start the Angular development server
call npm start
