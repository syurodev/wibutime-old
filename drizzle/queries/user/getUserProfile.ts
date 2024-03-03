"use server"

import { eq } from "drizzle-orm"

import { db } from "@/drizzle/db"
import { users } from "@/drizzle/schema"

export const getUserProfile = async (userId: string) => {
  try {
    const existingUser = await db.query.users.findFirst({
      where: eq(users.id, userId),
      columns: {
        id: true,
        image: true,
        name: true,
        username: true,
        email: true,
        createdAt: true,
        emailVerified: true,
        phoneVerified: false,
        description: true,
      },
      with: {
        animes: {
          columns: {
            id: true,
            name: true,
            createdAt: true,
          },
          with: {
            user: {
              columns: {
                id: true
              }
            },
            seasons: {
              columns: {
                id: true,
                name: true,
                image: true,
              },
              with: {
                episode: {
                  columns: {
                    id: true,
                    viewed: true
                  }
                }
              }
            }
          }
        },
        mangas: {
          columns: {
            id: true,
            name: true,
            createdAt: true,
          },
          with: {
            user: {
              columns: {
                id: true
              }
            },
            seasons: {
              columns: {
                id: true,
                name: true,
                image: true,
              },
              with: {
                chapters: {
                  columns: {
                    id: true,
                    viewed: true
                  }
                }
              }
            }
          }
        },
        lightnovels: {
          columns: {
            id: true,
            name: true,
            createdAt: true,
            image: true,
          },
          with: {
            user: {
              columns: {
                id: true
              }
            },
            volumes: {
              columns: {
                id: true,
                name: true,
                image: true,
                createdAt: true,
              },
              with: {
                chapters: {
                  columns: {
                    id: true,
                    viewed: true,
                    words: true
                  }
                }
              }
            }
          }
        },
        favoriteAnimes: {
          with: {
            anime: {
              columns: {
                id: true,
                name: true,
              },
              with: {
                seasons: {
                  columns: {
                    id: true,
                    image: true,
                    name: true
                  }
                },
                user: {
                  columns: {
                    id: true,
                    name: true,
                    image: true,
                  }
                }
              }
            }
          }
        },
        favoriteMangas: {
          with: {
            manga: {
              columns: {
                id: true,
                name: true,
              },
              with: {
                seasons: {
                  columns: {
                    id: true,
                    image: true,
                    name: true
                  }
                },
                user: {
                  columns: {
                    id: true,
                    name: true,
                    image: true,
                  }
                }
              }
            }
          }
        },
        favoriteLightnovels: {
          with: {
            lightnovel: {
              columns: {
                id: true,
                name: true,
                image: true,
              },
              with: {
                user: {
                  columns: {
                    id: true,
                    name: true,
                    image: true,
                  }
                }
              }
            }
          }
        }
      }
    })

    if (!existingUser) return null

    const result: UserProfile = {
      id: existingUser.id,
      username: existingUser.username,
      name: existingUser.name,
      image: existingUser.image,
      email: existingUser.email,
      createdAt: existingUser.createdAt ? existingUser.createdAt.toISOString() : "",
      description: existingUser.description,
      emailVerified: existingUser.emailVerified,
      animes: existingUser.animes ? existingUser.animes.map(anime => ({
        id: anime.id,
        name: anime.name,
        image: anime.seasons.length > 0 ? anime.seasons[anime.seasons.length - 1].image as {
          key?: string,
          url: string,
        } : null,
        createdAt: anime.createdAt ? anime.createdAt.toISOString() : "",
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
          episodes: season.episode && season.episode.length > 0 ? season.episode.map(ep => ({
            id: ep.id,
            viewed: ep.viewed || 0,
          })) : []
        })) : []
      })) : [],
      mangas: existingUser.mangas ? existingUser.mangas.map(manga => ({
        id: manga.id,
        name: manga.name,
        // image: manga.image as {
        //   key?: string,
        //   url: string,
        // } | null,
        createdAt: manga.createdAt ? manga.createdAt.toISOString() : "",
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
            viewed: chap.viewed || 0
          })) : []
        })) : []
      })) : [],
      lightnovels: existingUser.lightnovels ? existingUser.lightnovels.map((lightnovel) => ({
        id: lightnovel.id,
        name: lightnovel.name,
        image: lightnovel.image as {
          key: string,
          url: string,
        } | null,
        createdAt: lightnovel.createdAt ? lightnovel.createdAt.toISOString() : "",
        user: {
          id: lightnovel.user.id
        },
        volumes: lightnovel.volumes ? lightnovel.volumes.map(volume => ({
          id: volume.id,
          name: volume.name,
          createdAt: volume.createdAt ? volume.createdAt.toISOString() : "",
          image: volume.image as {
            key?: string,
            url: string,
          } | null,
          chapters: volume.chapters ? volume.chapters.map(chap => ({
            id: chap.id,
            viewed: chap.viewed || 0,
            words: chap.words || 0
          })) : []
        })) : []
      })) : [],
      favorites: {
        animes: existingUser.favoriteAnimes ?
          existingUser.favoriteAnimes.map(anime => ({
            id: anime.anime.id,
            name: anime.anime.name,
            image: anime.anime.seasons[0].image as {
              key?: string,
              url: string,
            } | null,
            user: {
              id: anime.anime.user.id
            }
          }))
          : [],
        mangas: existingUser.favoriteMangas ?
          existingUser.favoriteMangas.map(manga => ({
            id: manga.manga.id,
            name: manga.manga.name,
            image: manga.manga.seasons[0].image as {
              key?: string,
              url: string,
            } | null,
            user: {
              id: manga.manga.user.id
            }
          }))
          : [],
        lightnovels: existingUser.favoriteLightnovels ?
          existingUser.favoriteLightnovels.map(lightnovel => ({
            id: lightnovel.lightnovel.id,
            name: lightnovel.lightnovel.name,
            image: lightnovel.lightnovel.image as {
              key?: string,
              url: string,
            } | null,
            user: {
              id: lightnovel.lightnovel.user.id
            }
          }))
          : [],
      }
    }

    return result
  } catch (error) {
    console.log(error)
    return null
  }
}