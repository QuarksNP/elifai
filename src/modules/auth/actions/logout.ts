"use server";

import { revalidatePath } from "next/cache";
import { destroySession } from "../lib/session";
import { redirect } from "next/navigation";

export const logout = async () => {
    await destroySession();
    revalidatePath("/");
    redirect("/");
}
