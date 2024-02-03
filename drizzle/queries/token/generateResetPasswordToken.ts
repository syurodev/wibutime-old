import { v4 as uuidv4 } from "uuid"
import { getResetPasswordTokenByEmail } from "@/drizzle/queries/token/getResetPasswordTokenByEmail"
import { db } from "@/drizzle/db"
import { resetPasswordToken } from "@/drizzle/schema"
import { eq } from "drizzle-orm"

export const generateResetPasswordToken = async (email: string) => {
  try {
    const token = uuidv4()
    const expires = new Date(new Date().getTime() + 3600 * 1000)

    const existingToken = await getResetPasswordTokenByEmail(email)

    if (existingToken) {
      await db.delete(resetPasswordToken).where(eq(resetPasswordToken.email, email))
    }

    const generatedVerificationToken = await db.insert(resetPasswordToken).values({
      email: email,
      token: token,
      expires: expires.toDateString()
    }).returning()

    if (!generatedVerificationToken) return null

    return generatedVerificationToken[0]
  } catch (error) {
    return null
  }
}