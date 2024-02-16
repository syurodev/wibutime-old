import { sql } from "drizzle-orm";

import { db } from "@/drizzle/db";

export const findComments = async (page: number, limit: number, episodeId: string) => {
  try {
    const comments = await db.execute(sql`
      SELECT comment.id AS comment_id, 
      comment.comment AS comment_text, 
      comment.created_at AS comment_created_at, 
      user_info.id AS user_id, 
      user_info.name AS user_name, 
      user_info.image AS user_image
      FROM comment
      JOIN comment_anime_episode ON comment.id = comment_anime_episode.comment_id
      JOIN "user" AS user_info ON comment.user_id = user_info.id
      WHERE comment_anime_episode.episode_id = ${episodeId}
      ORDER BY comment.created_at DESC
      LIMIT ${limit}
      OFFSET (${page} - 1) * ${limit};
    `)

    if (!comments) return []

    return comments
  } catch (error) {
    console.log(error)
    return []
  }
}