import { and, desc, eq } from "drizzle-orm";

import { db } from "@/drizzle/db";
import { lightnovel, lightnovelVolume } from "@/drizzle/schema";

export const lightnovelDetail = async (novelId: string) => {
  try {
    const existingLightnovel = await db.query.lightnovel.findFirst({
      where: and(eq(lightnovel.id, novelId), eq(lightnovel.deleted, false)),
      with: {
        categories: {
          columns: {
            categoryId: false,
            lightnovelId: false
          },
          with: {
            category: true
          }
        },
        volumes: {
          orderBy: desc(lightnovelVolume.createdAt),
          with: {
            chapters: {
              columns: {
                id: true,
                name: true,
                viewed: true,
                words: true,
                createdAt: true,
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