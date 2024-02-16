import React, { FC } from 'react'
import { notFound } from 'next/navigation';

import { getChapterContent } from '@/actions/lightnovel';
import ReadChapter from '@/components/Content/Lightnovel/Chapter/ReadChapter';
import Container from '@/components/shared/Container';

type IProps = {
  params: { chapterId: string };
}

const ReadLightnovel: FC<IProps> = async ({ params }) => {

  const content = await getChapterContent(params.chapterId)

  if (!content.data) {
    notFound()
  }

  return (
    <Container>
      <ReadChapter data={content.data} />
    </Container>
  )
}

export default ReadLightnovel