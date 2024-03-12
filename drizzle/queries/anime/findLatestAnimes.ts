import { and, desc, eq, inArray, sql } from "drizzle-orm";

import { db } from "@/drizzle/db";
import { anime, animeEpisode, animeSeason, categoryToAnime } from "@/drizzle/schema";
import { formatNumber } from "@/lib/formatNumber";

export const findLatestAnimes = async (
  limit: number,
  page: number = 0,
  categoriesFilter: string[]
): Promise<AnimeNew | null> => {
  try {
    const animeNumber: { num_anime: number }[] = await db.execute(sql`
      SELECT COUNT(*) AS num_anime
      FROM anime
      WHERE deleted = false;
    `)

    const animes = await db.query.anime.findMany({
      where: and(
        eq(anime.deleted, false),
        // inArray(
        //   anime.id,
        //   db.query.categoryToAnime.findMany({
        //     where: inArray(categoryToAnime.categoryId, categoriesFilter ?? []),
        //     columns:{
        //       animeId:true
        //     }
        //   })
        // ),
      ),
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
      offset: page * limit,
      limit: limit,
      orderBy: desc(anime.updatedAt)
    })

    if (!animes) return null

    const fotmatAnimes: AnimeNew | null = {
      animes: animes.length === 0 ? [] : animes.map((anime) => ({
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
      })),
      totalPage: +(animeNumber[0].num_anime / limit).toFixed()
    }

    return fotmatAnimes
  } catch (error) {
    console.log(error)
    return null
  }
}