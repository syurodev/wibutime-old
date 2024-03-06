import { db } from "@/drizzle/db";
import { lightnovel } from "@/drizzle/schema";
import { formatNumber } from "@/lib/formatNumber";
import { desc, sql } from "drizzle-orm";

export const findlLightnovelTrending = async (limit: number): Promise<TrendingData[] | null> => {
  try {
    const lightnovelTrending: {
      id: string,
      name: string,
      image: string | null,
      numfavorites: bigint,
      totalviews: bigint
    }[] | null = await db.execute(sql`
        SELECT
          ln.id,
          ln.name,
          ln.image,
          COUNT(DISTINCT fav.user_id) AS numFavorites,
          SUM(lnc.viewed) AS totalViews
        FROM
          lightnovel ln
        LEFT JOIN
          lightnovel_volume lnv ON ln.id = lnv.lightnovel_id
        LEFT JOIN
          lightnovel_chapter lnc ON lnv.id = lnc.volume_id
        LEFT JOIN
          favorite_lightnovel fav ON ln.id = fav.lightnovel_id
        WHERE
          lnc.updated_at BETWEEN CURRENT_DATE - INTERVAL '7 days' AND CURRENT_DATE
        GROUP BY
          ln.id, ln.name, ln.image
        ORDER BY
          totalViews DESC
        LIMIT
          ${limit}
      `)

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