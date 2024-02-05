import { and, desc, eq } from "drizzle-orm";

import { db } from "@/drizzle/db";
import { animeSeason } from "@/drizzle/schema";

export const findSeasons = async (animeId: string) => {
  try {
    const existingSeasons = await db.query.animeSeason.findMany({
      where: and(eq(animeSeason.animeId, animeId), eq(animeSeason.deleted, false)),
      columns: {
        id: true,
        name: true
      },
      orderBy: desc(animeSeason.createdAt)
    })

    if (!existingSeasons) return null

    return existingSeasons
  } catch (error) {
    console.log(error)
    return null
  }
}