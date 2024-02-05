import { db } from "@/drizzle/db";
import { sql } from "drizzle-orm";

export const findlAnimeTrending = async (limit: number, startDay: Date, endDay: Date) => {
  try {
    const data: {
      id: string,
      name: string,
      image: string | null,
      numfavorites: bigint,
      totalviews: bigint
    }[] | null = await db.execute(sql`
      SELECT
        a.id,
        a.name,
        as1.image AS image,
        COUNT(DISTINCT fav.favorite_id) AS numFavorites,
        SUM(ae.viewed) AS totalViews
      FROM
        anime a
        LEFT JOIN (
          SELECT
            as2.anime_id,
            as2.image
          FROM
            anime_season as2
          WHERE
            as2.created_at = (
              SELECT
                MAX(as3.created_at)
              FROM
                anime_season as3
              WHERE
                as3.anime_id = as2.anime_id
            )
        ) as1 ON a.id = as1.anime_id
        LEFT JOIN anime_episode ae ON as1.anime_id = ae.season_id
        LEFT JOIN favorite_anime fav ON a.id = fav.anime_id
      WHERE
        ae.updated_at BETWEEN ${startDay.toISOString()} AND ${endDay.toISOString()}
      GROUP BY
        a.id, a.name, as1.image
      ORDER BY
        numFavorites DESC
      LIMIT
        ${limit};
    `)
    return data

  } catch (error) {
    console.log(error)
    return null
  }
}