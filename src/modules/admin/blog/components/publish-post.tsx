'use client'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/modules/core/components/ui/card";
import { useHandlePosts } from "../hooks/use-handle-posts";
import { Badge } from "@/modules/core/components/ui/badge";
import { Button } from "@/modules/core/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/modules/core/components/ui/dialog";

export const PublishPost = () => {
    const { post, handleSubmit, openDialog, handleOpenDialog } = useHandlePosts();

    return (
        <Card>
            <CardHeader className="border-b border-border">
                <CardTitle>Publish your post</CardTitle>
                <CardDescription>You are about to publish your post</CardDescription>
            </CardHeader>
            <CardContent className="border-b border-border pt-6">
                <div>
                    <Badge>{post.category}</Badge>
                    <h3>{post.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 max-w-96">{post.content.text}</p>
                </div>
                <time className="text-sm text-muted-foreground mt-4">{new Date().toDateString()}</time>
            </CardContent>
            <CardFooter className="flex items-center justify-end gap-4 p-6">
                <Dialog open={openDialog} onOpenChange={handleOpenDialog}>
                    <DialogTrigger asChild>
                        <Button size="lg" variant="outline">Publish</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Publish your post</DialogTitle>
                            <DialogDescription>Are you sure you want to publish this post?</DialogDescription>
                        </DialogHeader>
                        <DialogFooter className="gap-2">
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="button" onClick={async () => await handleSubmit()}>Publish</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </CardFooter>
        </Card>
    )
};