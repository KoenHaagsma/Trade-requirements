import { Form, TextField, Submit, FieldError } from '@redwoodjs/forms'
import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'
import { MetaTags, useQuery } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import DailyStockCell from 'src/components/DailyStockCell'

const HomePage = () => {
  const formMethods = useForm()
  const [symbol, setSymbol] = useState<string[]>([])

  const onSubmit = async (data: any) => {
    if (symbol.includes(data.symbol.toUpperCase())) {
      toast.error(
        `You've already added ${data.symbol.toUpperCase()} to the list`
      )
      formMethods.reset()
      return
    }
    setSymbol((prevState) => [...prevState, data.symbol.toUpperCase()])
    formMethods.reset()
  }

  useEffect(() => {
    console.log(symbol)
  }, [symbol])

  return (
    <>
      <MetaTags title="Home" description="Home page" />
      <Form formMethods={formMethods} onSubmit={onSubmit} className="">
        <TextField
          className={'rounded-md border-2 border-dark p-1'}
          name="symbol"
          placeholder="Search for a symbol"
          maxLength={5}
          validation={{ required: true }}
        ></TextField>
        <Submit
          className={
            'color-white ml-2 rounded-md border-2 border-dark bg-dark py-1 px-4 text-white'
          }
        >
          Search
        </Submit>
        <FieldError
          name="symbol"
          className="ml-4 rounded-md bg-red-300 px-4 py-2 text-red-700"
        />
      </Form>
      <div className={'mt-4 grid grid-cols-3 gap-4'}>
        {symbol &&
          symbol.map((symbol) => (
            <DailyStockCell symbol={symbol} key={symbol} />
          ))}
      </div>
    </>
  )
}

export default HomePage
