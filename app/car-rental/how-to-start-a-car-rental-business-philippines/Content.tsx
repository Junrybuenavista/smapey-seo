"use client"

import Link from "next/link"
import Footer from "@/components/Footer"
import InternalLinks from "@/components/InternalLinks"
import {
  Animate, ArticleHero, AH2, AP, Bullets, DataTable, FAQList, Cite, Caution,
} from "@/components/article/ArticleKit"
import { FAQS } from "./faqs"

const INK = "#161616"
const AMBER = "#ff9e2c"
const REGISTER_URL = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=CAR_RENTAL&plan=FREE`

export default function Content() {
  return (
    <main className="bg-white">
      <ArticleHero
        badge="Philippines · Starting out"
        title={<>How to start a car rental business in the Philippines</>}
        intro="One decision shapes everything else, and most guides skip it: whether you hand over the keys or hand over a driver. Self-drive and with-driver are different businesses in the eyes of the regulator — different permits, different insurance, different risk. Get that wrong and you are operating colorum. Here is the fork, then everything that follows from it."
      />

      <article className="max-w-3xl mx-auto px-6 py-16">
        <Animate>

          <AH2>The fork: are you renting a car, or selling a ride?</AH2>
          <AP>
            This is the first question to settle, before the business name, before the vehicle, before anything.
            Philippine transport regulation does not care very much what you call your business. It cares whether a
            paying passenger is being carried by a driver you provide.
          </AP>
          <DataTable
            head={["What you offer", "What it is"]}
            rows={[
              [<><strong>Self-drive.</strong> The renter drives.</>, "A private vehicle on hire. Not a public utility vehicle, so no LTFRB franchise."],
              [<><strong>With a driver, for a fee.</strong></>, "Carriage of passengers for compensation. Requires authority from the LTFRB."],
            ]}
            note="The distinction is the driver, not the vehicle and not the booking method."
          />
          <AP>
            A great many people start a &ldquo;rent a car&rdquo; business intending to drive clients around themselves,
            or to send a cousin along with the vehicle, and assume the private registration on the car covers it. It
            does not. The moment a driver is supplied for compensation, you are in the territory the LTFRB regulates,
            and operating there without authority is what <strong>colorum</strong> means.
          </AP>
          <Caution>
            Being caught operating colorum is not a parking ticket. It carries vehicle impoundment and substantial
            fines, and the operator can be barred from future applications. Confirm the current penalty schedule with
            the LTFRB directly before assuming any figure you read online — the amounts are revised, and a stale number
            is worse than none.
          </Caution>

          <AH2>If you are renting self-drive</AH2>
          <AP>
            This is the simpler route and it is where most small Philippine operators start. There is no transport
            franchise to apply for. What you do need is the ordinary business paperwork, plus two things specific to
            putting your own vehicle in a stranger&apos;s hands.
          </AP>
          <Bullets items={[
            <><strong>Register the business.</strong> DTI for a sole proprietorship or SEC for a corporation, then barangay clearance, mayor&apos;s or business permit, and BIR registration for your Certificate of Registration and your invoices.</>,
            <><strong>Register the vehicles properly with the LTO</strong>, and keep the OR/CR current. A self-drive unit stays privately registered — that is the whole point of the category.</>,
            <><strong>Insurance is the one not to economise on.</strong> CTPL is the legal minimum and it protects other people, not your asset. Comprehensive cover is what protects the car, and you need to tell the insurer the vehicle is rented out — a private-use policy may not respond to a claim arising from a rental.</>,
            <><strong>Use a written agreement every single time.</strong> It is the document that establishes who had the car, under what terms, and who pays for what. A free one is on our{" "}
              <Link href="/car-rental/car-rental-agreement-template" className="underline">car rental agreement template</Link>{" "}page.</>,
          ]} />

          <AH2>If you are supplying a driver</AH2>
          <AP>
            Then you need authority from the Land Transportation Franchising and Regulatory Board — a Certificate of
            Public Convenience — and the route most small operators take is the tourist transport category rather than
            a public route franchise.
          </AP>
          <AP>
            <strong>Tourist Rent-a-Car Transport Service</strong> is a defined LTFRB classification with its own
            requirements. Two things about it catch applicants out. It is <em>not</em> an open category: there are
            vehicle standards covering class, engine displacement and age, so the family sedan may not qualify. And it
            is not purely an LTFRB matter — the Department of Tourism endorses the application and then accredits the
            operator <strong>annually</strong>, with that accreditation feeding back into registering the units.
          </AP>
          <Cite>
            The tourist transport classifications sit in LTFRB Memorandum Circular 2008-009, which consolidated a long
            run of earlier issuances including MC 98-004, MC 2003-001 and MC 2004-011 — the consolidation exists
            precisely because the categories had become confusing. Read the current text from the LTFRB or the Supreme
            Court E-Library rather than from a summary, and confirm the vehicle specifications and fees with the LTFRB
            before you buy anything: this page is orientation, not legal advice, and the specifications in particular
            are the sort of detail that is amended. Last checked 8 October 2026.
          </Cite>

          <AH2>The number that decides whether this works</AH2>
          <AP>
            Car rental looks like a margin business and behaves like a utilisation business. One figure governs it:
            the share of days your vehicle is actually earning.
          </AP>
          <DataTable
            head={["", ""]}
            rows={[
              ["Utilisation", "days rented ÷ days owned"],
              ["Revenue per vehicle", "daily rate × days rented"],
              ["What eats it", "insurance, maintenance, depreciation, and the days it sits idle"],
            ]}
            note="A vehicle at a high daily rate and low utilisation loses to a cheaper one that is always out."
          />
          <AP>
            Work out your own break-even the same way as any fixed-asset business: total the monthly cost of owning
            the vehicle — amortisation or opportunity cost of the capital, insurance, scheduled maintenance, and your
            own time — then divide by your daily rate. That gives the days per month the car must be rented simply to
            stand still. Compare that against what you can realistically book, not against the month being full.
          </AP>
          <AP>
            We are not publishing capital figures here. Vehicle prices, insurance premiums and LTO fees all move, and a
            number copied from a blog is the one thing you should not build a plan on. Price your own specific vehicle,
            your own insurer, and your own LGU.
          </AP>

          <AH2>The risks peculiar to this business</AH2>
          <Bullets items={[
            <><strong>The vehicle leaves your sight.</strong> Unlike a shop, your entire asset is driven away by someone you met once. Verification of the renter, a deposit, and a signed agreement are not bureaucracy — they are the business.</>,
            <><strong>Damage disputes.</strong> Photograph the vehicle at handover and return, every time, with the odometer and fuel gauge in frame. Almost every argument in this trade is about a dent nobody can date.</>,
            <><strong>Traffic violations after the fact.</strong> Tickets follow the plate, which means they follow you. Your agreement needs to say who pays, and you need the record of who held the car on which dates.</>,
            <><strong>Idle time is invisible.</strong> It costs you nothing to notice and everything to ignore. It is the main reason operators with three cars earn less than operators with one.</>,
          ]} />

          <AH2>Running it once the cars are out</AH2>
          <AP>
            All four of those risks come back to the same thing: knowing which vehicle is with whom, on what terms,
            and when it is due. That is a record-keeping problem long before it is a software problem, but it stops
            being manageable on paper at about the third car.
          </AP>
          <Bullets items={[
            "Which vehicle is out, with whom, and when it is due back.",
            "The agreement and handover photos attached to the booking, not in a phone gallery.",
            "Who has paid, who still owes a balance or a deposit refund, and by what method.",
            "Utilisation per vehicle, so an underperforming car is visible before the year is out.",
          ]} />

          <div className="my-8 flex flex-wrap gap-3 items-center">
            <Link href={REGISTER_URL} className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm border-2 transition-transform hover:-translate-y-0.5" style={{ background: AMBER, color: INK, borderColor: INK, boxShadow: `4px 4px 0 ${INK}` }}>
              Start free
            </Link>
          </div>

          <AH2>Frequently asked questions</AH2>
          <FAQList faqs={FAQS} />
        </Animate>
      </article>

      <InternalLinks
        cluster="car-rental"
        currentPath="/car-rental/how-to-start-a-car-rental-business-philippines"
      />
      <Footer />
    </main>
  )
}
