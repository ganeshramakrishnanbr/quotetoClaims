@echo off
REM Use globally installed Angular CLI

echo ================================================
echo   Serving Leadership Dashboard using global ng
echo ================================================
echo.

echo Starting Angular application on port 4500...
echo.
echo Once started, open your browser and navigate to:
echo http://localhost:4500/
echo.

REM Use the globally installed ng cli
ng serve --port 4500 --host 0.0.0.0 --disable-host-check

if errorlevel 1 (
    echo.
    echo Failed to start the application.
    echo.
    pause
)
