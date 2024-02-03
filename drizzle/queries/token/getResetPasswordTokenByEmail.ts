import { client, db } from "@/drizzle/db"
import { resetPasswordToken } from "@/drizzle/schema"
import { eq } from "drizzle-orm"

export const getResetPasswordTokenByEmail = async (
  email: string
) => {
  try {
    const existingResetPasswordToken = await db.query.resetPasswordToken.findFirst({
      where: eq(resetPasswordToken.email, email)
    })

    if (!existingResetPasswordToken) return null

    return existingResetPasswordToken
  } catch (error) {
    console.log(error)
    return null
  }
}