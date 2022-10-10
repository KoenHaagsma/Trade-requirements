import { Form, TextField, Submit, FieldError, Label } from '@redwoodjs/forms'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { MetaTags } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import DailyStockCell from 'src/components/DailyStockCell'
import Suggestions from 'src/components/Suggestions/Suggestions'

const HomePage = () => {
  const formMethods = useForm()
  const [currentSymbol, setCurrentSymbol] = useState<string[]>([])
  const [suggestionSymbols, setSuggestionSymbols] = useState<string[]>([])
  const [fieldSymbol, setFieldSymbol] = useState<string>()
  const [buttonState, setButtonState] = useState<boolean>(false)

  const onSubmit = async (data: any) => {
    const { symbol, ...rest } = data
    setButtonState(true)

    if (currentSymbol.includes(symbol)) {
      toast.error('Symbol is already in the list')
      setButtonState(false)
      formMethods.reset()
      return
    }

    try {
      const response = await fetch(
        `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${symbol.toUpperCase()}&apikey=${
          process.env.REDWOOD_ENV_AV_APIKEY_2
        }`
      )

      const symbols = await response.json()
      const symbolFound = symbols.bestMatches.find(
        (el: any) => el['1. symbol'] === symbol.toUpperCase()
      )

      if (symbolFound !== undefined) {
        setCurrentSymbol((prevState) => [...prevState, symbol.toUpperCase()])
        setSuggestionSymbols([])
        toast.success('Symbol found! Adding it to the list')
      } else {
        setSuggestionSymbols(
          symbols.bestMatches.map((el) => {
            return el['1. symbol']
          })
        )
        toast.error(
          'Symbol not found! Have you already taken a look at the suggestions?'
        )
      }

      formMethods.reset()
      setButtonState(false)
    } catch (error) {
      toast.error(error.message)
      formMethods.reset()
      setButtonState(false)
    }
  }

  return (
    <>
      <MetaTags title="Home" description="Home page" />
      <Form formMethods={formMethods} onSubmit={onSubmit} className="">
        <Label name="symbol" className={'ml-1 text-slate-700'}>
          Search for a ticker:
        </Label>
        <div className={'mt-2'}>
          <TextField
            className={'rounded-md border-2 border-dark p-1'}
            name="symbol"
            placeholder="Search for a ticker"
            maxLength={5}
            value={fieldSymbol}
            validation={{ required: true }}
          ></TextField>
          <Submit
            className={
              'color-white ml-2 rounded-md border-2 border-dark bg-dark py-1 px-4 text-white disabled:opacity-50'
            }
            disabled={buttonState}
          >
            Add to watchlist
          </Submit>
          <FieldError
            name="symbol"
            className="ml-4 rounded-md bg-red-300 px-4 py-2 text-red-700"
          />
        </div>
      </Form>
      {suggestionSymbols && (
        <Suggestions
          symbols={suggestionSymbols}
          setFieldSymbol={setFieldSymbol}
        />
      )}

      <h2 className={'mt-4 text-3xl font-bold'}>Watchlist</h2>
      {currentSymbol && (
        <span className={'text-slate-500'}>
          Items in your watchlist: {currentSymbol.length}
        </span>
      )}
      <div className={'mt-4 grid grid-cols-3 gap-4'}>
        {currentSymbol &&
          currentSymbol.map((symbol) => (
            <DailyStockCell
              symbol={symbol}
              key={symbol}
              setButtonState={setButtonState}
            />
          ))}
      </div>
    </>
  )
}

export default HomePage
