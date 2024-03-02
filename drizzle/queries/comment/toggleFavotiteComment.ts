
import { and, eq } from "drizzle-orm";

import { db } from "@/drizzle/db";
import { favoriteComment } from "@/drizzle/schema";

export const toggleFavotiteComment = async (
  commentId: string,
  userId: string,
  currentFavoriteStatus: boolean
) => {
  try {
    if (currentFavoriteStatus) {
      const removedFavorite = await db.delete(favoriteComment)
        .where(and(
          eq(favoriteComment.commentId, commentId),
          eq(favoriteComment.userId, userId),
        ))
        .returning({ id: favoriteComment.userId })

      if (removedFavorite.length === 0) return false

      return true
    } else {
      const createdFavorite = await db.insert(favoriteComment)
        .values({
          commentId: commentId,
          userId: userId
        })
        .returning({ id: favoriteComment.userId })

      if (createdFavorite.length === 0) return false

      return true
    }
  } catch (error) {
    console.log(error)
    return false
  }
}