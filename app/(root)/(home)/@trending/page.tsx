import React, { Suspense } from 'react'
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'

import { getHeroTrending } from '@/actions/home'
import TrendingComponent from '@/components/Home/Hero/Trending/TrendingComponent'
import TrendingLoading from './loading'

const Trending = async () => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ["herotrending"],
    queryFn: getHeroTrending
  })

  return (
    <section>
      <h1 className='uppercase font-semibold text-lg mb-1'>Trending</h1>

      <Suspense fallback={<TrendingLoading />}>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <TrendingComponent />
        </HydrationBoundary>
      </Suspense>
    </section>
  )
}

export default Trending