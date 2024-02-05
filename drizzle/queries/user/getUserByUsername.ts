import { eq } from "drizzle-orm"

import { db } from "@/drizzle/db"
import { user } from "@/drizzle/schema"

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