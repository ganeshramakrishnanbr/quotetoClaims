import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-claims-status-chart',
  templateUrl: './claims-status-chart.component.html',
  styleUrls: ['./claims-status-chart.component.scss']
})
export class ClaimsStatusChartComponent implements OnChanges {
  @Input() data: any[] = [];
  @Input() title: string = 'Claims Status';
  @Input() subtitle: string = '';
  @Input() xAxisLabel: string = 'Status';
  @Input() yAxisLabel: string = 'Count';
  @Input() scheme: any = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  @Input() showLegend: boolean = true;
  @Input() showLabels: boolean = true;
  @Input() animations: boolean = true;
  @Input() gradient: boolean = false;
  @Input() chartHeight: number = 350;
  @Input() chartType: 'vertical-bar' | 'horizontal-bar' | 'stacked-vertical-bar' | 'stacked-horizontal-bar' = 'vertical-bar';

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
