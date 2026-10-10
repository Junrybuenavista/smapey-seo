"use client"

import InternalLinks from "@/components/InternalLinks"
import {
  Navbar, Footer, CTA, ArticleHero, AH2, AH3, AP, Bullets, KeyFacts, CostTable, Cite,
  FAQList, SoftwarePitch, INK, AMBER, CREAM, HUB_PATH,
} from "@/components/barbershop/shared"
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
        badge="Philippines · Step-by-step"
        title={<>How to start a barbershop business in the Philippines</>}
        intro="A barbershop doesn't take much to open: a small room, two or three chairs, and barbers who already have the skill. What decides whether it lasts is what most guides skip: the sanitary permit and health certificates the Code on Sanitation requires, how you pay your barbers, and a plan that shows how many heads a day it takes to cover the rent. Here's all of it, in order, with a business plan to fill in."
      />

      <article className="max-w-3xl mx-auto px-6 py-16">
        <KeyFacts items={[
          { k: "A small 10–20 m² shop", v: "₱180,000 to ₱335,000 in one 2026 budget" },
          { k: "A barber chair", v: "₱2,500 used to ₱50,000+, on listings and in one business plan" },
          { k: "Permit barbershops can't skip", v: "Sanitary permit, plus a health certificate for every barber" },
          { k: "Barbers' share in the leading court case", v: "50% to 60% of what customers paid" },
        ]} />

        <AH2>Step 1: Decide what kind of barbershop you&apos;re opening</AH2>
        <AP>The money, the space and the prices all follow from this, so decide it first.</AP>
        <Bullets items={[
          <><strong>Neighbourhood shop.</strong> One to three chairs, mostly walk-ins and regulars, low prices and low rent. The budget in Step 3 is for a shop this size.</>,
          <><strong>Modern barbershop.</strong> Fades, designs and beard work in a commercial strip or a mall, with aircon and a fit-out customers notice, at higher prices.</>,
          <><strong>Premium barbershop.</strong> Hot-towel shaves, packages and bookings, with the highest rent and fit-out of the three.</>,
          <><strong>Franchise.</strong> A known brand and its system, for a fee, a royalty and a much larger budget.</>,
        ]} />
        <AP>
          The franchise figures we could find are years old or undated, so treat them as a sense of scale and ask each brand
          for its current package:
        </AP>
        <CostTable
          rows={[
            ["GQ Barbershop: franchise fee", "₱300,000, plus 5% of gross sales"],
            ["GQ Barbershop: capital required", "₱2,000,000"],
            ["Bruno's Barbers (2018): franchise fee, 5 years", "₱550,000"],
            ["Bruno's Barbers (2018): total capital, fee included", "₱3.8M – ₱4.5M"],
            ["The Good Barber (2015): franchise fee", "₱500,000"],
            ["The Good Barber (2015): capital, in-line store", "₱2.5M – ₱2.9M"],
          ]}
          note="GQ Barbershop's own franchise page, undated, which also gives a five-year term. Franchise Manila on Bruno's Barbers (June 2018) and on The Good Barber (June 2015), which asked for 60 to 70 m² of space. Fees and packages have almost certainly changed since."
        />

        <AH2>Step 2: Find the location, and size the room</AH2>
        <AP>
          Walk-ins decide most barbershops, so look for people passing on foot: near subdivisions, schools, offices,
          terminals and markets, visible from the street. Walk past the nearest barbershops at their busiest hour, note
          what they charge and how long their line is, and check that zoning allows the shop before you sign a lease.
        </AP>
        <AP>
          A small shop needs less room than people expect: Business Diary PH&apos;s budget below is for 10 to 20 square
          metres with two or three chairs. Before you sign, check the space against the Department of Health&apos;s rules
          for barbershops, because the plumbing is the expensive thing to add later:
        </AP>
        <Bullets items={[
          "At least one hand-washing facility and one water closet for every five chairs.",
          "Walls and ceilings that are smooth, tightly built and easy to keep clean.",
        ]} />
        <AP>
          You&apos;ll also want running water at the back for washing hands and tools, and at a sink if you&apos;ll offer a
          shampoo. Confirm the rest of the layout with your health office before the renovation starts.
        </AP>
        <Cite>
          Department of Health, Implementing Rules and Regulations of Chapter XII, &ldquo;Tonsorial and Beauty
          Establishments&rdquo;, of the Code on Sanitation of the Philippines (PD 856), 15 December 1997. Space from Business Diary PH,
          &ldquo;How To Start A Barber Shop Or Men&apos;s Grooming Studio: Step-by-Step Guide&rdquo;, 2026.
        </Cite>

        <AH2>Step 3: Budget for the shop you&apos;re opening</AH2>
        <AP>
          The most specific Philippine budget we found is Business Diary PH&apos;s 2026 one for a small shop of 10 to 20
          square metres with two or three chairs:
        </AP>
        <CostTable
          rows={[
            ["Renovating the shop, 10–20 m²", "₱80,000 – ₱150,000"],
            ["Barber chairs, 2–3", "₱30,000 – ₱60,000"],
            ["Mirrors and lighting", "₱20,000 – ₱40,000"],
            ["Tools such as clippers and scissors", "₱25,000 – ₱40,000"],
            ["Towels and products", "₱15,000 – ₱30,000"],
            ["Permits and registration, such as DTI and BIR", "₱10,000 – ₱15,000"],
          ]}
          total={["Total", "₱180,000 – ₱335,000"]}
          note="Business Diary PH's sample budget, 2026. The six lines add up to the total, so there's no line for rent, a rental deposit, or the barbers' pay before the shop earns. Add those from the lease you're offered and your own quotes."
        />
        <AP>
          On top of that, keep working capital. A new shop takes months to build its regulars, and the rent is due from the
          first one. The business plan section below turns these numbers into a break-even point, so you know how many heads
          a day the shop needs before it stops eating your savings.
        </AP>

        <AH2 id="barber-chair-price">How much is a barber chair in the Philippines?</AH2>
        <AP>
          The chair is the one piece of equipment every customer sits in, and after the renovation the chairs are the
          biggest line in the budget above. Prices on Philippine listings run from a few thousand pesos for a used
          hydraulic chair to tens of thousands for a heavy one:
        </AP>
        <CostTable
          rows={[
            ["Used hydraulic chair, on Carousell", "₱2,500 – ₱4,500"],
            ["New classic barber chair, on Carousell", "₱14,000"],
            ["Hydraulic chair, in a Philippine business plan", "₱15,000 – ₱50,000+"],
            ["Heavy glass-and-wood model, on Carousell", "₱40,000"],
            ["Factory chair on Alibaba, before shipping and import costs", "About US$110 – US$190"],
          ]}
          note="Listings we found on Carousell Philippines and Alibaba in October 2026, and the per-chair estimate in Aviaan Accounting's barber shop business plan for the Philippines. Listings change daily and a listed price isn't a sale price. Factory listings usually set a minimum order of three to six chairs."
        />
        <AP>Before you pay for one, check it in person:</AP>
        <Bullets items={[
          "The hydraulic pump lifts smoothly and holds its height with someone sitting in it, without sinking.",
          "It reclines and has a headrest, if you'll offer shaves and hot-towel services.",
          "The seat is covered in something you can wipe clean between customers.",
          "The base is heavy and wide enough not to rock, and the footrest sits at a comfortable height.",
          "Someone near you can service the pump. A cheap chair you can't repair costs more by the second year.",
        ]} />

        <AH2>Step 4: Register the business and line up the permits</AH2>
        <AP>
          The order varies by LGU, so treat this as the list rather than the schedule. Most offices want the earlier
          registrations before they&apos;ll issue the later ones.
        </AP>
        <Bullets items={[
          <><strong>DTI</strong> business name registration if you trade under a shop name, or <strong>SEC</strong> for a partnership or corporation.</>,
          <><strong>Barangay clearance</strong> for the address.</>,
          <><strong>Sanitary permit</strong> from the city or municipal health office, and a <strong>health certificate</strong> for every barber. These are the barbershop-specific ones, and they have their own section below.</>,
          <><strong>Mayor&apos;s or Business Permit</strong> from your city or municipal hall.</>,
          <><strong>BIR registration</strong> for your Certificate of Registration, invoices and books of accounts.</>,
          <><strong>Fire Safety Inspection Certificate</strong> from the Bureau of Fire Protection, which the business permit asks for.</>,
          <><strong>SSS, PhilHealth and Pag-IBIG</strong> employer registration once you hire, and that includes barbers paid on commission, as Step 6 explains.</>,
        ]} />

        <AH3>The sanitary permit and the barbers&apos; health certificates</AH3>
        <AP>
          Section 58 of the Code on Sanitation of the Philippines covers barbershops, beauty parlours and similar
          establishments. Among its rules, four shape how you open and run the shop:
        </AP>
        <Bullets items={[
          "The shop needs a sanitary permit from the local health authority before it operates.",
          "No one may be employed to serve customers without a health certificate from the local health authority.",
          "Every customer gets clean, fresh towels and linen.",
          "Tools are cleaned and disinfected before and after every use.",
        ]} />
        <AP>
          You apply to the city or municipal health office, which inspects the shop and issues the permit once it passes.
          The fee itself is small: Bago City lists ₱50 for a sanitary permit and Bacolod ₱100. What each barber needs for
          the health certificate depends on the LGU. Morong, Rizal lists a chest X-ray valid for a year, a urinalysis and
          a fecalysis, with an HBsAg test if the health officer asks for it. San Clemente, Tarlac lists a chest X-ray for
          barbershops. Dumaguete lists a chest X-ray, a urinalysis and an STI and HIV seminar certificate. Call your own
          health office for its current list before you send barbers to a clinic.
        </AP>
        <Cite>
          Presidential Decree No. 856, Code on Sanitation of the Philippines (1975), Chapter XII, Section 58, and the
          Department of Health&apos;s 1997 implementing rules for that chapter. Requirement lists published by the Municipality
          of Morong, Rizal (2018), the Municipality of San Clemente, Tarlac, Dumaguete City, Bago City and Bacolod City
          (2025). Your city or municipal health office is the authority on what applies to your shop.
        </Cite>

        <AH2>Step 5: Fit out the shop and buy the tools</AH2>
        <AP>
          Spend where customers look: the chairs, the mirrors and the light at each station, and a floor that&apos;s swept
          between cuts. A starter list:
        </AP>
        <Bullets items={[
          "Barber chairs, one per barber, and seats for the people waiting",
          "Mirrors and good, even lighting at every station",
          "Clippers, trimmers and shavers, with spare blades",
          "Scissors, combs and brushes",
          "A straight razor that takes disposable blades, so every customer gets a fresh one",
          "A disinfectant or sterilizer for tools, since the Code requires cleaning before and after every use",
          "Enough towels and capes for a clean set per customer, and a way to wash them",
          "Neck strips, talc, and the products you'll use and sell: pomade, wax, shampoo",
          "A counter, and a way to keep track of who's next",
        ]} />
        <AP>
          Business Diary PH&apos;s 2026 budget puts mirrors and lighting at ₱20,000 to ₱40,000, tools at ₱25,000 to ₱40,000
          and towels and products at ₱15,000 to ₱30,000. Get three quotes for anything over a few thousand pesos.
        </AP>

        <AH2>Step 6: Hire barbers, and decide how they&apos;re paid</AH2>
        <AP>
          Hire for the cut, not the CV: ask an applicant to cut a willing customer and watch how they work, talk and clean
          up. TESDA&apos;s Barbering NC II is the national certificate for the trade, covering haircutting and the shaving and
          styling of beards and moustaches, and it&apos;s worth asking for, especially from a barber early in their career.
        </AP>
        <AP>
          Then decide how they&apos;re paid. The usual choices are a share of each haircut, a daily rate, or a base plus a share.
          A share pays more on a busy Saturday and less on a slow Tuesday, which suits barbers who build their own regulars.
        </AP>
        <AH3>Commission barbers are still employees</AH3>
        <AP>
          This is the part that catches owners out. In <em>Corporal v. NLRC</em>, the barbers of a Manila barbershop received
          50 to 60 percent of what customers paid, and the Labor Arbiter and the NLRC both treated them as partners in a
          joint venture rather than employees. The Supreme Court disagreed. The shop owned the premises and the equipment, the barbers owned only small
          hand tools, and they reported to work daily during set hours, so they were the shop&apos;s regular employees. Sharing the
          proceeds of every job, the Court said, didn&apos;t make them any less the shop&apos;s employees. It awarded them
          separation pay and 13th month pay.
        </AP>
        <AP>So budget for what employees are owed, whichever way you pay:</AP>
        <Bullets items={[
          "At least the minimum wage for an eight-hour day. Workers paid by results must receive it, so a share that falls short on a slow day has to be topped up.",
          "SSS, PhilHealth and Pag-IBIG contributions.",
          "13th month pay.",
        ]} />
        <Cite>
          Corporal, Sr. v. National Labor Relations Commission, G.R. No. 129315, 2 October 2000 (Supreme Court, Second
          Division). Labor Code of the Philippines, Article 124 as amended by RA 6727, on workers paid by results. TESDA
          Barbering NC II, under TESDA Resolution No. 2010-18. Check the current minimum wage for your region with DOLE.
        </Cite>

        <AH2>Step 7: Set your prices</AH2>
        <AP>
          Price by service: a haircut, a haircut with shampoo, a shave, a beard trim, a kids&apos; cut, and any colour or
          treatment you offer. Start from the three shops nearest you, then decide on purpose whether to match them,
          undercut them, or charge more for something they don&apos;t offer. For reference, here&apos;s what two chains list:
        </AP>
        <CostTable
          rows={[
            ["Pablings: regular cut (Tabas Pablings)", "₱299"],
            ["Pablings: haircut and shave", "₱499"],
            ["Bruno's Barbers: haircut", "₱480"],
            ["Bruno's Barbers: haircut with shampoo and blow-dry", "₱580"],
          ]}
          note="From each chain's own services page, checked in October 2026. One Pablings branch's booking page lists the regular cut at ₱250, and Bruno's has said its prices may vary outside Metro Manila, so even within a chain the price follows the location."
        />
        <AP>
          Know what a head costs you before you settle the price: the barber&apos;s share, the blades, neck strip and towel,
          and a slice of the rent. The calculator below does that arithmetic.
        </AP>

        <AH2 id="business-plan">Step 8: Write the barber shop business plan</AH2>
        <AP>
          A plan is for whoever decides whether the money goes in: a bank or lending cooperative, a partner, a family member,
          or yourself. Write it for that reader, with the source of every figure. Write the executive summary last.
        </AP>

        <Part n={1} title="Executive summary">
          <AP>One page that lets a reader stop and still know whether they&apos;re interested: what, where, how much, and when it pays for itself.</AP>
          <Sample>
            [Shop name] is a [neighbourhood / modern / premium] barbershop at [location], open [days and hours]. With
            [number] chairs and [number] barbers it can serve up to [daily capacity] customers a day, at ₱[price] for a
            haircut. It needs ₱[total] to open and breaks even at [break-even] customers a day.
          </Sample>
        </Part>

        <Part n={2} title="The business">
          <Sample>
            [Shop name] is owned by [owner] as a [sole proprietorship / partnership / corporation]. It offers [haircut,
            haircut and shampoo, shave, beard trim, kids&apos; cut] and sells [pomade, wax, shampoo].
          </Sample>
        </Part>

        <Part n={3} title="Market and location">
          <AP>
            For a barbershop this is a few streets, not the national market. Count the people passing at your busiest hour,
            list the barbershops nearby with their prices and lines, and note who is around.
          </AP>
          <Sample>
            [Location] is near [a school, offices, a terminal, a subdivision]. The nearest barbershops are [names], charging
            ₱[price] for a haircut. Our customers will be [who], and we&apos;ll reach them with [a tarpaulin, a Facebook page,
            a launch promo].
          </Sample>
        </Part>

        <Part n={4} title="Services and prices">
          <Sample>
            Haircut ₱[ ], haircut and shampoo ₱[ ], shave ₱[ ], beard trim ₱[ ], kids&apos; cut ₱[ ]. Products: [pomade] at
            ₱[ ], [wax] at ₱[ ].
          </Sample>
        </Part>

        <Part n={5} title="Operations and capacity">
          <AP>
            How a customer moves from the door to the drawer, and how many the shop can physically serve in a day: chairs ×
            hours open × customers per chair an hour. Time your barbers on a busy day rather than guessing.
          </AP>
          <Sample>
            [Number] chairs, open [hours] a day, [days] days a week. Walk-ins join one line with their barber or anyone
            free[, and bookings are taken for (times)]. At closing, [who] adds up the sales and each barber&apos;s share and
            counts the cash.
          </Sample>
        </Part>

        <Part n={6} title="Compliance">
          <Sample>
            Registered with [DTI / SEC]; barangay clearance, sanitary permit and Mayor&apos;s Permit from [LGU]; health
            certificates for all [number] barbers; BIR registration; Fire Safety Inspection Certificate; registered as an
            employer with SSS, PhilHealth and Pag-IBIG.
          </Sample>
        </Part>

        <Part n={7} title="Management and barbers">
          <Sample>
            [Owner] manages the shop and does the daily closing. [Number] barbers are paid [share]% of each haircut[, plus
            (allowance)], with at least the [region] minimum wage on a full day, SSS, PhilHealth, Pag-IBIG and 13th month
            pay.
          </Sample>
        </Part>

        <Part n={8} title="The financial plan">
          <AP>
            The startup budget from Step 3 with your own quotes in it, the monthly numbers below, and break-even. Show month
            one lower than month twelve: regulars take time to build, and a flat line from opening day tells a reader the
            plan is a guess.
          </AP>
          <CostTable
            rows={[
              ["What an average customer pays", "Your price list and the mix of services you expect"],
              ["Barber's share per customer", "Your commission rule"],
              ["Supplies per customer", "Blades, neck strips, talc, disinfectant, towel washing"],
              ["Rent", "From the lease you're offered"],
              ["Electricity and water", "Aircon, clippers, lights and the sink, from the meter or the landlord"],
              ["Pay that isn't per head", "Your region's minimum wage, SSS, PhilHealth, Pag-IBIG and 13th month pay"],
              ["Permits", "Yearly LGU fees and health certificates, ÷ 12"],
              ["Equipment", "Written quotes, or the chair prices above"],
            ]}
            note="A worksheet, not an example. Revenue is customers a day × what an average customer pays × days open."
          />
        </Part>

        <Part n={9} title="Risks">
          <Bullets items={[
            "Slow weekdays, and how many customers a day you can survive on.",
            "A barber leaving and taking their regulars with them.",
            "A new barbershop opening on your street, and what keeps your customers coming back.",
            "Cash that never reaches the drawer, and how every customer gets written down.",
            "A failed sanitary inspection, and the cleaning routine that prevents it.",
            "Rent going up when the lease is renewed.",
          ]} />
        </Part>

        <AH2>Break-even, worked out as you type</AH2>
        <AP>
          Break-even is the number a lender turns to first: how many customers a day before the shop stops losing money.
          Each customer leaves you what they pay minus the barber&apos;s share and the supplies, and that has to cover the
          month&apos;s fixed costs.
        </AP>
        <BreakEvenCalculator />
        <AP>
          Then compare the answer with your capacity and your street. If break-even needs more customers than your chairs
          can serve, the plan can&apos;t work as written. If it needs more than plausibly pass your door, you&apos;re betting on
          drawing customers from further away, which is a harder business. Better to find out on paper.
        </AP>

        <AH2>Step 9: Run the day without leaks</AH2>
        <AP>
          A barbershop runs on cash and on memory: who&apos;s next, who cut whom, and what each barber is owed at closing.
          That&apos;s where the money and the arguments go missing. What you need to track is small but constant:
        </AP>
        <Bullets items={[
          "Every customer, with their barber and their services, including the ones who paid cash.",
          "The price from your list, and a record of every discount and who gave it.",
          "Each barber's share, worked out per customer instead of remembered at closing.",
          "Cash apart from GCash, since only the cash should be in the drawer.",
          "At closing: the day's sales, each barber's share, and what the drawer should hold.",
        ]} />

        <SoftwarePitch
          body="Smapey Barbershop keeps the walk-in line with each barber's wait, and brings regulars back with their usual barber and cut. Each barber's share is worked out the moment a customer pays, and closing adds up the day's sales and shares with GCash apart from cash. Try it on the Free plan."
        />
        <AP>
          Or see everything it does on the <a href={HUB_PATH} className="font-bold underline" style={{ color: INK }}>Smapey Barbershop page</a>.
        </AP>

        <AH2>Frequently asked questions</AH2>
        <FAQList faqs={FAQS} />
      </article>

      <CTA />
      <InternalLinks cluster="barbershop" currentPath="/barbershop/how-to-start-a-barbershop-business-philippines" />
      <Footer />
    </main>
  )
}
