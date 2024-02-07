'use client'
import React, { FC } from 'react'
import { useQuery } from '@tanstack/react-query'
import { notFound } from 'next/navigation'
import { motion } from 'framer-motion'

import { getAnimeDetail } from '@/actions/anime'
import ContentDetailHeader from '@/components/Content/Detail/ContentDetailHeader'
import { slideWithoutScale } from '@/lib/motion/slide'
import RenderEditorContent from '@/components/shared/TextEditor/RenderEditorContent'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'
import { formatDate } from '@/lib/formatDate'
import SeasonCard from './_components/SeasonCard'

type IProps = {
  id: string
}

const AnimeDetail: FC<IProps> = ({ id }) => {
  const { data } = useQuery({
    queryKey: ["anime", id],
    queryFn: async () => await getAnimeDetail(id)
  })

  if (!data?.data) {
    notFound()
  }

  console.log(data.data)

  return (
    <div className='w-screen h-dvh absolute left-0 top-0 md:overflow-hidden'>
      <div className='w-full flex flex-col md:flex-row gap-4 md:gap-0'>
        <ContentDetailHeader
          categories={data.data.categories}
          favorites={data.data.favorites.length}
          name={data.data.name}
          user={data.data.user}
          viewed={data.data.viewed}
          translationGroup={data.data.translationGroup}
          image={data.data.image?.url}
        />

        <div className='flex flex-col gap-4 md:h-dvh md:overflow-y-scroll md:pt-20 pb-4'>
          {/* orther name */}
          {
            data.data.otherNames.length > 0 && (
              <motion.div
                variants={slideWithoutScale}
                custom={0.35}
                initial="initial"
                animate="animate"
                exit="exit"
                className='rounded-lg border p-4 bg-background shadow mx-4'
              >
                <p className='font-semibold text-sm mb-2'>Tên khác:</p>
                {
                  data.data.otherNames.map((name) => (
                    <p
                      key={name}
                      className='text-sm'
                    >
                      {name}
                    </p>
                  ))
                }
              </motion.div>
            )
          }

          {/* summary */}
          <motion.div
            variants={slideWithoutScale}
            custom={0.45}
            initial="initial"
            animate="animate"
            exit="exit"
            className='rounded-lg border p-4 bg-background shadow mx-4'
          >
            <p className='font-semibold text-sm'>Tóm tắt:</p>
            {
              data.data.summary &&
              <RenderEditorContent content={data.data.summary} fontSize='text-sm' />
            }
          </motion.div>

          {/* note */}
          <motion.div
            variants={slideWithoutScale}
            custom={0.55}
            initial="initial"
            animate="animate"
            exit="exit"
            className='rounded-lg border p-4 bg-background shadow mx-4'
          >
            <p className='font-semibold text-sm'>Ghi chú:</p>
            {
              data.data.note &&
              <RenderEditorContent content={data.data.note} fontSize='text-sm' />
            }
          </motion.div>

          {/* Season */}
          <div className='flex flex-col justify-start gap-3 flex-wrap mx-4'>
            {
              data.data.seasons && data.data.seasons.map((item, index) => {
                return (
                  <motion.div
                    key={`category-${index}`}
                    variants={slideWithoutScale}
                    custom={0.5 + (index * 0.1)}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    {/* <Card
                    >
                      <CardHeader className='flex flex-row gap-4 p-3 items-center'>
                        <CardTitle className='text-lg'>{item.name}</CardTitle>
                        <CardDescription className='!m-0'>{`${item.episodes.length} Episodes`}</CardDescription>
                      </CardHeader>
                      <CardContent className='flex gap-3 p-4 pt-0'>
                        <div className='aspect-[2/3] min-w-[100px] rounded-lg shadow overflow-hidden relative'>
                          <Image
                            src={item.image ? item.image.url : "images/image2.jpeg"}
                            alt={item.name}
                            fill sizes='100%'
                            priority
                            className='object-cover'
                          />
                        </div>

                        <div className='flex flex-col gap-2 w-full'>
                          {
                            item.episodes.map((ep, index) => {
                              return (
                                <Link
                                  key={item.id}
                                  href={`/animes/anime/${data.data.id}/w/${ep.id}`}
                                >
                                  <div>
                                    <div
                                      className='relative aspect-video min-h-[100px] rounded-lg'
                                    >
                                      {
                                        ep.thumbnail ? (
                                          <Image
                                            src={ep.thumbnail?.url}
                                            alt={`${data.data.name} - ${item.name} - ${ep.index}`}
                                            fill
                                            className='object-cover'
                                            sizes='full'
                                          />
                                        ) : (
                                          <p className='font-semibold uppercase text-secondary-foreground'>{`EP${ep.index}`}</p>
                                        )
                                      }

                                    </div>

                                    <div
                                      className='flex items-center justify-between w-full gap-2'
                                    >
                                      <p className='line-clamp-1 text-sm'>
                                        {ep.index}
                                      </p>

                                      <span className='text-xs text-secondary-foreground'>
                                        {formatDate(ep.createdAt)}
                                      </span>
                                    </div>
                                  </div>
                                </Link>
                              )
                            })
                          }
                        </div>
                      </CardContent>
                    </Card> */}

                    <SeasonCard
                      name={item.name}
                      numberOfEpisode={item.episodes.length}
                      image={item.image ? item.image.url : undefined}
                      aired={item.aired}
                      studio={item.studio}
                      broadcastDay={item.broadcastDay}
                      broadcastTime={item.broadcastTime}
                    />
                  </motion.div>
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnimeDetail