"use server"

import { getUserProfile } from "@/drizzle/queries/user/getUserProfile"

export const getUserDetail = async (userId: string): Promise<{
  code: number,
  message: string,
  data: UserProfile | null
}> => {
  try {
    const user = await getUserProfile(userId)

    if (!user) return {
      code: 404,
      message: "Không tìm thấy người dùng",
      data: null
    }

    return {
      code: 200,
      message: "success",
      data: user
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