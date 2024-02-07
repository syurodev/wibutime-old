import { db } from "@/drizzle/db";
import { UserInsert, users } from "@/drizzle/schema";
import { convertUtcToGMT7 } from "@/lib/convertUtcToGMT7";

export const createUser = async (data: UserInsert) => {
  try {
    const createdUser = await db.insert(users).values({
      ...data,
      createdAt: convertUtcToGMT7(new Date()),
      updatedAt: convertUtcToGMT7(new Date()),
    }).returning({
      id: users.id,
      email: users.email
    })

    if (createUser.length === 0) return null

    return createdUser[0]
  } catch (error) {
    console.log(error)
    return null
  }
}