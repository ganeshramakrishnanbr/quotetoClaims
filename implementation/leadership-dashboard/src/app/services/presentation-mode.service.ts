import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PresentationModeService {
  private presentationModeSubject = new BehaviorSubject<boolean>(false);
  private presentationModeSettings = new BehaviorSubject<PresentationModeSettings>({
    darkMode: true,
    hideControls: true,
    autoSlideshow: false,
    slideshowInterval: 10000,
    fullScreen: true
  });
  
  constructor() {
    // Check for previously saved settings
    const savedSettings = localStorage.getItem('presentationModeSettings');
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);
        this.presentationModeSettings.next(parsedSettings);
      } catch (error) {
        console.error('Error parsing saved presentation mode settings', error);
      }
    }
  }
  
  /**
   * Get the current presentation mode state
   */
  get presentationMode$(): Observable<boolean> {
    return this.presentationModeSubject.asObservable();
  }
  
  /**
   * Get the current presentation mode value
   */
  get presentationMode(): boolean {
    return this.presentationModeSubject.value;
  }
  
  /**
   * Get the current presentation mode settings
   */
  get settings$(): Observable<PresentationModeSettings> {
    return this.presentationModeSettings.asObservable();
  }
  
  /**
   * Get the current presentation mode settings value
   */
  get settings(): PresentationModeSettings {
    return this.presentationModeSettings.value;
  }
  
  /**
   * Toggle presentation mode
   */
  togglePresentationMode(): void {
    const newState = !this.presentationModeSubject.value;
    this.presentationModeSubject.next(newState);
    
    // If entering presentation mode and fullScreen is enabled, request full screen
    if (newState && this.settings.fullScreen) {
      this.requestFullScreen();
    }
    
    // If exiting presentation mode and in full screen, exit full screen
    if (!newState && document.fullscreenElement) {
      document.exitFullscreen();
    }
  }
  
  /**
   * Update presentation mode settings
   * @param settings The settings to update
   */
  updateSettings(settings: Partial<PresentationModeSettings>): void {
    const newSettings = { ...this.settings, ...settings };
    this.presentationModeSettings.next(newSettings);
    
    // Save settings to localStorage
    localStorage.setItem('presentationModeSettings', JSON.stringify(newSettings));
  }
  
  /**
   * Request full screen mode
   */
  private requestFullScreen(): void {
    const docEl = document.documentElement;
    
    if (docEl.requestFullscreen) {
      docEl.requestFullscreen();
    }
  }
}

/**
 * Presentation mode settings interface
 */
export interface PresentationModeSettings {
  darkMode: boolean;
  hideControls: boolean;
  autoSlideshow: boolean;
  slideshowInterval: number;
  fullScreen: boolean;
}
