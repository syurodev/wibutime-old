import { LightnovelInsert, categoryToLightnovel, lightnovel } from "@/drizzle/schema";
import { db } from "@/drizzle/db";

export const insertLightnovel = async (
  data: LightnovelInsert,
  categories: { id: string, name: string }[]
) => {
  try {
    const createdLightnovel = await db.insert(lightnovel).values({
      ...data
    }).returning({ id: lightnovel.id, name: lightnovel.name })

    if (createdLightnovel.length === 0) return null

    categories.forEach(async (category) => {
      await db.insert(categoryToLightnovel)
        .values({
          lightnovelId: createdLightnovel[0].id,
          categoryId: category.id
        })
        .execute()
    })

    return createdLightnovel[0]
  } catch (error) {
    console.log(error)
    return null
  }
}