import { db } from "@/drizzle/db"
import { category } from "@/drizzle/schema"

export const getCategories = async () => {
  const categories = await db.select().from(category)

  return categories
}