"use server";

import { AuthError } from "../errors/auth_error";
import { _verifySession } from "../lib/dal";

export const checkUserRole = async () => {
  const {
    isAuthenticated,
    user: { role },
  } = await _verifySession();

  if (!isAuthenticated) {
    throw new AuthError("Unauthenticated", 401);
  }

  return role;
};
