import { Component, Input, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { KPI } from '../../../core/models/kpi.model';
import { AnimationService } from '../../../core/services/animation.service';

@Component({
  selector: 'app-kpi-card',
  templateUrl: './kpi-card.component.html',
  styleUrls: ['./kpi-card.component.scss']
})
export class KpiCardComponent implements OnInit, AfterViewInit {
  @Input() kpi!: KPI;
  @Input() animate: boolean = true;
  
  private previousValue: string = '';
  
  constructor(
    private elementRef: ElementRef,
    private animationService: AnimationService
  ) { }

  ngOnInit(): void {
    // Store initial value for animation reference
    this.previousValue = this.kpi.value;
    
    // Determine trend direction from change string
    if (!this.kpi.trend) {
      if (this.kpi.change.startsWith('+')) {
        this.kpi.trend = 'up';
      } else if (this.kpi.change.startsWith('-')) {
        this.kpi.trend = 'down';
      } else {
        this.kpi.trend = 'neutral';
      }
    }
  }
  
  ngAfterViewInit(): void {
    if (this.animate) {
      // Apply initial animation to the card
      setTimeout(() => {
        this.animationService.fadeIn(this.elementRef.nativeElement, 500);
      }, 100);
    }
  }
  
  /**
   * Update KPI value with animation
   */
  updateValue(newValue: string): void {
    // Only animate if value has changed
    if (newValue !== this.previousValue) {
      this.previousValue = this.kpi.value;
      this.kpi.value = newValue;
      
      // Animate the value change
      if (this.animate) {
        const valueElement = this.elementRef.nativeElement.querySelector('.kpi-value');
        if (valueElement) {
          this.animationService.pulse(valueElement, 300);
        }
      }
    }
  }
  
  /**
   * Get appropriate color class based on trend
   */
  getTrendClass(): string {
    if (this.kpi.trend === 'up') {
      return 'trend-up';
    } else if (this.kpi.trend === 'down') {
      // If down trend is good (like processing time reduction)
      if (this.kpi.title.includes('Speed') || this.kpi.title.includes('Time')) {
        return 'trend-down-good';
      }
      return 'trend-down';
    }
    return 'trend-neutral';
  }
  
  /**
   * Get appropriate icon based on trend
   */
  getTrendIcon(): string {
    if (this.kpi.trend === 'up') {
      return 'trending_up';
    } else if (this.kpi.trend === 'down') {
      return 'trending_down';
    }
    return 'trending_flat';
  }
}
