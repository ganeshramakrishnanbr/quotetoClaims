import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private dateRangeSubject = new BehaviorSubject<DateRange>({
    startDate: this.getDefaultStartDate(),
    endDate: new Date()
  });
  
  private categoriesSubject = new BehaviorSubject<string[]>([]);
  private statusesSubject = new BehaviorSubject<string[]>([]);
  private regionsSubject = new BehaviorSubject<string[]>([]);
  private businessLinesSubject = new BehaviorSubject<string[]>([]);
  
  constructor() {
    // Load saved filters if any
    this.loadSavedFilters();
  }
  
  /**
   * Get the default start date (1 year ago)
   */
  private getDefaultStartDate(): Date {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 1);
    return date;
  }
  
  /**
   * Load saved filters from localStorage
   */
  private loadSavedFilters(): void {
    try {
      const savedFilters = localStorage.getItem('dashboardFilters');
      if (savedFilters) {
        const filters = JSON.parse(savedFilters);
        
        if (filters.dateRange) {
          this.dateRangeSubject.next({
            startDate: new Date(filters.dateRange.startDate),
            endDate: new Date(filters.dateRange.endDate)
          });
        }
        
        if (filters.categories) {
          this.categoriesSubject.next(filters.categories);
        }
        
        if (filters.statuses) {
          this.statusesSubject.next(filters.statuses);
        }
        
        if (filters.regions) {
          this.regionsSubject.next(filters.regions);
        }
        
        if (filters.businessLines) {
          this.businessLinesSubject.next(filters.businessLines);
        }
      }
    } catch (error) {
      console.error('Error loading saved filters', error);
    }
  }
  
  /**
   * Save current filters to localStorage
   */
  private saveFilters(): void {
    const filters = {
      dateRange: this.dateRangeSubject.value,
      categories: this.categoriesSubject.value,
      statuses: this.statusesSubject.value,
      regions: this.regionsSubject.value,
      businessLines: this.businessLinesSubject.value
    };
    
    localStorage.setItem('dashboardFilters', JSON.stringify(filters));
  }
  
  /**
   * Get the date range observable
   */
  get dateRange$(): Observable<DateRange> {
    return this.dateRangeSubject.asObservable();
  }
  
  /**
   * Get the categories observable
   */
  get categories$(): Observable<string[]> {
    return this.categoriesSubject.asObservable();
  }
  
  /**
   * Get the statuses observable
   */
  get statuses$(): Observable<string[]> {
    return this.statusesSubject.asObservable();
  }
  
  /**
   * Get the regions observable
   */
  get regions$(): Observable<string[]> {
    return this.regionsSubject.asObservable();
  }
  
  /**
   * Get the business lines observable
   */
  get businessLines$(): Observable<string[]> {
    return this.businessLinesSubject.asObservable();
  }
  
  /**
   * Update the date range filter
   * @param dateRange The new date range
   */
  updateDateRange(dateRange: DateRange): void {
    this.dateRangeSubject.next(dateRange);
    this.saveFilters();
  }
  
  /**
   * Update the categories filter
   * @param categories The new categories
   */
  updateCategories(categories: string[]): void {
    this.categoriesSubject.next(categories);
    this.saveFilters();
  }
  
  /**
   * Update the statuses filter
   * @param statuses The new statuses
   */
  updateStatuses(statuses: string[]): void {
    this.statusesSubject.next(statuses);
    this.saveFilters();
  }
  
  /**
   * Update the regions filter
   * @param regions The new regions
   */
  updateRegions(regions: string[]): void {
    this.regionsSubject.next(regions);
    this.saveFilters();
  }
  
  /**
   * Update the business lines filter
   * @param businessLines The new business lines
   */
  updateBusinessLines(businessLines: string[]): void {
    this.businessLinesSubject.next(businessLines);
    this.saveFilters();
  }
  
  /**
   * Reset all filters to their default values
   */
  resetFilters(): void {
    this.dateRangeSubject.next({
      startDate: this.getDefaultStartDate(),
      endDate: new Date()
    });
    this.categoriesSubject.next([]);
    this.statusesSubject.next([]);
    this.regionsSubject.next([]);
    this.businessLinesSubject.next([]);
    this.saveFilters();
  }
}

/**
 * Date range interface
 */
export interface DateRange {
  startDate: Date;
  endDate: Date;
}
