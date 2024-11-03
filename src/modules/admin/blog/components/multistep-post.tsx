'use client';

import { useHandlePosts } from "../hooks/use-handle-posts";
import { PostContentEditor } from "./post-content-editor";
import { PostTitle } from "./post-title";

export const MultistepPost = () => {
    const { currentStep } = useHandlePosts();

    console.log(currentStep);

    if (currentStep === 0) {
        return (
            <>
                <PostTitle />
                <PostContentEditor />
            </>
        )
    }

    return null;
};