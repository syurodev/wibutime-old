import { db } from "@/drizzle/db";
import { formatNumber } from "@/lib/formatNumber";
import { sql } from "drizzle-orm";

export const findlMangaTrending = async (limit: number, startDay: Date, endDay: Date): Promise<TrendingData[] | null> => {
  try {
    const topManga: {
      id: string,
      name: string,
      image: string | null,
      numfavorites: bigint,
      totalviews: bigint
    }[] | null = await db.execute(sql`
      SELECT
        m.id,
        m.name,
        ms.image AS image,
        COUNT(DISTINCT fav.user_id) AS numFavorites,
        SUM(mc.viewed) AS totalViews
      FROM
        manga m
        LEFT JOIN (
          SELECT
            ms1.manga_id,
            ms1.image
          FROM
            manga_season ms1
          WHERE
            ms1.created_at = (
              SELECT
                MAX(ms2.created_at)
              FROM
                manga_season ms2
              WHERE
                ms2.manga_id = ms1.manga_id
            )
        ) ms ON m.id = ms.manga_id
        LEFT JOIN manga_chapter mc ON ms.manga_id = mc.season_id
        LEFT JOIN favorite_manga fav ON m.id = fav.manga_id
      WHERE
        mc.updated_at BETWEEN ${startDay.toISOString()} AND ${endDay.toISOString()}
      GROUP BY
        m.id, m.name, ms.image
      ORDER BY
        numFavorites DESC
      LIMIT
        ${limit};  
    `)

    const mangaTrendingResult: TrendingData[] = topManga && topManga.length > 0 ?
      topManga.map((item) => ({
        id: item.id,
        image: item.image ? JSON.parse(item.image) : null,
        name: item.name,
        numfavorites: formatNumber(Number(item.numfavorites)),
        totalviews: formatNumber(Number(item.totalviews))
      }))
      : []
    return mangaTrendingResult

  } catch (error) {
    console.log(error)
    return null
  }
}