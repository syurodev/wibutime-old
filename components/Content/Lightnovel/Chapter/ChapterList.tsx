"use client"

import React, { FC, useState } from 'react'

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import Image from 'next/image'
import { LuCoins } from 'react-icons/lu'
import Link from 'next/link'
import PurchaseDialog from '@/components/shared/Purchase/PurchaseDialog'
import SlideWithoutScale from '@/components/shared/Motion/SlideWithoutScale'

type IProps = {
  isOpen: boolean
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>
  currentChapter: string,
  novelName: string,
  authorId: string,
  novelId: string,
  volumes: {
    id: string,
    image: {
      key: string,
      url: string
    },
    name: string,
    chapters: {
      id: string,
      name: string,
      charge: boolean,
    }[]
  }[],
}

const ChapterList: FC<IProps> = ({
  isOpen,
  onOpenChange,
  currentChapter,
  authorId,
  volumes,
  novelName,
  novelId,
}) => {
  const [openPurchase, setOpenPurchase] = useState<boolean>(false)

  const [purchaseData, setPurchaseData] = useState<{
    novelId: string,
    chapterId: string,
    authorId: string,
    name: string,
    type: ContentType
  }>({
    novelId: "",
    chapterId: "",
    authorId: "",
    name: "",
    type: "lightnovel",
  })

  return (
    <>
      <Sheet
        open={isOpen}
        onOpenChange={onOpenChange}
      >
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Danh sách Chapter</SheetTitle>
            {
              volumes.map((volume, index) => (
                <div key={volume.id}>
                  <div className='flex gap-2'>
                    <div className='aspect-[2/3] w-20 rounded-lg overflow-hidden shadow relative'>
                      <Image
                        src={volume.image.url}
                        alt={`${volume.name} image`}
                        fill
                        priority
                        className='object-cover'
                      />
                    </div>

                    <div className='flex flex-col'>
                      <p className='text-base font-semibold line-clamp-2 text-start'>{novelName}</p>
                      <p className='text-sm font-semibold text-start'>{volume.name}</p>
                    </div>
                  </div>

                  <div className='flex flex-col gap-2 w-full mt-3 ps-3 border-s ms-3'>
                    {
                      volume.chapters.map((chapter, index) => {
                        if (chapter.charge) {
                          return (
                            <div
                              key={chapter.name}
                              className='flex items-center justify-between w-full gap-2 cursor-pointer'
                              onClick={() => {
                                setPurchaseData({
                                  novelId: novelId,
                                  authorId: authorId,
                                  chapterId: chapter.id,
                                  name: chapter.name,
                                  type: "lightnovel"
                                })
                                setOpenPurchase(true)
                              }}
                            >
                              <SlideWithoutScale
                                className='flex items-center gap-1'
                                delay={index * 0.05}
                              >
                                <LuCoins className="!text-base min-w-4 w-4" />
                                <p
                                  className={`line-clamp-1 text-sm text-start font-semibold ${chapter.id === currentChapter && "text-lightnovel font-semibold"}`}
                                >
                                  {chapter.name}
                                </p>
                              </SlideWithoutScale>
                            </div>
                          )
                        } else {
                          return (
                            <Link
                              key={chapter.name}
                              href={`/lightnovels/lightnovel/${novelId}/r/${chapter.id}`}
                            >
                              <SlideWithoutScale
                                className='flex items-center justify-between w-full gap-2'
                                delay={index * 0.05}
                              >
                                <p className={`line-clamp-1 text-sm text-start ${chapter.id === currentChapter && "text-lightnovel font-semibold"}`}>
                                  {chapter.name}
                                </p>
                              </SlideWithoutScale>
                            </Link>
                          )
                        }
                      })
                    }
                  </div>
                </div>
              ))
            }

          </SheetHeader>
        </SheetContent>
      </Sheet>

      <PurchaseDialog
        data={purchaseData}
        isOpen={openPurchase}
        setOpen={setOpenPurchase}
        type='lightnovel'
      />
    </>
  )
}

export default ChapterList