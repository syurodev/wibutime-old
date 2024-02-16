import React, { FC } from 'react'

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import FormUploadLightnovelVolume from './Lightnovel/FormUploadLightnovelVolume'
import FormCreateAnimeSeason from './Anime/FormCreateAnimeSeason'

type IProps = {
  isOpen: boolean
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>
  type: ContextMenu
  id: string
  name: string
}

const UploadSeasonOrVolumeWrapper: FC<IProps> = ({
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
        <DrawerHeader className='max-w-[1300px] mx-auto'>
          <DrawerTitle>{name}</DrawerTitle>
          <DrawerDescription className={`uppercase text-${type} text-xs font-medium text-center`}>{type}</DrawerDescription>
        </DrawerHeader>
        <div className='h-full w-full max-w-[1300px] overflow-y-auto px-2 mx-auto mb-5 showScroll'>
          {
            type === "lightnovel" && (
              <FormUploadLightnovelVolume id={id} onOpenChange={onOpenChange} />
            )
          }
          {
            type === "anime" && (
              <FormCreateAnimeSeason id={id} onOpenChange={onOpenChange} />
            )
          }

        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default UploadSeasonOrVolumeWrapper