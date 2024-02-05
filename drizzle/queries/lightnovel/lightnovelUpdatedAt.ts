import { db } from "@/drizzle/db";
import { lightnovel } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export const lightnovelUpdatedAt = async (time: Date, novelId: string) => {
  try {
    await db.update(lightnovel)
      .set({
        updatedAt: time
      })
      .where(eq(lightnovel.id, novelId))

    return true
  } catch (error) {
    console.log(error)
    return false
  }
}