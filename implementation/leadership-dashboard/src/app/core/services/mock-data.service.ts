import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, interval } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {
  // Real-time data subjects
  private realTimeDataSubject = new BehaviorSubject<any>({
    quotesGenerated: 1247,
    applicationsSubmitted: 892,
    policiesIssued: 456,
    claimsProcessed: 123,
    revenue: 2345000,
    activeUsers: 1890
  });

  // Performance data for trends
  private performanceData = [
    { month: 'Jan', quotes: 980, applications: 720, policies: 350 },
    { month: 'Feb', quotes: 1150, applications: 890, policies: 420 },
    { month: 'Mar', quotes: 1300, applications: 980, policies: 485 },
    { month: 'Apr', quotes: 1420, applications: 1120, policies: 520 },
    { month: 'May', quotes: 1580, applications: 1250, policies: 580 },
    { month: 'Jun', quotes: 1650, applications: 1350, policies: 615 }
  ];

  // Product mix data
  private productMixData = [
    { name: 'Term Life', value: 45, color: '#3B82F6' },
    { name: 'Whole Life', value: 30, color: '#10B981' },
    { name: 'Universal Life', value: 20, color: '#F59E0B' },
    { name: 'Variable Life', value: 5, color: '#EF4444' }
  ];

  // KPI data
  private kpiData = [
    { 
      title: 'Total Premium Revenue', 
      value: '$2.3M', 
      change: '+12.5%', 
      icon: 'dollar-sign',
      color: 'text-green-600'
    },
    { 
      title: 'Active Customers', 
      value: '1,890', 
      change: '+18.7%', 
      icon: 'users',
      color: 'text-blue-600'
    },
    { 
      title: 'Quote Conversion', 
      value: '68.4%', 
      change: '+4.2%', 
      icon: 'target',
      color: 'text-purple-600'
    },
    { 
      title: 'Processing Speed', 
      value: '1.8 days', 
      change: '-35%', 
      icon: 'zap',
      color: 'text-green-600'
    },
    { 
      title: 'System Health', 
      value: '99.7%', 
      change: '+0.1%', 
      icon: 'activity',
      color: 'text-indigo-600'
    },
    { 
      title: 'Customer Satisfaction', 
      value: '4.8/5.0', 
      change: '+0.3%', 
      icon: 'star',
      color: 'text-orange-600'
    }
  ];

  // Claims data
  private claimsData = {
    status: [
      { name: 'Submitted', count: 187, color: '#3B82F6' },
      { name: 'In Review', count: 85, color: '#F59E0B' },
      { name: 'Approved', count: 132, color: '#10B981' },
      { name: 'Rejected', count: 42, color: '#EF4444' },
      { name: 'Appealed', count: 18, color: '#8B5CF6' }
    ],
    processingTime: [
      { day: 'Mon', time: 1.9 },
      { day: 'Tue', time: 1.7 },
      { day: 'Wed', time: 2.1 },
      { day: 'Thu', time: 1.8 },
      { day: 'Fri', time: 1.6 },
      { day: 'Sat', time: 1.4 },
      { day: 'Sun', time: 1.3 }
    ]
  };

  constructor() {
    // Simulate real-time data updates
    interval(5000).subscribe(() => {
      const currentData = this.realTimeDataSubject.getValue();
      this.realTimeDataSubject.next({
        quotesGenerated: currentData.quotesGenerated + Math.floor(Math.random() * 3),
        applicationsSubmitted: currentData.applicationsSubmitted + Math.floor(Math.random() * 2),
        policiesIssued: currentData.policiesIssued + Math.floor(Math.random() * 1),
        claimsProcessed: currentData.claimsProcessed + Math.floor(Math.random() * 1),
        revenue: currentData.revenue + Math.floor(Math.random() * 10000),
        activeUsers: 1890 + Math.floor(Math.random() * 100)
      });
    });
  }

  // Public methods to access the data
  public getRealTimeData(): Observable<any> {
    return this.realTimeDataSubject.asObservable();
  }

  public getPerformanceData(): Observable<any[]> {
    return new Observable(observer => {
      observer.next(this.performanceData);
      observer.complete();
    });
  }

  public getProductMixData(): Observable<any[]> {
    return new Observable(observer => {
      observer.next(this.productMixData);
      observer.complete();
    });
  }

  public getKPIData(): Observable<any[]> {
    return this.getRealTimeData().pipe(
      map(realTimeData => {
        // Update KPI data with real-time values
        const updatedKPIs = [...this.kpiData];
        updatedKPIs[0].value = `$${(realTimeData.revenue / 1000000).toFixed(1)}M`;
        updatedKPIs[1].value = realTimeData.activeUsers.toLocaleString();
        return updatedKPIs;
      })
    );
  }

  public getClaimsData(): Observable<any> {
    return new Observable(observer => {
      observer.next(this.claimsData);
      observer.complete();
    });
  }

  public getCustomerSegments(): Observable<any[]> {
    return new Observable(observer => {
      observer.next([
        { segment: 'Premium', percentage: 15, count: 285, color: '#8B5CF6' },
        { segment: 'Standard', percentage: 45, count: 850, color: '#3B82F6' },
        { segment: 'Basic', percentage: 30, count: 565, color: '#10B981' },
        { segment: 'High Risk', percentage: 10, count: 190, color: '#F59E0B' }
      ]);
      observer.complete();
    });
  }

  public getRiskPortfolio(): Observable<any[]> {
    return new Observable(observer => {
      observer.next([
        { risk: 'Low', exposure: 35, returns: 12, color: '#10B981' },
        { risk: 'Medium', exposure: 45, returns: 18, color: '#3B82F6' },
        { risk: 'High', exposure: 20, returns: 25, color: '#F59E0B' }
      ]);
      observer.complete();
    });
  }
  
  /**
   * Refreshes all mock data with new random values
   * This is called when the user clicks the refresh button in the UI
   */
  public refreshAllData(): void {
    // Update real-time data
    const currentData = this.realTimeDataSubject.getValue();
    this.realTimeDataSubject.next({
      quotesGenerated: currentData.quotesGenerated + Math.floor(Math.random() * 30 + 5),
      applicationsSubmitted: currentData.applicationsSubmitted + Math.floor(Math.random() * 20 + 3),
      policiesIssued: currentData.policiesIssued + Math.floor(Math.random() * 15 + 2),
      claimsProcessed: currentData.claimsProcessed + Math.floor(Math.random() * 10 + 1),
      revenue: currentData.revenue + Math.floor(Math.random() * 100000 + 50000),
      activeUsers: 1890 + Math.floor(Math.random() * 200 + 50)
    });
    
    // Update performance data with new random values
    this.performanceData = this.performanceData.map(item => {
      return {
        ...item,
        quotes: item.quotes * (1 + (Math.random() * 0.1 - 0.05)), // -5% to +5% change
        applications: item.applications * (1 + (Math.random() * 0.1 - 0.05)),
        policies: item.policies * (1 + (Math.random() * 0.1 - 0.05))
      };
    });
    
    // Update product mix data with slight variations
    this.productMixData = this.productMixData.map(item => {
      const variation = Math.random() * 6 - 3; // -3 to +3 percentage points
      return {
        ...item,
        value: Math.max(5, Math.min(60, item.value + variation)) // Keep between 5 and 60
      };
    });
    
    // Update claims data
    this.claimsData.status = this.claimsData.status.map(item => {
      return {
        ...item,
        count: Math.max(10, item.count + Math.floor(Math.random() * 10 - 5)) // Random adjustment but keep above 10
      };
    });
    
    this.claimsData.processingTime = this.claimsData.processingTime.map(item => {
      return {
        ...item,
        time: Math.max(0.8, Math.min(2.5, item.time + (Math.random() * 0.4 - 0.2))) // Keep between 0.8 and 2.5 days
      };
    });
    
    console.log('All mock data has been refreshed with new values');
  }
  
  /**
   * Gets a specific KPI by name
   * @param kpiName The name of the KPI to retrieve
   */
  public getKPI(kpiName: string): Observable<any> {
    return this.getKPIData().pipe(
      map(kpis => kpis.find(kpi => kpi.title.toLowerCase().replace(/\s+/g, '_') === kpiName))
    );
  }
  
  /**
   * Gets specific KPIs for the dashboard
   */
  public getTotalQuotes(): Observable<number> {
    return this.getRealTimeData().pipe(
      map(data => data.quotesGenerated)
    );
  }
  
  public getConversionRate(): Observable<number> {
    return this.getRealTimeData().pipe(
      map(data => (data.policiesIssued / data.quotesGenerated) * 100)
    );
  }
  
  public getAverageClaimValue(): Observable<number> {
    return this.getRealTimeData().pipe(
      map(data => data.revenue / data.claimsProcessed)
    );
  }
  
  public getRiskIndex(): Observable<number> {
    // Simulated risk index calculation
    return this.getRealTimeData().pipe(
      map(data => {
        const baseRisk = 65; // Base risk index out of 100
        const claimFactor = data.claimsProcessed / data.policiesIssued;
        return Math.min(100, Math.max(0, baseRisk + (claimFactor * 100)));
      })
    );
  }
}
