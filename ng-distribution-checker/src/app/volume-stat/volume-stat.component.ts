import { Component, Input, OnInit } from '@angular/core'
import { Chart } from '../../../node_modules/angular-highcharts'

@Component({
  selector: 'app-volume-stat',
  templateUrl: './volume-stat.component.html',
  styleUrls: ['./volume-stat.component.css'],
})
export class VolumeStatComponent implements OnInit {
  @Input() project
  @Input() ksData
  @Input() averages
  @Input() volumeSeries

  public chart

  constructor() {}

  ngOnInit() {}

  opened() {
    if (!this.chart) {
      this.chart = new Chart({})
    }
  }
}
