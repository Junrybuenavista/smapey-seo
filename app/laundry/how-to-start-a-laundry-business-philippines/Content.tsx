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
        title={<>How to start a laundry business in the Philippines</>}
        intro="Laundry is one of the few small businesses where the customer comes back every week without being sold to. It is also one where the published startup figures range from ₱150,000 to over ₱2 million, which makes planning almost impossible until you know why. Here is the whole thing, in order."
      />

      <article className="max-w-3xl mx-auto px-6 py-16">
        <Animate>
          <AH2>Step 1: Work out which of the three laundry businesses you are starting</AH2>
          <AP>
            Almost every confusing number you will read about this business comes from guides quoting one model&apos;s
            costs while you are planning another. There are three, and the capital between them differs by more than ten
            times.
          </AP>
          <Bullets items={[
            <><strong>Drop-off shop, you do the work.</strong> Customers leave a bag, you wash, dry and fold it, they collect. Smallest space, fewest machines, lowest capital. This is where most Philippine laundry businesses actually start.</>,
            <><strong>Full-service shop with staff.</strong> The same thing at scale, with hired hands, more machines, often pick-up and delivery. More rent, more payroll, more throughput.</>,
            <><strong>Self-service laundromat.</strong> Customers operate the machines themselves. Your labour cost collapses and your equipment cost explodes, because you are buying an entire floor of commercial washers and dryers before you take a single peso.</>,
          ]} />
          <AP>
            Pick one before you price anything. A laundromat budget applied to a drop-off shop will scare you off a
            perfectly good business; a drop-off budget applied to a laundromat will strand you halfway through the
            fit-out.
          </AP>

          <AH2>Step 2: Budget the real startup cost</AH2>
          <AP>
            For a standard shop, published Philippine startup breakdowns land in this shape. Treat the top of each range
            as a city-centre location and the bottom as a provincial one.
          </AP>
          <CostTable
            rows={[
              ["Business registration and permits", "₱5,000 – ₱20,000"],
              ["Rental deposit and advance rent", "₱10,000 – ₱50,000+"],
              ["Renovation and improvements", "₱20,000 – ₱100,000+"],
              ["Laundry equipment", "₱100,000 – ₱500,000+"],
              ["Initial supplies and inventory", "₱5,000 – ₱15,000"],
              ["Marketing and signage", "₱5,000 – ₱20,000"],
              ["Working capital", "₱20,000 – ₱50,000+"],
              ["Total", "₱165,000 – ₱645,000+"],
            ]}
            note="Indicative ranges from published Philippine startup guides, last updated December 2024. A self-service laundromat sits well above this; franchise packages have been published at ₱1.8M to ₱2.4M. Confirm current prices with your own suppliers and LGU."
          />

          <AH2>Step 3: Register the business and secure permits</AH2>
          <AP>Get the paperwork moving early, because the fire and occupancy inspections gate your opening date.</AP>
          <Bullets items={[
            <><strong>DTI</strong> registration for a sole proprietorship, or <strong>SEC</strong> for a partnership or corporation.</>,
            <><strong>Barangay Business Clearance</strong> for the specific address.</>,
            <><strong>Mayor&apos;s / Business Permit</strong> from your city or municipal hall.</>,
            <><strong>BIR registration</strong> for your Certificate of Registration, official receipts and books of accounts.</>,
            <><strong>Sanitary Permit</strong> from your local health office, plus health certificates for staff.</>,
            <><strong>Fire Safety Inspection Certificate</strong> and an <strong>Occupancy Permit</strong> for the space.</>,
            <>Your <strong>Cedula</strong> and your contract of lease or proof of ownership.</>,
          ]} />

          <AH2>Step 4: Know the sanitation rules that apply specifically to laundries</AH2>
          <AP>
            This is the part almost every laundry guide leaves out. A laundry is not just another shop that needs a
            sanitary permit. Public laundries have <strong>their own chapter in the Code on Sanitation of the
            Philippines</strong> &mdash; Presidential Decree 856, Chapter V &mdash; with implementing rules covering the
            sanitary permit itself, how the premises must be built and drained, how soiled and clean linen must be kept
            apart, and what happens to your wastewater.
          </AP>
          <AP>
            Wastewater is the requirement that catches people out. The rules expect a laundry to run an approved
            treatment process rather than send wash water straight into a drain. Separately, under <strong>DENR
            Administrative Order 2016-08</strong>, establishments identified as needing a wastewater discharge permit
            must obtain one, and where no public sewerage system is available the shop is expected to install its own
            onsite treatment with effluent meeting DENR standards.
          </AP>
          <AP>
            Whether that lands on a five-machine shop or only on larger operations depends on your volume and your
            location. Ask before you sign a lease, not after you have poured a slab: a space that cannot be drained
            compliantly is a space you cannot use.
          </AP>
          <Cite>
            Governing instruments: Presidential Decree No. 856, <em>Code on Sanitation of the Philippines</em>,
            Chapter V &ldquo;Public Laundry&rdquo; and its Implementing Rules and Regulations; DENR Administrative Order
            No. 2016-08. We were not able to verify individual section numbers against the primary text, so treat the
            summary above as a prompt to ask rather than a substitute for the regulation. Your City or Municipal Health
            Office and your regional DENR office are the authorities on what applies to your shop.
          </Cite>

          <AH2>Step 5: Choose and size your machines</AH2>
          <AP>
            Equipment is the largest single line in your budget and the one worth slowing down on. Published Philippine
            ranges put commercial washing machines at roughly <strong>₱55,500 to ₱102,500</strong> and dryers at{" "}
            <strong>₱22,000 to ₱88,750</strong>, with a top-load machine typically costing around half of a comparable
            front-load.
          </AP>
          <Bullets items={[
            "Most small shops run up to about five washers with matching dryers, sized to the busiest day rather than the average one.",
            "Commercial machines are generally rated around 10 to 14 years, or roughly 5,000 cycles, so judge them on cost per cycle rather than sticker price.",
            "Dryers, not washers, are usually the bottleneck in the Philippines, particularly through the rainy season. Under-buying dryers is the most common sizing mistake.",
            "Check the electrical supply of the unit before you commit. Upgrading a service to run several commercial machines can cost more than a machine.",
          ]} />
          <Cite>
            Equipment ranges compiled from published Philippine laundry business guides (2024&ndash;2025). Machine prices
            move with the exchange rate and the supplier, so quote your own before budgeting.
          </Cite>

          <AH2>Step 6: Work out the monthly numbers before you commit</AH2>
          <AP>Running costs for a standard shop tend to fall in these bands:</AP>
          <CostTable
            rows={[
              ["Rent", "₱10,000 – ₱50,000+"],
              ["Utilities (water and electricity)", "₱5,000 – ₱20,000+"],
              ["Salaries and wages", "₱10,000 – ₱50,000+"],
              ["Detergent and supplies", "₱5,000 – ₱15,000+"],
              ["Maintenance and repairs", "₱2,000 – ₱10,000+"],
              ["Marketing", "₱2,000 – ₱10,000+"],
            ]}
            note="Indicative monthly ranges from published Philippine guides, last updated December 2024."
          />
          <AP>
            One published worked example, at laundromat scale, puts monthly gross revenue near{" "}
            <strong>₱120,000</strong> against roughly <strong>₱65,000</strong> of costs &mdash; ₱15,000 rent, ₱13,000
            wages, ₱2,000 maintenance, ₱10,000 detergent, ₱5,000 water and <strong>₱20,000 electricity</strong> &mdash;
            leaving about ₱55,000 profit. On a ₱2.5 million laundromat build that is a payback of a little under four
            years.
          </AP>
          <AP>
            Note which line is biggest. Electricity is usually the single largest variable cost in a Philippine laundry
            and the one that quietly decides whether the shop works. Model it at your own rate per kWh before you trust
            anyone&apos;s profit figure, including this one.
          </AP>
          <Cite>
            Worked example from a published Philippine laundry business guide, last updated June 2024, at
            self-service laundromat scale. Figures are illustrative, not a forecast, and a drop-off shop&apos;s numbers
            look nothing like these. Build your own model with your actual rent and electricity rate.
          </Cite>

          <AH2>Step 7: Run the day-to-day without a notebook</AH2>
          <AP>
            A laundry runs on knowing whose bag is whose. That is easy for the first ten customers and unmanageable by
            the fiftieth, and the failure mode is expensive: a lost load costs you the item, the customer and the
            review. What you actually need to track is small but relentless.
          </AP>
          <Bullets items={[
            "A claim stub on every drop-off, so a bag is never identified by memory.",
            "A status you can move as the load goes from washing to drying to folding to ready for pickup.",
            "Who has paid, who has not, and by what, cash, GCash, Maya or bank transfer.",
            "A customer record by phone number, so a regular's history is one search away.",
            "Today's orders, pending pickups and revenue on one screen at closing time.",
          ]} />

          <SoftwarePitch />

          <AH2>Frequently asked questions</AH2>
          <FAQList faqs={FAQS} />
        </Animate>
      </article>

      <CTA />
      <InternalLinks
        cluster="laundry"
        currentPath="/laundry/how-to-start-a-laundry-business-philippines"
      />
      <Footer />
    </main>
  )
}
