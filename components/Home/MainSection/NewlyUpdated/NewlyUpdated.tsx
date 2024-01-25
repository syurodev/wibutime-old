'use client'

import { FC } from 'react'
import { useQuery } from '@tanstack/react-query'
import { notFound } from 'next/navigation'
import { motion } from 'framer-motion'

import { Button } from '@/components/ui/button'
import { slide } from '@/lib/motion/slide'
import CardItem from '@/components/shared/Card/CardItem'
import { getNews } from '@/actions/home'

type IProps = {
  title: string,
  type: ContentType
}

const NewlyUpdated: FC<IProps> = ({ title, type }) => {
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
    result.length > 0 &&
    <div>
      <div className='flex justify-between items-center'>
        <h1 className='uppercase font-semibold text-lg'>{title}</h1>

        <Button variant={"ghost"}>See more</Button>
      </div>

      <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4'>
        {
          result.map((item, index) => {
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
                />
              </motion.div>
            )
          })
        }
      </div>
    </div>
  )
}

export default NewlyUpdated