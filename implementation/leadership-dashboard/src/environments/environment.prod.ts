export const environment = {
  production: true,
  
  // API configuration
  apiUrl: '/api',
  
  // Feature flags
  features: {
    enableAnimations: true,
    enableRealTimeUpdates: true,
    enableMockData: true,
    enableLocalStorage: true
  },
  
  // Dashboard configuration
  dashboard: {
    refreshInterval: 60000, // 60 seconds in production
    chartAnimationDuration: 500,
    maxDataPoints: 50,
    defaultColorScheme: 'vivid'
  },
  
  // SQLite database configuration
  sqlite: {
    databaseName: 'leadership_dashboard.db',
    version: 1,
    tables: {
      dashboardConfig: 'dashboard_config',
      kpiMetadata: 'kpi_metadata',
      chartConfig: 'chart_config',
      imageMetadata: 'image_metadata'
    }
  },
  
  // Local storage keys
  localStorage: {
    themeKey: 'leadership-dashboard-theme',
    layoutKey: 'leadership-dashboard-layout',
    userPreferencesKey: 'leadership-dashboard-preferences'
  }
};
