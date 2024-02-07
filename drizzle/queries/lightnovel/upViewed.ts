import { and, desc, eq, sql } from "drizzle-orm";

import { db } from "@/drizzle/db";
import { lightnovelChapter } from "@/drizzle/schema";

export const upViewed = async (chapterId: string, date: Date) => {
  try {
    const updatedChapter = await db.update(lightnovelChapter)
      .set({ viewed: sql`viewed + 1`, viewed_at: date })
      .where(eq(lightnovelChapter.id, chapterId))
      .returning({ id: lightnovelChapter.id })

    if (updatedChapter.length === 0) return false

    return true
  } catch (error) {
    console.log(error)
    return false
  }
}