# SQLite Database Schema Documentation

This document outlines the database schema for the Leadership Dashboard application.

## Overview

The application uses SQLite for local storage of configuration data, metadata, and references to locally stored images. The database is initialized and managed by the `SQLiteService`.

## Tables

### 1. Dashboard Configuration (`dashboard_config`)

Stores configuration settings for the dashboard layout and appearance.

```sql
CREATE TABLE dashboard_config (
    id INTEGER PRIMARY KEY,
    dashboard_name TEXT NOT NULL,
    layout_config TEXT NOT NULL,  -- JSON string of layout configuration
    last_updated TIMESTAMP NOT NULL,
    created_by TEXT,
    is_active BOOLEAN DEFAULT 1
);
```

#### Fields:
- `id`: Unique identifier for the configuration
- `dashboard_name`: Name of the dashboard configuration
- `layout_config`: JSON string containing layout configuration (grid positions, sizes, etc.)
- `last_updated`: Timestamp of the last update to this configuration
- `created_by`: User who created this configuration
- `is_active`: Boolean indicating if this configuration is currently active

### 2. KPI Metadata (`kpi_metadata`)

Stores metadata about KPI widgets displayed on the dashboard.

```sql
CREATE TABLE kpi_metadata (
    id INTEGER PRIMARY KEY,
    kpi_name TEXT NOT NULL,
    display_name TEXT NOT NULL,
    description TEXT,
    icon_path TEXT,
    color_scheme TEXT,
    data_source TEXT NOT NULL,
    refresh_interval INTEGER DEFAULT 30000,
    dashboard_position TEXT  -- JSON string of position data
);
```

#### Fields:
- `id`: Unique identifier for the KPI
- `kpi_name`: Internal name/identifier for the KPI
- `display_name`: User-friendly name for display
- `description`: Description of what the KPI represents
- `icon_path`: Path to the icon file for this KPI
- `color_scheme`: Color scheme for the KPI (CSS color or theme reference)
- `data_source`: Reference to the data source for this KPI
- `refresh_interval`: How often to refresh the KPI data (in milliseconds)
- `dashboard_position`: JSON string with position information on the dashboard

### 3. Chart Configuration (`chart_config`)

Stores configuration for charts displayed on the dashboard.

```sql
CREATE TABLE chart_config (
    id INTEGER PRIMARY KEY,
    chart_name TEXT NOT NULL,
    chart_type TEXT NOT NULL,
    display_name TEXT NOT NULL,
    description TEXT,
    data_source TEXT NOT NULL,
    color_scheme TEXT,
    refresh_interval INTEGER DEFAULT 30000,
    dashboard_position TEXT,  -- JSON string of position data
    chart_options TEXT  -- JSON string of chart-specific options
);
```

#### Fields:
- `id`: Unique identifier for the chart
- `chart_name`: Internal name/identifier for the chart
- `chart_type`: Type of chart (line, bar, pie, etc.)
- `display_name`: User-friendly name for display
- `description`: Description of what the chart represents
- `data_source`: Reference to the data source for this chart
- `color_scheme`: Color scheme for the chart
- `refresh_interval`: How often to refresh the chart data (in milliseconds)
- `dashboard_position`: JSON string with position information on the dashboard
- `chart_options`: JSON string with chart-specific configuration options

### 4. Image Metadata (`image_metadata`)

Stores metadata about locally stored images used in the dashboard.

```sql
CREATE TABLE image_metadata (
    id INTEGER PRIMARY KEY,
    image_name TEXT NOT NULL,
    image_path TEXT NOT NULL,
    description TEXT,
    dimensions TEXT,  -- JSON string with width and height
    created_date TIMESTAMP NOT NULL,
    last_used TIMESTAMP,
    image_type TEXT,
    tags TEXT  -- Comma-separated tags for searching
);
```

#### Fields:
- `id`: Unique identifier for the image entry
- `image_name`: Name of the image file
- `image_path`: Local file system path to the image
- `description`: Description of the image
- `dimensions`: JSON string with width and height information
- `created_date`: When the image was added to the system
- `last_used`: When the image was last used in the dashboard
- `image_type`: Type of image (logo, background, icon, etc.)
- `tags`: Comma-separated list of tags for searching and categorization

## Indexes

For performance optimization, the following indexes are created:

```sql
-- Dashboard Config Indexes
CREATE INDEX idx_dashboard_config_name ON dashboard_config(dashboard_name);
CREATE INDEX idx_dashboard_config_active ON dashboard_config(is_active);

-- KPI Metadata Indexes
CREATE INDEX idx_kpi_metadata_name ON kpi_metadata(kpi_name);
CREATE INDEX idx_kpi_metadata_display ON kpi_metadata(display_name);

-- Chart Config Indexes
CREATE INDEX idx_chart_config_name ON chart_config(chart_name);
CREATE INDEX idx_chart_config_type ON chart_config(chart_type);

-- Image Metadata Indexes
CREATE INDEX idx_image_metadata_name ON image_metadata(image_name);
CREATE INDEX idx_image_metadata_type ON image_metadata(image_type);
```

## Relationships

While SQLite doesn't enforce foreign key relationships by default, the application logic maintains these relationships:

1. Each KPI in `kpi_metadata` may reference an image in `image_metadata` through its `icon_path`.
2. Dashboard configurations in `dashboard_config` reference KPIs and charts by their IDs in the `layout_config` JSON.

## Usage in Application

The application uses the `SQLiteService` to:

1. Initialize the database and create tables if they don't exist
2. Perform CRUD operations on configuration data
3. Store and retrieve image metadata
4. Manage dashboard layouts and configurations

The service provides methods for all necessary database operations and handles data serialization/deserialization to and from the database format.
