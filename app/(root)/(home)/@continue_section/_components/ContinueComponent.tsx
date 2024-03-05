'use client'

import React, { FC } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'
import { slide } from '@/lib/motion/slide'

type IProps = {
  data: ContinueData[]
}

const ContinueComponent: FC<IProps> = ({ data }) => {
  return (
    <div>
      <Carousel
        opts={{
          align: "start",
          loop: false,
        }}
        className="w-full md:px-9"
      >
        <CarouselContent>
          {
            data.map((item, index) => {
              return (
                <CarouselItem key={`continiue-${index}`} className="basis-2/5 md:basis-1/4 lg:basis-1/6">
                  <motion.div
                    className="p-1"
                    variants={slide}
                    custom={0.4 + (index * 0.1)}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    <Card>
                      <CardContent className="flex aspect-[2/3] items-center justify-center p-6 relative overflow-hidden rounded-lg shadow">
                        <div className='absolute z-10 w-full bottom-0 p-2 bg-background/60 backdrop-blur-lg'>
                          <Badge className='uppercase text-xs' variant={item.type as "lightnovel" | "anime" | "manga" | "default" | "secondary" | "destructive" | "outline" | null | undefined}>{item.type}</Badge>
                          <p className='flex gap-1 items-center text-xs font-semibold uppercase mt-1'>
                            <span>
                              {item.type === "anime" ? "EP" : "CHAP"}
                            </span>
                            <span>
                              {item.history}
                            </span>
                            {/* <LuDot /> */}
                            <span>|</span>
                            <span>
                              {item.current}
                            </span>
                          </p>
                        </div>
                        <Image
                          src={item.image ? item.image.url : "/images/image2.jpeg"}
                          fill
                          alt={item.id}
                          sizes='full'
                          className='object-cover'
                        />
                      </CardContent>
                    </Card>
                  </motion.div>
                </CarouselItem>
              )
            })
          }
        </CarouselContent>
        <CarouselPrevious className='left-0 hidden md:flex' />
        <CarouselNext className='right-0 hidden md:flex' />
      </Carousel>
    </div>
  )
}

export default ContinueComponent