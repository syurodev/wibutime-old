import { db } from "@/drizzle/db";
import { AnimeSeasonInsert, animeSeason } from "@/drizzle/schema";

export const insertAnimeSeason = async (
  data: AnimeSeasonInsert,
) => {
  try {
    const createdSeason = await db.insert(animeSeason)
      .values({
        ...data
      })
      .returning({ id: animeSeason.id, name: animeSeason.name })

    if (!createdSeason || createdSeason.length === 0) return null

    return createdSeason[0]
  } catch (error) {
    console.log(error)
    return null
  }
}