import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const HomeLoading = () => {
  return (
    <div className='flex flex-col gap-5'>
      <div>
        <p className='text-lg font-semibold mb-3 uppercase'>Newly updated anime</p>
        <Skeleton className='w-full h-56 rounded-lg' />
      </div>
      <div>
        <p className='text-lg font-semibold mb-3 uppercase'>Newly updated manga</p>
        <Skeleton className='w-full h-56 rounded-lg' />
      </div>
      <div>
        <p className='text-lg font-semibold mb-3 uppercase'>Newly updated lightnovel</p>
        <Skeleton className='w-full h-56 rounded-lg' />
      </div>
    </div>
  )
}

export default HomeLoading