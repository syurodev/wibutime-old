"use server"

import { favorite } from "@/drizzle/queries/favorite/favorite"
import { revalidatePath } from "next/cache"

export const setFavorite = async (
  action: "favo" | "unfavo",
  type: ContentType,
  userId: string,
  contentId: string,
) => {
  try {
    const result = await favorite(userId, contentId, action, type)

    if (result) {
      revalidatePath(`/${type}s/${type}/${contentId}`)
    }

    return result
  } catch (error) {
    console.log(error)
    return false
  }
}