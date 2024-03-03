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

    return {
      code: 200,
      message: "success",
      data: {
        anime: latestAnimes || [],
        manga: latestMangas || [],
        lightnovel: latestNovels || [],
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

export const getHeroNews = async (): Promise<{
  code: number,
  message: string,
  data: NewsData | null
}> => {
  try {
    const latestAnimesPromise = findLatestAnimes(3);
    const latestMangasPromise = findLatestMangas(3);
    const latestNovelsPromise = findLatestLightnovels(3);

    const [latestAnimes, latestMangas, latestNovels] = await Promise.all([
      latestAnimesPromise,
      latestMangasPromise,
      latestNovelsPromise
    ]);

    let news: NewsData = [];

    if (latestAnimes) {
      news = [...news, ...latestAnimes];
    }

    if (latestMangas) {
      news = [...news, ...latestMangas];
    }

    if (latestNovels) {
      news = [...news, ...latestNovels];
    }

    return {
      code: 200,
      message: "success",
      data: news
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

export const getHeroTrending = async (): Promise<{
  code: number,
  message: string,
  data: {
    animes: TrendingData[],
    mangas: TrendingData[],
    lightnovels: TrendingData[],
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

    const lightnovelTrending = await findlLightnovelTrending(8, startOfWeek, endOfWeek)

    const topAnime = await findlAnimeTrending(8, startOfWeek, endOfWeek)

    const topManga = await findlMangaTrending(8, startOfWeek, endOfWeek)

    const trending = {
      animes: topAnime ?? [],
      mangas: topManga ?? [],
      lightnovels: lightnovelTrending ?? [],
    }

    return {
      code: 200,
      message: "success",
      data: trending
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

    let news: NewsData = []

    const formatsToCheck = [latestAnimes, latestMangas, latestNovels];

    for (const format of formatsToCheck) {
      if (format) {
        news = [...news, ...format];
      }
    }

    const lightnovelTrending = await findlLightnovelTrending(8, startOfWeek, endOfWeek)

    const topAnime = await findlAnimeTrending(8, startOfWeek, endOfWeek)

    const topManga = await findlMangaTrending(8, startOfWeek, endOfWeek)

    const trending = {
      animes: topAnime ?? [],
      mangas: topManga ?? [],
      lightnovels: lightnovelTrending ?? [],
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