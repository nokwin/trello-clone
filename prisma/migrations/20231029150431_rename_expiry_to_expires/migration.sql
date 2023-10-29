/*
  Warnings:

  - You are about to drop the column `expiry` on the `VerifyEmailTokens` table. All the data in the column will be lost.
  - Added the required column `expires` to the `VerifyEmailTokens` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "VerifyEmailTokens" DROP COLUMN "expiry",
ADD COLUMN     "expires" TIMESTAMP(3) NOT NULL;
