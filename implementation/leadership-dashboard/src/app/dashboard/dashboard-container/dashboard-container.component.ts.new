import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { MockDataService } from '../../services/mock-data.service';
import { AnimationService } from '../../services/animation.service';

@Component({
  selector: 'app-dashboard-container',
  templateUrl: './dashboard-container.component.html',
  styleUrls: ['./dashboard-container.component.scss'],
  animations: [AnimationService.pageTransition]
})
export class DashboardContainerComponent implements OnInit, OnDestroy {
  // UI state
  presentationMode = false;
  loading = false;
  
  // For cleanup
  private destroy$ = new Subject<void>();
  
  constructor(
    private mockDataService: MockDataService,
    private router: Router,
    private animationService: AnimationService
  ) { }

  ngOnInit(): void {
    // Initial data load
    this.refreshData();
  }
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  
  /**
   * Refresh all data across the dashboards
   */
  refreshData(): void {
    this.loading = true;
    this.mockDataService.refreshAllData()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.loading = false;
      });
  }
  
  /**
   * Export the data as CSV
   */
  exportData(): void {
    console.log('Exporting data...');
    // Implementation for data export would go here
  }
  
  /**
   * Toggle presentation mode
   */
  togglePresentationMode(): void {
    this.presentationMode = !this.presentationMode;
  }
  
  /**
   * Handle tab change events
   */
  onTabChange(event: MatTabChangeEvent): void {
    // Map tab index to routes
    const routes = [
      '/dashboard/executive',
      '/dashboard/sales',
      '/dashboard/claims',
      '/dashboard/customers',
      '/dashboard/risk'
    ];
    
    if (event.index >= 0 && event.index < routes.length) {
      this.router.navigateByUrl(routes[event.index]);
    }
  }
}
