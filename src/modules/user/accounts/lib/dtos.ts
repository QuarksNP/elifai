import type { Account, CreditCard, Investment, Savings } from '../types';

export function CreditCardDTO(account: Account): CreditCard {
  return {
    id: account.id,
    number: account.number,
    title: account.title,
    provider: account.provider,
    currentBalance: account.currentBalance,
    totalBalance: account.totalBalance,
    createdAt: account.createdAt,
    updatedAt: account.updatedAt,
    openingDate: account.openingDate,
    expiresAt: account.expiresAt,
    securityCode: account.securityCode,
    metadata: account.metadata,
    status: account.status,
    type: account.type,
    userId: account.userId,
    associatedAccountId: account.associatedAccountId,
  };
}

export function InvestmentDTO(account: Account): Investment {
  return {
    id: account.id,
    number: account.number,
    title: account.title,
    provider: account.provider,
    currentBalance: account.currentBalance,
    totalBalance: account.totalBalance,
    createdAt: account.createdAt,
    updatedAt: account.updatedAt,
    openingDate: account.openingDate,
    metadata: account.metadata,
    riskProfile: account.riskProfile,
    status: account.status,
    type: account.type,
    returns: account.returns,
    userId: account.userId,
    assetAllocation: account.assetAllocation,
    associatedAccountId: account.associatedAccountId,
  };
}

export function SavingsDTO(account: Account): Savings {
  return {
    id: account.id,
    expiresAt: account.expiresAt,
    securityCode: account.securityCode,
    number: account.number,
    title: account.title,
    provider: account.provider,
    currentBalance: account.currentBalance,
    totalBalance: account.totalBalance,
    createdAt: account.createdAt,
    updatedAt: account.updatedAt,
    openingDate: account.openingDate,
    metadata: account.metadata,
    status: account.status,
    type: account.type,
    userId: account.userId,
    associatedAccountId: account.associatedAccountId,
  };
}
