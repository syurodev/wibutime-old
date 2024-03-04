import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const ContentLoading = () => {
  return (
    <div
      className='w-full flex flex-col md:flex-row gap-4 md:gap-0'
    >
      <div
        className='w-full min-h-[800px] h-dvh md:min-w-[40%] flex flex-col items-center relative justify-center gap-3 px-3 pt-[120px] pb-16'
      >
        <div
          className='w-full flex items-center justify-center gap-10 absolute top-20'
        >
          <div
            className='flex items-center gap-2'
          >
            <Skeleton className="size-8 rounded-full" />
            <div
              className='flex flex-col items-start justify-start gap-1'
            >
              <Skeleton className="h-4 w-9 rounded-lg" />
              <Skeleton className="h-3 w-12 rounded-lg" />
            </div>
          </div>

          <div
            className='flex items-center gap-2'
          >
            <Skeleton className="size-8 rounded-full" />
            <div
              className='flex flex-col items-start justify-start gap-1'
            >
              <Skeleton className="h-4 w-9 rounded-lg" />
              <Skeleton className="h-3 w-12 rounded-lg" />
            </div>
          </div>
        </div>

        <Skeleton className="aspect-[2/3] w-full max-w-[54%] h-fit max-h-[81%] lg:max-h-[500px] lg:max-w-[333px] relative rounded-lg" />

        <Skeleton className="h-6 w-full max-w-[450px] rounded-lg" />

        <div
          className='flex gap-4 justify-center'
        >
          <Skeleton className="h-4 w-7 rounded-lg" />
          <Skeleton className="h-4 w-7 rounded-lg" />
          <Skeleton className="h-4 w-7 rounded-lg" />
        </div>

        <div
          className='flex justify-center items-center gap-3 flex-wrap max-w-[96%]'
        >
          <Skeleton className="h-6 w-20 rounded-lg" />
          <Skeleton className="h-6 w-20 rounded-lg" />
          <Skeleton className="h-6 w-20 rounded-lg" />
          <Skeleton className="h-6 w-20 rounded-lg" />
        </div>

        <div
          className='flex items-center gap-8 absolute bottom-2 font-semibold'
        >
          <Skeleton className="h-6 w-20 rounded-lg" />
          <Skeleton className="h-6 w-20 rounded-lg" />
        </div>

      </div>

      <div
        className='flex flex-col gap-4 px-4 md:mt-20 pb-4 w-full md:min-h-[720px] md:sticky md:h-[calc(100dvh-80px)] md:overflow-y-scroll'
      >
        <Skeleton className="rounded-lg w-full h-32 lg:h-56" />
        <Skeleton className="rounded-lg w-full h-32 lg:h-56" />
        <Skeleton className="rounded-lg w-full h-32 lg:h-56" />
        <Skeleton className="rounded-lg w-full h-96" />
      </div>
    </div>
  )
}

export default ContentLoading