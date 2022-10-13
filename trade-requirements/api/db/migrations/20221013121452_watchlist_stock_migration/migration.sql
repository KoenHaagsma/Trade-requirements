/*
  Warnings:

  - You are about to drop the column `symbols` on the `watchlist` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "watchlist" DROP COLUMN "symbols";

-- CreateTable
CREATE TABLE "Stock" (
    "symbol" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "watchlistId" INTEGER
);

-- CreateIndex
CREATE UNIQUE INDEX "Stock_symbol_key" ON "Stock"("symbol");

-- AddForeignKey
ALTER TABLE "Stock" ADD CONSTRAINT "Stock_watchlistId_fkey" FOREIGN KEY ("watchlistId") REFERENCES "watchlist"("id") ON DELETE SET NULL ON UPDATE CASCADE;
