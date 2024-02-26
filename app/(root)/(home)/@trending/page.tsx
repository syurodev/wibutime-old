import React from 'react'
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'

import { getHeroTrending } from '@/actions/home'
import TrendingComponent from '@/components/Home/Hero/Trending/TrendingComponent'

const Trending = async () => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ["herotrending"],
    queryFn: getHeroTrending
  })

  return (

    <HydrationBoundary state={dehydrate(queryClient)}>
      <TrendingComponent />
    </HydrationBoundary>
  )
}

export default Trending