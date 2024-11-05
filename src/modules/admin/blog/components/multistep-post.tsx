'use client';

import { useHandlePosts } from "../hooks/use-handle-posts";
import { PostContentEditor } from "./post-content-editor";
import { PostPreview } from "./post-preview";
import { PostHeader } from "./post-header";
import { PublishPost } from "./publish-post";

export const MultistepPost = () => {
    const { currentStep, post } = useHandlePosts();

    console.log(post.title)

    if (currentStep === 0) {
        return (
            <>
                <PostHeader />
                <PostContentEditor />
            </>
        )
    } else if (currentStep === 1) {
        return (
            <PostPreview />
        )
    } else if (currentStep === 2) {
        return (
            <PublishPost />
        )
    }

    return null;
};