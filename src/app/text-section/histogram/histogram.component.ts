import { Component, Input, OnInit } from '@angular/core';
import { IBarChartOptions, IChartistData } from 'chartist';


@Component({
  selector: 'app-histogram',
  templateUrl: './histogram.component.html',
  styleUrls: [ './histogram.component.css' ]
})
export class HistogramComponent implements OnInit {

  /**
   * Data to be displayed. Example:
   * ```
   * data: {
   *     labels: ['Jan', 'Feb', 'Mar'],
   *     series: [[12, 3, 8]],
   * }
   * ```
   */
  @Input() data: IChartistData;

  /** Options for the bar chart in mobile screens */
  private readonly options: IBarChartOptions = {
    axisX: {
      showGrid: false
    }
  };

  constructor() { }

  ngOnInit() {
  }

}
