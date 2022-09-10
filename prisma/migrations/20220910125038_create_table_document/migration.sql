-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('RG', 'CNH');

-- CreateTable
CREATE TABLE "Documents" (
    "id" SERIAL NOT NULL,
    "type" "DocumentType" NOT NULL,
    "fullName" TEXT NOT NULL,
    "emissionDate" TEXT NOT NULL,
    "expireDate" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "issuer" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Documents_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Documents" ADD CONSTRAINT "Documents_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
