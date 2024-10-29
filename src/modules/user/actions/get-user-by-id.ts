'use server';

import { User } from "../lib/dal";

export const getUserById = async () => {
    const user = await User.getUser();

    return user;
}