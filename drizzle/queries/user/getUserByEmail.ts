import { db } from "@/drizzle/db"
import { users } from "@/drizzle/schema"
import { eq } from "drizzle-orm"

export const getUserByEmail = async (email: string) => {
  try {
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email)
    })

    if (!existingUser) return null

    return existingUser
  } catch (error) {
    console.log(error)
    return null
  }
}