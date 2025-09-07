export interface KPI {
  id?: number;
  title: string;
  value: string;
  change: string;
  icon: string;
  color: string;
  description?: string;
  trend?: 'up' | 'down' | 'neutral';
}

export interface KPIMetadata {
  id?: number;
  kpi_name: string;
  display_name: string;
  description: string;
  icon_path: string;
  color_scheme: string;
  data_source: string;
  refresh_interval: number;
}
