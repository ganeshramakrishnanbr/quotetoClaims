export interface PerformanceData {
  month: string;
  quotes: number;
  applications: number;
  policies: number;
}

export interface PerformanceChartConfig {
  title: string;
  showLegend: boolean;
  yAxisLabel: string;
  xAxisLabel: string;
  animations: boolean;
  colorScheme: {
    domain: string[]
  };
}
