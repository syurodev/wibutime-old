import { db } from "@/drizzle/db";
import { AnimeInsert, anime, categoryToAnime } from "@/drizzle/schema";

export const insertAnime = async (
  data: AnimeInsert,
  categories: { id: string, name: string }[]
) => {
  try {
    const createdAnime = await db.insert(anime)
      .values({
        ...data
      })
      .returning({ id: anime.id, name: anime.name })

    if (!createdAnime || createdAnime.length === 0) return null

    categories.forEach(async (category) => {
      await db.insert(categoryToAnime)
        .values({
          animeId: createdAnime[0].id,
          categoryId: category.id
        })
        .execute()
    })

    return createdAnime[0]
  } catch (error) {
    console.log(error)
    return null
  }
}