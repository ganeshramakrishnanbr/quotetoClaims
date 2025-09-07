import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardContainerComponent } from './dashboard-container/dashboard-container.component';
import { ExecutiveDashboardComponent } from './executive-dashboard/executive-dashboard.component';
import { SalesPerformanceComponent } from './sales-performance/sales-performance.component';
import { ClaimsProcessingComponent } from './claims-processing/claims-processing.component';
import { CustomerInsightsComponent } from './customer-insights/customer-insights.component';
import { RiskPortfolioComponent } from './risk-portfolio/risk-portfolio.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardContainerComponent,
    children: [
      {
        path: '',
        redirectTo: 'executive',
        pathMatch: 'full'
      },
      {
        path: 'executive',
        component: ExecutiveDashboardComponent
      },
      {
        path: 'sales',
        component: SalesPerformanceComponent
      },
      {
        path: 'claims',
        component: ClaimsProcessingComponent
      },
      {
        path: 'customers',
        component: CustomerInsightsComponent
      },
      {
        path: 'risk',
        component: RiskPortfolioComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
