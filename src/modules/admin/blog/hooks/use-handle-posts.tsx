import { useContext, useEffect } from "react";
import { Post, PostHandlerContext } from "../context/post-handler";

import { useEditor } from "@tiptap/react";
import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import Heading from '@tiptap/extension-heading'
import StarterKit from '@tiptap/starter-kit'
import HardBreak from "@tiptap/extension-hard-break";
import Placeholder from '@tiptap/extension-placeholder'
import { cn } from "@/modules/core/lib/cn";

const extensions = [
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    TextStyle.configure(),
    Placeholder.configure({
        placeholder: "Edit the content of your post here with differenct styles and formatting...",
    }),
    HardBreak.configure({
        HTMLAttributes: {
            class: "break-all"
        },
        keepMarks: false,
    }),
    StarterKit.configure({
        bulletList: {
            keepMarks: true,
            keepAttributes: false,
        },
        orderedList: {
            keepMarks: true,
            keepAttributes: false,
        },
    }),
    Heading.configure({
        levels: [1, 2, 3, 4]
    })
];

export const useHandlePosts = () => {
    const { post, errors, step, setPost, setSteps, isSuccess } = useContext(PostHandlerContext);

    const editor = useEditor({
        extensions,
        content: post.content.html,
        editorProps: {
            attributes: {
                class: cn("bg-popover p-4 rounded-xl outline-none focus:outline-primary focus:outline-offset-2 h-96 overflow-auto", {
                    "outline-destructive/50 focus:outline-destructive": errors.content
                }),
            },
            handleKeyDown: (_, event) => {
                if (event.key === 'Enter') {
                    event.preventDefault();
                    editor?.commands.setHardBreak();
                    return true;
                }
                return false;
            }
        },
        onUpdate: ({ editor }) => {
            setPost({ content: { html: editor.getHTML(), text: editor.getText() } } as Post);
        },
    })

    useEffect(() => {
        if (!isSuccess) {
            setSteps(0);
        }
    }, [isSuccess]);

    function handlePost({ key, value }: { key: "title" | "category", value: string }) {
        if (!value) {
            return;
        }

        setPost({ [key]: value } as unknown as Post);
    }

    function handleSteps({ next = false, previous = false }: { next?: boolean, previous?: boolean }) {
        if (next) {
            setSteps(step + 1);
        } else if (previous) {
            setSteps(step - 1);
        }
    }

    return {
        handlePost,
        handleSteps,
        editor,
        errors,
        isSuccess,
        post,
        currentStep: step,
    }
}