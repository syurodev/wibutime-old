import { searchContent } from "@/drizzle/queries/search/searchContent"

type RequestBody = {
  username: string,
}

export async function POST(req: Request) {
  const body: RequestBody = await req.json()

  const data = await searchContent(body.username)

  return new Response(JSON.stringify(data))
}