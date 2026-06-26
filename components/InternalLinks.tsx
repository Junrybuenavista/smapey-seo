import Link from "next/link"
import { CLUSTERS, ClusterKey } from "../lib/routes"

type Props = {
  cluster?: ClusterKey
  heading?: string
  subheading?: string
  currentPath?: string
  limit?: number
}

// ── Layered Pop tokens (shared across all product pages) ──
const INK = "#161616"
const BLUE = "#2f6bff"
const AMBER = "#ff9e2c"
const CREAM = "#fbf7f0"
const display = { fontFamily: "'Hanken Grotesk', system-ui, sans-serif" }

export default function InternalLinks({
  cluster = "invoice",
  heading,
  subheading,
  currentPath,
  limit,
}: Props) {
  const data = CLUSTERS[cluster]
  const pool = data.pages.filter((p) => p.path !== currentPath)
  const selected = typeof limit === "number" ? pool.slice(0, limit) : pool

  const defaultHeading =
    cluster === "invoice"
      ? "Continue Exploring Invoicing Tools"
      : `More from ${data.label}`
  const defaultSub =
    cluster === "invoice"
      ? "Guides, tools, and software to help you invoice faster, track payments, and grow your business."
      : `Guides and tools to help you make the most of ${data.label}.`

  return (
    <section className="py-24" style={{ background: CREAM, fontFamily: display.fontFamily }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: BLUE }}>Keep Exploring</p>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight" style={{ color: INK }}>{heading ?? defaultHeading}</h2>
          <p className="mt-4 max-w-2xl mx-auto" style={{ color: "#54514c" }}>{subheading ?? defaultSub}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {selected.map((route, i) => {
            const c = i % 2 === 0 ? BLUE : AMBER
            return (
              <Link
                key={route.path}
                href={route.path}
                className="group rounded-[22px] p-6 border-2 bg-white transition-transform hover:-translate-y-1 flex flex-col"
                style={{ borderColor: INK, boxShadow: `6px 6px 0 ${c}` }}
              >
                <span className="inline-flex self-start items-center text-xs font-bold px-3 py-1 rounded-full border-2 mb-4" style={{ color: INK, borderColor: INK, background: c, ...(c === BLUE ? { color: "#fff" } : {}) }}>
                  {data.label}
                </span>

                <h3 className="font-extrabold text-lg mb-2" style={{ color: INK }}>
                  {route.title}
                </h3>

                <p className="text-sm leading-relaxed" style={{ color: "#54514c" }}>
                  {route.desc}
                </p>

                <div className="mt-5 flex items-center gap-1 text-sm font-bold group-hover:translate-x-1 transition-transform" style={{ color: c === AMBER ? INK : BLUE }}>
                  Read more →
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
