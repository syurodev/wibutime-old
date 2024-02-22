"use server"

import { getUserProfile } from "@/drizzle/queries/user/getUserProfile"

export const getUserDetail = async (userId: string): Promise<{
  code: number,
  message: string,
  data: UserProfile | null
}> => {
  try {
    const user = await getUserProfile(userId)

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
      createdAt: user.createdAt ? user.createdAt.toISOString() : "",
      description: user.description,
      emailVerified: user.emailVerified,
      animes: user.animes ? user.animes.map(anime => ({
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
      mangas: user.mangas ? user.mangas.map(manga => ({
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
      lightnovels: user.lightnovels ? user.lightnovels.map((lightnovel) => ({
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
        animes: user.favoriteAnimes ?
          user.favoriteAnimes.map(anime => ({
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
        mangas: user.favoriteMangas ?
          user.favoriteMangas.map(manga => ({
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
        lightnovels: user.favoriteLightnovels ?
          user.favoriteLightnovels.map(lightnovel => ({
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

    return {
      code: 200,
      message: "success",
      data: result
    }
  } catch (error) {
    console.log(error)
    return {
      code: 500,
      message: "Lỗi server vui lòng thử lại",
      data: null
    }
  }
}