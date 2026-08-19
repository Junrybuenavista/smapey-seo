import Link from "next/link"
import SiteNavbar from "@/components/SiteNavbar"
import SiloFooter from "@/components/silo/SiloFooter"
import SiloBreadcrumbs from "@/components/silo/SiloBreadcrumbs"
import SiloChildren from "@/components/silo/SiloChildren"
import SiloUpwardLinks from "@/components/silo/SiloUpwardLinks"
import SiloRelatedHubs from "@/components/silo/SiloRelatedHubs"
import { siloContextFor, anchorFor, APEX } from "@/lib/silo"

const PATH = "/boarding-house/boarding-house-management-and-billing-system"

const INK = "#161616"
const BLUE = "#2f6bff"
const AMBER = "#ff9e2c"
const CREAM = "#fbf7f0"
const MUTED = "#54514c"
const display = { fontFamily: "'Hanken Grotesk', system-ui, sans-serif" }

type Block = { id: string; h2: string; body: string[]; aside?: { title: string; lines: string[] } }

const SECTIONS: Block[] = [
  {
    id: "what-each-tenant-owes",
    h2: "Working out what each tenant owes this month",
    body: [
      "Rent itself is the easy part - a tenant agreed to a monthly rate and that rate is what appears on their bill. The complications arrive at the edges of the month, and they arrive every month.",
      "Somebody moves in on the 14th. Do they owe a full month, or half? Most houses prorate: divide the monthly rate by the days in that month and charge for the days actually occupied. It is worth writing your rule down and applying it consistently, because the alternative is renegotiating the same question with every new tenant and being remembered as inconsistent.",
      "Then there are utilities, which behave differently from rent. Rent is per tenant and fixed. A power or water bill arrives for the whole room and has to be divided among whoever is in it. The tenant's total for the month is their rent plus their share of the room's utilities, and the two should stay visible as separate lines - a tenant who cannot see which part is rent and which is kuryente will assume you rounded something in your favour.",
      "The last piece is anything one-off: a replaced padlock, a share of a repair caused by damage, an agreed penalty. These belong on the bill as their own line with a plain description, never folded silently into the rent figure.",
    ],
    aside: {
      title: "A tenant's monthly total, in order",
      lines: [
        "Rent for the month - prorated if they moved in or out mid-month.",
        "Their share of each room utility, with the division shown.",
        "Any one-off charges, described in plain words.",
        "Less anything already paid, including partial payments.",
      ],
    },
  },
  {
    id: "due-dates",
    h2: "Due dates: one date for the house, or each tenant's own?",
    body: [
      "There are two workable systems and they suit different houses. A single house-wide due date - everyone pays on the 5th, say - is simple to remember and makes chasing arrears a single weekly task rather than a daily one. The drawback is that a tenant who moved in on the 20th pays an awkward part-month at the start, and every tenant's money leaves their hands at the same time, which for a house full of people on the same payroll cycle can be fine or can be a problem.",
      "The alternative is to bill each tenant on their own move-in day. Someone who moved in on the 14th is due on the 14th every month. It matches how the tenant thinks about their own rent, it spreads your collections through the month, and it avoids part-month awkwardness after the first bill. The cost is that you no longer have one date to plan around - there is always someone due.",
      "Whichever you choose, the due date has to be on the bill, and the bill has to reach the tenant before the date rather than after it. A great deal of what owners experience as tenants paying late is really tenants being told late.",
      "One practical detail: if you bill on a tenant's move-in day and someone moved in on the 31st, decide now what happens in February. Clamping to the last day of the month is the usual answer and it should be automatic, not something you remember each year.",
    ],
  },
  {
    id: "deposits-and-advances",
    h2: "Deposits and advances are not the same money",
    body: [
      "These two get conflated constantly, and the confusion is almost always expensive at move-out. An advance is rent paid ahead of time - it covers a month of occupancy. A deposit is security: it is held against unpaid bills or damage and, if nothing is owed, it goes back to the tenant when they leave.",
      "The reason to keep them distinct in your records is that they behave differently. Advance rent gets consumed by a month of living there. A deposit sits untouched, and it is still the tenant's money the whole time it sits with you. Recording both as one lump labelled \"deposit\" is how a house ends up in an argument it cannot win, because nobody can reconstruct which portion was which.",
      "At move-out the deposit has to be reconciled against something concrete: outstanding rent, an unpaid utility share for the final month, an agreed cost for damage beyond fair wear. Each deduction should be a line the tenant can read. A returned deposit with an unexplained amount missing is the single most common source of bad feeling in this business, and it is entirely avoidable with records you already have.",
      "Write the terms into the contract - how much, what it covers, and how long after move-out it is returned - and then follow them. Predictability here is worth more than any individual deduction you might win.",
    ],
    aside: {
      title: "Keep these separate on the record",
      lines: [
        "Advance rent - prepaid occupancy, consumed by a month of staying.",
        "Security deposit - held, still the tenant's money, returned or itemised.",
        "Whether each was actually paid, and on what date.",
      ],
    },
  },
  {
    id: "recording-payments",
    h2: "Recording payments, including the partial ones",
    body: [
      "Money arrives in a boarding house through several channels at once. Cash from the tenant who works nearby, GCash from the one on night shift, a bank transfer from a parent paying for a student, Maya from somebody who prefers it. All of it is rent, and all of it has to land against the right bill.",
      "The digital channels are the ones that go wrong quietly. A GCash transfer arrives with a name that may not match the tenant's name on your records, no reference to which month it covers, and no indication of whether it is the whole amount or part of it. Reconciling a screen of transfers to a list of tenants at the end of the month, from memory, is where errors get baked in.",
      "The habit that prevents most of it: record the payment against a specific bill at the moment you see it, not in a batch later. Which tenant, which month, how much, by what method. If the amount does not clear the bill, the balance carries and the bill stays open rather than being mentally filed as handled.",
      "Partial payments deserve their own mention because refusing to accept them is worse than tracking them. A tenant who can pay sixty percent this week and the rest on payday will pay sixty percent this week if you let them - or nothing at all if the only option is the full amount. What matters is that the remainder stays visible as a balance rather than becoming a thing you were supposed to remember.",
    ],
  },
  {
    id: "arrears",
    h2: "Arrears: catching late rent while it is still small",
    body: [
      "Almost no tenant decides to stop paying. What happens is that one month slips, then the next bill arrives on top of the unpaid one, and at some point the total is larger than anything the tenant can clear in one go. At that point their options narrow to a payment plan or leaving, and neither is good for you.",
      "The intervention that works is early and unremarkable: a short message the day after a due date passes. Not a warning - just a note that the bill is outstanding. Most of the time it was genuinely forgotten, and it is settled the same day. The value is in it being automatic and unemotional, so it stays a routine reminder rather than an accusation.",
      "For that to happen you need to know a bill is overdue without checking. A list you have to remember to look at is a list you will look at when you have time, which is not the same as when it matters. Overdue balances should present themselves.",
      "When arrears do build up, deal with them as a stated plan with amounts and dates rather than a vague understanding that they will catch up. A tenant who knows they owe eight thousand pesos across three agreed payments behaves differently from one who knows only that they are behind.",
    ],
  },
  {
    id: "statements-and-ledger",
    h2: "Statements and the tenant ledger",
    body: [
      "A statement is what you send the tenant: this month's rent, this month's utility share with the arithmetic visible, anything one-off, the total, and the date it is due. Sent before the due date, it removes nearly every reason for a late payment that is not simply lack of money.",
      "The ledger is the other direction - it is what you keep. Every bill raised for a tenant and every payment recorded against it, in order, with a running balance. It is unglamorous and it is the thing that settles disputes in under a minute.",
      "The test of a ledger is whether it can answer a question about a specific month eight months ago without anyone relying on memory. What was billed, what was paid, when, and what was left. If the answer requires reconstructing from bank messages and recollection, the ledger is not doing its job.",
      "This protects the tenant as much as the owner, and it is worth saying so out loud when a tenant moves in. People are markedly more relaxed about paying into a system that can show them exactly what they have paid.",
    ],
  },
]

export default function BoardingHouseBillingContent() {
  const ctx = siloContextFor(PATH)

  return (
    <main style={display}>
      <SiteNavbar />
      <SiloBreadcrumbs ctx={ctx} />

      <section className="py-16 px-6" style={{ background: CREAM }}>
        <div className="max-w-3xl mx-auto">
          <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: BLUE }}>
            Rent &amp; billing
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-[1.06] tracking-tight mb-6" style={{ color: INK }}>
            Rent collection and billing for boarding houses
          </h1>
          <div className="space-y-4 text-lg leading-relaxed" style={{ color: MUTED }}>
            <p>
              Collecting rent is the part of a boarding house that decides whether the business
              works. Everything else - the rooms, the beds, the repairs - is in service of money
              arriving predictably each month, and it is the half of a{" "}
              <Link href={APEX} className="font-bold underline" style={{ color: BLUE }}>
                {anchorFor(APEX, PATH)}
              </Link>{" "}
              that owners feel first.
            </p>
            <p>
              Most of the difficulty is not the rent itself. It is the surrounding detail: what a
              tenant owes when they moved in mid-month, whose share of the electric bill is whose,
              which deposit is really an advance, and how to notice that someone is behind while
              the amount is still small enough to fix.
            </p>
            <p>
              This guide covers how rent collection and billing actually works in a Philippine
              boarding house - computing the monthly total, choosing due dates, handling deposits,
              recording payments across cash and e-wallets, managing arrears, and keeping a ledger
              that can answer questions months later.
            </p>
          </div>
        </div>
      </section>

      <article className="py-16 px-6 bg-white">
        <div className="max-w-3xl mx-auto space-y-14">
          {SECTIONS.map((section) => (
            <section key={section.id} id={section.id}>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-5" style={{ color: INK }}>
                {section.h2}
              </h2>
              <div className="space-y-4 text-base leading-relaxed" style={{ color: MUTED }}>
                {section.body.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
              {section.aside && (
                <div className="mt-6 rounded-[22px] border-2 p-6" style={{ borderColor: INK, background: CREAM, boxShadow: `6px 6px 0 ${AMBER}` }}>
                  <p className="text-sm font-extrabold mb-3" style={{ color: INK }}>{section.aside.title}</p>
                  <ul className="space-y-2">
                    {section.aside.lines.map((line) => (
                      <li key={line} className="text-sm leading-relaxed flex gap-2" style={{ color: MUTED }}>
                        <span aria-hidden style={{ color: BLUE }}>—</span>
                        {line}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          ))}

          <section id="how-smapey-handles-this" className="rounded-[26px] border-2 p-8" style={{ borderColor: INK, background: CREAM, boxShadow: `8px 8px 0 ${BLUE}` }}>
            <h2 className="text-2xl font-extrabold tracking-tight mb-4" style={{ color: INK }}>
              How Smapey handles this
            </h2>
            <div className="space-y-4 text-base leading-relaxed" style={{ color: MUTED }}>
              <p>
                Smapey generates the month&apos;s rent bills in one action, each due on the
                tenant&apos;s own move-in day and clamped sensibly for short months. Every tenant
                with an email gets a statement showing rent, their share of the room&apos;s
                utilities with the division spelled out, the total, and the due date - before the
                date, not after it.
              </p>
              <p>
                Payments record against a specific bill by cash, GCash, Maya, or bank, and partial
                payments leave the balance visible instead of relying on memory. Bills past their
                due date mark themselves overdue and surface on the dashboard. Each tenant has a
                ledger showing every bill and payment with a running balance, so a question about
                a month last year is one lookup.
              </p>
              <p>
                Billing is one part of the same system that also covers rooms and beds, maintenance, and your monthly cashflow.
              </p>
            </div>
          </section>
        </div>
      </article>

      <SiloChildren
        path={PATH}
        subheading="Detailed guides on the parts of billing that cause the most questions."
      />

      <SiloRelatedHubs path={PATH} />
      <SiloUpwardLinks ctx={ctx} />
      <SiloFooter />
    </main>
  )
}
