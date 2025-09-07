import { Directive, ElementRef, Input, OnInit, OnChanges, SimpleChanges, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appAnimation]'
})
export class AnimationDirective implements OnInit, OnChanges {
  @Input() animationType: 'fade' | 'slide' | 'scale' | 'bounce' | 'rotate' = 'fade';
  @Input() duration: number = 300;
  @Input() delay: number = 0;
  @Input() triggerOnChanges: boolean = false;
  @Input() playState: 'running' | 'paused' = 'running';
  
  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.applyAnimation();
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (this.triggerOnChanges && (changes['animationType'] || changes['playState'])) {
      this.applyAnimation();
    }
  }
  
  private applyAnimation(): void {
    // Reset any existing animations
    this.renderer.setStyle(this.el.nativeElement, 'animation', 'none');
    
    // Force a reflow to ensure the animation reset takes effect
    void this.el.nativeElement.offsetWidth;
    
    // Set animation properties
    this.renderer.setStyle(this.el.nativeElement, 'animation-name', this.getAnimationName());
    this.renderer.setStyle(this.el.nativeElement, 'animation-duration', `${this.duration}ms`);
    this.renderer.setStyle(this.el.nativeElement, 'animation-delay', `${this.delay}ms`);
    this.renderer.setStyle(this.el.nativeElement, 'animation-fill-mode', 'both');
    this.renderer.setStyle(this.el.nativeElement, 'animation-play-state', this.playState);
  }
  
  private getAnimationName(): string {
    switch (this.animationType) {
      case 'fade':
        return 'fadeIn';
      case 'slide':
        return 'slideIn';
      case 'scale':
        return 'scaleIn';
      case 'bounce':
        return 'bounce';
      case 'rotate':
        return 'rotate';
      default:
        return 'fadeIn';
    }
  }
  
  /**
   * Plays the animation
   */
  play(): void {
    this.renderer.setStyle(this.el.nativeElement, 'animation-play-state', 'running');
  }
  
  /**
   * Pauses the animation
   */
  pause(): void {
    this.renderer.setStyle(this.el.nativeElement, 'animation-play-state', 'paused');
  }
  
  /**
   * Restarts the animation
   */
  restart(): void {
    this.renderer.setStyle(this.el.nativeElement, 'animation', 'none');
    void this.el.nativeElement.offsetWidth;
    this.applyAnimation();
  }
}
