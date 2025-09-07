# Claims to Quotes Leadership Dashboard

This project implements a visually compelling dashboard for senior leadership to monitor the Claims to Quotes system performance, following the specifications outlined in the feature plan.

## Features

- Executive dashboard with high-level KPIs and business metrics visualization
- Sales performance visualization showing real-time quote and conversion metrics
- Claims processing overview with visual representation of claims status and processing times
- Customer insights panel showing customer segmentation and behavior analytics
- Risk portfolio view with interactive risk exposure and underwriting visualization
- Local SQLite database for metadata storage
- Presentation mode for leadership meetings

## Technology Stack

- **Frontend Framework**: Angular 16+
- **UI Component Library**: Angular Material
- **Chart Library**: NgxCharts
- **Animations**: Angular animations
- **Styling**: SCSS with CSS variables for theming
- **Local Database**: SQLite for storing metadata and configuration
- **Asset Management**: Local storage for images and assets (no external upload)

## Getting Started

### Prerequisites

- Node.js (v14.x or higher)
- npm (v6.x or higher)
- Angular CLI (v16.x)

### Installation

1. Clone the repository
```bash
git clone https://github.com/ganeshramakrishnanbr/quotetoClaims.git
cd quotetoClaims/implementation/leadership-dashboard
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm start
```

4. Navigate to `http://localhost:4200/` in your browser

### Building for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Project Structure

```
src/
├── app/
│   ├── core/
│   │   ├── services/
│   │   │   ├── mock-data.service.ts
│   │   │   ├── sqlite.service.ts
│   │   │   ├── image-storage.service.ts
│   │   │   └── animation.service.ts
│   │   └── models/
│   │       ├── kpi.model.ts
│   │       ├── performance-data.model.ts
│   │       └── claims-data.model.ts
│   ├── dashboard/
│   │   ├── dashboard-container/
│   │   └── ...
│   ├── shared/
│   │   ├── components/
│   │   │   ├── kpi-card/
│   │   │   └── ...
│   │   └── ...
│   ├── app.module.ts
│   └── ...
└── assets/
    ├── images/
    └── ...
```

## Database Schema

The application uses SQLite for local metadata storage with the following schema:

### Dashboard Configuration
```sql
CREATE TABLE dashboard_config (
    id INTEGER PRIMARY KEY,
    dashboard_name TEXT,
    layout_config TEXT,
    last_updated TIMESTAMP,
    created_by TEXT,
    is_active BOOLEAN
);
```

### KPI Metadata
```sql
CREATE TABLE kpi_metadata (
    id INTEGER PRIMARY KEY,
    kpi_name TEXT,
    display_name TEXT,
    description TEXT,
    icon_path TEXT,
    color_scheme TEXT,
    data_source TEXT,
    refresh_interval INTEGER
);
```

### Chart Configuration
```sql
CREATE TABLE chart_config (
    id INTEGER PRIMARY KEY,
    chart_name TEXT,
    chart_type TEXT,
    display_name TEXT,
    description TEXT,
    data_source TEXT,
    color_scheme TEXT,
    refresh_interval INTEGER,
    dashboard_position TEXT
);
```

### Image Metadata
```sql
CREATE TABLE image_metadata (
    id INTEGER PRIMARY KEY,
    image_name TEXT,
    image_path TEXT,
    description TEXT,
    dimensions TEXT,
    created_date TIMESTAMP,
    last_used TIMESTAMP,
    image_type TEXT
);
```

## Additional Notes

- Images are not uploaded anywhere; metadata is stored in the local SQLite database
- Mock data is generated for demonstration purposes
- The dashboard includes a presentation mode optimized for leadership meetings

## License

[MIT License](LICENSE)
