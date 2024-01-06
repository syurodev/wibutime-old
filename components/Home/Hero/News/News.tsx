'use client'

import { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { buttonVariants } from "@/components/ui/button"
import { IoArrowForward } from "react-icons/io5";
import { Badge } from '@/components/ui/badge';
import { LuDot } from "react-icons/lu";
import { motion } from 'framer-motion'

type IProps = {
  data: NewsData[]
}

const News: FC<IProps> = ({ data }) => {
  return (
    <motion.div
      className='w-full h-fit overflow-hidden relative rounded-2xl shadow-lg'
      initial={{ y: "30", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: "30", opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
    >
      {
        data.map((item, index) => {
          return (
            <div
              key={`heroNew-${index}`}
              className='w-full h-[60dvh] min-h-[500px] overflow-hidden rounded-2xl relative'
            >
              <div className='absolute w-full h-full z-30 flex flex-col justify-between'>
                <div></div>

                <motion.div
                  className='flex flex-col gap-3 p-3 bg-background/60 backdrop-blur-md max-h-[85%] overflow-y-hidden'
                  initial={{ y: "30", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: "30", opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1], delay: 0.15 }}
                >
                  {/* type and watch now btn */}
                  <div className='flex items-center justify-between'>
                    <motion.div
                      initial={{ y: "30", opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: "30", opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
                    >
                      <Badge
                        variant="secondary"
                        className='cursor-pointer select-none uppercase'
                      >
                        {item.type}
                      </Badge>
                    </motion.div>

                    <motion.div
                      initial={{ y: "30", opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: "30", opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1], delay: 0.3 }}
                    >
                      <Link
                        href={"#"}
                        className={`${buttonVariants({ variant: "default" })} gap-2`}>
                        <span>Watch now</span>
                        <IoArrowForward className="text-lg" />
                      </Link>
                    </motion.div>
                  </div>

                  {/* title */}
                  <motion.h2
                    className='font-semibold text-xl text-pretty line-clamp-3'
                    initial={{ y: "30", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: "30", opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1], delay: 0.35 }}
                  >
                    {item.title}
                  </motion.h2>

                  {/* ep and duration */}
                  <motion.div
                    className='flex gap-1 items-center font-semibold text-secondary-foreground'
                    initial={{ y: "30", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: "30", opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1], delay: 0.4 }}
                  >
                    <span className='uppercase'>{item.ep}</span>
                    <LuDot className="text-lg" />
                    <span>{item.duration}m</span>
                  </motion.div>

                  {/* categories */}
                  <div className='flex gap-3 items-center'>
                    {
                      item?.categories.map((cate, index) => {
                        return (
                          <motion.div
                            key={`cate${item.title}-${index}`}
                            initial={{ y: "30", opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: "30", opacity: 0 }}
                            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1], delay: 0.45 + (index * 0.1) }}
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

                  <motion.p
                    className='line-clamp-3 text-xs'
                    initial={{ y: "30", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: "30", opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1], delay: 0.6 }}
                  >
                    {
                      item.description
                    }
                  </motion.p>
                </motion.div>
              </div>
              <Image src={item.image} alt={item.title} fill sizes='full' className='object-cover' priority />
            </div>
          )
        })
      }
    </motion.div>
  )
}

export default News