"use client"

import React, { FC } from 'react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { notFound } from 'next/navigation'

import { slideWithoutScale } from '@/lib/motion/slide'
import { formatDate } from '@/lib/formatDate'
import RenderEditorContent from '@/components/shared/TextEditor/RenderEditorContent'
import ContentDetailHeader from '@/components/Content/Detail/ContentDetailHeader'
import { useQuery } from '@tanstack/react-query'
import { getLightnovelDetail } from '@/actions/lightnovel'


type IProps = {
  id: string
}

const LightnovelDetail: FC<IProps> = ({ id }) => {
  const { data } = useQuery({
    queryKey: ["lightnovel", id],
    queryFn: async () => await getLightnovelDetail(id)
  })

  if (!data?.data) {
    notFound()
  }

  return (
    <div className='w-full flex flex-col md:flex-row gap-4 md:gap-0'>

      <ContentDetailHeader
        categories={data.data.categories}
        favorites={data.data.favorites.length}
        name={data.data.name}
        user={data.data.user}
        viewed={data.data.viewed}
        artist={data.data.artist}
        author={data.data.author}
        image={data.data.image?.url}
        translationGroup={data.data.translationGroup}
        words={data.data.words}
        id={data.data.id}
      />

      <div className='flex flex-col gap-4 md:overflow-y-auto md:mt-20 pb-4 w-full'>
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

        {/* Volume */}
        <div className='flex flex-col justify-start gap-3 flex-wrap mx-4'>
          {
            data.data.volumes && data.data.volumes.map((item, index) => {
              return (
                <motion.div
                  key={`category-${index}`}
                  variants={slideWithoutScale}
                  custom={0.5 + (index * 0.1)}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <Card
                  >
                    <CardHeader className='flex flex-row gap-4 p-3 items-center'>
                      <CardTitle className='text-lg'>{item.name}</CardTitle>
                      <CardDescription className='!m-0'>{`${item.chapters.length} Chapters`}</CardDescription>
                    </CardHeader>
                    <CardContent className='flex gap-3 p-4 pt-0'>
                      <div className='aspect-[2/3] min-w-[100px] rounded-lg shadow overflow-hidden relative'>
                        <Image
                          src={item.image ? item.image.url : "images/image2.jpeg"}
                          alt={item.name}
                          fill
                          sizes='full'
                          priority
                          className='object-cover'
                        />
                      </div>

                      <div className='flex flex-col gap-2 w-full'>
                        {
                          item.chapters.map((chapter, index) => {
                            return (
                              <Link
                                key={`${item.name}-${chapter.name}`}
                                href={`/lightnovels/lightnovel/${data.data.id}/r/${chapter.id}`}
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
                          })
                        }
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default LightnovelDetail