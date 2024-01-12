'use client'

import { FC } from 'react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { slide } from '@/lib/motion'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'

type IProps = {
  title: string,
  data: NewlyData[]
}

const NewlyUpdated: FC<IProps> = ({ title, data }) => {
  return (
    <div>
      <div className='flex justify-between items-center'>
        <h1 className='uppercase font-semibold text-lg'>{title}</h1>

        <Button variant={"ghost"}>See more</Button>
      </div>

      <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4'>
        {
          data.map((item, index) => {
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
                <Link
                  href={`/${item.type}s/${item.type}/${item._id}`}
                  scroll
                >
                  <Card>
                    <CardContent className="flex aspect-[2/3] items-center justify-center p-6 relative overflow-hidden rounded-lg shadow">
                      <div className='absolute z-10 w-full bottom-0 p-2 bg-background/60 backdrop-blur-lg'>
                        <p className='line-clamp-1 font-medium text-sm'>{item.title}</p>

                        <p className='flex gap-1 items-center text-xs uppercase mt-1'>
                          <span>
                            {item.type === "anime" ? "EP" : "CHAP"}
                          </span>
                          <span className='font-semibold'>
                            {item.current}
                          </span>
                          <span>|</span>
                          <span>
                            {item.end || "??"}
                          </span>
                        </p>
                      </div>
                      <Image
                        src={item.image}
                        fill
                        alt={item._id}
                        sizes='100%'
                        className='object-cover'
                      />
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            )
          })
        }
      </div>
    </div>
  )
}

export default NewlyUpdated