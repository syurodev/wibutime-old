import React, { FC } from 'react'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from '@/components/ui/button'
import FormUploadLightnovelChapter from './FormUploadLightnovelChapter'

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
      <DrawerContent className='max-h-[98%] h-fit overflow-y-hidden'>
        <DrawerHeader>
          <DrawerTitle>{name}</DrawerTitle>
          <DrawerDescription className={`uppercase text-${type} text-xs font-medium`}>{type}</DrawerDescription>
        </DrawerHeader>
        <div className='h-full w-full overflow-y-auto px-2'>
          <FormUploadLightnovelChapter />
        </div>
      </DrawerContent>
    </Drawer>

  )
}

export default UploadChapterOrEPWrapper