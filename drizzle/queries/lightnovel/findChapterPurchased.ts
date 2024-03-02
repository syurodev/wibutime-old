import { and, eq } from "drizzle-orm";

import { db } from "@/drizzle/db";
import { purchaseLightnovelChapter } from "@/drizzle/schema";

export const findChapterPurchased = async (chapterId: string, userId: string): Promise<{
  id: string;
  createdAt: Date | null;
  userId: string;
  chapterId: string;
} | undefined> => {
  try {
    const purchased = await db.query.purchaseLightnovelChapter.findFirst({
      where: and(
        eq(purchaseLightnovelChapter.chapterId, chapterId),
        eq(purchaseLightnovelChapter.userId, userId)
      )
    })

    return purchased
  } catch (error) {
    console.log(error)
    return undefined
  }
}