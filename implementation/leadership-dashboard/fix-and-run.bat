@echo off
REM Advanced Diagnosis and Fix Script for Angular App

echo ================================================
echo   Leadership Dashboard Diagnosis and Fix Script
echo ================================================
echo.
echo Running network diagnostics first...

REM Test basic network connectivity
echo Testing network connectivity...
ping 8.8.8.8 -n 3
if errorlevel 1 (
    echo WARNING: Network connectivity issues detected.
    echo This might affect npm's ability to download packages.
) else (
    echo Basic network connectivity: OK
)

REM Check if we need to use a proxy
echo Checking npm proxy settings...
call npm config get proxy
echo.

echo Checking npm registry...
call npm config get registry
echo.

echo Checking for node_modules/.bin
if not exist node_modules\.bin (
    echo node_modules/.bin not found - npm install may have failed
) else (
    echo node_modules/.bin exists
)

REM Check for lockfile
if exist package-lock.json (
    echo package-lock.json found
) else (
    echo package-lock.json not found - this might indicate installation problems
)

echo.
echo Starting comprehensive fix process:
echo.

echo 1. Cleaning up...
echo.

REM Remove problematic files
if exist node_modules (
    echo Removing node_modules folder...
    rmdir /s /q node_modules
    echo Done.
) else (
    echo No node_modules folder found.
)

if exist package-lock.json (
    echo Removing package-lock.json...
    del package-lock.json
    echo Done.
) else (
    echo No package-lock.json found.
)

echo.
echo 2. Setting npm configuration for better reliability...
call npm config set registry https://registry.npmjs.org/
call npm config set fetch-retries 5
call npm cache clean --force
echo Done.

echo.
echo 3. Installing dependencies with detailed logging...
echo This may take a few minutes...
call npm install --verbose

if errorlevel 1 (
    echo.
    echo ERROR: npm install failed.
    echo.
    echo Try the following manual steps:
    echo 1. Run 'npm cache clean --force'
    echo 2. Try using a different network connection
    echo 3. Temporarily disable firewall/antivirus
    pause
    exit /b 1
) else (
    echo npm install completed successfully.
)

echo.
echo 4. Verifying Angular CLI installation...
if not exist node_modules\@angular\cli (
    echo Angular CLI not found in node_modules, installing it separately...
    call npm install --save-dev @angular/cli --verbose
    
    if errorlevel 1 (
        echo.
        echo ERROR: Angular CLI installation failed.
        pause
        exit /b 1
    ) else (
        echo Angular CLI installed successfully.
    )
) else (
    echo Angular CLI found in node_modules.
)

echo.
echo 5. Attempting to run Angular application...
echo.
echo Using npx to run the local Angular CLI...
echo.
echo Starting development server at http://localhost:4200/
echo.

call npx --no-install ng serve --port 4200 --host 0.0.0.0 --disable-host-check

if errorlevel 1 (
    echo.
    echo ERROR: Failed to start Angular application.
    echo.
    echo Try running a simpler static server to test connectivity:
    echo http-server -p 8080
    pause
    exit /b 1
)
