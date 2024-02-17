import { eq } from "drizzle-orm"

import { db } from "@/drizzle/db"
import { User, users } from "@/drizzle/schema"

export const getUserByUsername = async (username: string) => {
  try {
    const existingUser: {
      id: string;
      name: string;
      username: string | null;
      image: string | null;
      coins: number | null;
      imageKey: string | null;
      description: unknown;
      email: string;
      phone: string | null;
      hashedPassword: string | null;
      emailVerified: boolean | null;
      phoneVerified: boolean | null;
      createdAt: Date | null;
      updatedAt: Date | null;
    } | undefined = await db.query.users.findFirst({
      where: eq(users.username, username)
    })

    if (!existingUser) return null

    return existingUser
  } catch (error) {
    console.log(error)
    return null
  }
}