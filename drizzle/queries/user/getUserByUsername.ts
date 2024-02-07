import { eq } from "drizzle-orm"

import { db } from "@/drizzle/db"
import { users } from "@/drizzle/schema"

export const getUserByUsername = async (username: string) => {
  try {
    const existingUser = await db.query.users.findFirst({
      where: eq(users.username, username)
    })

    if (!existingUser) return null

    return existingUser
  } catch (error) {
    console.log(error)
    return null
  }
}