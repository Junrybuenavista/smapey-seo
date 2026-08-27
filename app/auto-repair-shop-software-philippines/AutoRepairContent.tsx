"use client"

import {
  ClipboardList, Car, Package, Percent, BellRing, MessageSquare, ChevronRight, CheckCircle2,
} from "lucide-react"
import {
  Navbar, Pricing, CTA, Footer, Eyebrow, FAQList, PlateHero,
  CAR_PATH, MOTO_PATH,
} from "@/components/repair-shop/shared"
import InternalLinks from "@/components/InternalLinks"
import { FAQS } from "./faqs"

const INK = "#161616"
const BLUE = "#2f6bff"
const AMBER = "#ff9e2c"
const display = { fontFamily: "'Hanken Grotesk', system-ui, sans-serif" }

const FEATURES = [
  { icon: ClipboardList, title: "Job orders that price themselves", body: "Add labour and parts as separate lines and the total works itself out. Edit a line and it recalculates - and the change is recorded with who made it, so nobody has to remember who dropped the price." },
  { icon: Car, title: "Service history by plate number", body: "Type a plate and see every job ever done to that car - what was replaced, what it cost, the odometer at the time. The thing a notebook can never give you back." },
  { icon: Package, title: "Parts with real margin", body: "Record what a part costs you and what you charge. Stock comes off the shelf when the car is released, not when the job is approved, so a cancelled job never leaves your count wrong." },
  { icon: MessageSquare, title: "Quotes the customer approves", body: "Text an itemised quote. They tap approve or decline on their phone, and it is recorded with the time and marked as theirs - not your staff ticking a box." },
  { icon: Percent, title: "Mechanic commission", body: "Set a rate per mechanic, assign work per ticket or per line when two split a car. Commission is on labour only - your parts markup stays yours - and the payout exports to Excel." },
  { icon: BellRing, title: "PMS reminders", body: "Release a car and the next service is scheduled from the work you did - by kilometres, by date, or whichever lands first. You choose when to text, so you control the spend." },
]

const STEPS = [
  { n: "1", t: "Take the car in", d: "Plate, what the customer says is wrong, odometer if it reads. Add the owner right there - no need to create them first." },
  { n: "2", t: "Quote it", d: "Pick labour from your service list, add parts from stock. Text the quote and let the owner approve it from their phone." },
  { n: "3", t: "Do the work", d: "Move the ticket through diagnosing, waiting for parts, in progress, testing. The board shows what is stuck and why." },
  { n: "4", t: "Release and get paid", d: "Record cash, GCash, bank or card - full or partial. Stock comes off, and the next service is scheduled automatically." },
]

function Hero() {
  return (
    <PlateHero
      badge="Built for Philippine car shops"
      title={<>Auto repair shop software that remembers every car</>}
      subtitle="Job orders with parts and labour, parts inventory with real margin, and quotes your customer approves from their phone. Type a plate and the whole history comes back."
      plate="ABC 1234"
      vehicle="Honda Civic 1.8 · 2019"
      meta="Juan dela Cruz · 4 visits · last reading 48,200 km"
      history={[
        { date: "12 Aug", job: "Preventive maintenance service", amount: "₱2,450" },
        { date: "03 May", job: "Front brake pads + rotor skim", amount: "₱1,880" },
        { date: "22 Jan", job: "Change oil + oil filter", amount: "₱1,150" },
        { date: "09 Oct", job: "Aircon cleaning", amount: "₱1,500" },
      ]}
      ctaNote="Free plan covers 25 vehicles and 50 job orders a month."
    />
  )
}

function Features() {
  return (
    <section id="features" className="py-24 px-6" style={{ background: "#fff", fontFamily: display.fontFamily }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <Eyebrow>Features</Eyebrow>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight" style={{ color: INK }}>
            Everything a car shop actually does
          </h2>
          <p className="mt-4 max-w-2xl mx-auto" style={{ color: "#54514c" }}>
            Car repair shop software that covers the whole job, not just the bill - from the
            moment a car comes in to the moment it is handed back.
          </p>
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
            From bay to counter in four steps
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

// The two trade pages are siblings, not a hierarchy: a shop owner who lands on
// the wrong one should get to the right one in a single click.
function SisterPage() {
  return (
    <section className="py-16 px-6" style={{ background: "#fff", fontFamily: display.fontFamily }}>
      <div className="max-w-3xl mx-auto rounded-[24px] border-2 p-8 text-center" style={{ borderColor: INK, background: "#fbf7f0" }}>
        <h2 className="text-xl font-extrabold mb-2" style={{ color: INK }}>Run a motorcycle shop instead?</h2>
        <p className="text-sm mb-5" style={{ color: "#54514c" }}>
          Same software, set up for two wheels - chain and sprocket, valve adjustment, and oil due
          at 2,000&nbsp;km rather than 5,000.
        </p>
        <a href={MOTO_PATH} className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm border-2 bg-white transition-transform hover:-translate-y-0.5"
           style={{ ...display, color: INK, borderColor: INK }}>
          Motorcycle repair shop software <ChevronRight className="w-4 h-4" />
        </a>
      </div>
    </section>
  )
}

function LocalNote() {
  const points = [
    "Prices in pesos, and GCash recorded like any other payment method",
    "Works on the counter laptop and on a phone out in the bay",
    "Job order, piyesa, talyer - the words your staff already use",
    "Free plan that does not expire, so you can try it on real jobs",
  ]
  return (
    <section className="py-24 px-6" style={{ background: "#fbf7f0", fontFamily: display.fontFamily }}>
      <div className="max-w-4xl mx-auto text-center">
        <Eyebrow>Made for shops here</Eyebrow>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-8" style={{ color: INK }}>
          Built around how a Philippine shop runs
        </h2>
        <p className="mb-8 max-w-2xl mx-auto" style={{ color: "#54514c" }}>
          Most auto repair shop software is priced in dollars and sold through a demo call.
          This one starts free, in pesos, and you can be taking in your first car today.
        </p>
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

export default function AutoRepairContent() {
  return (
    <div style={{ background: "#fff" }}>
      <Navbar base={CAR_PATH} name="Smapey Garage" />
      <Hero />
      <Features />
      <HowItWorks />
      <LocalNote />
      <Pricing />
      <FAQ />
      <SisterPage />
      <InternalLinks cluster="repair-shop" currentPath="/auto-repair-shop-software-philippines" heading="More for repair shops" />
      <CTA
        title="Ready to stop losing what you did to that car?"
        subtitle="Take in your first job today. Free plan, no card, and your service history starts building from the first ticket."
      />
      <Footer base={CAR_PATH} name="Auto Repair Shop Software" />
    </div>
  )
}
