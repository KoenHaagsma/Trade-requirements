import type {
  FindDailyStockQuery,
  FindDailyStockQueryVariables,
} from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { useEffect, useState } from 'react'

export const QUERY = gql`
  query getDailyStockQuery($symbol: String!) {
    dailyStock: getDailyStock(symbol: $symbol) {
      symbol
      lastRefreshed
      timeZone
      perDay {
        day
        open
        high
        low
        close
        volume
      }
      rsi
    }
  }
`

export const Loading = () => {
  return <div>Loading...</div>
}

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindDailyStockQueryVariables>) => {
  useEffect(() => {
    toast.error(error.message)
  }, [])
  return null
}

export const Success = ({
  dailyStock,
}: CellSuccessProps<FindDailyStockQuery, FindDailyStockQueryVariables>) => {
  return (
    <article className={'flex flex-col bg-white drop-shadow-md'}>
      <h2>{dailyStock.symbol}</h2>
      <span>Last time refreshed: {dailyStock.lastRefreshed}</span>
      <p>{dailyStock.rsi}</p>
    </article>
  )
}
