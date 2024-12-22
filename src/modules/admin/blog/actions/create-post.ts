'use server';

import { PostCategory } from '@prisma/client';
import { PostSchema } from '../lib/definitions';
import { Blog } from '../lib/dal';
import { revalidatePath } from 'next/cache';
import { _verifySession } from '@/modules/auth/lib/dal';

export const createPost = async (post: {
  title: string;
  content: string;
  category: PostCategory;
}) => {
  const {
    isAuthenticated,
    user: { id },
  } = await _verifySession();

  if (!isAuthenticated) {
    return {
      success: false,
      errors: 'You need to be authenticated to create a post',
    };
  }

  const validation = PostSchema.safeParse(post);

  if (!validation.success) {
    return { success: false, errors: validation.error.flatten().fieldErrors };
  }

  const result = await Blog.createPost({
    ...post,
    author: {
      connect: { id },
    },
  });

  if (result.success) {
    revalidatePath('/portal/blog');
  }

  return result;
};
