// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.

export const environment = {
  production: false,
  
  // API configuration
  apiUrl: 'http://localhost:3000/api',
  
  // Feature flags
  features: {
    enableAnimations: true,
    enableRealTimeUpdates: true,
    enableMockData: true,
    enableLocalStorage: true
  },
  
  // Dashboard configuration
  dashboard: {
    refreshInterval: 30000, // 30 seconds
    chartAnimationDuration: 500, // 0.5 seconds
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
