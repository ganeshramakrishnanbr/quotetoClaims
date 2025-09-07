import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-performance-chart',
  templateUrl: './performance-chart.component.html',
  styleUrls: ['./performance-chart.component.scss']
})
export class PerformanceChartComponent implements OnChanges {
  @Input() data: any[] = [];
  @Input() title: string = 'Performance Trend';
  @Input() subtitle: string = '';
  @Input() xAxisLabel: string = 'Month';
  @Input() yAxisLabel: string = 'Value';
  @Input() scheme: any = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  @Input() showLegend: boolean = true;
  @Input() showLabels: boolean = true;
  @Input() animations: boolean = true;
  @Input() gradient: boolean = false;
  @Input() chartHeight: number = 350;

  @Output() select = new EventEmitter<any>();
  
  // Chart dimensions
  view: [number, number] = [700, 350];
  
  // Formatting options
  yAxisTickFormatting = (value: any) => `${value}`;
  
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
