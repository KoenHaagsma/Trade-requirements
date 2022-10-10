import { render } from '@redwoodjs/testing/web'

import Suggestions from './Suggestions'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Suggestions', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Suggestions />)
    }).not.toThrow()
  })
})
