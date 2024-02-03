"use server"
import * as z from "zod"
import bcrypt from "bcryptjs"

import { newPasswordSchema } from "@/schemas/auth"
import { getResetPasswordTokenByToken } from "@/drizzle/queries/token/getResetPasswordTokenByToken"
import { getUserByEmail } from "@/drizzle/queries/user/getUserByEmail"
import { client, db } from "@/drizzle/db"
import { resetPasswordToken, user } from "@/drizzle/schema"
import { eq } from "drizzle-orm"

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
    return {
      code: 404,
      message: "Không tìm thấy người dùng"
    }
  }

  const { password } = validateValues.data

  const newHasedPassword = await bcrypt.hash(password, 10)

  await db.update(user)
    .set({ hashedPassword: newHasedPassword })
    .where(eq(user.id, existingUser.id))


  await db.delete(resetPasswordToken)
    .where(eq(resetPasswordToken.id, existingToken.id))


  return {
    code: 200,
    message: "Đổi mật khẩu thành công"
  }
}
