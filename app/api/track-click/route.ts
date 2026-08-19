import { NextRequest, NextResponse } from "next/server"

const BACKEND = process.env.API_URL ?? "https://api.smapey.com"

/**
 * Proxies a silo link click to the API.
 *
 * Separate endpoint from /api/track-visit because a click is not a visit -
 * folding them together would inflate every traffic figure the dashboard
 * reports, and the build spec asks for clicks toward the money page to be
 * counted apart from other calls to action.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const country =
      req.headers.get("x-vercel-ip-country") ||
      req.headers.get("cf-ipcountry") ||
      undefined

    await fetch(`${BACKEND}/api/seo-analytics/track-click`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...body, country }),
    })

    return NextResponse.json({ ok: true }, { status: 201 })
  } catch {
    // Never let analytics break a navigation
    return NextResponse.json({ ok: false }, { status: 200 })
  }
}
