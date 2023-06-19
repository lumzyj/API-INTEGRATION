/*
  Warnings:

  - You are about to drop the column `account` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `Accounts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Transactions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Accounts" DROP CONSTRAINT "Accounts_userId_fkey";

-- DropForeignKey
ALTER TABLE "Transactions" DROP CONSTRAINT "Transactions_userId_fkey";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "account",
ALTER COLUMN "fullName" DROP NOT NULL;

-- DropTable
DROP TABLE "Accounts";

-- DropTable
DROP TABLE "Transactions";

-- CreateTable
CREATE TABLE "accounts" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "accountNumber" INTEGER NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL,
    "accountName" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transactions" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "AccountId" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "reciever" INTEGER NOT NULL,
    "sender" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_AccountId_fkey" FOREIGN KEY ("AccountId") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
