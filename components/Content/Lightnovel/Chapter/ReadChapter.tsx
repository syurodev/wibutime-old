"use client"
import React, { FC, useEffect } from 'react'

import RenderEditorContent from '@/components/shared/TextEditor/RenderEditorContent'
import { LuCaseSensitive, LuEye, LuHeart, LuMessageCircle } from 'react-icons/lu'
import { updateLightnovelChapterViewed } from '@/actions/lightnovel'

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
    <div className='flex flex-col gap-8'>
      <div className='w-full flex flex-col items-center justify-center'>
        <h3 className='text-center'>{data.name}</h3>
        <div
          className='flex gap-5 justify-center'
        >
          <div
            className='flex items-center gap-1'
          >
            <LuCaseSensitive className="text-xl" />
            <span className='text-xs'>{data.words}</span>
          </div>
          <div
            className='flex items-center gap-1'
          >
            <LuEye />
            <span className='text-xs'>{data.viewed}</span>
          </div>

          <div
            className='flex items-center gap-1'
          >
            <LuMessageCircle />
            <span className='text-xs'>{data.comments.length}</span>
          </div>
        </div>
      </div>
      <RenderEditorContent content={data.content} />
    </div>
  )
}

export default ReadChapter