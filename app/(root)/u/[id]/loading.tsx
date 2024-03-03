import React from 'react'

import { Skeleton } from "@/components/ui/skeleton"
import Container from '@/components/shared/Container'

const UserProfileLoading = () => {
  return (
    <Container className='h-dvh'>
      <Skeleton className="max-h-[35vh] aspect-[21/9] w-full rounded-lg" />
      <Skeleton className="size-28 rounded-full -mt-11 mx-auto" />
      <Skeleton className="h-8 w-[200px] mx-auto mt-4" />
      <Skeleton className="h-4 w-[100px] mx-auto mt-1" />

      <div className='flex flex-col gap-1 mt-4'>
        <Skeleton className="h-4 w-full mx-auto mt-2" />
        <Skeleton className="h-4 w-full mx-auto mt-2" />
        <Skeleton className="h-4 w-1/2 mt-2" />
      </div>

      <div className='flex gap-4 mt-4 items-center justify-center'>
        <div>
          <Skeleton className="h-5 w-16 mx-auto" />
          <Skeleton className="h-4 w-8 mx-auto mt-1" />
        </div>
        <div>
          <Skeleton className="h-5 w-16 mx-auto" />
          <Skeleton className="h-4 w-8 mx-auto mt-1" />
        </div>
        <div>
          <Skeleton className="h-5 w-16 mx-auto" />
          <Skeleton className="h-4 w-8 mx-auto mt-1" />
        </div>
      </div>

      <Skeleton className="mt-4 h-full w-full rounded-lg" />
    </Container>
  )
}

export default UserProfileLoading