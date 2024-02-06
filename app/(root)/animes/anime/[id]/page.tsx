
import { FC } from 'react'
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';

import { getAnimeDetail } from '@/actions/anime';
import AnimeDetail from '@/components/Content/Anime/AnimeDetail';

type IProps = {
  params: { id: string };
}

const AnimePage: FC<IProps> = async ({ params }) => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ["anime", params.id],
    queryFn: async () => await getAnimeDetail(params.id)
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AnimeDetail id={params.id} />
    </HydrationBoundary>
  )
}

export default AnimePage