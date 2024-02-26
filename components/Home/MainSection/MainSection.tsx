import React from 'react'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'

import NewlyUpdated from './NewlyUpdated/NewlyUpdated'
import { getNews } from '@/actions/home';



const MainSection = async () => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ["main section", "animenews", "manganews", "lightnovelnews"],
    queryFn: async () => await getNews(12)
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NewlyUpdated title='Newly updated anime' type='anime' />
      <NewlyUpdated title='Newly updated manga' type='manga' />
      <NewlyUpdated title='Newly updated lightnovel' type='lightnovel' />
    </HydrationBoundary>
  )
}

export default MainSection