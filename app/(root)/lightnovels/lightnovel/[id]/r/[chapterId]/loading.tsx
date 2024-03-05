import Container from '@/components/shared/Container'
import SlideWithoutScale from '@/components/shared/Motion/SlideWithoutScale'
import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const LightnovelReadingLoading = () => {
  return (
    <Container className='flex flex-col gap-3'>
      <SlideWithoutScale
        className='w-full h-7'
      >
        <Skeleton className='w-full max-w-[700px] h-7 mx-auto rounded-lg' />
      </SlideWithoutScale>

      <div className='flex gap-3 items-center justify-center'>
        {
          Array.from({ length: 3 }).map((_, index) => (
            <SlideWithoutScale
              key={index}
              delay={0.1 + (index * 0.1)}
              className='w-12 h-4 rounded-lg'
            >
              <Skeleton className='w-12 h-4 rounded-lg' />
            </SlideWithoutScale>
          ))
        }
      </div>

      <div className='flex flex-col gap-5 items-center justify-center'>
        {
          Array.from({ length: 20 }).map((_, index) => (
            <SlideWithoutScale
              key={`content ${index}`}
              className='w-full h-5 rounded-lg'
              delay={0.3 + (index * 0.1)}
            >
              <Skeleton className='w-full h-5 rounded-lg' />
            </SlideWithoutScale>
          ))
        }
      </div>
    </Container>
  )
}

export default LightnovelReadingLoading