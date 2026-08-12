"use client"

import InternalLinks from "@/components/InternalLinks"
import {
  Navbar, Footer, CTA, Animate, ArticleHero,
  AH2, AP, Bullets, CostTable, FAQList, SoftwarePitch,
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
          <AP>Get your paperwork in order before you open. You'll generally need:</AP>
          <Bullets items={[
            <><strong>DTI</strong> (sole proprietor) or <strong>SEC</strong> (corporation/partnership) registration for your business name.</>,
            <><strong>Barangay Clearance</strong> and <strong>Mayor's / Business Permit</strong> from your LGU.</>,
            <><strong>Sanitary Permit</strong> and a <strong>water potability test</strong>, your output must pass DOH/LGU water quality standards.</>,
            <><strong>BIR registration</strong> for your TIN, official receipts, and books of accounts.</>,
            <>Health certificates for staff who handle the water and containers.</>,
          ]} />

          <AH2>Step 3: Choose a good location</AH2>
          <AP>
            Location is everything. Look for a densely populated residential area with foot traffic, parking for a
            delivery vehicle, a reliable water source, and stable electricity. Avoid spots already crowded with
            competing stations. A corner near subdivisions, schools, or offices is ideal.
          </AP>

          <AH2>Step 4: Set up your equipment</AH2>
          <Bullets items={[
            "A purification system, reverse osmosis (RO) is the most common for purified water; add a mineralizer if you want mineral water.",
            "Storage tanks, a filling station, and sealing/cap equipment.",
            "An initial fleet of clean 5-gallon (round) containers to lend and sell.",
            "Optional delivery vehicle for home and office delivery routes.",
          ]} />

          <AH2>Step 5: Price your water and plan delivery routes</AH2>
          <AP>
            Most stations sell a 5-gallon refill for ₱20–₱30 at the store, with a small surcharge for delivery. Decide
            whether you'll charge a <strong>container deposit</strong> so customers return your bottles. Then group your
            delivery customers into routes (by barangay or street) so your rider runs an efficient round.
          </AP>

          <AH2>Step 6: Run the day-to-day without a notebook</AH2>
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
