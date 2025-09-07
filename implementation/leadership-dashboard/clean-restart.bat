@echo off
REM Cleanup and Restart Script for Leadership Dashboard

echo Cleaning and restarting Leadership Dashboard in development mode...
echo.
echo This will:
echo 1. Remove existing node_modules (if any)
echo 2. Remove package-lock.json (if any)
echo 3. Install dependencies clean
echo 4. Start the Angular development server
echo.
echo Press Ctrl+C to stop the server when done.
echo.

echo Cleaning up previous installation...
if exist node_modules (
    echo Removing node_modules folder...
    rmdir /s /q node_modules
)

if exist package-lock.json (
    echo Removing package-lock.json...
    del package-lock.json
)

echo.
echo Installing dependencies from scratch...
call npm install

if errorlevel 1 (
    echo Error installing dependencies. Please check the error message above.
    pause
    exit /b 1
)

echo.
echo Installing Angular CLI locally...
call npm install --save-dev @angular/cli

if errorlevel 1 (
    echo Error installing Angular CLI. Please check the error message above.
    pause
    exit /b 1
)

echo.
echo Starting development server...
echo.
echo Once started, open your browser and navigate to:
echo http://localhost:4200/
echo.

echo Running with npx...
call npx ng serve --open --verbose

if errorlevel 1 (
    echo Error starting the Angular development server. Please check the error message above.
    pause
    exit /b 1
)
