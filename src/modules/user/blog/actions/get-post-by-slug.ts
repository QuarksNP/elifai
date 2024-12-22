'use server';

import { AuthError } from '@/modules/auth/errors/auth_error';
import { _verifySession } from '@/modules/auth/lib/dal';
import { Blog } from '../lib/dal';

export const getPostBySlug = async (slug: string) => {
  try {
    const { isAuthenticated } = await _verifySession();

    if (!isAuthenticated) {
      throw new AuthError('You must be logged in to perform this action', 401);
    }

    const result = await Blog.getPostBySlug(slug);

    if (!result.success) {
      return null;
    }

    return result.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw error;
  }
};
