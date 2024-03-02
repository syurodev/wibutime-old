import { and, eq, inArray } from "drizzle-orm";

import { db } from "@/drizzle/db";
import { LightnovelInsert, categoryToLightnovel, lightnovel } from "@/drizzle/schema";
import { compareCategories } from "@/lib/compareCategories";

export const updateLightnovel = async (
  novelId: string,
  values: LightnovelInsert,
  categories: { id: string, name: string }[]
) => {
  try {
    const updatedLightnovel = await db.update(lightnovel)
      .set({ ...values })
      .where(eq(lightnovel.id, novelId))
      .returning({ id: lightnovel.id })

    if (updatedLightnovel.length === 0) return false

    const existingCategories = await db.select({ categoryId: categoryToLightnovel.categoryId })
      .from(categoryToLightnovel)
      .where(eq(categoryToLightnovel.lightnovelId, novelId))

    const { added, removed } = compareCategories(existingCategories, categories);

    if (added.length > 0) {
      added.forEach(async (category) => {
        await db.insert(categoryToLightnovel)
          .values({
            lightnovelId: novelId,
            categoryId: category
          })
          .execute()
      })
    }

    if (removed.length > 0) {
      await db.delete(categoryToLightnovel)
        .where(and(
          eq(categoryToLightnovel.lightnovelId, novelId),
          inArray(categoryToLightnovel.categoryId, removed)
        ))
    }

    return true
  } catch (error) {
    console.log(error)
    return false
  }
}