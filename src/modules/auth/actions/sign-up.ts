'use server';

import { revalidatePath } from 'next/cache';
import { Auth } from '../lib/dal';
import { UserCreateInput } from '../types';
import { redirect } from 'next/navigation';
import { SignUpSchema } from '../lib/definitions';
import { ServerActionResult } from '@/modules/core/types';

export const signUp = async (
  _: ServerActionResult<UserCreateInput> | undefined,
  user: UserCreateInput,
): Promise<ServerActionResult<void> | undefined> => {
  const validation = SignUpSchema.refine(
    (data) => data.password === data.confirmPassword,
    {
      message: "Passwords don't match",
      path: ['confirmPassword'],
    },
  ).safeParse(user);

  if (!validation.success) {
    return {
      success: false,
      validationErrors: validation.error.flatten().fieldErrors,
      serverErrors: null,
    };
  }

  const result = await Auth.signUp(user);

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
