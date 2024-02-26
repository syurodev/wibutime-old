import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const NewsLoading = () => {
  return (
    <Skeleton
      className="aspect-[2/3] min-h-[500px] w-full md:max-h-[60vh] rounded-2xl"
    />
  )
}

export default NewsLoading