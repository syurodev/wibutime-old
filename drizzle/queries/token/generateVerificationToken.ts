import { v4 as uuidv4 } from "uuid"
import { getVerificationTokenByEmail } from "@/drizzle/queries/token/getVerificationTokenByEmail"
import { client, db } from "@/drizzle/db"
import { verificationToken } from "@/drizzle/schema"
import { eq } from "drizzle-orm"

export const generateVerificationToken = async (email: string) => {
  try {
    const token = uuidv4()
    const expires = new Date(new Date().getTime() + 3600 * 1000)

    const existingToken = await getVerificationTokenByEmail(email)

    if (existingToken) {
      await db.delete(verificationToken).where(eq(verificationToken.email, email))
    }

    const generatedVerificationToken = await db.insert(verificationToken).values({
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