import Link from "next/link"
import JsonLd from "@/components/JsonLd"
import SiteNavbar from "@/components/SiteNavbar"
import Footer from "@/components/Footer"
import InternalLinks from "@/components/InternalLinks"
import { buildMetadata, breadcrumbSchema, faqSchema, SITE, type Faq } from "@/lib/seo"

const PATH = "/restaurant/how-to-calculate-food-cost"
const TITLE = "How to Calculate Food Cost (With a Worked Example) | Smapey"
const DESCRIPTION =
  "How to calculate food cost step by step: the formula, a fully worked recipe, how to handle unit conversion and trim waste, and how theoretical food cost differs from what you actually spend."

const INK = "#161616"
const BLUE = "#2f6bff"
const CREAM = "#fbf7f0"
const MUTED = "#54514c"
const display = { fontFamily: "'Hanken Grotesk', system-ui, sans-serif" }

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  type: "article",
})

/** The worked example the whole page hangs on - chicken adobo, illustrative Philippine prices. */
const LINES = [
  { name: "Chicken thigh", buy: "₱220 / kg", use: "800 g", waste: "12%", cost: "₱200.00" },
  { name: "Soy sauce", buy: "₱95 / L", use: "120 ml", waste: "0%", cost: "₱11.40" },
  { name: "Vinegar", buy: "₱60 / L", use: "90 ml", waste: "0%", cost: "₱5.40" },
  { name: "Garlic", buy: "₱45 / 250 g", use: "40 g", waste: "20%", cost: "₱9.00" },
  { name: "Cooking oil", buy: "₱130 / L", use: "2 tbsp", waste: "0%", cost: "₱3.84" },
]

const FAQS: Faq[] = [
  {
    q: "What is the formula for food cost?",
    a: "Cost per portion = total cost of the ingredients in a recipe ÷ the number of portions the batch makes. Food cost percentage = (cost per portion ÷ menu price) × 100. Everything else in food costing is about making sure the first number is honest.",
  },
  {
    q: "How do I convert between the unit I buy in and the unit I cook in?",
    a: "Work out the cost of one base unit, then multiply by how many you use. Chicken at ₱220 per kilo is ₱0.22 per gram, so 800g costs ₱176. Never convert between weight and volume - a kilo of flour and a litre of flour are not the same thing, and any tool that offers to do it is guessing.",
  },
  {
    q: "How does trim waste change the calculation?",
    a: "Trim waste is what you buy but never plate - bone, peel, fat, stalks. If a recipe needs 800g of chicken on the plate and 12% is bone and fat, you had to buy about 909g to get it. Cost the amount purchased, not the amount plated, or every dish looks cheaper than it is.",
  },
  {
    q: "What is the difference between theoretical and actual food cost?",
    a: "Theoretical food cost is what your recipes say you should have spent. Actual food cost comes from inventory: beginning inventory + purchases − ending inventory, divided by sales. The gap between them is waste, over-portioning, staff meals, comps, and theft. A point or two is normal; five or more means portioning is not under control.",
  },
  {
    q: "How often should I recalculate food cost?",
    a: "Recost your top sellers whenever a major supplier price moves, and review the whole menu quarterly. Ingredient prices drift constantly and menus rarely follow, so a dish costed a year ago is usually running several points higher than the menu assumes.",
  },
  {
    q: "Should food cost include labour or packaging?",
    a: "No. Food cost is ingredients only. Labour is tracked separately, and the two together give you prime cost. Packaging belongs with delivery and takeaway costs. Folding them into food cost makes the number incomparable to any benchmark you will read.",
  },
]

export default function Page() {
  return (
    <>
      <JsonLd
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "How to calculate food cost",
            description: DESCRIPTION,
            url: `${SITE}${PATH}`,
            publisher: { "@id": `${SITE}/#organization` },
            step: [
              { "@type": "HowToStep", name: "List every ingredient", text: "Write down every ingredient in the recipe, including oil, salt, and aromatics." },
              { "@type": "HowToStep", name: "Convert to the unit you cook in", text: "Work out the cost of one base unit from the purchase price, then multiply by the quantity the recipe uses." },
              { "@type": "HowToStep", name: "Add trim waste", text: "Increase the quantity by the share of each ingredient you buy but never plate." },
              { "@type": "HowToStep", name: "Total the batch and divide by portions", text: "Add every line cost, then divide by the number of portions the batch yields." },
              { "@type": "HowToStep", name: "Turn it into a percentage", text: "Divide the cost per portion by the menu price and multiply by 100." },
            ],
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
              Guide
            </p>
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-[1.06] tracking-tight mb-5" style={{ color: INK }}>
              How to calculate food cost
            </h1>
            <p className="text-lg max-w-2xl leading-relaxed" style={{ color: MUTED }}>
              The formula takes one line. Getting a number you can price against takes a little more care - this
              walks through a real recipe end to end, including the two places nearly every hand-costed dish goes
              wrong.
            </p>
          </div>
        </section>

        <section className="py-12 px-6 bg-white">
          <div className="max-w-3xl mx-auto space-y-5">
            <h2 className="text-2xl font-extrabold tracking-tight" style={{ color: INK }}>
              The formula
            </h2>
            <div className="rounded-2xl border-2 px-6 py-5" style={{ borderColor: INK, background: CREAM }}>
              <p className="text-base font-bold mb-2" style={{ color: INK }}>
                Cost per portion = total ingredient cost ÷ portions per batch
              </p>
              <p className="text-base font-bold" style={{ color: INK }}>
                Food cost % = (cost per portion ÷ menu price) × 100
              </p>
            </div>
            <p className="text-base leading-relaxed" style={{ color: MUTED }}>
              That is genuinely all of it. The reason food costing has a reputation for being fiddly is not the
              arithmetic - it is that the total ingredient cost is harder to pin down than it looks.
            </p>
          </div>
        </section>

        <section className="py-12 px-6" style={{ background: CREAM }}>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-extrabold tracking-tight mb-4" style={{ color: INK }}>
              A worked example: chicken adobo, 8 portions
            </h2>
            <p className="text-base leading-relaxed mb-6" style={{ color: MUTED }}>
              Every line converts the purchase price into the quantity the recipe uses, then adds back the share
              that never reaches the plate.
            </p>

            <div className="overflow-x-auto rounded-2xl border-2" style={{ borderColor: INK, background: "#fff" }}>
              <table className="w-full text-sm" style={{ color: INK }}>
                <thead>
                  <tr style={{ background: CREAM }}>
                    <th className="text-left font-extrabold px-4 py-3">Ingredient</th>
                    <th className="text-left font-extrabold px-4 py-3">You buy</th>
                    <th className="text-left font-extrabold px-4 py-3">Recipe uses</th>
                    <th className="text-left font-extrabold px-4 py-3">Trim</th>
                    <th className="text-right font-extrabold px-4 py-3">Line cost</th>
                  </tr>
                </thead>
                <tbody>
                  {LINES.map((l) => (
                    <tr key={l.name} className="border-t-2" style={{ borderColor: "#e7e2d9" }}>
                      <td className="px-4 py-3 font-bold">{l.name}</td>
                      <td className="px-4 py-3" style={{ color: MUTED }}>{l.buy}</td>
                      <td className="px-4 py-3" style={{ color: MUTED }}>{l.use}</td>
                      <td className="px-4 py-3" style={{ color: MUTED }}>{l.waste}</td>
                      <td className="px-4 py-3 text-right font-bold">{l.cost}</td>
                    </tr>
                  ))}
                  <tr className="border-t-2" style={{ borderColor: INK, background: CREAM }}>
                    <td className="px-4 py-3 font-extrabold" colSpan={4}>
                      Batch total (8 portions)
                    </td>
                    <td className="px-4 py-3 text-right font-extrabold">₱229.64</td>
                  </tr>
                  <tr style={{ background: CREAM }}>
                    <td className="px-4 py-3 font-extrabold" colSpan={4}>
                      Cost per portion
                    </td>
                    <td className="px-4 py-3 text-right font-extrabold">₱28.71</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-base leading-relaxed mt-6" style={{ color: MUTED }}>
              At a menu price of ₱95, that portion runs a food cost of 28.71 ÷ 95 × 100 ={" "}
              <strong style={{ color: INK }}>30.2%</strong> - comfortably inside the 28-35% band most full-service
              kitchens aim for, leaving ₱66.29 of gross profit per plate to cover labour, gas, rent, and profit.
            </p>
            <p className="text-base leading-relaxed mt-4" style={{ color: MUTED }}>
              Note the chicken line. The recipe uses 800g, but at 12% trim you buy about 909g to get it - ₱200
              rather than the ₱176 the recipe suggests. That single correction moves the dish by more than a full
              percentage point.
            </p>
            <p className="text-base leading-relaxed mt-4" style={{ color: MUTED }}>
              The{" "}
              <Link href="/restaurant/food-cost-calculator" className="font-bold underline" style={{ color: BLUE }}>
                food cost calculator
              </Link>{" "}
              runs exactly this table for your own recipe, and does the unit conversion and the trim arithmetic for
              you.
            </p>
          </div>
        </section>

        <section className="py-12 px-6 bg-white">
          <div className="max-w-3xl mx-auto space-y-5">
            <h2 className="text-2xl font-extrabold tracking-tight" style={{ color: INK }}>
              The two mistakes that make a menu look healthier than it is
            </h2>
            <h3 className="text-lg font-extrabold pt-2" style={{ color: INK }}>
              1. Converting units in your head
            </h3>
            <p className="text-base leading-relaxed" style={{ color: MUTED }}>
              You buy oil by the litre and cook with it by the tablespoon, buy garlic by the kilo and use it by the
              clove. Each conversion is easy on its own and the errors are small, which is exactly why they survive
              - nobody checks a line worth four pesos. Across a menu they add up to whole percentage points.
            </p>
            <p className="text-base leading-relaxed" style={{ color: MUTED }}>
              One rule worth keeping: never convert between weight and volume. A kilo of flour is not a litre of
              flour, and any conversion that crosses that line is a guess wearing a decimal point.
            </p>
            <h3 className="text-lg font-extrabold pt-2" style={{ color: INK }}>
              2. Costing what the recipe lists instead of what you bought
            </h3>
            <p className="text-base leading-relaxed" style={{ color: MUTED }}>
              A recipe calling for 800g of chicken means 800g on the plate. Bone and fat mean you bought closer to
              900g, and you paid for all of it. The same applies to peeled garlic, trimmed beef, and destemmed
              greens. Cost the purchase, not the plate.
            </p>
            <h3 className="text-lg font-extrabold pt-2" style={{ color: INK }}>
              And one thing the number simply does not cover
            </h3>
            <p className="text-base leading-relaxed" style={{ color: MUTED }}>
              Food cost is ingredients - no labour, no gas, no packaging, no rent. A dish running at 30% food cost
              is not a dish making 70% profit. That 70% is gross profit, and everything else in the business still
              has to come out of it.
            </p>
          </div>
        </section>

        <section className="py-12 px-6" style={{ background: CREAM }}>
          <div className="max-w-3xl mx-auto space-y-5">
            <h2 className="text-2xl font-extrabold tracking-tight" style={{ color: INK }}>
              Theoretical food cost vs what you actually spend
            </h2>
            <p className="text-base leading-relaxed" style={{ color: MUTED }}>
              Everything above gives you theoretical food cost - what your recipes say you should have spent. The
              actual figure comes from inventory over a period:
            </p>
            <div className="rounded-2xl border-2 px-6 py-5" style={{ borderColor: INK, background: "#fff" }}>
              <p className="text-base font-bold" style={{ color: INK }}>
                Actual food cost % = (opening inventory + purchases − closing inventory) ÷ food sales × 100
              </p>
            </div>
            <p className="text-base leading-relaxed" style={{ color: MUTED }}>
              The two rarely match, and the gap is the interesting part: waste, over-portioning, staff meals, comps,
              spoilage, and theft all live there. A gap of one or two points is ordinary. Five or more usually means
              portioning is not controlled - the recipes are fine, but what leaves the kitchen does not match them.
            </p>
            <p className="text-base leading-relaxed" style={{ color: MUTED }}>
              Which is why costing recipes is the start rather than the end. Once the theoretical number is right,
              the number worth watching is the distance between it and reality - and that needs a record of what was
              actually sold, which is what a{" "}
              <Link href="/restaurant" className="font-bold underline" style={{ color: BLUE }}>
                food ordering manager
              </Link>{" "}
              keeps for you.
            </p>
          </div>
        </section>

        <section className="py-12 px-6 bg-white">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-extrabold tracking-tight mb-4" style={{ color: INK }}>
              Do it for your own menu
            </h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { href: "/restaurant/food-cost-calculator", title: "Food cost calculator", desc: "Cost a recipe ingredient by ingredient, with unit conversion and trim waste handled." },
                { href: "/restaurant/food-cost-percentage-calculator", title: "Food cost percentage", desc: "Already know the cost and the price? Get the percentage and the gross profit." },
                { href: "/restaurant/menu-price-calculator", title: "Menu price calculator", desc: "Work the price back from a target food cost percentage." },
              ].map((c) => (
                <Link
                  key={c.href}
                  href={c.href}
                  className="block rounded-2xl border-2 px-5 py-4 transition-transform hover:-translate-y-0.5"
                  style={{ borderColor: INK, background: CREAM }}
                >
                  <p className="text-base font-extrabold mb-1.5" style={{ color: BLUE }}>
                    {c.title}
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: MUTED }}>
                    {c.desc}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 px-6" style={{ background: CREAM }}>
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
