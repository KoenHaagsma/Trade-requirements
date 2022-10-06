import type { FindStockQuery, FindStockQueryVariables } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

export const QUERY = gql`
  query getStockQuery($symbol: String!) {
    stock: getStock(symbol: $symbol) {
      symbol
      open
      high
      low
      price
      volume
      latestDay
      prevClose
      change
      changePercent
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindStockQueryVariables>) => (
  <span className={'mt-4 inline-block rounded-sm bg-red-200 p-2 text-red-600'}>
    {error.message}
  </span>
)

export const Success = ({
  stock,
}: CellSuccessProps<FindStockQuery, FindStockQueryVariables>) => {
  return <div>{JSON.stringify(stock)}</div>
}
