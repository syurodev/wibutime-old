"use server"

import { db } from "@/lib/db"
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