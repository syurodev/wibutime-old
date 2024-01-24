"use server"

import { db } from "@/lib/db"
import { formatNumber } from "@/lib/formatNumber";

export const getNews = async (): Promise<{
  code: number,
  message: string,
  data: NewsData | null
}> => {
  try {
    const latestAnimes = await db.anime.findMany({
      where: {
        deleted: false,
      },
      orderBy: {
        update_at: 'desc',
      },
      take: 3,
      select: {
        id: true,
        name: true,
        image: true,
        summary: true,
        categories: {
          select: {
            id: true,
            name: true,
          },
        },
        seasons: {
          where: {
            deleted: false,
          },
          orderBy: {
            update_at: 'desc',
          },
          take: 1,
          select: {
            id: true,
            name: true,
            _count: true,
            episodes: {
              where: {
                deleted: false,
              },
              orderBy: {
                update_at: 'desc',
              },
              take: 1,
              select: {
                id: true,
                index: true,
              }
            },
          }
        },
        favorites: {
          select: {
            _count: true
          }
        }
      }
    });

    const latestMangas = await db.manga.findMany({
      where: {
        deleted: false,
      },
      orderBy: {
        update_at: 'desc',
      },
      take: 3,
      select: {
        id: true,
        name: true,
        image: true,
        summary: true,
        categories: {
          select: {
            id: true,
            name: true,
          },
        },
        seasons: {
          where: {
            deleted: false,
          },
          orderBy: {
            update_at: 'desc',
          },
          take: 1,
          select: {
            id: true,
            name: true,
            chapters: {
              where: {
                deleted: false,
              },
              orderBy: {
                update_at: 'desc',
              },
              take: 1,
              select: {
                id: true,
                index: true,
              }
            },
          }
        },
        favorites: {
          select: {
            _count: true
          }
        }
      }
    });

    const latestNovels = await db.lightnovel.findMany({
      where: {
        deleted: false,
      },
      orderBy: {
        update_at: 'desc',
      },
      take: 3,
      select: {
        id: true,
        name: true,
        image: true,
        summary: true,
        categories: {
          select: {
            id: true,
            name: true,
          },
        },
        volumes: {
          where: {
            deleted: false,
          },
          orderBy: {
            update_at: 'desc',
          },
          take: 1,
          select: {
            id: true,
            name: true,
            chapters: {
              where: {
                deleted: false,
              },
              orderBy: {
                update_at: 'desc',
              },
              take: 1,
              select: {
                id: true,
                name: true,
                words: true
              }
            },
          }
        },
        favorites: {
          select: {
            _count: true
          }
        }
      }
    });

    const fotmatAnimes: AnimeNew[] | null = latestAnimes.length === 0 ? null : latestAnimes.map((anime) => ({
      id: anime.id,
      name: anime.name,
      summary: anime.summary,
      type: "anime" as ContentType,
      categories: anime.categories,
      image: anime.image as {
        key?: string,
        url: string
      } | null,
      seasons: anime.seasons.length === 0 ? null : {
        id: anime.seasons[0].id,
        name: anime.seasons[0].name,
        episodes: anime.seasons[0].episodes.length === 0 ? null : {
          id: anime.seasons[0].episodes[0].id,
          index: anime.seasons[0].episodes[0].index
        }
      },
      favorites: formatNumber(anime.favorites.length)
    }))

    const formatMangas: MangaNew[] | null = latestMangas.length === 0 ? null : latestMangas.map((manga) => ({
      id: manga.id,
      name: manga.name,
      summary: manga.summary,
      type: "manga" as ContentType,
      categories: manga.categories,
      image: manga.image as {
        key?: string,
        url: string
      } | null,
      seasons: manga.seasons.length === 0 ? null : {
        id: manga.seasons[0].id,
        name: manga.seasons[0].name,
        chapters: manga.seasons[0].chapters.length === 0 ? null : {
          id: manga.seasons[0].chapters[0].id,
          index: manga.seasons[0].chapters[0].index
        }
      },
      favorites: formatNumber(manga.favorites.length)
    }))

    const formatLightnovels: LightnovelNew[] | null = latestNovels.length === 0 ? null : latestNovels.map((novel) => ({
      id: novel.id,
      name: novel.name,
      summary: novel.summary,
      categories: novel.categories,
      type: "lightnovel" as ContentType,
      image: novel.image as {
        key?: string,
        url: string
      } | null,
      volumes: novel.volumes.length === 0 ? null : {
        id: novel.volumes[0].id,
        name: novel.volumes[0].name,
        chapters: novel.volumes[0].chapters.length === 0 ? null : {
          id: novel.volumes[0].chapters[0].id,
          name: novel.volumes[0].chapters[0].name,
          words: formatNumber(novel.volumes[0].chapters[0].words),
        }
      },
      favorites: formatNumber(novel.favorites.length)
    }))

    let result: NewsData = []

    const formatsToCheck = [fotmatAnimes, formatMangas, formatLightnovels];

    for (const format of formatsToCheck) {
      if (format) {
        result = [...result, ...format];
      }
    }

    return {
      code: 200,
      message: "success",
      data: result
    }

  } catch (error) {
    await db.$disconnect()

    console.log(error)
    return {
      code: 500,
      message: "Lỗi server",
      data: null
    }
  }
}


export const getTrending = async () => {
  const currentDate = new Date();

  const startOfDay = new Date(currentDate);
  startOfDay.setHours(0, 0, 0, 0);

  try {
    const lightnovelTrending = await db.$queryRaw`
    SELECT l.id, l.name, l.image, COUNT(c.id) AS chapter_count, SUM(c.viewed) AS total_viewed
    FROM lightnovel l
    LEFT JOIN lightnovel_volume v ON l.id = v.novel_id
    LEFT JOIN lightnovel_chapter c ON v.id = c.volume_id
    WHERE c.viewed_at BETWEEN ${startOfDay} AND ${currentDate}
    GROUP BY l.id
    ORDER BY total_viewed DESC
    LIMIT 8;
  `;

    // const topAnime = await db.$queryRaw`
    //   SELECT
    //     a.id,
    //     a.name,
    //     s.id as seasonId,
    //     s.name as seasonName,
    //     e.id as episodeId,
    //     e.viewed
    //   FROM
    //     anime a
    //   LEFT JOIN
    //     anime_season s ON a.id = s.anime_id
    //   LEFT JOIN
    //     anime_episode e ON s.id = e.season_id
    //   WHERE
    //     e.viewed_at BETWEEN ${startOfDay} AND ${currentDate}
    //   ORDER BY
    //     e.viewed DESC
    //   LIMIT
    //     8
    // `;

    // const topManga = await db.$queryRaw`
    //   SELECT
    //     m.id,
    //     m.name,
    //     s.id as seasonId,
    //     s.name as seasonName,
    //     c.id as chapterId,
    //     c.viewed
    //   FROM
    //     manga m
    //   LEFT JOIN
    //     manga_season s ON m.id = s.manga_id
    //   LEFT JOIN
    //     manga_chapter c ON s.id = c.season_id
    //   WHERE
    //     c.viewed_at BETWEEN ${startOfDay} AND ${currentDate}
    //   ORDER BY
    //     c.viewed DESC
    //   LIMIT
    //     8
    // `;

    db.$disconnect()

    console.log(lightnovelTrending)
  } catch (error) {
    db.$disconnect()
    console.log(error)
    return {
      code: 500,
      message: "Lỗi server",
      data: null
    }
  }
}