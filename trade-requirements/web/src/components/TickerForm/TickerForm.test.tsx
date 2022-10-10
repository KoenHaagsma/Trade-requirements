import { render } from '@redwoodjs/testing/web'

import TickerForm from './TickerForm'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('TickerForm', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TickerForm />)
    }).not.toThrow()
  })
})
