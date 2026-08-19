import Link from "next/link"
import { builtHubs, anchorFor } from "@/lib/silo"
import { INK, BLUE, MUTED, display } from "./tokens"

/**
 * "Related hubs" - the other two branches.
 *
 * Hubs are the only pages allowed to link across branches. A post that needs to
 * reach another branch routes up through its hub instead, which keeps the
 * pyramid from flattening into an undifferentiated blob of cross-links.
 */
export default function SiloRelatedHubs({ path }: { path: string }) {
  const others = builtHubs().filter((h) => h.path !== path)
  if (others.length === 0) return null

  return (
    <section className="py-16 bg-white" style={display}>
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-2xl font-extrabold tracking-tight mb-6" style={{ color: INK }}>
          Related guides
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {others.map((hub) => (
            <Link
              key={hub.path}
              href={hub.path}
              data-silo-hub={hub.branch ?? ""}
              className="group rounded-[18px] p-5 border-2 bg-white transition-transform hover:-translate-y-0.5"
              style={{ borderColor: INK }}
            >
              <h3 className="font-extrabold text-base mb-1" style={{ color: INK }}>
                {anchorFor(hub.path, path)}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: MUTED }}>
                {hub.h1}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
