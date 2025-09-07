#!/bin/bash
# Setup script for Leadership Dashboard
# This script will install all required dependencies and set up the initial project structure

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Node.js is not installed. Please install Node.js and npm before running this script."
    exit 1
fi

NODE_VERSION=$(node -v)
echo "Node.js version: $NODE_VERSION"

# Check if Angular CLI is installed
if ! command -v ng &> /dev/null; then
    echo "Angular CLI is not installed. Installing Angular CLI..."
    npm install -g @angular/cli
else
    echo "Angular CLI is already installed."
fi

# Check if the project directory exists
IMPLEMENTATION_DIR="./implementation/leadership-dashboard"
if [ ! -d "$IMPLEMENTATION_DIR" ]; then
    echo "Creating implementation directory structure..."
    mkdir -p "$IMPLEMENTATION_DIR"
fi

# Navigate to the implementation directory
cd "$IMPLEMENTATION_DIR"

# Install dependencies
echo "Installing project dependencies..."
npm install @angular/core@16 @angular/common@16 @angular/forms@16 @angular/platform-browser@16 @angular/platform-browser-dynamic@16 @angular/router@16 @angular/animations@16 --save
npm install @angular/material@16 @angular/cdk@16 @angular/flex-layout@16.0.0-beta.42 --save
npm install @swimlane/ngx-charts@20 d3@7 --save
npm install rxjs@7 tslib@2 zone.js@0.13 --save
npm install better-sqlite3@8 --save

# Install dev dependencies
npm install @types/node@18 @types/better-sqlite3@7 typescript@5 --save-dev

# Create core directories if they don't exist
DIRECTORIES=(
    "./src/app/core/services"
    "./src/app/core/models"
    "./src/app/shared/components/kpi-card"
    "./src/app/dashboard/dashboard-container"
    "./src/styles"
    "./src/assets/images"
)

for dir in "${DIRECTORIES[@]}"; do
    if [ ! -d "$dir" ]; then
        echo "Creating directory: $dir"
        mkdir -p "$dir"
    fi
done

echo "Project setup completed successfully!"
echo "You can now start the development server with 'npm start'"
