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
        badge="Philippines · Sample plan"
        title={<>Business plan for a water refilling station in the Philippines</>}
        intro="Use this sample outline to write a clear, fundable business plan for your water refilling station. It covers every section a lender or partner expects, with Philippine-specific numbers you can adapt."
      />

      <article className="max-w-3xl mx-auto px-6 py-16">
        <Animate>
          <AH2>1. Executive summary</AH2>
          <AP>
            One page that summarizes the whole plan: your station's name and location, what you sell (purified and/or
            mineral water in 5-gallon and small bottles), who you sell to (households, offices, sari-sari stores),
            your startup capital, and your projected monthly profit and break-even.
          </AP>

          <AH2>2. Company description</AH2>
          <Bullets items={[
            "Business name and legal structure (sole proprietor via DTI, or corporation via SEC).",
            "Location and why it was chosen (population density, water source, competition).",
            "Mission: clean, affordable drinking water with reliable delivery.",
          ]} />

          <AH2>3. Market analysis</AH2>
          <AP>
            Describe your target barangays, estimated number of households and offices, and your direct competitors.
            Identify your edge, faster delivery, lower price, better container handling, or office contracts. Demand for
            drinking water is constant year-round, which de-risks the business.
          </AP>

          <AH2>4. Products &amp; pricing</AH2>
          <CostTable
            rows={[
              ["5-gallon refill (store)", "₱20 – ₱30"],
              ["5-gallon refill (delivered)", "₱25 – ₱40"],
              ["Small bottled water (500ml–1L)", "₱8 – ₱20"],
              ["New container (with deposit)", "₱150 – ₱250"],
            ]}
            note="Set a container deposit so bottles come back. Prices vary by area, research local rates."
          />

          <AH2>5. Startup costs</AH2>
          <CostTable
            rows={[
              ["Purification system", "₱80,000 – ₱250,000"],
              ["Containers & initial stock", "₱20,000 – ₱60,000"],
              ["Store deposit & renovation", "₱20,000 – ₱100,000"],
              ["Permits & registration", "₱5,000 – ₱20,000"],
              ["Delivery vehicle (optional)", "₱20,000 – ₱70,000"],
              ["Working capital", "₱10,000 – ₱40,000"],
            ]}
            note="A typical small station starts around ₱200,000–₱300,000."
          />

          <AH2>6. Operations plan</AH2>
          <AP>Explain how the station runs day to day:</AP>
          <Bullets items={[
            "Daily purification, filling, and sanitation routine.",
            "Store hours and delivery schedule by route/barangay.",
            "Container handling, deposits, returns, and refilling empties.",
            "Staffing: operator, cashier, and delivery rider roles.",
            <>A <strong>management system</strong> to track orders, containers, stock, and payments (e.g. Smapey Water).</>,
          ]} />

          <AH2>7. Marketing plan</AH2>
          <Bullets items={[
            "Signage and a grand-opening promo (free first refill or discounted deposit).",
            "Facebook page and barangay group posts with your delivery number.",
            "Office and sari-sari store contracts for steady bulk orders.",
            "Loyalty perks for customers who return containers on time.",
          ]} />

          <AH2>8. Financial projections</AH2>
          <AP>
            Show a simple monthly model: projected refills × price = revenue; minus rent, utilities, salaries, supplies,
            and maintenance = net profit. Then divide your startup cost by monthly net profit to estimate break-even.
          </AP>
          <Example />

          <SoftwarePitch />

          <AH2>Frequently asked questions</AH2>
          <FAQList faqs={FAQS} />
        </Animate>
      </article>

      <CTA />
      <InternalLinks
        cluster="water-refilling"
        currentPath="/water-refilling/business-plan-for-water-refilling-station-philippines"
      />
      <Footer />
    </main>
  )
}

function Example() {
  return (
    <div className="my-6 rounded-2xl bg-slate-900 p-6 text-sm">
      <p className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-3">Sample monthly model</p>
      <div className="space-y-1.5 text-white/70">
        <div className="flex justify-between"><span>Revenue (120 refills/day × ₱25 × 26 days)</span><span className="font-semibold text-white">₱78,000</span></div>
        <div className="flex justify-between"><span>Rent</span><span>− ₱10,000</span></div>
        <div className="flex justify-between"><span>Utilities (water + power)</span><span>− ₱12,000</span></div>
        <div className="flex justify-between"><span>Salaries (2 staff)</span><span>− ₱18,000</span></div>
        <div className="flex justify-between"><span>Supplies & maintenance</span><span>− ₱8,000</span></div>
        <div className="flex justify-between border-t border-white/10 pt-2 mt-2 text-white font-bold"><span>Estimated net profit</span><span>≈ ₱30,000</span></div>
      </div>
      <p className="text-xs text-white/40 mt-3">Illustrative only. ₱250,000 startup ÷ ₱30,000 ≈ 8–9 months to break even.</p>
    </div>
  )
}
