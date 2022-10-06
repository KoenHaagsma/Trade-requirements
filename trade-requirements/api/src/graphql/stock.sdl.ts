export const schema = gql`
  type Stock {
    symbol: String!
    open: Float!
    high: Float!
    low: Float!
    price: Float!
    volume: Int!
    latestDay: String!
    prevClose: Float!
    change: Float!
    changePercent: String!
  }

  type Query {
    getStock(symbol: String!): Stock! @skipAuth
  }
`
