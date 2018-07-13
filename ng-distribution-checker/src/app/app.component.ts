import { Component, OnInit } from '@angular/core'
import { switchMap, tap } from 'rxjs/operators'
import { forkJoin } from '../../node_modules/rxjs'
import { KolmogorovApiClientService } from './api-clients/kolmogorov-api-client.service'
import { SantimentApiClientService } from './api-clients/santiment-api-client.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public ksData

  public allProjects = []

  public topProjectsNumber = 30

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
          let allProjects = (data as any).data.allProjects
          allProjects.sort((x, y) => (+x.volumeUsd < +y.volumeUsd ? 1 : -1))

          this.allProjects = allProjects.slice(0, this.topProjectsNumber)
        }),
        switchMap(() => {
          let monthAgo = new Date(Date.now() - 86400 * 1000 * 30).toISOString()
          let now = new Date().toISOString()

          let historyPrices = []
          for (let project of this.allProjects) {
            let historyPrice$ = this.santiment.queryHistoryPrice(
              project.slug,
              monthAgo,
              now,
            )

            historyPrices.push(historyPrice$)
          }

          return forkJoin(historyPrices)
        }),
      )
      .subscribe(historyPrices => console.log(historyPrices))
  }
}
