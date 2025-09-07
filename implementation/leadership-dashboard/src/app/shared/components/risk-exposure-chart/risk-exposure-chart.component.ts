import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-risk-exposure-chart',
  templateUrl: './risk-exposure-chart.component.html',
  styleUrls: ['./risk-exposure-chart.component.scss']
})
export class RiskExposureChartComponent implements OnChanges {
  @Input() data: any[] = [];
  @Input() title: string = 'Risk Exposure';
  @Input() subtitle: string = '';
  @Input() xAxisLabel: string = 'Business Line';
  @Input() yAxisLabel: string = 'Exposure';
  @Input() scheme: any = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA', '#0066cc', '#9900cc']
  };
  @Input() showLegend: boolean = true;
  @Input() showLabels: boolean = true;
  @Input() animations: boolean = true;
  @Input() gradient: boolean = false;
  @Input() chartHeight: number = 350;
  @Input() chartType: 'heat-map' | 'tree-map' | 'bar-vertical' | 'bar-horizontal-2d' = 'heat-map';

  @Output() select = new EventEmitter<any>();
  
  // Chart dimensions
  view: [number, number] = [700, 350];
  
  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['chartHeight'] && !changes['chartHeight'].firstChange) {
      this.updateChartDimensions();
    }
  }

  private updateChartDimensions(): void {
    this.view = [700, this.chartHeight];
  }

  onSelect(event: any): void {
    this.select.emit(event);
  }
}
