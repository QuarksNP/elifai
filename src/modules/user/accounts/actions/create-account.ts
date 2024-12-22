'use server';

import { _verifySession } from '@/modules/auth/lib/dal';
import { Prisma } from '@prisma/client';
import { Account } from '../lib/dal';
import { AuthError } from '@/modules/auth/errors/auth_error';

export const createAccount = async (data: Prisma.AccountCreateInput) => {
  const {
    isAuthenticated,
    user: { id },
  } = await _verifySession();

  if (!isAuthenticated) {
    throw new AuthError('You must be logged in to perform this action', 401);
  }

  const result = await Account.createAccount(id, data);

  if (!result.success) {
    throw new Error(result.errors?.toString());
  }

  return result.data;
};
