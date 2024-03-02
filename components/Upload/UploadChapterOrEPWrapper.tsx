import React, { FC } from 'react'
import dynamic from 'next/dynamic'

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"

const FormUploadEpisode = dynamic(() => import('@/components/Upload/Anime/FormUploadEpisode'), {
  ssr: true
})
const FormUploadLightnovelChapter = dynamic(() => import('@/components/Upload/Lightnovel/FormUploadLightnovelChapter'), {
  ssr: true,
})

type IProps = {
  isOpen: boolean
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>
  type: ContextMenu
  id: string
  name: string
}

const UploadChapterOrEPWrapper: FC<IProps> = ({
  isOpen,
  onOpenChange,
  type,
  id,
  name,
}) => {

  return (
    <Drawer
      onOpenChange={onOpenChange}
      open={isOpen}
    >
      <DrawerContent className="max-h-[98%] h-fit overflow-y-hidden">
        <DrawerHeader className='max-w-[1300px] mx-auto'>
          <DrawerTitle>{name}</DrawerTitle>
          <DrawerDescription className={`uppercase text-${type} text-xs font-medium text-center`}>{type}</DrawerDescription>
        </DrawerHeader>
        <div className='h-full w-full max-w-[1300px] overflow-y-auto px-2 mx-auto mb-5 showScroll'>
          {
            (type === "lightnovel" || type === "lightnovel volume") &&
            <FormUploadLightnovelChapter novelId={id} onOpenChange={onOpenChange} open={isOpen} />
          }
          {
            (type === "anime" || type === "anime season") &&
            <FormUploadEpisode animeId={id} onOpenChange={onOpenChange} type={type} seasonId={id} />
          }
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default UploadChapterOrEPWrapper