"use server";

import { revalidatePath } from "next/cache";
import { Auth } from "../dal/auth";
import { UserCreateInput } from "../types";
import { redirect } from "next/navigation";

export const signUp = async (user: UserCreateInput) => {
  const result = await Auth.signUp(user);

  if (result.success) {
    revalidatePath("/dashboard");
    redirect("/dashboard");
  }

  return result;
};
