import React, { FC } from 'react'
import { notFound } from 'next/navigation';

import { getChapterContent, getLightnovelComments } from '@/actions/lightnovel';
import ReadChapter from '@/components/Content/Lightnovel/Chapter/ReadChapter';
import Container from '@/components/shared/Container';
import Purchase from '@/components/shared/Purchase/Purchase';
import { getServerSession } from '@/lib/getServerSession';

type IProps = {
  params: { chapterId: string };
}

const ReadLightnovel: FC<IProps> = async ({ params }) => {

  const content = await getChapterContent(params.chapterId)

  if (!content.data) {
    notFound()
  }

  const comments = await getLightnovelComments(params.chapterId, "lightnovel chapter")

  return (
    <Container
      showScroll={true}
      className='max-h-dvh overflow-y-auto'
      reading={true}
      backgroundReading='bg-[#FFF0E6]'
    >
      {
        content.data.charge ? (
          <Purchase data={content.data} />
        ) : (
          <ReadChapter data={content.data} comments={comments.data} />
        )
      }
    </Container>
  )
}

export default ReadLightnovel