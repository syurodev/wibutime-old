import React from 'react'
import { notFound } from 'next/navigation'

import Container from '@/components/shared/Container'
import FullSearchContents from '@/components/Content/FullSearchContents/FullSearchContents'

const AnimesPage = async () => {
  const res = await fetch(
    `${process.env.APP_URL}/api/as/news?limit=${12}&page=${0}`,
    {
      method: "GET",
      next: { revalidate: 120 },
    }
  )

  if (!res.ok) return notFound()

  const data: {
    status: "success" | "error",
    data: AnimeNew | null
  } = await res.json()

  if (data.status === "error" || !data.data) return notFound()

  return (
    <Container>
      <FullSearchContents
        type='anime'
        animes={data.data.animes}
      />
    </Container>
  )
}

export default AnimesPage