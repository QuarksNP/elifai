-- CreateEnum
CREATE TYPE "AccountType" AS ENUM ('SAVINGS', 'CREDIT_CARD', 'INVESTMENT', 'CUSTOM');

-- CreateEnum
CREATE TYPE "RISK_PROFILE" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateEnum
CREATE TYPE "AccountStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'CLOSED');

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "number" BYTEA NOT NULL,
    "title" TEXT NOT NULL,
    "provaider" TEXT NOT NULL,
    "currentBalance" DOUBLE PRECISION,
    "totalBalance" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "OpeningDate" TIMESTAMP(3) NOT NULL,
    "expiresAt" BYTEA,
    "securityCode" BYTEA,
    "metadata" JSONB,
    "assetAllocation" JSONB,
    "returns" DOUBLE PRECISION,
    "status" "AccountStatus" NOT NULL DEFAULT 'ACTIVE',
    "type" "AccountType" NOT NULL,
    "userId" TEXT NOT NULL,
    "associatedAccountId" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_number_key" ON "Account"("number");

-- CreateIndex
CREATE UNIQUE INDEX "Account_title_key" ON "Account"("title");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_associatedAccountId_fkey" FOREIGN KEY ("associatedAccountId") REFERENCES "Account"("id") ON DELETE SET NULL ON UPDATE CASCADE;
