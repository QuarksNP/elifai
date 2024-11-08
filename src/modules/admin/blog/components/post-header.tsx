'use client'

import { Input } from "@/modules/core/components/ui/input"
import { useHandlePosts } from "../hooks/use-handle-posts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/modules/core/components/ui/select";
import { POST_CATEGORIES } from "../lib/constants/post-categories";
import { cn } from "@/modules/core/lib/cn";
import { Blockquote } from "@/modules/core/components/ui/blockquote";

export const PostHeader = () => {
    const { handlePost, errors, post: { title, category } } = useHandlePosts();

    return (
        <header className="grid gap-4 items-center md:grid-cols-[1fr_40%]">
            <div className="space-y-2">
                <Input
                    name="title"
                    placeholder="Your post title..."
                    defaultValue={title}
                    onChange={(e) => handlePost({ key: "title", value: e.currentTarget.value })}
                    containerClassName={cn({
                        "border-destructive/50 has-[:focus]:border-destructive": errors?.title
                    })}
                />
                <Blockquote className="text-sm text-muted-foreground rounded">Your tittle need to be at least 5 characters long</Blockquote>
            </div>
            <Select
                name="category"
                defaultValue={category}
                onValueChange={(value) => handlePost({ key: "category", value })}
            >
                <div className="space-y-2">
                    <SelectTrigger className="md:self-start md:py-0 md:px-3">
                        <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <Blockquote className="text-sm text-muted-foreground rounded">You must select a category for your post</Blockquote>
                </div>
                <SelectContent>
                    {POST_CATEGORIES.map((category) => {
                        const formattedCategory = (category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()).replaceAll('_', ' ');

                        return (
                            <SelectItem
                                key={category}
                                value={category}
                            >
                                {formattedCategory}
                            </SelectItem>
                        )
                    })}
                </SelectContent>
            </Select>
        </header>
    )
}