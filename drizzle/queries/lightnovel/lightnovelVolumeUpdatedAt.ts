import { db } from "@/drizzle/db";
import { lightnovelVolume } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export const lightnovelVolumeUpdatedAt = async (time: Date, volumeId: string) => {
  try {
    await db.update(lightnovelVolume)
      .set({
        updatedAt: time
      })
      .where(eq(lightnovelVolume.id, volumeId))

    return true
  } catch (error) {
    console.log(error)
    return false
  }
}