"use server"

import { toggleFavotiteComment } from "@/drizzle/queries/comment/toggleFavotiteComment"
import { getServerSession } from "@/lib/getServerSession"
import { revalidatePath } from "next/cache"

export const toggleFavotiteCommentAction = async (
  commentId: string,
  currentFavoriteStatus: boolean,
  urlCallback: string
) => {
  const session = await getServerSession()

  if (!session || !session.id) return false

  const res = await toggleFavotiteComment(
    commentId,
    session.id,
    currentFavoriteStatus,
  )

  if (res) revalidatePath(urlCallback)

  return res
}