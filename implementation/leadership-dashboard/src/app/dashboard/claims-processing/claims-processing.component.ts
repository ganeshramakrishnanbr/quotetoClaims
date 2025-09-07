import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MockDataService } from '../../services/mock-data.service';
import { AnimationService } from '../../services/animation.service';

@Component({
  selector: 'app-claims-processing',
  templateUrl: './claims-processing.component.html',
  styleUrls: ['./claims-processing.component.scss'],
  animations: [AnimationService.pageTransition]
})
export class ClaimsProcessingComponent implements OnInit, OnDestroy {
  // Chart data
  claimsVolumeData: any[] = [];
  processingTimeData: any[] = [];
  approvalRatesData: any[] = [];
  claimTypeDistributionData: any[] = [];

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
    // Load claims volume data
    this.subscriptions.add(
      this.mockDataService.getClaimsVolumeData().subscribe(data => {
        this.claimsVolumeData = data;
      })
    );

    // Load processing time data
    this.subscriptions.add(
      this.mockDataService.getProcessingTimeData().subscribe(data => {
        this.processingTimeData = data;
      })
    );

    // Load approval rates data
    this.subscriptions.add(
      this.mockDataService.getApprovalRatesData().subscribe(data => {
        this.approvalRatesData = data;
      })
    );

    // Load claim type distribution data
    this.subscriptions.add(
      this.mockDataService.getClaimTypeDistributionData().subscribe(data => {
        this.claimTypeDistributionData = data;
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
