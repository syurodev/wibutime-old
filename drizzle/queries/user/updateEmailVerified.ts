import { eq } from "drizzle-orm";

import { db } from "@/drizzle/db"
import { users } from "@/drizzle/schema"

export const updateEmailVerified = async (userId: string): Promise<boolean> => {
  try {
    const updatedUser: { updatedId: string }[] = await db.update(users)
      .set({ emailVerified: true })
      .where(eq(users.id, userId))
      .returning({ updatedId: users.id })


    if (!updatedUser) return false

    return true
  } catch (error) {
    console.log(error)
    return false
  }
}