'use client'

import React, { FC, useEffect, useState } from 'react'
import { motion } from 'framer-motion'

import { Input } from '@/components/ui/input'

import CardItem from '@/components/shared/Card/CardItem'
import SlideWithoutScale from '@/components/shared/Motion/SlideWithoutScale'
import { slideWithoutScale } from '@/lib/motion/slide'

type IProps = {
  data: CategoryContents
}

const Content: FC<IProps> = ({ data }) => {
  const [items, setItems] = useState<{
    id: string;
    name: string;
    type: ContentType;
    image: {
      key: string;
      url: string;
    };
  }[]>(data.contents ?? [])
  const [slug, setSlug] = useState<string>("")

  useEffect(() => {
    if (!data.contents) return

    if (slug === "" || slug.trim() === "") {
      setItems(data.contents ?? [])
    } {
      const newItems = data.contents.filter(item => item.name.toLocaleLowerCase().includes(slug.toLocaleLowerCase()))

      setItems(newItems)
    }
  }, [data.contents, slug])

  return (
    <div className='flex flex-col gap-3'>
      <SlideWithoutScale
        className='max-w-lg w-full mx-auto sticky top-0'
      >
        <Input
          type='text'
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className='shadow'
        />
      </SlideWithoutScale>

      <motion.h3
        variants={slideWithoutScale}
        custom={0.1}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {data.name}
      </motion.h3>

      {
        items.length === 0 ? (
          <motion.p
            variants={slideWithoutScale}
            custom={0.2}
            initial="initial"
            animate="animate"
            exit="exit"
          >Không có nội dung</motion.p>
        ) : (
          <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4'>
            {
              items.map((content, index) => (
                <SlideWithoutScale
                  key={content.id}
                  delay={0.2 + (index * 0.05)}
                >
                  <CardItem
                    key={content.id}
                    id={content.id}
                    image={content.image}
                    name={content.name}
                    type={content.type}
                    showContentType={true}
                  />
                </SlideWithoutScale>
              ))
            }
          </div>
        )
      }
    </div>
  )
}

export default Content