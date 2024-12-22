import { useContext, useEffect, useState } from 'react';
import { Post, PostHandlerContext } from '../context/post-handler';

import { Extension, useEditor } from '@tiptap/react';
import { Color } from '@tiptap/extension-color';
import ListItem from '@tiptap/extension-list-item';
import TextStyle from '@tiptap/extension-text-style';
import Heading from '@tiptap/extension-heading';
import StarterKit from '@tiptap/starter-kit';
import HardBreak from '@tiptap/extension-hard-break';
import Placeholder from '@tiptap/extension-placeholder';
import Document from '@tiptap/extension-document';
import { cn } from '@/modules/core/lib/cn';
import { createPost } from '../actions/create-post';
import { toast } from 'sonner';
import Paragraph from '@tiptap/extension-paragraph';

const KeyboardHandler = Extension.create({
  name: 'keyboardHandler',
});

const extensions = [
  Document,
  Paragraph,
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
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure(),
  Placeholder.configure({
    placeholder:
      'Edit the content of your post here with differenct styles and formatting...',
  }),
  HardBreak.configure({
    HTMLAttributes: {
      class: 'break-all',
    },
    keepMarks: false,
  }),
  Heading.configure({
    levels: [1, 2, 3, 4],
  }),
  KeyboardHandler.extend({
    addKeyboardShortcuts() {
      return {
        Enter: () => {
          return this.editor.commands.first(({ commands }) => [
            () => commands.newlineInCode(),
            () => commands.createParagraphNear(),
            () => commands.liftEmptyBlock(),
            () => commands.splitBlock(),
          ]);
        },
      };
    },
  }),
];

export const useHandlePosts = () => {
  const { post, errors, step, setPost, setSteps, setReset, isSuccess } =
    useContext(PostHandlerContext);

  const editor = useEditor({
    extensions,
    content: post.content.html,
    editorProps: {
      attributes: {
        class: cn(
          'bg-popover p-4 rounded-xl outline-none focus:outline-primary focus:outline-offset-2 h-96 overflow-auto',
          {
            'outline-destructive/50 focus:outline-destructive': errors?.content,
          },
        ),
      },
      handleKeyDown: (_, event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          editor?.commands.setHardBreak();
          return true;
        }
        return false;
      },
    },
    onUpdate: ({ editor }) => {
      console.log(editor.getHTML());
      setPost({
        ...post,
        content: {
          html: editor.getHTML(),
          text: editor.getText(),
        },
      } as Post);
    },
  });

  const [openDialog, setOpenDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isSuccess) {
      setSteps(0);
    }
  }, [isSuccess]);

  function handlePost({
    key,
    value,
  }: {
    key: 'title' | 'category';
    value: string;
  }) {
    if (!value) {
      return;
    }

    setPost({ ...post, [key]: value } as unknown as Post);
  }

  function handleSteps({
    next = false,
    previous = false,
  }: {
    next?: boolean;
    previous?: boolean;
  }) {
    if (next) {
      setSteps(step + 1);
    } else if (previous) {
      setSteps(step - 1);
    }
  }

  function handleOpenDialog(open: boolean) {
    setOpenDialog(open);
  }

  async function handleSubmit() {
    setIsLoading(true);
    try {
      const result = await createPost({
        ...post,
        content: post.content.html,
      });

      if (result.success === false || result?.errors) {
        toast.error('Validation error', {
          description: errors?.toString(),
          duration: 8000,
        });
      } else {
        toast.success('Your post has been published successfully');
        editor?.destroy();
        setReset();
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message, {
          description: 'Please review your inputs and try again',
          duration: 8000,
        });
        setSteps(0);
      }
    } finally {
      setIsLoading(false);
      setOpenDialog(false);
    }
  }

  return {
    handlePost,
    handleSteps,
    handleSubmit,
    editor,
    errors,
    isLoading,
    isSuccess,
    post,
    handleOpenDialog,
    openDialog,
    currentStep: step,
  };
};
