# Development Guide

This document provides instructions for setting up and working with the Leadership Dashboard project.

## Prerequisites

1. Node.js and npm (latest LTS version recommended)
2. Angular CLI v16+
3. Visual Studio Code (recommended editor)

## Getting Started

### First-time Setup

1. Clone the repository if you haven't already:
   ```
   git clone https://github.com/ganeshramakrishnanbr/quotetoClaims.git
   cd QuotestoClaims/implementation/leadership-dashboard
   ```

2. Run the setup script to install dependencies:
   ```
   # On Windows
   .\setup.ps1
   
   # On macOS/Linux
   chmod +x setup.sh
   ./setup.sh
   ```

3. Or manually install dependencies:
   ```
   npm install
   ```

### Running the Development Server

1. Start the development server:
   ```
   npm start
   ```

2. Open your browser and navigate to:
   ```
   http://localhost:4200/
   ```

### Project Structure

- `src/app/core`: Core services and models
- `src/app/shared`: Reusable components and utilities
- `src/app/dashboard`: Dashboard-specific components
- `src/styles`: Global styles, variables, and animations

### Working with the SQLite Database

The SQLite database is implemented as a service that simulates database operations for development purposes. In a production environment, you would need to implement a proper backend for database operations.

### Mock Data Service

The application uses a mock data service to generate sample data for development and demonstration purposes. The service includes methods for generating different types of data needed for the dashboard visualizations.

### Adding New Components

To add a new component:

```bash
ng generate component path/to/component-name
```

Example:
```bash
ng generate component dashboard/performance-chart
```

### Building for Production

To build the application for production:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Recommended VS Code Extensions

- Angular Language Service
- ESLint
- Prettier
- Material Icon Theme
- SQLite Viewer (for working with SQLite databases)

## Additional Notes

- The application uses Angular Material for UI components
- NgxCharts is used for data visualization
- SCSS is used for styling with variables and nested rules
- Images are stored locally and metadata is managed through the SQLite service
