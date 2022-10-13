import type {
  QueryResolvers,
  MutationResolvers,
  WatchListRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const watchLists: QueryResolvers['watchLists'] = () => {
  return db.watchList.findMany()
}

export const watchList: QueryResolvers['watchList'] = ({ id }) => {
  return db.watchList.findUnique({
    where: { id },
  })
}

export const createWatchList: MutationResolvers['createWatchList'] = ({
  input,
}) => {
  return db.watchList.create({
    data: input,
  })
}

export const updateWatchList: MutationResolvers['updateWatchList'] = ({
  id,
  input,
}) => {
  return db.watchList.update({
    data: input,
    where: { id },
  })
}

export const deleteWatchList: MutationResolvers['deleteWatchList'] = ({
  id,
}) => {
  return db.watchList.delete({
    where: { id },
  })
}

export const WatchList: WatchListRelationResolvers = {
  stocks: (_obj, { root }) => {
    return db.watchList.findUnique({ where: { id: root?.id } }).stocks()
  },
}
