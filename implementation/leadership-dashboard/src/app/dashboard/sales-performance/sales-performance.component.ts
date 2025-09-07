import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MockDataService } from '../../services/mock-data.service';
import { AnimationService } from '../../services/animation.service';

@Component({
  selector: 'app-sales-performance',
  templateUrl: './sales-performance.component.html',
  styleUrls: ['./sales-performance.component.scss'],
  animations: [AnimationService.pageTransition]
})
export class SalesPerformanceComponent implements OnInit, OnDestroy {
  // Chart data
  salesTrendData: any[] = [];
  channelPerformanceData: any[] = [];
  productPerformanceData: any[] = [];
  regionalSalesData: any[] = [];

  // Chart options
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA', '#0066cc', '#9900cc']
  };
  
  // Chart dimensions
  view: [number, number] = [700, 400];
  
  // Subscriptions
  private subscriptions: Subscription = new Subscription();

  constructor(
    private mockDataService: MockDataService,
    private animationService: AnimationService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  loadData(): void {
    // Load sales trend data
    this.subscriptions.add(
      this.mockDataService.getSalesTrendData().subscribe(data => {
        this.salesTrendData = data;
      })
    );

    // Load channel performance data
    this.subscriptions.add(
      this.mockDataService.getChannelPerformanceData().subscribe(data => {
        this.channelPerformanceData = data;
      })
    );

    // Load product performance data
    this.subscriptions.add(
      this.mockDataService.getProductPerformanceData().subscribe(data => {
        this.productPerformanceData = data;
      })
    );

    // Load regional sales data
    this.subscriptions.add(
      this.mockDataService.getRegionalSalesData().subscribe(data => {
        this.regionalSalesData = data;
      })
    );
  }

  onRefresh(): void {
    this.loadData();
  }

  onSelect(event: any): void {
    console.log('Item clicked', event);
  }
}
