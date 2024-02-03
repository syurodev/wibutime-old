'use client'
import React, { FC, useEffect, useState } from 'react'
import { useEditor, EditorContent, JSONContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Heading from '@tiptap/extension-heading'
import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'
import Blockquote from '@tiptap/extension-blockquote'
import ListItem from '@tiptap/extension-list-item'
import OrderedList from '@tiptap/extension-ordered-list'
import Strike from '@tiptap/extension-strike'
import CharacterCount from '@tiptap/extension-character-count'
import Typography from '@tiptap/extension-typography'
import { default as TiptapImage } from '@tiptap/extension-image'

import Toolbar from './Toolbar'
import { toast } from 'sonner'
import { compressImage } from '@/lib/compressImage'
import { uploadFiles } from '@/lib/uploadthing'

type IProps = {
  content: string,
  onChange: (richText: JSONContent) => void
  id?: string
  setWords?: React.Dispatch<React.SetStateAction<number>>
}

const TiptapEditor: FC<IProps> = ({
  content,
  onChange,
  id,
  setWords
}) => {
  const [imageUpload, setImageUpload] = useState<boolean>(false)
  const [historyData, setHistoryData] = useState<any>("")

  useEffect(() => {
    if (id) {
      const history = localStorage.getItem(`editor-new-content-${id}`)
      setHistoryData(history ? JSON.parse(history) : "")
    }
  }, [id])

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
        bold: false,
        italic: false,
        blockquote: false,
        listItem: false,
        orderedList: false,
        strike: false
      }),
      Typography,
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
      CharacterCount,
      Strike.configure({
        HTMLAttributes: {
          class: "line-through"
        }
      }),
      TiptapImage.configure({
        inline: false,
        HTMLAttributes: {
          class: "mx-auto rounded-lg object-cover max-w-[70%]"
        }
      })
    ],
    content: historyData || content,
    editorProps: {
      attributes: {
        class: "rounded-lg border min-h-[400px] max-h-[700px] overflow-y-auto border-input bg-background p-2"
      },
      handleDrop: function (view, event, slice, moved) {
        if (!moved && event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files[0]) {
          let file = event.dataTransfer.files;
          let filesize = ((file[0].size / 1024) / 1024).toFixed(4);
          console.log(file[0].type)
          if (file[0].type.startsWith("image/") && +filesize < 5) {
            let _URL = window.URL || window.webkitURL;
            let img: HTMLImageElement = new Image();
            img.src = _URL.createObjectURL(file[0]);
            img.onload = async () => {
              if (img.width > 5000 || img.height > 5000) {
                toast.error("Vui lòng chọn hình ảnh có kích thước dưới 5000x5000")
              } else {
                const coordinates = view.posAtCoords({ left: event.clientX, top: event.clientY });

                if (!coordinates) {
                  toast.error("Có lỗi xảy ra vui lòng thử lại")
                  return
                }

                setImageUpload(true)
                const result = await compressImage(
                  file, 0.8
                )

                const [res] = await uploadFiles('smallImage', { files: [result] })
                setImageUpload(false)

                const { schema } = view.state;
                const node = schema.nodes.image.create({ src: res.url });
                const transaction = view.state.tr.insert(coordinates.pos, node);
                return view.dispatch(transaction);
              }
            };
          } else {
            toast.error("Vui lòng chọn hình ảnh dưới 5mb");
          }
          return true;
        }
        return false;
      }
    },
    onUpdate({ editor }) {
      if (id) {
        localStorage.setItem(`editor-new-content-${id}`, JSON.stringify(editor.getJSON()))
      }
      setWords && setWords(editor.storage.characterCount.words())
      onChange(editor.getJSON())
    }
  })

  return (
    <div>
      <Toolbar editor={editor} imageUpload={imageUpload} />
      <EditorContent editor={editor} />
    </div>
  )
}

export default TiptapEditor