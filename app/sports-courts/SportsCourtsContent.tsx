"use client"

import {
  CalendarCheck, Globe, Wallet, Clock, Repeat, ChartColumn, CheckCircle2, Layers, QrCode, Hourglass, Check,
} from "lucide-react"
import {
  Navbar, Pricing, CTA, Footer, Eyebrow, FAQList, ScheduleHero, Animate, Paddle,
  INK, BLUE, AMBER, CREAM, MUTED, FAINT, display, REGISTER_URL, PLAN_PATH, BUILD_PATH,
} from "@/components/sports-courts/shared"
import InternalLinks from "@/components/InternalLinks"
import { FAQS } from "./faqs"

const FEATURES = [
  { icon: CalendarCheck, title: "A schedule that can't double-book", body: "Every court, half hour by half hour. Tap a free time to book it, tap a booking to check them in or take payment. Two bookings can't share a court, whether they came from the counter or from a phone." },
  { icon: Globe, title: "Your own booking page", body: "Players see your free courts by day, length, sport and time of day, and book from their phone with a name and a mobile number. No app and no account for them, and every booking lands on your schedule." },
  { icon: Wallet, title: "GCash deposits, checked in one place", body: "Ask for nothing ahead, a deposit or the full price. Players pay straight to your GCash and type the reference, and the court is held while they do. A hold that isn't paid in time gives the court back." },
  { icon: Clock, title: "Peak and off-peak rates", body: "Rates by day and hour, for every court or just one. A game that runs into peak hours pays each half hour at its rate, and the price is fixed on the booking, so a rate change never rewrites it." },
  { icon: Repeat, title: "Regular groups, every week", body: "Book the Tuesday-night group for up to 13 weeks in one go, skipping any week someone already has. Regulars come up by name or number, with how often they've played and any no-shows." },
  { icon: ChartColumn, title: "Closing and analytics", body: "The day's money by cash, GCash, Maya, card and bank, with refunds and bookings still owing, exported to Excel. Analytics shows how full each court was, the busiest hours and who your regulars are." },
]

const STEPS = [
  { n: "1", t: "Set up your courts", d: "Pick your sports, how many courts, your hours and what a court costs an hour, with a peak rate if you charge one. Closing after midnight is fine." },
  { n: "2", t: "Share your page", d: "Pick your link and print the QR poster for the counter, the gate or the courtside board. Put the link in your Messenger auto-reply and on your Facebook page." },
  { n: "3", t: "Bookings land on the schedule", d: "Counter bookings and online ones on one grid. GCash payments to check wait at the top until you confirm them." },
  { n: "4", t: "Play, pay and close", d: "Check players in, take cash with the change worked out or split the bill 2 to 4 ways. At closing, the day's money is already added up." },
]

function Hero() {
  return (
    <ScheduleHero
      badge="For pickleball, badminton, tennis and padel venues"
      title={<>Court booking system that can&apos;t double-book</>}
      subtitle="A free pickleball court booking system for Philippine venues: a schedule of every court, your own booking page that players pay into by GCash, and the day's closing. Badminton, tennis and padel courts work the same way."
      ctaNote="Free plan covers 2 courts and 150 bookings a month."
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
            Court reservation system, counter and closing in one
          </h2>
          <p className="mt-4 max-w-2xl mx-auto" style={{ color: MUTED }}>
            Pickleball court management software that covers the whole booking, from the message asking for a court
            to the cash counted at the end of the night.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {FEATURES.map(({ icon: Icon, title, body }) => (
            <div key={title} className="rounded-[24px] border-2 p-7 bg-white transition-transform hover:-translate-y-1"
                 style={{ borderColor: INK, boxShadow: `6px 6px 0 ${AMBER}` }}>
              <div className="w-11 h-11 rounded-xl border-2 flex items-center justify-center mb-4" style={{ background: BLUE, borderColor: INK }}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-extrabold text-lg mb-2" style={{ color: INK }}>{title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: MUTED }}>{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Spotlight({ eyebrow, title, desc, bullets, color, reverse, children }: {
  eyebrow: string; title: string; desc: React.ReactNode; bullets: string[]; color: string; reverse?: boolean; children: React.ReactNode
}) {
  return (
    <Animate>
      <div className={`flex flex-col gap-10 md:gap-12 items-center ${reverse ? "md:flex-row-reverse" : "md:flex-row"}`}>
        <div className="w-full md:w-1/2 min-w-0">{children}</div>
        <div className="w-full md:w-1/2 min-w-0">
          <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: color === AMBER ? "#b06c00" : BLUE }}>{eyebrow}</p>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-4" style={{ color: INK }}>{title}</h2>
          <p className="leading-relaxed mb-5" style={{ color: MUTED }}>{desc}</p>
          <ul className="space-y-2.5">
            {bullets.map((b) => (
              <li key={b} className="flex items-start gap-2.5 text-sm">
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: color === AMBER ? AMBER : BLUE }} />
                <span style={{ color: "#3f3b36" }}>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Animate>
  )
}

// The player's booking page, in the three states an online booking passes
// through. Wording follows the app's /court-booking page.
function PlayerPage() {
  const states = [
    { icon: Hourglass, title: "Pay to keep this booking", sub: "The court is held for you for 18:42.", bg: "#fff1dc", edge: AMBER },
    { icon: Clock, title: "Payment sent", sub: "The venue is checking it in their GCash.", bg: "#eaf0ff", edge: BLUE },
    { icon: Check, title: "You're booked!", sub: "Show this page at the counter when you arrive.", bg: "#e6f6ec", edge: "#1f9d55" },
  ]
  return (
    <div className="rounded-[22px] border-2 bg-white overflow-hidden" style={{ borderColor: INK, boxShadow: `8px 8px 0 ${BLUE}` }}>
      <div className="px-5 py-3.5 border-b-2 flex items-center gap-3" style={{ borderColor: INK, background: CREAM }}>
        <span className="w-8 h-8 rounded-lg border-2 flex items-center justify-center shrink-0" style={{ background: "#eaf0ff", borderColor: BLUE }}>
          <Paddle className="w-4 h-4" style={{ color: BLUE }} />
        </span>
        <span className="min-w-0">
          <span className="block font-extrabold truncate" style={{ color: INK }}>Your venue</span>
          <span className="block text-[11px] font-semibold" style={{ color: FAINT }}>Court 2 · Saturday · 7:00 – 8:00 PM</span>
        </span>
      </div>
      <div className="p-4 space-y-2.5">
        {states.map(({ icon: Icon, title, sub, bg, edge }, i) => (
          <div key={title} className="rounded-[14px] border-2 px-4 py-3" style={{ background: bg, borderColor: edge }}>
            <p className="text-sm font-extrabold flex items-center gap-2" style={{ color: INK }}>
              <span className="text-[10px] font-bold w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 bg-white" style={{ borderColor: INK }}>{i + 1}</span>
              <Icon className="w-4 h-4 shrink-0" /> {title}
            </p>
            <p className="text-xs mt-1 pl-7" style={{ color: MUTED }}>{sub}</p>
          </div>
        ))}
      </div>
      <div className="px-5 py-3 border-t-2 text-xs font-semibold" style={{ borderColor: INK, background: CREAM, color: MUTED }}>
        Paid straight to the venue&apos;s GCash. Smapey never holds the money.
      </div>
    </div>
  )
}

// One basketball court laid over three pickleball courts, the way a combined
// court is set up in Courts & rates.
function CombinedCourt() {
  return (
    <div className="rounded-[22px] border-2 bg-white overflow-hidden" style={{ borderColor: INK, boxShadow: `8px 8px 0 ${AMBER}` }}>
      <div className="px-5 py-3.5 border-b-2 flex items-center justify-between gap-3" style={{ borderColor: INK, background: CREAM }}>
        <span className="font-extrabold" style={{ color: INK }}>Courts &amp; rates</span>
        <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: FAINT }}>Combined court</span>
      </div>
      <div className="p-5">
        <div className="relative rounded-[14px] border-2 p-3" style={{ borderColor: INK, background: "#fff8ee" }}>
          <span className="absolute -top-3 left-4 px-2 py-0.5 rounded-full border-2 text-[10px] font-extrabold uppercase tracking-widest bg-white" style={{ borderColor: INK, color: INK }}>Full court</span>
          <div className="grid grid-cols-3 gap-2 mt-2">
            {["Court 1", "Court 2", "Court 3"].map((c) => (
              <div key={c} className="relative rounded-lg border-2 h-28 flex flex-col items-center justify-end pb-2" style={{ borderColor: BLUE, background: "#eaf0ff" }}>
                {/* The net, across the middle of each court. */}
                <span className="absolute inset-x-0 top-1/2 border-t-2 border-dashed" style={{ borderColor: "rgba(47,107,255,.45)" }} />
                <span className="text-[11px] font-extrabold" style={{ color: INK }}>{c}</span>
                <span className="text-[10px] font-semibold" style={{ color: MUTED }}>Pickleball</span>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4 space-y-2 text-xs font-semibold" style={{ color: MUTED }}>
          <p className="flex items-center gap-2"><Layers className="w-4 h-4 shrink-0" style={{ color: BLUE }} /> Booking the full court takes Courts 1, 2 and 3</p>
          <p className="flex items-center gap-2"><Check className="w-4 h-4 shrink-0" style={{ color: "#1f9d55" }} /> None of them can be booked on its own at the same time</p>
        </div>
      </div>
    </div>
  )
}

function Spotlights() {
  return (
    <section className="py-24 px-6" style={{ background: CREAM, fontFamily: display.fontFamily }}>
      <div className="max-w-6xl mx-auto flex flex-col gap-24">
        <Spotlight
          eyebrow="Online booking"
          title="Stop typing the schedule into Messenger"
          desc="Plenty of venues still take bookings in Messenger and Viber chats and check GCash screenshots by eye. When two admins answer two players about the same slot, the court gets booked twice. Here players book themselves from your page, the court is held while they pay, and you confirm the GCash payment from the schedule."
          bullets={[
            "Pay at the venue, a deposit or the full price ahead: your choice",
            "Unpaid holds give the court back on their own",
            "Players cancel on their page, up to the cut-off you set",
          ]}
          color={BLUE}
        >
          <PlayerPage />
        </Spotlight>

        <Spotlight
          eyebrow="Combined courts"
          title="One basketball court, three pickleball courts"
          desc={<>A covered court is often a basketball court for some groups and pickleball courts for others. Set it up once as a combined court and the schedule keeps both straight. If you&apos;re still planning the space, our guide to <a href={BUILD_PATH} className="font-bold underline" style={{ color: INK }}>pickleball court construction costs</a> shows how many courts fit.</>}
          bullets={[
            "A booking for the full court takes every court under it",
            "A combined court is priced by its courts unless you give it a rate",
            "Combined courts don't count against your plan's courts",
          ]}
          color={AMBER}
          reverse
        >
          <CombinedCourt />
        </Spotlight>
      </div>
    </section>
  )
}

function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-6" style={{ background: "#fff", fontFamily: display.fontFamily }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <Eyebrow>How it works</Eyebrow>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight" style={{ color: INK }}>
            From the first message to the last game
          </h2>
          <p className="mt-4 max-w-2xl mx-auto" style={{ color: MUTED }}>
            Set up in a few minutes, on the phone you already use at the counter.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((s) => (
            <div key={s.n} className="rounded-[24px] border-2 p-7 bg-white" style={{ borderColor: INK, boxShadow: `6px 6px 0 ${BLUE}` }}>
              <span className="inline-flex w-9 h-9 rounded-full border-2 items-center justify-center font-extrabold mb-4" style={{ background: AMBER, color: INK, borderColor: INK }}>{s.n}</span>
              <h3 className="font-extrabold mb-2" style={{ color: INK }}>{s.t}</h3>
              <p className="text-sm leading-relaxed" style={{ color: MUTED }}>{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Searches name the sport, so the section does too.
function Sports() {
  const sports = [
    { title: "Pickleball", note: "Courts by the hour, combined courts over a basketball court, and weekly slots for the groups that play every Tuesday." },
    { title: "Badminton", note: "A badminton court management system for halls with many courts: one grid, the same rates by day and hour, and regulars by name." },
    { title: "Tennis and padel", note: "Longer games and higher rates work the same way, with peak hours priced half an hour at a time." },
  ]
  return (
    <section className="py-24 px-6" style={{ background: CREAM, fontFamily: display.fontFamily }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <Eyebrow>Every court sport</Eyebrow>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight" style={{ color: INK }}>Pickleball, badminton, tennis or padel</h2>
          <p className="mt-4 max-w-2xl mx-auto" style={{ color: MUTED }}>
            Tag each court with the sports played on it, indoor or outdoor. Players filter your page by sport, so a venue
            with pickleball and badminton courts runs both on one schedule. Basketball, volleyball and table tennis courts work too.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {sports.map(({ title, note }) => (
            <div key={title} className="rounded-[24px] border-2 p-7 bg-white" style={{ borderColor: INK }}>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-10 h-10 rounded-xl border-2 flex items-center justify-center" style={{ background: AMBER, borderColor: INK }}>
                  <Paddle className="w-5 h-5" style={{ color: INK }} />
                </span>
                <h3 className="font-extrabold text-lg" style={{ color: INK }}>{title}</h3>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: MUTED }}>{note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function LocalNote() {
  const points = [
    "Prices in pesos, with GCash payments straight to your own number",
    "A link and a QR poster to paste into Messenger, Facebook and the gate",
    "Built for a phone at the counter, with a list view for small screens",
    "A free plan that doesn't expire, so you can try it on real bookings",
  ]
  return (
    <section className="py-24 px-6" style={{ background: "#fff", fontFamily: display.fontFamily }}>
      <div className="max-w-4xl mx-auto text-center">
        <Eyebrow>Made for venues here</Eyebrow>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-8" style={{ color: INK }}>
          Built around how a Philippine court venue runs
        </h2>
        <p className="mb-8 max-w-2xl mx-auto" style={{ color: MUTED }}>
          Bookings here usually start in Messenger and get paid by GCash, so that&apos;s what it&apos;s built around. It
          starts free, in pesos, and you can take your first booking today. Planning a venue rather than running one? Start
          with our <a href={PLAN_PATH} className="font-bold underline" style={{ color: INK }}>pickleball court business plan</a>.
        </p>
        <div className="grid sm:grid-cols-2 gap-4 text-left">
          {points.map((p) => (
            <div key={p} className="flex items-start gap-3 rounded-[18px] border-2 bg-white p-5" style={{ borderColor: INK }}>
              <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" style={{ color: BLUE }} />
              <span className="text-sm font-medium" style={{ color: "#3f3b36" }}>{p}</span>
            </div>
          ))}
        </div>
        <a href={REGISTER_URL} className="inline-flex items-center gap-2 mt-10 px-7 py-4 rounded-full font-bold border-2 transition-transform hover:-translate-y-0.5"
           style={{ ...display, background: AMBER, color: INK, borderColor: INK, boxShadow: `5px 5px 0 ${INK}` }}>
          Set up your courts free <QrCode className="w-4 h-4" />
        </a>
      </div>
    </section>
  )
}

function FAQ() {
  return (
    <section id="faq" className="py-24 px-6" style={{ background: CREAM, fontFamily: display.fontFamily }}>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <Eyebrow>FAQ</Eyebrow>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight" style={{ color: INK }}>Questions venues ask</h2>
        </div>
        <FAQList faqs={FAQS} />
      </div>
    </section>
  )
}

export default function SportsCourtsContent() {
  return (
    <div style={{ background: "#fff" }}>
      <Navbar />
      <Hero />
      <Features />
      <Spotlights />
      <HowItWorks />
      <Sports />
      <LocalNote />
      <Pricing />
      <FAQ />
      <InternalLinks cluster="sports-courts" currentPath="/sports-courts" heading="More for court owners" />
      <CTA />
      <Footer />
    </div>
  )
}
