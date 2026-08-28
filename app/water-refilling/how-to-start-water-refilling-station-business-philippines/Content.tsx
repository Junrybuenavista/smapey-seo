"use client"

import InternalLinks from "@/components/InternalLinks"
import {
  Navbar, Footer, CTA, Animate, ArticleHero,
  AH2, AP, Bullets, CostTable, FAQList, SoftwarePitch, Cite,
} from "../_shared"
import { FAQS } from "./faqs"

export default function Content() {
  return (
    <main className="bg-white">
      <Navbar />

      <ArticleHero
        badge="Philippines · Step-by-step"
        title={<>How to start a water refilling station business in the Philippines</>}
        intro="A water refilling station is one of the most popular small businesses in the Philippines, low startup cost, daily demand, and repeat customers. Here's exactly how to start one, from capital and permits to equipment, pricing, and running the day-to-day."
      />

      <article className="max-w-3xl mx-auto px-6 py-16">
        <Animate>
          <AH2>Why a water refilling station?</AH2>
          <AP>
            Clean drinking water is something every household and office buys again and again. That makes a water
            refilling station a <strong>repeat-purchase business</strong> with steady cash flow, low cost per gallon, and
            simple operations. It's a favorite first business for Filipino entrepreneurs because you can start small and
            scale by adding delivery routes.
          </AP>

          <AH2>Step 1: Estimate your startup capital</AH2>
          <AP>Budgets vary, but a small station usually falls in this range:</AP>
          <CostTable
            rows={[
              ["Purification system (RO / mineral)", "₱80,000 – ₱250,000"],
              ["Containers & bottles (initial stock)", "₱20,000 – ₱60,000"],
              ["Store deposit & renovation", "₱20,000 – ₱100,000"],
              ["Permits & registration", "₱5,000 – ₱20,000"],
              ["Delivery (tricycle / e-bike, optional)", "₱20,000 – ₱70,000"],
              ["Working capital & signage", "₱10,000 – ₱40,000"],
            ]}
            note="Indicative ranges only. Actual costs depend on your location, supplier, and whether you buy a ready-made package."
          />

          <AH2>Step 2: Register the business and secure permits</AH2>
          <AP>Get your paperwork in order before you open. You&apos;ll generally need:</AP>
          <Bullets items={[
            <><strong>DTI</strong> (sole proprietor) or <strong>SEC</strong> (corporation/partnership) registration for your business name.</>,
            <><strong>Barangay Clearance</strong> and <strong>Mayor&apos;s / Business Permit</strong> from your LGU.</>,
            <><strong>Sanitary Permit</strong> from your Local Health Office, renewed annually.</>,
            <>An <strong>Operational Permit</strong> and a <strong>Certificate of Potability</strong> before you sell a single gallon.</>,
            <><strong>BIR registration</strong> for your TIN, official receipts, and books of accounts.</>,
            <>Health certificates for staff who handle the water and containers, typically chest X-ray, urinalysis and fecalysis.</>,
          ]} />
          <AP>
            Budget for the paperwork itself. These are the ranges most stations report, though every LGU sets its own
            schedule of fees and the spread between a small municipality and a city can be wide.
          </AP>
          <CostTable
            rows={[
              ["DTI business name registration", "₱500 – ₱1,000"],
              ["Barangay clearance", "₱200 – ₱500"],
              ["Mayor's / business permit", "₱2,000 – ₱7,000"],
              ["Sanitary permit", "₱1,000 – ₱3,000"],
              ["BIR registration", "₱500 – ₱1,000"],
              ["Water quality testing (initial)", "₱1,000 – ₱5,000"],
              ["Health and safety seminar", "₱1,000 – ₱3,000"],
            ]}
            note="Indicative ranges compiled from published Philippine startup guides, last updated February 2025. Fees are set per LGU and change, confirm the current schedule with your own city or municipal hall before you budget."
          />

          <AH2>Step 3: Know the water standard you are actually held to</AH2>
          <AP>
            This is the part most guides get wrong, and it is the part that closes stations. The rules for refilling
            stations are set by the <strong>Philippine National Standards for Drinking Water of 2017</strong>, issued as
            DOH Administrative Order No. 2017-0010 on 23 June 2017. It replaced the 2007 edition that a lot of older
            advice still quotes, so check the date on anything you read, including this page.
          </AP>
          <AP>
            Two of its numbers are specific to refilling stations and differ from the general drinking-water standard.
            Your product water must sit at <strong>pH 5 to 7</strong>, and total dissolved solids must
            <strong> not exceed 10 mg/L</strong>. The order is explicit about why: that TDS ceiling exists to prove your
            reverse osmosis or distillation process is actually working. A station that passes on bacteria but drifts
            above 10 mg/L is still out of compliance.
          </AP>
          <CostTable
            rows={[
              ["Total coliform", "One sample per month"],
              ["Thermotolerant coliform / E. coli", "One sample per month"],
              ["Heterotrophic plate count", "One sample per month"],
              ["All mandatory physico-chemical parameters", "Two samples per year"],
              ["Other parameters set by your LDWQMC", "One sample per year, or as required"],
            ]}
            note="Minimum sampling frequency for water refilling stations, PNSDW 2017, Annex C, Table C-4. Testing must be done by a DOH-accredited laboratory."
          />
          <AP>
            The pass marks on the microbiological side are tight: heterotrophic plate count below{" "}
            <strong>500 CFU/mL</strong>, and total coliform and E. coli both below <strong>1.1 MPN/100 mL</strong>.
            Separately, DOH Administrative Order No. 2014-0027 requires every drinking-water service provider to write
            and actually run a <strong>Water Safety Plan</strong>, which your sanitary inspector can ask to see.
          </AP>
          <Cite>
            Sources: DOH Administrative Order No. 2017-0010, <em>Philippine National Standards for Drinking Water of
            2017</em> (signed 23 June 2017), scope §III, standards §3.B and Annex C Table C-4; DOH Administrative Order
            No. 2014-0027, <em>National Policy on Water Safety Plan</em>. Permit and fee ranges are from secondary
            Philippine startup guides and vary by LGU. Confirm anything you are about to spend money on with your LGU
            and a DOH-accredited laboratory.
          </Cite>

          <AH2>Step 4: Choose a good location</AH2>
          <AP>
            Location is everything. Look for a densely populated residential area with foot traffic, parking for a
            delivery vehicle, a reliable water source, and stable electricity. Avoid spots already crowded with
            competing stations. A corner near subdivisions, schools, or offices is ideal.
          </AP>

          <AH2>Step 5: Set up your equipment</AH2>
          <Bullets items={[
            "A purification system, reverse osmosis (RO) is the most common for purified water; add a mineralizer if you want mineral water.",
            "Storage tanks, a filling station, and sealing/cap equipment.",
            "An initial fleet of clean 5-gallon (round) containers to lend and sell.",
            "Optional delivery vehicle for home and office delivery routes.",
          ]} />

          <AH2>Step 6: Price your water and plan delivery routes</AH2>
          <AP>
            Most stations sell a 5-gallon refill for ₱20–₱30 at the store, with a small surcharge for delivery. Decide
            whether you'll charge a <strong>container deposit</strong> so customers return your bottles. Then group your
            delivery customers into routes (by barangay or street) so your rider runs an efficient round.
          </AP>

          <AH2>Step 7: Run the day-to-day without a notebook</AH2>
          <AP>
            Once you open, the real work begins: tracking who ordered, who paid, how much stock you have, and, the
            tricky one, <strong>which customers are still holding your containers</strong>. Doing this on paper is where
            stations lose money. Software keeps it all straight:
          </AP>
          <Bullets items={[
            "Record every delivery order and move it from pending to delivered.",
            "Track each customer's container deposit, bottles lent out minus returned.",
            "Log empties customers drop off, and refill them back into sellable stock.",
            "Accept Cash or GCash and see unpaid balances at a glance.",
            "Watch daily revenue and low-stock alerts on one dashboard.",
          ]} />

          <SoftwarePitch />

          <AH2>Frequently asked questions</AH2>
          <FAQList faqs={FAQS} />
        </Animate>
      </article>

      <CTA />
      <InternalLinks
        cluster="water-refilling"
        currentPath="/water-refilling/how-to-start-water-refilling-station-business-philippines"
      />
      <Footer />
    </main>
  )
}
