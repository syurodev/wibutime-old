import { db } from "@/drizzle/db"
import { users } from "@/drizzle/schema";
import { eq, sql } from "drizzle-orm";

export const updateCoins = async (
  userId: string,
  coins: number,
  calculation: "plus" | "minus"
): Promise<{
  coins: number | null;
} | null> => {
  try {
    const updatedUser = await db.update(users)
      .set({
        coins: calculation === "plus" ? sql`${users.coins} + ${coins}` : sql`${users.coins} - ${coins}`
      })
      .where(eq(users.id, userId))
      .returning({ coins: users.coins })

    if (updatedUser.length === 0) return null

    return updatedUser[0]
  } catch (error) {
    console.log(error)
    return null
  }
}