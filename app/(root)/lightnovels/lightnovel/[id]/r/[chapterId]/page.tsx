import React, { FC } from 'react'
import { notFound } from 'next/navigation';

import { getChapterContent, purchaseChapter } from '@/actions/lightnovel';
import ReadChapter from '@/components/Content/Lightnovel/Chapter/ReadChapter';
import Container from '@/components/shared/Container';
import { LuCoins } from 'react-icons/lu';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import Purchase from '@/components/shared/Purchase/Purchase';

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
      {
        content.data.charge ? (
          <Purchase data={content.data} />
        ) : (
          <ReadChapter data={content.data} />
        )
      }
    </Container>
  )
}

export default ReadLightnovel