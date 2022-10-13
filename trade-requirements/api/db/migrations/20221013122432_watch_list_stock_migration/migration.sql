/*
  Warnings:

  - You are about to drop the column `fullName` on the `Stock` table. All the data in the column will be lost.
  - You are about to drop the column `symbol` on the `Stock` table. All the data in the column will be lost.
  - You are about to drop the `watchlist` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `id` to the `Stock` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Stock" DROP CONSTRAINT "Stock_watchlistId_fkey";

-- DropIndex
DROP INDEX "Stock_symbol_key";

-- AlterTable
ALTER TABLE "Stock" DROP COLUMN "fullName",
DROP COLUMN "symbol",
ADD COLUMN     "id" INTEGER NOT NULL,
ADD CONSTRAINT "Stock_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "watchlist";

-- CreateTable
CREATE TABLE "WatchList" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "WatchList_pkey" PRIMARY KEY ("email")
);

-- CreateIndex
CREATE UNIQUE INDEX "WatchList_id_key" ON "WatchList"("id");

-- CreateIndex
CREATE UNIQUE INDEX "WatchList_email_key" ON "WatchList"("email");

-- AddForeignKey
ALTER TABLE "Stock" ADD CONSTRAINT "Stock_watchlistId_fkey" FOREIGN KEY ("watchlistId") REFERENCES "WatchList"("id") ON DELETE SET NULL ON UPDATE CASCADE;
