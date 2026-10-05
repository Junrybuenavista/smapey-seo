"use client"

import InternalLinks from "@/components/InternalLinks"
import {
  Navbar, Footer, CTA, ArticleHero, AH2, AP, Bullets, KeyFacts, PriceGrid, Cite,
  FAQList, SoftwarePitch, TYPICAL_SIZES, TYPICAL_ROWS, INK, START_PATH,
} from "@/components/car-wash/shared"

const TARPAULIN_PATH = "/car-wash/car-wash-tarpaulin-design"
import { FAQS } from "./faqs"

export default function Content() {
  return (
    <main className="bg-white">
      <Navbar />

      <ArticleHero
        badge="Philippines · Price guide"
        title={<>Car wash price list in the Philippines</>}
        intro="What car washes in the Philippines charge for a wash, wax, engine wash and interior detailing, by vehicle size, averaged from the price lists shops have published, plus what a motor wash costs. Use it to check your own prices, or to start a price list from scratch."
      />

      <article className="max-w-3xl mx-auto px-6 py-16">
        <KeyFacts items={[
          { k: "Sedan wash", v: "₱130 on average" },
          { k: "SUV wash", v: "₱160 on average" },
          { k: "Motor wash", v: "₱110 on average" },
          { k: "Interior detailing", v: "₱3,000 to ₱4,700 by size" },
        ]} />

        <AH2>Typical car wash prices by vehicle size</AH2>
        <AP>
          These are the averages of the counter car wash price lists we could find published online and open, worked out
          service by service and size by size. Shops group vehicles into sizes, and the table uses the same ones a
          Smapey Carwash price board starts with.
        </AP>
        <PriceGrid
          sizes={TYPICAL_SIZES}
          rows={TYPICAL_ROWS}
          note="Averages of published counter car wash price lists, searched 4–5 October 2026 and rounded to the nearest ₱10 (₱100 from ₱1,000 up). Most of the lists date from 2020, so many shops charge more today. A dash means no list priced it. Home-service washes are left out because their prices include the trip."
        />
        <Cite>
          Sources: Full Torque Carwash (Makati) and JSP Car Klinic (Mandaluyong), as listed in Philkotse&apos;s guide to car wash
          services in Metro Manila, December 2020; White Palace Car Wash (Parañaque), Grab driver perks listing valid to
          October 2020; Southside Carwash (Parañaque), its own website; Car Detailing Manila&apos;s price guide, undated; and
          four interior detailing quotes from shops in Marikina, Quezon City and Rizal reported by AutoIndustriya,
          November 2020, leaving out one high-end detailer&apos;s quote as not comparable. Shop tiers were matched as small to
          sedan or hatchback, medium to SUV, AUV or MPV, large to pick-up and extra large to van. Wash &amp; Vacuum adds
          ₱30, the vacuum step on Mr. Sponge&apos;s menu. Wax is each shop&apos;s wash-and-wax price minus its own wash price.
          Engine Wash, and Glass Watermark Removal as full glass polishing, each come from the one counter price list
          that had them.
        </Cite>

        <AH2>What each service usually covers</AH2>
        <Bullets items={[
          <><strong>Wash</strong> - the outside of the vehicle, washed and dried. It&apos;s the price most customers ask about first.</>,
          <><strong>Wash &amp; Vacuum</strong> - the wash plus a vacuum of the inside. Some shops sell this as their basic package.</>,
          <><strong>Wax</strong> - applied after a wash for shine and some protection, and usually sold on top of it. On the averages, a sedan wash and wax comes to about ₱540.</>,
          <><strong>Engine Wash</strong> - cleaning the engine bay. Some shops sell a bigger engine detailing job instead, at a higher price.</>,
          <><strong>Interior Detailing</strong> - a deep clean of the seats, carpets, ceiling and dashboard. It usually takes hours rather than minutes, which is why it&apos;s priced in the thousands.</>,
          <><strong>Glass Watermark Removal</strong> - polishing the glass to take off the hard water spots that a wash leaves behind.</>,
        ]} />

        <AH2>Motor wash prices</AH2>
        <AP>
          On the published lists that priced motorcycles, a motor wash averaged <strong>₱110</strong>, and big bikes came out at
          the same ₱110 once rounded. One shop priced bikes under and over 400cc separately; another had a single price
          for every motorcycle.
        </AP>
        <AP>
          None of the lists priced a motorcycle wash and wax or a chain clean and lube, so we don&apos;t give a typical figure
          for either. If you offer them, price them against the shops near you.
        </AP>

        <AH2>Other published price ranges</AH2>
        <AP>
          A 2023 guide from Moneymax put an average car wash at <strong>₱200 to ₱500 per car</strong>, and auto detailing at{" "}
          <strong>₱2,000 to ₱15,000 per car</strong>. That&apos;s above the averages in the table, which fits the warning that most
          published price lists are a few years old. Treat the table as a floor and check what shops near you charge
          now.
        </AP>
        <Cite>
          Moneymax, &ldquo;Wash and Earn: How to Start a Car Wash Business in the Philippines&rdquo;, by Jay Pagkatotohan, last
          updated 6 July 2023.
        </Cite>

        <AH2>How to set your own car wash prices</AH2>
        <Bullets items={[
          <><strong>Price by vehicle size.</strong> A van takes more water, soap and time than a hatchback. Charging one price for both loses money on the big ones or turns away the small ones.</>,
          <><strong>Check three shops near you.</strong> Most of the lists above are from Metro Manila and from 2020. Your area, and this year, set the price your customers will accept.</>,
          <><strong>Know what a car costs you.</strong> Water, shampoo and wax, electricity for the pressure washer and vacuum, and the washer&apos;s share. For water, a US EPA guide puts a hand-held wand wash at about 57 litres per vehicle; your own meter will tell you yours within a week.</>,
          <><strong>Keep the packages few.</strong> Two or three packages are easy to choose from at the counter. Sell the extras as add-ons.</>,
          <><strong>Put the price list where customers see it before they pull in.</strong> A clear tarpaulin settles the price before the car is washed, not after. Make one with our <a href={TARPAULIN_PATH} className="font-bold underline" style={{ color: INK }}>free car wash tarpaulin maker</a>.</>,
        ]} />
        <Cite>
          Water per vehicle: US EPA, WaterSense at Work, Section 5.4 Vehicle Washes, November 2023, as summarised in AEDO
          Construction&apos;s Philippine car wash construction cost guide, 18 September 2026. The EPA figures come from
          American field studies, so read them as a starting point.
        </Cite>
        <AP>
          Starting from zero? Our guide to{" "}
          <a href={START_PATH} className="font-bold underline" style={{ color: INK }}>starting a car wash business in the Philippines</a>{" "}
          covers capital, permits and equipment.
        </AP>

        <SoftwarePitch
          title="Set up your price board free"
          body="Smapey Carwash starts your price board with the typical prices on this page, by vehicle size, so you correct a few numbers instead of typing a whole grid. Every car at the counter is then priced from your board, and the board prints as a price list tarpaulin."
          cta="Set up your price board free"
        />

        <AH2>Frequently asked questions</AH2>
        <FAQList faqs={FAQS} />
      </article>

      <CTA title="Ready to put your price board to work?" subtitle="Every car priced from your board, every price change recorded, and a price list tarpaulin when you want one. Free plan, no card." />
      <InternalLinks cluster="car-wash" currentPath="/car-wash/car-wash-price-list-philippines" />
      <Footer />
    </main>
  )
}
