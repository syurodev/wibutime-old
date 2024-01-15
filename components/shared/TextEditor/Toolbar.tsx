'use client'

import React, { FC } from 'react'
import type { Editor } from '@tiptap/react'
import {
  LuHeading2,
  LuBold,
  LuItalic,
  LuQuote,
  LuList,
  LuListOrdered,
  LuStrikethrough
} from "react-icons/lu"

import { Toggle } from "@/components/ui/toggle"

type IProps = {
  editor: Editor | null
}

const Toolbar: FC<IProps> = ({ editor }) => {
  if (!editor) return null

  return (
    <div className='flex w-full gap-2 items-center'>
      <Toggle
        size={"sm"}
        pressed={editor.isActive("heading", { level: 2 })}
        onPressedChange={() => {
          editor.chain().focus().toggleHeading({ level: 2 }).run()
        }}
      >
        <LuHeading2 />
      </Toggle>

      <Toggle
        size={"sm"}
        pressed={editor.isActive('bold')}
        onPressedChange={() => {
          editor.chain().focus().toggleBold().run()
        }}
      >
        <LuBold />
      </Toggle>

      <Toggle
        size={"sm"}
        pressed={editor.isActive('italic')}
        onPressedChange={() => {
          editor.chain().focus().toggleItalic().run()
        }}
      >
        <LuItalic />
      </Toggle>

      <Toggle
        size={"sm"}
        pressed={editor.isActive('blockquote')}
        onPressedChange={() => {
          editor.chain().focus().toggleBlockquote().run()
        }}
      >
        <LuQuote />
      </Toggle>

      <Toggle
        size={"sm"}
        pressed={editor.isActive('bulletList')}
        onPressedChange={() => {
          editor.chain().focus().toggleBulletList().run()
        }}
      >
        <LuList />
      </Toggle>

      <Toggle
        size={"sm"}
        pressed={editor.isActive('orderedList')}
        onPressedChange={() => {
          editor.chain().focus().toggleOrderedList().run()
        }}
      >
        <LuListOrdered />
      </Toggle>

      <Toggle
        size={"sm"}
        pressed={editor.isActive('strike')}
        onPressedChange={() => {
          editor.chain().focus().toggleStrike().run()
        }}
      >
        <LuStrikethrough />
      </Toggle>

    </div>
  )
}

export default Toolbar