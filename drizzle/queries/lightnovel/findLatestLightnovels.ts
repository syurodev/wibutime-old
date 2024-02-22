import { desc, eq } from "drizzle-orm";

import { db } from "@/drizzle/db";
import { lightnovel, lightnovelChapter, lightnovelVolume } from "@/drizzle/schema";

export const findLatestLightnovels = async (take: number) => {
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

    if (!lightnovels) return []

    return lightnovels
  } catch (error) {
    console.log(error)
    return []
  }
}