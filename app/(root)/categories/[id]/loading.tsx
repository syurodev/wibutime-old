import Container from '@/components/shared/Container'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const CategoryContentsLoading = () => {
  return (
    <Container>
      <Skeleton className="h-7 w-60 rounded-xl mb-3" />
      <div
        className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4'
      >
        {
          Array.from({ length: 12 }).map((_, index) => (
            <Skeleton key={`CategoryContentsLoading ${index}`} className="aspect-[2/3] w-full rounded-xl" />
          ))
        }
      </div>
    </Container>
  )
}

export default CategoryContentsLoading