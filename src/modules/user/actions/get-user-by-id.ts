"use server";

import { AuthError } from "@/modules/auth/errors/auth_error";
import { User } from "../lib/dal";
import { _verifySession } from "@/modules/auth/lib/dal";

export const getUserById = async () => {
  const { isAuthenticated, userId } = await _verifySession();

  if (!isAuthenticated) {
    throw new AuthError("You have no permisson to this action", 401);
  }

  const user = User.getUser(userId);

  return user;
};
