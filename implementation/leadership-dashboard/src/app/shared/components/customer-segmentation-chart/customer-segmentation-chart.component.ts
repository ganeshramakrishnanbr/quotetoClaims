import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-customer-segmentation-chart',
  templateUrl: './customer-segmentation-chart.component.html',
  styleUrls: ['./customer-segmentation-chart.component.scss']
})
export class CustomerSegmentationChartComponent implements OnChanges {
  @Input() data: any[] = [];
  @Input() title: string = 'Customer Segmentation';
  @Input() subtitle: string = '';
  @Input() scheme: any = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA', '#0066cc', '#9900cc']
  };
  @Input() showLegend: boolean = true;
  @Input() showLabels: boolean = true;
  @Input() animations: boolean = true;
  @Input() gradient: boolean = false;
  @Input() chartHeight: number = 350;
  @Input() chartType: 'pie' | 'advanced-pie' | 'tree-map' | 'bubble-chart' = 'advanced-pie';

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
