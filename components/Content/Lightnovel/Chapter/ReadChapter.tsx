"use client"
import React, { FC, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'

import RenderEditorContent from '@/components/shared/TextEditor/RenderEditorContent'
import { LuCaseSensitive, LuEye, LuMessageCircle } from 'react-icons/lu'
import { updateLightnovelChapterViewed } from '@/actions/lightnovel'
import { slideWithoutScale } from '@/lib/motion/slide'

const MenuButton = dynamic(() => import('@/components/Content/Lightnovel/Chapter/MenuButton'), {
  ssr: true,
})

type IProps = {
  data: LightnovelChapterDetail
}

const ReadChapter: FC<IProps> = ({ data }) => {
  useEffect(() => {
    const upViewed = setTimeout(async () => {
      await updateLightnovelChapterViewed(data.id)
    }, 30 * 1000)

    return () => {
      clearTimeout(upViewed)
    }
  }, [data.id])

  return (
    <>
      <div className='flex flex-col gap-8'>
        <div className='w-full flex flex-col items-center justify-center'>
          <motion.h3
            className='text-center font-serif'
            variants={slideWithoutScale}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {data.name}
          </motion.h3>
          <div
            className='flex gap-5 justify-center'
          >
            <motion.div
              variants={slideWithoutScale}
              initial="initial"
              animate="animate"
              exit="exit"
              custom={0.1}
              className='flex items-center gap-1'
            >
              <LuCaseSensitive className="text-xl" />
              <span className='text-xs font-semibold'>{data.words}</span>
            </motion.div>
            <motion.div
              variants={slideWithoutScale}
              initial="initial"
              animate="animate"
              exit="exit"
              custom={0.125}
              className='flex items-center gap-1'
            >
              <LuEye />
              <span className='text-xs font-semibold'>{data.viewed}</span>
            </motion.div>

            <motion.div
              variants={slideWithoutScale}
              initial="initial"
              animate="animate"
              exit="exit"
              custom={0.15}
              className='flex items-center gap-1'
            >
              <LuMessageCircle />
              <span className='text-xs font-semibold'>{data.comments.length}</span>
            </motion.div>
          </div>
        </div>

        <motion.div
          variants={slideWithoutScale}
          initial="initial"
          animate="animate"
          exit="exit"
          custom={0.2}
          className='max-w-[1200px] mx-auto px-4'
        >
          <RenderEditorContent
            content={data.content}
            font='font-serif'
            fontSize='text-[1.2rem]'
          />
        </motion.div>
      </div>

      <MenuButton
        novelId={data.novelId}
        currentChapter={data.id}
        volumes={data.volumes}
        novelName={data.novelName}
        authorId={data.authorId}
      />
    </>
  )
}

export default ReadChapter