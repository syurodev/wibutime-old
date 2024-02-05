import { desc, eq } from "drizzle-orm";

import { db } from "@/drizzle/db";
import { manga, mangaChapter, mangaSeason } from "@/drizzle/schema";

export const findLatestMangas = async (take: number) => {
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
              limit: 1,
              columns: {
                id: true,
                index: true,
              }
            }
          }
        },
        favorite: {
          columns: {
            favoriteId: false,
            mangaId: false
          },
          with: {
            favorite: {
              columns: {
                id: true
              }
            }
          }
        }
      },
      limit: take,
      orderBy: desc(manga.updatedAt)
    })

    if (!mangas) return []

    return mangas
  } catch (error) {
    console.log(error)
    return []
  }
}