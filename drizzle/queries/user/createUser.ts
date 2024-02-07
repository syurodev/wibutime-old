import { db } from "@/drizzle/db";
import { UserInsert, users } from "@/drizzle/schema";

export const createUser = async (data: UserInsert) => {
  try {
    const createdUser = await db.insert(users).values({
      ...data
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