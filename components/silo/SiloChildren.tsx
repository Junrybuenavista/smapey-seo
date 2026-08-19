import Link from "next/link"
import { builtChildrenOf, anchorFor } from "@/lib/silo"
import { INK, BLUE, AMBER, CREAM, MUTED, display } from "./tokens"

/**
 * The "deeper guides" module on a hub or sub-topic page.
 *
 * Lists only children that actually exist. The silo ships in phases, so a hub
 * is live long before its posts are written - pointing at them early would
 * publish links into 404s, which is the one thing the build spec is explicit
 * about not doing. The module simply disappears until there is something to
 * link to.
 */
export default function SiloChildren({
  path,
  heading = "Deeper guides",
  subheading,
}: {
  path: string
  heading?: string
  subheading?: string
}) {
  const children = builtChildrenOf(path)
  if (children.length === 0) return null

  return (
    <section className="py-20" style={{ background: CREAM, ...display }}>
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-10">
          <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: BLUE }}>
            Go deeper
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight" style={{ color: INK }}>
            {heading}
          </h2>
          {subheading && (
            <p className="mt-3 max-w-2xl leading-relaxed" style={{ color: MUTED }}>
              {subheading}
            </p>
          )}
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {children.map((child, i) => {
            const c = i % 2 === 0 ? BLUE : AMBER
            return (
              <Link
                key={child.path}
                href={child.path}
                data-silo-child={String(child.tier)}
                className="group rounded-[22px] p-6 border-2 bg-white transition-transform hover:-translate-y-1 flex flex-col"
                style={{ borderColor: INK, boxShadow: `6px 6px 0 ${c}` }}
              >
                <h3 className="font-extrabold text-lg mb-2" style={{ color: INK }}>
                  {anchorFor(child.path, path)}
                </h3>
                <p className="text-sm leading-relaxed flex-1" style={{ color: MUTED }}>
                  {child.h1}
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
