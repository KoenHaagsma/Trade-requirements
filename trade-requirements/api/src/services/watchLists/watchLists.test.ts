import type { WatchList } from '@prisma/client'

import {
  watchLists,
  watchList,
  createWatchList,
  updateWatchList,
  deleteWatchList,
} from './watchLists'
import type { StandardScenario } from './watchLists.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('watchLists', () => {
  scenario('returns all watchLists', async (scenario: StandardScenario) => {
    const result = await watchLists()

    expect(result.length).toEqual(Object.keys(scenario.watchList).length)
  })

  scenario('returns a single watchList', async (scenario: StandardScenario) => {
    const result = await watchList({ id: scenario.watchList.one.id })

    expect(result).toEqual(scenario.watchList.one)
  })

  scenario('creates a watchList', async () => {
    const result = await createWatchList({
      input: { email: 'String8242326' },
    })

    expect(result.email).toEqual('String8242326')
  })

  scenario('updates a watchList', async (scenario: StandardScenario) => {
    const original = (await watchList({
      id: scenario.watchList.one.id,
    })) as WatchList
    const result = await updateWatchList({
      id: original.id,
      input: { email: 'String8798682' },
    })

    expect(result.email).toEqual('String8798682')
  })

  scenario('deletes a watchList', async (scenario: StandardScenario) => {
    const original = (await deleteWatchList({
      id: scenario.watchList.one.id,
    })) as WatchList
    const result = await watchList({ id: original.id })

    expect(result).toEqual(null)
  })
})
