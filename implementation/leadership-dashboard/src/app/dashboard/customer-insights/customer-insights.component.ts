import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MockDataService } from '../../services/mock-data.service';
import { AnimationService } from '../../services/animation.service';

@Component({
  selector: 'app-customer-insights',
  templateUrl: './customer-insights.component.html',
  styleUrls: ['./customer-insights.component.scss'],
  animations: [AnimationService.pageTransition]
})
export class CustomerInsightsComponent implements OnInit, OnDestroy {
  // Chart data
  customerSatisfactionData: any[] = [];
  retentionRateData: any[] = [];
  customerDemographicsData: any[] = [];
  feedbackTrendsData: any[] = [];

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
    // Load customer satisfaction data
    this.subscriptions.add(
      this.mockDataService.getCustomerSatisfactionData().subscribe(data => {
        this.customerSatisfactionData = data;
      })
    );

    // Load retention rate data
    this.subscriptions.add(
      this.mockDataService.getRetentionRateData().subscribe(data => {
        this.retentionRateData = data;
      })
    );

    // Load customer demographics data
    this.subscriptions.add(
      this.mockDataService.getCustomerDemographicsData().subscribe(data => {
        this.customerDemographicsData = data;
      })
    );

    // Load feedback trends data
    this.subscriptions.add(
      this.mockDataService.getFeedbackTrendsData().subscribe(data => {
        this.feedbackTrendsData = data;
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
