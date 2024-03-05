import React from 'react'
import { notFound } from 'next/navigation'

import Container from '@/components/shared/Container'
import CategoriesContent from './_components/CategoriesContent'

const CategoriesPage = async () => {
  const res = await fetch(`${process.env.APP_URL}/api/categories`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: { revalidate: 300 }
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