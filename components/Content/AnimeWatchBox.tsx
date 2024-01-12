'use client'

import React, { FC } from 'react'

import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import VideoPlayer from './VideoPlayer/VideoPlayer'

type IProps = {
  isOpen: boolean
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>
  content: {
    animeId: string,
    id: string,
    url: string
  }
  history?: string
}

const AnimeWatchBox: FC<IProps> = ({
  isOpen,
  onOpenChange,
  content,
  history
}) => {
  let currentTime: string | undefined | null = history
  if (!history) {
    currentTime = localStorage.getItem(`anime-${content.animeId}-${content.id}`);
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={onOpenChange}
    >
      <DialogContent
        className="bg-background max-w-[97%] lg:w-fit rounded-lg overflow-hidden p-0"
      >
        <VideoPlayer
          {...content}
          history={currentTime}
          onOpenChange={onOpenChange}
        />
      </DialogContent>
    </Dialog>

  )
}

export default AnimeWatchBox