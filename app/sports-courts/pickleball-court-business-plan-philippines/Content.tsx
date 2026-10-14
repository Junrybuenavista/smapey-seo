"use client"

import InternalLinks from "@/components/InternalLinks"
import {
  Navbar, Footer, CTA, ArticleHero, AH2, AP, Bullets, KeyFacts, CostTable, Cite, FAQList, SoftwarePitch,
  INK, AMBER, CREAM, HUB_PATH, BUILD_PATH,
} from "@/components/sports-courts/shared"
import RoiCalculator from "./RoiCalculator"
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

const link = "font-bold underline"

export default function Content() {
  return (
    <main className="bg-white">
      <Navbar />

      <ArticleHero
        badge="Philippines · Business plan"
        title={<>Pickleball court business plan: a sample for the Philippines</>}
        intro="A pickleball court business plan has to answer what a general template skips: how many court-hours you can sell, what an hour leaves you after the lights, and how long the courts take to earn back what they cost. Here's a sample outline to fill in, section by section, the permits you'll need, and a calculator for the return."
      />

      <article className="max-w-3xl mx-auto px-6 py-16">
        <KeyFacts items={[
          { k: "Court hire", v: "₱300 an hour, the median of published rates" },
          { k: "Open play", v: "₱150 a player, the median" },
          { k: "Two open courts", v: "₱0.99M to ₱1.65M to build" },
          { k: "Two under a metal roof", v: "₱2.66M to ₱3.68M to build" },
        ]} />

        <AH2>Decide what kind of venue you&apos;re opening</AH2>
        <AP>
          How to start a pickleball court business in the Philippines comes down to one early choice, because the money,
          the permits and the risks all follow from it.
        </AP>
        <Bullets items={[
          <><strong>Converting a court you already have.</strong> A basketball court, a tennis court or a sound slab, relined and given nets. The cheapest way in, and the obvious one for a resort, subdivision or school that already has a court.</>,
          <><strong>Building open courts on your own lot.</strong> A filled pad, a slab, a court finish and lights. Rain stops play, so plan for it.</>,
          <><strong>Covered courts.</strong> The same courts under a tarp or a metal roof, which costs more than the courts under it but lets you sell the hours when it rains.</>,
          <><strong>Indoor courts in a leased building.</strong> No roof to build, but rent every month, and the floor and lights are still yours to do.</>,
        ]} />
        <AP>
          Our <a href={BUILD_PATH} className={link} style={{ color: INK }}>pickleball court construction cost guide</a> prices
          each of these line by line and shows how many courts fit on your lot.
        </AP>

        <AH2>Decide who the plan is for</AH2>
        <AP>The same plan reads differently to different people, so write it for the one who decides.</AP>
        <Bullets items={[
          <><strong>A bank or lending cooperative</strong> wants to see how you&apos;ll repay. The court-hours and the assumptions behind them carry the plan.</>,
          <><strong>A partner or family member putting money in</strong> wants the risks laid out honestly, and what you&apos;ll do about each.</>,
          <><strong>Yourself.</strong> A plan you argue with before pouring concrete is cheaper than finding out it was wrong after.</>,
        ]} />

        <AH2>The sample plan, section by section</AH2>
        <AP>Write the executive summary last. The rest is in the order a reader expects it.</AP>

        <Part n={1} title="Executive summary">
          <AP>One page that lets a reader stop and still know whether they&apos;re interested: what, where, how much, and when it pays for itself.</AP>
          <Sample>
            [Venue name] is a [number]-court [open / covered / indoor] pickleball venue at [location], open [days and hours]. It
            can sell up to [court-hours] court-hours a month at ₱[off-peak rate] to ₱[peak rate] an hour, plus open play at
            ₱[fee] a player. It needs ₱[total] to open, breaks even at [break-even] court-hours a day, and pays back in
            [months] months.
          </Sample>
        </Part>

        <Part n={2} title="The venue">
          <AP>
            Which of the four kinds above it is, how many courts, and what else they&apos;re lined for. A court that can also be
            used for badminton or basketball has more than one way to fill an hour.
          </AP>
          <Sample>
            [Venue name] is a [model] with [number] pickleball courts, [also lined for badminton / basketball], owned by
            [owner] as a [sole proprietorship / partnership / corporation]. It will offer court rental by the hour, open
            play on [days], and [paddle rental / coaching / drinks].
          </Sample>
        </Part>

        <Part n={3} title="Market and location">
          <AP>
            For a court venue this is about the few kilometres around you, not the national market. List the courts nearby
            and what they charge, and note who is around: subdivisions, schools, offices and the groups that already play
            on borrowed courts. PickleBoard&apos;s directory lists 2,591 venues across the country, so check the ones near you
            first. Mall chains are in the market too: SM says its Active Hub runs 86 pickleball courts in 29 malls.
          </AP>
          <Sample>
            Within [distance] of [location] there are [number] courts, charging ₱[their rates] an hour. Our players will
            come from [subdivisions, schools, offices, existing groups], and we will reach them through [our Facebook page,
            the groups that play nearby, a launch open play].
          </Sample>
          <Cite>
            PickleBoard, &ldquo;Pickleball Court Rental in the Philippines&rdquo;, read 14 October 2026; the venue count is
            PickleBoard&apos;s own listing. SM Active Hub&apos;s court count is from an SM release published on Philstar.com in 2026.
          </Cite>
        </Part>

        <Part n={4} title="Rates and other income">
          <AP>
            Court rental by the hour is the core, usually with a higher rate at peak hours. Around it: open play per player,
            paddle rental, coaching, drinks. Published rates give you a starting point to check against the courts near you.
          </AP>
          <CostTable
            rows={[
              ["Court hire, median of published rates", "₱300 an hour"],
              ["Court hire, typical range", "₱200 – ₱400 an hour"],
              ["Premium indoor venues", "Up to ₱750 an hour"],
              ["Cebu, 2026", "₱500 – ₱900 an hour"],
              ["Open play, median", "₱150 a player"],
              ["Open play, most common", "₱100 – ₱200 a player"],
              ["Paddle rental, where offered", "₱50 – ₱200 a paddle"],
            ]}
            note="PickleBoard's figures are across the venues that publish a rate: 597 of the 2,591 it lists. Evening and weekend rates commonly run above them. The Cebu range is Sugbo.ph's."
          />
          <Cite>
            PickleBoard, &ldquo;Pickleball Court Rental in the Philippines&rdquo;, read 14 October 2026; Sugbo.ph, &ldquo;Pickleball
            Courts in Cebu 2026 Guide: Indoor &amp; Outdoor Courts, Rates, and How to Book&rdquo;, 10 May 2026.
          </Cite>
          <Sample>
            Court rental: ₱[off-peak] an hour, ₱[peak] an hour from [time] on weekdays and all day on weekends. Open play
            [days], ₱[fee] a player. Paddle rental ₱[amount]. A deposit of ₱[amount] by GCash holds an online booking.
          </Sample>
        </Part>

        <Part n={5} title="Operations and capacity">
          <AP>
            Opening hours, how bookings come in and get paid, who runs the counter, and what happens when it rains. Then the
            capacity: the court-hours you can sell, worked out below.
          </AP>
          <Sample>
            [Number] courts, open [hours] a day, [days] days a week. Players book from our page or at the counter; online
            bookings pay a ₱[deposit] deposit by GCash, which the counter confirms. Open play runs on [courts] on [days]. A
            game rained out is [moved to the next free time / refunded].
          </Sample>
        </Part>

        <Part n={6} title="Permits">
          <AP>The business registrations every venue needs, plus a building permit if you build. The list is further down.</AP>
          <Sample>
            Registered with [DTI / SEC], barangay clearance and Mayor&apos;s Permit from [LGU], BIR registration and a Fire
            Safety Inspection Certificate. Building permit [number] for the [slab / roof / lighting poles], and an occupancy
            permit before opening.
          </Sample>
        </Part>

        <Part n={7} title="Management and staff">
          <AP>
            Who opens and closes, who takes the money, who confirms the GCash payments, and who runs open play. Staff on a
            salary need at least the minimum wage for your region, plus SSS, PhilHealth and Pag-IBIG.
          </AP>
          <Sample>
            [Owner] manages the venue and checks the daily closing. [Number] staff run the counter in [number] shifts at
            [rate], at least the [region] minimum wage. [Name] runs open play and coaching.
          </Sample>
        </Part>

        <Part n={8} title="The financial plan">
          <AP>Startup costs, monthly costs, revenue, break-even and payback, with the source of every figure. The worksheet and calculator are below.</AP>
        </Part>

        <Part n={9} title="Risks">
          <Bullets items={[
            "Rain and typhoons, for open courts: how many hours a year you lose, and whether a roof pays for itself.",
            "Neighbours and noise. Many LGUs and subdivisions have noise ordinances, curfews and HOA rules, so ask before you build.",
            "A new venue opening nearby, and what keeps your regulars coming back.",
            "Slow first months, and the working capital that carries you through them.",
            "The sport's popularity. A court that can be lined for badminton or volleyball has a fallback.",
            "Double bookings and unpaid holds, which cost you the hour and the regular.",
          ]} />
          <Cite>
            The point on noise rules is from AEDO Construction&apos;s guide to converting a basketball court, 24 September 2026,
            which found no ordinance that names pickleball.
          </Cite>
        </Part>

        <AH2>The capacity calculation</AH2>
        <AP>
          A court venue sells hours. Demand doesn&apos;t matter past the court-hours you can offer, so show the calculation
          instead of a revenue figure out of nowhere.
        </AP>
        <CostTable
          rows={[
            ["Court-hours you can sell a month", "courts × hours open a day × days open"],
            ["Court-hours you'll actually sell", "Less than that: nobody fills every court every hour"],
            ["Revenue from court rental", "booked court-hours × what an average hour pays"],
          ]}
          note="Plan on the hours you can defend from the courts near you, not on the capacity ceiling. Not every hour sells like a weekday evening."
        />
        <AP>For a feel of the numbers, here is one court at PickleBoard&apos;s ₱300 median, over a 30-day month:</AP>
        <CostTable
          rows={[
            ["Booked 4 hours a day", "₱36,000 a month"],
            ["Booked 6 hours a day", "₱54,000 a month"],
            ["Booked 8 hours a day", "₱72,000 a month"],
            ["Booked 10 hours a day", "₱90,000 a month"],
          ]}
          note="Plain arithmetic on the median rate, before any costs. It's not a forecast: your rates, hours and the courts near you decide your numbers."
        />

        <AH2>Startup costs: what published estimates say</AH2>
        <AP>
          AEDO Construction, a firm of licensed civil engineers, published planning ranges in 2026 for two courts on a filled
          pad, with a slab, a polished and painted court finish and lights. The roof is the biggest swing:
        </AP>
        <CostTable
          rows={[
            ["Two open courts", "₱990,000 – ₱1,650,000"],
            ["Two courts under a tarp roof", "₱1,560,000 – ₱2,490,000"],
            ["Two courts under a metal roof", "₱2,660,000 – ₱3,680,000"],
            ["Relining a 28 × 15 m basketball slab in fair condition", "₱166,700 – ₱267,700"],
          ]}
          note="AEDO's 2026 planning ranges, not quotations. The building totals leave out nets and posts, fencing and backstops, a comfort room, drainage beyond the pad, permits, design fees, VAT and land. The relining figure covers prep, a silica-sand paint finish, one portable net and a 10% contingency, without lights, fencing, a roof or structural repair."
        />
        <Cite>
          AEDO Construction, &ldquo;Pickleball Court Construction Cost Philippines 2026&rdquo; and &ldquo;Convert a Basketball Court to
          Pickleball: Fit, Cost and Checks&rdquo;, both 24 September 2026.
        </Cite>
        <AP>
          Add the costs no building estimate covers: the land or the lease deposit, paddles and balls to rent or sell, a
          counter, the booking system, and working capital for the first months. The line items, and how the roof changes
          them, are in our <a href={BUILD_PATH} className={link} style={{ color: INK }}>construction cost guide</a>.
        </AP>

        <AH2>The monthly numbers: a worksheet</AH2>
        <AP>
          Rather than an example built on somebody else&apos;s numbers, fill this in with yours. Every row is something you can
          find out in an afternoon, and a plan built from them holds up in a way a borrowed one doesn&apos;t.
        </AP>
        <CostTable
          rows={[
            ["What an average court-hour pays", "Your rates across peak and off-peak, less discounts"],
            ["Hours each court is booked a day", "From the courts near you, not your best Saturday"],
            ["Lights per court-hour", "Fixture watts × your rate per kWh, for the hours the lights are on"],
            ["Open play", "Players a session × the fee × sessions a month"],
            ["Rent or lease", "From the lease you're offered"],
            ["Staff", "Your region's minimum wage plus SSS, PhilHealth, Pag-IBIG and 13th month pay"],
            ["Upkeep", "Nets, windscreens, line repainting, and a fund to resurface"],
            ["Permits", "Yearly LGU fees, ÷ 12"],
            ["Loan repayment and your own pay", "From the loan offer, and what you need to live on"],
          ]}
          note="A worksheet, not an example. For the lights, AEDO's default design puts six 150 W floodlights on each court: 0.9 kW, or ₱12.60 an hour at the ₱14 a kWh it assumed. Show month one lower than month twelve: a flat line from opening day tells a reader the plan is a guess."
        />
        <Cite>
          AEDO Construction, &ldquo;Pickleball Court Lighting Cost Philippines: Lux, Poles, Power Bill&rdquo;, 24 September 2026:
          1.8 kW for two courts at an assumed ₱14.00 a kWh, between the two Negros Oriental cooperatives&apos; 2026 rates. Use
          the rate on your own bill.
        </Cite>

        <AH2>ROI and break-even, worked out as you type</AH2>
        <AP>
          Break-even is the number a lender turns to first: how many court-hours a day before the venue stops eating your
          savings. Each court-hour leaves you what it pays minus the lights, and that has to cover the month&apos;s fixed
          costs. The return on investment is then how long the profit takes to pay back what the venue cost to open.
        </AP>
        <RoiCalculator />
        <AP>
          Then hold the answer up against your capacity and your street. If break-even needs most of your opening hours
          booked every day, the plan only works on your best weeks. If it needs more players than plausibly live and work
          near you, you&apos;re betting on drawing them from further away, which is a different and harder business. Better to
          find out on paper.
        </AP>

        <AH2>Is a pickleball court business profitable?</AH2>
        <AP>
          It can be, but the sport&apos;s popularity doesn&apos;t make it so: booked hours do. We couldn&apos;t find an independent
          survey of what Philippine venues earn, so treat any payback period you&apos;re promised as marketing until the
          numbers are yours. The calculator above gives you that number in a minute, and it&apos;s worth running three times:
          with the hours you hope for, the hours you expect, and a bad month.
        </AP>
        <AP>
          Two things move the answer most. The roof, because it&apos;s the biggest line in the build and the reason you can still
          sell hours in the rainy season. And open play, which sells a court by the player instead of by the hour. Block
          off the courts and hours you keep for it, so they aren&apos;t rented out at the same time.
        </AP>

        <AH2 id="permits">Does a pickleball court need a business permit?</AH2>
        <AP>
          Yes, if you rent it out. A court you charge for is a business like any other, and building one is construction. The
          order varies by LGU, so treat this as the list rather than the schedule.
        </AP>
        <Bullets items={[
          <><strong>DTI</strong> business name registration if you trade under a name, or <strong>SEC</strong> for a partnership or corporation.</>,
          <><strong>Barangay clearance</strong> for the address, then the <strong>Mayor&apos;s or Business Permit</strong> from your city or municipal hall.</>,
          <><strong>Fire Safety Inspection Certificate</strong> from the Bureau of Fire Protection. The Fire Code makes it a condition of the business permit and the occupancy permit.</>,
          <><strong>BIR registration</strong> for your Certificate of Registration, invoices and books of accounts.</>,
          <><strong>Building permit</strong> from the Office of the Building Official before you build. Repainting or resurfacing a slab you already have may count as flooring repair, which is exempt, but a new slab, a roof, columns, retaining walls and lighting poles are construction. A fence over 1.80 m has its own permit item.</>,
          <><strong>Occupancy permit</strong> before you use what you built.</>,
          <><strong>SSS, PhilHealth and Pag-IBIG</strong> employer registration once you hire staff.</>,
          <><strong>Your subdivision or HOA</strong>, if the court is inside one, and the barangay&apos;s rules on noise and hours.</>,
        ]} />
        <Cite>
          Local Government Code (RA 7160), Sections 444(b)(3)(iv) and 455(b)(3)(iv), on the mayor&apos;s power to issue
          business permits; Fire Code of the Philippines (RA 9514), Section 5(g); National Building Code (PD 1096), Sections
          301 and 309. The reading of the flooring-repair exemption and the fence item is AEDO Construction&apos;s, from the
          2004 Revised IRR of PD 1096 (guide of 24 September 2026); the Building Official decides. The IRR groups tennis,
          badminton and basketball courts under Group J, Division 3.
        </Cite>

        <AH2>Mistakes that make a court business plan unconvincing</AH2>
        <Bullets items={[
          <><strong>Revenue at full capacity.</strong> Every court booked every hour is a ceiling, not a forecast.</>,
          <><strong>One rate for every hour.</strong> Peak and off-peak hours sell differently, so price and plan them separately.</>,
          <><strong>Forgetting the lights.</strong> Evening hours often carry the peak rate, and they run on electricity.</>,
          <><strong>No rain plan for open courts.</strong> Say how many hours a year you expect to lose, and what happens to the bookings.</>,
          <><strong>No word with the neighbours.</strong> A noise complaint can cut your hours after the concrete is poured.</>,
          <><strong>No working capital.</strong> A plan that funds the build and nothing after it.</>,
          <><strong>Figures with no source and no date.</strong> Rates and building costs move; a number without a source isn&apos;t evidence.</>,
        ]} />

        <AH2>Keeping the plan honest after you open</AH2>
        <AP>
          A plan is only worth something if you can check it against what happened: how many hours each court was booked,
          what an hour actually paid, how many bookings came online, and whether the money at closing matched.
        </AP>

        <SoftwarePitch
          title="Check your plan against real bookings"
          body="Smapey Sports Courts puts every booking on one schedule that can't double-book, from the counter and from your own booking page. Analytics shows how full each court was in opening hours, the busiest hours by weekday and what each court brought in, and the closing adds up the day's money by method."
          cta="Start free"
        />
        <AP>
          See everything it does on the <a href={HUB_PATH} className={link} style={{ color: INK }}>court booking system</a> page.
        </AP>

        <AH2>Frequently asked questions</AH2>
        <FAQList faqs={FAQS} />
      </article>

      <CTA />
      <InternalLinks cluster="sports-courts" currentPath="/sports-courts/pickleball-court-business-plan-philippines" />
      <Footer />
    </main>
  )
}
