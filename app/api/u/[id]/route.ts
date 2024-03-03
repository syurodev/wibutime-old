import { NextRequest } from "next/server"

import { getUserProfile } from "@/drizzle/queries/user/getUserProfile";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const id = params.id
  const user = await getUserProfile(id)

  if (user) {
    return new Response(JSON.stringify({
      status: "success",
      data: user
    }))
  } else {
    return new Response(JSON.stringify({
      status: "error",
      data: null
    }))
  }
}