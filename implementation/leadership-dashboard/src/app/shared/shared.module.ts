import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// Material Modules
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';

// NgxCharts Module
import { NgxChartsModule } from '@swimlane/ngx-charts';

// Shared Components
import { PerformanceChartComponent } from './components/performance-chart/performance-chart.component';
import { ProductMixChartComponent } from './components/product-mix-chart/product-mix-chart.component';
import { ClaimsStatusChartComponent } from './components/claims-status-chart/claims-status-chart.component';
import { CustomerSegmentationChartComponent } from './components/customer-segmentation-chart/customer-segmentation-chart.component';
import { RiskExposureChartComponent } from './components/risk-exposure-chart/risk-exposure-chart.component';

// Shared Directives
import { AnimationDirective } from './directives/animation.directive';
import { ResponsiveDirective } from './directives/responsive.directive';

@NgModule({
  declarations: [
    // Chart Components
    PerformanceChartComponent,
    ProductMixChartComponent,
    ClaimsStatusChartComponent,
    CustomerSegmentationChartComponent,
    RiskExposureChartComponent,
    
    // Directives
    AnimationDirective,
    ResponsiveDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatSelectModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTabsModule,
    NgxChartsModule
  ],
  exports: [
    // Common Modules
    CommonModule,
    ReactiveFormsModule,
    
    // Material Modules
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatSelectModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTabsModule,
    
    // NgxCharts Module
    NgxChartsModule,
    
    // Chart Components
    PerformanceChartComponent,
    ProductMixChartComponent,
    ClaimsStatusChartComponent,
    CustomerSegmentationChartComponent,
    RiskExposureChartComponent,
    
    // Directives
    AnimationDirective,
    ResponsiveDirective
  ]
})
export class SharedModule { }
