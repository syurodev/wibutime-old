import { db } from "@/drizzle/db"
import { verificationToken } from "@/drizzle/schema"
import { eq } from "drizzle-orm"

export const getVerificationTokenByEmail = async (
  email: string
) => {
  try {
    const existingErificationToken = await db.query.verificationToken.findFirst({
      where: eq(verificationToken.email, email)
    })

    if (!existingErificationToken) return null

    return existingErificationToken
  } catch (error) {
    console.log(error)
    return null
  }
}