import Link from "next/link"
import JsonLd from "@/components/JsonLd"
import SiteNavbar from "@/components/SiteNavbar"
import Footer from "@/components/Footer"
import InternalLinks from "@/components/InternalLinks"
import { buildMetadata, breadcrumbSchema, faqSchema, SITE, type Faq } from "@/lib/seo"
import EstimateBuilder from "./EstimateBuilder"

const PATH = "/repair-shop-software/auto-repair-estimate-template"
const TITLE = "Auto Repair Estimate Template - Free, Printable | Smapey"
const DESCRIPTION =
  "Free auto repair estimate template. Fill in parts, labour, and vehicle details and print or save as PDF - or clear the fields for a blank estimate form. No sign-up."

const INK = "#161616"
const BLUE = "#2f6bff"
const CREAM = "#fbf7f0"
const MUTED = "#54514c"
const display = { fontFamily: "'Hanken Grotesk', system-ui, sans-serif" }

export const metadata = buildMetadata({ title: TITLE, description: DESCRIPTION, path: PATH })

const FAQS: Faq[] = [
  {
    q: "What should an auto repair estimate include?",
    a: "Your shop's name and contact details, an estimate number and date, the customer and their vehicle including plate and odometer reading, every part and labour line itemised with quantity and unit price, subtotals for parts and labour separately, tax, and the total. A validity period and a space for the customer to sign their approval matter more than most shops think - they are what turn an estimate into an agreed scope of work.",
  },
  {
    q: "What is the difference between an estimate and an invoice?",
    a: "An estimate is issued before the work and prices what you expect it to cost; an invoice is issued after and bills what it actually cost. Keeping them as separate documents is what lets you show a customer that the final figure matches what they approved.",
  },
  {
    q: "How long should a repair estimate be valid?",
    a: "Fourteen to thirty days is typical. Parts prices move, and an open-ended estimate leaves you honouring a figure you quoted before a supplier increase. Print the validity period on the document rather than relying on the customer remembering it.",
  },
  {
    q: "Should parts and labour be listed separately?",
    a: "Yes. Customers query totals far less when they can see which portion is parts and which is your time, and separating them makes it obvious why a job with a cheap part still costs real money. It also makes your own margins legible - parts and labour rarely earn at the same rate.",
  },
  {
    q: "What if you find more work once the car is apart?",
    a: "Say so on the estimate itself, and get approval before continuing. The line most shops use is that additional faults found during teardown will be quoted separately for approval - it sets the expectation before the disagreement rather than after it.",
  },
  {
    q: "Is this template free to use commercially?",
    a: "Yes. Fill it in, print it, or save it as a PDF from your browser's print dialog and use it in your shop. Nothing you type is sent anywhere - the form runs entirely in your browser.",
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
            name: "Auto Repair Estimate Template",
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
              Free template
            </p>
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-[1.06] tracking-tight mb-5" style={{ color: INK }}>
              Auto repair estimate template
            </h1>
            <p className="text-lg max-w-2xl leading-relaxed" style={{ color: MUTED }}>
              Fill in the vehicle, parts, and labour and the estimate builds itself as you type. Print it or save it
              as a PDF - or clear every field first and print a blank form to fill in by hand at the counter.
            </p>
          </div>
        </section>

        <section className="py-12 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <EstimateBuilder />
          </div>
        </section>

        <section className="py-12 px-6" style={{ background: CREAM }}>
          <div className="max-w-3xl mx-auto space-y-5">
            <h2 className="text-2xl font-extrabold tracking-tight" style={{ color: INK }}>
              What separates an estimate that holds up from one that starts arguments
            </h2>
            <p className="text-base leading-relaxed" style={{ color: MUTED }}>
              Most disputes in a repair shop are not about the quality of the work. They are about a number the
              customer did not expect, and they almost always trace back to something the estimate left vague.
            </p>
            <p className="text-base leading-relaxed" style={{ color: MUTED }}>
              Itemise parts and labour separately. A customer looking at one lump sum has nothing to reason about
              and will assume the worst; the same customer looking at a brake pad set at one price and two and a
              half hours of labour at another can see exactly what they are buying. It also protects you, because
              the labour line is the one people forget they agreed to.
            </p>
            <p className="text-base leading-relaxed" style={{ color: MUTED }}>
              Put the validity period on the document. Parts prices move, and an estimate with no expiry is a price
              you have promised indefinitely. Fourteen days is enough for a customer to decide and short enough that
              a supplier increase is your problem only briefly.
            </p>
            <p className="text-base leading-relaxed" style={{ color: MUTED }}>
              Say in writing what happens if you find more work once the car is apart. Teardown surprises are normal
              in this trade; the argument comes from the customer meeting the surprise on the final bill rather than
              on the estimate they signed. One sentence covers it, and it belongs on the form rather than in a
              conversation nobody wrote down.
            </p>
            <p className="text-base leading-relaxed" style={{ color: MUTED }}>
              And keep the estimate as a separate document from the{" "}
              <Link
                href="/invoice/invoicing-software-for-auto-repair"
                className="font-bold underline"
                style={{ color: BLUE }}
              >
                invoice you bill from
              </Link>
              . Being able to lay the two side by side and show that the final figure matches what was approved is
              worth more than the small amount of duplication it costs you.
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
              When the paperwork outgrows a printed form
            </h2>
            <p className="text-base leading-relaxed" style={{ color: MUTED }}>
              A template is the right tool for a handful of jobs a week. Past that, the thing you actually want is
              the history - what this plate number had done last time, which estimates turned into work and which
              did not, and what you quoted for the same job three months ago. Smapey&apos;s{" "}
              <Link href="/auto-repair-shop-software-philippines" className="font-bold underline" style={{ color: BLUE }}>
                auto repair shop software
              </Link>{" "}
              keeps job orders, parts and labour, and service history by plate, and there is a{" "}
              <Link href="/motorcycle-repair-shop-software-philippines" className="font-bold underline" style={{ color: BLUE }}>
                motorcycle version
              </Link>{" "}
              built around two wheels.
            </p>
          </div>
        </section>

        <InternalLinks cluster="repair-shop" currentPath={PATH} />
        <Footer />
      </main>
    </>
  )
}
