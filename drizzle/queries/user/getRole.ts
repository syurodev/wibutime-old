import { db } from "@/drizzle/db"
import { role } from "@/drizzle/schema"
import { eq } from "drizzle-orm"

export const getRole = async (roleName: UserRole) => {
  try {
    const existingRole = await db.query.role.findFirst({
      where: eq(role.name, roleName)
    })

    if (!existingRole) return null

    return existingRole

  } catch (error) {
    console.log(error)
    return null
  }
}