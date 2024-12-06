/*
  Warnings:

  - You are about to drop the column `OpeningDate` on the `Account` table. All the data in the column will be lost.
  - Added the required column `openingDate` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Account" DROP COLUMN "OpeningDate",
ADD COLUMN     "openingDate" TIMESTAMP(3) NOT NULL;
