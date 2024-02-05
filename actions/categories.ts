"use server"

import { getCategories } from "@/drizzle/queries/category/getAllCategory"

export const getAllCategories = async () => {
  try {
    const categories = await getCategories()

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