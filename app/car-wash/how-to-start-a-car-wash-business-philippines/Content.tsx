"use client"

import InternalLinks from "@/components/InternalLinks"
import {
  Navbar, Footer, CTA, ArticleHero, AH2, AP, Bullets, KeyFacts, CostTable, Cite,
  FAQList, SoftwarePitch, INK, PRICES_PATH,
} from "@/components/car-wash/shared"

const PLAN_PATH = "/car-wash/car-wash-business-plan-philippines"
const NAMES_PATH = "/car-wash/car-wash-name-ideas"
const TARPAULIN_PATH = "/car-wash/car-wash-tarpaulin-design"
import { FAQS } from "./faqs"

export default function Content() {
  return (
    <main className="bg-white">
      <Navbar />

      <ArticleHero
        badge="Philippines · Step-by-step"
        title={<>How to start a car wash business in the Philippines</>}
        intro="A car wash looks simple: water, soap, a pressure washer and a lot. What decides whether it works is mostly what guides skip: what the wash water does after it leaves your bay, the permit that goes with it, and how you pay the crew. Here's the whole thing, in order."
      />

      <article className="max-w-3xl mx-auto px-6 py-16">
        <KeyFacts items={[
          { k: "Starting in a rented space", v: "₱106,000 in one 2023 budget" },
          { k: "Building a 3-bay site", v: "₱1.6M to ₱2.7M in building works" },
          { k: "Permit most owners miss", v: "DENR wastewater discharge permit" },
          { k: "Water per car", v: "About 57 litres by hand" },
        ]} />

        <AH2>Step 1: Decide what kind of car wash you&apos;re opening</AH2>
        <AP>The money, the space and the permits all follow from this, so decide it first.</AP>
        <Bullets items={[
          <><strong>Hand wash at a fixed spot.</strong> Washers with pressure washers, foam and towels, in bays you rent or build. This is the model the rest of this guide assumes.</>,
          <><strong>Motor wash.</strong> The same idea for motorcycles, with smaller bays and lower prices per wash. Some shops wash both cars and motorcycles.</>,
          <><strong>Self-service.</strong> Customers wash their own car on a coin-operated timer.</>,
          <><strong>Automatic or touchless.</strong> A machine moves over the car in a bay. Far more equipment, far less labour.</>,
          <><strong>Mobile.</strong> You go to the customer&apos;s home or office, booked by phone or app.</>,
          <><strong>Detailing shop.</strong> Restores a car inside and out, including upholstery cleaning, polishing and waxing, at much higher prices per car.</>,
        ]} />
        <AP>
          Franchises exist too. Moneymax&apos;s 2023 guide named Speedy1 Carwash, Zorro Contactless Carwash and Nice Day!
          Carwash as popular brands. We couldn&apos;t find franchise package prices we could verify, so ask each brand
          directly and compare what&apos;s included.
        </AP>

        <AH2>Step 2: Find the location, and check it fits</AH2>
        <AP>
          Look for steady traffic: highways, subdivisions and shopping areas. Stay away from an existing car wash where
          you can, and check that zoning allows a car wash on the lot before you sign anything. Then check the size,
          because a car wash needs more paved space than most people picture.
        </AP>
        <Bullets items={[
          "No Philippine code sets the size of a wash bay. AEDO Construction, a firm of licensed civil engineers, plans a hand-wash bay at about 4.5 by 8.0 metres, which leaves room to walk around a car with a wand and open its doors to vacuum.",
          "Cars also queue before the wash and dry after it. The National Building Code's rules size a parking slot at 2.50 by 5.00 metres, and AEDO allows two such slots per bay plus about 35% for the driveway.",
          "Put together, AEDO's three-bay hand wash needs roughly 250 square metres of paved area before you add an office or waiting area.",
        ]} />
        <Cite>
          AEDO Construction, &ldquo;Car Wash Construction Cost Philippines 2026: Bays, Drains, Permits&rdquo;, 18 September 2026.
          The bay size, slots per bay and driveway allowance are AEDO&apos;s planning estimates, not code values; the
          parking slot size is from the 2004 Revised IRR of PD 1096, Rule VII Sec. 707(4).
        </Cite>

        <AH2>Step 3: Budget for the shop you&apos;re actually building</AH2>
        <AP>
          Published figures for &ldquo;starting a car wash&rdquo; range from about a hundred thousand pesos to a few million,
          because they describe two different shops. One rents a space that&apos;s already paved and starts washing. The
          other builds bays, drains and a roof on its own lot.
        </AP>
        <p className="font-extrabold mt-8 mb-1" style={{ color: INK }}>Starting in a rented space</p>
        <CostTable
          rows={[
            ["Car wash space rental", "₱40,000 a month"],
            ["Equipment, such as a pressure washer", "₱30,000"],
            ["Labour, at least two people", "₱25,000 a month"],
            ["Supplies: soap, towels and the like", "₱3,000 a month"],
            ["Electricity", "₱3,000 a month"],
            ["Water", "₱2,000 a month"],
            ["Marketing", "₱3,000"],
          ]}
          total={["Total", "₱106,000"]}
          note="Moneymax's example, last updated July 2023. It's one month of running costs plus a starter equipment set, with no line for permits, a rental deposit or any building work. Moneymax called the figures estimates that move with other factors."
        />
        <p className="font-extrabold mt-8 mb-1" style={{ color: INK }}>Building a three-bay hand wash</p>
        <CostTable
          rows={[
            ["Wash bay slab and trench drains, 108 m²", "₱302,400 – ₱453,600"],
            ["Queue, drying and driveway paving, 139 m²", "₱222,480 – ₱305,910"],
            ["Steel canopy over the bays, 124 m² of roof", "₱372,600 – ₱683,100"],
            ["Office, waiting room and CR, 20 m²", "₱400,000 – ₱700,000"],
            ["Silt pit, oil separator and recycle tank, 2.5 m³", "₱75,000 – ₱112,500"],
            ["Water tank, pump and supply piping", "₱80,000 – ₱180,000"],
            ["Outfall line and sampling pit", "₱25,000 – ₱60,000"],
            ["Contingency, 10%", "₱147,748 – ₱249,511"],
          ]}
          total={["Building works", "₱1,625,228 – ₱2,744,621"]}
          note="AEDO Construction's 2026 planning rates for a three-bay hand wash, published 18 September 2026. It leaves out the land or lease, the washing equipment, deep well drilling, an electrical service upgrade, permit and professional fees, and signage."
        />
        <AP>
          Renting a paved space, the first table is your starting point. Building, the second comes first, and the first
          still applies once you open. Either way, keep building works and equipment in separate budgets: they&apos;re
          priced differently and bought from different people. To turn this into a plan a lender will read, use our{" "}
          <a href={PLAN_PATH} className="font-bold underline" style={{ color: INK }}>car wash business plan sample</a>, which
          has a break-even calculator.
        </AP>

        <AH2>Step 4: Register the business and line up the permits</AH2>
        <AP>
          The order varies by LGU, so treat this as the list rather than the schedule. If you still need a name, start
          with our <a href={NAMES_PATH} className="font-bold underline" style={{ color: INK }}>car wash name ideas</a> and
          check it on the DTI&apos;s name search before you register.
        </AP>
        <Bullets items={[
          <><strong>DTI</strong> business name registration if you trade under a brand name, or <strong>SEC</strong> for a partnership or corporation.</>,
          <><strong>Barangay clearance</strong> for the address, then the <strong>Mayor&apos;s or Business Permit</strong> from your city or municipal hall.</>,
          <><strong>BIR registration</strong> for your Certificate of Registration, invoices and books of accounts.</>,
          <><strong>Fire Safety Inspection Certificate</strong> from the Bureau of Fire Protection, which the business permit asks for.</>,
          <><strong>Building permit</strong> from the Office of the Building Official if you build or renovate: the canopy, slab, office, plumbing and electrical.</>,
          <><strong>Wastewater discharge permit</strong> from the DENR Environmental Management Bureau, with the ECC or Certificate of Non-Coverage the application asks for. This is the one specific to car washes, and it has its own step below.</>,
          <><strong>Water permit</strong> if you&apos;ll draw your own groundwater. Confirm the process with the National Water Resources Board.</>,
        ]} />
        <Cite>
          Permit list from AEDO Construction&apos;s car wash guide (18 September 2026) and Moneymax (July 2023). The water
          permit rule is the Water Code, PD 1067, Article 13.
        </Cite>

        <AH2>Step 5: Plan for the wash water before you pour concrete</AH2>
        <AP>
          Wash water carries sand and road grit, oil from underbodies, and soap. Once it leaves your lot it is wastewater
          under the Clean Water Act, and that has rules most new owners hear about only after opening.
        </AP>
        <Bullets items={[
          <><strong>You need a permit to discharge.</strong> RA 9275 Section 14 requires one, and its implementing rules (DAO 2005-10, Rule 14.1) say anyone who discharges wastewater into Philippine waters or land must get a wastewater discharge permit from the EMB Regional Office. Letting it soak into your own lot is still a discharge to land.</>,
          <><strong>The first application needs an engineer&apos;s report</strong>, prepared by a registered chemical or sanitary engineer or a pollution control officer, covering your water use, the treatment and the receiving water body (Rule 14.3).</>,
          <><strong>Timing and validity.</strong> The Regional Office acts within 30 working days of a complete application (Rule 14.4), and the permit lasts up to five years, renewable (Rule 14.9).</>,
          <><strong>The fee is small; the fine is not.</strong> The 2005 schedule set the yearly fee at ₱2,000 below 10 cubic metres a day without heavy metals, or ₱2,600 with (Rule 14.5); ask your EMB office for the current figure. Discharging without a permit carries fines of ₱10,000 to ₱200,000 for every day of violation (RA 9275 Section 28).</>,
        ]} />
        <AP>
          The limits are tight. Car washing is PSIC subclass 45204, and for a Class C water body DAO 2016-08 allows only{" "}
          <strong>5 mg/L of oil and grease</strong>, 100 mg/L of suspended solids, 15 mg/L of surfactants and a pH of 6.0 to 9.5.
          That&apos;s why the drainage matters more than the brand of pressure washer:
        </AP>
        <Bullets items={[
          "Slope every bay to a trench drain, and send all wash water through a silt pit and an oil-and-grease separator before it leaves the lot.",
          "Keep roof rainwater out of that line, or collect it for washing. Rain running through the separator flushes the silt out.",
          "Use biodegradable detergent and don't overdose it. A simple separator doesn't remove soap well.",
          "Plan who empties the separator, and use a licensed hauler for the sludge.",
          "Toilets go to their own septic tank, never into the wash-water line.",
        ]} />
        <Cite>
          Republic Act No. 9275 (Philippine Clean Water Act of 2004), Sections 14, 27 and 28; DENR Administrative Order
          No. 2005-10, Rules 14.1, 14.3, 14.4, 14.5 and 14.9; DENR Administrative Order No. 2016-08, Tables 8 and 9; PSA
          PSIC subclass 45204. As summarised in AEDO Construction&apos;s guide of 18 September 2026, which also gives the
          drainage practice above. Your EMB Regional Office is the authority on what applies to your lot.
        </Cite>

        <AH2>Step 6: Buy the equipment</AH2>
        <AP>Hardware stores, suppliers, and Lazada or Shopee carry most of it. A starter list:</AP>
        <Bullets items={[
          "High-pressure washers and water hoses",
          "A foam cannon, buckets, wash brushes and sponges",
          "Wheel and tire brushes",
          "Car shampoo, glass cleaner and upholstery cleaner",
          "Microfiber cloths, drying towels and rags",
          "An air blower and vacuum cleaners",
          "A two-step ladder for vans and pick-ups",
          "A car polisher, car wax and wax applicators",
        ]} />
        <AP>
          Price it from three supplier quotes. AEDO deliberately publishes no peso range for car wash equipment, because
          the spread between brands, and between new and second-hand, is wider than any range would be honest about.
          For a sense of scale, Moneymax&apos;s 2023 budget put equipment such as a pressure washer at ₱30,000.
        </AP>

        <AH2>Step 7: Work out the water</AH2>
        <AP>
          The best published per-car figures are American, from the US EPA: about <strong>57 litres per vehicle</strong> for
          hand-held wand washing, which is closest to a hand wash with a pressure washer, and about <strong>170 litres</strong>{" "}
          for an in-bay automatic. At 57 litres, every 100 cars is about 5.7 cubic metres of water. Check your own meter
          in the first week, then price the water into each car.
        </AP>
        <AP>
          If you plan to use a well, budget for the permit as well as the drilling. The Water Code lets a landowner use
          groundwater for domestic purposes without a permit, and a car wash isn&apos;t domestic use. Recycling can cut water
          use, but at minimum a reclaim system has to separate grit, oil and grease, and it pays best on busy automatic
          bays. On a small hand wash, get the separator right first and treat recycling as the upgrade.
        </AP>
        <Cite>
          US EPA, WaterSense at Work, Section 5.4 Vehicle Washes (EPA-832-F-23-003, November 2023); Presidential Decree
          No. 1067, the Water Code of the Philippines, Articles 6 and 13. Both as summarised in AEDO Construction&apos;s guide of
          18 September 2026.
        </Cite>

        <AH2>Step 8: Hire and pay the crew</AH2>
        <AP>
          A car wash is physical work in the sun, so hire for stamina, and train anyone who will do detailing or run
          machines. Then decide how they&apos;re paid: a daily rate, a share of each car they wash, or a mix. A share of
          each car pays more on busy days and less on slow ones.
        </AP>
        <AP>
          Whatever you choose, the Labor Code sets a floor. Workers paid by results, including piecework, pakyaw, takay
          or task basis, must receive at least the prescribed minimum wage for eight hours of work a day, or a
          proportion of it for less. A share-per-car scheme still has to reach the regional minimum wage on a full day.
        </AP>
        <Cite>
          Labor Code of the Philippines, Article 124 as amended by RA 6727, paragraph 8; see also Article 101 on payment
          by results. Check the current minimum wage for your region with DOLE.
        </Cite>

        <AH2>Step 9: Set your prices and put them up</AH2>
        <AP>
          Price by vehicle size, check three shops near you, and know what a car costs you in water, soap, electricity
          and the washer&apos;s share. On published price lists, a plain wash averaged ₱130 for a sedan and ₱160 for an SUV,
          mostly from 2020; Moneymax&apos;s 2023 guide put a car wash at ₱200 to ₱500. Our{" "}
          <a href={PRICES_PATH} className="font-bold underline" style={{ color: INK }}>car wash price list for the Philippines</a>{" "}
          has the full table by size, with the motor wash price and the sources.
        </AP>
        <AP>
          Then put the price list where customers see it before they pull in. A tarpaulin by the entrance settles the
          price before the wash, not after, and our{" "}
          <a href={TARPAULIN_PATH} className="font-bold underline" style={{ color: INK }}>free tarpaulin maker</a> makes a
          print-ready one from your prices.
        </AP>

        <AH2>Step 10: Run the day without leaks</AH2>
        <AP>
          A car wash runs on cash the crew handles, often while the owner is somewhere else. Money leaks in two ways: cars
          that never get written down, and prices that change at the counter. Crew pay is the other daily headache,
          worked out by hand at closing. What you need to track is small but constant:
        </AP>
        <Bullets items={[
          "Every car, by plate, with the time and who washed it.",
          "The price from a fixed board, and a record whenever someone charges something else.",
          "Cash apart from GCash and Maya, since only the cash should be in the drawer.",
          "Money taken out of the drawer for supplies and meals.",
          "At closing: what the drawer should hold, what it does hold, and each washer's share.",
        ]} />

        <SoftwarePitch />

        <AH2>Frequently asked questions</AH2>
        <FAQList faqs={FAQS} />
      </article>

      <CTA />
      <InternalLinks cluster="car-wash" currentPath="/car-wash/how-to-start-a-car-wash-business-philippines" />
      <Footer />
    </main>
  )
}
