import { db } from "@/drizzle/db"
import { verificationToken } from "@/drizzle/schema"
import { eq } from "drizzle-orm"

export const getVerificationTokenByToken = async (
  token: string
) => {
  try {
    const existingErificationToken = await db.query.verificationToken.findFirst({
      where: eq(verificationToken.token, token)
    })

    if (!existingErificationToken) return null

    return existingErificationToken
  } catch (error) {
    console.log(error)
    return null
  }
}