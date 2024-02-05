import { desc, eq } from "drizzle-orm";

import { db } from "@/drizzle/db";
import { anime, animeEpisode, animeSeason } from "@/drizzle/schema";

export const findLatestAnimes = async (take: number) => {
  try {
    const animes = await db.query.anime.findMany({
      where: eq(anime.deleted, false),
      columns: {
        id: true,
        name: true,
        summary: true,
      },
      with: {
        categories: {
          columns: {
            categoryId: false,
            animeId: false
          },
          with: {
            category: true,
          },
        },
        seasons: {
          where: eq(animeSeason.deleted, false),
          orderBy: desc(animeSeason.updatedAt),
          limit: 1,
          columns: {
            id: true,
            name: true,
            image: true
          },
          with: {
            episode: {
              where: eq(animeEpisode.deleted, false),
              orderBy: desc(animeEpisode.createdAt),
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
            animeId: false
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
      orderBy: desc(anime.updatedAt)
    })

    if (!animes) return []

    return animes
  } catch (error) {
    console.log(error)
    return []
  }
}