"use server"

import { db } from "@/lib/db"

export const getUserDetail = async (id: string): Promise<{
  code: number,
  message: string,
  data: UserProfile | null
}> => {
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
      select: {
        phoneVerified: false,
        id: true,
        image: true,
        name: true,
        username: true,
        email: true,
        created_at: true,
        emailVerified: true,
        description: true,
        animes: {
          select: {
            name: true,
            created_at: true,
            id: true,
            user: {
              select: {
                id: true
              }
            },
            seasons: {
              select: {
                id: true,
                name: true,
                image: true,
                episodes: {
                  select: {
                    id: true,
                    viewed: true
                  }
                }
              }
            }
          }
        },
        mangas: {
          select: {
            name: true,
            image: true,
            created_at: true,
            id: true,
            user: {
              select: {
                id: true
              }
            },
            seasons: {
              select: {
                id: true,
                name: true,
                image: true,
                chapters: {
                  select: {
                    id: true,
                    viewed: true
                  }
                }
              }
            }
          }
        },
        lightnovels: {
          select: {
            name: true,
            image: true,
            created_at: true,
            id: true,
            user: {
              select: {
                id: true
              }
            },
            volumes: {
              select: {
                id: true,
                name: true,
                image: true,
                created_at: true,
                chapters: {
                  select: {
                    id: true,
                    viewed: true
                  }
                }
              }
            }
          }
        },
        favorites: {
          select: {
            animes: {
              select: {
                name: true,
                id: true,
                seasons: {
                  select: {
                    image: true
                  }
                },
                user: {
                  select: {
                    id: true
                  }
                },
              }
            },
            lightnovels: {
              select: {
                name: true,
                id: true,
                image: true,
                user: {
                  select: {
                    id: true
                  }
                },
              }
            },
            mangas: {
              select: {
                name: true,
                id: true,
                image: true,
                user: {
                  select: {
                    id: true
                  }
                },
              }
            }
          }
        },
      },
    })
    await db.$disconnect()

    if (!user) return {
      code: 404,
      message: "Không tìm thấy người dùng",
      data: null
    }

    const result: UserProfile = {
      id: user.id,
      username: user.username,
      name: user.name,
      image: user.image,
      email: user.email,
      createdAt: user.created_at.toISOString(),
      description: user.description,
      emailVerified: user.emailVerified,
      animes: user.animes ? user.animes.map(anime => ({
        id: anime.id,
        name: anime.name,
        image: anime.seasons[-1].image as {
          key?: string,
          url: string,
        } | null,
        createdAt: anime.created_at.toISOString(),
        user: {
          id: anime.user.id
        },
        seasons: anime.seasons ? anime.seasons.map(season => ({
          id: season.id,
          name: season.name,
          image: season.image as {
            key?: string,
            url: string,
          } | null,
          episodes: season.episodes ? season.episodes.map(ep => ({
            id: ep.id,
            viewed: ep.viewed
          })) : []
        })) : []
      })) : [],
      mangas: user.mangas ? user.mangas.map(manga => ({
        id: manga.id,
        name: manga.name,
        image: manga.image as {
          key?: string,
          url: string,
        } | null,
        createdAt: manga.created_at.toISOString(),
        user: {
          id: manga.user.id
        },
        seasons: manga.seasons ? manga.seasons.map(season => ({
          id: season.id,
          name: season.name,
          image: season.image as {
            key?: string,
            url: string,
          } | null,
          chapters: season.chapters ? season.chapters.map(chap => ({
            id: chap.id,
            viewed: chap.viewed
          })) : []
        })) : []
      })) : [],
      lightnovels: user.lightnovels ? user.lightnovels.map((lightnovel) => ({
        id: lightnovel.id,
        name: lightnovel.name,
        image: lightnovel.image as {
          key?: string,
          url: string,
        } | null,
        createdAt: lightnovel.created_at.toISOString(),
        user: {
          id: lightnovel.user.id
        },
        volumes: lightnovel.volumes ? lightnovel.volumes.map(volume => ({
          id: volume.id,
          name: volume.name,
          createdAt: volume.created_at.toISOString(),
          image: volume.image as {
            key?: string,
            url: string,
          } | null,
          chapters: volume.chapters ? volume.chapters.map(chap => ({
            id: chap.id,
            viewed: chap.viewed
          })) : []
        })) : []
      })) : [],
      favorites: user.favorites
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
      message: "Lỗi server vui lòng thử lại",
      data: null
    }
  }
}