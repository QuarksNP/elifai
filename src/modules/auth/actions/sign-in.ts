'use server';

import { revalidatePath } from 'next/cache';
import { Auth } from '../lib/dal';

import { redirect } from 'next/navigation';
import { SignInSchema } from '../lib/definitions';

import type { SignInRequest } from '../types';
import type { ServerActionResult } from '@/modules/core/types';

export const signIn = async (
  _: ServerActionResult<SignInRequest> | undefined,
  data: SignInRequest,
): Promise<ServerActionResult<void> | undefined> => {
  const validation = SignInSchema.safeParse(data);

  if (!validation.success) {
    return {
      success: false,
      validationErrors: validation.error.flatten().fieldErrors,
      serverErrors: null,
    };
  }

  const result = await Auth.signIn(validation.data);

  if (!result.success) {
    return {
      success: false,
      validationErrors: null,
      serverErrors: result.errors,
    };
  }

  revalidatePath('/portal');
  redirect('/portal');
};
