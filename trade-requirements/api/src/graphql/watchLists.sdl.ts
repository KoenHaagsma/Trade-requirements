export const schema = gql`
  type WatchList {
    id: Int!
    email: String!
    stocks: [StockList]!
  }

  type Query {
    watchLists: [WatchList!]! @requireAuth
    watchList(id: String!): WatchList @requireAuth
    watchListEmail(email: String!): WatchList @skipAuth
  }

  input CreateWatchListInput {
    email: String!
  }

  input UpdateWatchListInput {
    email: String!
  }

  type Mutation {
    createWatchList(input: CreateWatchListInput!): WatchList! @requireAuth
    updateWatchList(id: String!, input: UpdateWatchListInput!): WatchList!
      @requireAuth
    deleteWatchList(id: String!): WatchList! @requireAuth
  }
`
