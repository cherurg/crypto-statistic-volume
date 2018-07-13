import { Component, OnInit } from '@angular/core'
import { KolmogorovApiClientService } from './api-clients/kolmogorov-api-client.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'app'

  public ksData

  constructor(private ksService: KolmogorovApiClientService) {}

  ngOnInit() {
    this.ksService
      .postSamples(
        [[1, 2, 1, 1, 1, 0], [0, 0, 0, 0, 0]],
        [[110, 110, 80, 70, 100, 1001.2], [1, 1, 1, 1, 1]],
      )
      .subscribe(data => (this.ksData = data))
  }
}
