import { and, desc, eq } from "drizzle-orm";

import { db } from "@/drizzle/db";
import { anime, animeSeason } from "@/drizzle/schema";

export const animeDetail = async (novelId: string) => {
  try {
    const existingLightnovel = await db.query.anime.findFirst({
      where: and(eq(anime.id, novelId), eq(anime.deleted, false)),
      with: {
        categories: {
          columns: {
            categoryId: false,
            animeId: false
          },
          with: {
            category: true
          }
        },
        seasons: {
          where: eq(animeSeason.deleted, false),
          orderBy: desc(animeSeason.createdAt),
          with: {
            episode: {
              columns: {
                id: true,
                viewed: true,
                createdAt: true,
                index: true,
                thumbnail: true,
                content: true,
              }
            }
          }
        },
        user: {
          columns: {
            id: true,
            name: true,
            image: true
          }
        },
        translationGroup: {
          columns: {
            id: true,
            name: true,
            image: true
          }
        },
        favorite: {
          columns: {
            favoriteId: true
          }
        }
      },
    })

    if (!existingLightnovel) return null

    return existingLightnovel
  } catch (error) {
    console.log(error)
    return null
  }
}