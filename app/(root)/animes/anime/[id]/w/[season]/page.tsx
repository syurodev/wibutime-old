import React, { FC } from 'react'

import { getSeasonDetail } from '@/actions/anime';
import AnimeWatchPageContent from '@/components/Content/Anime/AnimeWatchPageContent';
import Container from '@/components/shared/Container';
import { notFound } from 'next/navigation';

type IProps = {
  params: { season: string };
}

const WatchPage: FC<IProps> = async ({ params }) => {
  const res = await fetch(
    `${process.env.APP_URL}/api/as/a/${params.season}`,
    {
      method: "GET",
      next: { revalidate: 120 },
    }
  )
  if (!res.ok) return notFound()

  const data: {
    status: "success" | "error",
    data: SeasonDetail | null
  } = await res.json()

  if (data.status === "error" || !data.data) return notFound()

  return (
    <Container>
      <AnimeWatchPageContent data={data.data} />
    </Container>
  )
}

export default WatchPage