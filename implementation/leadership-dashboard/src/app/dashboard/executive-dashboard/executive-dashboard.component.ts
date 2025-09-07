import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { MockDataService } from '../../core/services/mock-data.service';
import { AnimationService } from '../../core/services/animation.service';

@Component({
  selector: 'app-executive-dashboard',
  templateUrl: './executive-dashboard.component.html',
  styleUrls: ['./executive-dashboard.component.scss']
})
export class ExecutiveDashboardComponent implements OnInit, OnDestroy {
  // Data for KPIs
  kpiData: any[] = [];
  realTimeData: any;
  
  // Data for charts
  performanceData: any[] = [];
  productMixData: any[] = [];
  
  // Subscriptions
  private subscriptions: Subscription[] = [];
  
  // Loading state
  loading = true;
  
  // Chart options
  performanceChartOptions = {
    view: [700, 300],
    scheme: {
      domain: ['#3B82F6', '#10B981', '#F59E0B']
    },
    gradient: true,
    showXAxis: true,
    showYAxis: true,
    showLegend: true,
    showXAxisLabel: true,
    showYAxisLabel: true,
    xAxisLabel: 'Month',
    yAxisLabel: 'Count',
    timeline: false,
    autoScale: true,
    curve: 'cardinalCurve'
  };
  
  constructor(
    private mockDataService: MockDataService,
    private animationService: AnimationService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }
  
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
  
  /**
   * Load all data for the executive dashboard
   */
  loadData(): void {
    this.loading = true;
    
    // Get KPI data
    const kpiSub = this.mockDataService.getKPIData().subscribe(
      data => {
        this.kpiData = data;
      }
    );
    this.subscriptions.push(kpiSub);
    
    // Get real-time data
    const realTimeSub = this.mockDataService.getRealTimeData().subscribe(
      data => {
        this.realTimeData = data;
      }
    );
    this.subscriptions.push(realTimeSub);
    
    // Get performance data
    const perfSub = this.mockDataService.getPerformanceData().subscribe(
      data => {
        this.performanceData = data;
        this.transformPerformanceData();
        this.loading = false;
      }
    );
    this.subscriptions.push(perfSub);
    
    // Get product mix data
    const prodSub = this.mockDataService.getProductMixData().subscribe(
      data => {
        this.productMixData = data;
      }
    );
    this.subscriptions.push(prodSub);
  }
  
  /**
   * Transform performance data for chart display
   */
  transformPerformanceData(): void {
    // Transform data for multi-series chart
    this.performanceData = [
      {
        name: 'Quotes',
        series: this.performanceData.map(item => ({
          name: item.month,
          value: item.quotes
        }))
      },
      {
        name: 'Applications',
        series: this.performanceData.map(item => ({
          name: item.month,
          value: item.applications
        }))
      },
      {
        name: 'Policies',
        series: this.performanceData.map(item => ({
          name: item.month,
          value: item.policies
        }))
      }
    ];
  }
  
  /**
   * Format currency values
   */
  formatCurrency(value: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  }
  
  /**
   * Format percentage values
   */
  formatPercentage(value: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'percent',
      minimumFractionDigits: 1,
      maximumFractionDigits: 1
    }).format(value / 100);
  }
  
  /**
   * Format large numbers with K/M/B suffixes
   */
  formatLargeNumber(value: number): string {
    if (value >= 1000000000) {
      return (value / 1000000000).toFixed(1) + 'B';
    }
    if (value >= 1000000) {
      return (value / 1000000).toFixed(1) + 'M';
    }
    if (value >= 1000) {
      return (value / 1000).toFixed(1) + 'K';
    }
    return value.toString();
  }
}
