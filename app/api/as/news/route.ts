import { NextRequest } from "next/server"
import { isDynamicServerError } from "next/dist/client/components/hooks-server-context";

import { findLatestAnimes } from "@/drizzle/queries/anime/findLatestAnimes";

export async function GET(
  req: NextRequest,
) {
  const limit: number = Number(req.nextUrl.searchParams.get("limit") ?? 3)

  const page: number = Number(req.nextUrl.searchParams.get("page") ?? 0)

  try {
    const latestAnimesPromise = await findLatestAnimes(limit, page);

    if (!latestAnimesPromise) return new Response(JSON.stringify({
      status: "error",
      data: null
    }))

    return new Response(JSON.stringify({
      status: "success",
      data: latestAnimesPromise
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