"use server"

import { revalidatePath } from "next/cache"

import { findLatestAnimes } from "@/drizzle/queries/anime/findLatestAnimes"
import { findSeasons } from "@/drizzle/queries/anime/findSeasons"
import { insertAnime } from "@/drizzle/queries/anime/insertAnime"
import { insertAnimeSeason } from "@/drizzle/queries/anime/insertAnimeSeason"
import { formatNumber } from "@/lib/formatNumber"
import { getServerSession } from "@/lib/getServerSession"
import { animeEpisodeSchema, animeSchema, animeSeasonSchema } from "@/schemas/anime"
import { animeDetail } from "@/drizzle/queries/anime/animeDetail"
import { convertUtcToGMT7 } from "@/lib/convertUtcToGMT7"
import { insertAnimeEpisode } from "@/drizzle/queries/anime/insertAnimeEpisode"
import { seasonDetail } from "@/drizzle/queries/anime/seasonDetail"
import { findComments } from "@/drizzle/queries/anime/findComments"
import { checkUserIdExistsInFavotiteArray } from "@/lib/checkUserIdExistsInFavotiteArray"

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

    if (!session || !session?.permissions.includes("UPLOAD")) {
      return {
        code: 401,
        message: "Bạn không có quyền thêm anime",
        data: null
      }
    }

    const createdAnime = await insertAnime(
      {
        name: validationValues.data.name,
        summary: validationValues.data.summary,
        note: validationValues.data.note,
        userId: session.id!,
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
      name: validationValues.data.name,
      studio: validationValues.data.studio,
      aired: validationValues.data.aired.toISOString(),
      broadcastDay: validationValues.data.broadcast_day,
      broadcastTime: convertUtcToGMT7(validationValues.data.broadcast_time),
      image: validationValues.data.image,
      musics: validationValues.data.musics,
      numberOfEpisodes: validationValues.data.number_of_episodes,
    })

    revalidatePath(`/u/${session.id}`)

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
      user: {
        id: anime.user.id
      },
      type: "anime" as ContentType,
      categories: anime.categories.map(cate => cate.category),
      image: !anime.seasons || anime.seasons.length === 0 ? null : anime.seasons[-1].image as {
        key?: string,
        url: string
      } | null,
      seasons: !anime.seasons || anime.seasons.length === 0 ? null : {
        id: anime.seasons[0].id,
        name: anime.seasons[0].name,
        end: anime.seasons[0].numberOfEpisodes || 0,
        episodes: anime.seasons[0].episode.length === 0 ? null : anime.seasons[0].episode.map((item) => (
          {
            id: item.id,
            index: item.index || ""
          }
        ))
      },
      favorites: formatNumber(anime.favorites.length)
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

export const createAnimeSeason = async (
  values: string,
  animeId: string,
) => {
  try {
    const parseData = JSON.parse(values)
    const remake = {
      ...parseData,
      broadcast_time: new Date(parseData.broadcast_time),
      aired: new Date(parseData.aired),
    }

    const validationValues = animeSeasonSchema.safeParse(remake)

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

    const createdSeason = await insertAnimeSeason({
      animeId: animeId,
      name: validationValues.data.name,
      studio: validationValues.data.studio,
      aired: validationValues.data.aired.toISOString(),
      broadcastDay: validationValues.data.broadcast_day,
      broadcastTime: validationValues.data.broadcast_time,
      image: validationValues.data.image,
      musics: validationValues.data.musics,
      numberOfEpisodes: validationValues.data.number_of_episodes,
    })

    if (!createdSeason) return {
      code: 400,
      message: "Có lỗi trong quá trình tạo season, vui lòng thử lại",
      data: null
    }

    revalidatePath(`/u/${session.id}`)

    return {
      code: 200,
      message: "Tạo season thành công",
      submess: createdSeason.name,
      data: {
        id: createdSeason.id
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

export const getAnimeDetail = async (
  animeId: string
) => {
  try {
    const session = await getServerSession()

    const existingAnime = await animeDetail(animeId, session?.id ?? undefined)

    if (!existingAnime) return {
      code: 404,
      message: "Không tìm thấy anime",
      data: null
    }

    return {
      code: 200,
      message: "success",
      data: existingAnime
    }
  } catch (error) {
    console.log(error)
    return {
      code: 500,
      message: "Lỗi server vui lòng thử lại",
      data: null
    }
  }
}

export const createAnimeEpisode = async (values: string, animeId: string) => {
  try {
    const data = JSON.parse(values)
    const validationValues = animeEpisodeSchema.safeParse(data)

    if (!validationValues.success) return {
      code: 401,
      message: "Vui lòng kiểm tra lại dữ liệu đã nhập",
      data: null
    }

    const session = await getServerSession()

    if (!session || !session?.permissions.includes("UPLOAD")) {
      return {
        code: 401,
        message: "Bạn không có quyền thêm episode",
        data: null
      }
    }

    const createdEpisode = await insertAnimeEpisode({
      index: validationValues.data.index,
      seasonId: validationValues.data.season_id,
      content: validationValues.data.content,
      thumbnail: validationValues.data.thumbnail,
      charge: validationValues.data.charge
    })

    if (!createdEpisode) return {
      code: 400,
      message: "Có lỗi trong quá trình thêm episode, vui lòng thử lại",
      data: null
    }

    revalidatePath(`/u/${session.id}`)
    revalidatePath(`/animes/anime/${animeId}`)

    return {
      code: 200,
      message: "Thêm episode thành công",
      submess: createdEpisode.index,
      data: {
        id: createdEpisode.id,
        name: createdEpisode.index
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

export const getSeasonDetail = async (seasonId: string) => {
  try {
    const existingSeason = await seasonDetail(seasonId)

    if (!existingSeason) return {
      code: 404,
      message: "Không tìm thấy season",
      data: null
    }

    // const result: {
    //   id: string;
    //   name: string;
    //   episode: {
    //     id: string;
    //     createdAt: Date | null;
    //     updatedAt: Date | null;
    //     deleted: boolean | null;
    //     content: {
    //       url: string
    //     };
    //     viewed: number | null;
    //     viewed_at: Date | null;
    //     thumbnail?: {
    //       url: string
    //     };
    //     index: string;
    //     seasonId: string;
    //   }[];
    //   anime: {
    //     id: string,
    //     name: string,
    //     user: {
    //       id: string,
    //       name: string,
    //       image?: string | null,
    //       followedUsers: {
    //         followedBy: string
    //       }[],
    //     },
    //     translationGroup?: {
    //       id: string,
    //       name: string,
    //       image?: string,
    //       followers: {
    //         followerId: string
    //       }[],
    //     } | null,
    //     favorites: {
    //       userId: string
    //     }[]
    //   }
    // } = {
    //   ...existingSeason,
    //   anime: {
    //     ...existingSeason.anime,
    //     favorites: [],
    //     translationGroup: {
    //       id: existingSeason.anime.translationGroup?.id || "",
    //       name: existingSeason.anime.translationGroup?.name || "",
    //       image: existingSeason.anime.translationGroup?.image.url,
    //       followers: existingSeason.anime.translationGroup?.followers || []
    //     }
    //   },
    //   episode: existingSeason.episode.map((item) => ({
    //     ...item,
    //     content: {
    //       url: item.content.url!
    //     },
    //     thumbnail: {
    //       url: item.thumbnail.url!
    //     }
    //   }))
    // }

    return {
      code: 200,
      message: "success",
      data: existingSeason
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

export const getCommentsAnimeEpisode = async (episodeId: string, page: number = 1, limit: number = 10) => {
  try {
    const comments = await findComments(page, limit, episodeId)

    console.log(comments)

    return {
      code: 200,
      message: "success",
      data: comments
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