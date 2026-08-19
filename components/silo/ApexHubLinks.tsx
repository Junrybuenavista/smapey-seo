import Link from "next/link"
import { hubs, anchorFor, APEX } from "@/lib/silo"
import { INK, BLUE, AMBER, CREAM, MUTED, display } from "./tokens"

/**
 * The money page's only internal link module.
 *
 * The apex links to the three hubs and nothing else - never to an individual
 * blog post, which would leak the equity the ten posts spent months building.
 * Use this in place of <InternalLinks/>, which cards out to the entire cluster.
 */
export default function ApexHubLinks() {
  const branches = hubs()

  return (
    <section className="py-24" style={{ background: CREAM, ...display }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: BLUE }}>
            Go deeper
          </p>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight" style={{ color: INK }}>
            Guides for running a boarding house
          </h2>
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          {branches.map((hub, i) => {
            const c = i % 2 === 0 ? BLUE : AMBER
            return (
              <Link
                key={hub.path}
                href={hub.path}
                data-silo-hub={hub.branch ?? ""}
                className="group rounded-[22px] p-6 border-2 bg-white transition-transform hover:-translate-y-1 flex flex-col"
                style={{ borderColor: INK, boxShadow: `6px 6px 0 ${c}` }}
              >
                <h3 className="font-extrabold text-lg mb-2" style={{ color: INK }}>
                  {anchorFor(hub.path, APEX)}
                </h3>
                <p className="text-sm leading-relaxed flex-1" style={{ color: MUTED }}>
                  {hub.covers ?? hub.h1}
                </p>
                <span
                  className="mt-5 inline-flex items-center gap-1 text-sm font-bold group-hover:translate-x-1 transition-transform"
                  style={{ color: c === AMBER ? INK : BLUE }}
                >
                  Read the guide →
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
