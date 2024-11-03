'use client'

import { Input } from "@/modules/core/components/ui/input"
import { useHandlePosts } from "../hooks/use-handle-posts";
import { Card } from "@/modules/core/components/ui/card";

export const PostTitle = () => {
    const { handleTitle } = useHandlePosts();

    return (
        <Card className="p-4 space-y-4">
            <h2 className="text-3xl">Title</h2>
            <Input
                placeholder="Enter the title of the post..."
                containerClassName="border-x-0 border-t-0 border-b-input"
                onChange={(e) => handleTitle(e.target.value)}
            />
        </Card>
    )
}