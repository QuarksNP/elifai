'use client'

import { PostHandlerProvider } from "@/modules/admin/blog/context/post-handler";

export const BlogProvider = ({ children }: { children: React.ReactNode }) => {
    return <PostHandlerProvider>{children}</PostHandlerProvider>;
};