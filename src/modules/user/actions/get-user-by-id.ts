'use server';

import { getSession } from "@/modules/auth/lib/session";
import { User } from "../lib/dal";

export const getUserById = async () => {
    const { userId } = await getSession();

    const user = await User.getUser(userId);

    return user;
}