"use server";

import { _verifySession } from "@/modules/auth/lib/dal";
import { Blog } from "../lib/dal";

export const getPosts = async () => {
    try {
        const session = await _verifySession();

        if (!session.isAuthenticated) {
            throw new Error("Unauthenticated");
        };

        const result = await Blog.getPosts(session.userId);

        if(!result.success) {
            throw new Error(result.errors?.toString());
        };

        return result.data;

    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        };
    }
};