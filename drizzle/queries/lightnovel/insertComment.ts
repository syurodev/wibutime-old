import { db } from "@/drizzle/db";
import { CommentInsert, comment, commentToLightnovelChapter } from "@/drizzle/schema";

export const insertComment = async (
  values: CommentInsert,
  contentId: string,
  replyId?: string,
) => {
  try {
    const createdComment = await db.insert(comment)
      .values({ ...values })
      .returning({
        id: comment.id
      })

    if (createdComment.length === 0) return null

    await db.insert(commentToLightnovelChapter)
      .values({
        chapterId: contentId,
        commentId: createdComment[0].id
      })

    return createdComment[0]
  } catch (error) {
    console.log(error)
    return null
  }
}