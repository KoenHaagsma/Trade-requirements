type SuggestionsProps = {
  symbols: string[]
  setFieldSymbol: (symbol: string) => void
}

const Suggestions = ({ symbols, setFieldSymbol }: SuggestionsProps) => {
  return (
    <section>
      <ul className={'mt-2 flex'}>
        {symbols.map((symbol) => (
          <li
            onClick={() => setFieldSymbol(symbol)}
            className={'mx-1 text-slate-500'}
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
