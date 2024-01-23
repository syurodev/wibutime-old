import React, { FC } from 'react'

import RenderEditorContent from '@/components/shared/TextEditor/RenderEditorContent'
import { Button } from '@/components/ui/button'
import { LuCaseSensitive, LuEye, LuHeart, LuMessageCircle } from 'react-icons/lu'

type IProps = {
  data: LightnovelChapterDetail
}

const ReadChapter: FC<IProps> = ({ data }) => {
  return (
    <div className='flex flex-col gap-8'>
      <div className='w-full flex flex-col items-center justify-center'>
        <h3>{data.name}</h3>
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