/*
  Warnings:

  - You are about to drop the column `provaider` on the `Account` table. All the data in the column will be lost.
  - Added the required column `provider` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Account" DROP COLUMN "provaider",
ADD COLUMN     "provider" TEXT NOT NULL;
