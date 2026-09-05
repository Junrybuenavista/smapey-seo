import Link from "next/link"
import JsonLd from "@/components/JsonLd"
import SiteNavbar from "@/components/SiteNavbar"
import Footer from "@/components/Footer"
import InternalLinks from "@/components/InternalLinks"
import { buildMetadata, breadcrumbSchema, faqSchema, SITE, type Faq } from "@/lib/seo"
import PuppyWeightCalculator from "./PuppyWeightCalculator"
import EmbedSnippet from "./EmbedSnippet"
import { SIZES, percentGrown } from "./growth"

const PATH = "/vet-clinic/puppy-weight-calculator"
const TITLE = "Puppy Weight Calculator - How Big Will My Puppy Get? | Smapey"
const DESCRIPTION =
  "Free puppy weight calculator. Enter your puppy's current weight, age, and expected size to estimate its adult weight, how far through growing it is, and what to expect month by month."

const INK = "#161616"
const BLUE = "#2f6bff"
const CREAM = "#fbf7f0"
const MUTED = "#54514c"
const display = { fontFamily: "'Hanken Grotesk', system-ui, sans-serif" }

export const metadata = buildMetadata({ title: TITLE, description: DESCRIPTION, path: PATH })

/** Milestone columns for the reference chart below the tool. */
const CHART_WEEKS = [8, 12, 16, 24, 32, 52]

const FAQS: Faq[] = [
  {
    q: "How big will my puppy get?",
    a: "Estimate it from how far through its growth the puppy already is. A breed that is typically 40% of its adult weight at 16 weeks, weighing 13kg at that age, projects to about 32kg full grown. The size category matters enormously: a toy breed at 16 weeks is already 60% of the way there, while a giant breed is barely a third.",
  },
  {
    q: "Is the 'double the weight at 14 weeks' rule accurate?",
    a: "Only for medium breeds, and only roughly. The multiplier that rule bakes in is correct for one size of dog at one age. Doubling a toy puppy's 14-week weight overestimates it, and doubling a Great Dane's badly underestimates it - giant breeds are only about a quarter grown at that point.",
  },
  {
    q: "At what age do puppies stop growing?",
    a: "It depends almost entirely on adult size. Toy breeds are essentially finished around 10-11 months, small breeds by 12, medium breeds by 13-14, large breeds at 15-18, and giant breeds keep filling out until 18 months or later. Large and giant dogs also add muscle and chest depth well after their height stops changing.",
  },
  {
    q: "How accurate is a puppy weight calculator?",
    a: "It is an estimate, and the younger the puppy the wider the honest range. At eight weeks, litter variation dominates and a prediction can be off by a fifth in either direction. By four to six months the number tightens considerably. Treat the range as the answer rather than the single figure.",
  },
  {
    q: "How do I estimate a mixed breed puppy's adult weight?",
    a: "Use the size category the larger parent finished at, since mixes often trend toward the bigger side. If you do not know the parents, medium is the safest starting point, and re-run the estimate every few weeks - as the puppy grows, the calculation corrects itself.",
  },
  {
    q: "Should I worry if my puppy is above or below the estimate?",
    a: "Usually not. These curves are averages across many dogs, and healthy puppies sit either side of them routinely. What matters more than the number is the shape of the trend: steady gain along a consistent line is normal, while sudden loss, a long plateau, or rapid gain is worth raising with your vet.",
  },
  {
    q: "Does neutering affect adult weight?",
    a: "It affects growth more than final weight. Neutering before the growth plates close tends to delay their closure slightly, which can make a dog marginally taller and leggier. The bigger effect is on metabolism afterwards, which is a feeding question rather than a growth one.",
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
            name: "Puppy Weight Calculator",
            description: DESCRIPTION,
            url: `${SITE}${PATH}`,
            applicationCategory: "UtilitiesApplication",
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
              Puppy weight calculator
            </h1>
            <p className="text-lg max-w-2xl leading-relaxed" style={{ color: MUTED }}>
              How big will your puppy get? Enter what it weighs now, how old it is, and the size it is expected to
              finish at - this estimates the adult weight, how far through growing it already is, and what to expect
              month by month.
            </p>
          </div>
        </section>

        <section className="py-12 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <PuppyWeightCalculator />
          </div>
        </section>

        <section className="py-12 px-6" style={{ background: CREAM }}>
          <div className="max-w-3xl mx-auto space-y-5">
            <h2 className="text-2xl font-extrabold tracking-tight" style={{ color: INK }}>
              Why size category changes everything
            </h2>
            <p className="text-base leading-relaxed" style={{ color: MUTED }}>
              Most puppy weight rules you will read online are a single multiplier - double the weight at fourteen
              weeks, or multiply the eight-week weight by four. They persist because they are easy to remember, and
              they are wrong for most dogs, because a multiplier is only correct for one size of dog at one age.
            </p>
            <p className="text-base leading-relaxed" style={{ color: MUTED }}>
              Small dogs grow fast and finish early. Large dogs grow for far longer and spend months adding weight
              after they have stopped getting taller. At sixteen weeks a toy breed is already around 60% of its adult
              weight, a Labrador is about 40%, and a Great Dane is barely a third of the way there. Applying the same
              multiplier to all three guarantees two of them are badly wrong.
            </p>
            <p className="text-base leading-relaxed" style={{ color: MUTED }}>
              That is why this calculator asks for the expected adult size first and reads from a different growth
              curve for each. The chart below shows roughly how much of its adult weight a puppy of each size has
              reached at a given age.
            </p>
          </div>
        </section>

        <section className="py-12 px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-extrabold tracking-tight mb-4" style={{ color: INK }}>
              Puppy growth chart: percentage of adult weight by age
            </h2>
            <div className="overflow-x-auto rounded-2xl border-2" style={{ borderColor: INK, background: "#fff" }}>
              <table className="w-full text-sm" style={{ color: INK }}>
                <thead>
                  <tr style={{ background: CREAM }}>
                    <th className="text-left font-extrabold px-4 py-3">Size</th>
                    <th className="text-left font-extrabold px-4 py-3 whitespace-nowrap">Adult weight</th>
                    {CHART_WEEKS.map((w) => (
                      <th key={w} className="text-right font-extrabold px-3 py-3 whitespace-nowrap">
                        {w}w
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {SIZES.map((s) => (
                    <tr key={s.key} className="border-t-2" style={{ borderColor: "#e7e2d9" }}>
                      <td className="px-4 py-3 font-bold whitespace-nowrap">{s.label}</td>
                      <td className="px-4 py-3 whitespace-nowrap" style={{ color: MUTED }}>
                        {s.adultRange}
                      </td>
                      {CHART_WEEKS.map((w) => (
                        <td key={w} className="px-3 py-3 text-right font-semibold">
                          {percentGrown(s, w).toFixed(0)}%
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm mt-4 leading-relaxed" style={{ color: MUTED }}>
              Read a row across to see how a puppy of that size fills out. Notice how the gap widens with age: at
              eight weeks every size sits between 12% and 27%, but by six months a toy breed is nearly done and a
              giant breed is only half way.
            </p>
          </div>
        </section>

        <section className="py-12 px-6" style={{ background: CREAM }}>
          <div className="max-w-3xl mx-auto space-y-5">
            <h2 className="text-2xl font-extrabold tracking-tight" style={{ color: INK }}>
              What the estimate cannot tell you
            </h2>
            <p className="text-base leading-relaxed" style={{ color: MUTED }}>
              A growth curve is an average drawn across a great many dogs. Your puppy is one dog, and healthy
              individuals sit above and below the line all the time - littermates from the same pairing routinely
              finish several kilos apart.
            </p>
            <p className="text-base leading-relaxed" style={{ color: MUTED }}>
              What is worth paying attention to is the shape of the trend rather than any single reading. Steady
              gain along a consistent line is what you want to see. A sudden drop, a long plateau during a period
              when the curve says a puppy should be growing quickly, or a sharp jump are all worth mentioning to
              your vet - not because the calculator says so, but because the pattern is the useful signal and a
              single weigh-in never is.
            </p>
            <p className="text-base leading-relaxed" style={{ color: MUTED }}>
              This is a calculator, not veterinary advice. It cannot see your puppy, and nothing here should replace
              a conversation with someone who can.
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

        <section className="py-12 px-6" style={{ background: CREAM }}>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-extrabold tracking-tight mb-3" style={{ color: INK }}>
              Running a clinic rather than raising a puppy?
            </h2>
            <p className="text-base leading-relaxed" style={{ color: MUTED }}>
              Weight trends are far more useful to a vet than single readings, which is the whole argument for
              keeping them in one place per patient rather than scattered across paper cards. Smapey&apos;s{" "}
              <Link href="/vet-clinic" className="font-bold underline" style={{ color: BLUE }}>
                vet clinic manager
              </Link>{" "}
              keeps patient records, visit history, and vaccination schedules together, and you are welcome to embed
              this calculator on your own clinic site.
            </p>
          </div>
        </section>

        <EmbedSnippet />
        <InternalLinks cluster="vet-clinic" currentPath={PATH} />
        <Footer />
      </main>
    </>
  )
}
