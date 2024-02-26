import { NextRequest, NextResponse } from "next/server"

import { getCategoriesAndCountContent } from "@/drizzle/queries/category/getCategoriesAndCountContent"

export async function GET(
  req: NextRequest,
  res: NextResponse<{
    id: string;
    name: string;
    animes: number;
    mangas: number;
    lightnovels: number;
  }[] | null>
) {
  const slug = req.nextUrl.searchParams.get("slug")

  const result = await getCategoriesAndCountContent(slug ?? "")

  return new Response(JSON.stringify(result))
}