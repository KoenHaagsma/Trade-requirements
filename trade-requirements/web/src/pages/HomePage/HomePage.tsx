import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { MetaTags } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import Suggestions from 'src/components/Suggestions/Suggestions'
import TickerForm from 'src/components/TickerForm'
import WatchList from 'src/components/WatchList'

type Stock = {
  symbol: string
  fullName: string
}

type OnSubmitProps = {
  symbol: string
}

type BestMatches = {
  '1. symbol': string
}

const HomePage = () => {
  const formMethods = useForm()
  const [currentSymbol, setCurrentSymbol] = useState<Stock[]>([])
  const [suggestionSymbols, setSuggestionSymbols] = useState<string[]>([])
  const [buttonState, setButtonState] = useState<boolean>(false)

  const onSubmit = async ({ symbol }: OnSubmitProps) => {
    setButtonState(true)

    if (currentSymbol.find((el) => el.symbol === symbol) !== undefined) {
      toast.error('Symbol is already in the list')
      setButtonState(false)
      formMethods.reset()
      return
    }

    // TODO: Add company logo's with this api: https://clearbit.com/logo
    // TODO: Put all types into export file in /types folder

    try {
      const response = await fetch(
        `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${symbol.toUpperCase()}&apikey=${
          process.env.REDWOOD_ENV_AV_APIKEY_2
        }`
      )

      const symbols = await response.json()

      const symbolFound = symbols.bestMatches.find(
        (el: BestMatches) => el['1. symbol'] === symbol.toUpperCase()
      )
      console.log(symbolFound)

      if (symbolFound !== undefined) {
        setCurrentSymbol((prevState) => [
          ...prevState,
          { symbol: symbol.toUpperCase(), fullName: symbolFound['2. name'] },
        ])
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

  const handleSetValue = (symbol: string) => {
    formMethods.setValue('symbol', symbol, { shouldValidate: true })
  }

  return (
    <>
      <MetaTags title="Home" description="Home page" />
      <TickerForm
        formMethods={formMethods}
        onSubmit={onSubmit}
        buttonState={buttonState}
      />
      {suggestionSymbols && (
        <Suggestions symbols={suggestionSymbols} setValue={handleSetValue} />
      )}
      <WatchList
        currentSymbol={currentSymbol}
        setButtonState={setButtonState}
        setCurrentSymbol={setCurrentSymbol}
      />
    </>
  )
}

export default HomePage
