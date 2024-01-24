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
        user_id: session.id,
        other_names: validationValues.data.other_names ? validationValues.data.other_names.map(name => name.text) : [],
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

    if (!session?.permissions.includes("UPLOAD") || session?.id !== lightnovel.user_id) return {
      code: 401,
      message: "Bạn không có quyền thêm volume",
      data: null
    }

    const result = await db.lightnovel_volume.create({
      data: {
        ...validationValues.data,
        novel_id: novelId
      }
    })

    await db.lightnovel.update({
      where: { id: novelId },
      data: { update_at: new Date() },
    });

    revalidatePath(`/u/${lightnovel.user_id}`)
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

    if (!session?.permissions.includes("UPLOAD") || session?.id !== lightnovel.user_id) {
      await db.$disconnect()
      return {
        code: 401,
        message: "Bạn không có quyền thêm chapter",
        data: null
      }
    }

    const result = await db.lightnovel_chapter.create({
      data: {
        ...validationValues.data,
        words: words
      }
    })

    await db.lightnovel.update({
      where: { id: novelId },
      data: { update_at: new Date() },
    });

    await db.lightnovel_volume.update({
      where: { id: result.volume_id },
      data: { update_at: new Date() },
    });

    revalidatePath(`/u/${lightnovel.user_id}`)
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
    const volumes = await db.lightnovel_volume.findMany({
      where: {
        novel_id: novelId
      },
      orderBy: {
        created_at: "desc"
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
        created_at: true,
        image: true,
        name: true,
        other_names: true,
        summary: true,
        note: true,
        update_at: true,
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
            created_at: true,
            update_at: true,
            chapters: {
              select: {
                id: true,
                name: true,
                content: true,
                viewed: true,
                words: true,
                created_at: true,
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
      createdAt: lightnovel.created_at.toISOString(),
      updateAt: lightnovel.update_at.toISOString(),
      categories: lightnovel.categories,
      favorites: lightnovel.favorites,
      otherNames: lightnovel.other_names,
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
          createdAt: item.created_at.toISOString(),
          updateAt: item.update_at.toISOString(),
          image: item.image as {
            key?: string,
            url: string
          } | null,
          chapters: item.chapters.map(chapter => ({
            id: chapter.id,
            name: chapter.name,
            content: chapter.content as any,
            createdAt: chapter.created_at.toISOString(),
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
    const content = await db.lightnovel_chapter.findUnique({
      where: {
        id: chapterId,
        deleted: false
      },
      select: {
        id: true,
        name: true,
        content: true,
        created_at: true,
        update_at: true,
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
            create_at: true,
            update_at: true
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
        createAt: comment.create_at.toISOString(),
        updateAt: comment.update_at.toISOString(),
        comment: comment.comment,
        user: {
          id: comment.user.id,
          image: comment.user.image,
          name: comment.user.name,
        }
      })) : [],
      createdAt: content.created_at.toISOString(),
      updateAt: content.update_at.toISOString(),
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

export const updateLightnovelChapterViewed = async (chapterId: string) => {
  try {
    await db.lightnovel_chapter.update({
      where: { id: chapterId },
      data: { viewed: { increment: 1 }, viewed_at: new Date() },
    });

    await db.$disconnect()
    return {
      code: 200,
      message: "success"
    }
  } catch (error) {
    await db.$disconnect()
    console.log(error)

    return {
      code: 500,
      message: "Lỗi server"
    }
  }
}