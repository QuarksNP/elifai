'use client'

import { Button } from "@/modules/core/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/modules/core/components/ui/dialog"
import { useHandlePosts } from "../hooks/use-handle-posts";

export const PostPreview = () => {
    const { title, content } = useHandlePosts();

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button 
                    className="rounded-xl"
                    disabled={!title || !content}
                >Preview
            </Button>
            </DialogTrigger>
            <DialogContent className="bg-black border border-muted overflow-y-auto max-h-[80%] max-w-[90%]">
                <div className="max-w-screen-sm w-full mx-auto space-y-8">
                    <DialogHeader className="text-start">
                        <DialogTitle className="text-3xl">{title}</DialogTitle>
                        <DialogDescription>Date and time of creation</DialogDescription>
                    </DialogHeader>
                    <div
                        dangerouslySetInnerHTML={{ __html: content }}
                        className="whitespace-pre-line"
                    />
                </div>
            </DialogContent>
        </Dialog>
    )
}