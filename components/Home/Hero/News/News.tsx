'use client'

import { FC, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { buttonVariants } from "@/components/ui/button"
import { IoArrowForward } from "react-icons/io5";
import { Badge } from '@/components/ui/badge';
import { LuDot } from "react-icons/lu";
import { AnimatePresence, motion } from 'framer-motion'
import { slide, slideWithoutScale } from '@/lib/motion'

type IProps = {
  data: NewsData[]
}

const News: FC<IProps> = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0)

  useEffect(() => {
    if (data && data.length > 1) {
      const interval = setInterval(() => {
        if (currentIndex >= data.length - 1) {
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
      >
        <AnimatePresence mode='wait'>
          {
            data.map((item, index) => {
              return (
                index === currentIndex && (
                  <div
                    key={`heroNew-${index}`}
                    className='w-full h-[60vh] min-h-[500px] overflow-hidden rounded-2xl relative'
                  >
                    <div className='absolute w-full h-full z-30 flex flex-col justify-between overflow-hidden'>
                      <div></div>

                      <motion.div
                        className='flex flex-col gap-3 p-3 bg-background/60 backdrop-blur-md max-h-[85%] overflow-hidden rounded-b-2xl'
                        variants={slideWithoutScale}
                        custom={0.15}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                      >
                        {/* type and watch now btn */}
                        <div className='flex items-center justify-between'>
                          <motion.div
                            variants={slide}
                            custom={0.2}
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
                            custom={0.3}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                          >
                            <Link
                              href={"#"}
                              className={`${buttonVariants({ variant: "default" })} gap-2`}>
                              <span>{item.type === "lightnovel" ? "Read now" : "Watch now"}</span>
                              <IoArrowForward className="text-lg" />
                            </Link>
                          </motion.div>
                        </div>

                        {/* title */}
                        <motion.h2
                          className='font-semibold text-xl text-pretty line-clamp-3'
                          variants={slide}
                          custom={0.35}
                          initial="initial"
                          animate="animate"
                          exit="exit"
                        >
                          {item.title}
                        </motion.h2>

                        {/* ep and duration */}
                        <motion.div
                          className='flex gap-1 items-center font-semibold text-secondary-foreground'
                          variants={slide}
                          custom={0.4}
                          initial="initial"
                          animate="animate"
                          exit="exit"
                        >
                          <span className='uppercase'>{item.type === "anime" ? "EP" : "CHAP"} {item.ep}</span>
                          <LuDot className="text-lg" />
                          <span>{item.duration}{item.type === "lightnovel" ? "words" : item.type === "anime" ? "m" : "images"}</span>
                        </motion.div>

                        {/* categories */}
                        <div className='flex gap-3 items-center'>
                          {
                            item?.categories.map((cate, index) => {
                              return (
                                <motion.div
                                  key={`cate${item.title}-${index}`}
                                  variants={slide}
                                  custom={0.45 + (index * 0.1)}
                                  initial="initial"
                                  animate="animate"
                                  exit="exit"
                                >
                                  <Link
                                    href={"#"}
                                  >
                                    <Badge
                                      variant="default"
                                      className='cursor-pointer select-none'
                                    >
                                      {cate}
                                    </Badge>
                                  </Link>
                                </motion.div>
                              )
                            })
                          }
                        </div>

                        {/* description */}
                        <motion.p
                          className='line-clamp-3 text-xs'
                          variants={slide}
                          custom={0.6}
                          initial="initial"
                          animate="animate"
                          exit="exit"
                        >
                          {
                            item.description
                          }
                        </motion.p>
                      </motion.div>
                    </div>

                    <motion.div
                      className='w-full h-full relative flex items-start overflow-hidden rounded-2xl'
                      variants={slide}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                    >
                      <Image src={item.image} alt={item.title} fill sizes='full' className='object-cover' priority />
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