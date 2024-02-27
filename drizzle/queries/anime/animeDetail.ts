import { and, desc, eq } from "drizzle-orm";

import { db } from "@/drizzle/db";
import { anime, animeSeason } from "@/drizzle/schema";
import { formatNumber } from "@/lib/formatNumber";
import { checkUserIdExistsInFavotiteArray } from "@/lib/checkUserIdExistsInFavotiteArray";

export const animeDetail = async (animeId: string, userId?: string) => {
  try {
    const existingAnime = await db.query.anime.findFirst({
      where: and(eq(anime.id, animeId), eq(anime.deleted, false)),
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
              orderBy: desc(animeSeason.createdAt),
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
        favorites: {
          columns: {
            userId: true
          }
        }
      },
    })

    if (!existingAnime) return null

    const result: AnimeDetail = {
      id: existingAnime.id,
      name: existingAnime.name,
      type: "anime",
      createdAt: existingAnime.createdAt ? existingAnime.createdAt.toISOString() : "",
      updateAt: existingAnime.updatedAt ? existingAnime.updatedAt.toISOString() : "",
      categories: existingAnime.categories.map(cate => cate.category),
      favorited: !userId ? false : checkUserIdExistsInFavotiteArray(existingAnime.favorites, userId),
      favorites: existingAnime.favorites,
      otherNames: existingAnime.otherNames as string[],
      summary: existingAnime.summary,
      note: existingAnime.note,
      user: existingAnime.user,
      viewed: formatNumber(existingAnime.seasons.reduce((totalViewed, season) => {
        return totalViewed + season.episode.reduce((seasonViewed, ep) => {
          return seasonViewed + (ep.viewed || 0);
        }, 0);
      }, 0)),
      translationGroup: existingAnime.translationGroup as {
        id: string;
        image: {
          key?: string,
          url: string
        } | null;
        name: string;
      },
      image: existingAnime.seasons[0].image as {
        key?: string,
        url: string
      } | undefined,
      seasons: existingAnime.seasons.map(item => (
        {
          id: item.id,
          name: item.name,
          createdAt: item.createdAt ? item.createdAt.toISOString() : "",
          updateAt: item.createdAt ? item.createdAt.toISOString() : "",
          image: item.image as {
            key?: string,
            url: string
          } | null,
          aired: item.aired,
          studio: item.studio,
          broadcastDay: item.broadcastDay,
          broadcastTime: item.broadcastTime.toISOString(),
          numberOfEpisodes: item.numberOfEpisodes || 0,
          episodes: item.episode.map(ep => ({
            id: ep.id,
            index: ep.index!,
            createdAt: ep.createdAt ? ep.createdAt.toISOString() : "",
            viewed: formatNumber(ep.viewed || 0),
            content: ep.content as {
              key: string,
              url: string
            },
            thumbnail: ep.thumbnail ? ep.thumbnail as {
              key: string,
              url: string
            } : null
          }))
        }
      ))
    }

    return result
  } catch (error) {
    console.log(error)
    return null
  }
}