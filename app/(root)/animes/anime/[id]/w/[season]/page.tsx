import React, { FC } from 'react'
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';

import { getSeasonDetail } from '@/actions/anime';
import AnimeWatchPageContent from '@/components/Content/Anime/AnimeWatchPageContent';

type IProps = {
  params: { season: string };
}

const WatchPage: FC<IProps> = async ({ params }) => {

  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ["anime", "season", params.season],
    queryFn: async () => await getSeasonDetail(params.season)
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AnimeWatchPageContent seasonId={params.season} />
    </HydrationBoundary>
  )
}

export default WatchPage