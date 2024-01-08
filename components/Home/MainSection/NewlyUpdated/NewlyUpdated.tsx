'use client'

import { FC } from 'react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { slide } from '@/lib/motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
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

      <div className='grid grid-cols-2 md:grid-cols-5 gap-4'>
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
                >
                  <Card>
                    <CardContent className="flex aspect-[2/3] items-center justify-center p-6 relative overflow-hidden rounded-lg shadow">
                      <div className='absolute z-10 w-full bottom-0 p-2 bg-background/60 backdrop-blur-lg'>
                        <Badge className='uppercase text-xs' variant={item.type as "lightnovel" | "anime" | "manga" | "default" | "secondary" | "destructive" | "outline" | null | undefined}>{item.type}</Badge>

                        <p className='line-clamp-1 font-semibold'>{item.title}</p>

                        <p className='flex gap-1 items-center text-xs font-semibold uppercase mt-1'>
                          <span>
                            {item.type === "anime" ? "EP" : "CHAP"}
                          </span>
                          <span>
                            {item.current}
                          </span>
                          {/* <LuDot /> */}
                          <span>|</span>
                          <span>
                            {item.end}
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