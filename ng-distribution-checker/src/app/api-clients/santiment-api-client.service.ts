import { Injectable } from '@angular/core'
import { Apollo } from 'apollo-angular'
import gql from 'graphql-tag'
import { Observable } from 'rxjs'
import { ApolloQueryResult } from 'apollo-client'

export interface ActiveAdressesPiece {
  activeAddresses: number
  datetime: string
}

export interface TransactionVolumePiece {
  transactionVolume: number
  datetime: string
}

export interface Project {
  symbol: string
}

@Injectable({
  providedIn: 'root',
})
export class SantimentApiClientService {
  constructor(private apollo: Apollo) {}

  queryDailyActiveAdresses(
    slug: string,
    from: string,
    to: string,
    interval: string = '1d',
  ): Observable<
    ApolloQueryResult<{
      dailyActiveAddresses: ActiveAdressesPiece[]
      transactionVolume: TransactionVolumePiece[]
      projectBySlug: Project
    }>
  > {
    return this.apollo.query<{
      dailyActiveAddresses: ActiveAdressesPiece[]
      transactionVolume: TransactionVolumePiece[]
      projectBySlug: Project
    }>({
      query: gql`
        query DailyActiveAdresses(
          $slug: String!
          $interval: String!
          $from: String!
          $to: String!
        ) {
          dailyActiveAddresses(
            slug: $slug
            from: $from
            to: $to
            interval: $interval
          ) {
            activeAddresses
            datetime
          }

          transactionVolume(
            from: $from
            to: $to
            slug: $slug
            interval: $interval
          ) {
            datetime
            transactionVolume
          }

          projectBySlug(slug: $slug) {
            symbol
          }
        }
      `,
      variables: {
        slug,
        interval,
        from,
        to,
      },
    })
  }

  queryAllProjects(): Observable<ApolloQueryResult<any>> {
    return this.apollo.query<any>({
      query: gql`
        query {
          allProjects {
            slug
            ticker
            volumeUsd
          }
        }
      `,
    })
  }

  queryHistoryPrice(
    slug: string,
    from: string,
    to: string,
    interval: string = '1d',
  ): Observable<ApolloQueryResult<any>> {
    return this.apollo.query({
      query: gql`
        query HistoryPrice(
          $slug: String!
          $interval: String!
          $from: String!
          $to: String!
        ) {
          historyPrice(slug: $slug, from: $from, to: $to, interval: $interval) {
            volume
            datetime
            ticker
          }
        }
      `,
      variables: {
        slug,
        interval,
        from,
        to,
      },
    })
  }
}
