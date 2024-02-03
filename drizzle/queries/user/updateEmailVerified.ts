import { eq } from "drizzle-orm";

import { client, db } from "@/drizzle/db"
import { user } from "@/drizzle/schema"

export const updateEmailVerified = async (userId: string): Promise<boolean> => {
  try {
    const updatedUser: { updatedId: string }[] = await db.update(user)
      .set({ emailVerified: true })
      .where(eq(user.id, userId))
      .returning({ updatedId: user.id })


    if (!updatedUser) return false

    return true
  } catch (error) {
    console.log(error)
    return false
  }
}