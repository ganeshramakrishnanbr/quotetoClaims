import { Injectable } from '@angular/core';

// Note: In a real implementation, we would import and configure better-sqlite3
// But for demo purposes, we'll simulate the SQLite functionality
// const Database = require('better-sqlite3');

@Injectable({
  providedIn: 'root'
})
export class SqliteService {
  private db: any;

  constructor() {
    this.initializeDatabase();
  }

  private initializeDatabase() {
    console.log('Initializing SQLite database...');
    // In a real implementation:
    // this.db = new Database('leadership-dashboard.db');
    
    // For demo, simulate database initialization
    this.db = {
      prepare: (sql: string) => {
        console.log(`Preparing SQL: ${sql}`);
        return {
          run: (params?: any) => {
            console.log(`Running SQL with params:`, params);
            return { changes: 1 };
          },
          all: (params?: any) => {
            console.log(`Executing SQL with params:`, params);
            return this.getMockData(sql);
          },
          get: (params?: any) => {
            console.log(`Getting single row with params:`, params);
            const results = this.getMockData(sql);
            return results.length > 0 ? results[0] : null;
          }
        };
      },
      exec: (sql: string) => {
        console.log(`Executing SQL: ${sql}`);
        return true;
      }
    };
    
    this.createTables();
  }

  private createTables() {
    // Create Dashboard Configuration Table
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS dashboard_config (
        id INTEGER PRIMARY KEY,
        dashboard_name TEXT NOT NULL,
        layout_config TEXT NOT NULL,
        last_updated TIMESTAMP NOT NULL,
        created_by TEXT,
        is_active BOOLEAN DEFAULT 1
      )
    `);

    // Create KPI Metadata Table
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS kpi_metadata (
        id INTEGER PRIMARY KEY,
        kpi_name TEXT NOT NULL,
        display_name TEXT NOT NULL,
        description TEXT,
        icon_path TEXT,
        color_scheme TEXT,
        data_source TEXT NOT NULL,
        refresh_interval INTEGER DEFAULT 30000,
        dashboard_position TEXT
      )
    `);

    // Create Chart Configuration Table
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS chart_config (
        id INTEGER PRIMARY KEY,
        chart_name TEXT NOT NULL,
        chart_type TEXT NOT NULL,
        display_name TEXT NOT NULL,
        description TEXT,
        data_source TEXT NOT NULL,
        color_scheme TEXT,
        refresh_interval INTEGER DEFAULT 30000,
        dashboard_position TEXT,
        chart_options TEXT
      )
    `);

    // Create Image Metadata Table
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS image_metadata (
        id INTEGER PRIMARY KEY,
        image_name TEXT NOT NULL,
        image_path TEXT NOT NULL,
        description TEXT,
        dimensions TEXT,
        created_date TIMESTAMP NOT NULL,
        last_used TIMESTAMP,
        image_type TEXT,
        tags TEXT
      )
    `);
    
    // Create necessary indexes
    this.createIndexes();
    
    // Insert initial data if tables are empty
    this.insertInitialDataIfNeeded();
  }

  private createIndexes() {
    // Dashboard Config Indexes
    this.db.exec('CREATE INDEX IF NOT EXISTS idx_dashboard_config_name ON dashboard_config(dashboard_name)');
    this.db.exec('CREATE INDEX IF NOT EXISTS idx_dashboard_config_active ON dashboard_config(is_active)');

    // KPI Metadata Indexes
    this.db.exec('CREATE INDEX IF NOT EXISTS idx_kpi_metadata_name ON kpi_metadata(kpi_name)');
    this.db.exec('CREATE INDEX IF NOT EXISTS idx_kpi_metadata_display ON kpi_metadata(display_name)');

    // Chart Config Indexes
    this.db.exec('CREATE INDEX IF NOT EXISTS idx_chart_config_name ON chart_config(chart_name)');
    this.db.exec('CREATE INDEX IF NOT EXISTS idx_chart_config_type ON chart_config(chart_type)');

    // Image Metadata Indexes
    this.db.exec('CREATE INDEX IF NOT EXISTS idx_image_metadata_name ON image_metadata(image_name)');
    this.db.exec('CREATE INDEX IF NOT EXISTS idx_image_metadata_type ON image_metadata(image_type)');
  }

  private insertInitialDataIfNeeded() {
    // Check if dashboard_config table is empty
    const dashboardCount = this.getSingle('SELECT COUNT(*) as count FROM dashboard_config');
    if (dashboardCount && dashboardCount.count === 0) {
      this.insertInitialData();
    }
  }

  private insertInitialData() {
    // Insert default dashboard configuration
    const dashboardStmt = this.db.prepare(`
      INSERT INTO dashboard_config (dashboard_name, layout_config, last_updated, created_by, is_active)
      VALUES (?, ?, ?, ?, ?)
    `);
    
    dashboardStmt.run('Default Dashboard', JSON.stringify({
      "layout": "grid", 
      "columns": 4, 
      "rows": 3, 
      "widgets": [
        {"id": 1, "type": "kpi", "x": 0, "y": 0, "width": 1, "height": 1},
        {"id": 2, "type": "kpi", "x": 1, "y": 0, "width": 1, "height": 1},
        {"id": 3, "type": "kpi", "x": 2, "y": 0, "width": 1, "height": 1},
        {"id": 4, "type": "kpi", "x": 3, "y": 0, "width": 1, "height": 1},
        {"id": 1, "type": "chart", "x": 0, "y": 1, "width": 2, "height": 1},
        {"id": 2, "type": "chart", "x": 2, "y": 1, "width": 2, "height": 1},
        {"id": 3, "type": "chart", "x": 0, "y": 2, "width": 4, "height": 1}
      ]
    }), new Date().toISOString(), 'System', true);
    
    // Insert sample KPI metadata
    const kpiStmt = this.db.prepare(`
      INSERT INTO kpi_metadata (kpi_name, display_name, description, icon_path, color_scheme, data_source, refresh_interval, dashboard_position)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    const kpis = [
      ['total_quotes', 'Total Quotes', 'Total number of quotes generated', 'assets/images/icons/quotes.png', 'sales', 'mockData.getTotalQuotes()', 30000, JSON.stringify({"x": 0, "y": 0, "width": 1, "height": 1})],
      ['conversion_rate', 'Conversion Rate', 'Percentage of quotes converted to claims', 'assets/images/icons/conversion.png', 'performance', 'mockData.getConversionRate()', 30000, JSON.stringify({"x": 1, "y": 0, "width": 1, "height": 1})],
      ['avg_claim_value', 'Avg. Claim Value', 'Average monetary value of claims', 'assets/images/icons/value.png', 'claims', 'mockData.getAverageClaimValue()', 30000, JSON.stringify({"x": 2, "y": 0, "width": 1, "height": 1})],
      ['risk_index', 'Risk Index', 'Overall risk assessment index', 'assets/images/icons/risk.png', 'risk', 'mockData.getRiskIndex()', 30000, JSON.stringify({"x": 3, "y": 0, "width": 1, "height": 1})]
    ];
    
    kpis.forEach(kpi => {
      kpiStmt.run(...kpi);
    });

    // Insert sample chart configurations
    const chartStmt = this.db.prepare(`
      INSERT INTO chart_config (chart_name, chart_type, display_name, description, data_source, color_scheme, refresh_interval, dashboard_position, chart_options)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    const charts = [
      ['performance_trend', 'line', 'Performance Trend', 'Performance metrics over time', 'mockData.getPerformanceData()', 'vivid', 60000, 
       JSON.stringify({"x": 0, "y": 1, "width": 2, "height": 1}), 
       JSON.stringify({"showXAxis": true, "showYAxis": true, "gradient": true, "showLegend": true, "autoScale": true, "timeline": true})],
      
      ['claims_distribution', 'pie', 'Claims Distribution', 'Distribution of claims by category', 'mockData.getClaimsDistribution()', 'natural', 60000, 
       JSON.stringify({"x": 2, "y": 1, "width": 2, "height": 1}), 
       JSON.stringify({"doughnut": true, "explodeSlices": false, "showLabels": true, "arcWidth": 0.5})],
      
      ['product_mix', 'bar', 'Product Mix', 'Distribution of products in portfolio', 'mockData.getProductMix()', 'cool', 60000, 
       JSON.stringify({"x": 0, "y": 2, "width": 4, "height": 1}), 
       JSON.stringify({"showXAxis": true, "showYAxis": true, "gradient": false, "showDataLabel": true, "barPadding": 8, "roundDomains": true})]
    ];
    
    charts.forEach(chart => {
      chartStmt.run(...chart);
    });

    // Insert sample image metadata
    const imageStmt = this.db.prepare(`
      INSERT INTO image_metadata (image_name, image_path, description, dimensions, created_date, image_type, tags)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    
    const images = [
      ['quotes.png', 'assets/images/icons/quotes.png', 'Quotes icon', JSON.stringify({"width": 64, "height": 64}), new Date().toISOString(), 'icon', 'icon,quotes,sales'],
      ['conversion.png', 'assets/images/icons/conversion.png', 'Conversion rate icon', JSON.stringify({"width": 64, "height": 64}), new Date().toISOString(), 'icon', 'icon,conversion,performance'],
      ['value.png', 'assets/images/icons/value.png', 'Value icon', JSON.stringify({"width": 64, "height": 64}), new Date().toISOString(), 'icon', 'icon,value,money,claims'],
      ['risk.png', 'assets/images/icons/risk.png', 'Risk icon', JSON.stringify({"width": 64, "height": 64}), new Date().toISOString(), 'icon', 'icon,risk,warning'],
      ['dashboard_background.jpg', 'assets/images/backgrounds/dashboard.jpg', 'Dashboard background image', JSON.stringify({"width": 1920, "height": 1080}), new Date().toISOString(), 'background', 'background,dashboard,layout']
    ];
    
    images.forEach(image => {
      imageStmt.run(...image);
    });
  }

  // Method to get mock data for simulating queries
  private getMockData(sql: string): any[] {
    if (sql.includes('dashboard_config')) {
      return [{
        id: 1,
        dashboard_name: 'Executive Dashboard',
        layout_config: JSON.stringify({
          layout: 'grid',
          columns: 3,
          rows: 2
        }),
        last_updated: new Date().toISOString(),
        created_by: 'System',
        is_active: true
      }];
    } else if (sql.includes('kpi_metadata')) {
      return [
        {
          id: 1,
          kpi_name: 'total_revenue',
          display_name: 'Total Revenue',
          description: 'Total premium revenue from all policies',
          icon_path: 'dollar-sign',
          color_scheme: 'green',
          data_source: 'financial_data',
          refresh_interval: 300
        },
        {
          id: 2,
          kpi_name: 'active_customers',
          display_name: 'Active Customers',
          description: 'Number of customers with active policies',
          icon_path: 'users',
          color_scheme: 'blue',
          data_source: 'customer_data',
          refresh_interval: 300
        }
      ];
    }
    
    return [];
  }

  // Public methods for database operations
  public query(sql: string, params: any = {}): any[] {
    const stmt = this.db.prepare(sql);
    return stmt.all(params);
  }

  public getSingle(sql: string, params: any = {}): any {
    const stmt = this.db.prepare(sql);
    return stmt.get(params);
  }

  public run(sql: string, params: any = {}): any {
    const stmt = this.db.prepare(sql);
    return stmt.run(params);
  }

  // Specific methods for dashboard operations
  public getDashboardConfig(): any {
    return this.getSingle('SELECT * FROM dashboard_config WHERE is_active = 1');
  }

  public getKPIMetadata(): any[] {
    return this.query('SELECT * FROM kpi_metadata');
  }

  public getChartConfigs(): any[] {
    return this.query('SELECT * FROM chart_config');
  }

  public getImageMetadata(imageType?: string): any[] {
    let sql = 'SELECT * FROM image_metadata';
    if (imageType) {
      sql += ' WHERE image_type = ?';
      return this.query(sql, [imageType]);
    }
    return this.query(sql);
  }
}
