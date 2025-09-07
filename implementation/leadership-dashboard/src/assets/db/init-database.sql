-- SQLite Database Initialization Script for Leadership Dashboard

-- Drop tables if they exist (for clean reinstall)
DROP TABLE IF EXISTS image_metadata;
DROP TABLE IF EXISTS chart_config;
DROP TABLE IF EXISTS kpi_metadata;
DROP TABLE IF EXISTS dashboard_config;

-- Create Dashboard Configuration table
CREATE TABLE dashboard_config (
    id INTEGER PRIMARY KEY,
    dashboard_name TEXT NOT NULL,
    layout_config TEXT NOT NULL,  -- JSON string of layout configuration
    last_updated TIMESTAMP NOT NULL,
    created_by TEXT,
    is_active BOOLEAN DEFAULT 1
);

-- Create KPI Metadata table
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

-- Create Chart Configuration table
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

-- Create Image Metadata table
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

-- Create indexes for better performance
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

-- Insert sample data

-- Default Dashboard Configuration
INSERT INTO dashboard_config (dashboard_name, layout_config, last_updated, created_by, is_active)
VALUES (
    'Default Dashboard',
    '{"layout": "grid", "columns": 4, "rows": 3, "widgets": [
        {"id": 1, "type": "kpi", "x": 0, "y": 0, "width": 1, "height": 1},
        {"id": 2, "type": "kpi", "x": 1, "y": 0, "width": 1, "height": 1},
        {"id": 3, "type": "kpi", "x": 2, "y": 0, "width": 1, "height": 1},
        {"id": 4, "type": "kpi", "x": 3, "y": 0, "width": 1, "height": 1},
        {"id": 1, "type": "chart", "x": 0, "y": 1, "width": 2, "height": 1},
        {"id": 2, "type": "chart", "x": 2, "y": 1, "width": 2, "height": 1},
        {"id": 3, "type": "chart", "x": 0, "y": 2, "width": 4, "height": 1}
    ]}',
    CURRENT_TIMESTAMP,
    'System',
    1
);

-- Sample KPI Metadata
INSERT INTO kpi_metadata (kpi_name, display_name, description, icon_path, color_scheme, data_source, refresh_interval, dashboard_position)
VALUES
    ('total_quotes', 'Total Quotes', 'Total number of quotes generated', 'assets/images/icons/quotes.png', 'sales', 'mockData.getTotalQuotes()', 30000, '{"x": 0, "y": 0, "width": 1, "height": 1}'),
    ('conversion_rate', 'Conversion Rate', 'Percentage of quotes converted to claims', 'assets/images/icons/conversion.png', 'performance', 'mockData.getConversionRate()', 30000, '{"x": 1, "y": 0, "width": 1, "height": 1}'),
    ('avg_claim_value', 'Avg. Claim Value', 'Average monetary value of claims', 'assets/images/icons/value.png', 'claims', 'mockData.getAverageClaimValue()', 30000, '{"x": 2, "y": 0, "width": 1, "height": 1}'),
    ('risk_index', 'Risk Index', 'Overall risk assessment index', 'assets/images/icons/risk.png', 'risk', 'mockData.getRiskIndex()', 30000, '{"x": 3, "y": 0, "width": 1, "height": 1}');

-- Sample Chart Configuration
INSERT INTO chart_config (chart_name, chart_type, display_name, description, data_source, color_scheme, refresh_interval, dashboard_position, chart_options)
VALUES
    ('performance_trend', 'line', 'Performance Trend', 'Performance metrics over time', 'mockData.getPerformanceData()', 'vivid', 60000, '{"x": 0, "y": 1, "width": 2, "height": 1}', '{"showXAxis": true, "showYAxis": true, "gradient": true, "showLegend": true, "autoScale": true, "timeline": true}'),
    ('claims_distribution', 'pie', 'Claims Distribution', 'Distribution of claims by category', 'mockData.getClaimsDistribution()', 'natural', 60000, '{"x": 2, "y": 1, "width": 2, "height": 1}', '{"doughnut": true, "explodeSlices": false, "showLabels": true, "arcWidth": 0.5}'),
    ('product_mix', 'bar', 'Product Mix', 'Distribution of products in portfolio', 'mockData.getProductMix()', 'cool', 60000, '{"x": 0, "y": 2, "width": 4, "height": 1}', '{"showXAxis": true, "showYAxis": true, "gradient": false, "showDataLabel": true, "barPadding": 8, "roundDomains": true}');

-- Sample Image Metadata
INSERT INTO image_metadata (image_name, image_path, description, dimensions, created_date, image_type, tags)
VALUES
    ('quotes.png', 'assets/images/icons/quotes.png', 'Quotes icon', '{"width": 64, "height": 64}', CURRENT_TIMESTAMP, 'icon', 'icon,quotes,sales'),
    ('conversion.png', 'assets/images/icons/conversion.png', 'Conversion rate icon', '{"width": 64, "height": 64}', CURRENT_TIMESTAMP, 'icon', 'icon,conversion,performance'),
    ('value.png', 'assets/images/icons/value.png', 'Value icon', '{"width": 64, "height": 64}', CURRENT_TIMESTAMP, 'icon', 'icon,value,money,claims'),
    ('risk.png', 'assets/images/icons/risk.png', 'Risk icon', '{"width": 64, "height": 64}', CURRENT_TIMESTAMP, 'icon', 'icon,risk,warning'),
    ('dashboard_background.jpg', 'assets/images/backgrounds/dashboard.jpg', 'Dashboard background image', '{"width": 1920, "height": 1080}', CURRENT_TIMESTAMP, 'background', 'background,dashboard,layout');
