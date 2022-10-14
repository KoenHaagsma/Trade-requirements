export const schema = gql`
  type Day {
    day: String!
    open: Float!
    high: Float!
    low: Float!
    close: Float!
    volume: Int!
  }

  type dailyStock {
    symbol: String!
    lastRefreshed: String!
    timeZone: String!
    perDay: [Day]!
    rsi: Float!
  }

  type Query {
    getDailyStock(symbol: String!): dailyStock! @requireAuth
  }
`
