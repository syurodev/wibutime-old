'use client'

import { FC, useState } from 'react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import Image from 'next/image'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

type IProps = {
  isOpen: boolean
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>
  content: {
    id: string,
    urls: string[]
  }[]
  currentChapterId: string
  history?: string
}

const MangaWatchBox: FC<IProps> = ({
  isOpen,
  onOpenChange,
  content,
  currentChapterId,
  history
}) => {
  // let currentTime: string | undefined | null = history
  // if (!history) {
  //   currentTime = localStorage.getItem(`anime-${content.animeId}-${content.id}`);
  // }

  const [chapter, setChapter] = useState<string>(currentChapterId)

  return (
    <Dialog
      open={isOpen}
      onOpenChange={onOpenChange}
    >
      <DialogContent
        className="bg-background max-w-[1000px] max-h-[98%] h-full rounded-lg p-0 overflow-y-scroll"
      >
        {/* <Carousel
          opts={{
            align: "start",
          }}
          orientation="vertical"
          className="w-full max-w-[1000px] h-full"
        >
          <CarouselContent
            className="-mt-1 h-full"
          >
            {
              content.map(item => {
                if (item.id === chapter) {
                  return item.urls.map((image, index) => {
                    return (
                      <CarouselItem
                        key={`chapter-${item.id}-image${index}`}
                        className="basis-[90%] relative"
                      >
                        <Image
                          src={image}
                          alt=''
                          fill
                          className='object-contain'
                          priority
                        />
                      </CarouselItem>
                    )
                  })
                }
              })
            }
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel> */}

        <div className='flex flex-col items-center'>
          {
            content.map(item => {
              if (item.id === chapter) {
                return item.urls.map((image, index) => {
                  return (
                    <div
                      key={`chapter-${item.id}-image${index}`}
                      className="relative w-full aspect-auto block"
                    >
                      <Image
                        src={image}
                        alt=''
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: '100%', height: 'auto' }}
                        // className='object-contain'
                        priority
                      />
                    </div>
                  )
                })
              }
            })
          }
        </div>
      </DialogContent>
    </Dialog>

  )
}

export default MangaWatchBox