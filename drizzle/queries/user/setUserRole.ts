import { db } from "@/drizzle/db"
import { getRole } from "@/drizzle/queries/user/getRole"
import { userOnRole } from "@/drizzle/schema"

export const setUserRole = async (userId: string, roleName: UserRole) => {
  try {
    const existingRole = await getRole(roleName)

    if (!existingRole) return false

    const updatedUser = await db.insert(userOnRole).values({
      userId: userId,
      roleId: existingRole.id
    })
      .returning({ userId: userOnRole.userId })

    if (updatedUser.length === 0) return false

    return true
  } catch (error) {
    console.log(error)
    return false
  }
}