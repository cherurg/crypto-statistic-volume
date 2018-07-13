import { Component, OnInit } from '@angular/core'
import { cloneDeep, toPairs } from 'lodash'
import { forkJoin } from 'rxjs'
import { switchMap, tap, map } from 'rxjs/operators'
import { KolmogorovApiClientService } from './api-clients/kolmogorov-api-client.service'
import { SantimentApiClientService } from './api-clients/santiment-api-client.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public ksData: any[] = []
  public averages = []

  public allProjects = []

  public historyPrices = []

  public topProjectsNumber = 30

  public dateStart = new Date(Date.now() - 86400 * 1000 * 30).toISOString()
  public dateEnd = new Date().toISOString()

  constructor(
    private ksService: KolmogorovApiClientService,
    private santiment: SantimentApiClientService,
  ) {}

  ngOnInit() {
    // this.ksService
    //   .postSamples(
    //     [[1, 2, 1, 1, 1, 0], [0, 0, 0, 0, 0]],
    //     [[110, 110, 80, 70, 100, 1001.2], [1, 1, 1, 1, 1]],
    //   )
    //   .subscribe(data => (this.ksData = data))

    this.santiment
      .queryAllProjects()
      .pipe(
        tap(data => {
          let allProjects = cloneDeep(data as any)
          allProjects.sort((x, y) => (+x.volumeUsd < +y.volumeUsd ? 1 : -1))

          this.allProjects = allProjects.slice(0, this.topProjectsNumber)
        }),
        switchMap(() => {
          let historyPrices = []
          for (let project of this.allProjects) {
            let historyPrice$ = this.santiment.queryHistoryPrice(
              project.slug,
              this.dateStart,
              this.dateEnd,
            )

            historyPrices.push(historyPrice$)
          }

          return forkJoin(historyPrices)
        }),
        tap(historyPrices => {
          // for (let [index, hp] of toPairs(historyPrices)) {
          //   this.historyPrices.push({
          //     data: hp,
          //   })
          // }

          this.historyPrices = historyPrices
        }),
        switchMap(() => {
          let xx = []
          let yy = []

          for (let hp of this.historyPrices) {
            let halfLen = Math.floor(hp.length / 2)
            let reducedToVolume = hp.map(it => it.volume)
            let leftSubarray = reducedToVolume.slice(0, halfLen)
            let rightSubarray = reducedToVolume.slice(halfLen)
            xx.push(leftSubarray)
            yy.push(rightSubarray)

            this.averages.push([
              this.getAverage(leftSubarray),
              this.getAverage(rightSubarray),
            ])
          }

          return this.ksService.postSamples(xx, yy)
        }),
      )
      .subscribe(ks => (this.ksData = ks as any))
  }

  private getAverage(array) {
    return array.reduce((sum, it) => sum + it, 0) / array.length
  }
}
