"use server"

import { db } from "@/lib/db"
import { getUserByEmail } from "@/data/user"
import { getVerificationTokenByToken } from "@/data/verificationToken"

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

  if (!existingUser) return {
    code: 404,
    message: "Không tìm thấy người dùng"
  }

  await db.user.update({
    where: {
      id: existingUser.id
    },
    data: {
      emailVerified: true,
      email: existingToken.email
    }
  })

  await db.verificationToken.delete({
    where: {
      id: existingToken.id
    }
  })

  return {
    code: 200,
    message: "Xác thực tài khoản thành công"
  }
}
