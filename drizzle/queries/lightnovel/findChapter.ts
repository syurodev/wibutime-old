import { and, desc, eq } from "drizzle-orm";

import { db } from "@/drizzle/db";
import { lightnovelChapter, lightnovelVolume } from "@/drizzle/schema";
import { formatNumber } from "@/lib/formatNumber";
import { findChapterCharge } from "@/lib/findChapterCharge";

export const findChapter = async (chapterId: string, userId?: string) => {
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
            id: true,
          },
          with: {
            lightnovel: {
              columns: {
                id: true,
                userId: true,
                name: true
              },
              with: {
                volumes: {
                  columns: {
                    id: true,
                    image: true,
                    name: true
                  },
                  orderBy: desc(lightnovelVolume.createdAt),
                  with: {
                    chapters: {
                      columns: {
                        id: true,
                        charge: true,
                        name: true,
                      }
                    }
                  }
                }
              }
            },
          }
        }
      }
    })

    if (!existingChapter) return null

    let charge: boolean;

    charge = await findChapterCharge(existingChapter.charge ?? false, chapterId, existingChapter.volume.lightnovel.userId, userId)

    const volPromises = existingChapter.volume.lightnovel.volumes.map(async (vol) => {
      const chapterPromises = vol.chapters.map(async (chap) => ({
        id: chap.id,
        name: chap.name,
        charge: await findChapterCharge(chap.charge ?? false, chap.id, existingChapter.volume.lightnovel.userId, userId)
      }));

      const chapters = await Promise.all(chapterPromises);

      return {
        id: vol.id,
        name: vol.name,
        image: vol.image as {
          key: string,
          url: string
        },
        chapters: chapters
      };
    });

    const volumes = await Promise.all(volPromises);

    const result: LightnovelChapterDetail = {
      id: existingChapter.id,
      name: existingChapter.name,
      authorId: existingChapter.volume.lightnovel.userId,
      novelId: existingChapter.volume.lightnovel.id!,
      novelName: existingChapter.volume.lightnovel.name,
      charge: charge,
      content: existingChapter.content,
      volumes: volumes,
      comments: existingChapter.comments.length > 0 ? existingChapter.comments.map(comment => ({
        id: comment.comment.id,
        createAt: comment.comment.createdAt ? comment.comment.createdAt.toISOString() : "",
        updateAt: comment.comment.updatedAt ? comment.comment.updatedAt.toISOString() : "",
        comment: comment.comment.comment as any,
        user: {
          id: comment.comment.user.id,
          image: comment.comment.user.image as string,
          name: comment.comment.user.name,
        }
      })) : [],

      createdAt: existingChapter.createdAt ? existingChapter.createdAt.toISOString() : "",
      updateAt: existingChapter.updatedAt ? existingChapter.updatedAt.toISOString() : "",
      viewed: formatNumber(existingChapter.viewed || 0),
      words: formatNumber(existingChapter.words || 0)
    }

    return result
  } catch (error) {
    console.log(error)
    return null
  }
}