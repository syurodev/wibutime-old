import { db } from "@/drizzle/db"
import { user } from "@/drizzle/schema"
import { eq } from "drizzle-orm"

export const getUserByEmail = async (email: string) => {
  try {
    const existingUser = await db.query.user.findFirst({
      where: eq(user.email, email)
    })

    if (!existingUser) return null

    return existingUser
  } catch (error) {
    console.log(error)
    return null
  }
}