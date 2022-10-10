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

export const Loading = (props) => {
  useEffect(() => {
    props.setButtonState(true)
  }, [])
  return <div>Loading...</div>
}

export const Empty = (props) => {
  useEffect(() => {
    props.setButtonState(false)
  }, [])
  return <div>Empty</div>
}

interface FailureProps extends CellFailureProps<FindDailyStockQueryVariables> {
  setButtonState: (state: boolean) => void
}

export const Failure = ({ error, setButtonState }: FailureProps) => {
  useEffect(() => {
    setButtonState(false)
    toast.error(error.message)
  }, [])
  return null
}

interface SuccessProps
  extends CellSuccessProps<FindDailyStockQuery, FindDailyStockQueryVariables> {
  setButtonState: (state: boolean) => void
}

export const Success = ({ dailyStock, setButtonState }: SuccessProps) => {
  useEffect(() => {
    setButtonState(false)
  }, [])
  return (
    <article className={'flex flex-col rounded bg-white p-2 drop-shadow-md'}>
      <h2>Ticker: {dailyStock.symbol}</h2>
      <span>Refreshed at: {dailyStock.lastRefreshed}</span>
      <p>RSI: {dailyStock.rsi}</p>
    </article>
  )
}
