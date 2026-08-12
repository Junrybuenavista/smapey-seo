import { ImageResponse } from "next/og"

/**
 * Stable social card at https://smapey.com/og
 *
 * Deliberately a route handler rather than the `opengraph-image` file
 * convention: Next 14 does not backfill the convention's image onto pages
 * that export their own `openGraph` block, which is all of them. A fixed
 * URL also survives rebuilds, so scrapers keep their cached copy valid.
 */
export const runtime = "edge"

const INK = "#161616"
const AMBER = "#ff9e2c"
const BLUE = "#5b8bff"

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: INK,
          padding: "80px",
        }}
      >
        <div
          style={{
            display: "flex",
            color: AMBER,
            fontSize: 30,
            fontWeight: 700,
          }}
        >
          smapey.com
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            marginTop: "28px",
            color: "#ffffff",
            fontSize: 76,
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
          }}
        >
          Simple management software for small businesses
        </div>

        <div
          style={{
            display: "flex",
            marginTop: "32px",
            color: "rgba(255,255,255,0.72)",
            fontSize: 32,
          }}
        >
          Invoicing · Gyms · Salons · Rentals · Clinics · and more
        </div>

        <div style={{ display: "flex", marginTop: "48px", gap: "14px" }}>
          <div style={{ display: "flex", width: "120px", height: "10px", background: AMBER, borderRadius: "6px" }} />
          <div style={{ display: "flex", width: "60px", height: "10px", background: BLUE, borderRadius: "6px" }} />
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: {
        "Cache-Control": "public, immutable, no-transform, max-age=31536000",
      },
    }
  )
}
