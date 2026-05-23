import { NextRequest, NextResponse } from "next/server"
import { revalidateTag } from "next/cache"

export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-revalidate-secret")

  if (!secret || secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  revalidateTag("blog-posts")

  return NextResponse.json({ revalidated: true, at: new Date().toISOString() })
}
