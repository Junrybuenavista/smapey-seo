import Link from "next/link"
import JsonLd from "@/components/JsonLd"
import SiteNavbar from "@/components/SiteNavbar"
import Footer from "@/components/Footer"
import InternalLinks from "@/components/InternalLinks"
import { buildMetadata, breadcrumbSchema, faqSchema, SITE, type Faq } from "@/lib/seo"
import AgreementBuilder from "./AgreementBuilder"

const PATH = "/car-rental/car-rental-agreement-template"
const TITLE = "Car Rental Agreement Template - Free, Printable | Smapey"
const DESCRIPTION =
  "Free car rental agreement template. Fill in the renter, vehicle, period, rates, and terms, then print or save as PDF - or clear the fields for a blank contract. No sign-up."

const INK = "#161616"
const BLUE = "#2f6bff"
const CREAM = "#fbf7f0"
const MUTED = "#54514c"
const display = { fontFamily: "'Hanken Grotesk', system-ui, sans-serif" }

export const metadata = buildMetadata({ title: TITLE, description: DESCRIPTION, path: PATH })

const FAQS: Faq[] = [
  {
    q: "What should a car rental agreement include?",
    a: "The owner and renter with full contact details, the renter's licence number and expiry, the vehicle with plate and colour, odometer and fuel level at release and return, the exact release and return date and time, the daily rate and number of days, any mileage allowance and the excess rate, the security deposit, and terms covering use, fuel, fines, accidents, and how the deposit is refunded. Both parties sign and date it.",
  },
  {
    q: "Why record the odometer and fuel level at release?",
    a: "Because almost every deposit dispute is about one of the two. A number written down and signed by both parties at release turns an argument at return into arithmetic. Leave a blank for the return reading and fill it in together when the car comes back.",
  },
  {
    q: "How much security deposit should I collect?",
    a: "Enough to cover your insurance excess plus a tank of fuel and a plausible traffic fine. Rentals commonly sit between one and three days' rate. State on the agreement what it can be deducted for and when it is returned, or you will be explaining it at every handover.",
  },
  {
    q: "Should I photograph the vehicle at handover?",
    a: "Yes, and it is worth writing on the agreement that you did. Photographs of all four corners, the roof, the wheels, and the dashboard at release and return take two minutes and settle damage disputes that paperwork alone cannot.",
  },
  {
    q: "Does a rental agreement need to be notarised?",
    a: "Usually not for short private rentals, but requirements vary by jurisdiction and by what your insurer expects. A signed agreement between both parties is the baseline; if you rent at any volume, have a lawyer review your standard terms once for the place you operate in.",
  },
  {
    q: "Is this template legal advice?",
    a: "No. It is a starting point that covers the fields most rental agreements need, not a document drafted for your jurisdiction or your insurance arrangements. Have it reviewed by a lawyer where you operate before you rely on it commercially.",
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
            name: "Car Rental Agreement Template",
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
              Car rental agreement template
            </h1>
            <p className="text-lg max-w-2xl leading-relaxed" style={{ color: MUTED }}>
              Fill in the renter, the vehicle, the period, and the rates, and the agreement builds as you type. Print
              it or save it as a PDF - or clear the fields and print a blank contract to complete at handover.
            </p>
          </div>
        </section>

        <section className="py-12 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <AgreementBuilder />
          </div>
        </section>

        <section className="py-12 px-6" style={{ background: CREAM }}>
          <div className="max-w-3xl mx-auto space-y-5">
            <h2 className="text-2xl font-extrabold tracking-tight" style={{ color: INK }}>
              The clauses that actually get used
            </h2>
            <p className="text-base leading-relaxed" style={{ color: MUTED }}>
              A rental agreement earns its keep in the twenty minutes at return when something is not as it was at
              release. Nearly every one of those conversations comes down to a number nobody wrote down.
            </p>
            <p className="text-base leading-relaxed" style={{ color: MUTED }}>
              Record the odometer and the fuel level at release, in the renter&apos;s presence, and have them sign
              next to it. This single habit removes the two most common deposit disputes, because at return you are
              comparing figures rather than recollections. Leave the return readings blank on the printed form and
              fill them in together.
            </p>
            <p className="text-base leading-relaxed" style={{ color: MUTED }}>
              Be explicit about the deposit - what it covers, what it can be deducted for, and when it comes back.
              A renter who has read that fines and missing fuel come out of the deposit argues far less when they do.
            </p>
            <p className="text-base leading-relaxed" style={{ color: MUTED }}>
              Name every driver. An agreement that permits only the signing renter, unless an additional driver is
              named on the form, is the difference between a covered claim and an uncovered one at the moment it
              matters most.
            </p>
            <p className="text-base leading-relaxed" style={{ color: MUTED }}>
              One caveat worth stating plainly: this template covers the fields a rental agreement generally needs,
              but it is not drafted for your jurisdiction or your insurer. If you rent at any volume, have a lawyer
              read your standard terms once - it is a small cost against the first dispute it prevents.
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
              Past a printed contract per booking
            </h2>
            <p className="text-base leading-relaxed" style={{ color: MUTED }}>
              A template works well for a car or two. Once you are juggling overlapping bookings, you want to see
              which vehicle is free on which dates without checking a folder. Smapey&apos;s{" "}
              <Link href="/car-rental" className="font-bold underline" style={{ color: BLUE }}>
                car rental software
              </Link>{" "}
              tracks the fleet calendar, customers, and payments, and there is a{" "}
              <Link href="/car-rental/car-rental-booking-software" className="font-bold underline" style={{ color: BLUE }}>
                booking-focused version
              </Link>{" "}
              if reservations are the part slowing you down.
            </p>
          </div>
        </section>

        <InternalLinks cluster="car-rental" currentPath={PATH} />
        <Footer />
      </main>
    </>
  )
}
