import "server-only";

import { authorization } from "@/modules/auth/lib/decorators";
import prisma from "@/modules/core/lib/prisma";
import { PostCategory, Prisma } from "@prisma/client";
import { cache } from "react";
import { AuthError } from "@/modules/auth/errors/auth_error";
import { slugify } from "@/modules/core/lib/slugify";

class Blog {
  @authorization("ADMIN")
  static async getPosts(adminId: string) {
    try {
      const posts = await prisma.post.findMany({
        where: {
          authorId: adminId,
        },
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          title: true,
          content: true,
          category: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      if (!posts) {
        return {
          success: false,
          errors: "Error getting posts",
          data: null,
        };
      }

      return {
        success: true,
        errors: null,
        data: posts,
      };
    } catch {
      throw new Error("Ups, something went wrong...");
    }
  }

  @authorization("ADMIN")
  static async createPost(data: Omit<Prisma.PostCreateInput, "slug">) {
    const slug = slugify(data.title);

    try {
      const post = await prisma.post.create({
        data: {
          ...data,
          slug,
        },
      });

      if (!post) {
        return {
          success: false,
          errors: "Error creating post",
          data: null,
        };
      }

      return {
        success: true,
        errors: null,
        data: post,
      };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new Error(
          "Ups, it seems that the post already exists with a unique value",
        );
      }
      throw new Error("Ups, something went wrong...");
    }
  }

  @authorization("ADMIN")
  static async deletePost(adminId: string, id: string) {
    try {
      const post = await prisma.post.findFirst({
        where: {
          authorId: adminId,
        },
        select: { id: true },
      });

      if (!post) {
        throw new AuthError(
          "You don't have permission to delete this post",
          401,
        );
      }

      await prisma.post.delete({
        where: {
          id,
        },
        select: {
          id: true,
          title: true,
          author: {
            select: {
              id: true,
              fullname: true,
            },
          },
        },
      });

      return {
        success: true,
        errors: null,
        data: "Post deleted successfully",
      };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return {
          success: false,
          errors: "An error occurred while deleting the post.",
          data: null,
        };
      } else if (error instanceof AuthError) {
        return {
          success: false,
          errors: error.message,
          data: null,
        };
      } else if (error instanceof Error) {
        return {
          success: false,
          errors: error.message,
          data: null,
        };
      }
      throw new Error("Ups, something went wrong...");
    }
  }

  @authorization("ADMIN")
  static async filterPosts(
    adminId: string,
    {
      search,
      category,
    }: {
      search?: string;
      category?: PostCategory;
    },
  ) {
    try {
      const posts = await prisma.post.findMany({
        where: {
          authorId: adminId,
          AND: [
            {
              OR: [
                {
                  title: { startsWith: search, mode: "insensitive" },
                },
                {
                  id: { startsWith: search, mode: "insensitive" },
                },
              ],
            },
            category ? { category } : undefined,
          ].filter(Boolean) as [],
        },
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          title: true,
          content: true,
          category: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      if (!posts) {
        return {
          success: false,
          errors: "Error getting posts",
          data: null,
        };
      }

      return {
        success: true,
        errors: null,
        data: posts,
      };
    } catch {
      throw new Error("Ups, something went wrong...");
    }
  }
}

Blog.getPosts = cache(Blog.getPosts);
Blog.createPost = cache(Blog.createPost);
Blog.filterPosts = cache(Blog.filterPosts);

export { Blog };
