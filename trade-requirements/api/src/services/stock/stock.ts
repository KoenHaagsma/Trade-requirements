import { fetch } from 'cross-undici-fetch'
import { isEmpty } from 'src/functions/isEmpty'
import { UserInputError } from '@redwoodjs/graphql-server'

type Params = {
  symbol: string
}

export const getStock = async ({ symbol }: Params) => {
  const response = await fetch(
    `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${process.env.REDWOOD_ENV_AV_APIKEY_3}`
  )
  const json = await response.json()

  if (isEmpty(json['Global Quote'])) {
    throw new UserInputError(`${symbol} isn't a valid symbol`)
  }

  return {
    symbol,
    open: parseFloat(json['Global Quote']['02. open']),
    high: parseFloat(json['Global Quote']['03. high']),
    low: parseFloat(json['Global Quote']['04. low']),
    price: parseFloat(json['Global Quote']['05. price']),
    volume: parseInt(json['Global Quote']['06. volume']),
    latestDay: json['Global Quote']['07. latest trading day'],
    prevClose: parseFloat(json['Global Quote']['08. previous close']),
    change: parseFloat(json['Global Quote']['09. change']),
    changePercent: json['Global Quote']['10. change percent'],
  }
}
