import Link from "next/link"
import { CLUSTERS, ClusterKey } from "../lib/routes"

type Props = {
  cluster?: ClusterKey
  heading?: string
  subheading?: string
  currentPath?: string
  /**
   * How many sibling links to render. Defaults to 6 - see DEFAULT_LIMIT.
   * Pass a larger number to deliberately show more.
   */
  limit?: number
}

/**
 * Cap the block at six siblings unless a page says otherwise.
 *
 * This used to be unlimited, which rendered every page in the cluster with its
 * full description. That is harmless in a cluster of five to seven pages - the
 * block is four to six links either way - and it quietly becomes a problem as a
 * cluster grows. The invoice cluster reached 32 pages and its articles ended up
 * roughly three parts navigation to one part content, enough alike in aggregate
 * that Google folded them together; /invoice/sales-invoice-sample-philippines,
 * the cluster's biggest term, dropped out of the index over it.
 *
 * That was fixed twice by hand and missed the four highest-value pages the first
 * time, which is the argument for a default: a per-page prop gets forgotten on
 * exactly the pages that matter most. Six is the value the hub, the pricing page
 * and the pages fixed in 1f49e05 and 649b760 already pass explicitly.
 */
const DEFAULT_LIMIT = 6

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
  limit = DEFAULT_LIMIT,
}: Props) {
  const data = CLUSTERS[cluster]
  const pool = data.pages.filter((p) => p.path !== currentPath)
  const selected = pool.slice(0, limit)

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
