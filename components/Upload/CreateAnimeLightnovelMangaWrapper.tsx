"use client"

import React, { FC, useEffect, useState, useTransition } from 'react'
import { toast } from 'sonner'
import { ReloadIcon } from '@radix-ui/react-icons'
import { v4 as uuid } from "uuid";

import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from '@/components/ui/drawer'

import FormCreateLightnovel from './Lightnovel/FormCreateLightnovel'
import { getAllCategories } from '@/actions/categories'
import { LightnovelSchema } from '@/schemas/lightnovel'
import { getLightnovel } from '@/actions/lightnovel'

type IProps = {
  isOpen: boolean
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>
  type: ContextMenu
  id: string
  name: string
  edit?: boolean
}

const CreateAnimeLightnovelMangaWrapper: FC<IProps> = ({
  isOpen,
  onOpenChange,
  type,
  id,
  name,
  edit,
}) => {
  const [categories, setCategories] = useState<{
    id: string;
    name: string;
  }[]>([])
  const [content, setContent] = useState<LightnovelSchema | undefined>(undefined)
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    startTransition(async () => {
      if (isOpen) {
        const cate = await getAllCategories()

        if (cate.code === 200) {
          setCategories(cate.data ?? [])
        } else {
          toast.error("Có lỗi trong quá trình lấy danh sách thể loại")
          onOpenChange(false)
        }

        const content = await getLightnovel(id)

        if (content.code !== 200) {
          toast.error(content.message)
          onOpenChange(false)
        } else {
          const data: LightnovelSchema = {
            name: content.data?.name!,
            author: content.data?.author!,
            categories: content.data?.categories.map(cate => cate.category)!,
            other_names: content.data?.otherNames.map(name => ({
              id: uuid(),
              text: name
            }))! as [{ id: string; text: string; }],
            summary: content.data?.summary! as { type: string; content: any[]; },
            note: content.data?.note! as { type: string; content: any[]; },
            artist: content.data?.artist!,
            image: content.data?.image! as {
              key: string,
              url: string
            },
          }

          setContent(data)
        }
      }
    })
  }, [id, isOpen, onOpenChange])

  return (
    <Drawer
      onOpenChange={onOpenChange}
      open={isOpen}
    >
      <DrawerContent className="max-h-[98%] h-fit overflow-y-hidden !border-none">
        {
          isPending ? (
            <ReloadIcon className="h-4 w-4 animate-spin mx-auto mt-2" />
          ) : (
            <>
              <DrawerHeader className='max-w-[1300px] mx-auto'>
                <DrawerTitle>{name}</DrawerTitle>
                <DrawerDescription className={`uppercase text-${type} text-xs font-medium text-center`}>{type}</DrawerDescription>
              </DrawerHeader>
              <div className='h-full w-full max-w-[1300px] overflow-y-auto px-2 mx-auto mb-5 showScroll'>
                {
                  (type === "lightnovel") &&
                  <FormCreateLightnovel categories={categories} content={content} edit={edit} novelId={id} />
                }
                {
                  (type === "anime" || type === "anime season") &&
                  <></>
                }
              </div>
            </>
          )
        }
      </DrawerContent>
    </Drawer>
  )
}

export default CreateAnimeLightnovelMangaWrapper