'use client'
import React, { FC } from 'react'
import { useEditor, EditorContent, JSONContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Heading from '@tiptap/extension-heading'
import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'
import Blockquote from '@tiptap/extension-blockquote'
import ListItem from '@tiptap/extension-list-item'
import OrderedList from '@tiptap/extension-ordered-list'
import Strike from '@tiptap/extension-strike'

import Toolbar from './Toolbar'

type IProps = {
  content: string,
  onChange: (richText: JSONContent) => void
}

const TiptapEditor: FC<IProps> = ({
  content,
  onChange,
}) => {

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
      }),
      Heading.configure({
        HTMLAttributes: {
          class: "text-xl font-bold",
          level: [2]
        }
      }),
      Bold.configure({
        HTMLAttributes: {
          class: "font-bold",
        }
      }),
      Italic.configure({
        HTMLAttributes: {
          class: "italic",
        }
      }),
      Blockquote.configure({
        HTMLAttributes: {
          class: "border-l-2 pl-4 ml-5"
        }
      }),
      ListItem.configure({
        HTMLAttributes: {
          class: "ml-5"
        }
      }),
      OrderedList,
      Strike.configure({
        HTMLAttributes: {
          class: "line-through"
        }
      }),
    ],
    content: content,
    editorProps: {
      attributes: {
        class: "rounded-lg border min-h-[200px] border-input bg-background p-2"
      }
    },
    onUpdate({ editor }) {
      console.log(editor.getJSON())
      onChange(editor.getJSON())
    }
  })

  return (
    <div>
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  )
}

export default TiptapEditor