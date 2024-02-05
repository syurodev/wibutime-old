import { db } from "@/drizzle/db";
import { LightnovelChapterInsert, lightnovelChapter } from "@/drizzle/schema";

export const insertLightnovelChapter = async (data: LightnovelChapterInsert) => {
  try {
    const createdChapter = await db.insert(lightnovelChapter).values({
      ...data
    }).returning({ id: lightnovelChapter.id, name: lightnovelChapter.name })

    if (!createdChapter) return null

    return createdChapter[0]
  } catch (error) {
    console.log(error)
    return null
  }
}