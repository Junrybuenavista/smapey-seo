"use client"

import { ChevronRight } from "lucide-react"
import {
  Navbar, Footer, CTA, ArticleHero, AH2, AP, Bullets,
  CAR_PATH, MOTO_PATH,
} from "@/components/repair-shop/shared"

const INK = "#161616"
const BLUE = "#2f6bff"
const display = { fontFamily: "'Hanken Grotesk', system-ui, sans-serif" }

// One guide for both trades — it is one product underneath, and the only real
// difference is which service list gets seeded on the first run.
const SECTIONS: { id: string; title: string; body: React.ReactNode }[] = [
  {
    id: "setup",
    title: "1. Set up your shop",
    body: (
      <>
        <AP>The first time you open Smapey Garage it asks one question: what kind of shop is this?</AP>
        <Bullets items={[
          <><strong>Motorcycle shop</strong> - your service list starts with change oil, tune-up, chain and sprocket, brake pads, valve adjustment and carburetor cleaning, at motorcycle intervals.</>,
          <><strong>Auto shop</strong> - change oil, preventive maintenance, brake pads, tire rotation, aircon cleaning, wheel alignment.</>,
          <><strong>Both</strong> - the full list, with each service tagged for the vehicle types it applies to.</>,
        ]} />
        <AP>The answer also decides which vehicle types come up first when you add a unit. You can change it later in Settings, and changing it never rewrites the service list you have already edited.</AP>
      </>
    ),
  },
  {
    id: "intake",
    title: "2. Take a unit in",
    body: (
      <>
        <AP>A job order starts from the unit, not the customer. On Job Orders, tap New job order, then search for the unit by plate, make, model, or the owner&apos;s name.</AP>
        <AP>If it has never been in before, tap <strong>Take in a new unit</strong> and add it there - and add the owner in the same form. You never have to create a customer first.</AP>
        <Bullets items={[
          "No plate yet? Record the conduction sticker. The field takes whatever identifies the unit on your floor.",
          "The odometer is optional. A dead odometer only means reminders fall back to a date instead of kilometres.",
          "Photograph the scratches at drop-off. Take photo uses the camera; on a phone that is the real camera app.",
        ]} />
      </>
    ),
  },
  {
    id: "quoting",
    title: "3. Quote the job",
    body: (
      <>
        <AP>Add labour and parts as separate lines. Labour can come from your service list, which fills in your usual price; parts can come from stock, which fills in both the price and what it cost you.</AP>
        <AP>You never type the total. It is worked out from the lines every time you save, so a mistyped total is not a thing that can happen.</AP>
        <AP>To let the customer approve it, tap <strong>Send quote</strong>. They get a text with a link, see the itemised quote on their phone, and tap approve or decline. Their answer is recorded with the time and marked as coming from them - which is what settles the argument about what was agreed.</AP>
        <AP>A declined quote comes back to you as Diagnosing with their reason attached, so you can re-quote it. Editing the price clears the send guard, so the corrected quote can go out again.</AP>
      </>
    ),
  },
  {
    id: "work",
    title: "4. Move the work along",
    body: (
      <>
        <AP>A ticket moves through the states a shop actually has: received, diagnosing, awaiting the customer&apos;s OK, approved, in progress, waiting for parts, testing, ready, released.</AP>
        <AP>Two of those matter more than the rest. <strong>Waiting for parts</strong> and <strong>awaiting OK</strong> are where units quietly sit for days, so the dashboard counts them separately and lists the oldest first.</AP>
      </>
    ),
  },
  {
    id: "parts",
    title: "5. Parts and stock",
    body: (
      <>
        <AP>Record what a part costs you and what you charge. The Parts page shows the margin on every line, in pesos and as a percentage, and flags anything at or below its reorder level.</AP>
        <AP>Stock comes off the shelf <strong>when the unit is released</strong> - not when the job is approved. That is deliberate: a cancelled job then needs no correction, because nothing ever moved. Parts promised to an open ticket show as committed alongside what is on hand.</AP>
        <AP>On-hand is never typed over. A correction is a stock movement with a reason, so a bad count can always be traced back.</AP>
      </>
    ),
  },
  {
    id: "mechanics",
    title: "6. Mechanics and commission",
    body: (
      <>
        <AP>Add your mechanics with the share of labour each one takes. They do not need logins - this is your roster, not a list of user accounts.</AP>
        <AP>Assign a whole ticket to one mechanic, or a single line to someone else when two people split a unit. Commission is calculated on <strong>labour only</strong>: markup on parts stays with the shop.</AP>
        <AP>Payouts count on the day a unit was released, so a job opened in March and handed back in April is April&apos;s money. Labour with nobody assigned shows in its own row so you can see the gap rather than lose it.</AP>
      </>
    ),
  },
  {
    id: "reminders",
    title: "7. Service reminders",
    body: (
      <>
        <AP>When you release a unit, Smapey schedules its next visit from the work you did. A change oil on a motorcycle comes due at 2,000&nbsp;km or 90 days; on a car, 5,000&nbsp;km or 180 days. Whichever lands first makes it due.</AP>
        <AP>Sending is manual on purpose - you are spending your own SMS credits, so you choose who gets a nudge and when. Tick the ones you want and send them as a batch. Re-sending the same batch costs nothing, because only unsent reminders go out.</AP>
      </>
    ),
  },
  {
    id: "numbers",
    title: "8. The numbers",
    body: (
      <>
        <AP>Analytics answers what the shop actually earned over a date range: revenue split between labour and parts, gross margin on parts, your top services by what they earned, labour billed per mechanic, and how many of the customers you served had been in before.</AP>
        <AP>Everything counts on the day a unit was released, and cancelled tickets are excluded from every figure.</AP>
      </>
    ),
  },
]

export default function GuideContent() {
  return (
    <div style={{ background: "#fff" }}>
      <Navbar base={CAR_PATH} name="Smapey Garage" />

      <ArticleHero
        badge="Guide"
        title="How to run your shop with Smapey Garage"
        intro="Set-up to payout, in the order you will actually meet it. The same guide covers auto and motorcycle shops - it is one product, and the only thing your shop type changes is which service list you start with."
      />

      <section className="py-16 px-6" style={{ background: "#fff", fontFamily: display.fontFamily }}>
        <div className="max-w-3xl mx-auto">
          <nav className="rounded-[22px] border-2 p-6 mb-14" style={{ borderColor: INK, background: "#fbf7f0" }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: BLUE }}>On this page</p>
            <ol className="grid sm:grid-cols-2 gap-y-2 gap-x-6">
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="text-sm font-semibold hover:opacity-60 transition-opacity" style={{ color: INK }}>
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          {SECTIONS.map((s) => (
            <div key={s.id} id={s.id} className="scroll-mt-24 mb-12">
              <AH2>{s.title}</AH2>
              {s.body}
            </div>
          ))}

          <div className="rounded-[22px] border-2 p-6 mt-16" style={{ borderColor: INK, background: "#fbf7f0" }}>
            <p className="text-sm font-bold mb-3" style={{ color: INK }}>Which shop are you?</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href={CAR_PATH} className="inline-flex items-center gap-2 px-5 py-3 rounded-full font-bold text-sm border-2 bg-white transition-transform hover:-translate-y-0.5" style={{ ...display, color: INK, borderColor: INK }}>
                Auto repair shop <ChevronRight className="w-4 h-4" />
              </a>
              <a href={MOTO_PATH} className="inline-flex items-center gap-2 px-5 py-3 rounded-full font-bold text-sm border-2 bg-white transition-transform hover:-translate-y-0.5" style={{ ...display, color: INK, borderColor: INK }}>
                Motorcycle repair shop <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <CTA />
      <Footer base={CAR_PATH} name="Repair Shop Software" />
    </div>
  )
}
