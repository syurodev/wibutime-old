import { eq } from "drizzle-orm";

import { db } from "@/drizzle/db";
import { lightnovel } from "@/drizzle/schema";

export const findLightnovel = async (novelId: string) => {
  try {
    const existingLightnovel = await db.query.lightnovel.findFirst({
      where: eq(lightnovel.id, novelId),
      columns: {
        id: true,
        userId: true
      }
    })

    if (!existingLightnovel) return null

    return existingLightnovel
  } catch (error) {
    console.log(error)
    return null
  }
}