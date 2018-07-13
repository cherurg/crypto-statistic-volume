import { HttpClientModule } from '@angular/common/http'
import { Injector, NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { Apollo, ApolloModule } from 'apollo-angular'
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { AppComponent } from './app.component'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    ApolloModule,
    HttpLinkModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private injector: Injector, apollo: Apollo, httpLink: HttpLink) {
    apollo.create({
      link: httpLink.create({
        uri: 'https://sanbase-low.santiment.net/graphql',
      }),
      cache: new InMemoryCache(),
    })
  }
}
