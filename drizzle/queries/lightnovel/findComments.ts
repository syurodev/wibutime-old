import { db } from "@/drizzle/db";
import { comment, commentToLightnovelChapter } from "@/drizzle/schema";
import { formatNumber } from "@/lib/formatNumber";
import { and, desc, eq, inArray, isNull } from "drizzle-orm";

export const findLightnovelComments = async (
  limit: number,
  page: number,
  contentId: string,
  userId?: string,
) => {
  try {
    const comments = await db.query.commentToLightnovelChapter.findMany({
      where: and(
        eq(commentToLightnovelChapter.chapterId, contentId),
        inArray(
          commentToLightnovelChapter.commentId,
          db.select({ id: comment.id })
            .from(comment)
            .where(isNull(comment.parentId))
        )
      ),
      with: {
        comment: {
          with: {
            replies: {
              with: {
                user: {
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
              }
            },
            user: {
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
        },
      },
      orderBy: desc(commentToLightnovelChapter.createdAt),
      offset: (page * limit),
      limit: limit,
    })

    const result: CommentData[] = comments.map(comment => ({
      id: comment.comment.id,
      comment: comment.comment.comment,
      createdAt: comment.comment.createdAt!,
      favoriteNumber: formatNumber(comment.comment.favorites.length ?? 0),
      isFavorite: !userId ? false : comment.comment.favorites.some(favorite => favorite.userId === userId),
      user: {
        id: comment.comment.user.id,
        name: comment.comment.user.name,
        image: comment.comment.user.image ?? undefined,
      },
      replies: comment.comment.replies ? comment.comment.replies.map(reply => ({
        id: reply.id,
        comment: reply.comment,
        favoriteNumber: formatNumber(reply.favorites.length ?? 0),
        isFavorite: !userId ? false : reply.favorites.some(favorite => favorite.userId === userId),
        createdAt: reply.createdAt!,
        user: {
          id: reply.user.id,
          name: reply.user.name,
          image: reply.user.image ?? undefined,
        },
      })) : undefined
    }))

    return result

  } catch (error) {
    console.log(error)
    return null
  }
}