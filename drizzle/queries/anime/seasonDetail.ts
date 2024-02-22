import { db } from "@/drizzle/db";
import { animeEpisode, animeSeason, followerGroup, followerUser, translationGroup, users } from "@/drizzle/schema";
import { and, desc, eq } from "drizzle-orm";

type SeasonDetail = {
  id: string;
  name: string;
  image?: {
    key: string,
    url: string
  },
  aired: string,
  broadcastDay: string,
  broadcastTime: Date,
  musics?: {
    type: MusicType,
    name: string,
    url?: string,
  }[],
  studio: string,
  numberOfEpisodes: number | null,
  episode: {
    id: string;
    createdAt: Date | null;
    updatedAt: Date | null;
    deleted: boolean | null;
    content: {
      url: string
    };
    viewed: number | null;
    viewed_at: Date | null;
    thumbnail?: {
      url: string
    };
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
      image?: string,
      followers: {
        followerId: string
      }[],
    } | null,
    favorites: {
      userId: string
    }[]
  }
}

export const seasonDetail = async (seasonId: string): Promise<SeasonDetail | null> => {
  try {
    const data = await db.query.animeSeason.findFirst({
      where: and(
        eq(animeSeason.id, seasonId),
        eq(animeSeason.deleted, false)
      ),
      with: {
        anime: {
          columns: {
            userId: true,
            translationGroup: true
          }
        }
      }
    })

    const existingSeason: {
      id: string;
      name: string;
      image?: any,
      aired: string,
      broadcastDay: string,
      broadcastTime: Date,
      musics?: any,
      studio: string,
      numberOfEpisodes: number | null,
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
        favorites: {
          userId: string
        }[]
      }
    } | undefined = await db.query.animeSeason.findFirst({
      where: and(
        eq(animeSeason.id, seasonId),
        eq(animeSeason.deleted, false)
      ),
      columns: {
        id: true,
        name: true,
        image: true,
        aired: true,
        broadcastDay: true,
        broadcastTime: true,
        musics: true,
        studio: true,
        numberOfEpisodes: true,
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

    const result: SeasonDetail = {
      ...existingSeason,
      anime: {
        ...existingSeason.anime,

        favorites: existingSeason.anime.favorites,
        translationGroup: {
          id: existingSeason.anime.translationGroup?.id || "",
          name: existingSeason.anime.translationGroup?.name || "",
          image: existingSeason.anime.translationGroup?.image.url,
          followers: existingSeason.anime.translationGroup?.followers || []
        }
      },
      episode: existingSeason.episode.map((item) => ({
        ...item,
        content: {
          url: item.content.url!
        },
        thumbnail: {
          url: item.thumbnail.url!
        }
      }))
    }

    return result
  } catch (error) {
    console.log(error)
    return null
  }
}