import { db } from "@/drizzle/db";
import { AnimeEpisodeInsert, animeEpisode } from "@/drizzle/schema";

export const insertAnimeEpisode = async (values: AnimeEpisodeInsert) => {
  try {
    const createdEpisode = await db.insert(animeEpisode).values({
      ...values
    }).returning({ id: animeEpisode.id, index: animeEpisode.index })

    if (!createdEpisode) return null

    return createdEpisode[0]
  } catch (error) {
    console.log(error)
    return null
  }
}