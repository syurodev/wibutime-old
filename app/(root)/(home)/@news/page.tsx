import React from 'react'
import { notFound } from 'next/navigation'

import NewsComponent from '@/components/Home/Hero/News/NewsComponent'

const News = async () => {
  const res = await fetch(
    `${process.env.APP_URL}/api/home/news?limit=3`,
    {
      method: "GET",
      next: { revalidate: 5000 },
      cache: "default"
    }
  )

  if (!res.ok) return notFound()

  const data: {
    status: "success" | "error",
    data: {
      animes: AnimeNew[];
      mangas: MangaNew[];
      lightnovels: LightnovelNew[];
    } | null
  } = await res.json()

  if (data.status === "error" || !data.data) return notFound()

  const news: NewsData = [...data.data.animes, ...data.data.lightnovels, ...data.data.mangas]

  return (
    <section>
      <h1 className='uppercase font-semibold text-lg mb-1'>News</h1>

      <NewsComponent data={news} />
    </section>
  )
}

export default News