'use client'

import { FC, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { buttonVariants } from "@/components/ui/button"
import { IoArrowForward } from "react-icons/io5";
import { Badge } from '@/components/ui/badge';
import { LuCaseSensitive, LuDot } from "react-icons/lu";
import { AnimatePresence, motion } from 'framer-motion'
import { slide, slideWithoutScale } from '@/lib/motion/slide'
import { useQuery } from '@tanstack/react-query'
import { getHero } from '@/actions/home';
import { notFound } from 'next/navigation'
import RenderEditorContent from '@/components/shared/TextEditor/RenderEditorContent'

const News: FC = () => {
  const { data, error } = useQuery({
    queryKey: ["news", "trending"],
    queryFn: getHero
  })

  if (!data?.data) {
    notFound()
  }

  const [currentIndex, setCurrentIndex] = useState<number>(0)

  useEffect(() => {
    if (data?.data && data?.data?.news && data?.data?.news.length > 1) {
      const interval = setInterval(() => {
        if (currentIndex >= data?.data?.news.length! - 1) {
          setCurrentIndex(0);
        } else {
          setCurrentIndex(currentIndex + 1);
        }
      }, 10000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [currentIndex, data]);

  return (
    <div>
      <h1 className='uppercase font-semibold text-lg'>News</h1>

      <motion.div
        className='w-full h-fit overflow-hidden relative rounded-2xl shadow'
        variants={slide}
        initial="initial"
        animate="animate"
        exit="exit"
        custom={0.1}
      >
        <AnimatePresence mode='wait'>
          {
            data.data.news.map((item, index) => {
              return (
                index === currentIndex && (
                  <div
                    key={`heroNew-${index}`}
                    className='w-full h-[60vh] min-h-[500px] overflow-hidden rounded-2xl relative flex'
                  >
                    {/* Image */}
                    <motion.div
                      className='h-full w-full aspect-[2/3] relative flex items-start overflow-hidden flex-auto'
                      variants={slide}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                    >
                      <Image
                        src={item.image ? item.image.url : "/images/image2.jpeg"}
                        alt={item.name}
                        fill
                        sizes='90vw'
                        className='object-cover'
                        priority
                      />
                    </motion.div>

                    <motion.div
                      className='h-full overflow-hidden'
                      variants={slideWithoutScale}
                      custom={0.2}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                    >
                      <div className='relative overflow-hidden h-full'>
                        <div className='flex flex-col gap-3 p-3 bg-background/80 backdrop-blur-lg h-full overflow-hidden relative'>
                          {/* type and watch now btn */}
                          <div className='flex items-center justify-between'>
                            <motion.div
                              variants={slide}
                              custom={0.3}
                              initial="initial"
                              animate="animate"
                              exit="exit"
                            >
                              <Badge
                                variant={item.type as "lightnovel" | "anime" | "manga" | "default" | "secondary" | "destructive" | "outline" | null | undefined}
                                className='cursor-pointer select-none uppercase'
                              >
                                {item.type}
                              </Badge>
                            </motion.div>

                            <motion.div
                              variants={slide}
                              custom={0.35}
                              initial="initial"
                              animate="animate"
                              exit="exit"
                            >
                              <Link
                                href={`/${item.type}s/${item.type}/${item.id}/${item.type === "anime" && item.seasons?.episodes
                                  ? `w/${item.seasons?.episodes?.id}`
                                  : item.type === "lightnovel" && item.volumes?.chapters
                                    ? `r/${item.volumes?.chapters?.id}`
                                    : item.type === "manga" && item.seasons?.chapters
                                      ? `r/${item.seasons?.chapters?.id}`
                                      : ""
                                  }`}
                                className={`${buttonVariants({ variant: "default" })} gap-2`}
                                scroll
                              >
                                <span>{item.type === "lightnovel" ? "Read now" : "Watch now"}</span>
                                <IoArrowForward className="text-lg" />
                              </Link>
                            </motion.div>
                          </div>

                          {/* title */}
                          <motion.h2
                            className='font-semibold text-xl text-pretty line-clamp-3'
                            variants={slide}
                            custom={0.4}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                          >
                            {item.name}
                          </motion.h2>

                          {/* ep and duration */}
                          <motion.div
                            className='flex gap-1 items-center font-semibold text-secondary-foreground'
                            variants={slide}
                            custom={0.45}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                          >
                            <span className='uppercase text-sm'>
                              {item.type === "anime"
                                ? item.seasons?.episodes
                                  ? `EP: ${item.seasons?.episodes?.index}`
                                  : item.seasons
                                    ? `Season: ${item.seasons?.name}`
                                    : item.name
                                : item.type === "manga"
                                  ? item.seasons?.chapters
                                    ? `CHAP: ${item.seasons?.chapters?.index}`
                                    : item.seasons
                                      ? `Season: ${item.seasons?.name}`
                                      : item.name
                                  : item.type === "lightnovel"
                                    ? item.volumes?.chapters
                                      ? `CHAP: ${item.volumes?.chapters?.name}`
                                      : item.volumes
                                        ? `Volume: ${item.volumes?.name}`
                                        : item.name
                                    : ""}
                            </span>

                            {
                              item.type === "lightnovel" && item.volumes?.chapters && (
                                <>
                                  <LuDot className="text-lg" />
                                  <div
                                    className='flex items-center gap-1'
                                  >
                                    <LuCaseSensitive className="text-xl" />
                                    <span className='text-sm'>{item.volumes?.chapters?.words}</span>
                                  </div>
                                </>
                              )
                            }
                          </motion.div>

                          {/* categories */}
                          <div className='flex gap-3 items-center flex-wrap'>
                            {
                              item?.categories.map((cate, index) => {
                                return (
                                  <motion.div
                                    key={`cate${item.name}-${index}`}
                                    variants={slide}
                                    custom={0.5 + (index * 0.1)}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                  >
                                    <Link
                                      href={"#"}
                                    >
                                      <Badge
                                        variant="default"
                                        className='cursor-pointer select-none text-nowrap'
                                      >
                                        {cate.name}
                                      </Badge>
                                    </Link>
                                  </motion.div>
                                )
                              })
                            }
                          </div>

                          {/* description */}
                          <motion.div
                            className='line-clamp-5 text-xs'
                            variants={slide}
                            custom={0.7}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                          >
                            <RenderEditorContent content={item.summary} fontSize='text-sm' />
                          </motion.div>
                        </div>

                        <Image
                          src={item.image ? item.image.url : "/images/image2.jpeg"}
                          alt={item.name}
                          fill
                          sizes='90vw'
                          className='object-cover -z-10'
                          priority
                        />
                      </div>

                    </motion.div>
                  </div>
                )
              )
            })
          }
        </AnimatePresence>

      </motion.div>

    </div>

  )
}

export default News