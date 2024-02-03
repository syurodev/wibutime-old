import { client, db } from "@/drizzle/db"
import { user } from "@/drizzle/schema"
import { eq } from "drizzle-orm"

export const getUserByUsername = async (username: string) => {
  try {
    const existingUser = await db.query.user.findFirst({
      where: eq(user.username, username)
    })

    if (!existingUser) return null

    return existingUser
  } catch (error) {
    console.log(error)
    return null
  }
}