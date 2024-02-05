"use server"

import { findLatestAnimes } from "@/drizzle/queries/anime/findLatestAnimes"
import { findSeasons } from "@/drizzle/queries/anime/findSeasons"
import { insertAnime } from "@/drizzle/queries/anime/insertAnime"
import { insertAnimeSeason } from "@/drizzle/queries/anime/insertAnimeSeason"
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

    const createdAnime = await insertAnime(
      {
        name: validationValues.data.name,
        summary: validationValues.data.summary,
        note: validationValues.data.note,
        userId: session.id,
        otherNames: validationValues.data.other_names ? validationValues.data.other_names.map(name => name.text) : [],
      },
      validationValues.data.categories
    )

    if (!createdAnime) {
      return {
        code: 401,
        message: "Lỗi trong quá trình tạo anime, vui lòng thử lại",
        data: null
      }
    }

    await insertAnimeSeason({
      animeId: createdAnime.id,
      name: validationValues.data.type === "LongEpisode" ? "Season 1" : validationValues.data.type === "Movie" ? "Movie 1" : "Ova 1",
      studio: validationValues.data.studio,
      aired: validationValues.data.aired.toISOString(),
      broadcastDay: validationValues.data.broadcast_day,
      broadcastTime: validationValues.data.broadcast_time.toISOString(),
      image: validationValues.data.image,
      musics: validationValues.data.musics,
      numberOfEpisodes: validationValues.data.number_of_episodes,
    })

    return {
      code: 200,
      message: "Tạo anime thành công",
      submess: createdAnime.name,
      data: {
        id: createdAnime.id
      }
    }

  } catch (error) {
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
    const latestAnimes = await findLatestAnimes(limit)

    if (!latestAnimes) {
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
      categories: anime.categories.map(cate => cate.category),
      image: !anime.seasons || anime.seasons.length === 0 ? null : anime.seasons[-1].image as {
        key?: string,
        url: string
      } | null,
      seasons: !anime.seasons || anime.seasons.length === 0 ? null : {
        id: anime.seasons[0].id,
        name: anime.seasons[0].name,
        episodes: anime.seasons[0].episode.length === 0 ? null : {
          id: anime.seasons[0].episode[0].id,
          index: anime.seasons[0].episode[0].index || ""
        }
      },
      favorites: formatNumber(anime.favorite.length)
    }))

    return {
      code: 200,
      message: "success",
      data: fotmatAnimes
    }

  } catch (error) {
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
    const seasons = await findSeasons(animeId)

    if (!seasons) {
      return {
        code: 404,
        message: "Không tìm thấy seasons",
        data: null
      }
    }

    return {
      code: 200,
      message: "success",
      data: seasons
    }

  } catch (error) {
    console.log(error)

    return {
      code: 500,
      message: "Lỗi server",
      data: null
    }
  }
}