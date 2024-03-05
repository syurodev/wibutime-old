import React from 'react'
import { notFound } from 'next/navigation'

import News from './_Component/News'

const NewsPage = async () => {
  const res = await fetch(
    `${process.env.APP_URL}/api/home/news?limit=3`,
    {
      method: "GET",
      next: { revalidate: 60 },
    }
  )

  if (!res.ok) return notFound()

  const data: {
    status: "success" | "error",
    data: {
      animes: AnimeNew;
      mangas: MangaNew;
      lightnovels: LightnovelNew;
    } | null
  } = await res.json()

  if (data.status === "error" || !data.data) return notFound()

  const news: NewsData = [...data?.data?.animes?.animes, ...data?.data?.lightnovels?.lightnovels, ...data?.data?.mangas?.mangas]

  return (
    <section>
      <h1 className='uppercase font-semibold text-lg mb-1'>News</h1>

      <News data={news} />
    </section>
  )
}

export default NewsPage