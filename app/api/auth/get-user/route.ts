import { getUserByUsername } from "@/drizzle/queries/user/getUserByUsername";

type RequestBody = {
  username: string,
}

export async function POST(req: Request) {
  const body: RequestBody = await req.json()

  const data = await getUserByUsername(body.username)

  return new Response(JSON.stringify(data))
}