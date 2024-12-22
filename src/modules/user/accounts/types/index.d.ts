import { Account, Prisma } from '@prisma/client';

export type Account = Account;

export type AccountType = Account['type'];

export type AccountCreateInput = Omit<
  Prisma.AccountCreateWithoutUserInput,
  'number' | 'securityCode' | 'expiresAt'
> & {
  number: string;
  securityCode?: number;
  expiresAt?: Date;
};

export type CreditCard = Omit<
  Account,
  'returns' | 'assetAllocation' | 'riskProfile'
>;

export type Investment = Omit<Account, 'expiresAt' | 'securityCode'>;

export type Savings = Omit<
  Account,
  'returns' | 'assetAllocation' | 'riskProfile'
>;
