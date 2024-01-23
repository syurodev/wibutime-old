import React, { FC } from 'react'
import { notFound } from 'next/navigation';

import { getChapterContent } from '@/actions/lightnovel';
import ReadChapter from '@/components/Content/Lightnovel/Chapter/ReadChapter';

type IProps = {
  params: { chapterId: string };
}

const ReadLightnovel: FC<IProps> = async ({ params }) => {

  const content = await getChapterContent(params.chapterId)

  if (!content.data) {
    notFound()
  }

  return (
    <ReadChapter data={content.data} />
  )
}

export default ReadLightnovel