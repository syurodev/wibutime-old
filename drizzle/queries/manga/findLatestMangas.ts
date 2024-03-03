import { desc, eq } from "drizzle-orm";

import { db } from "@/drizzle/db";
import { manga, mangaChapter, mangaSeason } from "@/drizzle/schema";
import { formatNumber } from "@/lib/formatNumber";

export const findLatestMangas = async (take: number): Promise<MangaNew[] | null> => {
  try {
    const mangas = await db.query.manga.findMany({
      where: eq(manga.deleted, false),
      columns: {
        id: true,
        name: true,
        summary: true,
      },
      with: {
        categories: {
          columns: {
            categoryId: false,
            mangaId: false
          },
          with: {
            category: true,
          },
        },
        seasons: {
          where: eq(mangaSeason.deleted, false),
          orderBy: desc(mangaSeason.updatedAt),
          limit: 1,
          columns: {
            id: true,
            name: true,
            image: true
          },
          with: {
            chapters: {
              where: eq(mangaChapter.deleted, false),
              orderBy: desc(mangaChapter.createdAt),
              columns: {
                id: true,
                index: true,
              }
            }
          }
        },
        favorites: {
          columns: {
            userId: true,
            mangaId: false
          },
        },
        user: {
          columns: {
            id: true
          }
        }
      },
      limit: take,
      orderBy: desc(manga.updatedAt)
    })

    if (!mangas) return null

    const formatMangas: MangaNew[] | null = mangas.length === 0 ? null : mangas.map((manga) => ({
      id: manga.id,
      name: manga.name,
      summary: manga.summary,
      user: {
        id: manga.user.id
      },
      type: "manga" as ContentType,
      categories: manga.categories.map((cate) => cate.category),
      image: manga.seasons[0].image as {
        key?: string,
        url: string
      } | null,
      seasons: manga.seasons.length === 0 ? null : {
        id: manga.seasons[0].id,
        name: manga.seasons[0].name,
        chapters: manga.seasons[0].chapters.length === 0 ? null : manga.seasons[0].chapters.map((item) => ({
          id: item.id,
          index: item.index || ""
        })),
      },
      favorites: formatNumber(manga.favorites.length)
    }))

    return formatMangas
  } catch (error) {
    console.log(error)
    return null
  }
}