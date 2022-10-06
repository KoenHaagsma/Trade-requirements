import type {
  FindDailyStockQuery,
  FindDailyStockQueryVariables,
} from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

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
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindDailyStockQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  dailyStock,
}: CellSuccessProps<FindDailyStockQuery, FindDailyStockQueryVariables>) => {
  return (
    <article className={'flex flex-col'}>
      <h2>{dailyStock.symbol}</h2>
      <span>Last time refreshed: {dailyStock.lastRefreshed}</span>
      {dailyStock.perDay.map((day) => (
        <h1>{day.day}</h1>
      ))}
    </article>
  )
}
