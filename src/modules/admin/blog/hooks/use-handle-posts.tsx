import { useContext } from "react";
import { PostHandlerContext } from "../context/post-handler";

import { useEditor } from "@tiptap/react";
import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import Heading from '@tiptap/extension-heading'
import StarterKit from '@tiptap/starter-kit'
import HardBreak from "@tiptap/extension-hard-break";
import Placeholder from '@tiptap/extension-placeholder'

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
    const { content, title, step, setTitle, setContent, setSteps } = useContext(PostHandlerContext);

    const editor = useEditor({
        extensions,
        editorProps: {
            attributes: {
                class: "bg-popover p-4 rounded-xl outline-none focus:outline-primary focus:outline-offset-2 max-h-96 overflow-auto",
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
            setContent(editor.getHTML());
        },
    })

    function handleTitle(title: string) {
        setTitle(title);
    }

    function handleSteps({ next = false, previous = false }: { next?: boolean, previous?: boolean} ) {

        if (next) {
            setSteps(step + 1);
        } else if (previous) {
            setSteps(step - 1);
        }
    }

    return {
        handleTitle,
        handleSteps,
        title,
        content,
        editor,
        currentStep: step,
    }
}