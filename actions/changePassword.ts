"use server"
import * as z from "zod"
import bcrypt from "bcryptjs"

import { db } from "@/lib/db"
import { getUserByEmail } from "@/data/user"
import { getResetPasswordTokenByToken } from "@/data/resetPasswordToken"
import { newPasswordSchema } from "@/schemas/auth"

export const changePassword = async (token: string | null, values: z.infer<typeof newPasswordSchema>) => {

  if (!token) {
    return {
      code: 404,
      message: "Token không tồn tại"
    }
  }

  const validateValues = newPasswordSchema.safeParse(values)

  if (!validateValues.success) return {
    code: 400,
    message: "Mật khẩu mới có thể không hợp lệ hoặc nhập lại mật khẩu sai, vui lòng thử lại"
  }

  const existingToken = await getResetPasswordTokenByToken(token)

  if (!existingToken) return {
    code: 400,
    message: "Token không hợp lệ"
  }

  const hasExpired = new Date(existingToken.expires) < new Date()

  if (hasExpired) return {
    code: 400,
    message: "Token đã hết hạn"
  }

  const existingUser = await getUserByEmail(existingToken.email)

  if (!existingUser) {
    await db.$disconnect()
    return {
      code: 404,
      message: "Không tìm thấy người dùng"
    }
  }

  const { password } = validateValues.data

  const newHasedPassword = await bcrypt.hash(password, 10)

  await db.user.update({
    where: {
      id: existingUser.id
    },
    data: {
      hashedPassword: newHasedPassword,
    }
  })

  await db.resetPasswordToken.delete({
    where: {
      id: existingToken.id
    }
  })

  await db.$disconnect()
  return {
    code: 200,
    message: "Đổi mật khẩu thành công"
  }
}
