import { findChapterPurchased } from "@/drizzle/queries/lightnovel/findChapterPurchased";

export async function findChapterCharge(
  defaultChapterCharge: boolean,
  chapterId: string,
  novelUser: string,
  userId?: string,
): Promise<boolean> {
  if (!userId) {
    return defaultChapterCharge ?? true;
  } else if (userId === novelUser) {
    return false;
  } else {
    const res = await findChapterPurchased(chapterId, userId!);
    return res ? false : defaultChapterCharge ?? true;
  }
}