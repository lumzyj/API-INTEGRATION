-- CreateEnum
CREATE TYPE "TypeOfTransaction" AS ENUM ('Deposit', 'Withdraw', 'Send');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('pending', 'successful', 'failed');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "fullName" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

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

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "Accounts" ADD CONSTRAINT "Accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_AccountId_fkey" FOREIGN KEY ("AccountId") REFERENCES "Accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
