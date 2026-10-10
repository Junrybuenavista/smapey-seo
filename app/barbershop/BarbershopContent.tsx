"use client"

import {
  ListOrdered, HandCoins, Wallet, Contact, MessageSquare, QrCode, Package, ChartColumn, Tv,
  CheckCircle2, ChevronRight,
} from "lucide-react"
import {
  Navbar, Pricing, CTA, Footer, Eyebrow, FAQList, QueueHero, Animate,
  INK, BLUE, AMBER, CREAM, MUTED, FAINT, display, REGISTER_URL, START_PATH,
} from "@/components/barbershop/shared"
import InternalLinks from "@/components/InternalLinks"
import { FAQS } from "./faqs"

const FEATURES = [
  { icon: ListOrdered, title: "A walk-in line with each barber's wait", body: "Add each walk-in with the barber they want or Anyone. Everyone gets a queue number and a wait worked out from that barber's line, and Call next picks who's up when a chair frees." },
  { icon: HandCoins, title: "Each barber's share, per cut", body: "Set the shop's commission rate once, and give any barber their own. The share is worked out at payment from the services on the bill, and you choose which services and products earn one." },
  { icon: Wallet, title: "Closing that adds up the day", body: "Sales, each barber's share and the products sold, with GCash listed apart from cash so the cash figure matches the drawer. The report exports to Excel." },
  { icon: Contact, title: "Regulars who come back to their barber", body: "Each suki's visits, usual barber and how they like their cut. Search a name or number at the counter and their barber, services and notes fill themselves in." },
  { icon: MessageSquare, title: "A text when they're next", body: "Customers can step out for a merienda and get a text when their turn is close. Regulars who agreed get a reminder when it's been a while since their last cut." },
  { icon: QrCode, title: "Your own page and QR poster", body: "Customers check the wait before walking over, join the line from their phone, or book a time, with an optional GCash deposit paid straight to you." },
  { icon: Package, title: "Products and stock that count themselves", body: "Sell pomade, wax and shampoo on a haircut's bill or on their own. Stock comes off with every sale, and the Products page warns you when something runs low." },
  { icon: ChartColumn, title: "Analytics for the owner", body: "Sales, average spend, regulars who came back, your busiest days and hours, and each barber's sales, share and usual time in the chair, for any dates." },
  { icon: Tv, title: "The line on a TV", body: "Put the queue on a smart TV in the waiting area so customers see their number move, including who joined online and is on the way." },
]

const STEPS = [
  { n: "1", t: "Add them to the line", d: "A name, the barber they want or Anyone, and the services. A regular fills in from their name or number." },
  { n: "2", t: "Call next", d: "When a chair frees up, the right customer is called: the barber's own first, then whoever will take anyone. Text them if they stepped out." },
  { n: "3", t: "Take payment", d: "Services and products on one bill, in cash, GCash, Maya or card. The barber's share is worked out as it's paid." },
  { n: "4", t: "Close the day", d: "Sales, each barber's share and the products sold, already added up. Export it to Excel if you keep your own books." },
]

function Hero() {
  return (
    <QueueHero
      badge="For barbershops in the Philippines"
      title={<>Barbershop management system that keeps the line moving</>}
      subtitle="A barbershop POS and walk-in queue in one: add each customer with their barber, see the wait, and call the next one. Each barber's share works itself out at payment, and closing adds up the day."
      ctaNote="The Free plan covers two barbers and 200 customer visits a month."
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
            Everything the shop does all day
          </h2>
          <p className="mt-4 max-w-2xl mx-auto" style={{ color: MUTED }}>
            Barbershop software that follows a customer from the moment they walk in to the moment the day&apos;s sales
            are added up.
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

function Row({ label, value, strong }: { label: React.ReactNode; value: string; strong?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3 px-5 py-2.5" style={{ borderTop: "1px solid #f2ece1" }}>
      <span className={`text-sm ${strong ? "font-extrabold" : "font-medium"}`} style={{ color: strong ? INK : MUTED }}>{label}</span>
      <span className={`text-sm tabular-nums whitespace-nowrap ${strong ? "font-extrabold" : "font-semibold"}`} style={{ color: INK }}>{value}</span>
    </div>
  )
}

// One day at a three-chair shop. The figures agree with each other: services
// ₱5,600 at a 50% share is ₱2,800, plus 10% of the ₱750 in products is ₱2,875,
// which is what the three barbers' shares add up to.
const BARBERS = [
  { name: "Jun", heads: 12, share: "₱1,250" },
  { name: "Ronnie", heads: 9, share: "₱975" },
  { name: "Ely", heads: 7, share: "₱650" },
]

function Spotlights() {
  return (
    <section className="py-24 px-6" style={{ background: CREAM, fontFamily: display.fontFamily }}>
      <div className="max-w-6xl mx-auto flex flex-col gap-24">
        <Spotlight
          eyebrow="Commission and closing"
          title="Each barber's share, already worked out"
          desc={<>Working out commission by hand at closing, from a notebook of who cut whom, is where the arguments start. Here the share is worked out the moment a customer pays, from the services on their bill and that barber&apos;s rate, so closing is a matter of reading it off. If you&apos;re still deciding how to pay your barbers, our <a href={START_PATH} className="font-bold underline" style={{ color: INK }}>guide to starting a barbershop</a> covers it.</>}
          bullets={[
            "A shop-wide rate, and a different rate for any barber who has one",
            "You choose which services and products earn a share",
            "GCash listed apart from cash, so the cash figure matches the drawer",
          ]}
          color={AMBER}
        >
          <div className="grid sm:grid-cols-[1.1fr_.9fr] gap-4">
            <div className="rounded-[22px] border-2 bg-white overflow-hidden" style={{ borderColor: INK, boxShadow: `8px 8px 0 ${AMBER}` }}>
              <div className="px-5 py-3.5 border-b-2" style={{ borderColor: INK, background: CREAM }}>
                <p className="font-extrabold" style={{ color: INK }}>Closing · Saturday</p>
              </div>
              <Row label="Customers" value="28" />
              <Row label="Services" value="₱5,600" />
              <Row label="Products" value="₱750" />
              <Row label="Sales" value="₱6,350" strong />
              <Row label="Barbers' share" value="−₱2,875" />
              <Row label="The shop keeps" value="₱3,475" strong />
              <div className="px-5 py-3 border-t-2 text-xs font-semibold" style={{ borderColor: INK, background: CREAM, color: MUTED }}>
                Cash ₱5,150 · GCash ₱1,200
              </div>
            </div>
            <div className="rounded-[22px] border-2 bg-white overflow-hidden self-start" style={{ borderColor: INK }}>
              <div className="px-5 py-3.5 border-b-2" style={{ borderColor: INK, background: CREAM }}>
                <p className="font-extrabold" style={{ color: INK }}>Barbers</p>
              </div>
              {BARBERS.map((b, i) => (
                <div key={b.name} className="flex items-center justify-between gap-3 px-5 py-2.5" style={{ borderTop: i ? "1px solid #f2ece1" : "none" }}>
                  <span className="text-sm font-semibold" style={{ color: INK }}>{b.name} <span className="font-medium" style={{ color: FAINT }}>· {b.heads}</span></span>
                  <span className="text-sm font-extrabold tabular-nums" style={{ color: INK }}>{b.share}</span>
                </div>
              ))}
              <div className="px-5 py-3 border-t-2 text-xs font-semibold" style={{ borderColor: INK, background: CREAM, color: MUTED }}>
                50% of services · 10% of products
              </div>
            </div>
          </div>
        </Spotlight>

        <Spotlight
          eyebrow="Online page"
          title="Let customers see the wait before they walk over"
          desc="Most customers would rather wait at home than on your bench. Your shop's page shows whether you're open, the wait right now and each barber's line, and lets customers join from their phone. Bookings are there if you want them, and off if you don't."
          bullets={[
            "Customers join with a name and mobile number, and pick a barber or Anyone",
            "They show as on the way, and Call next skips them until they're here",
            "Optional bookings, with a GCash deposit sent to your own GCash",
            "A printable QR poster for the door or the counter",
          ]}
          color={BLUE}
          reverse
        >
          <div className="max-w-sm mx-auto rounded-[28px] border-2 bg-white overflow-hidden" style={{ borderColor: INK, boxShadow: `8px 8px 0 ${BLUE}` }}>
            <div className="px-5 py-4 border-b-2" style={{ borderColor: INK, background: CREAM }}>
              <p className="font-extrabold" style={{ color: INK }}>Kanto Barbershop</p>
              <p className="text-xs font-semibold mt-0.5" style={{ color: MUTED }}>
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 mr-1.5 align-middle" />Open · 3 waiting
              </p>
            </div>
            {[
              { b: "Jun", w: "about 10 min" },
              { b: "Ronnie", w: "about 25 min" },
              { b: "Anyone", w: "about 15 min" },
            ].map((r, i) => (
              <div key={r.b} className="flex items-center justify-between gap-3 px-5 py-2.5" style={{ borderTop: i ? "1px solid #f2ece1" : "none" }}>
                <span className="text-sm font-semibold" style={{ color: INK }}>{r.b}</span>
                <span className="text-sm font-extrabold tabular-nums" style={{ color: INK }}>{r.w}</span>
              </div>
            ))}
            <div className="px-5 py-4 border-t-2 grid grid-cols-2 gap-2" style={{ borderColor: INK }}>
              <span className="text-center text-sm font-bold py-2.5 rounded-full border-2" style={{ background: AMBER, color: INK, borderColor: INK }}>Join the line</span>
              <span className="text-center text-sm font-bold py-2.5 rounded-full border-2 bg-white" style={{ color: INK, borderColor: INK }}>Book a time</span>
            </div>
          </div>
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
            From the door to the drawer
          </h2>
          <p className="mt-4 max-w-2xl mx-auto" style={{ color: MUTED }}>
            Built so adding a walk-in takes seconds, on a phone between cuts.
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

function LocalNote() {
  const points = [
    "Walk-ins first: bookings are there if you want them, not the point",
    "Prices in pesos, with GCash recorded like any other payment",
    "Commission per barber, the way shops here already pay",
    "A free plan that fits a two-chair shop, so you can try it on real customers",
  ]
  return (
    <section className="py-24 px-6" style={{ background: CREAM, fontFamily: display.fontFamily }}>
      <div className="max-w-4xl mx-auto text-center">
        <Eyebrow>Made for shops here</Eyebrow>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-8" style={{ color: INK }}>
          Built around how a Philippine barbershop runs
        </h2>
        <p className="mb-8 max-w-2xl mx-auto" style={{ color: MUTED }}>
          Most barbershop software is built around an appointment book and priced in dollars. This one starts with the
          walk-in line, in pesos, and you can add your first customer today.
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
          Set up your shop free <ChevronRight className="w-4 h-4" />
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
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight" style={{ color: INK }}>Questions shops ask</h2>
        </div>
        <FAQList faqs={FAQS} />
      </div>
    </section>
  )
}

export default function BarbershopContent() {
  return (
    <div style={{ background: "#fff" }}>
      <Navbar />
      <Hero />
      <Features />
      <Spotlights />
      <HowItWorks />
      <LocalNote />
      <Pricing />
      <FAQ />
      <InternalLinks cluster="barbershop" currentPath="/barbershop" heading="More for barbershop owners" />
      <CTA />
      <Footer />
    </div>
  )
}
