"use server";

import { revalidatePath } from "next/cache";
import { Auth } from "../lib/dal";
import { UserCreateInput } from "../types";
import { redirect } from "next/navigation";
import { SignUpSchema } from "../lib/definitions";

export const signUp = async (user: UserCreateInput) => {
  const validation = SignUpSchema.safeParse(user);

  if (!validation.success) {
    const errors = validation.error.errors.map(({ message, path }) => `${path}: ${message}`);

    return { success: false, errors };
  }

  const result = await Auth.signUp(user);

  if (result.success) {
    revalidatePath("/portal");
    redirect("/portal");
  }

  return result;
};
