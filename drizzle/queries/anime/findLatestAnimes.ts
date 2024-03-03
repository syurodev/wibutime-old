import { desc, eq } from "drizzle-orm";

import { db } from "@/drizzle/db";
import { anime, animeEpisode, animeSeason } from "@/drizzle/schema";
import { formatNumber } from "@/lib/formatNumber";

export const findLatestAnimes = async (take: number): Promise<AnimeNew[] | null> => {
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
            image: true,
            numberOfEpisodes: true
          },
          with: {
            episode: {
              where: eq(animeEpisode.deleted, false),
              orderBy: desc(animeEpisode.createdAt),
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
            animeId: false
          },
        },
        user: {
          columns: {
            id: true
          }
        }
      },
      limit: take,
      orderBy: desc(anime.updatedAt)
    })

    if (!animes) return null

    const fotmatAnimes: AnimeNew[] | null = animes.length === 0 ? null : animes.map((anime) => ({
      id: anime.id,
      name: anime.name,
      summary: anime.summary,
      user: {
        id: anime.user.id
      },
      type: "anime" as ContentType,
      categories: anime.categories.map((cate) => cate.category),
      image: anime.seasons && anime.seasons.length > 0 ? anime.seasons[0].image as {
        key?: string,
        url: string
      } | null : null,
      seasons: !anime.seasons || anime.seasons.length === 0 ? null : {
        id: anime.seasons[0].id,
        name: anime.seasons[0].name,
        end: anime.seasons[0].numberOfEpisodes || 0,
        episodes: anime.seasons[0].episode.length === 0 ? null : anime.seasons[0].episode.map(item => ({
          id: item.id,
          index: item.index || ""
        })),
      },
      favorites: formatNumber(anime.favorites.length)
    }))

    return fotmatAnimes
  } catch (error) {
    console.log(error)
    return null
  }
}