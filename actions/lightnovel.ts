"use server"

import * as z from "zod"
import { getServerSession } from "@/lib/getServerSession"
import { revalidatePath } from "next/cache"

import { lightnovelChapterSchema, lightnovelSchema, lightnovelVolumeSchema } from "@/schemas/lightnovel"
import { formatNumber } from "@/lib/formatNumber"
import { insertLightnovel } from "@/drizzle/queries/lightnovel/insertLightnovel"
import { findLightnovel } from "@/drizzle/queries/lightnovel/findLightnovel"
import { insertLightnovelVolume } from "@/drizzle/queries/lightnovel/insertLightnovelVolume"
import { lightnovelUpdatedAt } from "@/drizzle/queries/lightnovel/lightnovelUpdatedAt"
import { insertLightnovelChapter } from "@/drizzle/queries/lightnovel/insertLightnovelChapter"
import { lightnovelVolumeUpdatedAt } from "@/drizzle/queries/lightnovel/lightnovelVolumeUpdatedAt"
import { findVolumes } from "@/drizzle/queries/lightnovel/findVolumes"
import { findChapter } from "@/drizzle/queries/lightnovel/findChapter"
import { upViewed } from "@/drizzle/queries/lightnovel/upViewed"
import { lightnovelDetail } from "@/drizzle/queries/lightnovel/lightnovelDetail"
import { convertUtcToGMT7 } from "@/lib/convertUtcToGMT7"
import { purchaseLightnovelChap } from "@/drizzle/queries/lightnovel/purchaseLightnovelChap"
import { insertComment } from "@/drizzle/queries/lightnovel/insertComment"
import { findLightnovelComments } from "@/drizzle/queries/lightnovel/findComments"
import { updateLightnovel } from "@/drizzle/queries/lightnovel/updateLightnovel"

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

    if (!session || !session?.permissions.includes("UPLOAD")) {
      return {
        code: 401,
        message: "Bạn không có quyền đăng lightnovel",
        data: null
      }
    }

    const result = await insertLightnovel(
      {
        name: validationValues.data.name,
        artist: validationValues.data.artist,
        author: validationValues.data.author,
        image: validationValues.data.image,
        note: validationValues.data.note,
        otherNames: validationValues.data.other_names && validationValues.data.other_names.length > 0 ? validationValues.data.other_names.map(item => item.text) : [],
        summary: validationValues.data.summary,
        userId: session.id!,
      },
      validationValues.data.categories
    )

    if (!result) return {
      code: 400,
      message: "Lỗi tạo lightnovel, vui lòng thử lại",
      data: null
    }

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

    const lightnovel = await findLightnovel(novelId)

    if (!lightnovel) {

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

    const result = await insertLightnovelVolume({
      lightnovelId: lightnovel.id,
      name: validationValues.data.name,
      image: validationValues.data.image,
    })

    if (!result) return {
      code: 400,
      message: "Lỗi trong quá trình thêm volume, vui lòng thử lại",
      data: null
    }

    await lightnovelUpdatedAt(convertUtcToGMT7(new Date()), lightnovel.id)

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

export const createLightnovelChapter = async (values: string, novelId: string, words: number = 0) => {
  try {
    const validationValues = lightnovelChapterSchema.safeParse(JSON.parse(values))

    if (!validationValues.success) return {
      code: 401,
      message: "Vui lòng kiểm tra lại dữ liệu đã nhập",
      data: null
    }

    const session = await getServerSession()

    const lightnovel = await findLightnovel(novelId)

    if (!lightnovel) {
      return {
        code: 404,
        message: "Không tìm thấy lightnovel",
        data: null
      }
    }

    if (!session?.permissions.includes("UPLOAD") || session?.id !== lightnovel.userId) {
      return {
        code: 401,
        message: "Bạn không có quyền thêm chapter",
        data: null
      }
    }

    const result = await insertLightnovelChapter({
      name: validationValues.data.name,
      content: validationValues.data.content,
      volumeId: validationValues.data.volume_id,
      charge: validationValues.data.charge,
      words: words,
      viewed: 0,
    })

    if (!result) return {
      code: 400,
      message: "Lỗi trong quá trình thêm chapter, vui lòng thử lại",
      data: null
    }

    await lightnovelUpdatedAt(new Date(), novelId)

    await lightnovelVolumeUpdatedAt(new Date(), validationValues.data.volume_id)

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
    const volumes = await findVolumes(novelId)

    return {
      code: 200,
      message: "success",
      data: volumes || []
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

export const getLightnovelDetail = async (
  novelId: string,
) => {
  try {
    const session = await getServerSession()

    const lightnovel = await lightnovelDetail(novelId, session?.id ?? undefined)

    if (!lightnovel) {
      return {
        code: 404,
        message: "Không tìm thấy lightnovel",
        data: null
      }
    }

    // const result: LightnovelDetail = {
    //   id: lightnovel.id,
    //   name: lightnovel.name,
    //   type: "lightnovel",
    //   createdAt: lightnovel.createdAt ? lightnovel.createdAt.toISOString() : "",
    //   updateAt: lightnovel.updatedAt ? lightnovel.updatedAt.toISOString() : "",
    //   categories: lightnovel.categories.map(cate => cate.category),
    //   favorites: lightnovel.favorites,
    //   otherNames: lightnovel.otherNames as string[],
    //   summary: lightnovel.summary,
    //   note: lightnovel.note,
    //   user: lightnovel.user,
    //   words: formatNumber(lightnovel.volumes.reduce((totalWords, volume) => {
    //     return totalWords + volume.chapters.reduce((volumeWords, chapter) => {
    //       return volumeWords + (chapter.words || 0);
    //     }, 0);
    //   }, 0)),
    //   viewed: formatNumber(lightnovel.volumes.reduce((totalViewed, volume) => {
    //     return totalViewed + volume.chapters.reduce((volumeViewed, chapter) => {
    //       return volumeViewed + (chapter.viewed || 0);
    //     }, 0);
    //   }, 0)),
    //   translationGroup: lightnovel.translationGroup as {
    //     id: string;
    //     image: {
    //       key?: string,
    //       url: string
    //     } | null;
    //     name: string;
    //   },
    //   image: lightnovel.image as {
    //     key?: string,
    //     url: string
    //   } | undefined,
    //   artist: lightnovel.artist,
    //   author: lightnovel.author,
    //   volumes: await Promise.all(lightnovel.volumes.map(async (item) => {
    //     const chapters = await Promise.all(item.chapters.map(async (chapter) => {
    //       let purchasesId = "";
    //       if (session && session.id !== lightnovel.user.id) {
    //         const res = await findChapterPurchased(chapter.id, session.id!);
    //         if (res) {
    //           purchasesId = res.id;
    //         }
    //       }
    //       return {
    //         id: chapter.id,
    //         name: chapter.name,
    //         charge: (() => {
    //           if (!session) {
    //             return chapter.charge ?? false;
    //           } else if (session.id === lightnovel.user.id) {
    //             return false
    //           }
    //           else {
    //             return purchasesId !== "" ? false : (chapter.charge ?? false);
    //           }
    //         })(),
    //         createdAt: chapter.createdAt ? chapter.createdAt.toISOString() : "",
    //         viewed: chapter.viewed || 0
    //       };
    //     }));
    //     return {
    //       id: item.id,
    //       name: item.name,
    //       createdAt: item.createdAt ? item.createdAt.toISOString() : "",
    //       updateAt: item.createdAt ? item.createdAt.toISOString() : "",
    //       image: item.image as {
    //         key?: string,
    //         url: string
    //       } | null,
    //       chapters: chapters // Assign the resolved chapters array
    //     };
    //   }))
    // }

    return {
      code: 200,
      message: "success",
      data: lightnovel
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

export const getChapterContent = async (chapterId: string): Promise<{
  code: number,
  message: string,
  data: LightnovelChapterDetail | null
}> => {
  try {
    const session = await getServerSession()

    const content = await findChapter(chapterId, session?.id ?? undefined)

    if (!content) {
      return {
        code: 404,
        message: "Không tìm thấy chapter",
        data: null
      }
    }

    return {
      code: 200,
      message: "success",
      data: content
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

export const updateLightnovelChapterViewed = async (chapterId: string) => {
  try {
    await upViewed(chapterId, new Date())

    return {
      code: 200,
      message: "success"
    }
  } catch (error) {

    console.log(error)

    return {
      code: 500,
      message: "Lỗi server"
    }
  }
}

export const purchaseChapter = async (
  chapterId: string,
  novelId: string,
  authorId: string
) => {
  try {
    const session = await getServerSession()

    if (!session || !session.id) return {
      code: 401,
      message: "Không tìm thấy phiên đăng nhập, vui lòng đăng nhập và thử lại"
    }

    if (!session.coins || session.coins < 200) return {
      code: 401,
      message: "Số coins còn lại không đủ"
    }

    const res = await purchaseLightnovelChap(
      chapterId,
      session.id,
      authorId,
    )

    if (res) {
      revalidatePath(`/lightnovels/lightnovel/${novelId}`)
      return {
        code: 200,
        message: "Thanh toán thành công"
      }
    } else {
      return {
        code: 400,
        message: "Thanh toán thất bại, vui lòng thử lại"
      }
    }

  } catch (error) {
    console.log(error)
    return {
      code: 500,
      message: "Lỗi server vui lòng thử lại"
    }
  }
}

export const createComment = async (
  comment: string,
  contentId: string,
  parentId?: string,
) => {
  try {
    const session = await getServerSession()

    if (!session || !session.id) return {
      code: 400,
      message: "Không tìm thấy phiên đăng nhập, vui lòng đăng nhập và thử lại"
    }

    const data: {
      comment: string,
      userId: string,
      parentId: string | null,
    } = {
      comment: comment,
      userId: session.id,
      parentId: parentId ?? null
    }

    const createdComment = await insertComment({ ...data }, contentId)

    if (!createdComment) return {
      code: 400,
      message: "Có lỗi trong quá trình đăng comment, vui lòng thử lại"
    }

    return {
      code: 200,
      message: "success"
    }
  } catch (error) {
    console.log(error)
    return {
      code: 500,
      message: "Lỗi server"
    }
  }
}

export const getLightnovelComments = async (
  contentId: string,
  type: CommentType,
  limit?: number,
  step?: number,
): Promise<{
  code: number,
  message: string,
  data: CommentData[]
}> => {
  try {
    const session = await getServerSession()

    if (type === "lightnovel chapter") {
      const res = await findLightnovelComments(limit ?? 10, step ?? 1, contentId, session?.id ?? undefined)

      if (!res) return {
        code: 404,
        message: "Không có bình luận",
        data: []
      }

      return {
        code: 200,
        message: "success",
        data: res
      }
    }

    return {
      code: 200,
      message: "success",
      data: []
    }
  } catch (error) {
    console.log(error)
    return {
      code: 500,
      message: "Lỗi server",
      data: []
    }
  }
}

export const getLightnovel = async (novelId: string) => {
  try {
    const existingLightnovel = await findLightnovel(novelId)

    if (!existingLightnovel) return {
      code: 404,
      message: "Không tìm thấy lightnovel",
      data: null
    }

    return {
      code: 200,
      message: "success",
      data: existingLightnovel
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

export const editLightnovel = async (novelId: string, values: string, callbackUrl: string) => {
  try {
    const session = await getServerSession()

    if (!session || !session.id) return {
      code: 401,
      message: "Không tìm thấy phiên đăng nhập, vui lòng đăng nhập và thử lại",
      data: false
    }

    if (!session.permissions.includes("UPLOAD")) return {
      code: 401,
      message: "Bạn không có quyền chỉnh sửa lightnovel",
      data: false
    }

    const validationValues = lightnovelSchema.safeParse(JSON.parse(values))

    if (!validationValues.success) {
      return {
        code: 401,
        message: "Vui lòng kiểm tra lại dữ liệu đã nhập",
        data: false
      }
    }

    const existingLightnovel = await findLightnovel(novelId)

    if (!existingLightnovel) return {
      code: 404,
      message: "Không tìm thấy lightnovel",
      data: false
    }

    if (existingLightnovel.userId !== session.id) return {
      code: 401,
      message: "Bạn không có quyền chỉnh sửa lightnovel này",
      data: false
    }

    const result = await updateLightnovel(
      novelId,
      {
        name: validationValues.data.name,
        artist: validationValues.data.artist,
        author: validationValues.data.author,
        image: validationValues.data.image,
        note: validationValues.data.note,
        otherNames: validationValues.data.other_names && validationValues.data.other_names.length > 0 ? validationValues.data.other_names.map(item => item.text) : [],
        summary: validationValues.data.summary,
        userId: session.id!,
      },
      validationValues.data.categories
    )

    if (result) {
      revalidatePath(callbackUrl)
      return {
        code: 200,
        message: "Cập nhật lightnovel thành công",
        data: true
      }
    } else {
      return {
        code: 400,
        message: "Có lỗi trong quá trình cập nhật, vui lòng thử lại",
        data: false
      }
    }
  } catch (error) {
    console.log(error)
    return {
      code: 500,
      message: "Lỗi server",
      data: false
    }
  }
}