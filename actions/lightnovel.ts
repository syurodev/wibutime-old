"use server"

import * as z from "zod"

import { lightnovelChapterSchema, lightnovelSchema, lightnovelVolumeSchema } from "@/schemas/lightnovel"
import { db } from "@/lib/db"
import { getServerSession } from "@/lib/getServerSession"
import { revalidatePath } from "next/cache"

export const createLightnovel = async (values: z.infer<typeof lightnovelSchema>) => {
  try {
    const validationValues = lightnovelSchema.safeParse(values)

    if (!validationValues.success) return {
      code: 401,
      message: "Vui lòng kiểm tra lại dữ liệu đã nhập",
      data: null
    }

    const session = await getServerSession()

    if (!session?.permissions.includes("UPLOAD")) return {
      code: 401,
      message: "Bạn không có quyền đăng lightnovel",
      data: null
    }

    const result = await db.lightnovel.create({
      data: {
        ...validationValues.data,
        userId: session.id,
        otherNames: validationValues.data.otherNames ? validationValues.data.otherNames.map(item => item.text) : [],
        categories: validationValues.data.categories.map(item => item.id) as any,
      }
    })

    revalidatePath(`/u/${session.id}`)

    return {
      code: 200,
      message: "Tạo lightnovel thành công",
      submess: result.name,
      data: {
        id: result.id
      }
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

export const createLightnovelVolume = async (
  values: z.infer<typeof lightnovelVolumeSchema>,
  novelId: string,
) => {
  try {
    const validationValues = lightnovelVolumeSchema.safeParse(values)

    if (!validationValues.success) return {
      code: 401,
      message: "Vui lòng kiểm tra lại dữ liệu đã nhập",
      data: null
    }

    const session = await getServerSession()

    const lightnovel = await db.lightnovel.findUnique({
      where: {
        id: novelId
      }
    })

    if (!lightnovel) return {
      code: 404,
      message: "Không tìm thấy lightnovel",
      data: null
    }

    if (!session?.permissions.includes("UPLOAD") || session?.id !== lightnovel.userId) return {
      code: 401,
      message: "Bạn không có quyền thêm volume",
      data: null
    }

    const result = await db.lightnovelVolume.create({
      data: {
        ...validationValues.data,
        novelId
      }
    })

    revalidatePath(`/u/${lightnovel.userId}`)

    return {
      code: 200,
      message: "Thêm volume thành công",
      submess: result.name,
      data: {
        id: result.id,
        name: result.name
      }
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

export const createLightnovelChapter = async (values: string, novelId: string) => {
  try {
    const validationValues = lightnovelChapterSchema.safeParse(JSON.parse(values))

    if (!validationValues.success) return {
      code: 401,
      message: "Vui lòng kiểm tra lại dữ liệu đã nhập",
      data: null
    }

    const session = await getServerSession()

    const lightnovel = await db.lightnovel.findUnique({
      where: {
        id: novelId
      }
    })

    if (!lightnovel) return {
      code: 404,
      message: "Không tìm thấy lightnovel",
      data: null
    }

    if (!session?.permissions.includes("UPLOAD") || session?.id !== lightnovel.userId) return {
      code: 401,
      message: "Bạn không có quyền thêm chapter",
      data: null
    }

    const result = await db.lightnovelChapter.create({
      data: {
        ...validationValues.data,
      }
    })

    revalidatePath(`/u/${lightnovel.userId}`)

    return {
      code: 200,
      message: "Thêm chapter thành công",
      submess: result.name,
      data: {
        id: result.id,
        name: result.name
      }
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

export const getVolumes = async (novelId: string) => {
  try {
    const volumes = await db.lightnovelVolume.findMany({
      where: {
        novelId
      },
      orderBy: {
        createdAt: "desc"
      },
      select: {
        id: true,
        name: true,
        image: true,
      }
    })

    return {
      code: 200,
      message: "success",
      data: volumes
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

export const getLightnovelDetail = async (novelId: string) => {
  try {
    const lightnovel = await db.lightnovel.findUnique({
      where: {
        id: novelId,
        deleted: false
      },
      select: {
        id: true,
        artist: true,
        author: true,
        categories: {
          select: {
            id: true,
            name: true
          }
        },
        coverImage: true,
        createdAt: true,
        image: true,
        name: true,
        otherNames: true,
        summary: true,
        updateAt: true,
        user: {
          select: {
            id: true,
            name: true,
            image: true
          }
        },
        volumes: {
          select: {
            id: true,
            name: true,
            image: true,
            createdAt: true,
            updateAt: true,
            chapters: {
              select: {
                id: true,
                name: true,
                content: true,
                viewed: true,
                createdAt: true,
              }
            }
          }
        },
        favorites: {
          select: {
            _count: true
          }
        }
      }
    })

    if (!lightnovel) return {
      code: 404,
      message: "Không tìm thấy lightnovel",
      data: null
    }

    const result: LightnovelDetail = {
      id: lightnovel.id,
      name: lightnovel.name,
      type: "lightnovel",
      createdAt: lightnovel.createdAt.toISOString(),
      updateAt: lightnovel.updateAt.toISOString(),
      categories: lightnovel.categories,
      favorites: lightnovel.favorites,
      otherNames: lightnovel.otherNames,
      summary: lightnovel.summary,
      user: lightnovel.user,
      artist: lightnovel.artist,
      author: lightnovel.author,
      volumes: lightnovel.volumes.map(item => (
        {
          id: item.id,
          name: item.name,
          createdAt: item.createdAt.toISOString(),
          updateAt: item.updateAt.toISOString(),
          image: item.image as {
            key?: string,
            url: string
          } | null,
          chapters: item.chapters.map(chapter => ({
            id: chapter.id,
            name: chapter.name,
            content: chapter.content as any,
            createdAt: chapter.createdAt.toISOString(),
            viewed: chapter.viewed
          }))
        }
      ))
    }

    return {
      code: 200,
      message: "success",
      data: result
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