"use server"

import * as z from "zod"

import { lightnovelSchema } from "@/schemas/lightnovel"
import { db } from "@/lib/db"
import { getServerSession } from "@/lib/getServerSession"

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
        otherName: validationValues.data.otherName ? validationValues.data.otherName.map(item => item.text) : [],
        categoryIds: validationValues.data.categoryIds.map(item => item.id) as string[],
      }
    })

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