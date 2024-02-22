import { db } from "@/drizzle/db";
import { sql } from "drizzle-orm";

export const findlLightnovelTrending = async (limit: number, startDay: Date, endDay: Date) => {
  try {
    const data: {
      id: string,
      name: string,
      image: string | null,
      numfavorites: bigint,
      totalviews: bigint
    }[] | null = await db.execute(sql`SELECT ln.id, ln.name, ln.image, COUNT(DISTINCT fav.user_id) as numFavorites, SUM(lnc.viewed) AS totalViews FROM lightnovel ln LEFT JOIN lightnovel_volume lnv ON ln.id = lnv.lightnovel_id LEFT JOIN lightnovel_chapter lnc ON lnv.id = lnc.volume_id LEFT JOIN favorite_lightnovel fav ON ln.id = fav.lightnovel_id WHERE lnc.updated_at BETWEEN ${startDay.toISOString()} AND ${endDay.toISOString()} GROUP BY ln.id, ln.name, ln.image, lnv.id, lnc.id ORDER BY totalViews DESC LIMIT ${limit}`)
    return data

  } catch (error) {
    console.log(error)
    return null
  }
}