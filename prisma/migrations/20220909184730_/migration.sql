/*
  Warnings:

  - You are about to alter the column `title` on the `Note` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `note` on the `Note` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(1000)`.

*/
-- AlterTable
ALTER TABLE "Note" ALTER COLUMN "title" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "note" SET DATA TYPE VARCHAR(1000);
