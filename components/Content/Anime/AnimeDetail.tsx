'use client'
import React, { FC } from 'react'
import { useQuery } from '@tanstack/react-query'
import { notFound } from 'next/navigation'
import { motion } from 'framer-motion'

import { getAnimeDetail } from '@/actions/anime'
import ContentDetailHeader from '@/components/Content/Detail/ContentDetailHeader'
import { slideWithoutScale } from '@/lib/motion/slide'
import RenderEditorContent from '@/components/shared/TextEditor/RenderEditorContent'
import SeasonCard from './_components/SeasonCard'
import { useCurrentUser } from '@/hooks/useCurrentUser'

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

  const session = useCurrentUser()

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
          menuType='anime'
          id={data.data.id}
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
                      animeId={id}
                      poster={session ? data.data.user.id === session.id : false}
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