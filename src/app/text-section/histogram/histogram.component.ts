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

  /**
   * Options for the bar chart for mobile screens
   * (and for all screens if responsiveOptions aren't specified).
   */
  private readonly options: IBarChartOptions = {
    axisX: {
      showGrid: false
    }
  };

  constructor() { }

  ngOnInit() {
  }

}
