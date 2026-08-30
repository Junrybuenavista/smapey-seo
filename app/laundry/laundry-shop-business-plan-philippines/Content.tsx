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
        badge="Philippines · Business plan"
        title={<>Writing a laundry shop business plan</>}
        intro="Most laundry business plans are a generic template with the word laundry pasted into it, which is why lenders skim them and owners never open them again. A plan for this business has to answer questions a template does not ask: how many kilos a day the shop can physically move, how long it will take to fill, and what happens when a machine stops. Here is the structure, section by section, and the arithmetic that makes it credible."
      />

      <article className="max-w-3xl mx-auto px-6 py-16">
        <Animate>

          <AH2>Work out who the plan is for first</AH2>
          <AP>
            The document changes completely depending on who reads it, and writing one plan for every audience produces
            something that satisfies none of them.
          </AP>
          <Bullets items={[
            <><strong>A bank or lending cooperative</strong> wants to know how you repay them. The financial projections and your assumptions carry the whole document; the vision paragraph is decoration.</>,
            <><strong>A franchisor</strong> mostly wants to see that you can fund the package and run it. Their model is fixed, so your operational creativity is not the point.</>,
            <><strong>An investor or a family member putting money in</strong> wants the risk laid out honestly. What kills this shop, and what have you done about it.</>,
            <><strong>Yourself</strong> - and this is the audience most worth writing for. A plan you argue with before spending money is cheaper than one you discover was wrong afterwards.</>,
          ]} />
          <AP>
            If you are writing for a lender, put the numbers first and the story second. If you are writing for
            yourself, write the section you least want to write, which is usually the one about what goes wrong.
          </AP>

          <AH2>The sections, and what a laundry plan must put in each</AH2>
          <AP>
            The skeleton is the standard one. What makes it a laundry plan rather than a template is what goes inside.
          </AP>

          <AP><strong>1. Executive summary.</strong> One page, written last. Which of the three models you are opening,
          where, what it costs, when it breaks even. A reader should be able to stop after this page and know whether
          they are interested.</AP>

          <AP><strong>2. The business.</strong> State the model explicitly - drop-off, full-service, or self-service
          laundromat. This single sentence prevents most of the confusion that follows, because the three differ in
          capital by more than ten times and a reader who assumes the wrong one will find every later number
          inexplicable. The models are compared in the{" "}
          <Link href="/laundry/how-to-start-a-laundry-business-philippines" className="underline">step-by-step
          guide</Link>.</AP>

          <AP><strong>3. Market and location.</strong> For a laundry this is not a general market survey, it is a
          question about a few hundred metres. Who lives within walking distance, do they have machines at home, are
          there dormitories, boarding houses, condominiums or small offices nearby, and how many laundries already
          serve them. Walk the streets and count. A laundry&apos;s catchment is small and specific, and a plan that
          describes the national market instead of the surrounding blocks tells the reader you have not done the
          work.</AP>

          <AP><strong>4. Services and pricing.</strong> How you charge - per kilo, per load, or per service tier - and
          what a customer actually gets. Include your turnaround promise, because it is the thing customers choose on
          and the thing your equipment has to be able to keep.</AP>

          <AP><strong>5. Operations and capacity.</strong> The section generic templates omit entirely, and the one
          that decides whether the plan holds together. See below.</AP>

          <AP><strong>6. Compliance.</strong> Registration, permits, and the sanitation requirements that apply
          specifically to laundries rather than to shops in general. Lenders read this as a proxy for whether you
          have thought seriously about the business.</AP>

          <AP><strong>7. Financials.</strong> Startup capital, working capital, monthly operating costs, revenue
          projections, break-even, and the assumptions behind every one of them.</AP>

          <AP><strong>8. Risks.</strong> What happens when a machine breaks, when the rainy season hits, when a
          competitor opens across the road, when the build-up takes twice as long as you hoped.</AP>

          <AH2>The capacity section, which is where laundry plans are won</AH2>
          <AP>
            A laundry is a throughput business. Its ceiling is not demand in the abstract, it is the number of kilos
            your machines can physically move in a day - and no amount of marketing gets you past it. Any reader who
            knows the trade will look for this, and its absence is the fastest way to lose them.
          </AP>
          <Bullets items={[
            <><strong>State your daily capacity in kilos</strong>, and show the calculation: machine capacity, realistic cycles per day, number of machines. The method is in the <Link href="/laundry/washing-machine-for-laundry-business" className="underline">machines guide</Link>.</>,
            <><strong>State your dryer capacity separately.</strong> Drying usually takes longer than washing, so dryers, not washers, set your real ceiling. A plan that balances them one-for-one shows it has not been thought through.</>,
            <><strong>Show the week, not the average.</strong> Laundries are busy at the start and end of the week and quiet in the middle. Planning against a flat average hides the days you will be turning customers away.</>,
            <><strong>Say what happens when a machine is down.</strong> Not if - when. If losing one machine collapses your capacity, the reader will see it even if you do not write it.</>,
          ]} />

          <AH2>Building the financial projections</AH2>
          <AP>
            Projections are not a guess dressed in a spreadsheet. Build them from things you can point at, and label
            every assumption so a sceptical reader can test it rather than dismiss the lot.
          </AP>
          <Bullets items={[
            <><strong>Revenue</strong> = realistic kilos per day, times your price per kilo, times operating days. Use a volume you can defend from your capacity calculation and your catchment count, not your capacity ceiling. Nobody runs at 100%.</>,
            <><strong>Ramp it.</strong> Show month one lower than month twelve. A flat projection from opening day is the clearest signal that a plan is fictional, and lenders read it that way.</>,
            <><strong>Fixed costs</strong> - rent, salaries plus the statutory contributions on top of them, minimum utilities, internet, annual permits amortised, loan repayment.</>,
            <><strong>Variable costs</strong> - detergent, fabric conditioner, plastic and packaging, water and electricity above the minimum, LPG if you dry with gas. These scale with volume, so express them per kilo.</>,
            <><strong>Machine replacement.</strong> Set aside something monthly against the day a machine has to be replaced. Plans that ignore this look profitable right up until year three.</>,
          ]} />
          <AP>
            Rather than a worked example built on somebody else&apos;s numbers, fill this in with your own. Every row
            is something you can obtain in an afternoon, and a plan built from these is defensible in a way that a
            borrowed one never is.
          </AP>
          <CostTable
            rows={[
              ["Price per kilo you will charge", "Survey 3 nearby shops"],
              ["Monthly rent", "From the lease you are offered"],
              ["Staff cost per month", "Your region's current NWPC rate, plus SSS, PhilHealth, Pag-IBIG and 13th month"],
              ["Electricity per month", "Machine wattage × hours × your utility's rate"],
              ["Water per month", "Litres per cycle × cycles, at your utility's rate"],
              ["Supplies per kilo", "Detergent, conditioner and packaging, priced per load then divided by kilos"],
              ["Equipment", "Written quotations from 3 suppliers"],
            ]}
            note="A worksheet, not an example. Borrowed figures are the fastest way to make a plan unconvincing, because a lender who knows the trade will recognise numbers that did not come from your own market."
          />
          <AP>
            The two rows people skip are electricity and water, because they look hard. They are not: ask the supplier
            for the machine&apos;s consumption per cycle, multiply by the cycles your capacity calculation produced,
            and apply your own utility&apos;s rate. At shop volumes these are among your largest variable costs, and a
            plan that guesses at them is guessing at its own margin.
          </AP>
          <AP>
            Two things about the salary line are worth getting right, because plans routinely get both wrong.
          </AP>
          <Bullets items={[
            <><strong>Minimum wage is regional, not national.</strong> It is set by the Regional Tripartite Wages and Productivity Boards under the National Wages and Productivity Commission, and the rates differ substantially between NCR and the provinces. A plan that borrows a Metro Manila figure for a provincial shop, or the reverse, is wrong before it starts.</>,
            <><strong>There is usually a lower tier for small establishments.</strong> Wage orders commonly set a reduced rate for retail and service establishments employing not more than fifteen workers - a category most small laundry shops fall into. Check whether your shop qualifies before budgeting the headline rate, because the difference across several staff is material.</>,
            <><strong>Wages are not the whole cost.</strong> Budget the statutory contributions on top - SSS, PhilHealth and Pag-IBIG - plus 13th month pay. A salary line that omits these understates payroll by a meaningful margin.</>,
          ]} />
          <Cite>
            Take the current rate for your own region directly from the National Wages and Productivity Commission
            (nwpc.dole.gov.ph) rather than from any guide, including this one. Wage orders are revised periodically, and
            NCR rates in particular have been the subject of legal challenge during 2026 - so the operative figure is
            something to confirm at the moment you write the plan, not to copy. Last checked 30 August 2026.
          </Cite>

          <AH2>The break-even calculation</AH2>
          <AP>
            This is the number a lender turns to first, and it is simple enough to do on paper. Break-even is the point
            where revenue covers costs and the shop stops consuming your savings.
          </AP>
          <AP>
            Work out your <strong>contribution per kilo</strong>: the price you charge per kilo minus the variable cost
            of washing that kilo. That is what each kilo contributes toward your fixed costs. Then:
          </AP>
          <CostTable
            rows={[
              ["Contribution per kilo", "price per kilo − variable cost per kilo"],
              ["Break-even kilos per month", "monthly fixed costs ÷ contribution per kilo"],
              ["Break-even kilos per day", "break-even kilos per month ÷ operating days"],
            ]}
            note="The arithmetic holds whatever your figures are. Fill in your own numbers and the answer is the volume you must hit every day simply to stand still."
          />
          <AP>
            Now compare that daily figure against two things: your capacity, and your catchment. If break-even needs
            more kilos than your machines can move, the plan is impossible and no amount of optimism fixes it. If it
            needs more kilos than plausibly exist within walking distance, the plan is a bet on drawing customers from
            further away, which is a different and harder business. Either answer is worth discovering on paper.
          </AP>

          <AH2>Mistakes that make a plan unconvincing</AH2>
          <Bullets items={[
            <><strong>Not naming the model.</strong> Every downstream number becomes unreadable.</>,
            <><strong>A flat revenue line from month one.</strong> Nothing signals inexperience faster.</>,
            <><strong>Capacity omitted.</strong> The reader cannot tell whether the revenue is even physically possible.</>,
            <><strong>No working capital.</strong> A plan that funds the opening and nothing after it - the most common and most fatal omission. See the <Link href="/laundry/laundry-business-capital-philippines" className="underline">capital guide</Link>.</>,
            <><strong>No owner&apos;s salary.</strong> If you need to live on this, it is a cost.</>,
            <><strong>Borrowed figures with no date.</strong> Equipment and rent move. A number without a source and a date is not evidence.</>,
            <><strong>A risks section that says &ldquo;competition&rdquo; and stops.</strong> Name the specific risks of this trade: machine failure, the rainy season, a landlord not renewing, a supplier disappearing.</>,
          ]} />

          <AH2>Keeping the plan alive after you open</AH2>
          <AP>
            A plan is worth something only if you can check it against what actually happened. The owners who adjust
            early are the ones who can see their real volume, revenue and payment status week by week rather than
            reconstructing it from a notebook once the money is already gone.
          </AP>
          <Bullets items={[
            "Actual kilos or orders per day, against the projection you wrote.",
            "Revenue by week, so a build-up can be told from a plateau while there is still time to act.",
            "Who has paid and who has not.",
            "Payment method split, so cash and GCash both reconcile.",
          ]} />

          <SoftwarePitch />

          <AH2>Frequently asked questions</AH2>
          <FAQList faqs={FAQS} />
        </Animate>
      </article>

      <CTA />
      <InternalLinks
        cluster="laundry"
        currentPath="/laundry/laundry-shop-business-plan-philippines"
      />
      <Footer />
    </main>
  )
}
