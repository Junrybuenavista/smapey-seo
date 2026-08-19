import Link from "next/link"
import JsonLd from "@/components/JsonLd"
import SiteNavbar from "@/components/SiteNavbar"
import SiloFooter from "@/components/silo/SiloFooter"
import { buildMetadata, SITE } from "@/lib/seo"
import { APEX, anchorFor } from "@/lib/silo"
import RoiCalculator from "./RoiCalculator"
import EmbedSnippet from "./EmbedSnippet"

const PATH = "/boarding-house/roi-calculator"
const PARENT = "/boarding-house/boarding-house-permits-and-roi"
const TITLE = "Boarding House ROI Calculator | Smapey"
const DESCRIPTION =
  "Work out what a boarding house actually earns - revenue at your real occupancy, the cost lines most projections miss, monthly net, and payback on your capital. Free, no sign-up."

const INK = "#161616"
const BLUE = "#2f6bff"
const CREAM = "#fbf7f0"
const MUTED = "#54514c"
const display = { fontFamily: "'Hanken Grotesk', system-ui, sans-serif" }

export const metadata = buildMetadata({ title: TITLE, description: DESCRIPTION, path: PATH })

export default function Page() {
  return (
    <>
      <JsonLd
        schema={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Boarding House ROI Calculator",
          description: DESCRIPTION,
          url: `${SITE}${PATH}`,
          applicationCategory: "FinanceApplication",
          operatingSystem: "Web",
          publisher: { "@id": `${SITE}/#organization` },
          offers: { "@type": "Offer", price: "0", priceCurrency: "PHP" },
        }}
      />

      <main style={display}>
        <SiteNavbar />

        <section className="py-14 px-6" style={{ background: CREAM }}>
          <div className="max-w-5xl mx-auto">
            <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: BLUE }}>
              Free tool
            </p>
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-[1.06] tracking-tight mb-5" style={{ color: INK }}>
              Boarding house ROI calculator
            </h1>
            <p className="text-lg max-w-2xl leading-relaxed" style={{ color: MUTED }}>
              Most projections for a boarding house are too optimistic in the same four places:
              they assume full occupancy, forget the utilities nobody is billed for,
              under-budget repairs, and leave out tax. This one asks for all of them - the same
              ground covered in{" "}
              <Link href={PARENT} className="font-bold underline" style={{ color: BLUE }}>
                boarding house permits and roi
              </Link>
              .
            </p>
            <p className="text-lg max-w-2xl leading-relaxed mt-3" style={{ color: MUTED }}>
              No sign-up, no email. Change any figure and the numbers update as you type.
            </p>
          </div>
        </section>

        <section className="py-12 px-6 bg-white">
          <div className="max-w-5xl mx-auto">
            <RoiCalculator />
          </div>
        </section>

        <section className="py-12 px-6" style={{ background: CREAM }}>
          <div className="max-w-3xl mx-auto space-y-5">
            <h2 className="text-2xl font-extrabold tracking-tight" style={{ color: INK }}>
              How to use it without fooling yourself
            </h2>
            <p className="text-base leading-relaxed" style={{ color: MUTED }}>
              Run it three times. Once pessimistically - lower occupancy, higher repairs. Once
              with what you realistically expect. Once optimistically. If the pessimistic run
              still covers the loan, the plan is robust. If only the optimistic run works, you
              are relying on nothing going wrong for several years, which is not a plan.
            </p>
            <p className="text-base leading-relaxed" style={{ color: MUTED }}>
              Occupancy is the figure to be hardest on. It is the strongest lever on the result
              and the one people are most confident about before they have let a single bed. A
              house that is genuinely full year-round is unusual; one that empties over the
              school break is ordinary.
            </p>
            <p className="text-base leading-relaxed" style={{ color: MUTED }}>
              For what goes into the capital figure and which permits you will need first, see{" "}
              <Link href={PARENT} className="font-bold underline" style={{ color: BLUE }}>
                boarding house permits and roi
              </Link>
              . Once the house is running, the same numbers are worth tracking as they actually
              happen rather than as you projected them - which is part of what a{" "}
              <Link href={APEX} className="font-bold underline" style={{ color: BLUE }}>
                {anchorFor(APEX, PATH)}
              </Link>{" "}
              is for.
            </p>
          </div>
        </section>

        <EmbedSnippet />
        <SiloFooter />
      </main>
    </>
  )
}
