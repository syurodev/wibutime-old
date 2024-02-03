import { db } from "@/drizzle/db";
import { UserInsert, user } from "@/drizzle/schema";

export const createUser = async (data: UserInsert) => {
  try {
    const createdUser = await db.insert(user).values({
      ...data
    }).returning({
      id: user.id,
      email: user.email
    })

    if (createUser.length === 0) return null

    return createdUser[0]
  } catch (error) {
    console.log(error)
    return null
  }
}