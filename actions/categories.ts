"use server"

import { getCategories } from "@/drizzle/queries/category/getAllCategory"
import { getCategoriesAndCountContent } from "@/drizzle/queries/category/getCategoriesAndCountContent"

export const getAllCategories = async (): Promise<{
  code: number,
  message: string,
  data: {
    id: string;
    name: string;
  }[] | null
}> => {
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

export const getAllCategoriesAndContent = async () => {
  try {
    const result = await getCategoriesAndCountContent()

    return result
  } catch (error) {
    console.log(error)
    return null
  }
}