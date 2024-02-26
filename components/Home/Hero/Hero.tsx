import React from 'react'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'

import News from './News/NewsComponent'
import Trending from './Trending/TrendingComponent'
import { getHero } from '@/actions/home';

const Hero = async () => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ["news", "trending"],
    queryFn: getHero
  })

  return (
    <section className='grid grid-cols-[1fr] lg:grid-cols-[3fr_1fr] gap-5'>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <News />
        <Trending />
      </HydrationBoundary>
    </section>
  )
}

export default Hero