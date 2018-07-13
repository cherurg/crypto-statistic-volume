import { Injectable } from '@angular/core'
import { HttpClient } from '../../../node_modules/@angular/common/http'

@Injectable({
  providedIn: 'root',
})
export class KolmogorovApiClientService {
  constructor(private http: HttpClient) {}

  postSamples(xx: number[][], yy: number[][]) {
    return this.http.post(
      'https://z34xcbym1c.execute-api.us-east-1.amazonaws.com/dev',
      {
        xx,
        yy,
      },
    )
  }
}
