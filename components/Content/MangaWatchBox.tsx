'use client'

import { FC, useState } from 'react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import Image from 'next/image'
import { MdOutlineNavigateNext, MdNavigateBefore } from "react-icons/md";
import { AnimatePresence, motion } from 'framer-motion'

import { Button } from '@/components/ui/button'
import { slide } from '@/lib/motion';

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
  const [chapter, setChapter] = useState<string>(currentChapterId)

  //TODO: Block user download image

  return (
    <Dialog
      open={isOpen}
      onOpenChange={onOpenChange}
    >
      <DialogContent
        className="bg-background max-w-[1000px] max-h-[98%] h-full rounded-lg p-0 overflow-y-scroll overflow-x-hidden"
      >
        {/* <Carousel
          opts={{
            align: "start",
          }}
          orientation="vertical"
          className="w-full max-w-[1000px] h-full"
          setApi={setApi}
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
                        className="basis-5/8 h-full relative"
                      >
                        <Image
                          src={image}
                          alt=''
                          fill
                          className='object-contain aspect-[5/8]'
                          priority
                        />
                      </CarouselItem>
                    )
                  })
                }
              })
            }
          </CarouselContent>

        </Carousel> */}

        <div className='flex flex-col items-center w-full h-full overflow-x-hidden'>
          <AnimatePresence mode='wait'>
            {
              content.map(item => {
                if (item.id === chapter) {
                  return item.urls.map((image, index) => {
                    return (
                      <motion.div
                        key={`chapter-${item.id}-image${index}`}
                        className="h-full relative"
                        variants={slide}
                        custom={index * 0.1}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                      >
                        <Image
                          src={image}
                          alt=''
                          width={800}
                          height={1280}
                          sizes="100vw"
                          className='object-contain'
                          priority
                        />
                      </motion.div>
                    )
                  })
                }
              })
            }
          </AnimatePresence>
        </div>

        <div
          className="p-2 absolute z-[100] bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-black/50 rounded-lg backdrop-blur-xl w-fit"
        >
          <Button
            size={"icon"}
            disabled={content.findIndex(item => item.id === chapter) === 0}
            onClick={() => {
              setChapter(
                content[content.findIndex(item => item.id === chapter) - 1].id
              )
            }}
          >
            <MdNavigateBefore />
          </Button>

          <div>
            <p className='text-xs line-clamp-1 text-white font-semibold'>
              {`Chapter ${content.findIndex(item => item.id === chapter) + 1}/${content.length}`}
            </p>
          </div>

          <Button
            size={"icon"}
            disabled={content.findIndex(item => item.id === chapter) + 1 === content.length}
            onClick={() => {
              setChapter(
                content[content.findIndex(item => item.id === chapter) + 1].id
              )
            }}
          >
            <MdOutlineNavigateNext />
          </Button>
        </div>
      </DialogContent>
    </Dialog>

  )
}

export default MangaWatchBox