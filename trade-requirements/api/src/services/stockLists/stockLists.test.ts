import type { StockList } from '@prisma/client'

import {
  stockLists,
  stockList,
  createStockList,
  updateStockList,
  deleteStockList,
} from './stockLists'
import type { StandardScenario } from './stockLists.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('stockLists', () => {
  scenario('returns all stockLists', async (scenario: StandardScenario) => {
    const result = await stockLists()

    expect(result.length).toEqual(Object.keys(scenario.stockList).length)
  })

  scenario('returns a single stockList', async (scenario: StandardScenario) => {
    const result = await stockList({ id: scenario.stockList.one.id })

    expect(result).toEqual(scenario.stockList.one)
  })

  scenario('creates a stockList', async () => {
    const result = await createStockList({
      input: { id: 3518119, fullName: 'String', ticker: 'String' },
    })

    expect(result.id).toEqual(3518119)
    expect(result.fullName).toEqual('String')
    expect(result.ticker).toEqual('String')
  })

  scenario('updates a stockList', async (scenario: StandardScenario) => {
    const original = (await stockList({
      id: scenario.stockList.one.id,
    })) as StockList
    const result = await updateStockList({
      id: original.id,
      input: { id: 8055421 },
    })

    expect(result.id).toEqual(8055421)
  })

  scenario('deletes a stockList', async (scenario: StandardScenario) => {
    const original = (await deleteStockList({
      id: scenario.stockList.one.id,
    })) as StockList
    const result = await stockList({ id: original.id })

    expect(result).toEqual(null)
  })
})
