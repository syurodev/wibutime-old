"use server"

import { db } from "@/lib/db"

export const getAllCategories = async () => {
  try {
    const data = await db.category.findMany({
      select: {
        id: true,
        name: true
      }
    })

    return {
      code: 200,
      message: "success",
      data
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