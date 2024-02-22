import { db } from "@/drizzle/db";
import { animeEpisode, animeSeason, followerGroup, followerUser, translationGroup, users } from "@/drizzle/schema";
import { and, desc, eq } from "drizzle-orm";

export const seasonDetail = async (seasonId: string): Promise<{
  id: string;
  name: string;
  episode: {
    id: string;
    createdAt: Date | null;
    updatedAt: Date | null;
    deleted: boolean | null;
    content: any;
    viewed: number | null;
    viewed_at: Date | null;
    thumbnail: any;
    index: string;
    seasonId: string;
  }[];
  anime: {
    id: string,
    name: string,
    user: {
      id: string,
      name: string,
      image?: string | null,
      followedUsers: {
        followedBy: string
      }[],
    },
    translationGroup?: {
      id: string,
      name: string,
      image?: any,
      followers: {
        followerId: string
      }[],
    } | null,
    // favorite: {
    //   userId: string
    // }[]
  }
} | null> => {
  try {
    const data = await db.query.animeSeason.findFirst({
      where: and(
        eq(animeSeason.id, seasonId),
        eq(animeSeason.deleted, false)
      ),
      columns: {
        id: true
      },
      with: {
        anime: {
          columns: {
            userId: true,
            translationGroup: true
          }
        }
      }
    })

    const existingSeason = await db.query.animeSeason.findFirst({
      where: and(
        eq(animeSeason.id, seasonId),
        eq(animeSeason.deleted, false)
      ),
      columns: {
        id: true,
        name: true,
      },
      with: {
        episode: {
          orderBy: desc(animeEpisode.createdAt)
        },
        anime: {
          columns: {
            id: true,
            name: true,
            userId: true
          },
          with: {
            user: {
              columns: {
                id: true,
                name: true,
                image: true
              },
              with: {
                followedUsers: {
                  where: eq(followerUser.following, data?.anime.userId!)
                }
              }
            },
            translationGroup: {
              columns: {
                id: true,
                name: true,
                image: true
              },
              with: {
                followers: {
                  where: eq(followerGroup.followedId, data?.anime.translationGroup!)
                }
              }
            },
            favorites: {
              columns: {
                userId: true
              }
            }
          }
        }
      },
    })


    if (!existingSeason) return null

    return existingSeason
  } catch (error) {
    console.log(error)
    return null
  }
}