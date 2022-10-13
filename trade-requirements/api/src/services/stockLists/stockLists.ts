import type {
  QueryResolvers,
  MutationResolvers,
  StockListRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const stockLists: QueryResolvers['stockLists'] = () => {
  return db.stockList.findMany()
}

export const stockList: QueryResolvers['stockList'] = ({ id }) => {
  return db.stockList.findUnique({
    where: { id },
  })
}

export const createStockList: MutationResolvers['createStockList'] = ({
  input,
}) => {
  return db.stockList.create({
    data: input,
  })
}

export const updateStockList: MutationResolvers['updateStockList'] = ({
  id,
  input,
}) => {
  return db.stockList.update({
    data: input,
    where: { id },
  })
}

export const deleteStockList: MutationResolvers['deleteStockList'] = ({
  id,
}) => {
  return db.stockList.delete({
    where: { id },
  })
}

export const StockList: StockListRelationResolvers = {
  WatchList: (_obj, { root }) => {
    return db.stockList.findUnique({ where: { id: root?.id } }).WatchList()
  },
}
