"use server";

import { revalidatePath } from "next/cache";
import { Auth } from "../lib/dal";

import type { SignInRequest } from "../types";
import { redirect } from "next/navigation";
import { SignInSchema } from "../lib/definitions";

export const signIn = async (user: SignInRequest) => {
  const validation = SignInSchema.safeParse(user);

  if (!validation.success) {
    return { success: false, errors: "Invalid credentials" };
  }

  const result = await Auth.signIn(user);

  if (result.success) {
    revalidatePath("/portal");
    redirect("/portal");
  }

  return result;
};
