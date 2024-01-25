import React, { useMemo } from "react";
import { generateHTML } from '@tiptap/html'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Heading from '@tiptap/extension-heading'
import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'
import Blockquote from '@tiptap/extension-blockquote'
import ListItem from '@tiptap/extension-list-item'
import OrderedList from '@tiptap/extension-ordered-list'
import Strike from '@tiptap/extension-strike'
import Typography from '@tiptap/extension-typography'
import HardBreak from '@tiptap/extension-hard-break'
import { default as TiptapImage } from '@tiptap/extension-image'

type IDescription = {
  content:
  | {
    type: string;
    content: any[];
  };
  className?: string
  fontSize?: "text-sm" | "text-base" | "text-xs"
};

const RenderEditorContent: React.FC<IDescription> = ({ content, className, fontSize }) => {
  const output = useMemo(() => {
    return generateHTML(content, [
      Document.configure({
        HTMLAttributes: {
          class: fontSize ? fontSize : "text-base min-h-[24px] select-none",
        }
      }),
      Paragraph.configure({
        HTMLAttributes: {
          class: fontSize ? fontSize : "text-base min-h-[24px] select-none",
        }
      }),
      Text.configure({
        HTMLAttributes: {
          class: fontSize ? fontSize : "text-base min-h-[24px] select-none",
        }
      }),
      Typography,
      HardBreak,
      Heading.configure({
        HTMLAttributes: {
          class: "text-xl font-bold select-none",
          level: [2]
        }
      }),
      Bold.configure({
        HTMLAttributes: {
          class: "font-bold select-none",
        }
      }),
      Italic.configure({
        HTMLAttributes: {
          class: "italic select-none",
        }
      }),
      Blockquote.configure({
        HTMLAttributes: {
          class: "border-l-2 pl-4 ml-5 select-none"
        }
      }),
      ListItem.configure({
        HTMLAttributes: {
          class: "ml-5 select-none"
        }
      }),
      OrderedList,
      Strike.configure({
        HTMLAttributes: {
          class: "line-through"
        }
      }),
      TiptapImage.configure({
        inline: false,
        HTMLAttributes: {
          class: "mx-auto rounded-lg object-cover max-w-[70%] select-none"
        }
      })
    ])
  }, [content, fontSize])

  return (
    <div className={`${className ? className : ""} w-full max-w-[1300px] m-auto`} dangerouslySetInnerHTML={{ __html: output || '' }} />
  );
};

export default React.memo(RenderEditorContent);