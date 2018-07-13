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

      let startDate = volumeData[0][0]
      let midDate = volumeData[Math.floor(volumeData.length / 2)][0]
      let endDate = volumeData[volumeData.length - 1][0]

      let avLeftChart = [
        [startDate, this.averages.left],
        [midDate, this.averages.left],
      ]
      let avRightChart = [
        [midDate, this.averages.right],
        [endDate, this.averages.right],
      ]

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

          {
            data: avLeftChart,
            name: 'Average Volume',
          },
          {
            data: avRightChart,
            name: 'Average Volume',
          },
        ],
      })
    }
  }
}
