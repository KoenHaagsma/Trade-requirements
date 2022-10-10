import { render } from '@redwoodjs/testing/web'

import WatchList from './WatchList'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('WatchList', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<WatchList />)
    }).not.toThrow()
  })
})
