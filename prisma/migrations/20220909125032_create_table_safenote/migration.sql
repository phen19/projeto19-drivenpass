-- CreateTable
CREATE TABLE "SafeNote" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "note" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "SafeNote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SafeNote_userId_title_key" ON "SafeNote"("userId", "title");

-- AddForeignKey
ALTER TABLE "SafeNote" ADD CONSTRAINT "SafeNote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
