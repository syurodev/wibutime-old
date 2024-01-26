"use server"

import { db } from "@/lib/db"
import { formatNumber } from "@/lib/formatNumber"
import { getServerSession } from "@/lib/getServerSession"
import { animeSchema } from "@/schemas/anime"

export const createAnime = async (
  values: string,
) => {
  try {
    const parseData = JSON.parse(values)
    const remake = {
      ...parseData,
      broadcast_time: new Date(parseData.broadcast_time),
      aired: new Date(parseData.aired)
    }

    const validationValues = animeSchema.safeParse(remake)

    if (!validationValues.success) return {
      code: 401,
      message: "Vui lòng kiểm tra lại các trường đã nhập",
      data: null
    }

    const session = await getServerSession()

    if (!session?.permissions.includes("UPLOAD")) {
      return {
        code: 401,
        message: "Bạn không có quyền đăng lightnovel",
        data: null
      }
    }

    const anime = await db.anime.create({
      data: {
        name: validationValues.data.name,
        summary: validationValues.data.summary,
        note: validationValues.data.note,
        user_id: session.id,
        other_names: validationValues.data.other_names ? validationValues.data.other_names.map(name => name.text) : [],
        categories: {
          connect: validationValues.data.categories.map(category => ({ id: category.id })),
        },
      }
    })

    if (!anime) {
      await db.$disconnect()

      return {
        code: 401,
        message: "Lỗi trong quá trình tạo anime, vui lòng thử lại",
        data: null
      }
    }

    await db.anime_season.create({
      data: {
        anime_id: anime.id,
        name: "Season 1",
        studio: validationValues.data.studio,
        aired: validationValues.data.aired,
        broadcast_day: validationValues.data.broadcast_day,
        broadcast_time: validationValues.data.broadcast_time,
        image: validationValues.data.image,
        musics: validationValues.data.musics,
        number_of_episodes: validationValues.data.number_of_episodes,
      }
    })

    await db.$disconnect()

    return {
      code: 200,
      message: "Tạo anime thành công",
      submess: anime.name,
      data: {
        id: anime.id
      }
    }

  } catch (error) {
    await db.$disconnect()
    console.log(error)

    return {
      code: 500,
      message: "Lỗi server",
      data: null
    }
  }
}

export const getAnimeNews = async (limit: number = 12): Promise<{
  code: number,
  message: string,
  data: AnimeNew[] | null
}> => {
  try {
    const latestAnimes = await db.anime.findMany({
      where: {
        deleted: false,
      },
      orderBy: {
        update_at: 'desc',
      },
      take: limit,
      select: {
        id: true,
        name: true,
        summary: true,
        categories: {
          select: {
            id: true,
            name: true,
          },
        },
        seasons: {
          where: {
            deleted: false,
          },
          orderBy: {
            update_at: 'desc',
          },
          take: 1,
          select: {
            id: true,
            name: true,
            image: true,
            _count: true,
            episodes: {
              where: {
                deleted: false,
              },
              orderBy: {
                update_at: 'desc',
              },
              take: 1,
              select: {
                id: true,
                index: true,
              }
            },
          }
        },
        favorites: {
          select: {
            _count: true
          }
        }
      }
    });

    if (!latestAnimes) {
      await db.$disconnect()

      return {
        code: 404,
        message: "Không tìm thấy danh sách anime",
        data: null
      }
    }

    const fotmatAnimes: AnimeNew[] | null = latestAnimes.length === 0 ? null : latestAnimes.map((anime) => ({
      id: anime.id,
      name: anime.name,
      summary: anime.summary,
      type: "anime" as ContentType,
      categories: anime.categories,
      image: !anime.seasons || anime.seasons.length === 0 ? null : anime.seasons[-1].image as {
        key?: string,
        url: string
      } | null,
      seasons: !anime.seasons || anime.seasons.length === 0 ? null : {
        id: anime.seasons[0].id,
        name: anime.seasons[0].name,
        episodes: anime.seasons[0].episodes.length === 0 ? null : {
          id: anime.seasons[0].episodes[0].id,
          index: anime.seasons[0].episodes[0].index
        }
      },
      favorites: formatNumber(anime.favorites.length)
    }))

    return {
      code: 200,
      message: "success",
      data: fotmatAnimes
    }

  } catch (error) {
    await db.$disconnect()

    console.log(error)
    return {
      code: 500,
      message: "Lỗi server",
      data: null
    }
  }
}

export const getSeasons = async (animeId: string) => {
  try {
    const seasons = await db.anime_season.findMany({
      where: {
        anime_id: animeId
      },
      orderBy: {
        created_at: "desc"
      },
      select: {
        id: true,
        name: true
      }
    })

    if (!seasons) {
      await db.$disconnect()

      return {
        code: 404,
        message: "Không tìm thấy seasons",
        data: null
      }
    }

    await db.$disconnect()

    return {
      code: 200,
      message: "success",
      data: seasons
    }

  } catch (error) {
    await db.$disconnect()
    console.log(error)

    return {
      code: 500,
      message: "Lỗi server",
      data: null
    }
  }
}