import { db } from "@/lib/db";

export const getUserByUsername = async (username: string) => {
  try {
    const existingUser = await db.user.findUnique({
      where: {
        username,
      }
    })

    return existingUser
  } catch (error) {
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

    return existingUser
  } catch (error) {
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

    return existingUser
  } catch (error) {
    console.log(error)
    return null;
  }
}

export const getRole = async (name: string) => {
  try {
    const existingRole = await db.role.findFirst({
      where: {
        name,
      }
    })

    return existingRole
  } catch (error) {
    console.log(error)
    return null;
  }
}