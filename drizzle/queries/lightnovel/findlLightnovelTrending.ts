import { db } from "@/drizzle/db";
import { formatNumber } from "@/lib/formatNumber";
import { sql } from "drizzle-orm";

export const findlLightnovelTrending = async (limit: number, startDay: Date, endDay: Date): Promise<TrendingData[] | null> => {
  try {
    const lightnovelTrending: {
      id: string,
      name: string,
      image: string | null,
      numfavorites: bigint,
      totalviews: bigint
    }[] | null = await db.execute(sql`SELECT ln.id, ln.name, ln.image, COUNT(DISTINCT fav.user_id) as numFavorites, SUM(lnc.viewed) AS totalViews FROM lightnovel ln LEFT JOIN lightnovel_volume lnv ON ln.id = lnv.lightnovel_id LEFT JOIN lightnovel_chapter lnc ON lnv.id = lnc.volume_id LEFT JOIN favorite_lightnovel fav ON ln.id = fav.lightnovel_id WHERE lnc.updated_at BETWEEN ${startDay.toISOString()} AND ${endDay.toISOString()} GROUP BY ln.id, ln.name, ln.image, lnv.id, lnc.id ORDER BY totalViews DESC LIMIT ${limit}`)

    const lightnovelTrendingResult: TrendingData[] = lightnovelTrending && lightnovelTrending.length > 0 ?
      lightnovelTrending.map((item) => ({
        id: item.id,
        image: item.image ? JSON.parse(item.image) : null,
        name: item.name,
        numfavorites: formatNumber(Number(item.numfavorites)),
        totalviews: formatNumber(Number(item.totalviews))
      }))
      : []

    return lightnovelTrendingResult

  } catch (error) {
    console.log(error)
    return null
  }
}