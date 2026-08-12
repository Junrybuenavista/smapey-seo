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
        badge="Philippines · Buyer's guide"
        title={<>Water refilling station business package in the Philippines</>}
        intro="Thinking of buying a ready-made water refilling station package? Here's what's typically inside, how much it costs, what to check before you pay, and the one thing almost every package leaves out."
      />

      <article className="max-w-3xl mx-auto px-6 py-16">
        <Animate>
          <AH2>What is a water refilling station business package?</AH2>
          <AP>
            A business package is a bundled, ready-to-install setup sold by water equipment suppliers. Instead of sourcing
            each component yourself, you buy a complete kit, purification system, tanks, filling station, and containers,
            usually with installation and basic training included. It's the fastest way to open a station.
          </AP>

          <AH2>What's usually included</AH2>
          <Bullets items={[
            <><strong>Purification system</strong>, reverse osmosis (purified) and/or a mineralizer (mineral water).</>,
            <><strong>Storage tanks</strong> for raw and product water.</>,
            <><strong>Filling &amp; sealing station</strong> for round (5-gallon) and small bottles.</>,
            <><strong>Initial containers</strong>, a starter set of bottles to sell and lend.</>,
            <><strong>Plumbing &amp; installation</strong> at your location.</>,
            <><strong>Basic operator training</strong> and sometimes signage or marketing materials.</>,
          ]} />

          <AH2>Typical package price ranges</AH2>
          <CostTable
            rows={[
              ["Basic purified (RO) package", "₱150,000 – ₱250,000"],
              ["Purified + mineral package", "₱250,000 – ₱400,000"],
              ["Complete package + delivery setup", "₱400,000 – ₱600,000+"],
              ["Franchise package (with brand/royalty)", "₱300,000 – ₱1,000,000+"],
            ]}
            note="Indicative ranges. Confirm output capacity (liters/day), warranty, and what installation/training is included."
          />

          <AH2>What to check before you pay</AH2>
          <Bullets items={[
            "Daily output capacity, make sure it matches your target sales volume.",
            "Whether installation, delivery, and training are included or extra.",
            "Warranty and after-sales support for the equipment.",
            "Quality of containers and how many are included.",
            "Whether the water output can pass DOH/LGU potability testing.",
            "For franchises: royalty fees, brand rules, and supply restrictions.",
          ]} />

          <AH2>The one thing packages don't include</AH2>
          <AP>
            Packages sell you the <em>equipment</em>, but not a way to <em>run the business</em>. Once you're open, you
            still have to track every delivery, who paid, how much stock you have, and which customers are holding your
            containers. Most new owners do this in a notebook and quietly lose bottles and unpaid balances.
          </AP>
          <AP>
            Pair your package with management software and you close that gap. <strong>Smapey Water</strong> is free to
            start and handles the daily operations a package never will:
          </AP>
          <Bullets items={[
            "Delivery orders with auto ticket numbers and status tracking.",
            "Container deposit tracking, always know who has your bottles.",
            "Returns and one-click refills to keep stock accurate.",
            "Cash/GCash payments, unpaid balances, and a revenue dashboard.",
          ]} />

          <SoftwarePitch />

          <AH2>Frequently asked questions</AH2>
          <FAQList faqs={FAQS} />
        </Animate>
      </article>

      <CTA />
      <InternalLinks
        cluster="water-refilling"
        currentPath="/water-refilling/water-refilling-station-business-package-philippines"
      />
      <Footer />
    </main>
  )
}
