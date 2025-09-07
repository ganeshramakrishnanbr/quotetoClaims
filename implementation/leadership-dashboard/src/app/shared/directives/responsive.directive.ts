import { Directive, ElementRef, Input, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil, debounceTime } from 'rxjs/operators';

@Directive({
  selector: '[appResponsive]'
})
export class ResponsiveDirective implements OnInit, OnDestroy {
  @Input() breakpointSm: number = 576;
  @Input() breakpointMd: number = 768;
  @Input() breakpointLg: number = 992;
  @Input() breakpointXl: number = 1200;
  @Input() breakpointXxl: number = 1400;
  
  private currentBreakpoint: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' = 'lg';
  private destroy$ = new Subject<void>();
  
  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    // Set initial breakpoint class
    this.updateBreakpointClass();
    
    // Listen for window resize events
    fromEvent(window, 'resize')
      .pipe(
        debounceTime(200),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.updateBreakpointClass();
      });
  }
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  
  private updateBreakpointClass(): void {
    const width = window.innerWidth;
    let newBreakpoint: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
    
    if (width < this.breakpointSm) {
      newBreakpoint = 'xs';
    } else if (width < this.breakpointMd) {
      newBreakpoint = 'sm';
    } else if (width < this.breakpointLg) {
      newBreakpoint = 'md';
    } else if (width < this.breakpointXl) {
      newBreakpoint = 'lg';
    } else if (width < this.breakpointXxl) {
      newBreakpoint = 'xl';
    } else {
      newBreakpoint = 'xxl';
    }
    
    if (this.currentBreakpoint !== newBreakpoint) {
      // Remove previous breakpoint class
      this.renderer.removeClass(this.el.nativeElement, `responsive-${this.currentBreakpoint}`);
      
      // Set new breakpoint
      this.currentBreakpoint = newBreakpoint;
      
      // Add new breakpoint class
      this.renderer.addClass(this.el.nativeElement, `responsive-${this.currentBreakpoint}`);
      
      // Dispatch a custom event
      const event = new CustomEvent('breakpointChange', {
        detail: { breakpoint: this.currentBreakpoint }
      });
      this.el.nativeElement.dispatchEvent(event);
    }
  }
}
