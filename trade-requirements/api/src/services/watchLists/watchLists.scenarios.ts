import type { Prisma, WatchList } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.WatchListCreateArgs>({
  watchList: {
    one: { data: { email: 'String5962002' } },
    two: { data: { email: 'String1918309' } },
  },
})

export type StandardScenario = ScenarioData<WatchList, 'watchList'>
