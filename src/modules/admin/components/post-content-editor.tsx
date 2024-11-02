'use client'

import { Card } from '@/modules/core/components/ui/card'
import { Icon } from '@/modules/core/components/ui/icon'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/modules/core/components/ui/select'
import { Separator } from '@/modules/core/components/ui/separator'
import { ToggleGroup, ToggleGroupItem } from '@/modules/core/components/ui/toggle-group'
import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import Heading from '@tiptap/extension-heading'
import StarterKit from '@tiptap/starter-kit'
import React from 'react';
import { useChangeText } from '../hooks/use-change-text'
import { type Editor, EditorContent, useEditor } from '@tiptap/react'

const content = `
    <h2>
        Hi there,
    </h2>
    <p>Start writing your post here...</p>
`

const MenuBar = ({ editor }: { editor?: Editor | null }) => {
    const { handleChange, value } = useChangeText(editor);

    if (!editor) {
        return null
    }

    const toggleColor = () => {
        const currentColor = editor.getAttributes('textStyle').color;
        const newColor = currentColor === '#007AFF' ? '#FFFFFF' : '#007AFF';
        editor.chain().focus().setColor(newColor).run();
    };

    return (
        <div className='flex justify-center'>
            <Select onValueChange={handleChange} defaultValue={value}>
                <SelectTrigger className='w-auto border-none bg-transparent p-0'>
                    <SelectValue placeholder="Text" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem
                        value='p'
                    >
                        Paragraph
                    </SelectItem>
                    <SelectItem
                        value='h2'
                    >
                        Header 2
                    </SelectItem>
                    <SelectItem
                        value='h3'
                    >
                        Header 3
                    </SelectItem>
                    <SelectItem
                        value='h4'
                    >
                        Header 4
                    </SelectItem>
                </SelectContent>
            </Select>
            <Separator orientation="vertical" className='h-auto mx-2' />
            <ToggleGroup type="multiple">
                <ToggleGroupItem
                    value='bold'
                    onClick={() => editor.chain().focus().toggleBold().run()}
                >
                    <Icon name="Bold" size={16} />
                </ToggleGroupItem>
                <ToggleGroupItem
                    value='italic'
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                >
                    <Icon name="Italic" size={16} />
                </ToggleGroupItem>
                <ToggleGroupItem
                    value='strikethrough'
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                >
                    <Icon name="Strikethrough" size={16} />
                </ToggleGroupItem>
                <ToggleGroupItem
                    value='code'
                    onClick={() => editor.chain().focus().toggleCode().run()}
                >
                    <Icon name="Code" size={16} />
                </ToggleGroupItem>
                <ToggleGroupItem
                    value='color'
                    onClick={toggleColor}
                >
                    <Icon name="Square" size={16} className='text-primary bg-primary rounded' />
                </ToggleGroupItem>
            </ToggleGroup>
        </div>
    )
}

export const PostContentEditor = () => {
    const extensions = [
        Color.configure({ types: [TextStyle.name, ListItem.name] }),
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


    const editor = useEditor({
        extensions,
        content,
        editorProps: {
            attributes: {
                class: "bg-popover p-4 rounded-xl outline-none focus:outline-primary focus:outline-offset-2 max-h-96 overflow-auto",
            }
        }
    })

    return (
        <Card className='p-4 space-y-4'>
            <h2 className="text-3xl">Content</h2>
            <MenuBar editor={editor} />
            <EditorContent editor={editor} />
        </Card>
    )
};
