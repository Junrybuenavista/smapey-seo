import Link from "next/link"
import { siblingsFor, anchorFor, type SiloContext } from "@/lib/silo"
import { INK, BLUE, AMBER, MUTED, display } from "./tokens"

/**
 * "Related in this series" - same branch, same tier, never across branches.
 *
 * Cross-branch lateral links flatten the pyramid, so the pool is derived from
 * the graph instead of being chosen per post.
 */
export default function SiloSiblings({
  ctx,
  heading = "Related in this series",
  // The spec allows 1-2 lateral links per post; more dilutes each one, and
  // scripts/check-silo.mjs warns past two.
  limit = 2,
}: {
  ctx: SiloContext | null
  heading?: string
  limit?: number
}) {
  if (!ctx) return null
  const siblings = siblingsFor(ctx).slice(0, limit)
  if (siblings.length === 0) return null

  return (
    <section className="py-16 bg-white" style={display}>
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-8" style={{ color: INK }}>
          {heading}
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {siblings.map((node, i) => {
            const c = i % 2 === 0 ? BLUE : AMBER
            return (
              <Link
                key={node.path}
                href={node.path}
                data-silo-lateral={node.branch ?? ""}
                className="group rounded-[22px] p-6 border-2 bg-white transition-transform hover:-translate-y-1 flex flex-col"
                style={{ borderColor: INK, boxShadow: `6px 6px 0 ${c}` }}
              >
                <h3 className="font-extrabold text-lg mb-2" style={{ color: INK }}>
                  {anchorFor(node.path, ctx.path)}
                </h3>
                <p className="text-sm leading-relaxed flex-1" style={{ color: MUTED }}>
                  {node.title}
                </p>
                <span
                  className="mt-5 inline-flex items-center gap-1 text-sm font-bold group-hover:translate-x-1 transition-transform"
                  style={{ color: c === AMBER ? INK : BLUE }}
                >
                  Read more →
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
