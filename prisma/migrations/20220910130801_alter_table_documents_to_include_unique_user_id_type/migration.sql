/*
  Warnings:

  - A unique constraint covering the columns `[userId,type]` on the table `Documents` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Documents_userId_type_key" ON "Documents"("userId", "type");
