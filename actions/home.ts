"use server"

import { findLatestAnimes } from "@/drizzle/queries/anime/findLatestAnimes";
import { findLatestLightnovels } from "@/drizzle/queries/lightnovel/findLatestLightnovels";
import { findLatestMangas } from "@/drizzle/queries/manga/findLatestMangas";
import { formatNumber } from "@/lib/formatNumber";
import { findlLightnovelTrending } from "@/drizzle/queries/lightnovel/findlLightnovelTrending";
import { findlAnimeTrending } from "@/drizzle/queries/anime/findlAnimeTrending";
import { findlMangaTrending } from "@/drizzle/queries/manga/findlMangaTrending";

export const getNews = async (limit: number = 12): Promise<{
  code: number,
  message: string,
  data: {
    anime: AnimeNew[],
    manga: MangaNew[],
    lightnovel: LightnovelNew[]
  } | null
}> => {
  try {
    const latestAnimes = await findLatestAnimes(limit)

    const latestMangas = await findLatestMangas(limit)

    const latestNovels = await findLatestLightnovels(limit)

    const fotmatAnimes: AnimeNew[] | null = latestAnimes.length === 0 ? null : latestAnimes.map((anime) => ({
      id: anime.id,
      name: anime.name,
      summary: anime.summary,
      type: "anime" as ContentType,
      user: {
        id: anime.user.id
      },
      categories: anime.categories.map((cate) => cate.category),
      image: !anime.seasons || anime.seasons.length === 0 ? null : anime.seasons[0].image as {
        key?: string,
        url: string
      } | null,
      seasons: !anime.seasons || anime.seasons.length === 0 ? null : {
        id: anime.seasons[0].id,
        name: anime.seasons[0].name,
        end: anime.seasons[0].numberOfEpisodes || 0,
        episodes: anime.seasons[0].episode.length === 0 ? null : anime.seasons[0].episode.map(item => ({
          id: item.id,
          index: item.index || ""
        })),
      },
      favorites: formatNumber(anime.favorite.length)
    }))

    const formatMangas: MangaNew[] | null = latestMangas.length === 0 ? null : latestMangas.map((manga) => ({
      id: manga.id,
      name: manga.name,
      summary: manga.summary,
      user: {
        id: manga.user.id
      },
      type: "manga" as ContentType,
      categories: manga.categories.map((cate) => cate.category),
      image: manga.seasons[0].image as {
        key?: string,
        url: string
      } | null,
      seasons: manga.seasons.length === 0 ? null : {
        id: manga.seasons[0].id,
        name: manga.seasons[0].name,
        chapters: manga.seasons[0].chapters.length === 0 ? null : manga.seasons[0].chapters.map((item) => ({
          id: item.id,
          index: item.index || ""
        })),
      },
      favorites: formatNumber(manga.favorite.length)
    }))

    const formatLightnovels: LightnovelNew[] | null = latestNovels.length === 0 ? null : latestNovels.map((novel) => ({
      id: novel.id,
      name: novel.name,
      summary: novel.summary,
      user: {
        id: novel.user.id
      },
      categories: novel.categories.map((cate) => cate.category),
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
          words: formatNumber(novel.volumes[0].chapters[0].words || 0),
        }
      },
      favorites: formatNumber(novel.favorite.length)
    }))

    return {
      code: 200,
      message: "success",
      data: {
        anime: fotmatAnimes || [],
        manga: formatMangas || [],
        lightnovel: formatLightnovels || [],
      }
    }

  } catch (error) {
    console.log(error)
    return {
      code: 500,
      message: "Lỗi server",
      data: null
    }
  }
}

export const getHero = async (): Promise<{
  code: number,
  message: string,
  data: {
    news: NewsData,
    trending: {
      animes: TrendingData[],
      mangas: TrendingData[],
      lightnovels: TrendingData[],
    }
  } | null
}> => {
  try {
    const currentDate = new Date();

    // const startOfDay = new Date(currentDate);
    // startOfDay.setHours(0, 0, 0, 0);

    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

    // Lấy ngày cuối cùng của tuần
    const endOfWeek = new Date(currentDate);
    endOfWeek.setDate(currentDate.getDate() + (6 - currentDate.getDay()));


    const latestAnimes = await findLatestAnimes(3)

    const latestMangas = await findLatestMangas(3)

    const latestNovels = await findLatestLightnovels(3)

    const fotmatAnimes: AnimeNew[] | null = latestAnimes.length === 0 ? null : latestAnimes.map((anime) => ({
      id: anime.id,
      name: anime.name,
      summary: anime.summary,
      user: {
        id: anime.user.id
      },
      type: "anime" as ContentType,
      categories: anime.categories.map((cate) => cate.category),
      image: anime.seasons && anime.seasons.length > 0 ? anime.seasons[0].image as {
        key?: string,
        url: string
      } | null : null,
      seasons: !anime.seasons || anime.seasons.length === 0 ? null : {
        id: anime.seasons[0].id,
        name: anime.seasons[0].name,
        end: anime.seasons[0].numberOfEpisodes || 0,
        episodes: anime.seasons[0].episode.length === 0 ? null : anime.seasons[0].episode.map(item => ({
          id: item.id,
          index: item.index || ""
        })),
      },
      favorites: formatNumber(anime.favorite.length)
    }))

    const formatMangas: MangaNew[] | null = latestMangas.length === 0 ? null : latestMangas.map((manga) => ({
      id: manga.id,
      name: manga.name,
      summary: manga.summary,
      user: {
        id: manga.user.id
      },
      type: "manga" as ContentType,
      categories: manga.categories.map((cate) => cate.category),
      image: manga.seasons[0].image as {
        key?: string,
        url: string
      } | null,
      seasons: manga.seasons.length === 0 ? null : {
        id: manga.seasons[0].id,
        name: manga.seasons[0].name,
        chapters: manga.seasons[0].chapters.length === 0 ? null : manga.seasons[0].chapters.map((item) => ({
          id: item.id,
          index: item.index || ""
        })),
      },
      favorites: formatNumber(manga.favorite.length)
    }))

    const formatLightnovels: LightnovelNew[] | null = latestNovels.length === 0 ? null : latestNovels.map((novel) => ({
      id: novel.id,
      name: novel.name,
      summary: novel.summary,
      user: {
        id: novel.user.id
      },
      categories: novel.categories.map((cate) => cate.category),
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
          words: formatNumber(novel.volumes[0].chapters[0].words || 0),
        }
      },
      favorites: formatNumber(novel.favorite.length)
    }))

    let news: NewsData = []

    const formatsToCheck = [fotmatAnimes, formatMangas, formatLightnovels];

    for (const format of formatsToCheck) {
      if (format) {
        news = [...news, ...format];
      }
    }

    const lightnovelTrending = await findlLightnovelTrending(8, startOfWeek, endOfWeek)

    const topAnime = await findlAnimeTrending(8, startOfWeek, endOfWeek)

    const topManga = await findlMangaTrending(8, startOfWeek, endOfWeek)

    const lightnovelTrendingResult: TrendingData[] = lightnovelTrending && lightnovelTrending.length > 0 ?
      lightnovelTrending.map((item) => ({
        id: item.id,
        image: item.image ? JSON.parse(item.image) : null,
        name: item.name,
        numfavorites: formatNumber(Number(item.numfavorites)),
        totalviews: formatNumber(Number(item.totalviews))
      }))
      : []

    const animeTrendingResult: TrendingData[] = topAnime && topAnime.length > 0 ?
      topAnime.map((item) => ({
        id: item.id,
        image: item.image ? JSON.parse(item.image) : null,
        name: item.name,
        numfavorites: formatNumber(Number(item.numfavorites)),
        totalviews: formatNumber(Number(item.totalviews))
      }))
      : []

    const mangaTrendingResult: TrendingData[] = topManga && topManga.length > 0 ?
      topManga.map((item) => ({
        id: item.id,
        image: item.image ? JSON.parse(item.image) : null,
        name: item.name,
        numfavorites: formatNumber(Number(item.numfavorites)),
        totalviews: formatNumber(Number(item.totalviews))
      }))
      : []

    const trending = {
      animes: animeTrendingResult,
      mangas: mangaTrendingResult,
      lightnovels: lightnovelTrendingResult,
    }

    return {
      code: 200,
      message: "success",
      data: {
        news,
        trending
      }
    }

  } catch (error) {

    console.log(error)
    return {
      code: 500,
      message: "Lỗi server",
      data: null
    }
  }
}