'use client'

import { FC } from 'react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { slide } from '@/lib/motion/slide'
import CardItem from '@/components/shared/Card/CardItem'

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
                <CardItem
                  {...item}
                  image={item.image as {
                    key?: string;
                    url: string;
                  } | null | undefined}
                />
              </motion.div>
            )
          })
        }
      </div>
    </div>
  )
}

export default NewlyUpdated