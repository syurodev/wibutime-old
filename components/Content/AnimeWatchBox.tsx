import React, { FC } from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import VideoPlayer from './VideoPlayer/VideoPlayer'

type IProps = {
  isOpen: boolean
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>
  content: {
    id: string,
    url: string
  }
}

const AnimeWatchBox: FC<IProps> = ({
  isOpen,
  onOpenChange,
  content
}) => {
  return (
    <Dialog
      open={isOpen}
      onOpenChange={onOpenChange}
    >
      <DialogContent
        className="bg-background max-w-[97%] lg:w-fit rounded-lg overflow-hidden p-0"
      >
        <VideoPlayer
          url={content.url}
        />
      </DialogContent>
    </Dialog>

  )
}

export default AnimeWatchBox