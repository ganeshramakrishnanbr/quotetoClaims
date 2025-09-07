import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AnimationService } from './core/services/animation.service';
import { MockDataService } from './core/services/mock-data.service';

@Component({
  selector: 'app-root',
  template: `
    <div class="app-container" [class.presentation-mode]="presentationMode">
      <header class="app-header">
        <div class="logo">Claims to Quotes Leadership Dashboard</div>
        <div class="actions">
          <button class="refresh-btn" (click)="refreshDashboard()" title="Refresh Dashboard Data">
            <span class="material-icons">refresh</span> Refresh Data
          </button>
          <button class="presentation-mode-btn" (click)="togglePresentationMode()" [class.active]="presentationMode" title="Toggle Presentation Mode">
            <span class="material-icons">{{ presentationMode ? 'fullscreen_exit' : 'fullscreen' }}</span> 
            {{ presentationMode ? 'Exit Presentation' : 'Presentation Mode' }}
          </button>
        </div>
      </header>
      <main class="app-content">
        <router-outlet></router-outlet>
      </main>
      <div class="loading-indicator" *ngIf="isLoading">
        <div class="spinner"></div>
        <p>Loading dashboard data...</p>
      </div>
    </div>
  `,
  styles: [`
    .app-container {
      display: flex;
      flex-direction: column;
      height: 100vh;
      transition: all 0.3s ease;
    }
    
    .app-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 2rem;
      background-color: var(--primary-color-dark);
      color: var(--text-color-inverse);
      box-shadow: var(--shadow-2);
      z-index: 10;
      transition: all 0.3s ease;
    }
    
    .logo {
      font-size: 1.25rem;
      font-weight: bold;
    }
    
    .actions {
      display: flex;
      gap: 1rem;
    }
    
    button {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      border: none;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    button:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-1);
    }
    
    .material-icons {
      font-size: 18px;
    }
    
    .refresh-btn {
      background-color: var(--info-color);
      color: white;
    }
    
    .presentation-mode-btn {
      background-color: var(--accent-color);
      color: white;
    }
    
    .presentation-mode-btn.active {
      background-color: var(--accent-color-dark);
    }
    
    .app-content {
      flex: 1;
      overflow: auto;
      padding: 1rem;
      transition: all 0.3s ease;
    }
    
    .loading-indicator {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      z-index: 1000;
      color: white;
    }
    
    .spinner {
      width: 50px;
      height: 50px;
      border: 5px solid rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      border-top-color: white;
      animation: spin 1s ease-in-out infinite;
    }
    
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    
    /* Presentation mode styles */
    .presentation-mode .app-header {
      padding: 0.5rem 1rem;
      background-color: var(--primary-color-dark);
    }
    
    .presentation-mode .app-content {
      padding: 0;
    }
  `]
})
export class AppComponent implements OnInit {
  title = 'C2Q Leadership Dashboard';
  presentationMode = false;
  isLoading = false;
  
  constructor(
    private router: Router,
    private animationService: AnimationService,
    private mockDataService: MockDataService
  ) {}
  
  ngOnInit(): void {
    // Listen for router navigation events to trigger page transitions
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.animationService.triggerPageTransition();
    });
    
    // Check for presentation mode in localStorage
    const savedPresentationMode = localStorage.getItem('presentation-mode');
    if (savedPresentationMode === 'true') {
      this.presentationMode = true;
    }
  }
  
  /**
   * Toggle presentation mode for leadership meetings
   */
  togglePresentationMode(): void {
    this.presentationMode = !this.presentationMode;
    localStorage.setItem('presentation-mode', this.presentationMode.toString());
    
    // Trigger a special animation for entering/exiting presentation mode
    if (this.presentationMode) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    } else if (document.fullscreenElement) {
      document.exitFullscreen().catch(err => {
        console.error(`Error attempting to exit full-screen mode: ${err.message}`);
      });
    }
  }
  
  /**
   * Refresh all dashboard data
   */
  refreshDashboard(): void {
    this.isLoading = true;
    
    // Simulate refresh with timeout
    setTimeout(() => {
      // Refresh mock data
      this.mockDataService.refreshAllData();
      this.isLoading = false;
    }, 1500);
  }
}
