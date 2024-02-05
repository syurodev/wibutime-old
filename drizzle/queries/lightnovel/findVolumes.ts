import { and, desc, eq } from "drizzle-orm";

import { db } from "@/drizzle/db";
import { lightnovelVolume } from "@/drizzle/schema";

export const findVolumes = async (novelId: string) => {
  try {
    const existingVolumes = await db.query.lightnovelVolume.findMany({
      where: and(eq(lightnovelVolume.lightnovelId, novelId), eq(lightnovelVolume.deleted, false)),
      columns: {
        id: true,
        name: true
      },
      orderBy: desc(lightnovelVolume.createdAt)
    })

    if (!existingVolumes) return null

    return existingVolumes
  } catch (error) {
    console.log(error)
    return null
  }
}