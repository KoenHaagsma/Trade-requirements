import { fetch } from 'cross-undici-fetch'
import { isEmpty } from 'src/functions/isEmpty'
import { UserInputError } from '@redwoodjs/graphql-server'

type Params = {
  symbol: string
}

export const getDailyStock = async ({ symbol }: Params) => {
  const response = await fetch(
    `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${process.env.REDWOOD_ENV_AV_APIKEY}`
  )
  const json = await response.json()

  if (isEmpty(json['Meta Data']) || isEmpty(json['Time Series (Daily)'])) {
    throw new UserInputError(`${symbol} isn't a valid symbol`)
  }

  return {
    symbol,
    lastRefreshed: json['Meta Data']['3. Last Refreshed'],
    timeZone: json['Meta Data']['5. Time Zone'],
    perDay: Object.entries(json['Time Series (Daily)']).map((day) => {
      return {
        day: day[0],
        open: day[1]['1. open'],
        high: day[1]['2. high'],
        low: day[1]['3. low'],
        close: day[1]['4. close'],
        volume: day[1]['5. volume'],
      }
    }),
  }
}
