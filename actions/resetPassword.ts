"use server"

import * as z from "zod"

import { resetSchema } from "@/schemas/auth"
import { sendResetPasswordEmail } from "@/lib/mail"
import { getUserByEmail } from "@/drizzle/queries/user/getUserByEmail"
import { generateResetPasswordToken } from "@/drizzle/queries/token/generateResetPasswordToken"

export const resetPassword = async (values: z.infer<typeof resetSchema>) => {
  try {
    const validateFields = resetSchema.safeParse(values)

    if (!validateFields.success) return {
      code: 400,
      message: "Email không hợp lệ"
    }

    const { email } = validateFields.data

    const existingUser = await getUserByEmail(email)

    if (!existingUser) return {
      code: 404,
      message: "Không tìm thấy người dùng"
    }

    const resetPasswordToken = await generateResetPasswordToken(email)

    if (!resetPasswordToken) return {
      code: 400,
      message: "Lỗi tạo token, vui lòng thử lại"
    }
    await sendResetPasswordEmail(resetPasswordToken.email, resetPasswordToken.token)

    return {
      code: 200,
      message: "Email khôi phục đã được gửi, vui lòng kiểm tra email"
    }
  } catch (error) {
    console.log(error)

    return {
      code: 500,
      message: "Lỗi không xác định"
    }
  }
}