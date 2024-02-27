import { findLightnovelComments } from "@/drizzle/queries/lightnovel/findComments"
import { NextRequest } from "next/server"

export async function GET(
  req: NextRequest,
) {
  try {
    const id = req.nextUrl.searchParams.get("id")!
    const type: CommentType = req.nextUrl.searchParams.get("type") as CommentType

    if (!id) return new Response(JSON.stringify({ error: "Không có id" }))

    if (type === "lightnovel chapter") {
      const res = await findLightnovelComments(10, 1, id)

      return new Response(JSON.stringify(res))
    }
    return new Response(JSON.stringify({ error: "Không tìm thấy type" }))
  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify({ error: "Lỗi server" }))
  }
}