import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';

// Import NgxCharts
import { NgxChartsModule } from '@swimlane/ngx-charts';

// Dashboard Components
import { DashboardContainerComponent } from './dashboard-container/dashboard-container.component';
import { ExecutiveDashboardComponent } from './executive-dashboard/executive-dashboard.component';
import { SalesPerformanceComponent } from './sales-performance/sales-performance.component';
import { ClaimsProcessingComponent } from './claims-processing/claims-processing.component';
import { CustomerInsightsComponent } from './customer-insights/customer-insights.component';
import { RiskPortfolioComponent } from './risk-portfolio/risk-portfolio.component';

@NgModule({
  declarations: [
    DashboardContainerComponent,
    ExecutiveDashboardComponent,
    SalesPerformanceComponent,
    ClaimsProcessingComponent,
    CustomerInsightsComponent,
    RiskPortfolioComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    NgxChartsModule
  ],
  exports: [
    DashboardContainerComponent,
    ExecutiveDashboardComponent,
    SalesPerformanceComponent,
    ClaimsProcessingComponent,
    CustomerInsightsComponent,
    RiskPortfolioComponent
  ]
})
export class DashboardModule { }
