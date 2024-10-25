"use server";

import { revalidatePath } from "next/cache";
import { Auth } from "../dal/auth";

import type { SignInRequest } from "../types";
import { redirect } from "next/navigation";

export const signIn = async (user: SignInRequest) => {
  const result = await Auth.signIn(user)

  if (result.success) {
    revalidatePath("/dashboard");
    redirect("/dashboard");
  }

  return result
};
