import "server-only";

import { authorization } from "@/modules/auth/lib/decorators";
import prisma from "@/modules/core/lib/prisma";
import { Prisma } from "@prisma/client";
import { cache } from "react";

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
  static async createPost(data: Prisma.PostCreateInput) {
    try {
      const post = await prisma.post.create({
        data,
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
          "Ups, it seems that the post already exists with a unique value"
        );
      }
      throw new Error("Ups, something went wrong...");
    }
  }
}

Blog.getPosts = cache(Blog.getPosts);
Blog.createPost = cache(Blog.createPost);

export { Blog };
