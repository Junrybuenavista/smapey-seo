import { NextRequest, NextResponse } from "next/server"

const BACKEND = process.env.API_URL ?? "https://api.smapey.com"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      undefined

    // Cloudflare sets CF-IPCountry on every request — free, no library needed
    const country = req.headers.get("cf-ipcountry") || undefined

    await fetch(`${BACKEND}/api/seo-analytics/track`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...body, ip, country }),
    })

    return NextResponse.json({ ok: true }, { status: 201 })
  } catch {
    return NextResponse.json({ ok: false }, { status: 200 })
  }
}
