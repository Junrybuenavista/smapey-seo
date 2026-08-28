"use client"

import {
  ClipboardList, Bike, Package, Percent, BellRing, MessageSquare, ChevronRight, CheckCircle2,
} from "lucide-react"
import {
  Navbar, Pricing, CTA, Footer, Eyebrow, FAQList, PlateHero, Showcase,
  SHOT_PLATE_IMG, SHOT_JOB_ORDER_IMG, SHOT_PARTS_IMG, type Shot,
  CAR_PATH, MOTO_PATH,
} from "@/components/repair-shop/shared"
import InternalLinks from "@/components/InternalLinks"
import { FAQS } from "./faqs"

const INK = "#161616"
const BLUE = "#2f6bff"
const AMBER = "#ff9e2c"
const display = { fontFamily: "'Hanken Grotesk', system-ui, sans-serif" }

const FEATURES = [
  { icon: ClipboardList, title: "Job orders that price themselves", body: "Labour and parts as separate lines, total worked out for you. Edit a line and it recalculates - and the change is recorded with who made it, so nobody argues later about who dropped the price." },
  { icon: Bike, title: "Service history by plate", body: "Type a plate and see everything ever done to that unit - what was replaced, what it cost, the reading at the time. No plate yet? Record it under the conduction sticker." },
  { icon: Package, title: "Parts with real margin", body: "What the piyesa costs you and what you charge, side by side. Stock comes off the shelf when the unit is released, not when the job is approved, so a cancelled job never leaves your count wrong." },
  { icon: MessageSquare, title: "Quotes the rider approves", body: "Text an itemised quote. They tap approve or decline on their phone, and it is recorded with the time and marked as theirs - not your counter staff ticking a box." },
  { icon: Percent, title: "Mechanic commission", body: "A rate per mechanic, assigned per ticket or per line when two split a unit. Commission is on labour only - your parts markup stays yours - and the payout exports to Excel." },
  { icon: BellRing, title: "Reminders at 2,000 km", body: "Release a unit and the next oil change is scheduled from the work you did - at motorcycle intervals, not car ones. Dead odometer? It falls back to a date instead of skipping the reminder." },
]

const STEPS = [
  { n: "1", t: "Take the unit in", d: "Plate or conduction sticker, what the rider says is wrong, odometer if it still reads. Add the owner right there." },
  { n: "2", t: "Quote it", d: "Pick from your service list - tune-up, chain and sprocket, valve adjustment - add piyesa from stock, and text the quote for approval." },
  { n: "3", t: "Do the work", d: "Move it through diagnosing, waiting for parts, in progress, testing. The board shows which units are stuck and why." },
  { n: "4", t: "Release and get paid", d: "Cash, GCash, bank or card - full or partial. Stock comes off, and the next service is scheduled automatically." },
]

function Hero() {
  return (
    <PlateHero
      badge="Built for Philippine motor shops"
      title={<>Motorcycle repair shop software that knows two wheels</>}
      subtitle="Chain and sprocket, valve adjustment, carburetor cleaning - your service list is set up for motorcycles from day one, with oil due at 2,000 km. Type a plate and the whole history comes back."
      plate="NBC 4821"
      vehicle="Honda Click 125i · 2022"
      meta="Ana Reyes · 6 visits · last reading 18,400 km"
      history={[
        { date: "19 Aug", job: "Change oil + oil filter", amount: "₱620" },
        { date: "27 Jun", job: "Chain & sprocket replacement", amount: "₱2,150" },
        { date: "14 Apr", job: "Valve adjustment + tune-up", amount: "₱950" },
        { date: "02 Feb", job: "Front brake pads", amount: "₱540" },
      ]}
      ctaNote="Free plan covers 25 units and 50 job orders a month."
    />
  )
}

const SHOTS: Shot[] = [
  {
    img: SHOT_JOB_ORDER_IMG,
    alt: "Mechanic in a Philippine motorcycle shop holding a phone showing a job order with photos of the scooter being repaired",
    eyebrow: "Job orders",
    title: "Every unit that rolls in gets a ticket",
    desc: "Photograph the bike the way it arrived, put the chain, the sprocket and the labour on the same ticket, and hand the rider a total that matches what you quoted. Even the ten-minute jobs get recorded.",
    bullets: [
      "Photos of the unit as it came in",
      "Parts and labour on one ticket",
      "Quick jobs still leave a record",
    ],
  },
  {
    img: SHOT_PLATE_IMG,
    alt: "Phone held beside a vehicle plate showing that unit's full repair history in motorcycle repair shop software",
    eyebrow: "Service history",
    title: "Plate or conduction sticker, same lookup",
    desc: "Type whatever the unit is carrying and its whole history comes back. When a regular rides in for the third time this year, you already know what you changed and how long ago - before you ask.",
    bullets: [
      "Works with plates or conduction stickers",
      "Every past job in one list",
      "Know when the last chain went on",
    ],
  },
  {
    img: SHOT_PARTS_IMG,
    alt: "Tablet on a workshop bench showing motorcycle parts stock counts beside brake pads, spark plugs and engine oil",
    eyebrow: "Parts stock",
    title: "Fast-moving parts, counted properly",
    desc: "Chains, sprockets, brake pads and oil move quickly in a motorcycle shop. Add one to a ticket and it comes off the count when the unit is released, so what is on the screen is what is on the shelf.",
    bullets: [
      "Deducted on release, not on paper",
      "Every movement logged and traceable",
      "See what to reorder before the weekend",
    ],
  },
]

function Features() {
  return (
    <section id="features" className="py-24 px-6" style={{ background: "#fff", fontFamily: display.fontFamily }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <Eyebrow>Features</Eyebrow>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight" style={{ color: INK }}>
            Everything a motor shop actually does
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {FEATURES.map(({ icon: Icon, title, body }) => (
            <div key={title} className="rounded-[24px] border-2 p-7 bg-white transition-transform hover:-translate-y-1"
                 style={{ borderColor: INK, boxShadow: `6px 6px 0 ${AMBER}` }}>
              <div className="w-11 h-11 rounded-xl border-2 flex items-center justify-center mb-4"
                   style={{ background: BLUE, borderColor: INK }}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-extrabold text-lg mb-2" style={{ color: INK }}>{title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#54514c" }}>{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-6" style={{ background: "#fbf7f0", fontFamily: display.fontFamily }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <Eyebrow>How it works</Eyebrow>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight" style={{ color: INK }}>
            From the bay to the counter in four steps
          </h2>
        </div>
        <div className="grid md:grid-cols-4 gap-6">
          {STEPS.map((s) => (
            <div key={s.n} className="rounded-[24px] border-2 p-7 bg-white" style={{ borderColor: INK, boxShadow: `6px 6px 0 ${BLUE}` }}>
              <span className="inline-flex w-9 h-9 rounded-full border-2 items-center justify-center font-extrabold mb-4"
                    style={{ background: AMBER, color: INK, borderColor: INK }}>{s.n}</span>
              <h3 className="font-extrabold mb-2" style={{ color: INK }}>{s.t}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#54514c" }}>{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function SisterPage() {
  return (
    <section className="py-16 px-6" style={{ background: "#fff", fontFamily: display.fontFamily }}>
      <div className="max-w-3xl mx-auto rounded-[24px] border-2 p-8 text-center" style={{ borderColor: INK, background: "#fbf7f0" }}>
        <h2 className="text-xl font-extrabold mb-2" style={{ color: INK }}>Work on cars too?</h2>
        <p className="text-sm mb-5" style={{ color: "#54514c" }}>
          Same software, set up for four wheels - PMS, aircon cleaning, wheel alignment. Or pick
          both when you sign up and get the full list.
        </p>
        <a href={CAR_PATH} className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm border-2 bg-white transition-transform hover:-translate-y-0.5"
           style={{ ...display, color: INK, borderColor: INK }}>
          Auto repair shop software <ChevronRight className="w-4 h-4" />
        </a>
      </div>
    </section>
  )
}

function LocalNote() {
  const points = [
    "Tricycles sit alongside motorcycles in the vehicle list",
    "No plate yet? The conduction sticker works just as well",
    "Prices in pesos, and GCash recorded like any other payment",
    "Runs on the phone in your hand while you stand next to the unit",
  ]
  return (
    <section className="py-24 px-6" style={{ background: "#fbf7f0", fontFamily: display.fontFamily }}>
      <div className="max-w-4xl mx-auto text-center">
        <Eyebrow>Made for shops here</Eyebrow>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-8" style={{ color: INK }}>
          Built around how a Philippine motor shop runs
        </h2>
        <div className="grid sm:grid-cols-2 gap-4 text-left">
          {points.map((p) => (
            <div key={p} className="flex items-start gap-3 rounded-[18px] border-2 bg-white p-5" style={{ borderColor: INK }}>
              <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" style={{ color: BLUE }} />
              <span className="text-sm font-medium" style={{ color: "#3f3b36" }}>{p}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FAQ() {
  return (
    <section id="faq" className="py-24 px-6" style={{ background: "#fff", fontFamily: display.fontFamily }}>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <Eyebrow>FAQ</Eyebrow>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight" style={{ color: INK }}>Questions shops ask</h2>
        </div>
        <FAQList faqs={FAQS} />
      </div>
    </section>
  )
}

export default function MotorcycleContent() {
  return (
    <div style={{ background: "#fff" }}>
      <Navbar base={MOTO_PATH} name="Smapey Garage" />
      <Hero />
      <Showcase shots={SHOTS} />
      <Features />
      <HowItWorks />
      <LocalNote />
      <Pricing />
      <FAQ />
      <SisterPage />
      <InternalLinks cluster="repair-shop" currentPath="/motorcycle-repair-shop-software-philippines" heading="More for repair shops" />
      <CTA
        title="Ready to stop losing what you did to that unit?"
        subtitle="Take in your first job today. Free plan, no card, and the service history starts building from the first ticket."
      />
      <Footer base={MOTO_PATH} name="Motorcycle Repair Shop Software" />
    </div>
  )
}
