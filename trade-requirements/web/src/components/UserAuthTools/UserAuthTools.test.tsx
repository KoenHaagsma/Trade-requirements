import { render } from '@redwoodjs/testing/web'

import UserAuthTools from './UserAuthTools'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('UserAuthTools', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<UserAuthTools />)
    }).not.toThrow()
  })
})
