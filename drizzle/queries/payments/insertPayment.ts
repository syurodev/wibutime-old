import { db } from "@/drizzle/db";
import { PaymentsInsert, payments } from "@/drizzle/schema";

export const insertPayment = async (data: PaymentsInsert): Promise<string | null> => {
  try {
    const createdPayment = await db.insert(payments)
      .values(data)
      .returning({ id: payments.id })

    if (createdPayment.length === 0) return null

    return createdPayment[0].id
  } catch (error) {
    return null
  }
}