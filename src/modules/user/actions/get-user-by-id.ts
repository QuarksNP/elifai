"use server";

import { User } from "../lib/dal";
import { _verifySession } from "@/modules/auth/lib/dal";

export const getUserById = async () => {
  const { userId } = await _verifySession();

  const user = await User.getUser(userId);

  return user;
};
