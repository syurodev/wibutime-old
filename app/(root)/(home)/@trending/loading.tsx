import React from 'react'

import { Skeleton } from '@/components/ui/skeleton'

const TrendingLoading = () => {
  return (
    <div>
      <h1 className='uppercase font-semibold text-lg mb-1'>Trending</h1>

      <Skeleton className='w-full h-[32dvh] lg:h-[60dvh] lg:min-h-[500px] min-h-[295px] rounded-2xl' />
    </div>
  )
}

export default TrendingLoading