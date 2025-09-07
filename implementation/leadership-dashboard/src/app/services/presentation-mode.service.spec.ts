import { TestBed } from '@angular/core/testing';
import { PresentationModeService } from './presentation-mode.service';

describe('PresentationModeService', () => {
  let service: PresentationModeService;
  
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    
    TestBed.configureTestingModule({});
    service = TestBed.inject(PresentationModeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  it('should have presentation mode off by default', () => {
    expect(service.presentationMode).toBeFalsy();
  });
  
  it('should toggle presentation mode', () => {
    // Initially off
    expect(service.presentationMode).toBeFalsy();
    
    // Toggle on
    service.togglePresentationMode();
    expect(service.presentationMode).toBeTruthy();
    
    // Toggle off
    service.togglePresentationMode();
    expect(service.presentationMode).toBeFalsy();
  });
  
  it('should have default settings', () => {
    const settings = service.settings;
    expect(settings).toBeTruthy();
    expect(settings.darkMode).toBeTruthy();
    expect(settings.hideControls).toBeTruthy();
    expect(settings.autoSlideshow).toBeFalsy();
    expect(settings.slideshowInterval).toEqual(10000);
    expect(settings.fullScreen).toBeTruthy();
  });
  
  it('should update settings', () => {
    // Update settings
    service.updateSettings({
      darkMode: false,
      autoSlideshow: true,
      slideshowInterval: 5000
    });
    
    // Check updated settings
    const settings = service.settings;
    expect(settings.darkMode).toBeFalsy();
    expect(settings.hideControls).toBeTruthy(); // Unchanged
    expect(settings.autoSlideshow).toBeTruthy();
    expect(settings.slideshowInterval).toEqual(5000);
    expect(settings.fullScreen).toBeTruthy(); // Unchanged
  });
  
  it('should save settings to localStorage', () => {
    // Update settings
    service.updateSettings({
      darkMode: false,
      autoSlideshow: true
    });
    
    // Check localStorage
    const savedSettings = localStorage.getItem('presentationModeSettings');
    expect(savedSettings).toBeTruthy();
    
    const parsedSettings = JSON.parse(savedSettings!);
    expect(parsedSettings.darkMode).toBeFalsy();
    expect(parsedSettings.autoSlideshow).toBeTruthy();
  });
  
  it('should load settings from localStorage', () => {
    // Set localStorage
    localStorage.setItem('presentationModeSettings', JSON.stringify({
      darkMode: false,
      hideControls: false,
      autoSlideshow: true,
      slideshowInterval: 3000,
      fullScreen: false
    }));
    
    // Create new service instance to trigger loading from localStorage
    const newService = TestBed.inject(PresentationModeService);
    
    // Check settings
    const settings = newService.settings;
    expect(settings.darkMode).toBeFalsy();
    expect(settings.hideControls).toBeFalsy();
    expect(settings.autoSlideshow).toBeTruthy();
    expect(settings.slideshowInterval).toEqual(3000);
    expect(settings.fullScreen).toBeFalsy();
  });
});
