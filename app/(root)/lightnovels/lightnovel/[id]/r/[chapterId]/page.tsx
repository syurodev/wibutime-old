import React, { FC } from 'react'
import { notFound } from 'next/navigation';

import { getChapterContent } from '@/actions/lightnovel';
import ReadChapter from '@/components/Content/Lightnovel/Chapter/ReadChapter';
import Container from '@/components/shared/Container';
import Purchase from '@/components/shared/Purchase/Purchase';

type IProps = {
  params: { chapterId: string };
}

const ReadLightnovel: FC<IProps> = async ({ params }) => {

  const content = await getChapterContent(params.chapterId)

  if (!content.data) {
    notFound()
  }

  const res = await fetch(`${process.env.APP_URL}/api/lightnovels/lightnovel/comment?id=${params.chapterId}&type=lightnovel chapter`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })

  let comments: CommentData[] = []

  if (res.ok) {
    comments = await res.json()
  }


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
          <ReadChapter data={content.data} comments={comments} />
        )
      }
    </Container>
  )
}

export default ReadLightnovel