import type {
  getDailyStockQuery,
  getDailyStockQueryVariables,
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

type LoadingProps = {
  setButtonState: (state: boolean) => void
  setCurrentSymbol?: (stocks: any) => void
}

export const Loading = ({ setButtonState }: LoadingProps) => {
  useEffect(() => {
    setButtonState(true)
  }, [])
  return <div>Loading...</div>
}

type EmptyProps = {
  setButtonState: (state: boolean) => void
  setCurrentSymbol?: (stocks: any) => void
}

export const Empty = ({ setButtonState }: EmptyProps) => {
  useEffect(() => {
    setButtonState(false)
  }, [])
  return <div>Empty</div>
}

interface FailureProps extends CellFailureProps<getDailyStockQueryVariables> {
  setButtonState: (state: boolean) => void
  setCurrentSymbol?: (stocks: any) => void
}

export const Failure = ({
  error,
  setButtonState,
  setCurrentSymbol,
}: FailureProps) => {
  useEffect(() => {
    setButtonState(false)
    if (error.message === 'Alpha vantage limit reached') {
      setCurrentSymbol((prevValue) => prevValue.slice(0, -1))
    }
    toast.error(error.message)
  }, [])
  return null
}

interface SuccessProps
  extends CellSuccessProps<getDailyStockQuery, getDailyStockQueryVariables> {
  setButtonState: (state: boolean) => void
  setCurrentSymbol?: (stocks: any) => void
  fullName: string
}

export const Success = ({
  dailyStock,
  setButtonState,
  fullName,
}: SuccessProps) => {
  useEffect(() => {
    setButtonState(false)
  }, [])
  return (
    <article
      className={`flex min-w-min flex-row justify-between rounded bg-white bg-gradient-to-l via-white ${
        dailyStock.rsi >= 30.0 && dailyStock.rsi <= 70
          ? 'from-red-500'
          : 'from-green-500'
      } py-2 px-6 drop-shadow-md`}
    >
      <section>
        <h2>
          {fullName} - {dailyStock.symbol}
        </h2>
        <span>Last refresh: {dailyStock.lastRefreshed}</span>
      </section>
      <div className={'flex items-center '}>
        <span className={'mr-1 text-dark'}>RSI:</span>
        <p className={'text-lg font-bold text-slate-800'}>{dailyStock.rsi}</p>
      </div>
    </article>
  )
}
