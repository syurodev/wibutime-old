'use client'
import { FC } from 'react'
import { motion } from 'framer-motion'

import { buttonVariants } from "@/components/ui/button"
import { Button } from '@/components/ui/button'
import { slide } from '@/lib/motion/slide'
import CardItem from '@/components/shared/Card/CardItem'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import Link from 'next/link'

type IProps = {
  title: string,
  type: ContentType,
  animes?: AnimeNew,
  mangas?: MangaNew,
  lightnovels?: LightnovelNew,
}

const NewlyUpdated: FC<IProps> = ({
  title,
  type,
  animes,
  mangas,
  lightnovels,
}) => {
  const session = useCurrentUser()

  return (
    type === "anime" ? (
      animes && animes.animes && animes.animes.length > 0 &&
      <div>
        <div className='flex justify-between items-center'>
          <h2 className='uppercase font-semibold text-base md:text-lg'>{title}</h2>

          <Link
            href={"/animes/news"}
            className={
              buttonVariants(
                { variant: "ghost", size: "sm", rounded: "full" }
              )
            }>
            Xem thêm
          </Link>
        </div>

        <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4'>
          {
            animes.animes.map((item, index) => {
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
      mangas && mangas.mangas && mangas.mangas.length > 0 &&
      <section>
        <div className='flex justify-between items-center'>
          <h2 className='uppercase font-semibold text-base md:text-lg'>{title}</h2>

          <Link
            href={"/mangas/news"}
            className={
              buttonVariants(
                { variant: "ghost", size: "sm", rounded: "full" }
              )
            }>
            Xem thêm
          </Link>
        </div>

        <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4'>
          {
            mangas.mangas.map((item, index) => {
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
      </section>
    ) : (
      lightnovels && lightnovels.lightnovels && lightnovels.lightnovels.length > 0 &&
      <section>
        <div className='flex justify-between items-center'>
          <h2 className='uppercase font-semibold text-base md:text-lg'>{title}</h2>

          <Link
            href={"/lightnovels/news"}
            className={
              buttonVariants(
                { variant: "ghost", size: "sm", rounded: "full" }
              )
            }>
            Xem thêm
          </Link>
        </div>

        <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4'>
          {
            lightnovels.lightnovels.map((item, index) => {
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
      </section>
    )
  )
}

export default NewlyUpdated