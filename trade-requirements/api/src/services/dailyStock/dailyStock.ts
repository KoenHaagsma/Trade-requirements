import { fetch } from 'cross-undici-fetch'
import { isEmpty } from 'src/functions/isEmpty'
import { UserInputError } from '@redwoodjs/graphql-server'
import { RSI } from 'technicalindicators'

type Params = {
  symbol: string
}

export const getDailyStock = async ({ symbol }: Params) => {
  const response = await fetch(
    `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${process.env.REDWOOD_ENV_AV_APIKEY}`
  )
  const json = await response.json()

  if (
    ('Meta Data' in json && isEmpty(json['Meta Data'])) ||
    ('Time Series (Daily)' in json && isEmpty(json['Time Series (Daily)'])) ||
    'Error Message' in json
  ) {
    throw new UserInputError(`${symbol} isn't a valid symbol`)
  }

  if ('Note' in json) {
    throw new UserInputError(`Alpha vantage limit reached`)
  }

  const period = 14

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
    rsi: new RSI({
      period: period,
      values: Object.values(json['Time Series (Daily)'])
        .reverse()
        .map((day) => {
          return parseFloat(parseFloat(day['4. close']).toFixed(2))
        }),
    }).getResult()[
      Object.values(json['Time Series (Daily)']).length - period - 1
    ],
    reversedInput: false,
  }
}
