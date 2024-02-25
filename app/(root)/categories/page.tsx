import React from 'react'
import { notFound } from 'next/navigation'

import Container from '@/components/shared/Container'
import CategoryCard from '@/components/shared/Card/CategoryCard'
import SlideWithoutScale from '@/components/shared/Motion/SlideWithoutScale'
import CategoriesContent from './_components/CategoriesContent'

const CategoriesPage = async () => {
  // const queryClient = new QueryClient()
  // await queryClient.prefetchQuery({
  //   queryKey: ["categories"],
  //   queryFn: getAllCategoriesAndContent
  // })

  const res = await fetch(`${process.env.APP_URL}/api/categories`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "force-cache"
  })

  if (!res.ok) return notFound()

  const data: {
    id: string;
    name: string;
    animes: number;
    mangas: number;
    lightnovels: number;
  }[] | null = await res.json()

  if (!data) return notFound()

  return (
    <Container
      className='h-dvh overflow-y-auto'
      showScroll={true}
    >
      <CategoriesContent data={data} />
      {/* </HydrationBoundary> */}
    </Container>
  )
}

export default CategoriesPage