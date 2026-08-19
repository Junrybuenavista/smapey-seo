import Link from "next/link"
import SiteNavbar from "@/components/SiteNavbar"
import Footer from "@/components/Footer"
import SiloBreadcrumbs from "./SiloBreadcrumbs"
import SiloChildren from "./SiloChildren"
import SiloUpwardLinks from "./SiloUpwardLinks"
import SiloRelatedHubs from "./SiloRelatedHubs"
import SiloSiblings from "./SiloSiblings"
import { siloContextFor, anchorFor, APEX } from "@/lib/silo"
import { INK, BLUE, AMBER, CREAM, MUTED, display } from "./tokens"

export type GuideSection = {
  id: string
  h2: string
  body: string[]
  aside?: { title: string; lines: string[] }
}

/**
 * Shared layout for every editorial page in the silo - hubs, sub-topic pages,
 * and static leaves.
 *
 * The modules are the point: breadcrumbs, deeper guides, related hubs or
 * siblings, and the upward links all render from the graph, so a new page gets
 * a correct link structure by construction rather than by the author
 * remembering the rules.
 */
export default function SiloGuide({
  path,
  eyebrow,
  h1,
  intro,
  sections,
  product,
  disclaimer,
  childrenSubheading,
}: {
  path: string
  eyebrow: string
  h1: string
  intro: React.ReactNode[]
  sections: GuideSection[]
  /**
   * Intro paragraphs. Takes nodes rather than strings so the first one can
   * carry a contextual link - an internal link high on the page is read as
   * more editorial, and weighted more, than the same link near the footer.
   */
  product: { paragraphs: string[]; closing: string }
  /** Rendered above the product module, for pages carrying figures or legal content. */
  disclaimer?: string
  childrenSubheading?: string
}) {
  const ctx = siloContextFor(path)
  const isHub = ctx?.tier === 2

  return (
    <main style={display}>
      <SiteNavbar />
      <SiloBreadcrumbs ctx={ctx} />

      <section className="py-16 px-6" style={{ background: CREAM }}>
        <div className="max-w-3xl mx-auto">
          <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: BLUE }}>
            {eyebrow}
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-[1.06] tracking-tight mb-6" style={{ color: INK }}>
            {h1}
          </h1>
          <div className="space-y-4 text-lg leading-relaxed" style={{ color: MUTED }}>
            {intro.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>
      </section>

      <article className="py-16 px-6 bg-white">
        <div className="max-w-3xl mx-auto space-y-14">
          {sections.map((section) => (
            <section key={section.id} id={section.id}>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-5" style={{ color: INK }}>
                {section.h2}
              </h2>
              <div className="space-y-4 text-base leading-relaxed" style={{ color: MUTED }}>
                {section.body.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
              {section.aside && (
                <div className="mt-6 rounded-[22px] border-2 p-6" style={{ borderColor: INK, background: CREAM, boxShadow: `6px 6px 0 ${AMBER}` }}>
                  <p className="text-sm font-extrabold mb-3" style={{ color: INK }}>{section.aside.title}</p>
                  <ul className="space-y-2">
                    {section.aside.lines.map((line) => (
                      <li key={line} className="text-sm leading-relaxed flex gap-2" style={{ color: MUTED }}>
                        <span aria-hidden style={{ color: BLUE }}>—</span>
                        {line}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          ))}

          {disclaimer && (
            <section className="rounded-[22px] border-2 p-6" style={{ borderColor: INK, background: "#fff" }}>
              <p className="text-sm leading-relaxed" style={{ color: MUTED }}>{disclaimer}</p>
            </section>
          )}

          <section id="how-smapey-handles-this" className="rounded-[26px] border-2 p-8" style={{ borderColor: INK, background: CREAM, boxShadow: `8px 8px 0 ${BLUE}` }}>
            <h2 className="text-2xl font-extrabold tracking-tight mb-4" style={{ color: INK }}>
              How Smapey handles this
            </h2>
            <div className="space-y-4 text-base leading-relaxed" style={{ color: MUTED }}>
              {product.paragraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
              <p>
                {product.closing}{" "}
                <Link href={APEX} className="font-bold underline" style={{ color: BLUE }}>
                  {anchorFor(APEX, path)}
                </Link>
                .
              </p>
            </div>
          </section>
        </div>
      </article>

      <SiloChildren path={path} subheading={childrenSubheading} />

      {/* Hubs are the designated cross-branch routers; everything else keeps
          its lateral links inside its own branch. */}
      {isHub ? <SiloRelatedHubs path={path} /> : <SiloSiblings ctx={ctx} />}

      <SiloUpwardLinks ctx={ctx} />
      <Footer />
    </main>
  )
}
