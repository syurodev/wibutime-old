"use server"

import { db } from "@/lib/db"

export const getAllCategories = async () => {
  try {
    const categories = await db.category.findMany({
      select: {
        id: true,
        name: true
      }
    })
    await db.$disconnect()

    return {
      code: 200,
      message: "success",
      data: categories
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