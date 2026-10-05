"use client"

import InternalLinks from "@/components/InternalLinks"
import {
  Navbar, Footer, CTA, ArticleHero, AH2, AP, Bullets, KeyFacts, CostTable, Cite, FAQList, SoftwarePitch,
  INK, AMBER, CREAM, PRICES_PATH, START_PATH,
} from "@/components/car-wash/shared"
import BreakEvenCalculator from "./BreakEvenCalculator"
import { FAQS } from "./faqs"

/** A fill-in sample paragraph for one section of the plan. */
function Sample({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-4 rounded-[14px] border-2 border-dashed px-4 py-3" style={{ borderColor: AMBER, background: CREAM }}>
      <p className="text-[10px] font-extrabold uppercase tracking-widest mb-1" style={{ color: "#b06c00" }}>Sample, fill in the brackets</p>
      <p className="text-sm leading-relaxed italic" style={{ color: INK }}>{children}</p>
    </div>
  )
}

function Part({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <div className="mt-10">
      <h3 className="text-lg font-extrabold tracking-tight mb-2" style={{ color: INK }}>{n}. {title}</h3>
      {children}
    </div>
  )
}

export default function Content() {
  return (
    <main className="bg-white">
      <Navbar />

      <ArticleHero
        badge="Philippines · Business plan"
        title={<>Car wash business plan: a sample for the Philippines</>}
        intro="A car wash business plan has to answer what a general template skips: how many cars your bays can wash in a day, what each car leaves after the washer's share and the supplies, and where your wash water goes. Here's a sample outline to fill in, section by section, and a calculator for the numbers."
      />

      <article className="max-w-3xl mx-auto px-6 py-16">
        <KeyFacts items={[
          { k: "Starting in a rented space", v: "₱106,000 in one 2023 budget" },
          { k: "Building a 3-bay site", v: "₱1.6M to ₱2.7M in building works" },
          { k: "A sedan wash", v: "₱130 typical, from 2020 price lists" },
          { k: "One hand-wash bay", v: "About 2 cars an hour, as a planning figure" },
        ]} />

        <AH2>Decide who the plan is for</AH2>
        <AP>The same plan reads differently to different people, so write it for the one who decides.</AP>
        <Bullets items={[
          <><strong>A bank or lending cooperative</strong> wants to see how you&apos;ll repay. The numbers and the assumptions behind them carry the plan.</>,
          <><strong>A partner or family member putting money in</strong> wants the risks laid out honestly, and what you&apos;ll do about each.</>,
          <><strong>Yourself.</strong> A plan you argue with before spending money is cheaper than finding out it was wrong after.</>,
        ]} />
        <AP>
          Moneymax&apos;s car wash guide points to a DTI business plan template with five parts: executive summary, marketing
          plan, operational plan, financial plan and organizational plan. The outline below covers all five, plus the parts
          a car wash needs that a general template doesn&apos;t ask for.
        </AP>
        <Cite>
          Moneymax, &ldquo;Wash and Earn: How to Start a Car Wash Business in the Philippines&rdquo;, by Jay Pagkatotohan, last
          updated 6 July 2023.
        </Cite>

        <AH2>The sample plan, section by section</AH2>
        <AP>Write the executive summary last. The rest is in the order a reader expects it.</AP>

        <Part n={1} title="Executive summary">
          <AP>One page that lets a reader stop and still know whether they&apos;re interested: what, where, how much, and when it pays for itself.</AP>
          <Sample>
            [Shop name] is a [hand car wash / car and motor wash] at [location], open [days and hours]. With [number] bays and
            [number] washers it can wash up to [daily capacity] cars a day, priced by vehicle size from ₱[sedan price] to
            ₱[van price]. It needs ₱[total] to open and breaks even at [break-even] cars a day.
          </Sample>
        </Part>

        <Part n={2} title="The business">
          <AP>
            Say which kind of car wash this is, because it changes every number after it: a hand wash at a fixed spot, a motor
            wash, both, a detailing shop, self-service, automatic, or mobile. The models are compared in our guide to{" "}
            <a href={START_PATH} className="font-bold underline" style={{ color: INK }}>starting a car wash in the Philippines</a>.
          </AP>
          <Sample>
            [Shop name] is a [model] for [cars / motorcycles / both], owned by [owner] as a [sole proprietorship / partnership
            / corporation]. It will offer [packages] and [add-ons], and plans to add [detailing / motorcycles] in [when].
          </Sample>
        </Part>

        <Part n={3} title="Market and location">
          <AP>
            For a car wash this is about one street, not the national market. Count the cars that pass at your busiest
            hour, list the car washes nearby and what they charge, and note who is around: subdivisions, offices, schools,
            terminals.
          </AP>
          <Sample>
            [Location] sees about [cars counted] cars an hour at [peak time]. The nearest car washes are [names], charging
            ₱[their sedan price] for a sedan wash. Our customers will be [who], and we will reach them by [tarpaulin,
            Facebook page, launch promo].
          </Sample>
        </Part>

        <Part n={4} title="Services and prices">
          <AP>
            List your packages and add-ons and price each by vehicle size. If you&apos;re not sure where to start, our{" "}
            <a href={PRICES_PATH} className="font-bold underline" style={{ color: INK }}>car wash price list for the Philippines</a>{" "}
            has typical prices by size, from published shop price lists.
          </AP>
          <Sample>
            Packages: [Wash], [Wash &amp; Vacuum]. Add-ons: [Wax], [Engine Wash], [Interior Detailing]. Prices by size:
            sedan or hatchback, SUV, AUV or MPV, pick-up, van[, motorcycle, big bike].
          </Sample>
        </Part>

        <Part n={5} title="Operations and capacity">
          <AP>
            How a car moves from the driveway to the drawer, who does what, and how many cars the shop can physically wash
            in a day. The calculation is below; it&apos;s the part a reader who knows the trade looks for first.
          </AP>
          <Sample>
            [Number] bays, open [hours] a day, [days] days a week. Each car is written down by plate with the services, the
            price from our board and who washed it. At closing, the cashier counts the drawer against what it should hold.
          </Sample>
        </Part>

        <Part n={6} title="Compliance">
          <AP>
            The business registrations every shop needs, plus the one specific to car washes: a wastewater discharge permit
            from the DENR Environmental Management Bureau, which needs an engineer&apos;s report. The full list is in our{" "}
            <a href={START_PATH} className="font-bold underline" style={{ color: INK }}>start-up guide</a>.
          </AP>
          <Sample>
            Registered with [DTI / SEC], barangay clearance and Mayor&apos;s Permit from [LGU], BIR registration, Fire Safety
            Inspection Certificate, and a DENR wastewater discharge permit, with wash water passing through a silt pit and an
            oil-and-grease separator before it leaves the lot.
          </Sample>
        </Part>

        <Part n={7} title="Management and crew">
          <AP>
            Who runs the counter, who counts the cash, and how washers are paid: a daily rate, a share of each car, or both.
            Whatever you choose, workers paid by results must still get at least the minimum wage for an eight-hour day.
          </AP>
          <Sample>
            [Owner] manages the shop and does the daily closing. [Number] washers are paid [rate or share], with at least
            the [region] minimum wage on a full day. [Name] runs the counter.
          </Sample>
          <Cite>
            Labor Code of the Philippines, Article 124 as amended by RA 6727, paragraph 8, on workers paid by results. Check
            the current minimum wage for your region with DOLE.
          </Cite>
        </Part>

        <Part n={8} title="The financial plan">
          <AP>Startup costs, monthly costs, revenue, and break-even, with the source of every figure. The worksheet and calculator are below.</AP>
        </Part>

        <Part n={9} title="Risks">
          <Bullets items={[
            "Slow days and bad weather, and how many cars a day you can survive on.",
            "The water supply: what happens to the day when the water is off.",
            "A new car wash opening nearby, and what keeps your customers coming back.",
            "Washers leaving, and how fast you can train a new one.",
            "Cash that never reaches the drawer, and how every car gets written down.",
            "A failed DENR or LGU inspection, and the separator that prevents it.",
          ]} />
        </Part>

        <AH2>The capacity calculation</AH2>
        <AP>
            A car wash is a throughput business. Demand doesn&apos;t matter past the number of cars your bays can wash in a day,
            so show the calculation instead of a revenue figure out of nowhere.
        </AP>
        <CostTable
          rows={[
            ["Cars one bay washes in an hour", "About 2 for a hand wash (AEDO planning figure), or time your crew"],
            ["Daily capacity", "bays × hours open × cars per bay per hour"],
            ["The volume to plan on", "Less than full capacity, because cars don't arrive evenly through the day"],
          ]}
          note="Plan revenue on the cars you can defend from your traffic count and nearby competition, not on the capacity ceiling. Nobody runs every bay full all day."
        />
        <Cite>
          AEDO Construction, &ldquo;Car Wash Construction Cost Philippines 2026: Bays, Drains, Permits&rdquo;, 18 September 2026.
          The cars per bay per hour is AEDO&apos;s planning estimate, not a code value.
        </Cite>

        <AH2>Startup costs: two published starting points</AH2>
        <AP>
          Published budgets describe two different shops. Moneymax&apos;s 2023 example of ₱106,000 is for a rented space: one
          month of rent (₱40,000), labour for two people (₱25,000), supplies, water, electricity and marketing, and ₱30,000 of
          equipment such as a pressure washer. It has nothing for permits, a deposit or building work. AEDO Construction&apos;s
          2026 planning rates put the building works for a three-bay hand wash with a canopy, drains, an office and a silt
          and oil interceptor at ₱1.6 million to ₱2.7 million, before land and equipment.
        </AP>
        <AP>
          Use whichever matches your shop as a check on your own quotes, never as a substitute for them. The line-by-line
          breakdowns are in our <a href={START_PATH} className="font-bold underline" style={{ color: INK }}>start-up guide</a>.
        </AP>

        <AH2>The monthly numbers: a worksheet</AH2>
        <AP>
          Rather than an example built on somebody else&apos;s numbers, fill this in with yours. Every row is something you can
          get in an afternoon, and a plan built from them holds up in a way a borrowed one doesn&apos;t.
        </AP>
        <CostTable
          rows={[
            ["What an average car pays", "Your price list and the mix of sizes and add-ons you expect"],
            ["Washer's share per car", "Your crew pay rule"],
            ["Supplies per car", "Price a case of shampoo, wax and tire black, divided by the cars it washes"],
            ["Water per car", "About 57 litres by hand (US EPA) × your water rate"],
            ["Electricity per car", "Pressure washer and vacuum wattage × minutes per car × your rate per kWh"],
            ["Rent", "From the lease you're offered"],
            ["Salaries not paid per car", "Your region's minimum wage plus SSS, PhilHealth, Pag-IBIG and 13th month pay"],
            ["Permits", "Yearly LGU fees and the DENR discharge permit (₱2,000 a year under the 2005 schedule), ÷ 12"],
            ["Equipment", "Written quotes from three suppliers"],
          ]}
          note="A worksheet, not an example. Revenue is cars a day × what an average car pays × days open. Show month one lower than month twelve: a flat line from opening day tells a reader the plan is a guess."
        />
        <Cite>
          Water per vehicle: US EPA, WaterSense at Work, Section 5.4 (November 2023). Discharge permit fee: DAO 2005-10, Rule
          14.5, the 2005 schedule for under 10 cubic metres a day without heavy metals (₱2,600 with); ask your EMB Regional
          Office for the current figure. Both via AEDO Construction&apos;s guide of 18 September 2026.
        </Cite>

        <AH2>Break-even, worked out as you type</AH2>
        <AP>
          Break-even is the number a lender turns to first: how many cars a day before the shop stops eating your savings.
          Each car leaves you what it pays minus its own costs, and that amount has to cover the month&apos;s fixed costs.
        </AP>
        <BreakEvenCalculator />
        <AP>
          Then compare the answer with two things: your capacity and your street. If break-even needs more cars than your
          bays can wash, the plan can&apos;t work as written. If it needs more cars than plausibly pass your lot, you&apos;re
          betting on drawing customers from further away, which is a different and harder business. Either way, better to
          find out on paper.
        </AP>

        <AH2>Mistakes that make a car wash plan unconvincing</AH2>
        <Bullets items={[
          <><strong>No capacity calculation.</strong> The reader can&apos;t tell whether the revenue is even possible.</>,
          <><strong>A flat revenue line from month one.</strong> Nothing signals a guess faster.</>,
          <><strong>Nothing about the wash water.</strong> A car wash without a discharge plan is a car wash a DENR inspection can close.</>,
          <><strong>Crew pay that can drop below minimum wage</strong> on a slow day.</>,
          <><strong>No working capital.</strong> A plan that funds the opening and nothing after it.</>,
          <><strong>Figures with no source and no date.</strong> Rent and equipment prices move; a number without a source isn&apos;t evidence.</>,
        ]} />

        <AH2>Keeping the plan honest after you open</AH2>
        <AP>
          A plan is only worth something if you can check it against what happened. That means knowing, week by week, how
          many cars you washed, what the average car paid, what the crew earned, and whether the drawer matched.
        </AP>

        <SoftwarePitch
          title="Check your plan against real days"
          body="Smapey Carwash writes every car down by plate and prices it from your board. Each washer's share is worked out per car, the day's closing compares the drawer with what it should hold, and Analytics shows cars, revenue and the busiest hours for any range of days."
          cta="Start free"
        />

        <AH2>Frequently asked questions</AH2>
        <FAQList faqs={FAQS} />
      </article>

      <CTA />
      <InternalLinks cluster="car-wash" currentPath="/car-wash/car-wash-business-plan-philippines" />
      <Footer />
    </main>
  )
}
