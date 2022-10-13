import type { Prisma, StockList } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.StockListCreateArgs>({
  stockList: {
    one: { data: { id: 7608915, fullName: 'String', ticker: 'String' } },
    two: { data: { id: 5651789, fullName: 'String', ticker: 'String' } },
  },
})

export type StandardScenario = ScenarioData<StockList, 'stockList'>
