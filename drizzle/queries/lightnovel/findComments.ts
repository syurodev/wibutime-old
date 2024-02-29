import { db } from "@/drizzle/db";
import { commentToLightnovelChapter } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export const findLightnovelComments = async (
  limit: number,
  page: number,
  contentId: string
) => {
  try {
    const comments = await db.query.commentToLightnovelChapter.findMany({
      where: eq(commentToLightnovelChapter.chapterId, contentId),
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
                }
              }
            },
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
    })

    const result: CommentData[] = comments.map(comment => ({
      id: comment.comment.id,
      comment: comment.comment.comment,
      createdAt: comment.comment.createdAt!,
      user: {
        id: comment.comment.user.id,
        name: comment.comment.user.name,
        image: comment.comment.user.image ?? undefined,
      },
      replies: comment.comment.replies ? comment.comment.replies.map(comment => ({
        id: comment.id,
        comment: comment.comment,
        createdAt: comment.createdAt!,
        user: {
          id: comment.user.id,
          name: comment.user.name,
          image: comment.user.image ?? undefined,
        },
      })) : undefined
    }))

    return result

  } catch (error) {
    console.log(error)
    return null
  }
}