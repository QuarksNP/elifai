import { AccountType } from '../../types';

export const ACCOUNT_TYPES: { type: AccountType; description: string }[] = [
  {
    type: 'CREDIT_CARD',
    description: 'Add a new credit card',
  },
  {
    type: 'INVESTMENT',
    description: 'Add a new investment account',
  },
  {
    type: 'SAVINGS',
    description: 'Add a new savings account',
  },
  {
    type: 'CUSTOM',
    description: 'Add a new custom account',
  },
];
