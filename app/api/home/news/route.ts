import { NextRequest } from "next/server"
import { isDynamicServerError } from "next/dist/client/components/hooks-server-context";

import { findLatestAnimes } from "@/drizzle/queries/anime/findLatestAnimes";
import { findLatestMangas } from "@/drizzle/queries/manga/findLatestMangas";
import { findLatestLightnovels } from "@/drizzle/queries/lightnovel/findLatestLightnovels";

export async function GET(
  req: NextRequest,
) {
  const limit: number = Number(req.nextUrl.searchParams.get("limit") ?? 3)

  try {
    const latestAnimesPromise = findLatestAnimes(limit);
    const latestMangasPromise = findLatestMangas(limit);
    const latestNovelsPromise = findLatestLightnovels(limit);

    const [latestAnimes, latestMangas, latestNovels] = await Promise.all([
      latestAnimesPromise,
      latestMangasPromise,
      latestNovelsPromise
    ]);

    const news = {
      animes: latestAnimes ?? [],
      mangas: latestMangas ?? [],
      lightnovels: latestNovels ?? [],
    };

    return new Response(JSON.stringify({
      status: "success",
      data: news
    }))

  } catch (error) {
    console.log(error)

    if (isDynamicServerError(error)) {
      throw error;
    }

    return new Response(JSON.stringify({
      status: "error",
      data: null
    }))
  }
}