import React from 'react'
import { notFound } from 'next/navigation'

import Trending from './_components/Trending'

const TrendingPage = async () => {
  const res = await fetch(
    `${process.env.APP_URL}/api/home/trending`,
    {
      method: "GET",
      next: { revalidate: 60 },
    }
  )

  if (!res.ok) return notFound()

  const data: {
    status: "success" | "error",
    data: {
      animes: TrendingData[];
      mangas: TrendingData[];
      lightnovels: TrendingData[];
    } | null
  } = await res.json()

  if (data.status === "error" || !data.data) return notFound()

  return (
    <section>
      <h1 className='uppercase font-semibold text-lg mb-1'>Trending</h1>

      <Trending data={data.data} />
    </section>
  )
}

export default TrendingPage