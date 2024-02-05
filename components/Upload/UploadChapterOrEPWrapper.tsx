import React, { FC } from 'react'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import FormUploadLightnovelChapter from './Lightnovel/FormUploadLightnovelChapter'
import FormUploadEpisode from './Anime/FormUploadEpisode'
import styles from "./style.module.scss"

type IProps = {
  isOpen: boolean
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>
  type: ContentType
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
      <DrawerContent className={`${styles.showScroll} max-h-[98%] h-fit overflow-y-hidden`}>
        <DrawerHeader className='max-w-[1300px] mx-auto'>
          <DrawerTitle>{name}</DrawerTitle>
          <DrawerDescription className={`uppercase text-${type} text-xs font-medium text-center`}>{type}</DrawerDescription>
        </DrawerHeader>
        <div className='h-full w-full max-w-[1300px] overflow-y-auto px-2 mx-auto mb-5'>
          {
            type === "lightnovel" &&
            <FormUploadLightnovelChapter novelId={id} onOpenChange={onOpenChange} />
          }
          {
            type === "anime" &&
            <FormUploadEpisode animeId={id} onOpenChange={onOpenChange} />
          }
        </div>
      </DrawerContent>
    </Drawer>

  )
}

export default UploadChapterOrEPWrapper