'use server';

import { _verifySession } from '@/modules/auth/lib/dal';
import { Blog } from '../lib/dal';
import prisma from '@/modules/core/lib/prisma';

export const getPosts = async () => {
  try {
    const {
      isAuthenticated,
      user: { id },
    } = await _verifySession();

    if (!isAuthenticated) {
      throw new Error('Unauthenticated');
    }

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    console.log('admin', { user });

    if (user?.role !== 'ADMIN') {
      throw new Error('Unauthorized');
    }

    const result = await Blog.getPosts(id);

    if (!result.success) {
      throw new Error(result.errors?.toString());
    }

    return result.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};
