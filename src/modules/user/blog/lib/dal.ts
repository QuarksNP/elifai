import 'server-only';

import { AuthError } from '@/modules/auth/errors/auth_error';
import { authorization } from '@/modules/auth/lib/decorators';
import prisma from '@/modules/core/lib/prisma';
import { Prisma } from '@prisma/client';
import { cache } from 'react';

class Blog {
  @authorization('USER')
  static async getPosts() {
    try {
      const posts = await prisma.post.findMany({
        select: {
          id: true,
          title: true,
          content: true,
          createdAt: true,
          category: true,
          slug: true,
          author: {
            select: {
              fullname: true,
            },
          },
        },
      });

      if (!posts) {
        return {
          success: false,
          errors: 'Error getting posts',
          data: null,
        };
      }

      return { success: true, errors: null, data: posts };
    } catch (error) {
      if (error instanceof AuthError) {
        return {
          success: false,
          errors: error.message,
          data: null,
        };
      } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return {
          success: false,
          errors: error.message,
          data: null,
        };
      }

      throw new Error('Ups, something went wrong...');
    }
  }
  @authorization('USER')
  static async getPostBySlug(slug: string) {
    try {
      const post = await prisma.post.findUnique({
        where: {
          slug,
        },
      });

      if (!post) {
        return {
          success: false,
          errors: 'Error getting post',
          data: null,
        };
      }

      return { success: true, errors: null, data: post };
    } catch (error) {
      if (error instanceof AuthError) {
        return {
          success: false,
          errors: error.message,
          data: null,
        };
      } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return {
          success: false,
          errors: error.message,
          data: null,
        };
      }

      throw new Error('Ups, something went wrong...');
    }
  }
}

Blog.getPosts = cache(Blog.getPosts);
Blog.getPostBySlug = cache(Blog.getPostBySlug);

export { Blog };
