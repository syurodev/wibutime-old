import React from 'react'
import { notFound } from 'next/navigation'

import NewsComponent from '@/components/Home/Hero/News/NewsComponent'

const News = async () => {
  const res = await fetch(
    `${process.env.APP_URL}/api/home/news`,
    {
      method: "GET",
      cache: "default"
    }
  )

  if (!res.ok) return notFound()

  const data: {
    status: "success" | "error",
    data: NewsData | null
  } = await res.json()

  if (data.status === "error" || !data.data) return notFound()

  return (
    <section>
      <h1 className='uppercase font-semibold text-lg mb-1'>News</h1>

      <NewsComponent data={data.data} />
    </section>
  )
}

export default News