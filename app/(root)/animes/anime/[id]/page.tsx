import { FC } from 'react'

import { getServerSession } from '@/lib/getServerSession';
import { notFound } from 'next/navigation';
import ContentDetailHeader from '@/components/Content/Detail/ContentDetailHeader';
import ContentDetailBody from '@/components/Content/Detail/ContentDetailBody';

type IProps = {
  params: { id: string };
}

const AnimePage: FC<IProps> = async ({ params }) => {
  const session = await getServerSession()

  const res = await fetch(
    `${process.env.APP_URL}/api/as/a/${params.id}`,
    {
      method: "POST",
      body: JSON.stringify({
        userId: session?.id ? session.id : ""
      }),
      cache: "default"
    }
  )

  if (!res.ok) return notFound()

  const data: {
    status: "success" | "error",
    data: AnimeDetail | null
  } = await res.json()

  if (data.status === "error" || !data.data) return notFound()

  return (
    <div className='w-full flex flex-col md:flex-row gap-4 md:gap-0'>
      <ContentDetailHeader
        categories={data.data.categories}
        favorites={data.data.favorites.length}
        name={data.data.name}
        user={data.data.user}
        viewed={data.data.viewed}
        translationGroup={data.data.translationGroup}
        image={data.data.image?.url}
        menuType='anime'
        id={data.data.id}
        favorited={data.data.favorited}
      />

      <ContentDetailBody
        contentId={params.id}
        note={data.data.note}
        otherNames={data.data.otherNames}
        summary={data.data.summary}
        user={data.data.user}
        animeSeasons={data.data.seasons}
        type='anime'
      />
    </div>
  )
}

export default AnimePage