@echo off
REM Simple script to run Angular app on a different port

echo ================================================
echo   Running Leadership Dashboard on Port 4300
echo ================================================
echo.

REM Check if node_modules exists, otherwise run npm install
if not exist node_modules (
    echo Installing dependencies...
    call npm install
    if errorlevel 1 (
        echo Error installing dependencies
        pause
        exit /b 1
    )
)

echo.
echo Starting Angular application on port 4300...
echo.
echo Once started, open your browser and navigate to:
echo http://localhost:4300/
echo.

REM Use npx to ensure we're using the locally installed ng
call npx --no-install ng serve --port 4300 --host 0.0.0.0 --disable-host-check

if errorlevel 1 (
    echo.
    echo Failed to start the application on port 4300.
    echo.
    pause
)
