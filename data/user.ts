import { db } from "@/lib/db";

export const getUserByUsername = async (username: string) => {
  try {
    const existingUser = await db.user.findUnique({
      where: {
        username,
      }
    })
    await db.$disconnect()

    return existingUser
  } catch (error) {
    await db.$disconnect()

    console.log(error)
    return null;
  }
}

export const getUserByEmail = async (email: string) => {
  try {
    const existingUser = await db.user.findUnique({
      where: {
        email,
      }
    })
    await db.$disconnect()

    return existingUser
  } catch (error) {
    await db.$disconnect()

    console.log(error)
    return null;
  }
}

export const getUserById = async (id: string) => {
  try {
    const existingUser = await db.user.findUnique({
      where: {
        id,
      }
    })
    await db.$disconnect()

    return existingUser
  } catch (error) {
    await db.$disconnect()
    console.log(error)
    return null;
  }
}

export const getRole = async (name: UserRole) => {
  try {
    const existingRole = await db.role.findFirst({
      where: {
        name,
      }
    })
    await db.$disconnect()

    return existingRole
  } catch (error) {
    await db.$disconnect()

    console.log(error)
    return null;
  }
}