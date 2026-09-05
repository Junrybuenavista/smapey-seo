import Link from "next/link"
import JsonLd from "@/components/JsonLd"
import SiteNavbar from "@/components/SiteNavbar"
import Footer from "@/components/Footer"
import InternalLinks from "@/components/InternalLinks"
import { buildMetadata, breadcrumbSchema, faqSchema, SITE, type Faq } from "@/lib/seo"
import FoodCostCalculator from "./FoodCostCalculator"
import EmbedSnippet from "./EmbedSnippet"

const PATH = "/restaurant/food-cost-calculator"
const TITLE = "Food Cost Calculator - Free Recipe Costing Tool | Smapey"
const DESCRIPTION =
  "Free food cost calculator. Cost a recipe ingredient by ingredient, convert units automatically, account for trim waste, and get your food cost percentage and menu price. No sign-up."

const INK = "#161616"
const BLUE = "#2f6bff"
const CREAM = "#fbf7f0"
const MUTED = "#54514c"
const display = { fontFamily: "'Hanken Grotesk', system-ui, sans-serif" }

export const metadata = buildMetadata({ title: TITLE, description: DESCRIPTION, path: PATH })

const FAQS: Faq[] = [
  {
    q: "How do you calculate food cost?",
    a: "Add up what every ingredient in a recipe cost you, then divide by the number of portions the batch makes. The part people get wrong is the unit conversion: if you buy chicken at 220 per kilo and the recipe uses 800g, the line cost is 220 ÷ 1000 × 800 = 176, not 220. Do that for every ingredient and the total is your batch cost.",
  },
  {
    q: "How do you calculate food cost percentage?",
    a: "Divide the cost of one portion by the price you sell it for, then multiply by 100. A plate that costs 54 in ingredients and sells for 180 runs a food cost of 54 ÷ 180 × 100 = 30%. The lower the percentage, the more of each sale is left to cover labour, rent, and profit.",
  },
  {
    q: "What is a good food cost percentage?",
    a: "Most full-service kitchens target 28-35%. Quick service and high-volume operations often run lower, and steak or seafood houses routinely run higher because the protein dominates the plate. There is no universal correct figure - what matters is that the percentage leaves enough gross profit to cover your own labour and overhead.",
  },
  {
    q: "How do I price a menu item from its cost?",
    a: "Divide the cost per portion by your target food cost percentage expressed as a decimal. A portion costing 54 at a 30% target prices at 54 ÷ 0.30 = 180. Treat that as a floor rather than a final answer: what the dish is worth to your customers and what similar restaurants nearby charge both belong in the decision.",
  },
  {
    q: "Should food cost include labour?",
    a: "No. Food cost is ingredients only. Labour, gas, electricity, packaging, and rent are separate lines, and the gross profit left after food cost is what pays for them. Combining the two gives you prime cost, which is a useful number, but it is not what anyone means by food cost percentage.",
  },
  {
    q: "What is trim waste and why does it change the cost?",
    a: "Trim waste is the part of an ingredient you buy but never plate: peel, bone, fat, and stalks. If a recipe needs 100g of peeled garlic and a fifth of every head is skin, you have to buy 125g to get it. Costing the 100g rather than the 125g understates the dish, which is why this calculator asks for a waste percentage per ingredient.",
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
            name: "Food Cost Calculator",
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
              Food cost calculator
            </h1>
            <p className="text-lg max-w-2xl leading-relaxed" style={{ color: MUTED }}>
              Cost a recipe the way it is actually cooked. Enter what you buy and what the recipe uses - the units do
              not have to match - and this works out the cost per portion, your food cost percentage, and what the
              dish should sell for.
            </p>
            <p className="text-lg max-w-2xl leading-relaxed mt-3" style={{ color: MUTED }}>
              No sign-up, no email. Change any figure and the numbers update as you type.
            </p>
          </div>
        </section>

        <section className="py-12 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <FoodCostCalculator />
          </div>
        </section>

        <section className="py-12 px-6" style={{ background: CREAM }}>
          <div className="max-w-3xl mx-auto space-y-5">
            <h2 className="text-2xl font-extrabold tracking-tight" style={{ color: INK }}>
              How to calculate food cost without fooling yourself
            </h2>
            <p className="text-base leading-relaxed" style={{ color: MUTED }}>
              The arithmetic is simple - ingredients divided by portions - and almost every recipe costed by hand is
              still wrong, for three reasons.
            </p>
            <p className="text-base leading-relaxed" style={{ color: MUTED }}>
              The first is units. You buy oil by the litre and cook with it by the tablespoon, buy garlic by the
              kilo and use it by the clove. Converting in your head is where the errors start, so this tool does it
              for you and refuses to convert between weight and volume, because there is no honest way to turn a
              kilo of flour into millilitres.
            </p>
            <p className="text-base leading-relaxed" style={{ color: MUTED }}>
              The second is trim. A recipe that calls for 800g of chicken means 800g on the plate, but bone and fat
              mean you bought closer to 900g. Costing what the recipe lists rather than what you purchased makes
              every dish look better than it is. Set a waste percentage per ingredient and the difference shows up
              as its own line in the results.
            </p>
            <p className="text-base leading-relaxed" style={{ color: MUTED }}>
              The third is what the number leaves out. Food cost is ingredients, full stop - no labour, no gas, no
              packaging, no rent. The gross profit this shows is what is left to pay for all of that, not what you
              take home. A dish at 30% food cost is not a dish with 70% profit.
            </p>
            <p className="text-base leading-relaxed" style={{ color: MUTED }}>
              Cost your five best-selling dishes first. They carry most of your revenue, so an error there matters
              far more than one on a dish you sell twice a week - and once they are priced properly, the same
              figures are worth tracking as ingredient prices move, which is part of what a{" "}
              <Link href="/restaurant" className="font-bold underline" style={{ color: BLUE }}>
                food ordering manager
              </Link>{" "}
              is for.
            </p>
            <p className="text-base leading-relaxed" style={{ color: MUTED }}>
              If you want the arithmetic spelled out rather than done for you,{" "}
              <Link href="/restaurant/how-to-calculate-food-cost" className="font-bold underline" style={{ color: BLUE }}>
                how to calculate food cost
              </Link>{" "}
              works the same recipe through by hand. There are also two smaller tools for when you already have the
              cost per portion:{" "}
              <Link
                href="/restaurant/food-cost-percentage-calculator"
                className="font-bold underline"
                style={{ color: BLUE }}
              >
                the food cost percentage calculator
              </Link>{" "}
              for checking a price you already charge, and{" "}
              <Link href="/restaurant/menu-price-calculator" className="font-bold underline" style={{ color: BLUE }}>
                the menu price calculator
              </Link>{" "}
              for setting a new one.
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

        <EmbedSnippet />
        <InternalLinks cluster="restaurant" currentPath={PATH} />
        <Footer />
      </main>
    </>
  )
}
