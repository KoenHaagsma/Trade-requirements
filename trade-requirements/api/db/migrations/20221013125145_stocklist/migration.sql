/*
  Warnings:

  - Added the required column `fullName` to the `StockList` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ticker` to the `StockList` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "StockList" ADD COLUMN     "fullName" TEXT NOT NULL,
ADD COLUMN     "ticker" TEXT NOT NULL;
