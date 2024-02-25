import { db } from "@/drizzle/db"
import { category } from "@/drizzle/schema"
import { ilike } from "drizzle-orm"

export const getCategoriesAndCountContent = async (categoryName?: string) => {
  try {
    const categories: {
      id: string;
      name: string;
      lightnovels: {
        lightnovelId: string;
      }[];
      animes: {
        animeId: string;
      }[];
      mangas: {
        mangaId: string;
      }[];
    }[] = await db.query.category.findMany({
      ...(categoryName && categoryName !== "" ? { where: ilike(category.name, `%${categoryName}%`) } : {}),
      with: {
        animes: {
          columns: {
            animeId: true
          }
        },
        mangas: {
          columns: {
            mangaId: true
          }
        },
        lightnovels: {
          columns: {
            lightnovelId: true
          }
        },
      }
    })

    if (categories.length === 0) return null

    const result = categories.map(item => ({
      id: item.id,
      name: item.name,
      animes: item.animes.length ?? 0,
      mangas: item.mangas.length ?? 0,
      lightnovels: item.lightnovels.length ?? 0,
    }))

    return result
  } catch (error) {
    console.log(error)
    return null
  }
}