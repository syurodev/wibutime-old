'use client'

import { FC, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { IoArrowForward } from "react-icons/io5";
import { LuCaseSensitive, LuDot } from "react-icons/lu";
import { AnimatePresence, motion } from 'framer-motion'

import { buttonVariants } from "@/components/ui/button"
import { Badge } from '@/components/ui/badge';
import { slide, slideWithoutScale } from '@/lib/motion/slide'

import RenderEditorContent from '@/components/shared/TextEditor/RenderEditorContent'

type IProps = {
  data: NewsData
}

const News: FC<IProps> = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0)

  useEffect(() => {
    if (data && data && data.length > 1) {
      const interval = setInterval(() => {
        if (currentIndex >= data!.length! - 1) {
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
            data && data.map((item, index) => {
              return (
                index === currentIndex && (
                  <div
                    key={`heroNew-${index}`}
                    className='aspect-[2/3] min-h-[500px] w-full md:max-h-[60vh] overflow-hidden rounded-2xl relative flex flex-col md:flex-row'
                  >
                    {/* Image */}
                    <motion.div
                      className='min-h-[500px] lg:min-h-[600px] aspect-[2/3] relative flex items-start overflow-hidden flex-auto md:min-w-[350px] lg:min-w-[400px]'
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
                      className='h-full w-full overflow-hidden absolute top-1/2 bg-background/80 backdrop-blur-xl md:bg-transparent md:backdrop-blur-none md:top-0 md:relative'
                      variants={slideWithoutScale}
                      custom={0.2}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                    >
                      <div className='relative overflow-hidden h-full'>
                        <div
                          className='flex flex-col gap-2 md:gap-5 p-5 h-full overflow-hidden relative w-full md:bg-background/90 md:backdrop-blur-md md:supports-[backdrop-filter]:bg-background/90'
                        >
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
                                  ? `w/${item.seasons?.id}?ep=${item.seasons?.episodes[0]?.index}`
                                  : item.type === "lightnovel" && item.volumes?.chapters
                                    ? `r/${item.volumes?.chapters?.id}`
                                    : item.type === "manga" && item.seasons?.chapters
                                      ? `r/${item.seasons?.chapters[0]?.id}`
                                      : ""
                                  }`}
                                className={`${buttonVariants({ variant: "default" })} gap-2`}
                                scroll
                              >
                                <span>{item.type === "lightnovel" ? "Đọc ngay" : "Xem ngay"}</span>
                                <IoArrowForward className="text-lg" />
                              </Link>
                            </motion.div>
                          </div>

                          {/* title */}
                          <motion.p
                            className='font-semibold text-base md:text-xl text-pretty line-clamp-3'
                            variants={slide}
                            custom={0.4}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                          >
                            {item.name}
                          </motion.p>

                          {/* ep and duration */}
                          <motion.div
                            className='flex gap-1 items-center font-semibold text-secondary-foreground'
                            variants={slide}
                            custom={0.45}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                          >
                            <span className='uppercase text-xs'>
                              {item.type === "anime"
                                ? item.seasons?.episodes
                                  ? `EP: ${item.seasons?.episodes[item.seasons?.episodes.length - 1]?.index}`
                                  : item.seasons
                                    ? `${item.seasons?.name}`
                                    : item.name
                                : item.type === "manga"
                                  ? item.seasons?.chapters
                                    ? `CHAP: ${item.seasons?.chapters[item.seasons?.chapters.length - 1]?.index}`
                                    : item.seasons
                                      ? `${item.seasons?.name}`
                                      : item.name
                                  : item.type === "lightnovel"
                                    ? item.volumes?.chapters
                                      ? `${item.volumes?.chapters?.name}`
                                      : item.volumes
                                        ? `${item.volumes?.name}`
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
                                    <span className='text-xs'>{item.volumes?.chapters?.words}</span>
                                  </div>
                                </>
                              )
                            }
                          </motion.div>

                          {/* categories */}
                          <div className='flex gap-2 items-center flex-wrap'>
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
                                      href={`/categories/${cate.id}`}
                                    >
                                      <Badge
                                        variant="default"
                                        className='cursor-pointer select-none text-nowrap text-xs'
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
                            className='overflow-hidden w-full'
                            variants={slide}
                            custom={0.7}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                          >
                            <RenderEditorContent
                              content={item.summary}
                              fontSize='text-sm'
                              className='line-clamp-1 md:line-clamp-5 lg:line-clamp-[10]'
                            />
                          </motion.div>
                        </div>

                        <Image
                          src={item.image ? item.image.url : "/images/image2.jpeg"}
                          alt={item.name}
                          fill
                          sizes='90vw'
                          className='object-cover -z-10 hidden md:block'
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