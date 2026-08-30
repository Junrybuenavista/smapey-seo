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
        badge="Philippines · Capital"
        title={<>Laundry business capital: what you actually need</>}
        intro="Most laundry plans budget the opening and forget the months after it. The shop that fails rarely miscounted the fit-out; it ran out of cash in month four, while the machines sat there working. This is how to separate the money that opens the doors from the money that keeps them open, and how to build a figure you can defend to a lender or to yourself."
      />

      <article className="max-w-3xl mx-auto px-6 py-16">
        <Animate>

          <AH2>Two different numbers, and everyone quotes only the first</AH2>
          <AP>
            When someone asks what capital a laundry business needs, they are almost always given the startup cost:
            equipment, fit-out, deposit, permits. That number is real, and you can find it in every guide including
            our own <Link href="/laundry/how-to-start-a-laundry-business-philippines" className="underline">step-by-step
            guide</Link>. It is also only half of what you need in the bank.
          </AP>
          <Bullets items={[
            <><strong>Startup capital</strong> is what you spend once to exist: machines, renovation, deposits, registration, signage, your first stock of detergent and hangers.</>,
            <><strong>Working capital</strong> is what you spend every month regardless of how many customers walk in: rent, salaries, electricity, water, gas, supplies, loan repayments. You need enough of it banked to survive the gap between opening and being busy.</>,
          ]} />
          <AP>
            That gap is the whole problem. A laundry does not open full. It fills as the surrounding streets discover
            it, and that takes months, not weeks - this is a business built on repeat customers, and a repeat customer
            has to visit once before they can repeat. Meanwhile rent is due on the first, staff are paid whether the
            machines ran or not, and the electricity bill arrives sized to your actual usage rather than your hopes.
          </AP>
          <AP>
            So the real question is not &ldquo;what does it cost to open a laundry&rdquo;. It is <strong>what does it cost
            to open a laundry and then survive being quiet for several months</strong>. Budget the second number and the
            first takes care of itself.
          </AP>

          <AH2>How much runway to hold back</AH2>
          <AP>
            There is no single correct answer, but there is a correct method: work out your true monthly operating cost,
            then decide how many months of it you are willing to fund out of savings before the shop pays for itself.
          </AP>
          <Bullets items={[
            <><strong>Count every fixed cost, not just rent.</strong> Salaries and the statutory contributions on top of them, rent, the minimum electricity and water you will draw even on a slow day, internet, permits that renew annually, and any loan repayment.</>,
            <><strong>Add the variable costs at a realistic volume</strong>, not your target volume. Detergent, fabric conditioner, plastic, LPG if you dry with gas.</>,
            <><strong>Multiply by the months you expect to be building up.</strong> Ask two or three existing shop owners in your area how long theirs took to get busy. It is the single most useful question you can ask, and most owners will answer it honestly.</>,
          ]} />
          <AP>
            Hold that amount back before you spend a peso on machines. If holding it back means you cannot afford the
            equipment you wanted, that is the plan telling you something true: buy fewer machines and keep the runway.
            You can add a machine out of revenue. You cannot add rent money out of an empty account.
          </AP>

          <AH2>Capital by model, side by side</AH2>
          <AP>
            The three laundry models differ in capital by more than ten times, which is why published figures are so
            confusing. What is less obvious is that they differ in <em>shape</em> too - where the money goes, and how
            much of it is recoverable if the business does not work.
          </AP>
          <AP>
            The structural difference is worth understanding even before the numbers land. A <strong>drop-off shop</strong>{" "}
            spends least and spends it mostly on machines, which hold some resale value. A <strong>full-service shop</strong>{" "}
            adds payroll, which is not capital at all but a permanent monthly obligation - it moves your risk from the
            opening into every month afterwards. A <strong>self-service laundromat</strong> front-loads almost everything:
            you buy a whole floor of commercial machines and a coin or card system before you take a single peso, and much
            of the fit-out is sunk in a space you do not own.
          </AP>

          <AP>
            Published Philippine figures cluster around the standard shop, because that is what most people open. Here
            is what those sources say, and it is worth treating as a sanity check on your own quotations rather than as
            a budget.
          </AP>
          <CostTable
            rows={[
              ["Total initial setup, standard shop", "₱250,000 – ₱400,000"],
              ["Equipment, 3–5 washers and dryers", "₱150,000 – ₱250,000"],
              ["Monthly rent, suitable location", "₱20,000 – ₱40,000"],
              ["Registration and permits", "₱5,000 – ₱20,000"],
              ["Self-service laundromat", "Materially higher — see below"],
            ]}
            note="Published ranges from Philippine startup guides, not quotations. The setup, equipment and rent figures are from a source dated 15 October 2025; the permits range from guides last updated December 2024. Confirm all of it locally before budgeting."
          />
          <AP>
            <strong>We are not giving you a laundromat figure, deliberately.</strong> Published costs for self-service
            laundromats range so widely — some franchise packages have been advertised well into seven figures — that
            any single number would mislead more than it helps. What is reliable is the <em>shape</em>: a laundromat
            buys an entire floor of commercial machines and a coin or card system before taking a single peso, so its
            capital is several times a drop-off shop&apos;s and almost none of it is deferrable. If that is the model
            you want, price it from supplier quotations only.
          </AP>
          <AP>
            One financing route worth knowing before you size the cheque: several Philippine equipment suppliers offer
            rent-to-own or instalment terms. That converts a large one-time capital outlay into a monthly cost, which
            changes the whole shape of the plan - it lowers the money you need on day one but adds a fixed monthly
            obligation to the runway calculation above. Whether that is a good trade depends entirely on how long your
            build-up takes.
          </AP>

          <AH2>The costs almost every plan leaves out</AH2>
          <AP>
            These are the lines that turn a carefully budgeted opening into a scramble. None of them are exotic; they are
            just easy to forget because they are not the exciting part.
          </AP>
          <Bullets items={[
            <><strong>Utility connection deposits.</strong> A commercial water and electricity account is not a household one. Expect deposits, and expect the electricity deposit in particular to be sized against your expected load, which for a laundry is not small.</>,
            <><strong>The gap between paying and opening.</strong> Rent usually starts when you take the space, not when you open. Fit-out, inspections and permit processing all take time, and you are paying rent throughout.</>,
            <><strong>Water pressure and drainage work.</strong> Covered in the <Link href="/laundry/washing-machine-for-laundry-business" className="underline">machines guide</Link> - if the space cannot deliver water fast enough or take the discharge, fixing it is a real construction cost.</>,
            <><strong>Electrical upgrade.</strong> If your machines need three-phase power and the unit has single-phase, that is an expense and a delay, not a formality.</>,
            <><strong>Spare parts and the first breakdown.</strong> Something will fail in year one. A shop with no cash for a repair loses the machine and the customers who were relying on it.</>,
            <><strong>Signage, and the permit for the signage.</strong> Many LGUs charge separately for a signboard permit.</>,
            <><strong>Your own living costs.</strong> If this is your only income, the business has to carry you too during the quiet months. Plans routinely omit the owner&apos;s salary and then wonder where the money went.</>,
          ]} />

          <AH2>Registration and permit costs</AH2>
          <AP>
            The paperwork is a small share of total capital but it gates your opening date, so it belongs in the plan
            early. The set is the usual one for a Philippine small business, plus the sanitary permit that a laundry
            will be looked at carefully for.
          </AP>
          <Bullets items={[
            <><strong>DTI business name registration</strong> for a sole proprietorship, or SEC registration for a partnership or corporation.</>,
            <><strong>Barangay business clearance</strong>, then the <strong>Mayor&apos;s or business permit</strong> from your City or Municipal Hall.</>,
            <><strong>BIR registration</strong>, for your Certificate of Registration and your invoices.</>,
            <><strong>Sanitary permit</strong> from the local health office — a laundry will be looked at more closely here than a general retail shop.</>,
            <><strong>Fire safety inspection certificate</strong> and an <strong>occupancy permit</strong> for the space. These two gate your opening date more often than anything else on the list.</>,
            <>Plus a <strong>Cedula</strong> and your contract of lease or proof of ownership.</>,
          ]} />
          <AP>
            <strong>We are not publishing a fee table for these, on purpose.</strong> Several of them are not flat
            charges at all — they are computed from your declared capitalisation or your floor area, which means the
            same permit costs different amounts for two shops on the same street. Every LGU also sets its own schedule.
            A table of figures copied from another city would look authoritative and be wrong for you, which is the
            worst combination.
          </AP>
          <Cite>
            Published guides put the paperwork in total at roughly ₱5,000–₱20,000 for a standard shop, last updated
            December 2024 — useful as an order of magnitude, not as a budget line. For the real number, ask your own
            City or Municipal Hall for the current schedule of fees before you commit to a location, since the
            capitalisation-based ones scale with the size of business you declare.
          </Cite>

          <AH2>Building a capital figure you can defend</AH2>
          <AP>
            If you are taking this to a lender, a cooperative or a family member, the number matters less than being able
            to show how you got to it. Work through it in this order and write down every assumption.
          </AP>
          <Bullets items={[
            <><strong>Pick the model</strong>, and say so explicitly at the top. Half of all confusion about laundry capital comes from mixing models.</>,
            <><strong>Size the machines from demand</strong>, using the capacity calculation in the <Link href="/laundry/washing-machine-for-laundry-business" className="underline">machines guide</Link>, and attach the supplier quotations.</>,
            <><strong>Get the space costs in writing</strong> - deposit, advance, and when rent starts.</>,
            <><strong>Total the one-time spend.</strong> That is your startup capital.</>,
            <><strong>Build the monthly operating cost separately</strong>, then multiply by your build-up period. That is your working capital.</>,
            <><strong>Add the two, then add a contingency</strong> for the breakdown, the inspection that needs a second visit, the thing you did not think of.</>,
          ]} />
          <AP>
            A plan that shows a modest shop with six months of runway will convince a lender faster than an ambitious one
            with none, because the second one is visibly a gamble and the first one is a business. The full document
            structure is in the{" "}
            <Link href="/laundry/laundry-shop-business-plan-philippines" className="underline">laundry business plan
            guide</Link>.
          </AP>

          <AH2>Knowing where the money actually went</AH2>
          <AP>
            Capital planning does not stop when you open. The shops that survive their quiet months are the ones whose
            owners can see, weekly, what came in and what it cost - not the ones reconstructing it from a notebook at
            the end of the month when the money is already gone.
          </AP>
          <Bullets items={[
            "Daily revenue you can see at closing time, not guess at.",
            "Who has paid and who has not, so unpaid pickups are not silently funding your customers.",
            "Order volume by week, so you can tell a build-up from a plateau early enough to act.",
            "Payment method split, so GCash and cash both reconcile.",
          ]} />

          <SoftwarePitch />

          <AH2>Frequently asked questions</AH2>
          <FAQList faqs={FAQS} />
        </Animate>
      </article>

      <CTA />
      <InternalLinks
        cluster="laundry"
        currentPath="/laundry/laundry-business-capital-philippines"
      />
      <Footer />
    </main>
  )
}
