"use server";

import { AuthError } from "@/modules/auth/errors/auth_error";
import { _verifySession } from "@/modules/auth/lib/dal";
import { Blog } from "../lib/dal";
import { PostCategory } from "@prisma/client";

export const filterPosts = async ({
  search,
  category,
}: {
  search?: string;
  category?: PostCategory;
}) => {
  const session = await _verifySession();

  if (!session.isAuthenticated) {
    throw new AuthError("You must be logged in to perform this action", 401);
  }

  const result = await Blog.filterPosts(session.userId, {
    search,
    category,
  });

  if (!result.success) {
    throw new Error(result.errors?.toString());
  }

  return result.data;
};
