type SuggestionsProps = {
  symbols: string[]
  setValue: (symbol: string) => void
}

const Suggestions = ({ symbols, setValue }: SuggestionsProps) => {
  return (
    <section className={'mt-2'}>
      {symbols.length > 0 && (
        <span className={'text-slate-500'}>Suggested:</span>
      )}
      <ul className={'mt-1 -ml-1 flex'}>
        {symbols.map((symbol) => (
          <li
            onClick={() => setValue(symbol)}
            className={
              'mx-1 cursor-pointer rounded-sm bg-white px-2 py-1 text-slate-600 drop-shadow hover:underline hover:drop-shadow-sm'
            }
            key={symbol}
          >
            {symbol}
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Suggestions
