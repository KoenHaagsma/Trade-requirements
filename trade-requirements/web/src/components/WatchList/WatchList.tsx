import DailyStockCell from 'src/components/DailyStockCell'

type Stock = {
  symbol: string
  fullName: string
}

type WatchListProps = {
  currentSymbol: Stock[]
  setButtonState: (state: boolean) => void
  setCurrentSymbol: (state: Stock[]) => void
}

const WatchList = ({
  currentSymbol,
  setButtonState,
  setCurrentSymbol,
}: WatchListProps) => {
  return (
    <>
      <h2 className={'mt-8 text-3xl font-bold'}>Watchlist</h2>
      {currentSymbol && (
        <span className={'text-slate-500'}>
          Stocks in your watchlist: {currentSymbol.length}
        </span>
      )}
      <div
        className={
          'mt-4 grid auto-rows-[1fr] grid-cols-[repeat(auto-fill,_20rem)] gap-4'
        }
      >
        {currentSymbol &&
          currentSymbol.map((symbol: Stock) => (
            <DailyStockCell
              symbol={symbol.symbol}
              key={symbol.symbol}
              setButtonState={setButtonState}
              setCurrentSymbol={setCurrentSymbol}
              fullName={symbol.fullName}
            />
          ))}
      </div>
    </>
  )
}

export default WatchList
