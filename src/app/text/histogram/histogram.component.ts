import { Component, Input, OnInit } from '@angular/core';
import { IBarChartOptions, IChartistData } from 'chartist';


/** Component that represents the text-topic probabilities histogram. */
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

  /** Height of the chart in px. */
  private readonly CHAR_HEIGHT = 300;

  /**
   * Options for the bar chart for mobile screens
   * (and for all screens if responsiveOptions aren't specified).
   */
  readonly options: IBarChartOptions = {
    axisX: {
      showGrid: false
    },
    height: this.CHAR_HEIGHT
  };

  constructor() { }

  ngOnInit() {
  }

}
