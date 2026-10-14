"use client"

import InternalLinks from "@/components/InternalLinks"
import {
  Navbar, Footer, CTA, ArticleHero, AH2, AH3, AP, Bullets, KeyFacts, CostTable, Cite, FAQList, SoftwarePitch,
  INK, BLUE, CREAM, FAINT, HUB_PATH, PLAN_PATH,
} from "@/components/sports-courts/shared"
import CourtsFitCalculator, { courtsThatFit } from "./CourtsFitCalculator"
import { FAQS } from "./faqs"

const link = "font-bold underline"
const FT = 0.3048
const MIN_SURFACE = { w: 30 * FT, l: 60 * FT }

// Lots of about 1,000 m² in different shapes, worked out with the calculator's
// own rule so the table and the calculator never disagree.
const LOTS: [number, number][] = [[22.3, 44.8], [25, 40], [31.6, 31.6], [20, 50]]

function FitTable() {
  return (
    <div className="my-6 rounded-[16px] border-2 overflow-hidden" style={{ borderColor: INK, boxShadow: `5px 5px 0 ${BLUE}` }}>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr style={{ background: INK }}>
              <th className="text-left px-4 py-3 font-bold text-white min-w-[130px]">Lot of about 1,000 m²</th>
              <th className="px-3 py-3 font-bold text-white text-center min-w-[120px] leading-tight">With a 2 m walkway around</th>
              <th className="px-3 py-3 font-bold text-white text-center min-w-[120px] leading-tight">Courts&apos; surfaces only</th>
            </tr>
          </thead>
          <tbody>
            {LOTS.map(([a, b], i) => (
              <tr key={`${a}x${b}`} style={{ background: i % 2 ? CREAM : "#fff" }}>
                <th scope="row" className="text-left px-4 py-3 font-bold whitespace-nowrap" style={{ color: INK }}>{a} × {b} m</th>
                <td className="px-3 py-3 text-center font-extrabold tabular-nums" style={{ color: INK }}>{courtsThatFit(a, b, 2, MIN_SURFACE).courts}</td>
                <td className="px-3 py-3 text-center font-extrabold tabular-nums" style={{ color: INK }}>{courtsThatFit(a, b, 0, MIN_SURFACE).courts}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="px-5 py-3 text-xs" style={{ color: FAINT, background: CREAM, borderTop: `2px solid ${INK}` }}>
        Each court on its own 30 by 60 ft surface, laid in a grid. The walkway and fence allowance is AEDO&apos;s planning assumption, not a rule.
      </p>
    </div>
  )
}

export default function Content() {
  return (
    <main className="bg-white">
      <Navbar />

      <ArticleHero
        badge="Philippines · Construction"
        title={<>Pickleball court construction cost in the Philippines</>}
        intro="A pickleball court can cost a couple of hundred thousand pesos, if you're relining a slab you already have, or well over a million a court under a metal roof. Here's where the money goes, from published 2026 planning rates and a real two-court job, and how many courts your space can hold."
      />

      <article className="max-w-3xl mx-auto px-6 py-16">
        <KeyFacts items={[
          { k: "Open court", v: "₱0.49M to ₱0.82M a court" },
          { k: "Under a tarp roof", v: "₱0.78M to ₱1.25M a court" },
          { k: "Under a metal roof", v: "₱1.33M to ₱1.84M a court" },
          { k: "Space for one court", v: "167 m² at least, 202 m² recommended" },
        ]} />

        <AH2>How much does it cost to build a pickleball court in the Philippines?</AH2>
        <AP>
          The most detailed published figures we found come from AEDO Construction, a firm of licensed civil engineers, which put out planning
          ranges in September 2026 for two courts on a filled pad, with a concrete slab, a polished and painted court finish,
          and lights. The roof is the biggest swing:
        </AP>
        <CostTable
          rows={[
            ["Two open courts", "₱990,000 – ₱1,650,000"],
            ["Two courts under a tarp roof", "₱1,560,000 – ₱2,490,000"],
            ["Two courts under a metal roof", "₱2,660,000 – ₱3,680,000"],
          ]}
          note="AEDO's 2026 planning ranges, not quotations. Per court that's ₱0.49M – ₱0.82M open, ₱0.78M – ₱1.25M under a tarp and ₱1.33M – ₱1.84M under a metal roof. Not included: nets and posts, fencing and backstops, a comfort room, drainage beyond the pad, permits, design fees, VAT, the land, and anything the soil turns up."
        />
        <Cite>
          AEDO Construction, &ldquo;Pickleball Court Construction Cost Philippines 2026&rdquo;, 24 September 2026. Its totals are
          built from the unit rates below on a pad of 176.3 m² a court, the size of the Manjuyod job.
        </Cite>
        <AP>
          Use these to check the quotes you get, never instead of them. Fill depth, soil, how far the power has to come and
          what the roof has to stand up to all move the price, and only a site visit sees them.
        </AP>

        <AH2>What a real two-court job cost</AH2>
        <AP>
          AEDO also published a contract it priced: two open courts in Manjuyod, Negros Oriental, on a 352.63 m² pad, for a
          fixed <strong>₱1,100,000</strong> and 65 working days including curing. The lot needed building up first, which is
          why the fill and retaining wall cost as much as the slab.
        </AP>
        <CostTable
          rows={[
            ["Footings, 10 sets, 2.00 × 2.00 × 0.40 m", "₱177,177"],
            ["Column pedestals, 10 sets, 400 × 600 mm", "₱85,838"],
            ["Backfill, about 350 m³, and 75 m of 1.10 m CHB wall", "₱287,605"],
            ["Concrete slab, 100 mm over 50 mm gravel, ₱814.71/m²", "₱287,289"],
            ["Polishing, ₱135.82/m²", "₱47,895"],
            ["Painting with silica sand, lines included, ₱221.64/m²", "₱78,158"],
            ["Ten 100 W LED floodlights, mobilisation, contingency, overhead and profit", "₱136,038"],
          ]}
          total={["Fixed contract price", "₱1,100,000"]}
          note="Excluded from the contract: the roof and posts above the floor, lighting poles, net posts and nets, perimeter fencing, the electrical supply, drainage beyond the pad, and permits and fees."
        />
        <Cite>AEDO Construction, &ldquo;Pickleball Court Construction Cost Philippines 2026&rdquo;, 24 September 2026, Manjuyod project.</Cite>

        <AH2>Line by line: the unit rates</AH2>
        <AP>
          These are the rates behind AEDO&apos;s totals, so you can price your own layout or check a contractor&apos;s line items.
          A court&apos;s minimum surface is about 167 m², so a per-square-metre rate times 167 is one court&apos;s worth.
        </AP>

        <AH3>The pad and the slab</AH3>
        <CostTable
          rows={[
            ["Fill and retaining wall", "₱1,000 – ₱1,600 per m³ of pad"],
            ["Concrete slab", "₱815 – ₱1,000 per m²"],
          ]}
          note="Manjuyod's slab was 100 mm of Class A (3,000 psi) concrete on 50 mm of compacted gravel, with 10 mm bars at 400 mm both ways and saw-cut joints. AEDO slopes a court about 1% so water runs off it, as its own practice rather than a code."
        />

        <AH3>The court surface</AH3>
        <CostTable
          rows={[
            ["Polished concrete and paint with silica sand", "₱357 – ₱450 per m²"],
            ["Acrylic colour coats", "₱500 – ₱900 per m²"],
            ["Epoxy", "₱900 – ₱1,600 per m²"],
            ["Cushioned acrylic", "₱1,200 – ₱2,200 per m²"],
            ["Modular interlocking tiles", "₱2,500 – ₱4,500 per m²"],
          ]}
          note="AEDO's planning rates, with the low end of the first line from the Manjuyod job. Manjuyod's paint was one epoxy primer coat and two rubberised top coats, with silica sand in the second coat over the playing area."
        />
        <AP>
          Lines are 2 inches wide, in one colour that contrasts with the court. On a court shared with another sport,
          paint the other sport&apos;s lines in a tone close to the surface, so pickleball players aren&apos;t left guessing which
          line counts.
        </AP>
        <Cite>
          AEDO Construction, &ldquo;Pickleball Court Line Marking and Colours&rdquo;, 4 October 2026, citing the USA Pickleball
          rulebook on line width and colour, and the construction manual on shared courts.
        </Cite>

        <AH3>Nets and lights</AH3>
        <CostTable
          rows={[
            ["Portable net", "₱8,000 – ₱25,000 a court"],
            ["Permanent posts in sleeves", "₱25,000 – ₱60,000 a court"],
            ["Lights on poles, 300 lux", "₱164,000 – ₱371,000 a court"],
            ["Lights on a roof frame", "₱71,000 – ₱157,500 a court"],
          ]}
          note="For two open courts, AEDO splits the lighting into fixtures (₱81,000 – ₱162,000), poles and footings (₱168,000 – ₱400,000), wiring (₱60,000 – ₱140,000) and the panel, breakers and timer (₱19,000 – ₱40,000). The poles are the biggest part, which is why lights hung from a roof cost less."
        />
        <AP>
          No Philippine code sets a light level for pickleball. The ASBA and USA Pickleball construction manual gives 300 lux
          for recreational play, 500 for club and competitive play and 750 for tournaments. Running them is cheap next to
          buying them: AEDO&apos;s default of six 150 W floodlights a court draws 0.9 kW, about ₱12.60 an hour per court at ₱14
          a kWh.
        </AP>
        <Cite>
          AEDO Construction, &ldquo;Pickleball Court Lighting Cost Philippines: Lux, Poles, Power Bill&rdquo;, 24 September 2026,
          citing the ASBA and USA Pickleball construction manual (2020, Chapter 6). The ₱14.00 a kWh is AEDO&apos;s assumption,
          between two Negros Oriental cooperatives&apos; 2026 rates; use the one on your bill.
        </Cite>

        <AH3>The roof</AH3>
        <CostTable
          rows={[
            ["Metal roof, columns and footings included", "₱4,400 – ₱5,800 per m² of roof"],
            ["Tarp roof", "₱1,800 – ₱3,000 per m² of roof"],
            ["Default steel truss roof over two courts", "About ₱1,690,000"],
          ]}
          note="AEDO sizes the roof at the pad plus 20% for the eaves. The tarp rate is AEDO's judgement, without a source. The two-court roof spans 19.5 m on reinforced concrete columns with a 6 m eave, designed for 250 kph wind, within a planning range of ₱1.52M – ₱2.12M."
        />
        <AP>
          The rulebook sets no minimum roof height, but it treats a roof as a permanent object, so a ball that hits a low
          eave is a fault. AEDO&apos;s 6 m eave is its own planning suggestion. The roof also has to be designed for the wind
          where you build: the National Structural Code sets basic wind speeds of about 240 to 320 kph across the country,
          and on an open-sided court the wind lifts the roof from below.
        </AP>
        <Cite>
          AEDO Construction, &ldquo;Covered Pickleball Court Roof: Structure &amp; Cost (Philippines 2026)&rdquo;, 24 September 2026,
          and its construction cost guide of the same date; NSCP 2015, Section 207, as summarised there.
        </Cite>

        <AH2>How much space does a pickleball court need?</AH2>
        <AP>
          The lines of a pickleball court measure 20 by 44 feet, 6.10 by 13.41 m, the same for singles and doubles. Players
          need room past the lines, so the USA Pickleball rulebook asks for a playing surface of at least 30 by 60 feet, about
          167 m², and recommends 34 by 64 feet, about 202 m², for new courts. The net is 36 inches high at the sidelines and
          34 inches in the middle.
        </AP>
        <AP>Add a walkway and the fence, and the land you need grows quickly. AEDO&apos;s planning lots, with 2 m around the block:</AP>
        <CostTable
          rows={[
            ["1 court", "13.1 × 22.3 m, 293 m²"],
            ["2 courts", "22.3 × 22.3 m, 497 m²"],
            ["4 courts", "22.3 × 40.6 m, 904 m²"],
            ["6 courts", "31.4 × 40.6 m, 1,275 m²"],
          ]}
          note="AEDO's planning layout, not a rule: each court keeps its own 30 by 60 ft surface, with no run-off shared between courts. Parking, a counter and a comfort room come on top."
        />
        <Cite>
          USA Pickleball Official Rulebook 2026, rules 3.A.1 and 3.A.3, and AEDO Construction&apos;s guides of 24 September 2026,
          which give the lot sizes.
        </Cite>

        <AH2>How many pickleball courts fit in 1,000 sqm?</AH2>
        <AP>
          On area alone, 1,000 m² holds five 167 m² surfaces. In practice it&apos;s <strong>two to four</strong>, because the shape
          of the lot decides how the courts line up, and a walkway and fence take a strip all the way round:
        </AP>
        <FitTable />
        <AP>Measure your own lot, slab or covered court and try it here:</AP>
        <CourtsFitCalculator />

        <AH2>How many pickleball courts fit on a basketball court?</AH2>
        <AP>
          A FIBA-size basketball court is 28 by 15 m inside its lines, with a 2 m run-off around it for a floor of 32 by 19 m.
          Inside the lines, <strong>one</strong> pickleball court fits with its full surface. On the whole floor,{" "}
          <strong>three</strong> fit when turned across the court, side by side along its length, but only by using the run-off.
          Packing four bare courts onto the lines works on paper and leaves nowhere to step past them.
        </AP>
        <Bullets items={[
          "Fixed hoops and roof columns eat the play area, so measure around them, not the painted lines.",
          "Check the slab before you paint it: cracks, settlement, ponding, old paint that lifts, and blocked drains.",
          "AEDO's example for relining a 28 × 15 m slab in fair condition, with a silica-sand paint finish and one portable net, came to ₱166,700 – ₱267,700, about ₱397 – ₱637 per m², before lights, fencing and any structural repair.",
          "Preparing an existing slab before the paint runs from ₱40 – ₱70 per m² in good condition to ₱120 – ₱220 in fair and ₱350 – ₱600 in poor, in AEDO's planning ranges.",
        ]} />
        <AP>
          A tennis court is the other common conversion. Four 30 by 60 ft surfaces add up to exactly a 60 by 120 ft tennis
          court, so four fit on paper, but a task force leader for the construction manual called that fit &ldquo;awful
          tight&rdquo; and advised against it.
        </AP>
        <Cite>
          AEDO Construction, &ldquo;Convert a Basketball Court to Pickleball: Fit, Cost and Checks&rdquo;, 24 September 2026,
          citing FIBA&apos;s Official Basketball Rules 2024, Articles 2.1 and 2.2. Tennis: Randy Futty of California Sports
          Surfaces, quoted in Building Design + Construction, &ldquo;Pickleball, anyone?&rdquo;, 27 September 2017.
        </Cite>

        <AH2>Permits before you build</AH2>
        <Bullets items={[
          <><strong>Building permit</strong> from the Office of the Building Official before construction starts. A new slab, a roof, columns, retaining walls and lighting poles all count as construction.</>,
          <><strong>Resurfacing</strong> a slab you already have may fall under the exemption for flooring repair. The Building Official decides, so ask first.</>,
          <><strong>Fences</strong> over 1.80 m have a permit item of their own.</>,
          <><strong>Occupancy permit</strong> before you use what you built, and a Fire Safety Inspection Certificate, which the occupancy and business permits ask for.</>,
          <><strong>Your barangay, LGU and HOA</strong> on noise and hours. Many have ordinances, curfews and house rules, and none AEDO found names pickleball.</>,
        ]} />
        <Cite>
          National Building Code (PD 1096), Sections 301 and 309; Fire Code of the Philippines (RA 9514), Section 5(g). The
          readings of the flooring exemption and the fence item are AEDO Construction&apos;s, from the 2004 Revised IRR (guide of
          24 September 2026). Renting the courts out takes business permits too: they&apos;re listed in our{" "}
          <a href={`${PLAN_PATH}#permits`} className={link} style={{ color: INK }}>pickleball court business plan</a>.
        </Cite>

        <AH2>Before you pour</AH2>
        <Bullets items={[
          "Run outdoor courts north to south where you can, so the low morning and afternoon sun isn't in anyone's eyes.",
          "Slope the court so water runs off it, and send that water somewhere other than the next court.",
          "Get the soil checked and the slab designed for your site, especially where the lot needs filling.",
          "Ask the neighbours, the barangay and the HOA about hours and noise before you build, not after the first complaint.",
          "Decide now whether a roof is coming later. The Manjuyod job poured ten footings and column pedestals with the pad, while the roof and the posts above the floor stayed out of the contract.",
        ]} />
        <Cite>
          North to south orientation: USA Pickleball&apos;s construction guidance as cited by AEDO, and Linn Lower of Lower Bros.
          Tennis Courts in Building Design + Construction (2017).
        </Cite>
        <AP>
          Pricing the business around the courts, from rates to break-even? Our{" "}
          <a href={PLAN_PATH} className={link} style={{ color: INK }}>pickleball court business plan</a> has a free ROI calculator
          that takes these building costs as its starting point.
        </AP>

        <SoftwarePitch
          title="Take bookings from the day the paint dries"
          body="Smapey Sports Courts gives your new courts a schedule that can't double-book and your own booking page, which players pay into by GCash. A combined court handles a basketball court laid over pickleball courts, and the closing adds up the day's money. Free to start."
          cta="Set up your courts free"
        />
        <AP>
          See everything it does on the <a href={HUB_PATH} className={link} style={{ color: INK }}>court booking system</a> page.
        </AP>

        <AH2>Frequently asked questions</AH2>
        <FAQList faqs={FAQS} />
      </article>

      <CTA />
      <InternalLinks cluster="sports-courts" currentPath="/sports-courts/pickleball-court-construction-cost-philippines" />
      <Footer />
    </main>
  )
}
