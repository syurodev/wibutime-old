import { NextRequest } from "next/server"

import { animeDetail } from "@/drizzle/queries/anime/animeDetail"

export type RequestBody = {
  userId?: string;
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const id = params.id
  const body: RequestBody = await req.json()

  const existingAnime = await animeDetail(id, body.userId === "" ? undefined : body.userId ?? undefined)

  if (existingAnime) {
    return new Response(JSON.stringify({
      status: "success",
      data: existingAnime
    }))
  } else {
    return new Response(JSON.stringify({
      status: "error",
      data: null
    }))
  }
}