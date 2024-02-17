import { db } from "@/drizzle/db";
import { sql } from "drizzle-orm";

export const searchContent = async (q: string) => {
  try {
    const result: {
      id: string,
      name: string,
      image?: string | null
      type: ContentType
    }[] | null = await db.execute(sql`
      SELECT 
        anime.id AS id,
        anime.name AS name,
        latest_season.image AS image,
        'anime' AS type
      FROM 
        anime
      LEFT JOIN LATERAL (
        SELECT 
          image
        FROM 
          anime_season
        WHERE 
          anime_season.anime_id = anime.id
        ORDER BY 
          anime_season.created_at DESC
        LIMIT 1
      ) AS latest_season ON true
      WHERE 
        anime.name ILIKE '%' || ${q} || '%'
        OR EXISTS (
          SELECT 
            1 
          FROM 
            unnest(anime.other_names) AS other_name 
          WHERE 
            other_name ILIKE '%' || ${q} || '%'
        )

      UNION

      SELECT 
        manga.id AS id,
        manga.name AS name,
        latest_season.image AS image,
        'manga' AS type
      FROM 
        manga
      LEFT JOIN LATERAL (
        SELECT 
          image
        FROM 
          manga_season
        WHERE 
          manga_season.manga_id = manga.id
        ORDER BY 
          manga_season.created_at DESC
        LIMIT 1
      ) AS latest_season ON true
      WHERE 
        manga.name ILIKE '%' || ${q} || '%'
        OR EXISTS (
          SELECT 
            1 
          FROM 
            unnest(manga.other_names) AS other_name 
          WHERE 
            other_name ILIKE '%' || ${q} || '%'
        )

      UNION

      SELECT 
        lightnovel.id AS id,
        lightnovel.name AS name,
        image,
        'lightnovel' AS type
      FROM 
        lightnovel
      WHERE 
        lightnovel.name ILIKE '%' || ${q} || '%'
        OR EXISTS (
          SELECT 
            1 
          FROM 
            unnest(lightnovel.other_names) AS other_name 
          WHERE 
            other_name ILIKE '%' || ${q} || '%'
        );    
    `);

    return result ?? []

  } catch (error) {
    console.log(error)
    return []
  }
}