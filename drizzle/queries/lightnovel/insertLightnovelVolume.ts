import { db } from "@/drizzle/db";
import { LightnovelVolumeInsert, lightnovelVolume } from "@/drizzle/schema";

export const insertLightnovelVolume = async (data: LightnovelVolumeInsert) => {
  try {
    const createdLightnovelVolume = await db.insert(lightnovelVolume).values({
      ...data
    }).returning({ id: lightnovelVolume.id, name: lightnovelVolume.name })

    if (createdLightnovelVolume.length === 0) return null

    return createdLightnovelVolume[0]
  } catch (error) {
    console.log(error)
    return null
  }
}