import Link from "next/link"
import JsonLd from "@/components/JsonLd"
import SiteNavbar from "@/components/SiteNavbar"
import Footer from "@/components/Footer"
import InternalLinks from "@/components/InternalLinks"
import { buildMetadata, breadcrumbSchema, faqSchema, SITE, type Faq } from "@/lib/seo"
import FoodCostPercentage from "./FoodCostPercentage"

const PATH = "/restaurant/food-cost-percentage-calculator"
const TITLE = "Food Cost Percentage Calculator - Free | Smapey"
const DESCRIPTION =
  "Free food cost percentage calculator. Enter cost per portion and menu price to get your food cost percentage, gross profit, and margin - with the healthy band for each. No sign-up."

const INK = "#161616"
const BLUE = "#2f6bff"
const CREAM = "#fbf7f0"
const MUTED = "#54514c"
const display = { fontFamily: "'Hanken Grotesk', system-ui, sans-serif" }

export const metadata = buildMetadata({ title: TITLE, description: DESCRIPTION, path: PATH })

const FAQS: Faq[] = [
  {
    q: "What is the food cost percentage formula?",
    a: "Food cost percentage = (cost per portion ÷ menu price) × 100. A plate that costs 54 in ingredients and sells for 180 runs at 54 ÷ 180 × 100 = 30%. The same formula works across a whole period if you use total ingredient cost and total food sales instead of a single dish.",
  },
  {
    q: "What is a good food cost percentage?",
    a: "Most full-service kitchens target 28-35%. Quick service often runs lower because portions are tightly controlled, and steak or seafood restaurants routinely run above 40% because the protein dominates the plate. The band matters less than whether the gross profit left over covers your labour and rent.",
  },
  {
    q: "How do I calculate food cost percentage for the whole restaurant?",
    a: "Take beginning inventory, add purchases, subtract ending inventory - that is the food actually used in the period. Divide it by food sales for the same period and multiply by 100. Doing it per dish tells you which items to fix; doing it per period tells you whether waste and theft are eating the difference.",
  },
  {
    q: "Why is my actual food cost higher than the calculated one?",
    a: "Because the calculation assumes every gram you buy reaches a paying customer. Waste, over-portioning, staff meals, comps, and spoilage all sit in the gap between theoretical and actual food cost. A gap of a point or two is normal; five or more usually means portioning is not controlled.",
  },
  {
    q: "Does food cost percentage include labour?",
    a: "No. Food cost is ingredients only. Adding labour gives you prime cost, a separate figure most operators keep under 60-65% of sales. Mixing the two makes a healthy kitchen look broken.",
  },
]

export default function Page() {
  return (
    <>
      <JsonLd
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Food Cost Percentage Calculator",
            description: DESCRIPTION,
            url: `${SITE}${PATH}`,
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web",
            publisher: { "@id": `${SITE}/#organization` },
            offers: { "@type": "Offer", price: "0", priceCurrency: "PHP" },
          },
          breadcrumbSchema(PATH),
          faqSchema(FAQS),
        ]}
      />

      <main style={display}>
        <SiteNavbar />

        <section className="py-14 px-6" style={{ background: CREAM }}>
          <div className="max-w-5xl mx-auto">
            <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: BLUE }}>
              Free tool
            </p>
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-[1.06] tracking-tight mb-5" style={{ color: INK }}>
              Food cost percentage calculator
            </h1>
            <p className="text-lg max-w-2xl leading-relaxed" style={{ color: MUTED }}>
              Enter what a portion costs you and what you sell it for. This gives you the food cost percentage, the
              gross profit left on the plate, and whether the figure sits where a kitchen like yours would want it.
            </p>
          </div>
        </section>

        <section className="py-12 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <FoodCostPercentage />
          </div>
        </section>

        <section className="py-12 px-6" style={{ background: CREAM }}>
          <div className="max-w-3xl mx-auto space-y-5">
            <h2 className="text-2xl font-extrabold tracking-tight" style={{ color: INK }}>
              The formula, and the part it hides
            </h2>
            <p className="text-base leading-relaxed" style={{ color: MUTED }}>
              Food cost percentage is cost per portion divided by menu price, times a hundred. That is the whole of
              it. The difficulty is never the division - it is trusting the number you divide.
            </p>
            <p className="text-base leading-relaxed" style={{ color: MUTED }}>
              A cost per portion is only honest if it includes every ingredient at the price you actually paid,
              converted from the unit you buy in to the unit you cook in, with trim waste accounted for. Miss the
              oil and the aromatics because they feel too small to bother with, and a dish that really runs at 34%
              will report 29% - and you will price it as though there is room that is not there. If you have not
              built that figure yet,{" "}
              <Link href="/restaurant/food-cost-calculator" className="font-bold underline" style={{ color: BLUE }}>
                the food cost calculator
              </Link>{" "}
              does it ingredient by ingredient.
            </p>
            <p className="text-base leading-relaxed" style={{ color: MUTED }}>
              The second thing the percentage hides is volume. Two dishes at 30% are not equally important if one
              sells forty times a week and the other twice. Fix the percentage on your best sellers first - that is
              where a single point is worth real money.
            </p>
            <p className="text-base leading-relaxed" style={{ color: MUTED }}>
              And once you know the percentage you want rather than the one you have, the calculation runs the other
              way:{" "}
              <Link href="/restaurant/menu-price-calculator" className="font-bold underline" style={{ color: BLUE }}>
                work the price back from a target percentage
              </Link>{" "}
              instead of testing prices one at a time.
            </p>
          </div>
        </section>

        <section className="py-12 px-6 bg-white">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-extrabold tracking-tight mb-7" style={{ color: INK }}>
              Common questions
            </h2>
            <div className="space-y-6">
              {FAQS.map((f) => (
                <div key={f.q}>
                  <h3 className="text-base font-extrabold mb-1.5" style={{ color: INK }}>
                    {f.q}
                  </h3>
                  <p className="text-base leading-relaxed" style={{ color: MUTED }}>
                    {f.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <InternalLinks cluster="restaurant" currentPath={PATH} />
        <Footer />
      </main>
    </>
  )
}
