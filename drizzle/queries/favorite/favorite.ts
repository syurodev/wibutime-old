import { db } from "@/drizzle/db";
import { favoriteToAnime, favoriteToLightnovel, favoriteToManga } from "@/drizzle/schema";
import { and, eq } from "drizzle-orm";

export const favorite = async (
  userId: string,
  contentId: string,
  action: "favo" | "unfavo",
  type: ContentType
) => {
  try {
    switch (type) {
      case "lightnovel":
        if (action === "favo") {
          const res = await db.insert(favoriteToLightnovel)
            .values({
              lightnovelId: contentId,
              userId: userId
            })
            .returning({ id: favoriteToLightnovel.userId })

          if (res.length === 0) return false

          return true
        } else {
          const res = await db.delete(favoriteToLightnovel)
            .where(and(
              eq(favoriteToLightnovel.userId, userId),
              eq(favoriteToLightnovel.lightnovelId, contentId)
            ))
            .returning({ id: favoriteToLightnovel.userId })

          if (res.length === 0) return false

          return true
        };
      case "anime":
        if (action === "favo") {
          const res = await db.insert(favoriteToAnime)
            .values({
              animeId: contentId,
              userId: userId
            })
            .returning({ id: favoriteToAnime.userId })

          if (res.length === 0) return false

          return true
        } else {
          const res = await db.delete(favoriteToAnime)
            .where(and(
              eq(favoriteToAnime.userId, userId),
              eq(favoriteToAnime.animeId, contentId)
            ))
            .returning({ id: favoriteToAnime.userId })

          if (res.length === 0) return false

          return true
        };
      case "manga":
        if (action === "favo") {
          const res = await db.insert(favoriteToManga)
            .values({
              mangaId: contentId,
              userId: userId
            })
            .returning({ id: favoriteToManga.userId })

          if (res.length === 0) return false

          return true
        } else {
          const res = await db.delete(favoriteToManga)
            .where(and(
              eq(favoriteToManga.userId, userId),
              eq(favoriteToManga.mangaId, contentId)
            ))
            .returning({ id: favoriteToManga.userId })

          if (res.length === 0) return false

          return true
        };
      default:
        return false;
    }

  } catch (error) {
    console.log(error)
    return false
  }
}