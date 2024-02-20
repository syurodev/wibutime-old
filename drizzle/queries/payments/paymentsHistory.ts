import { db } from "@/drizzle/db";
import { Payments, payments } from "@/drizzle/schema";
import { and, desc, eq, gt } from "drizzle-orm";

export const paymentsHistory = async (userId: string, limit?: number): Promise<Payments[]> => {
  try {
    const history = await db.query.payments.findMany({
      where: and(
        eq(payments.userId, userId),
        gt(payments.amount, 0)
      ),
      orderBy: desc(payments.payDate),
      limit: limit ?? 10
    })

    return history
  } catch (error) {
    console.log(error)
    return []
  }
}