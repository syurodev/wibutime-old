"use client"
import React, { FC, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { Input } from '@/components/ui/input'

import CardItem from '@/components/shared/Card/CardItem'
import SlideWithoutScale from '@/components/shared/Motion/SlideWithoutScale'
import { slideWithoutScale } from '@/lib/motion/slide'

type IProps = {
  type: ContentType,
  animes?: AnimeNewItem[],
  mangas?: MangaNewItem[],
  lightnovels?: LightnovelNewItem[],
}

const BoxContents: FC<IProps> = ({
  type,
  animes,
  mangas,
  lightnovels,
}) => {
  const [data, setData] = useState<
    AnimeNewItem[] | MangaNewItem[] | LightnovelNewItem[]
  >(animes || mangas || lightnovels || [])

  const [slug, setSlug] = useState<string>("")

  useEffect(() => {
    if (data.length === 0) return

    if (type === 'anime') {
      if (!animes) return

      if (slug === "" || slug.trim() === "") {
        setData(animes ?? [])
      } {
        const newItems = animes.filter(item => item.name.toLocaleLowerCase().includes(slug.toLocaleLowerCase()))

        setData(newItems)
      }
    } else if (type === 'lightnovel') {
      if (!lightnovels) return

      if (slug === "" || slug.trim() === "") {
        setData(lightnovels ?? [])
      } {
        const newItems = lightnovels.filter(item => item.name.toLocaleLowerCase().includes(slug.toLocaleLowerCase()))

        setData(newItems)
      }
    } else if (type === 'manga') {
      if (!mangas) return

      if (slug === "" || slug.trim() === "") {
        setData(mangas ?? [])
      } {
        const newItems = mangas.filter(item => item.name.toLocaleLowerCase().includes(slug.toLocaleLowerCase()))

        setData(newItems)
      }
    }
  }, [animes, data.length, lightnovels, mangas, slug, type])

  return (
    <div className='flex flex-col gap-3'>
      <SlideWithoutScale
        className='max-w-lg w-full mx-auto sticky top-0'
      >
        <Input
          type='text'
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className='shadow'
        />
      </SlideWithoutScale>

      <motion.h3
        variants={slideWithoutScale}
        custom={0.1}
        initial="initial"
        animate="animate"
        exit="exit"
        className='capitalize'
      >
        {type} News
      </motion.h3>

      {
        data.length === 0 ? (
          <motion.p
            variants={slideWithoutScale}
            custom={0.2}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            Không có nội dung
          </motion.p>
        ) : (
          <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4'>
            <AnimatePresence mode='wait'>
              {
                data.map((content, index) => (
                  <SlideWithoutScale
                    key={content.id}
                    delay={0.2 + (index * 0.05)}
                  >
                    <CardItem
                      key={content.id}
                      id={content.id}
                      image={content.image}
                      name={content.name}
                      type={content.type}
                    />
                  </SlideWithoutScale>
                ))
              }
            </AnimatePresence>
          </div>
        )
      }
    </div>
  )
}

export default BoxContents