import { NextRequest } from "next/server"

import { lightnovelDetail } from "@/drizzle/queries/lightnovel/lightnovelDetail";

export type RequestBody = {
  userId?: string;
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const id = params.id
  const body: RequestBody = await req.json()

  const existingLightnovel = await lightnovelDetail(id, body.userId === "" ? undefined : body.userId ?? undefined)

  if (existingLightnovel) {
    return new Response(JSON.stringify({
      status: "success",
      data: existingLightnovel
    }))
  } else {
    return new Response(JSON.stringify({
      status: "error",
      data: null
    }))
  }
}