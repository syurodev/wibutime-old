import { FC } from 'react'

import { getServerSession } from '@/lib/getServerSession';
import { notFound } from 'next/navigation';
import ContentDetailHeader from '@/components/Content/Detail/ContentDetailHeader';
import ContentDetailBody from '@/components/Content/Detail/ContentDetailBody';

type IProps = {
  params: { id: string };
}

const LightnovelPage: FC<IProps> = async ({ params }) => {
  const session = await getServerSession()

  const res = await fetch(
    `${process.env.APP_URL}/api/ls/l/${params.id}`,
    {
      method: "POST",
      body: JSON.stringify({
        userId: session?.id ? session.id : ""
      }),
      next: { revalidate: 500 }
    }
  )

  if (!res.ok) return notFound()

  const data: {
    status: "success" | "error",
    data: LightnovelDetail | null
  } = await res.json()

  if (data.status === "error" || !data.data) return notFound()

  return (
    <div className='w-full flex flex-col md:flex-row gap-4 md:gap-0'>

      <ContentDetailHeader
        categories={data.data.categories}
        favorites={data.data.favorites.length}
        favorited={data.data.favorited}
        name={data.data.name}
        user={data.data.user}
        viewed={data.data.viewed}
        artist={data.data.artist}
        author={data.data.author}
        image={data.data.image?.url}
        translationGroup={data.data.translationGroup}
        words={data.data.words}
        id={data.data.id}
        menuType='lightnovel'
      />

      <ContentDetailBody
        contentId={params.id}
        note={data.data.note}
        otherNames={data.data.otherNames}
        summary={data.data.summary}
        user={data.data.user}
        volumes={data.data.volumes}
        type='lightnovel'
      />
    </div>
  )
}

export default LightnovelPage