"use client"
import React, { FC, useState } from 'react'
import Image from 'next/image'
import { LuCoins } from 'react-icons/lu'
import Link from 'next/link'
import dynamic from 'next/dynamic'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'

import SlideWithoutScale from '@/components/shared/Motion/SlideWithoutScale'
import RenderEditorContent from '@/components/shared/TextEditor/RenderEditorContent'
import { formatDate } from '@/lib/formatDate'
import SeasonCard from '../Anime/_components/SeasonCard'
import { useCurrentUser } from '@/hooks/useCurrentUser'

const PurchaseDialog = dynamic(() => import('@/components/shared/Purchase/PurchaseDialog'), {
  ssr: true,
});

type IProps = {
  contentId: string,
  type: ContentType,
  otherNames: string[],
  summary: any,
  note: any,
  user: {
    id: string;
    image: string | null;
    name: string;
  }
  volumes?: LightnovelVolumeDetail[],
  animeSeasons?: AnimeSeasonDetail[],
}

const ContentDetailBody: FC<IProps> = ({
  contentId,
  type,
  otherNames,
  summary,
  note,
  user,
  volumes,
  animeSeasons,
}) => {
  const session = useCurrentUser()
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
      <div className='flex flex-col gap-4 md:mt-20 pb-4 w-full md:min-h-[720px] md:sticky md:h-[calc(100dvh-80px)] md:overflow-y-scroll'>
        {/* orther name */}
        {
          otherNames.length > 0 && (
            <SlideWithoutScale
              delay={0.35}
              className='rounded-lg border p-4 bg-background shadow mx-4'
            >
              <p className='font-semibold text-sm mb-2'>Tên khác:</p>
              {
                otherNames.map((name) => (
                  <p
                    key={name}
                    className='text-sm'
                  >
                    {name}
                  </p>
                ))
              }
            </SlideWithoutScale>
          )
        }

        {/* summary */}
        <SlideWithoutScale
          delay={0.45}
          className='rounded-lg border p-4 bg-background shadow mx-4'
        >
          <p className='font-semibold text-sm'>Tóm tắt:</p>
          {
            summary &&
            <RenderEditorContent content={summary} fontSize='text-sm' />
          }
        </SlideWithoutScale>

        {/* note */}
        <SlideWithoutScale
          delay={0.55}
          className='rounded-lg border p-4 bg-background shadow mx-4'
        >
          <p className='font-semibold text-sm'>Ghi chú:</p>
          {
            note &&
            <RenderEditorContent content={note} fontSize='text-sm' />
          }
        </SlideWithoutScale>

        {/* Volume */}
        {
          type === "lightnovel" && (
            <div className='flex flex-col justify-start gap-3 flex-wrap mx-4'>
              {
                volumes && volumes.map((item, index) => {
                  return (
                    <SlideWithoutScale
                      key={`category-${index}`}
                      delay={0.5 + (index * 0.1)}
                    >
                      <Card>
                        <CardHeader className='flex flex-row gap-4 p-3 items-center'>
                          <CardTitle className='text-lg'>{item.name}</CardTitle>
                          <CardDescription className='!m-0'>{`${item.chapters.length} Chapters`}</CardDescription>
                        </CardHeader>
                        <CardContent className='flex gap-3 p-4 pt-0'>
                          <div className='w-[167px] h-[250px] rounded-lg shadow overflow-hidden relative flex-none'>
                            <Image
                              src={item.image ? item.image.url : "images/image2.jpeg"}
                              alt={item.name}
                              fill
                              sizes='full'
                              priority
                              className='object-cover aspect-[2/3]'
                            />
                          </div>

                          <ScrollArea className="h-[250px] w-full">
                            <div className='flex flex-col gap-2 w-full'>
                              {
                                item.chapters.map((chapter) => {
                                  if (chapter.charge) {
                                    return (
                                      <div
                                        key={`${item.name}-${chapter.name}`}
                                        className='flex items-center justify-between w-full gap-2 cursor-pointer'
                                        onClick={() => {
                                          setPurchaseData({
                                            novelId: contentId,
                                            authorId: user.id,
                                            chapterId: chapter.id,
                                            name: chapter.name,
                                            type: "lightnovel"
                                          })
                                          setOpenPurchase(true)
                                        }}
                                      >
                                        <div className='flex items-center gap-1'>
                                          <LuCoins className="!text-base min-w-4 w-4" />
                                          <p className='line-clamp-1 text-sm font-semibold'>
                                            {chapter.name}
                                          </p>
                                        </div>

                                        <span className='text-xs text-secondary-foreground'>
                                          {formatDate(chapter.createdAt)}
                                        </span>
                                      </div>
                                    )
                                  } else {
                                    return (
                                      <Link
                                        key={`${item.name}-${chapter.name}`}
                                        href={`/lightnovels/lightnovel/${contentId}/r/${chapter.id}`}
                                      >
                                        <div
                                          className='flex items-center justify-between w-full gap-2'
                                        >
                                          <p className='line-clamp-1 text-sm'>
                                            {chapter.name}
                                          </p>

                                          <span className='text-xs text-secondary-foreground'>
                                            {formatDate(chapter.createdAt)}
                                          </span>
                                        </div>
                                      </Link>
                                    )
                                  }
                                })
                              }
                            </div>
                          </ScrollArea>
                        </CardContent>
                      </Card>
                    </SlideWithoutScale>
                  )
                })
              }
            </div>
          )
        }

        {/* Anime Season */}
        {
          type === "anime" && (
            <div className='flex flex-col justify-start gap-3 flex-wrap mx-4'>
              {
                animeSeasons && animeSeasons.map((item, index) => {
                  return (
                    <SlideWithoutScale
                      key={item.id}
                      delay={0.5 + (index * 0.1)}
                    >
                      <SeasonCard
                        name={item.name}
                        numberOfEpisode={item.numberOfEpisodes}
                        image={item.image ? item.image.url : undefined}
                        aired={item.aired}
                        studio={item.studio}
                        broadcastDay={item.broadcastDay}
                        broadcastTime={item.broadcastTime}
                        episodes={item.episodes.length > 0 ? item.episodes.map((ep) => ({
                          id: ep.id,
                          content: ep.content,
                          thumbnail: ep.thumbnail,
                          index: ep.index,
                        })) : []}
                        id={item.id}
                        animeId={contentId}
                        poster={session ? user.id === session.id : false}
                      />
                    </SlideWithoutScale>
                  )
                })
              }
            </div>
          )
        }
      </div>

      <PurchaseDialog
        data={purchaseData}
        isOpen={openPurchase}
        setOpen={setOpenPurchase}
        type={type}
      />
    </>
  )
}

export default ContentDetailBody