import { and, eq } from "drizzle-orm";

import { db } from "@/drizzle/db";
import { lightnovelChapter } from "@/drizzle/schema";

export const findChapter = async (chapterId: string) => {
  try {
    const existingChapter = await db.query.lightnovelChapter.findFirst({
      where: and(eq(lightnovelChapter.id, chapterId), eq(lightnovelChapter.deleted, false)),
      with: {
        comments: {
          with: {
            comment: {
              columns: {
                id: true,
                comment: true,
                createdAt: true,
                updatedAt: true,
                reply: true
              },
              with: {
                user: {
                  columns: {
                    id: true,
                    name: true,
                    image: true
                  }
                }
              },
            }
          }
        },
        volume: {
          columns: {
            id: true
          },
          with: {
            lightnovel: {
              columns: {
                id: true,
                userId: true
              }
            }
          }
        }
      }
    })

    if (!existingChapter) return null

    return existingChapter
  } catch (error) {
    console.log(error)
    return null
  }
}