import React from 'react'
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'

import { getHeroNews } from '@/actions/home'
import NewsComponent from '@/components/Home/Hero/News/NewsComponent'

const News = async () => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ["heronews"],
    queryFn: getHeroNews
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NewsComponent />
    </HydrationBoundary>
  )
}

export default News