"use client"

import {
  Car, Tags, ListOrdered, HandCoins, Wallet, Gift, CheckCircle2, ChevronRight, Bike, Bubbles,
} from "lucide-react"
import {
  Navbar, Pricing, CTA, Footer, Eyebrow, FAQList, CounterHero, Animate,
  INK, BLUE, AMBER, CREAM, MUTED, FAINT, display, REGISTER_URL, PRICES_PATH,
} from "@/components/car-wash/shared"
import InternalLinks from "@/components/InternalLinks"
import { FAQS } from "./faqs"

const FEATURES = [
  { icon: Car, title: "Every car on record by plate", body: "Type a plate and a returning car comes back with its size, owner and usual package. Many customers never give a name, so the plate carries the visit history and the stamp card." },
  { icon: Tags, title: "A price board the counter can't fudge", body: "Services by vehicle size in one grid. Staff tap, the price comes from the board. Only the owner or an admin can charge something else, they have to say why, and you see every change." },
  { icon: ListOrdered, title: "A live queue: waiting, washing, ready", body: "Every car with its queue number and who's washing it. Put the queue on a TV in the waiting area, and give each customer a QR link that updates by itself." },
  { icon: HandCoins, title: "Crew share worked out per car", body: "A percentage of each car or a fixed amount per car, split evenly between the washers on it. The payout for any range of days is already added up, and exports to Excel." },
  { icon: Wallet, title: "End-of-day closing", body: "It tells you what the drawer should hold after expenses and crew pay taken from it. Count the cash and see right away if you're short or over. When staff close the day, the owner gets a notice with the result." },
  { icon: Gift, title: "Stamp card on the plate", body: "Every few washes earns a free one, counted on the plate so there's no paper card to lose. The counter sees when a car has a free wash waiting." },
]

const STEPS = [
  { n: "1", t: "Type the plate", d: "A returning car fills in its size, owner and usual package. A new one needs a plate and a size, and a phone number only if they want a text." },
  { n: "2", t: "Tap the services", d: "Package and add-ons straight from your board, and the total works itself out. Snap the scratches at drop-off while you're there." },
  { n: "3", t: "Wash it", d: "Waiting, washing, ready, with who washed it. The waiting-area TV and the customer's link keep up on their own." },
  { n: "4", t: "Release and close", d: "Take cash, GCash, Maya, card or bank. At closing, count the drawer. The crew's shares are already worked out." },
]

function Hero() {
  return (
    <CounterHero
      badge="For car wash and motor wash shops"
      title={<>Car wash management system that counts every car</>}
      subtitle="A car wash POS for the counter: type the plate, tap the services, and the price comes off your own price board. Each washer's share works itself out, and at closing it tells you what the drawer should hold."
      ctaNote="Free plan covers 200 cars a month."
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
            Everything the counter does all day
          </h2>
          <p className="mt-4 max-w-2xl mx-auto" style={{ color: MUTED }}>
            Car wash software that covers the whole car, from the moment it pulls in to the moment the day&apos;s cash is
            counted.
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

// A slice of a real board, at the typical prices a new shop starts with.
const BOARD = {
  sizes: ["Sedan", "SUV", "Pick-up"],
  rows: [
    { name: "Wash", prices: ["₱130", "₱160", "₱190"] },
    { name: "Wash & Vacuum", prices: ["₱160", "₱190", "₱220"] },
    { name: "Wax", prices: ["₱410", "₱490", "₱590"] },
    { name: "Engine Wash", prices: ["₱450", "₱500", "₱550"] },
  ],
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

function Row({ label, value, strong, tone }: { label: React.ReactNode; value: string; strong?: boolean; tone?: "danger" }) {
  return (
    <div className="flex items-center justify-between gap-3 px-5 py-2.5" style={{ borderTop: "1px solid #f2ece1" }}>
      <span className={`text-sm ${strong ? "font-extrabold" : "font-medium"}`} style={{ color: strong ? INK : MUTED }}>{label}</span>
      <span className={`text-sm tabular-nums whitespace-nowrap ${strong || tone ? "font-extrabold" : "font-semibold"}`} style={{ color: tone === "danger" ? "#c2410c" : INK }}>{value}</span>
    </div>
  )
}

function Spotlights() {
  return (
    <section className="py-24 px-6" style={{ background: CREAM, fontFamily: display.fontFamily }}>
      <div className="max-w-6xl mx-auto flex flex-col gap-24">
        <Spotlight
          eyebrow="Price board"
          title="One price board, so the price is never a guess"
          desc={<>Most cash goes missing in two ways: cars that never get written down, and prices that change at the counter. Here every car is written down by plate, and every price comes off your board. A new board even starts with <a href={PRICES_PATH} className="font-bold underline" style={{ color: INK }}>typical Philippine car wash prices</a>, for you to correct.</>}
          bullets={[
            "Packages and add-ons, priced by vehicle size",
            "An empty box means you don't offer it for that size",
            "Price changes need the owner or an admin, and a reason",
          ]}
          color={BLUE}
        >
          <div className="rounded-[22px] border-2 bg-white overflow-hidden" style={{ borderColor: INK, boxShadow: `8px 8px 0 ${BLUE}` }}>
            <div className="px-5 py-3.5 border-b-2 flex items-center justify-between" style={{ borderColor: INK, background: CREAM }}>
              <span className="font-extrabold" style={{ color: INK }}>Price Board</span>
              <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: FAINT }}>Packages · Add-ons</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <th className="text-left px-5 py-2.5 text-xs font-bold uppercase tracking-wider" style={{ color: FAINT }}>Service</th>
                    {BOARD.sizes.map((s) => <th key={s} className="px-3 py-2.5 text-center font-bold" style={{ color: INK }}>{s}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {BOARD.rows.map((r) => (
                    <tr key={r.name} style={{ borderTop: "1px solid #f2ece1" }}>
                      <td className="px-5 py-2.5 font-semibold whitespace-nowrap" style={{ color: INK }}>{r.name}</td>
                      {r.prices.map((p, i) => <td key={i} className="px-3 py-2.5 text-center font-extrabold tabular-nums" style={{ color: INK }}>{p}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-5 py-3 border-t-2 text-xs font-semibold flex flex-wrap items-center gap-x-2 gap-y-1" style={{ borderColor: INK, background: CREAM, color: MUTED }}>
              <span className="px-2 py-0.5 rounded-full border-2 text-[10px] font-bold uppercase tracking-widest bg-white" style={{ borderColor: INK, color: INK }}>Price changed</span>
              Wax, SUV: ₱490 → ₱450 · &ldquo;Regular, 10th visit&rdquo;
            </div>
          </div>
        </Spotlight>

        <Spotlight
          eyebrow="Closing"
          title="Know what the drawer should hold"
          desc="At closing, the app has already added up the day: the cash taken for every car released, less what came out of the drawer for supplies and meals. You count, it compares. And because each washer's share was worked out car by car, nobody has to do it by hand at seven in the evening."
          bullets={[
            "Short or over, worked out the moment you count",
            "GCash and Maya listed apart, since they never touch the drawer",
            "Each washer's cars and share for the day, ready to pay",
          ]}
          color={AMBER}
          reverse
        >
          <div className="grid sm:grid-cols-[1.15fr_.85fr] gap-4">
            <div className="rounded-[22px] border-2 bg-white overflow-hidden" style={{ borderColor: INK, boxShadow: `8px 8px 0 ${AMBER}` }}>
              <div className="px-5 py-3.5 border-b-2" style={{ borderColor: INK, background: CREAM }}>
                <p className="font-extrabold" style={{ color: INK }}>Closing · Saturday</p>
              </div>
              <Row label="Opening cash" value="₱1,000" />
              <Row label="Cash taken · 35 cars" value="₱7,860" />
              <Row label="Expenses from the drawer" value="−₱450" />
              <Row label="Should be in the drawer" value="₱8,410" strong />
              <Row label="Counted" value="₱8,390" />
              <Row label="Short" value="₱20" tone="danger" />
              <div className="px-5 py-3 border-t-2 text-xs font-semibold" style={{ borderColor: INK, background: CREAM, color: MUTED }}>
                Not in the drawer: GCash ₱690 · 3 cars
              </div>
            </div>
            <div className="rounded-[22px] border-2 bg-white overflow-hidden self-start" style={{ borderColor: INK }}>
              <div className="px-5 py-3.5 border-b-2" style={{ borderColor: INK, background: CREAM }}>
                <p className="font-extrabold" style={{ color: INK }}>Crew share</p>
              </div>
              {[
                { name: "Ana", cars: 14, share: "₱630" },
                { name: "Ben", cars: 13, share: "₱585" },
                { name: "Carlo", cars: 11, share: "₱495" },
              ].map((c, i) => (
                <div key={c.name} className="flex items-center justify-between gap-3 px-5 py-2.5" style={{ borderTop: i ? "1px solid #f2ece1" : "none" }}>
                  <span className="text-sm font-semibold" style={{ color: INK }}>{c.name} <span className="font-medium" style={{ color: FAINT }}>· {c.cars} cars</span></span>
                  <span className="text-sm font-extrabold tabular-nums" style={{ color: INK }}>{c.share}</span>
                </div>
              ))}
              <div className="px-5 py-3 border-t-2 text-xs font-semibold" style={{ borderColor: INK, background: CREAM, color: MUTED }}>
                20% of each car
              </div>
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
            From the driveway to the drawer
          </h2>
          <p className="mt-4 max-w-2xl mx-auto" style={{ color: MUTED }}>
            Built so a returning car takes seconds at the counter, on a phone held in a wet hand.
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

// The keyword shops actually type is "motor wash", so the section says it.
function ShopModes() {
  const modes = [
    { icon: Car, title: "Car wash", sizes: "Sedan / Hatchback, SUV / AUV / MPV, Pick-up, Van", note: "Wash, Wash & Vacuum, Wax, Engine Wash, Interior Detailing and Glass Watermark Removal to start." },
    { icon: Bike, title: "Motor wash", sizes: "Motorcycle, Big bike", note: "Wash, Wash & Wax and Chain Clean & Lube to start, on motorcycle and big bike sizes." },
    { icon: Bubbles, title: "Both", sizes: "All six sizes on one board", note: "One counter and one queue for cars and motorcycles, one closing at the end of the day." },
  ]
  return (
    <section className="py-24 px-6" style={{ background: CREAM, fontFamily: display.fontFamily }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <Eyebrow>Cars and motorcycles</Eyebrow>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight" style={{ color: INK }}>Car wash, motor wash, or both</h2>
          <p className="mt-4 max-w-2xl mx-auto" style={{ color: MUTED }}>
            Pick what the shop washes when you set up, and the board starts with the sizes and services that fit.
            Rename, add or retire any of them later.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {modes.map(({ icon: Icon, title, sizes, note }) => (
            <div key={title} className="rounded-[24px] border-2 p-7 bg-white" style={{ borderColor: INK }}>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-10 h-10 rounded-xl border-2 flex items-center justify-center" style={{ background: AMBER, borderColor: INK }}>
                  <Icon className="w-5 h-5" style={{ color: INK }} />
                </span>
                <h3 className="font-extrabold text-lg" style={{ color: INK }}>{title}</h3>
              </div>
              <p className="text-sm font-bold mb-2" style={{ color: INK }}>{sizes}</p>
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
    "Prices in pesos, with GCash and Maya recorded like any other payment",
    "Built for a phone at the counter: the plate search comes first",
    "Starts with typical Philippine prices on the board, for you to correct",
    "A free plan that doesn't expire, so you can try it on real cars",
  ]
  return (
    <section className="py-24 px-6" style={{ background: "#fff", fontFamily: display.fontFamily }}>
      <div className="max-w-4xl mx-auto text-center">
        <Eyebrow>Made for shops here</Eyebrow>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-8" style={{ color: INK }}>
          Built around how a Philippine car wash runs
        </h2>
        <p className="mb-8 max-w-2xl mx-auto" style={{ color: MUTED }}>
          Most car wash POS software is priced in dollars and sold through a demo call. This one starts free, in pesos,
          and you can be taking your first car today.
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
          Set up your price board free <ChevronRight className="w-4 h-4" />
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

export default function CarWashContent() {
  return (
    <div style={{ background: "#fff" }}>
      <Navbar />
      <Hero />
      <Features />
      <Spotlights />
      <HowItWorks />
      <ShopModes />
      <LocalNote />
      <Pricing />
      <FAQ />
      <InternalLinks cluster="car-wash" currentPath="/car-wash" heading="More for car wash owners" />
      <CTA />
      <Footer />
    </div>
  )
}
