import { NextRequest } from "next/server"

import { findlLightnovelTrending } from "@/drizzle/queries/lightnovel/findlLightnovelTrending";
import { findlAnimeTrending } from "@/drizzle/queries/anime/findlAnimeTrending";
import { findlMangaTrending } from "@/drizzle/queries/manga/findlMangaTrending";

export async function GET(
  req: NextRequest,
) {
  try {
    // const currentDate = new Date();

    // const startOfDay = new Date(currentDate);
    // startOfDay.setHours(0, 0, 0, 0);

    // const startOfWeek = new Date(currentDate);
    // startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

    // Lấy ngày cuối cùng của tuần
    // const endOfWeek = new Date(currentDate);
    // endOfWeek.setDate(currentDate.getDate() + (6 - currentDate.getDay()));

    const lightnovelTrendingPromise = findlLightnovelTrending(8);
    const topAnimePromise = findlAnimeTrending(8);
    const topMangaPromise = findlMangaTrending(8);

    const [lightnovelTrending, topAnime, topManga] = await Promise.all([
      lightnovelTrendingPromise,
      topAnimePromise,
      topMangaPromise
    ]);

    const trending = {
      animes: topAnime ?? [],
      mangas: topManga ?? [],
      lightnovels: lightnovelTrending ?? [],
    };

    return new Response(JSON.stringify({
      status: "success",
      data: trending
    }))

  } catch (error) {
    console.log(error)

    return new Response(JSON.stringify({
      status: "error",
      data: null
    }))
  }
}