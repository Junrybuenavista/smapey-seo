import Link from "next/link"
import JsonLd from "@/components/JsonLd"
import SiteNavbar from "@/components/SiteNavbar"
import Footer from "@/components/Footer"
import InternalLinks from "@/components/InternalLinks"
import { buildMetadata, breadcrumbSchema, faqSchema, SITE, type Faq } from "@/lib/seo"
import MenuPrice from "./MenuPrice"

const PATH = "/restaurant/menu-price-calculator"
const TITLE = "Menu Price Calculator - Price a Dish From Its Cost | Smapey"
const DESCRIPTION =
  "Free menu price calculator. Enter cost per portion and your target food cost percentage to get the price a dish should sell for, with VAT and sensible rounding. No sign-up."

const INK = "#161616"
const BLUE = "#2f6bff"
const CREAM = "#fbf7f0"
const MUTED = "#54514c"
const display = { fontFamily: "'Hanken Grotesk', system-ui, sans-serif" }

export const metadata = buildMetadata({ title: TITLE, description: DESCRIPTION, path: PATH })

const FAQS: Faq[] = [
  {
    q: "How do you calculate a menu price from food cost?",
    a: "Divide the cost per portion by your target food cost percentage written as a decimal. A portion costing 54 at a 30% target prices at 54 ÷ 0.30 = 180. The same arithmetic is often written as a multiplier - a 30% target is a 3.33× markup on cost.",
  },
  {
    q: "What food cost percentage should I price at?",
    a: "28-35% suits most full-service menus. Go lower on items with cheap ingredients and high perceived value, such as pasta, rice dishes, and drinks, and accept a higher percentage on steak and seafood where the protein dominates. Pricing every dish at one flat percentage leaves money on the table.",
  },
  {
    q: "Should menu prices include VAT?",
    a: "That depends on your market and what your customers expect to see. Either way, calculate the food cost percentage on the pre-tax price - VAT is collected on behalf of the government and was never yours, so including it in the base makes your food cost look better than it is.",
  },
  {
    q: "Why round menu prices up?",
    a: "Because 180 prints better than 178.43, and rounding down would push the dish past the target percentage you just asked for. Rounding up to the next 5 or 10 costs the customer very little and always moves the margin in your favour.",
  },
  {
    q: "Is cost-plus pricing enough on its own?",
    a: "No. It gives you a floor - the least you can charge and still hit your target on ingredients. What the dish is worth to customers, what nearby restaurants charge, and how the item sits next to the rest of your menu all shape the final number. Use the floor as a constraint, not as the decision.",
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
            name: "Menu Price Calculator",
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
              Menu price calculator
            </h1>
            <p className="text-lg max-w-2xl leading-relaxed" style={{ color: MUTED }}>
              You know what the dish costs and the food cost percentage you want to run. This works the price back
              from those two figures, rounds it to something a menu would print, and shows what you actually keep.
            </p>
          </div>
        </section>

        <section className="py-12 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <MenuPrice />
          </div>
        </section>

        <section className="py-12 px-6" style={{ background: CREAM }}>
          <div className="max-w-3xl mx-auto space-y-5">
            <h2 className="text-2xl font-extrabold tracking-tight" style={{ color: INK }}>
              Pricing from cost is a floor, not a strategy
            </h2>
            <p className="text-base leading-relaxed" style={{ color: MUTED }}>
              Cost divided by target percentage is the least you can charge and still hit the margin you planned
              for. It is a genuinely useful number - it stops you underpricing a dish out of habit - but it knows
              nothing about your customers, so it cannot be the whole decision.
            </p>
            <p className="text-base leading-relaxed" style={{ color: MUTED }}>
              Two things pull the real price away from the floor. The first is perceived value: a bowl of pasta
              costs very little to make and carries a price far above its cost, while a steak carries a price close
              to it. Pricing every dish at one flat percentage means overcharging for the steak, undercharging for
              the pasta, or both. The second is the menu as a whole - a dish priced sensibly on its own can still
              look wrong sitting next to its neighbours.
            </p>
            <p className="text-base leading-relaxed" style={{ color: MUTED }}>
              The floor is only as good as the cost that feeds it, which is the part most menus get wrong. Cost per
              portion has to include the oil, the aromatics, and the trim you paid for but never plated. The{" "}
              <Link href="/restaurant/food-cost-calculator" className="font-bold underline" style={{ color: BLUE }}>
                food cost calculator
              </Link>{" "}
              builds that figure ingredient by ingredient, and once a dish is on the menu you can{" "}
              <Link
                href="/restaurant/food-cost-percentage-calculator"
                className="font-bold underline"
                style={{ color: BLUE }}
              >
                check the percentage it is really running
              </Link>{" "}
              as supplier prices move.
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
