import { Component, OnInit } from '@angular/core'
import { KolmogorovApiClientService } from './api-clients/kolmogorov-api-client.service'
import { SantimentApiClientService } from './api-clients/santiment-api-client.service'
import { switchMap, tap } from 'rxjs/operators'
import { forkJoin } from '../../node_modules/rxjs'
import { clone } from 'lodash'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'app'

  public ksData

  public allProjects = []

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

    let monthAgo = new Date(Date.now() - 86400 * 1000 * 30).toISOString()
    let now = new Date().toISOString()

    this.santiment
      .queryAllProjects()
      .pipe(
        tap(data => {
          let allProjects = (data as any).data.allProjects.map(it => clone(it))
          allProjects.sort((x, y) => (+x.volumeUsd < +y.volumeUsd ? 1 : -1))

          this.allProjects = allProjects.slice(0, 30)
        }),
        switchMap(() => {
          let observables = []
          for (let project of this.allProjects) {
            let $ = this.santiment.queryHistoryPrice(
              project.slug,
              monthAgo,
              now,
            )

            observables.push($)
          }

          return forkJoin(observables)
        }),
      )
      .subscribe(data => console.log(data))
  }
}
