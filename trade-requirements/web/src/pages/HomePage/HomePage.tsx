import { Form, TextField, Submit } from '@redwoodjs/forms'
import { useState } from 'react'
import { MetaTags } from '@redwoodjs/web'

import DailyStockCell from 'src/components/DailyStockCell'
import StockCell from 'src/components/StockCell'

const HomePage = () => {
  const [symbol, setSymbol] = useState()

  const onSubmit = (data: any) => {
    setSymbol(data.symbol)
  }
  return (
    <>
      <MetaTags title="Home" description="Home page" />
      <Form onSubmit={onSubmit}>
        <TextField
          className={'rounded-md border-2 border-zinc-500 p-1'}
          name="symbol"
          placeholder="Search for a symbol"
          maxLength={5}
          validation={{ required: true }}
        ></TextField>
        <Submit
          className={
            'color-white ml-2 rounded-md bg-zinc-500 py-1 px-4 text-white'
          }
        >
          Search
        </Submit>
      </Form>
      {symbol && <StockCell symbol={symbol} />}
      {symbol && <DailyStockCell symbol={symbol} />}
    </>
  )
}

export default HomePage
