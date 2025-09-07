# Setup script for Leadership Dashboard
# This script will install all required dependencies and set up the initial project structure

# Check if Node.js is installed
$nodeVersion = node -v
if ($LASTEXITCODE -ne 0) {
    Write-Host "Node.js is not installed. Please install Node.js and npm before running this script."
    exit 1
}

Write-Host "Node.js version: $nodeVersion"

# Check if Angular CLI is installed
$angularVersion = ng version
if ($LASTEXITCODE -ne 0) {
    Write-Host "Angular CLI is not installed. Installing Angular CLI..."
    npm install -g @angular/cli
} else {
    Write-Host "Angular CLI is already installed."
}

# Check if the project directory exists
$implementationDir = ".\implementation\leadership-dashboard"
if (-not (Test-Path $implementationDir)) {
    Write-Host "Creating implementation directory structure..."
    New-Item -ItemType Directory -Path $implementationDir -Force
}

# Navigate to the implementation directory
Set-Location $implementationDir

# Install dependencies
Write-Host "Installing project dependencies..."
npm install @angular/core@16 @angular/common@16 @angular/forms@16 @angular/platform-browser@16 @angular/platform-browser-dynamic@16 @angular/router@16 @angular/animations@16 --save
npm install @angular/material@16 @angular/cdk@16 @angular/flex-layout@16.0.0-beta.42 --save
npm install @swimlane/ngx-charts@20 d3@7 --save
npm install rxjs@7 tslib@2 zone.js@0.13 --save
npm install better-sqlite3@8 --save

# Install dev dependencies
npm install @types/node@18 @types/better-sqlite3@7 typescript@5 --save-dev

# Create core directories if they don't exist
$directories = @(
    ".\src\app\core\services",
    ".\src\app\core\models",
    ".\src\app\shared\components\kpi-card",
    ".\src\app\dashboard\dashboard-container",
    ".\src\styles",
    ".\src\assets\images"
)

foreach ($dir in $directories) {
    if (-not (Test-Path $dir)) {
        Write-Host "Creating directory: $dir"
        New-Item -ItemType Directory -Path $dir -Force
    }
}

Write-Host "Project setup completed successfully!"
Write-Host "You can now start the development server with 'npm start'"
