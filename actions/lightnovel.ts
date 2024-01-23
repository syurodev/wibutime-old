"use server"

import * as z from "zod"

import { lightnovelChapterSchema, lightnovelSchema, lightnovelVolumeSchema } from "@/schemas/lightnovel"
import { db } from "@/lib/db"
import { getServerSession } from "@/lib/getServerSession"
import { revalidatePath } from "next/cache"
import { formatNumber } from "@/lib/formatNumber"

export const createLightnovel = async (values: string) => {
  try {
    const validationValues = lightnovelSchema.safeParse(JSON.parse(values))

    if (!validationValues.success) {
      return {
        code: 401,
        message: "Vui lòng kiểm tra lại dữ liệu đã nhập",
        data: null
      }
    }

    const session = await getServerSession()

    if (!session?.permissions.includes("UPLOAD")) {
      await db.$disconnect()

      return {
        code: 401,
        message: "Bạn không có quyền đăng lightnovel",
        data: null
      }
    }

    const result = await db.lightnovel.create({
      data: {
        ...validationValues.data,
        userId: session.id,
        otherNames: validationValues.data.otherNames ? validationValues.data.otherNames.map(name => name.text) : [],
        categories: {
          connect: validationValues.data.categories.map(category => ({ id: category.id })),
        },
      }
    })

    revalidatePath(`/u/${session.id}`)
    await db.$disconnect()
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
    await db.$disconnect()
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

    if (!lightnovel) {
      await db.$disconnect()
      return {
        code: 404,
        message: "Không tìm thấy lightnovel",
        data: null
      }
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
    await db.$disconnect()

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
    await db.$disconnect()

    console.log(error)
    return {
      code: 500,
      message: "Lỗi server vui lòng thử lại",
      data: null
    }
  }
}

export const createLightnovelChapter = async (values: string, novelId: string, words: number = 0) => {
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

    if (!lightnovel) {
      await db.$disconnect()
      return {
        code: 404,
        message: "Không tìm thấy lightnovel",
        data: null
      }
    }

    if (!session?.permissions.includes("UPLOAD") || session?.id !== lightnovel.userId) {
      await db.$disconnect()
      return {
        code: 401,
        message: "Bạn không có quyền thêm chapter",
        data: null
      }
    }

    const result = await db.lightnovelChapter.create({
      data: {
        ...validationValues.data,
        words: words
      }
    })

    revalidatePath(`/u/${lightnovel.userId}`)
    await db.$disconnect()

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
    await db.$disconnect()
    return {
      code: 200,
      message: "success",
      data: volumes
    }
  } catch (error) {
    await db.$disconnect()
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
        createdAt: true,
        image: true,
        name: true,
        otherNames: true,
        summary: true,
        note: true,
        updateAt: true,
        user: {
          select: {
            id: true,
            name: true,
            image: true
          }
        },
        translationGroup: {
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
                words: true,
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

    if (!lightnovel) {
      await db.$disconnect()

      return {
        code: 404,
        message: "Không tìm thấy lightnovel",
        data: null
      }
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
      note: lightnovel.note,
      user: lightnovel.user,
      words: formatNumber(lightnovel.volumes.reduce((totalWords, volume) => {
        return totalWords + volume.chapters.reduce((volumeWords, chapter) => {
          return volumeWords + (chapter.words || 0);
        }, 0);
      }, 0)),
      viewed: formatNumber(lightnovel.volumes.reduce((totalViewed, volume) => {
        return totalViewed + volume.chapters.reduce((volumeViewed, chapter) => {
          return volumeViewed + (chapter.viewed || 0);
        }, 0);
      }, 0)),
      translationGroup: lightnovel.translationGroup as {
        id: string;
        image: {
          key?: string,
          url: string
        } | null;
        name: string;
      },
      image: lightnovel.image as {
        key?: string,
        url: string
      } | undefined,
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

    await db.$disconnect()
    return {
      code: 200,
      message: "success",
      data: result
    }
  } catch (error) {
    await db.$disconnect()
    console.log(error)
    return {
      code: 500,
      message: "Lỗi server vui lòng thử lại",
      data: null
    }
  }
}

export const getChapterContent = async (chapterId: string): Promise<{
  code: number,
  message: string,
  data: LightnovelChapterDetail | null
}> => {
  try {
    const content = await db.lightnovelChapter.findUnique({
      where: {
        id: chapterId,
        deleted: false
      },
      select: {
        id: true,
        name: true,
        content: true,
        createdAt: true,
        updateAt: true,
        viewed: true,
        words: true,
        comments: {
          select: {
            id: true,
            user: {
              select: {
                id: true,
                image: true,
                name: true,
              }
            },
            comment: true,
            createAt: true,
            updateAt: true
          }
        }
      }
    })

    if (!content) {
      await db.$disconnect()

      return {
        code: 404,
        message: "Không tìm thấy chapter",
        data: null
      }
    }

    const result: LightnovelChapterDetail = {
      id: content.id,
      name: content.name,
      content: content.content,
      comments: content.comments.length > 0 ? content.comments.map(comment => ({
        id: comment.id,
        createAt: comment.createAt.toISOString(),
        updateAt: comment.updateAt.toISOString(),
        comment: comment.comment,
        user: {
          id: comment.user.id,
          image: comment.user.image,
          name: comment.user.name,
        }
      })) : [],
      createdAt: content.createdAt.toISOString(),
      updateAt: content.updateAt.toISOString(),
      viewed: formatNumber(content.viewed || 0),
      words: formatNumber(content.words || 0)
    }

    await db.$disconnect()

    return {
      code: 200,
      message: "success",
      data: result
    }
  } catch (error) {
    await db.$disconnect()

    return {
      code: 500,
      message: "Lỗi server",
      data: null
    }
  }
}