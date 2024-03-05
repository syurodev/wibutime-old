import { NextRequest } from "next/server"

import { seasonDetail } from "@/drizzle/queries/anime/seasonDetail";


export async function GET(
  req: NextRequest,
  { params }: { params: { seasonId: string } }
) {
  try {
    const id = params.seasonId
    const existingSeason = await seasonDetail(id)

    if (!existingSeason) {
      return new Response(JSON.stringify({
        status: "error",
        data: null
      }))
    }

    return new Response(JSON.stringify({
      status: "success",
      data: existingSeason
    }))
  } catch (error) {
    return new Response(JSON.stringify({
      status: "error",
      data: null
    }))
  }
}