import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const NewsLoading = () => {
  return (
    <div>
      <h1 className='uppercase font-semibold text-lg mb-1'>News</h1>

      <Skeleton
        className="aspect-[2/3] min-h-[500px] w-full md:max-h-[60vh] rounded-2xl"
      />
    </div>
  )
}

export default NewsLoading