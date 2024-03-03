import { NextRequest } from "next/server"

import { findLatestAnimes } from "@/drizzle/queries/anime/findLatestAnimes";
import { findLatestMangas } from "@/drizzle/queries/manga/findLatestMangas";
import { findLatestLightnovels } from "@/drizzle/queries/lightnovel/findLatestLightnovels";

export async function GET(
  req: NextRequest,
) {
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

    return new Response(JSON.stringify({
      status: "success",
      data: news
    }))

  } catch (error) {
    console.log(error)

    return new Response(JSON.stringify({
      status: "error",
      data: null
    }))
  }
}