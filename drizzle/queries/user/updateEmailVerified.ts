import { eq } from "drizzle-orm";

import { db } from "@/drizzle/db"
import { users } from "@/drizzle/schema"
import { convertUtcToGMT7 } from "@/lib/convertUtcToGMT7";

export const updateEmailVerified = async (userId: string): Promise<boolean> => {
  try {
    const updatedUser: { updatedId: string }[] = await db.update(users)
      .set({ emailVerified: true, updatedAt: convertUtcToGMT7(new Date()) })
      .where(eq(users.id, userId))
      .returning({ updatedId: users.id })

    if (!updatedUser) return false

    return true
  } catch (error) {
    console.log(error)
    return false
  }
}