import { db } from "@/drizzle/db";
import { payments } from "@/drizzle/schema";
import { and, eq } from "drizzle-orm";

export const updatePayment = async (
  status: "success" | "pending" | "reject" | null | undefined,
  amount: number | null = null,
  bankCode: string | null = null,
  bankTransactionCode: string | null = null,
  cardType: string | null = null,
  payDate: Date | null = null,
  code: string | null = null,
  userId: string,
) => {
  try {
    if (!code) return null

    const updatedPayment = await db.update(payments)
      .set({
        amount,
        bankCode,
        bankTransactionCode,
        cardType,
        payDate,
        status
      })
      .where(and(
        eq(payments.userId, userId),
        eq(payments.code, code),
        eq(payments.status, "pending")
      ))
      .returning({ id: payments.id, status: payments.status })

    if (updatedPayment.length === 0) return null

    return updatedPayment[0]
  } catch (error) {
    return null
  }
}