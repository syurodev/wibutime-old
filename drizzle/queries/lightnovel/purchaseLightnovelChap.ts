import { db } from "@/drizzle/db";
import { purchaseLightnovelChapter, transactionFeeLightnovel } from "@/drizzle/schema";
import { updateCoins } from "../user/updateCoins";

export const purchaseLightnovelChap = async (
  chapterId: string,
  userId: string,
  authorId: string,
) => {
  try {
    const purchased = await db.insert(purchaseLightnovelChapter)
      .values({
        chapterId: chapterId,
        userId: userId,
      })
      .returning({ id: purchaseLightnovelChapter.id })

    if (purchased.length === 0) return false

    await db.insert(transactionFeeLightnovel)
      .values({
        amount: 50,
        transaction: purchased[0].id
      })

    //trừ coins
    await updateCoins(userId, 200, "minus")
    //cộng coins
    await updateCoins(authorId, 150, "plus")

    return true

  } catch (error) {
    console.log(error)
    return false
  }
}