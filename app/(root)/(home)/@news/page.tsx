import React, { Suspense } from 'react'
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'

import { getHeroNews } from '@/actions/home'
import NewsComponent from '@/components/Home/Hero/News/NewsComponent'
import NewsLoading from './loading'

const News = async () => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ["heronews"],
    queryFn: getHeroNews
  })

  return (
    <section>
      <h1 className='uppercase font-semibold text-lg mb-1'>News</h1>

      <Suspense fallback={<NewsLoading />}>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <NewsComponent />
        </HydrationBoundary>
      </Suspense>
    </section>
  )
}

export default News