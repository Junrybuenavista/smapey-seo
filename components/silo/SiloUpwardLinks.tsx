import Link from "next/link"
import { upwardFor, anchorFor, type SiloContext } from "@/lib/silo"
import { INK, BLUE, AMBER, CREAM, MUTED, display } from "./tokens"

/**
 * The upward-link module: parent page, then the money page.
 *
 * This is the mechanism of the whole reverse silo, so it renders from the graph
 * rather than being hand-placed - a writer cannot forget it, point it at the
 * wrong parent, or reuse the same anchor text on every page.
 */
export default function SiloUpwardLinks({ ctx }: { ctx: SiloContext | null }) {
  const { parent, apex } = upwardFor(ctx ?? { path: "", title: "", tier: 1, branch: null, parent: null })
  const targets = [parent, apex].filter(Boolean)
  if (targets.length === 0) return null

  return (
    <section className="py-16" style={{ background: CREAM, ...display }}>
      <div className="max-w-4xl mx-auto px-6">
        <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: BLUE }}>
          Keep reading
        </p>

        <div className="grid sm:grid-cols-2 gap-5">
          {targets.map((node, i) => {
            const c = i === targets.length - 1 ? AMBER : BLUE
            return (
              <Link
                key={node!.path}
                href={node!.path}
                data-silo-upward={node!.tier === 1 ? "apex" : "parent"}
                className="group rounded-[22px] p-6 border-2 bg-white transition-transform hover:-translate-y-1"
                style={{ borderColor: INK, boxShadow: `6px 6px 0 ${c}` }}
              >
                <h3 className="font-extrabold text-lg mb-2" style={{ color: INK }}>
                  {anchorFor(node!.path, ctx!.path)}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: MUTED }}>
                  {node!.h1}
                </p>
                <span
                  className="mt-4 inline-flex items-center gap-1 text-sm font-bold group-hover:translate-x-1 transition-transform"
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
