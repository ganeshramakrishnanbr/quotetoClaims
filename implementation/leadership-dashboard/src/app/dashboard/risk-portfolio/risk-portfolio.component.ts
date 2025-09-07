import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MockDataService } from '../../services/mock-data.service';
import { AnimationService } from '../../services/animation.service';

@Component({
  selector: 'app-risk-portfolio',
  templateUrl: './risk-portfolio.component.html',
  styleUrls: ['./risk-portfolio.component.scss'],
  animations: [AnimationService.pageTransition]
})
export class RiskPortfolioComponent implements OnInit, OnDestroy {
  // Chart data
  riskExposureData: any[] = [];
  lossRatioData: any[] = [];
  reserveAdequacyData: any[] = [];
  riskCategoryData: any[] = [];

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
    // Load risk exposure data
    this.subscriptions.add(
      this.mockDataService.getRiskExposureData().subscribe(data => {
        this.riskExposureData = data;
      })
    );

    // Load loss ratio data
    this.subscriptions.add(
      this.mockDataService.getLossRatioData().subscribe(data => {
        this.lossRatioData = data;
      })
    );

    // Load reserve adequacy data
    this.subscriptions.add(
      this.mockDataService.getReserveAdequacyData().subscribe(data => {
        this.reserveAdequacyData = data;
      })
    );

    // Load risk category data
    this.subscriptions.add(
      this.mockDataService.getRiskCategoryData().subscribe(data => {
        this.riskCategoryData = data;
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
