import { Injectable } from '@angular/core';
import { AnimationBuilder, AnimationMetadata, AnimationPlayer, style, animate } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class AnimationService {
  constructor(private animationBuilder: AnimationBuilder) { }

  /**
   * Create and play fade in animation
   */
  public fadeIn(element: HTMLElement, duration: number = 300): AnimationPlayer {
    const metadata: AnimationMetadata[] = [
      style({ opacity: 0 }),
      animate(`${duration}ms ease-in`, style({ opacity: 1 }))
    ];

    const factory = this.animationBuilder.build(metadata);
    const player = factory.create(element);
    player.play();
    return player;
  }

  /**
   * Create and play fade out animation
   */
  public fadeOut(element: HTMLElement, duration: number = 300): AnimationPlayer {
    const metadata: AnimationMetadata[] = [
      style({ opacity: 1 }),
      animate(`${duration}ms ease-out`, style({ opacity: 0 }))
    ];

    const factory = this.animationBuilder.build(metadata);
    const player = factory.create(element);
    player.play();
    return player;
  }

  /**
   * Create and play slide in animation
   */
  public slideIn(element: HTMLElement, direction: 'left' | 'right' | 'top' | 'bottom' = 'right', duration: number = 300): AnimationPlayer {
    let initialStyle;
    
    switch (direction) {
      case 'left':
        initialStyle = style({ transform: 'translateX(-100%)', opacity: 0 });
        break;
      case 'right':
        initialStyle = style({ transform: 'translateX(100%)', opacity: 0 });
        break;
      case 'top':
        initialStyle = style({ transform: 'translateY(-100%)', opacity: 0 });
        break;
      case 'bottom':
        initialStyle = style({ transform: 'translateY(100%)', opacity: 0 });
        break;
    }
    
    const metadata: AnimationMetadata[] = [
      initialStyle,
      animate(`${duration}ms ease-out`, style({ transform: 'translate(0)', opacity: 1 }))
    ];

    const factory = this.animationBuilder.build(metadata);
    const player = factory.create(element);
    player.play();
    return player;
  }

  /**
   * Create and play scale animation
   */
  public scale(element: HTMLElement, from: number = 0.8, to: number = 1, duration: number = 300): AnimationPlayer {
    const metadata: AnimationMetadata[] = [
      style({ transform: `scale(${from})`, opacity: from < 1 ? 0 : 1 }),
      animate(`${duration}ms ease-out`, style({ transform: `scale(${to})`, opacity: 1 }))
    ];

    const factory = this.animationBuilder.build(metadata);
    const player = factory.create(element);
    player.play();
    return player;
  }

  /**
   * Create and play bounce animation
   */
  public bounce(element: HTMLElement, amplitude: number = 1.1, duration: number = 500): AnimationPlayer {
    const metadata: AnimationMetadata[] = [
      style({ transform: 'scale(0.95)', opacity: 1 }),
      animate('150ms ease-out', style({ transform: `scale(${amplitude})` })),
      animate('150ms ease-in-out', style({ transform: 'scale(0.98)' })),
      animate('150ms ease-out', style({ transform: 'scale(1.02)' })),
      animate('150ms ease-out', style({ transform: 'scale(1)' }))
    ];

    const factory = this.animationBuilder.build(metadata);
    const player = factory.create(element);
    player.play();
    return player;
  }

  /**
   * Create and play pulse animation
   */
  public pulse(element: HTMLElement, duration: number = 300): AnimationPlayer {
    const metadata: AnimationMetadata[] = [
      style({ transform: 'scale(1)' }),
      animate('100ms ease-in', style({ transform: 'scale(1.05)' })),
      animate('100ms ease-out', style({ transform: 'scale(1)' })),
      animate('100ms ease-in', style({ transform: 'scale(1.05)' })),
      animate('100ms ease-out', style({ transform: 'scale(1)' }))
    ];

    const factory = this.animationBuilder.build(metadata);
    const player = factory.create(element);
    player.play();
    return player;
  }

  /**
   * Create and play number counter animation
   * This doesn't use Angular Animations but provides a similar interface
   */
  public countUp(element: HTMLElement, startValue: number, endValue: number, duration: number = 1000, formatter?: (value: number) => string): any {
    const startTime = performance.now();
    const change = endValue - startValue;
    
    const updateValue = (timestamp: number) => {
      const elapsedTime = timestamp - startTime;
      
      if (elapsedTime < duration) {
        const currentValue = startValue + change * (elapsedTime / duration);
        element.textContent = formatter ? formatter(currentValue) : currentValue.toFixed(0);
        requestAnimationFrame(updateValue);
      } else {
        element.textContent = formatter ? formatter(endValue) : endValue.toFixed(0);
      }
    };
    
    requestAnimationFrame(updateValue);
    
    // Return a player-like object for consistency
    return {
      play: () => {},
      pause: () => {},
      finish: () => {
        element.textContent = formatter ? formatter(endValue) : endValue.toFixed(0);
      },
      reset: () => {
        element.textContent = formatter ? formatter(startValue) : startValue.toFixed(0);
      },
      destroy: () => {}
    };
  }
  
  /**
   * Trigger a page transition animation
   * This is called when navigating between routes
   */
  public triggerPageTransition(): void {
    // Find the main content container
    const contentContainer = document.querySelector('.app-content') as HTMLElement;
    
    if (contentContainer) {
      // First fade out
      const fadeOutPlayer = this.fadeOut(contentContainer, 150);
      
      fadeOutPlayer.onDone(() => {
        // Then fade back in after a short delay
        setTimeout(() => {
          this.fadeIn(contentContainer, 300);
        }, 50);
      });
    }
  }
  
  /**
   * Trigger a special animation
   * @param animationType The type of special animation to trigger
   * @param element Optional element to animate, defaults to body
   */
  public triggerSpecialAnimation(animationType: string, element?: HTMLElement): void {
    // If no element is provided, use the document body
    const targetElement = element || document.body;
    
    switch (animationType) {
      case 'enter-presentation':
        // Add a class to the body for CSS transitions
        document.body.classList.add('presentation-mode-transition');
        document.body.classList.add('presentation-mode');
        
        // After the transition completes, remove the transition class
        setTimeout(() => {
          document.body.classList.remove('presentation-mode-transition');
        }, 500);
        break;
        
      case 'exit-presentation':
        // Add a class to the body for CSS transitions
        document.body.classList.add('presentation-mode-transition');
        document.body.classList.remove('presentation-mode');
        
        // After the transition completes, remove the transition class
        setTimeout(() => {
          document.body.classList.remove('presentation-mode-transition');
        }, 500);
        break;
        
      case 'data-refresh':
        // Animate the refresh of data
        this.pulse(targetElement, 500);
        break;
        
      case 'highlight':
        // Temporarily add a highlight class
        targetElement.classList.add('highlight-animation');
        
        // Remove it after animation completes
        setTimeout(() => {
          targetElement.classList.remove('highlight-animation');
        }, 1500);
        break;
        
      default:
        // For unknown animation types, do a simple fade in/out
        const fadeOutPlayer = this.fadeOut(targetElement, 200);
        fadeOutPlayer.onDone(() => {
          this.fadeIn(targetElement, 200);
        });
    }
  }
  
  /**
   * Animate a value change in an element
   * Useful for KPI cards when values change
   */
  public animateValueChange(element: HTMLElement, newValue: string): void {
    // Store the original value
    const originalValue = element.textContent || '';
    
    // If the value hasn't changed, don't animate
    if (originalValue === newValue) return;
    
    // Add a CSS class to indicate value increase/decrease
    if (parseFloat(newValue) > parseFloat(originalValue)) {
      element.classList.add('value-increase');
    } else if (parseFloat(newValue) < parseFloat(originalValue)) {
      element.classList.add('value-decrease');
    }
    
    // Fade out, change value, fade back in
    const fadeOutPlayer = this.fadeOut(element, 150);
    fadeOutPlayer.onDone(() => {
      element.textContent = newValue;
      this.fadeIn(element, 300);
      
      // Remove value change classes after animation
      setTimeout(() => {
        element.classList.remove('value-increase', 'value-decrease');
      }, 2000);
    });
  }
}
