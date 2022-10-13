export const schema = gql`
  type StockList {
    id: Int!
    fullName: String!
    ticker: String!
    WatchList: WatchList
    watchlistId: Int
  }

  type Query {
    stockLists: [StockList!]! @requireAuth
    stockList(id: Int!): StockList @requireAuth
  }

  input CreateStockListInput {
    fullName: String!
    ticker: String!
    watchlistId: Int
  }

  input UpdateStockListInput {
    fullName: String
    ticker: String
    watchlistId: Int
  }

  type Mutation {
    createStockList(input: CreateStockListInput!): StockList! @requireAuth
    updateStockList(id: Int!, input: UpdateStockListInput!): StockList!
      @requireAuth
    deleteStockList(id: Int!): StockList! @requireAuth
  }
`
