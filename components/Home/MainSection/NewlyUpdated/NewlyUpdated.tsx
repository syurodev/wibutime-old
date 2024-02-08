'use client'
import { FC } from 'react'
import { useQuery } from '@tanstack/react-query'
import { notFound } from 'next/navigation'
import { motion } from 'framer-motion'

import { Button } from '@/components/ui/button'
import { slide } from '@/lib/motion/slide'
import CardItem from '@/components/shared/Card/CardItem'
import { getNews } from '@/actions/home'
import { useCurrentUser } from '@/hooks/useCurrentUser'

type IProps = {
  title: string,
  type: ContentType
}

const NewlyUpdated: FC<IProps> = ({ title, type }) => {
  const session = useCurrentUser()
  const { data, error } = useQuery({
    queryKey: ["main section", "animenews", "manganews", "lightnovelnews"],
    queryFn: async () => await getNews(12)
  })

  if (!data?.data) {
    notFound()
  }

  function getDataByType(data: {
    anime: AnimeNew[],
    manga: MangaNew[],
    lightnovel: LightnovelNew[]
  },
    type: ContentType
  ): AnimeNew[] | MangaNew[] | LightnovelNew[] | null {
    if (data === null) {
      notFound()
    }

    switch (type) {
      case "anime":
        return data.anime;
      case "manga":
        return data.manga;
      case "lightnovel":
        return data.lightnovel;
      default:
        notFound()
    }
  }

  const result = getDataByType(data.data, type)

  if (!result) {
    notFound()
  }

  return (
    type === "anime" ? (
      data.data.anime.length > 0 &&
      <div>
        <div className='flex justify-between items-center'>
          <h1 className='uppercase font-semibold text-lg'>{title}</h1>

          <Button variant={"ghost"}>See more</Button>
        </div>

        <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4'>
          {
            data.data.anime.map((item, index) => {
              return (
                <motion.div
                  key={`${item.type}-newly-${index}`}
                  className="p-1"
                  variants={slide}
                  custom={0.6 + (index * 0.1)}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <CardItem
                    {...item}
                    current={item.seasons?.episodes ? item.seasons?.episodes.length : 0}
                    end={item.seasons?.end}
                    image={item.image as {
                      key?: string;
                      url: string;
                    } | null | undefined}
                    poster={session && item.user.id === session.id || false}
                  />
                </motion.div>
              )
            })
          }
        </div>
      </div>
    ) : type === "manga" ? (
      data.data.manga.length > 0 &&
      <div>
        <div className='flex justify-between items-center'>
          <h1 className='uppercase font-semibold text-lg'>{title}</h1>

          <Button variant={"ghost"}>See more</Button>
        </div>

        <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4'>
          {
            data.data.manga.map((item, index) => {
              return (
                <motion.div
                  key={`${item.type}-newly-${index}`}
                  className="p-1"
                  variants={slide}
                  custom={0.6 + (index * 0.1)}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <CardItem
                    {...item}
                    current={item.seasons?.chapters ? item.seasons?.chapters.length : 0}
                    end={item.seasons?.end || undefined}
                    image={item.image as {
                      key?: string;
                      url: string;
                    } | null | undefined}
                    poster={session && item.user.id === session.id || false}
                  />
                </motion.div>
              )
            })
          }
        </div>
      </div>
    ) : (
      data.data.lightnovel.length > 0 &&
      <div>
        <div className='flex justify-between items-center'>
          <h1 className='uppercase font-semibold text-lg'>{title}</h1>

          <Button variant={"ghost"}>See more</Button>
        </div>

        <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4'>
          {
            data.data.lightnovel.map((item, index) => {
              return (
                <motion.div
                  key={`${item.type}-newly-${index}`}
                  className="p-1"
                  variants={slide}
                  custom={0.6 + (index * 0.1)}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <CardItem
                    {...item}
                    image={item.image as {
                      key?: string;
                      url: string;
                    } | null | undefined}
                    poster={session && item.user.id === session.id || false}
                  />
                </motion.div>
              )
            })
          }
        </div>
      </div>
    )
  )
}

export default NewlyUpdated