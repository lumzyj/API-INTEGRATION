/*
  Warnings:

  - You are about to drop the column `pin` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `accounts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `transactions` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "TypeOfTransaction" AS ENUM ('Deposit', 'Withdraw', 'Send');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('pending', 'successful', 'failed');

-- DropForeignKey
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_userId_fkey";

-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_AccountId_fkey";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "pin";

-- DropTable
DROP TABLE "accounts";

-- DropTable
DROP TABLE "transactions";

-- CreateTable
CREATE TABLE "Accounts" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "AccountName" TEXT NOT NULL,
    "account_Number" INTEGER NOT NULL,
    "pin" INTEGER NOT NULL,
    "balance" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transactions" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "amount" INTEGER NOT NULL,
    "type_of_transaction" "TypeOfTransaction" NOT NULL,
    "receiver" INTEGER NOT NULL,
    "sender" TEXT NOT NULL,
    "status" "Status" NOT NULL,
    "balance" INTEGER NOT NULL,
    "AccountId" INTEGER NOT NULL,

    CONSTRAINT "Transactions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Accounts" ADD CONSTRAINT "Accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_AccountId_fkey" FOREIGN KEY ("AccountId") REFERENCES "Accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
