import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { MatCardModule } from '@angular/material/card'
import { MatExpansionModule } from '@angular/material/expansion'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts'
import { Apollo, ApolloModule } from 'apollo-angular'
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import * as highstock from 'highcharts/modules/stock.src'
import { AppComponent } from './app.component';
import { VolumeStatComponent } from './volume-stat/volume-stat.component'

@NgModule({
  declarations: [AppComponent, VolumeStatComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    ApolloModule,
    HttpLinkModule,
    FormsModule,
    MatCardModule,
    MatExpansionModule,
    BrowserAnimationsModule,
    ChartModule,
  ],
  providers: [
    {
      provide: HIGHCHARTS_MODULES,
      useFactory: () => [highstock],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(apollo: Apollo, httpLink: HttpLink) {
    apollo.create({
      link: httpLink.create({
        uri: 'https://sanbase-low.santiment.net/graphql',
      }),
      cache: new InMemoryCache(),
    })
  }
}
