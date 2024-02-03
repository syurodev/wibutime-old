"use server"

import { db } from "@/drizzle/db"
import { getVerificationTokenByToken } from "@/drizzle/queries/token/getVerificationTokenByToken"
import { getUserByEmail } from "@/drizzle/queries/user/getUserByEmail"
import { updateEmailVerified } from "@/drizzle/queries/user/updateEmailVerified"
import { verificationToken } from "@/drizzle/schema"
import { eq } from "drizzle-orm"

export const newVerification = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token)

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

  await updateEmailVerified(existingUser.id)

  await db.delete(verificationToken).where(eq(verificationToken.id, existingToken.id))

  return {
    code: 200,
    message: "Xác thực tài khoản thành công"
  }
}
