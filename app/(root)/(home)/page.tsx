import { notFound } from "next/navigation";

import NewlyUpdated from "@/app/(root)/(home)/_components/NewlyUpdated";

export default async function Home() {
  const res = await fetch(
    `${process.env.APP_URL}/api/home/news?limit=12`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
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

  return (
    <section className="flex flex-col gap-5">
      <NewlyUpdated title='Newly updated anime' type='anime' animes={data.data.animes} />
      <NewlyUpdated title='Newly updated manga' type='manga' mangas={data.data.mangas} />
      <NewlyUpdated title='Newly updated lightnovel' type='lightnovel' lightnovels={data.data.lightnovels} />
    </section>
    // <MainSection />
  )
}
