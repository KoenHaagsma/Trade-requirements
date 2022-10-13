/*
  Warnings:

  - You are about to drop the `Stock` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Stock" DROP CONSTRAINT "Stock_watchlistId_fkey";

-- DropTable
DROP TABLE "Stock";

-- CreateTable
CREATE TABLE "StockList" (
    "id" INTEGER NOT NULL,
    "watchlistId" INTEGER,

    CONSTRAINT "StockList_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "StockList" ADD CONSTRAINT "StockList_watchlistId_fkey" FOREIGN KEY ("watchlistId") REFERENCES "WatchList"("id") ON DELETE SET NULL ON UPDATE CASCADE;
