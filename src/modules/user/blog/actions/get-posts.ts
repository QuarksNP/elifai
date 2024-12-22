'use server';

import { _verifySession } from '@/modules/auth/lib/dal';
import { Blog } from '../lib/dal';
import { AuthError } from '@/modules/auth/errors/auth_error';

export async function getPosts() {
  try {
    const session = await _verifySession();

    if (!session.isAuthenticated) {
      throw new AuthError('You must be logged in to perform this action', 401);
    }

    const result = await Blog.getPosts();

    if (!result.success) {
      throw new Error(result.errors?.toString());
    }

    return result.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Ups, something went wrong...');
  }
}
