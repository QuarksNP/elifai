'use client'

import { Icon } from "@/modules/core/components/ui/icon";
import { useHandlePosts } from "../hooks/use-handle-posts";
import { Badge } from "@/modules/core/components/ui/badge";
import { Card } from "@/modules/core/components/ui/card";
import { Blockquote } from "@/modules/core/components/ui/blockquote";

export const PostPreview = () => {
    const { post: { title, content, category } } = useHandlePosts();

    const formattedCategory = (category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()).replaceAll('_', ' ');

    return (
        <Card className="border-0 bg-transparent md:bg-card md:border md:border-border md:space-y-8 md:p-8">
            <div className="flex flex-col gap-8 grow overflow-auto max-w-screen-md w-full mx-auto">
                <Blockquote className="text-sm text-muted-foreground rounded">Make sure to preview your post before publishing</Blockquote>
                <header className="space-y-2">
                    <h2 className="text-3xl font-bold">{title}</h2>
                    <div className="flex items-center">
                        <time className="text-muted-foreground">{new Date().toDateString()}</time>
                        <Icon name="Dot" />
                        <Badge>{formattedCategory}</Badge>
                    </div>
                </header>

                <div dangerouslySetInnerHTML={{ __html: content.html }} />
            </div>
        </Card>
    )
}