import { desc, eq } from "drizzle-orm";

import { db } from "@/drizzle/db";
import { lightnovel, lightnovelChapter, lightnovelVolume } from "@/drizzle/schema";
import { formatNumber } from "@/lib/formatNumber";

export const findLatestLightnovels = async (take: number): Promise<LightnovelNew[] | null> => {
  try {
    const lightnovels = await db.query.lightnovel.findMany({
      where: eq(lightnovel.deleted, false),
      columns: {
        id: true,
        name: true,
        image: true,
        summary: true,
      },
      with: {
        categories: {
          columns: {
            categoryId: false,
            lightnovelId: false
          },
          with: {
            category: true,
          },
        },
        volumes: {
          where: eq(lightnovelVolume.deleted, false),
          orderBy: desc(lightnovelVolume.updatedAt),
          limit: 1,
          columns: {
            id: true,
            name: true,
          },
          with: {
            chapters: {
              where: eq(lightnovelChapter.deleted, false),
              orderBy: desc(lightnovelChapter.createdAt),
              limit: 1,
              columns: {
                id: true,
                name: true,
                words: true
              }
            }
          }
        },
        favorites: {
          columns: {
            userId: true,
            lightnovelId: false
          },
        },
        user: {
          columns: {
            id: true
          }
        }
      },
      limit: take,
      orderBy: desc(lightnovel.updatedAt)
    })

    if (!lightnovels) return null

    const formatLightnovels: LightnovelNew[] | null = lightnovels.length === 0 ? null : lightnovels.map((novel) => ({
      id: novel.id,
      name: novel.name,
      summary: novel.summary,
      user: {
        id: novel.user.id
      },
      categories: novel.categories.map((cate) => cate.category),
      type: "lightnovel" as ContentType,
      image: novel.image as {
        key?: string,
        url: string
      } | null,
      volumes: novel.volumes.length === 0 ? null : {
        id: novel.volumes[0].id,
        name: novel.volumes[0].name,
        chapters: novel.volumes[0].chapters.length === 0 ? null : {
          id: novel.volumes[0].chapters[0].id,
          name: novel.volumes[0].chapters[0].name,
          words: formatNumber(novel.volumes[0].chapters[0].words || 0),
        }
      },
      favorites: formatNumber(novel.favorites.length)
    }))

    return formatLightnovels
  } catch (error) {
    console.log(error)
    return null
  }
}