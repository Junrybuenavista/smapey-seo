import Link from "next/link"
import SiteNavbar from "@/components/SiteNavbar"
import Footer from "@/components/Footer"
import SiloBreadcrumbs from "@/components/silo/SiloBreadcrumbs"
import SiloChildren from "@/components/silo/SiloChildren"
import SiloUpwardLinks from "@/components/silo/SiloUpwardLinks"
import SiloRelatedHubs from "@/components/silo/SiloRelatedHubs"
import { siloContextFor, anchorFor, APEX } from "@/lib/silo"

const PATH = "/boarding-house/bed-space-and-room-management"

const INK = "#161616"
const BLUE = "#2f6bff"
const AMBER = "#ff9e2c"
const CREAM = "#fbf7f0"
const MUTED = "#54514c"
const display = { fontFamily: "'Hanken Grotesk', system-ui, sans-serif" }

type Block = { id: string; h2: string; body: string[]; aside?: { title: string; lines: string[] } }

const SECTIONS: Block[] = [
  {
    id: "rooms-vs-beds",
    h2: "A room and a bed are two different things to track",
    body: [
      "The first decision in any boarding house is what you are actually renting out. If you let a whole room to one person or one couple, the room is the unit: one room, one rate, one tenant on the record. That is the simple case, and a notebook handles it.",
      "Bedspace is different. You are renting a place to sleep, and a single room might hold four, six, or eight of them. The room is no longer the unit - the bed is. That distinction sounds pedantic until you try to answer an ordinary question like \"how many free slots do I have?\" If your records only know about rooms, a room with three of four beds taken looks exactly like a room that is completely full. Both are just one occupied row.",
      "This is where most spreadsheets quietly break down. Owners work around it with columns named Bed 1, Bed 2, Bed 3, then discover the workaround does not survive contact with reality: one tenant moves out mid-month, someone else transfers in from another room, and now the columns no longer line up with who is actually sleeping where.",
      "The fix is to give every bed its own identity - a name you would actually say out loud, like Lower A or Upper B - and to attach the tenant to that bed rather than to the room. Once a bed is a real thing in your records, every other question in this guide becomes answerable.",
    ],
    aside: {
      title: "Three ways boarding houses are usually let",
      lines: [
        "Private room - one room, one tenant or one couple, one rate.",
        "Shared room - several tenants in a room, each paying their own rent.",
        "Bedspace - the bed itself is the unit, often with double-deck bunks.",
      ],
    },
  },
  {
    id: "deck-pricing",
    h2: "Pricing a bed: why the lower deck costs more",
    body: [
      "In almost every bedspace house in the Philippines, the lower deck commands more than the upper. Tenants are not being fussy. The lower bunk is easier to get into at the end of a shift, it is cooler, you can sit up on it, and it usually comes with the better share of the space underneath for storage. Upper decks are hotter, involve a ladder, and offer less headroom.",
      "So a single monthly rate for a whole bedspace room is almost always wrong. If you charge one figure across the room, you either underprice the lower decks and leave money behind every month, or overprice the uppers and watch them sit empty while tenants wait for a lower bunk to open up.",
      "The practical approach is to price each bed individually and let the rate live with the bed rather than with the tenant. When someone moves in, their rent defaults to whatever that bed costs. When they move out, the rate stays put for the next person. You are not re-deciding the price every time somebody leaves.",
      "It also makes rate changes honest. If you raise the price of lower decks next year, you change it in one place, and every future tenant of that bed inherits it - while existing tenancies keep the rate they agreed to until you deliberately change it.",
    ],
  },
  {
    id: "move-in-move-out",
    h2: "Move-ins and move-outs without losing the paper trail",
    body: [
      "A move-in is more than a name and a date. There is a deposit and an advance, whether they have actually been paid, the rate agreed, which bed the person is taking, and the day rent starts counting. Every one of those details becomes a question later, usually at the least convenient moment.",
      "The move-out is where thin records really hurt. Someone leaves, and weeks later there is a disagreement about the deposit: was it one month or two, was it paid in full, were there unpaid utilities at the end, was there damage. If the only record is a note in a notebook and your memory of the conversation, you are negotiating from a weak position - and so is the tenant, which is not fair to them either.",
      "What you want is for the move-out to close the record rather than erase it. The tenancy ends, the bed becomes free for someone else, and the history of who stayed there, from when to when, at what rate, with what deposit, stays exactly where it was. The slot is reusable; the record is not overwritten.",
      "That last point matters more than it sounds. A lot of homemade systems handle a move-out by clearing the row so the bed reads as vacant. It works for today's occupancy count and destroys your ability to answer anything about last year.",
    ],
    aside: {
      title: "Worth recording at every move-in",
      lines: [
        "Move-in date, and the day of the month rent falls due.",
        "The bed or room, and the rate agreed for it.",
        "Deposit and advance - the amount, and whether it is actually paid.",
        "Contact details, and someone to call in an emergency.",
      ],
    },
  },
  {
    id: "transfers-and-swaps",
    h2: "Transfers and swaps when someone wants a different bed",
    body: [
      "Tenants move around inside a house constantly. A lower deck opens up and the person above it wants it. Two roommates do not get along and both would rather be somewhere else. Somebody changes shift and wants to be nearer a window, or further from the door.",
      "Handled as a move-out plus a move-in, this creates a mess. You end up with a tenancy that looks like it ended - suggesting the person left the house entirely - and a brand-new one that looks like a stranger arrived the same day. The deposit is now ambiguous: was it returned and re-paid, or did it simply carry across? Do it a few times and your stay history stops describing anything that happened.",
      "A transfer should be its own kind of event: the same tenancy continues, the bed changes, the deposit carries over, and the record notes the date and the new rate. If the tenant moves to a bed that costs more, the rate changes from that date forward and the earlier period keeps the rate it was actually billed at.",
      "Swaps are the harder case, because there is no vacancy involved - two people simply trade places. Treating it as two sequential moves is impossible when the house is full, since neither bed is free at the moment you need it. It has to be handled as a single exchange, or the records will not accept it.",
    ],
  },
  {
    id: "vacancy-and-occupancy",
    h2: "Vacancy and occupancy: measuring what is genuinely empty",
    body: [
      "Occupancy is the number every landlord quotes and very few calculate the same way. The formula itself is not complicated - occupied slots divided by total slots - but the word \"slots\" is doing an enormous amount of work, and getting it wrong makes the number meaningless.",
      "Count rooms, and a bedspace house looks close to full almost all the time, because a room with one occupant out of six still counts as an occupied room. Count beds, and the same house might be at sixty percent. The second figure is the one that matches your bank account, because you are paid per bed.",
      "This is also why the two numbers should never be mixed in the same report. If you compare this month's bed-based occupancy against last year's room-based figure, you will conclude the business collapsed when nothing changed except the arithmetic.",
      "Capacity needs care too. A room's capacity is not a matter of opinion once beds are named - it is simply how many beds are in it. Where owners get into trouble is carrying an aspirational capacity, counting a bed they intend to add but have not built, which quietly depresses occupancy and makes a healthy house look like it is failing.",
      "Seasonality is the last piece. A house full of students empties predictably around the end of the school year, and a house near a BPO hub turns over on a completely different rhythm. A single occupancy figure with no month attached to it hides both patterns.",
    ],
  },
  {
    id: "stay-history",
    h2: "Stay history is the record you will actually need",
    body: [
      "Everything above produces the same by-product: a history of who stayed where, for how long, at what rate. It is easy to treat that as bookkeeping exhaust. It is closer to being the asset.",
      "When a former tenant asks for proof of residence, it is one lookup. When someone disputes a balance from four months ago, you have the dates and the amounts rather than a recollection. When you want to know whether the upper decks genuinely turn over faster than the lower ones - and therefore whether the price gap is right - the answer is already in the data you have been keeping all along.",
      "It also protects the tenant, which is worth saying plainly. A clear record of what was paid and when is the thing that stops a disagreement from turning into a matter of whose word carries more weight. Good records are not surveillance of your boarders; they are the reason a dispute can be settled in two minutes.",
    ],
  },
]

export default function BedSpaceRoomsContent() {
  const ctx = siloContextFor(PATH)

  return (
    <main style={display}>
      <SiteNavbar />
      <SiloBreadcrumbs ctx={ctx} />

      {/* HERO + INTRO */}
      <section className="py-16 px-6" style={{ background: CREAM }}>
        <div className="max-w-3xl mx-auto">
          <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: BLUE }}>
            Bed space &amp; rooms
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-[1.06] tracking-tight mb-6" style={{ color: INK }}>
            Bed space and room management
          </h1>
          <div className="space-y-4 text-lg leading-relaxed" style={{ color: MUTED }}>
            <p>
              Managing a boarding house is mostly a question of inventory. Not stock on a shelf -
              rooms, beds, and the people occupying them, changing a little every month as tenants
              arrive, move between beds, and leave.
            </p>
            <p>
              Get that inventory right and the rest of the business gets easier: you can see what is
              free, price each bed for what it is genuinely worth, and answer questions about last
              year without trusting your memory. Get it wrong and you are guessing at occupancy,
              losing money on mispriced upper decks, and arguing about deposits with no record to
              point at.
            </p>
            <p>
              This guide covers how bed and room inventory actually works in a Philippine boarding
              house - the distinction between a room and a bed, deck pricing, move-ins and
              move-outs, transfers and swaps, and how to measure occupancy so the number means
              something.
            </p>
          </div>
        </div>
      </section>

      {/* BODY */}
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

          {/* PRODUCT MODULE - contextual link up to the money page */}
          <section id="how-smapey-handles-this" className="rounded-[26px] border-2 p-8" style={{ borderColor: INK, background: CREAM, boxShadow: `8px 8px 0 ${BLUE}` }}>
            <h2 className="text-2xl font-extrabold tracking-tight mb-4" style={{ color: INK }}>
              How Smapey handles this
            </h2>
            <div className="space-y-4 text-base leading-relaxed" style={{ color: MUTED }}>
              <p>
                Smapey treats beds as real inventory rather than columns in a row. Each room shows as
                a card with its occupants and its free slots, and in a bedspace room you name every
                bed and give it its own monthly rate - so the lower decks can carry their premium
                without you re-deciding it each time someone leaves.
              </p>
              <p>
                Move-ins record the deposit, the rate, and the bed. Transfers move a tenant to
                another bed with the deposit carried across, and two tenants can swap places in one
                step even when the house is full. Every movement stays in stay history with its
                dates and rates, and occupancy counts beds rather than rooms, so a room with one
                free upper deck reads as partly vacant - which is what it is.
              </p>
              <p>
                It is one part of a{" "}
                <Link href={APEX} className="font-bold underline" style={{ color: BLUE }}>
                  {anchorFor(APEX, PATH)}
                </Link>{" "}
                that also covers rent billing, utilities, maintenance, and your monthly cashflow.
              </p>
            </div>
          </section>
        </div>
      </article>

      {/* Deeper guides - renders only once its children exist */}
      <SiloChildren
        path={PATH}
        subheading="Detailed guides on measuring and filling the beds you have."
      />

      <SiloRelatedHubs path={PATH} />
      <SiloUpwardLinks ctx={ctx} />
      <Footer />
    </main>
  )
}
