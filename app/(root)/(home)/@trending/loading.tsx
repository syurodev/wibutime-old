import React from 'react'

import { Skeleton } from '@/components/ui/skeleton'

const TrendingLoading = () => {
  return (
    <Skeleton className='w-full h-[32dvh] lg:h-[60dvh] lg:min-h-[500px] min-h-[295px] rounded-2xl' />
  )
}

export default TrendingLoading