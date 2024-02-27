import { NextRequest } from "next/server"

import { searchContentWithCategory } from "@/drizzle/queries/search/searchContentWithCategory";


export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id
  const result = await searchContentWithCategory(id ?? "")

  return new Response(JSON.stringify(result))
}