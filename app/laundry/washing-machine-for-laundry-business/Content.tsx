"use client"

import InternalLinks from "@/components/InternalLinks"
import Link from "next/link"
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
        badge="Philippines · Equipment"
        title={<>Choosing washing machines for a laundry business</>}
        intro="The machine question decides more of this business than the location does. Get the capacity wrong and you turn customers away on Mondays while the shop sits idle on Thursdays. Get the class of machine wrong and you replace the whole floor inside two years. Here is how to size and choose, and what your building has to be able to support."
      />

      <article className="max-w-3xl mx-auto px-6 py-16">
        <Animate>

          <AH2>Domestic machines do not survive a laundry shop</AH2>
          <AP>
            This is the single most expensive mistake in the trade, and it is made because the arithmetic looks so
            good at the start. A household washer costs a fraction of a commercial one, so the temptation is to buy
            three or four of them and start earning.
          </AP>
          <AP>
            The difference is not build quality in the abstract, it is duty cycle. A domestic machine is engineered
            around a household&apos;s use, which is a handful of loads a week. A shop runs that many before lunch. The
            parts that fail first are the ones under constant load: bearings, the drive belt or motor coupling, the
            suspension, and the pump. When they go, you are not just paying for a repair, you are down a machine on a
            day when customers are waiting.
          </AP>
          <Bullets items={[
            <><strong>Commercial machines are rated for continuous use</strong> and generally have serviceable, replaceable parts with a supplier who stocks them. That last point matters more than the specification sheet.</>,
            <><strong>Heavy-duty twin-tub and semi-automatic machines</strong> sit between the two, and are how a great many Philippine drop-off shops genuinely do start. They are cheap and repairable, but you are trading your own labour for the machine&apos;s: someone has to move the wash to the spinner.</>,
            <><strong>The honest entry route</strong> is usually a small number of durable machines run hard, rather than a floor of cheap ones. Fewer things to break, and you can add capacity once you know your actual demand.</>,
          ]} />
          <AP>
            If you are starting with domestic or twin-tub machines as a deliberate, temporary step, plan for their
            replacement in your numbers from the beginning rather than being surprised by it.
          </AP>

          <AH2>Work out the capacity you need before you shop for machines</AH2>
          <AP>
            Almost nobody does this, and it is the calculation that decides whether your shop works. Capacity is
            quoted in kilograms, and that figure is the <em>dry</em> weight of clothes the drum is rated for, not the
            weight of the wet load and not the volume of the drum.
          </AP>
          <AP>Do it in this order.</AP>
          <Bullets items={[
            <><strong>Estimate your average bag.</strong> A household drop-off bag is commonly in the region of five to eight kilos. Weigh a few real ones before you commit to anything - your neighbourhood&apos;s bags are the only ones that matter.</>,
            <><strong>Decide your target bags per day.</strong> Be honest, and remember the week is not flat. Most shops see a heavy start and end of week and a quiet middle.</>,
            <><strong>Work out cycles per machine per day.</strong> Divide your operating hours by the machine&apos;s full cycle time, then subtract a realistic allowance for loading, unloading and the gaps when nobody is there to swap a load. Ask the supplier for the cycle time of the specific programme you will actually run, not the fastest one on the panel.</>,
            <><strong>Multiply out.</strong> Capacity in kilos per machine, times realistic cycles per day, gives you the kilos per day that machine can move. Divide your target daily kilos by that to get the number of machines.</>,
          ]} />
          <AP>
            Then add one. Every shop discovers that a machine down for repair on a Monday costs more than the machine
            itself, and a floor with no slack has no answer to it.
          </AP>

          <AH2>The dryer is your real bottleneck, not the washer</AH2>
          <AP>
            This is the part generic equipment guides leave out, and in the Philippines it is the thing that decides
            whether you can promise same-day service.
          </AP>
          <AP>
            Drying takes longer than washing - often substantially longer, depending on the fabric and how well the
            washer spins the water out. So a shop that balances its washers and dryers one-for-one will find the
            washers finishing loads that have nowhere to go, and wet laundry stacking up in baskets. Throughput is set
            by the slowest stage, and that is the dryer.
          </AP>
          <Bullets items={[
            <><strong>Plan dryer capacity against washer output</strong>, not against washer count. If your dryers run appreciably longer per cycle, you need more dryer capacity than washer capacity to keep the line moving.</>,
            <><strong>A high spin speed on the washer buys you dryer time.</strong> The more water the washer extracts, the less the dryer has to remove. This is the main practical argument for a washer-extractor over a basic machine.</>,
            <><strong>Air drying is not a plan here.</strong> In much of the country the rainy season makes line drying unreliable for months at a stretch, and humidity slows it even when it is not raining. A shop that promises a turnaround time needs machine drying it controls.</>,
          ]} />

          <AH2>Front load or top load</AH2>
          <AP>
            For a shop, the argument generally runs toward front loaders, but the reasons are worth knowing rather
            than taking on faith.
          </AP>
          <CostTable
            rows={[
              ["Water use per kilo", "Front loaders generally use less"],
              ["Spin speed and water extraction", "Front loaders generally higher, which shortens drying"],
              ["Gentleness on fabric", "Front loaders, no agitator"],
              ["Cycle time", "Front loaders often longer per cycle"],
              ["Purchase price", "Top loaders generally cheaper up front"],
              ["Loading ergonomics", "Top loaders easier on the back, no bending"],
            ]}
            note="General characteristics of the two designs, not a claim about any specific model. Compare the actual specification sheets of the machines you are quoted, and weigh water and electricity against your own utility rates."
          />
          <AP>
            The water and power difference is not a rounding error at shop volumes. Over hundreds of loads a month it
            compounds into a real line on your operating costs, which is why the higher purchase price of a front
            loader often makes sense in a business where a domestic buyer would choose the top loader.
          </AP>

          <AH2>What your building has to support</AH2>
          <AP>
            More laundry plans die here than anywhere else, and always after the lease is signed. Check all of this
            <em> before</em> you commit to a space, because none of it is cheap to change later.
          </AP>
          <Bullets items={[
            <><strong>Water supply and pressure.</strong> Machines need not just water but water arriving fast enough. A shop running several machines at once can outrun a thin supply line, and low pressure shows up as cycles that stall or run long. Many shops end up needing a storage tank and a pump.</>,
            <><strong>Drainage.</strong> Several machines discharging together is a lot of water in a short time, and it has to go somewhere that will take it. This is a common reason a promising unit turns out to be unusable.</>,
            <><strong>Electrical supply.</strong> Ask the supplier what each machine draws and whether it needs single-phase or three-phase power, then confirm the space can actually deliver it. Upgrading a service is an expense and a delay, not a formality.</>,
            <><strong>Gas, if you are using gas dryers.</strong> That means LPG storage, safe siting, and a fire inspection that will look at it closely.</>,
            <><strong>Floor and space.</strong> Commercial machines are heavy and they vibrate. You also need working room around them, not just the footprint - space to load, unload, and get behind for servicing.</>,
          ]} />
          <Cite>
            Water, drainage, electrical and fire requirements are set by your LGU and by the inspections you will pass
            before opening. Confirm the specifics with your City or Municipal Engineering Office and the Bureau of Fire
            Protection for your location - they vary, and only the local answer counts. The permit sequence is covered
            in the <Link href="/laundry/how-to-start-a-laundry-business-philippines" className="underline">step-by-step
            guide</Link>.
          </Cite>

          <AH2>What machines actually cost</AH2>
          <AP>
            Equipment is normally the largest single line in a laundry startup budget, and it is the line that moves
            most between the three business models. Prices move with the peso, with import costs and with what the
            supplier has in stock, so any figure worth budgeting against has to be current.
          </AP>
          <CostTable
            rows={[
              ["Commercial washing machine, published range", "₱35,000 – ₱180,000"],
              ["3–5 washers and dryers, as a set", "₱150,000 – ₱250,000"],
              ["Suggested starting capacity, small shop", "7 – 10 kg"],
              ["Washer-extractor capacities on the market", "15 kg – 130 kg"],
              ["Delivery and installation", "Usually quoted separately \u2014 ask"],
            ]}
            note="Indicative published ranges, not quotations. The wide band reflects brand, capacity and features, and prices move with the peso and with stock. Confirm current prices with suppliers before budgeting."
          />
          <Cite>
            Sources: published Philippine equipment guides, the ₱35,000–₱180,000 band and the 7–10 kg starting
            recommendation from msme.ph and truehost.ph; the ₱150,000–₱250,000 figure for a set of three to five
            washers and dryers from a Unicapital guide dated 15 October 2025. These are secondary sources with a
            commercial interest, and they disagree with one another by wide margins - treat them as a sanity check on a
            quotation, never as a budget. Last checked 30 August 2026.
          </Cite>
          <AP>
            Price it properly before you commit: get written quotations from at least three suppliers for the specific
            capacities your calculation above produced. Names worth quoting against include Speed Queen Commercial
            Philippines, LG&apos;s commercial laundry line, and local distributors such as Kyzen Trading. Ask each of
            them the questions in the next section, and note that some suppliers offer rent-to-own or financing, which
            changes the capital question substantially - see the{" "}
            <Link href="/laundry/laundry-business-capital-philippines" className="underline">capital guide</Link>.
          </AP>

          <AH2>What to ask a supplier before you pay</AH2>
          <AP>
            The machine is half of what you are buying. The other half is whether it can be kept running, and that is
            the half that decides whether you are still in business in year three.
          </AP>
          <Bullets items={[
            "What is the full cycle time of the programme I will actually run all day, not the quick cycle?",
            "What is the rated capacity in kilos of dry laundry, and what spin speed does it reach?",
            "Is it single-phase or three-phase, and what does it draw?",
            "How much water does a cycle use?",
            "Do you stock spare parts in the country, and which parts are the ones that normally fail?",
            "Who services it, how fast can they come, and what does a call-out cost?",
            "What is the warranty, and what does it specifically exclude?",
            "Is it new, reconditioned, or ex-export? If reconditioned, what was replaced?",
          ]} />
          <AP>
            Reconditioned commercial machines are a real and often sensible option in the Philippines, and plenty of
            working shops run on them. The question is not whether they are acceptable but whether this particular
            seller will still answer the phone when a bearing goes.
          </AP>

          <AH2>Once the machines are running</AH2>
          <AP>
            Equipment decides your capacity. What you do with that capacity decides whether the shop makes money, and
            that comes down to knowing where every bag is and who has paid for it.
          </AP>
          <Bullets items={[
            "A claim stub on every drop-off, so a bag is never identified by memory.",
            "A status you can move as a load goes from washing to drying to folding to ready for pickup.",
            "Who has paid, who has not, and by what - cash, GCash, Maya or bank transfer.",
            "Which machine a load is on, so a customer asking for an update gets a real answer.",
          ]} />

          <SoftwarePitch />

          <AH2>Frequently asked questions</AH2>
          <FAQList faqs={FAQS} />
        </Animate>
      </article>

      <CTA />
      <InternalLinks
        cluster="laundry"
        currentPath="/laundry/washing-machine-for-laundry-business"
      />
      <Footer />
    </main>
  )
}
