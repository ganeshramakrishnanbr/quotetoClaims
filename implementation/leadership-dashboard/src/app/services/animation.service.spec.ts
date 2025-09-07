import { TestBed } from '@angular/core/testing';
import { AnimationService } from './animation.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AnimationService', () => {
  let service: AnimationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule],
      providers: [AnimationService]
    });
    service = TestBed.inject(AnimationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have pageTransition animation defined', () => {
    expect(AnimationService.pageTransition).toBeDefined();
  });

  it('should have fadeAnimation method', () => {
    expect(service.fadeAnimation).toBeDefined();
  });

  it('should have slideAnimation method', () => {
    expect(service.slideAnimation).toBeDefined();
  });

  it('should have notificationAnimation method', () => {
    expect(service.notificationAnimation).toBeDefined();
  });

  it('should return animation trigger with fadeAnimation', () => {
    const animation = service.fadeAnimation('testFade', 300);
    expect(animation).toBeDefined();
    expect(animation.name).toEqual('testFade');
  });

  it('should return animation trigger with slideAnimation', () => {
    const animation = service.slideAnimation('testSlide', 'left', 300);
    expect(animation).toBeDefined();
    expect(animation.name).toEqual('testSlide');
  });

  it('should return animation trigger with notificationAnimation', () => {
    const animation = service.notificationAnimation('testNotification');
    expect(animation).toBeDefined();
    expect(animation.name).toEqual('testNotification');
  });
});
