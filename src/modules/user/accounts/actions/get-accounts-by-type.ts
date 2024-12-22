'use server';

import { AuthError } from '@/modules/auth/errors/auth_error';
import { _verifySession } from '@/modules/auth/lib/dal';
import { AccountType } from '@prisma/client';
import { Account } from '../lib/dal';

export const getAccountsByType = async (type: AccountType) => {
  const {
    isAuthenticated,
    user: { id },
  } = await _verifySession();

  if (!isAuthenticated) {
    throw new AuthError('You must be logged in to perform this action', 401);
  }

  const result = await Account.getAccountsByType(id, type);

  if (!result.success) {
    throw new Error(result.errors?.toString());
  } else if (!result.data) {
    throw new Error('Ups, something went wrong...');
  }

  return result.data;
};