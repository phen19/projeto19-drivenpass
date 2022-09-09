/*
  Warnings:

  - Added the required column `cardHolderName` to the `Card` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Card" ADD COLUMN     "cardHolderName" TEXT NOT NULL;
