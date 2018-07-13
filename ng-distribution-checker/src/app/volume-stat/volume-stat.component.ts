import { Component, Input, OnInit } from '@angular/core'
import { Chart, StockChart } from '../../../node_modules/angular-highcharts'

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
      let volumeData = this.volumeSeries.map(it => [
        +Date.parse(it.datetime),
        it.volume,
      ])

      console.log(volumeData)

      this.chart = new StockChart({
        rangeSelector: {
          enabled: false,
        },
        chart: {
          type: 'line',
          zoomType: 'x',
        },
        credits: {
          enabled: false,
        },
        xAxis: {
          type: 'datetime',
          dateTimeLabelFormats: {
            month: '%e. %b',
            year: '%b',
          },
          title: {
            text: 'Date',
          },
        },
        legend: {
          enabled: true,
        },
        tooltip: {
          shared: true,
        },
        navigator: {
          enabled: false,
        },
        series: [
          {
            data: volumeData,
            name: 'Volume',
          },
        ],
      })
    }
  }
}
