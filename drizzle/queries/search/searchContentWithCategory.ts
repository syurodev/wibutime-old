import { db } from "@/drizzle/db";
import { category } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export const searchContentWithCategory = async (categoryId: string): Promise<CategoryContents | null> => {
  try {
    const contents = await db.query.category.findFirst({
      where: eq(category.id, categoryId),
      with: {
        animes: {
          columns: {
            animeId: false,
            categoryId: false
          },
          with: {
            anime: {
              columns: {
                id: true,
                name: true,
              },
              with: {
                seasons: {
                  columns: {
                    image: true
                  }
                }
              }
            },
          }
        },
        mangas: {
          columns: {
            categoryId: false,
            mangaId: false
          },
          with: {
            manga: {
              columns: {
                id: true,
                name: true,
              },
              with: {
                seasons: {
                  columns: {
                    image: true
                  }
                }
              }
            }
          }
        },
        lightnovels: {
          columns: {
            categoryId: false,
            lightnovelId: false
          },
          with: {
            lightnovel: {
              columns: {
                id: true,
                name: true,
                image: true
              }
            }
          }
        }
      }
    })

    if (!contents) return null

    const animes = contents.animes.map(item => ({
      id: item.anime.id,
      name: item.anime.name,
      type: "anime" as ContentType,
      image: item.anime.seasons[0].image as {
        key: string;
        url: string;
      }
    })) ?? []

    const mangas = contents.mangas.map(item => ({
      id: item.manga.id,
      name: item.manga.name,
      type: "manga" as ContentType,
      image: item.manga.seasons[0].image as {
        key: string;
        url: string;
      }
    })) ?? []

    const lightnovels = contents.lightnovels.map(item => ({
      id: item.lightnovel.id,
      name: item.lightnovel.name,
      type: "lightnovel" as ContentType,
      image: item.lightnovel.image as {
        key: string;
        url: string;
      }
    })) ?? []

    const result: CategoryContents = {
      id: contents.id,
      name: contents.name,
      contents: [...animes, ...mangas, ...lightnovels]
    }

    return result
  } catch (error) {
    console.log(error)
    return null
  }
}