'use client'

import React, { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { IoEyeOutline } from "react-icons/io5";
import { GoHeart } from "react-icons/go";
import { AnimatePresence, motion } from 'framer-motion';

type IProps = {
  data: TrendingData
}

const Trending: FC<IProps> = ({ data }) => {
  return (
    <motion.div
      className='w-full h-fit overflow-hidden relative rounded-2xl shadow-lg dark:border'
      initial={{ y: "30", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: "30", opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
    >
      <div className='w-full h-[32dvh] lg:h-[60dvh] lg:min-h-[500px] min-h-[295px] overflow-hidden relative'>
        <Tabs defaultValue="anime" className="w-full h-full">
          <TabsList className='w-full h-fit rounded-none'>
            <TabsTrigger value="anime">Anime</TabsTrigger>
            <TabsTrigger value="manga">Manga</TabsTrigger>
            <TabsTrigger value="lightnovel">Lightnovel</TabsTrigger>
          </TabsList>
          {/* Anime */}
          <TabsContent value="anime" className='h-[calc(100%-40px)]'>
            <div
              className='flex flex-wrap justify-between h-full w-full px-2'
            >
              {
                data.anime.map((item, index) => {
                  return (
                    <motion.div
                      key={`animetranding-${index}`}
                      initial={{ y: "30", opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: "30", opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1], delay: 0.25 + (index * 0.1) }}
                      className='flex gap-2 w-1/2 lg:w-full px-1'
                    >
                      <Link
                        href={"#"}
                        className='flex gap-2'
                      >
                        <div className='min-w-8 h-12 relative rounded-md overflow-hidden'>
                          <Image src={item.image} alt={item.title} fill sizes='full' className='object-cover' />
                        </div>

                        <div className='flex flex-col'>
                          <p className='line-clamp-1'>{item.title}</p>

                          <div className='flex gap-3 text-secondary-foreground font-medium'>
                            <div className='flex items-center gap-1'>
                              <IoEyeOutline />
                              <span className='text-xs'>{item.view}</span>
                            </div>
                            <div className='flex items-center gap-1'>
                              <GoHeart />
                              <span className='text-xs'>{item.like}</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  )
                })
              }
            </div>
          </TabsContent>

          {/* Manga */}
          <TabsContent value="manga" className='h-[calc(100%-40px)]'>
            <div
              className='flex flex-wrap justify-between h-full w-full px-2'
            >
              {
                data.manga.map((item, index) => {
                  return (
                    <motion.div
                      key={`mangatranding-${index}`}
                      initial={{ y: "30", opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: "30", opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1], delay: 0.25 + (index * 0.1) }}
                      className='flex gap-2 w-1/2 lg:w-full px-1'
                    >
                      <Link
                        href={"#"}
                        className='flex gap-2'
                      >
                        <div className='min-w-8 h-12 relative rounded-md overflow-hidden'>
                          <Image src={item.image} alt={item.title} fill sizes='full' className='object-cover' />
                        </div>

                        <div className='flex flex-col'>
                          <p className='line-clamp-1'>{item.title}</p>

                          <div className='flex gap-3 text-secondary-foreground font-medium'>
                            <div className='flex items-center gap-1'>
                              <IoEyeOutline />
                              <span className='text-xs'>{item.view}</span>
                            </div>
                            <div className='flex items-center gap-1'>
                              <GoHeart />
                              <span className='text-xs'>{item.like}</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  )
                })
              }
            </div>
          </TabsContent>

          {/* lightnovel */}
          <TabsContent value="lightnovel" className='h-[calc(100%-40px)]'>
            <div
              className='flex flex-wrap justify-between h-full w-full px-2'
            >
              {
                data.lightnovel.map((item, index) => {
                  return (
                    <motion.div
                      key={`lightnoveltranding-${index}`}
                      initial={{ y: "30", opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: "30", opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1], delay: 0.25 + (index * 0.1) }}
                      className='flex gap-2 w-1/2 lg:w-full px-1'
                    >
                      <Link
                        href={"#"}
                        className='flex gap-2'
                      >
                        <div className='min-w-8 h-12 relative rounded-md overflow-hidden'>
                          <Image src={item.image} alt={item.title} fill sizes='full' className='object-cover' />
                        </div>

                        <div className='flex flex-col'>
                          <p className='line-clamp-1'>{item.title}</p>

                          <div className='flex gap-3 text-secondary-foreground font-medium'>
                            <div className='flex items-center gap-1'>
                              <IoEyeOutline />
                              <span className='text-xs'>{item.view}</span>
                            </div>
                            <div className='flex items-center gap-1'>
                              <GoHeart />
                              <span className='text-xs'>{item.like}</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  )
                })
              }
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </motion.div>
  )
}

export default Trending