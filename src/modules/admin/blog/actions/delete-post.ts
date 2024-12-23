"use server";

import { AuthError } from "@/modules/auth/errors/auth_error";
import { _verifySession } from "@/modules/auth/lib/dal";
import { Blog } from "../lib/dal";
import { revalidatePath } from "next/cache";

export const deletePost = async (id: string) => {
  try {
    const session = await _verifySession();

    if (!session.isAuthenticated) {
      throw new AuthError("You must be logged in to perform this action", 401);
    }

    const result = await Blog.deletePost(session.userId, id);

    if (!result.success) {
      throw new Error("Failed to delete post");
    }

    return result.data;
  } finally {
    revalidatePath("/portal/blog");
  }
};
