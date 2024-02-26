import React from 'react'

import Container from '@/components/shared/Container'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

const CategoriesLoading = () => {
  return (
    <Container
      className='grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'
    >
      {
        Array.from({ length: 12 }).map((_, index) => (
          <Card
            key={`category loading ${index}`}
          >
            <CardHeader
              className='px-3 py-3'
            >
              <Skeleton className="h-4 w-full" />
            </CardHeader>
            <CardContent
              className='px-3 py-3 flex flex-col gap-2'
            >
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-full" />
            </CardContent>
          </Card>
        ))
      }
    </Container>
  )
}

export default CategoriesLoading