/*
  Warnings:

  - You are about to drop the column `accountType` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `isLocked` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `transactions` table. All the data in the column will be lost.
  - Added the required column `fullName` to the `accounts` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `accountNumber` on the `accounts` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `AccountId` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_userId_fkey";

-- AlterTable
ALTER TABLE "accounts" DROP COLUMN "accountType",
DROP COLUMN "isLocked",
ADD COLUMN     "fullName" TEXT NOT NULL,
DROP COLUMN "accountNumber",
ADD COLUMN     "accountNumber" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "transactions" DROP COLUMN "userId",
ADD COLUMN     "AccountId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "fullName" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_AccountId_fkey" FOREIGN KEY ("AccountId") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
