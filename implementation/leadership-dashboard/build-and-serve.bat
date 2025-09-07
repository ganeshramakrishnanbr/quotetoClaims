@echo off
REM Build and serve using http-server

echo ================================================
echo   Building and serving Leadership Dashboard
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
echo Building the Angular application...
echo This may take a few minutes...
echo.

REM Build the application using npx to ensure we use the local ng
call npx --no-install ng build

if errorlevel 1 (
    echo.
    echo Failed to build the application.
    pause
    exit /b 1
)

echo.
echo Application built successfully.
echo.
echo Starting http-server to serve the built application...
echo.
echo Once started, open your browser and navigate to:
echo http://localhost:8080/
echo.
echo Press Ctrl+C to stop the server when done.
echo.

REM Serve the built application using http-server
cd dist\leadership-dashboard
http-server -p 8080 --cors
