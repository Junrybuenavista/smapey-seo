"use client"

import { useState } from "react"
import Link from "next/link"
import { usePricing, type Plan } from "@/lib/usePricing"
import BookDemoForm from "@/components/BookDemoForm"
import { FAQS } from "./faqs"
import { builtHubs, anchorFor, APEX } from "@/lib/silo"

/* Palette and type from the supplied landing-page design, kept exact. This page
   deliberately runs its own look rather than the shared silo tokens - it is the
   money page, and the design was specified for it. */
const INK = "#101418"
const BLUE = "#2f63f6"
const AMBER = "#f5a524"
const CREAM = "#fbf7ea"
const MUTED = "#5c6672"
const LINE = "#e7e2d4"
const display = { fontFamily: "var(--font-jakarta), system-ui, -apple-system, sans-serif" }
const mono = { fontFamily: "var(--font-mono), ui-monospace, monospace" }
const LOGIN = `${process.env.NEXT_PUBLIC_FRONTEND_URL ?? "https://app.smapey.com"}/login`
const REGISTER = `${process.env.NEXT_PUBLIC_FRONTEND_URL ?? "https://app.smapey.com"}/register?product=BOARDING_HOUSE&plan=FREE`

/* Every claim below describes behaviour that exists today. The source design
   also advertised a tenant portal, online bed booking, PayPal, sub-metered
   utility splits, document uploads, and a suite of dormitory tools - none of
   which are built, so none of them appear here. */
const FEATURES = [
  { bg: BLUE,  fg: "#fff", icon: "▦", title: "Visual room cards", desc: "Every room is a card showing who is inside and which beds or slots are free. Move a tenant in, transfer them, swap two boarders, or move them out without leaving the page." },
  { bg: AMBER, fg: INK,    icon: "▤", title: "Bed-level tracking", desc: "In a bedspace room each bed is named and priced on its own - Lower A, Upper A - so a lower deck can carry its usual premium. Occupancy counts beds, not rooms." },
  { bg: "#dce6ff", fg: INK, icon: "◧", title: "Move-ins from the vacancy view", desc: "Click any vacant bed to place a tenant against it. Capacity is the beds that exist, so a room with one free upper deck reads as partly vacant rather than full." },
  { bg: AMBER, fg: INK,    icon: "☰", title: "Tenant profiles and ledger", desc: "Contact and emergency details, move-in date, deposit and its status, plus a one-click ledger: every room and bed occupied, and a month-by-month table of billed, paid, and balance." },
  { bg: BLUE,  fg: "#fff", icon: "₱", title: "Rent billing and email statements", desc: "Generate the month's bills in one action, each due on the tenant's own move-in day. Every tenant with an email gets a statement showing rent, their utility share, the total, and the due date." },
  { bg: "#dce6ff", fg: INK, icon: "◔", title: "Utility billing", desc: "Enter the whole month with Quick Fill or import from an Excel template. Each tenant's share is the room's bill divided by its occupants, fixed when the bill is created and shown with the computation." },
  { bg: AMBER, fg: INK,    icon: "⚒", title: "Maintenance tracking", desc: "Log repairs with a category, priority, and status from Open to Resolved, and record the repair cost so your monthly expenses reflect what the house actually costs to run." },
  { bg: BLUE,  fg: "#fff", icon: "▩", title: "QR issue reporting", desc: "Print a QR poster per room. Tenants scan it - no app, no login - to report a leak or a busted outlet with photos, and to see the status of the room's recent reports." },
  { bg: "#dce6ff", fg: INK, icon: "◫", title: "Tenants report their own payments", desc: "Put your GCash or bank QR beside the report QR. A tenant scans, sees their exact balance for the month, pays, and attaches a screenshot. It lands in your Payments Inbox and one tap posts it to the right bills." },
  { bg: AMBER, fg: INK,    icon: "⇄", title: "Transfers, swaps and stay history", desc: "Move a tenant to another room or bed with the deposit carried over, or swap two tenants in one step even when the house is full. Every movement stays on record with dates and rates." },
  { bg: BLUE,  fg: "#fff", icon: "◨", title: "Dashboard and occupancy", desc: "Occupancy, active tenants, overdue bills, open maintenance, and what you have collected this month, with a six-month view of rent against utility revenue." },
  { bg: "#dce6ff", fg: INK, icon: "▣", title: "Cashflow and expenses", desc: "Rent, utility payments, and deposits flow in on their own; repairs and expenses are logged in seconds. Each month shows Money In, Money Out, and Net with a running balance." },
]

const COMPARISON: [string, string, string][] = [
  ["Bed-level detail", "One row per room", "Each bed named, priced, and tracked on its own"],
  ["Billing", "Retyped every month", "The month's bills generated in one action"],
  ["Payments", "Noted manually", "Cash, GCash, Maya, bank transfer - partial payments supported"],
  ["Utilities", "Calculator and memory", "Entered once per room and split across its tenants"],
  ["Record-keeping", "Overwritten as you go", "Every tenancy, transfer, and payment kept with its dates"],
  ["Transparency", "Your word for it", "A statement showing the computation, emailed to the tenant"],
]

const STEPS = [
  { n: "01", title: "Set up rooms and beds", desc: "Add each room with a name, floor, and monthly rate. For bedspacers, name each bed and give it its own rate - lower deck, upper deck, whatever you charge." },
  { n: "02", title: "Move tenants in", desc: "Create a tenant once, then click any vacant bed to place them. Deposits and rates are recorded against the tenancy, and each room gets a QR poster for reporting." },
  { n: "03", title: "Bill and collect", desc: "Generate the month's bills, statements go out by email, and payments post against the right bill - whether you record them or the tenant reports their own." },
]

const PH_POINTS = [
  { bg: BLUE, fg: "#fff", icon: "₱", title: "Peso pricing and the payment apps you already use", desc: "Rates, bills, deposits, and your cashbook are all in pesos. Record cash, GCash, Maya, or a bank transfer - or let the tenant scan, pay, and attach the screenshot for you to verify." },
  { bg: AMBER, fg: INK, icon: "▤", title: "Bedspacers, and upper versus lower deck", desc: "A bedspace room is not one unit at one price. Each bed carries its own monthly rate, and occupancy counts beds - so a half-empty room reads as half empty." },
  { bg: "#dce6ff", fg: INK, icon: "◔", title: "Shared utilities, split and shown", desc: "One Meralco or water bill goes in once and each tenant's statement shows their share with the arithmetic spelled out, so nobody has to take your word for it." },
  { bg: AMBER, fg: INK, icon: "▣", title: "Records you can produce when asked", desc: "Running a boarding house comes with paperwork and the questions that follow it. Every tenancy, transfer, deposit, and payment is on record, so a tenant ledger is one click." },
]

function Navbar() {
  return (
    <nav
      className="sticky top-0 z-40 backdrop-blur"
      style={{ background: "rgba(255,255,255,.92)", borderBottom: `1px solid ${LINE}` }}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center gap-6 h-[62px]">
        <Link href="/boarding-house" className="flex items-center gap-2 font-extrabold text-sm no-underline" style={{ color: INK }}>
          <span className="w-[22px] h-[22px] rounded-md border-2 block" style={{ background: BLUE, borderColor: INK }} />
          Smapey Boarding House
        </Link>

        <div className="hidden lg:flex gap-6 ml-auto text-sm font-semibold">
          {[["Features", "#features"], ["How it works", "#how"], ["Pricing", "#pricing"], ["FAQ", "#faq"], ["Guides", "#guides"]].map(([label, href]) => (
            <a key={href} href={href} className="no-underline hover:opacity-70 transition" style={{ color: MUTED }}>
              {label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3.5 ml-auto lg:ml-0">
          <a href={LOGIN} className="text-sm font-semibold no-underline hidden sm:inline" style={{ color: INK }}>
            Sign in
          </a>
          <a
            href={REGISTER}
            className="inline-flex items-center gap-2 font-bold text-[0.85rem] px-4.5 py-2.5 rounded-full border-2 transition-transform hover:-translate-y-0.5"
            style={{ background: AMBER, color: INK, borderColor: INK, boxShadow: `3px 3px 0 ${INK}`, paddingLeft: 18, paddingRight: 18 }}
          >
            Get started free
          </a>
        </div>
      </div>
    </nav>
  )
}

function Card({ children, accent = INK, pad = "p-5" }: { children: React.ReactNode; accent?: string; pad?: string }) {
  return (
    <div className={`rounded-[14px] border-2 bg-white ${pad}`} style={{ borderColor: INK, boxShadow: `4px 4px 0 ${accent}` }}>
      {children}
    </div>
  )
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[0.72rem] font-medium uppercase tracking-[0.16em] mb-3" style={{ ...mono, color: BLUE }}>
      {children}
    </p>
  )
}

/* ── Hero occupancy mock ──────────────────────────────────────────────────── */
const BEDS = [
  ["1A", "occ"], ["1B", "occ"], ["2A", "res"], ["2B", "occ"], ["3A", "vac"], ["3B", "occ"],
  ["4A", "occ"], ["4B", "vac"], ["5A", "occ"], ["5B", "occ"], ["6A", "res"], ["6B", "vac"],
] as const
const BED_BG: Record<string, string> = { occ: BLUE, res: AMBER, vac: "#efead9" }

function OccupancyMock() {
  return (
    <div className="rounded-[18px] border-2 bg-white p-4" style={{ borderColor: INK, boxShadow: `7px 7px 0 ${INK}` }} aria-label="Product preview: occupancy dashboard">
      <div className="flex justify-between items-start mb-3.5">
        <div>
          <div className="font-extrabold text-sm" style={{ color: INK }}>Sunrise Boarding House</div>
          <div className="text-xs" style={{ color: MUTED }}>12 rooms · 24 beds</div>
        </div>
        <span className="text-[0.65rem] font-bold border-2 rounded-full px-2.5 py-0.5" style={{ borderColor: INK, background: AMBER, color: INK }}>
          2 bills due today
        </span>
      </div>

      <div className="grid grid-cols-4 sm:grid-cols-6 gap-1.5 mb-3.5">
        {BEDS.map(([label, state]) => (
          <span
            key={label}
            className="aspect-square rounded-lg border-2 grid place-items-center text-[0.6rem] font-bold"
            style={{ borderColor: INK, background: BED_BG[state], color: state === "occ" ? "#fff" : INK }}
          >
            {label}
          </span>
        ))}
      </div>

      <div className="flex gap-3.5 text-[0.66rem] font-semibold mb-3.5" style={{ color: MUTED }}>
        {[["Occupied", BLUE], ["Reserved", AMBER], ["Vacant", "#efead9"]].map(([l, c]) => (
          <span key={l} className="flex items-center gap-1.5">
            <i className="w-2.5 h-2.5 rounded-[3px] border" style={{ background: c, borderColor: INK }} />
            {l}
          </span>
        ))}
      </div>

      <div className="border-2 rounded-[10px] p-3" style={{ borderColor: INK }}>
        <div className="flex justify-between text-xs font-bold mb-2" style={{ color: INK }}>
          <span>Rent collected</span>
          <span>₱41,200 / ₱110,000</span>
        </div>
        <div className="h-2.5 rounded-full border-2 overflow-hidden" style={{ borderColor: INK, background: "#efead9" }}>
          <i className="block h-full" style={{ width: "37%", background: BLUE }} />
        </div>
      </div>
    </div>
  )
}

/* ── Pricing, from the live plan configuration ────────────────────────────── */
function Pricing() {
  const { plans, isPhilippines } = usePricing("BOARDING_HOUSE")

  return (
    <section id="pricing" className="py-20 px-6 bg-white" style={display}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <Eyebrow>Pricing</Eyebrow>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight" style={{ color: INK }}>
            Start free. Upgrade when ready.
          </h2>
          <p className="mt-3" style={{ color: MUTED }}>The free plan stays free.</p>
          <span className="inline-flex items-center border-2 rounded-full px-3.5 py-1 text-xs font-bold mt-4" style={{ borderColor: INK, background: "#fff", color: INK }}>
            All prices in {isPhilippines ? "Philippine Pesos (₱)" : "US Dollars ($)"}
          </span>
        </div>

        <div className="grid md:grid-cols-3 gap-5 items-start">
          {plans.map((plan: Plan) => {
            const hot = plan.highlight
            return (
              <div
                key={plan.planKey}
                className="relative rounded-[14px] border-2 p-6"
                style={{ borderColor: INK, background: hot ? BLUE : "#fff", color: hot ? "#fff" : INK, boxShadow: `4px 4px 0 ${INK}` }}
              >
                {hot && (
                  <span className="absolute -top-3 left-6 border-2 rounded-full px-3 py-0.5 text-[0.7rem] font-extrabold" style={{ borderColor: INK, background: AMBER, color: INK }}>
                    Most popular
                  </span>
                )}
                <div className="font-extrabold text-lg">{plan.name}</div>
                <p className="text-sm mt-1 mb-4 min-h-[34px]" style={{ color: hot ? "rgba(255,255,255,.86)" : MUTED }}>
                  {plan.desc}
                </p>
                <div className="text-4xl font-extrabold tracking-tight">
                  {isPhilippines ? plan.phpPrice : plan.usdPrice}
                  <span className="text-sm font-semibold opacity-70">{plan.period}</span>
                </div>
                <ul className="list-none p-0 my-5 text-sm space-y-1.5" style={{ color: hot ? "rgba(255,255,255,.86)" : MUTED }}>
                  {plan.features.map((f) => (
                    <li key={f} className="pl-5 relative">
                      <span className="absolute left-0 font-extrabold" style={{ color: hot ? "#fff" : AMBER }}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href={REGISTER}
                  className="flex items-center justify-center gap-2 w-full font-bold text-sm px-6 py-3 rounded-full border-2 transition-transform hover:-translate-y-0.5"
                  style={{ borderColor: INK, background: hot ? AMBER : INK, color: hot ? INK : "#fff" }}
                >
                  {plan.cta}
                </a>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default function BoardingHouseContent() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <main style={display}>
      <Navbar />

      {/* HERO */}
      <header className="py-16 px-6" style={{ background: CREAM }}>
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.05fr_.95fr] gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-2 bg-white border-2 rounded-full px-4 py-1.5 text-xs font-bold mb-5" style={{ borderColor: INK, color: INK }}>
              🏠 Built for boarding houses and bedspacers
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-[1.08] tracking-tight" style={{ color: INK }}>
              Boarding House Management System{" "}
              <span style={{ color: BLUE }}>for Philippine Landlords</span>
            </h1>
            <p className="font-bold text-lg mt-4 mb-2" style={{ color: INK }}>
              Every room, every bed, every peso — tracked.
            </p>
            <p className="text-base leading-relaxed mb-6 max-w-xl" style={{ color: MUTED }}>
              Smapey replaces paper records and scattered spreadsheets with one dashboard for
              rooms and beds, tenant records, rent billing, utility billing, and maintenance.
              Set up in minutes — no demo call, no manual, no IT setup.
            </p>
            <div className="flex gap-3 flex-wrap">
              <a href={REGISTER} className="inline-flex items-center gap-2 font-bold text-sm px-6 py-3.5 rounded-full border-2 transition-transform hover:-translate-y-0.5" style={{ background: AMBER, color: INK, borderColor: INK, boxShadow: `3px 3px 0 ${INK}` }}>
                Start free, no card needed →
              </a>
              <a href="#book-demo" className="inline-flex items-center gap-2 font-bold text-sm px-6 py-3.5 rounded-full border-2 bg-white transition-transform hover:-translate-y-0.5" style={{ color: INK, borderColor: INK, boxShadow: `3px 3px 0 ${INK}` }}>
                Book a demo
              </a>
            </div>
            <div className="flex gap-5 flex-wrap mt-6 text-xs font-semibold" style={{ color: MUTED }}>
              {["No credit card required", "Free plan with 5 rooms and 20 tenants", "Set up in minutes"].map((t) => (
                <span key={t}><span style={{ color: BLUE, fontWeight: 800 }}>✓</span> {t}</span>
              ))}
            </div>
          </div>

          <OccupancyMock />
        </div>
      </header>

      {/* PROBLEM */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <Eyebrow>The problem</Eyebrow>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4" style={{ color: INK }}>
            A spreadsheet works until about ten tenants
          </h2>
          <p className="text-lg leading-relaxed" style={{ color: MUTED }}>
            Most boarding houses start in a notebook, then graduate to Excel. That is fine while
            you can hold the whole house in your head. Past roughly ten tenants — especially once
            you are doing{" "}
            <Link href="/boarding-house/bed-space-and-room-management" className="font-bold underline" style={{ color: BLUE }}>
              bed space and room management
            </Link>{" "}
            rather than letting whole rooms — the spreadsheet stops keeping up.
          </p>
          <ul className="list-none p-0 my-6">
            {[
              "Two people edit the same file and one copy quietly goes stale.",
              "Nothing tells you a bill is overdue — you have to remember to look.",
              "A bedspace room is one row, so you cannot see which deck is free.",
              "Splitting one electric bill across four tenants is manual arithmetic every month.",
              "When a tenant disputes a balance, there is no history to point at.",
            ].map((line) => (
              <li key={line} className="text-sm py-2.5 pl-8 relative" style={{ color: MUTED, borderBottom: `1px solid ${LINE}` }}>
                <span className="absolute left-0 top-3 w-4 h-4 rounded-[5px] border-2 grid place-items-center text-[0.6rem] font-extrabold" style={{ background: AMBER, borderColor: INK, color: INK }}>!</span>
                {line}
              </li>
            ))}
          </ul>
          <p className="text-lg leading-relaxed" style={{ color: INK }}>
            None of that is a discipline problem. It is a tool problem — a grid of cells has no
            idea what a bed, a tenant, or a due date is.
          </p>
        </div>
      </section>

      {/* DEFINITION + COMPARISON */}
      <section className="py-20 px-6" style={{ background: CREAM }}>
        <div className="max-w-5xl mx-auto">
          <div className="max-w-3xl mb-12">
            <Eyebrow>What it is</Eyebrow>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4" style={{ color: INK }}>
              What is a boarding house management system?
            </h2>
            <p className="text-lg leading-relaxed mb-3" style={{ color: MUTED }}>
              It is software a landlord or property manager uses to run a rental property at the
              bed and room level instead of on paper. It holds tenant records, assigns each
              boarder to a room and a bed, generates the monthly bill, records payments, splits
              utilities, and keeps a permanent record of who stayed where and what they paid.
            </p>
            <p className="text-lg leading-relaxed" style={{ color: MUTED }}>
              You will also see it called a boarder management system or a boarding house rental
              management system. It is the same job: knowing what is occupied, what is owed, and
              what has been paid, without holding any of it in your head.
            </p>
          </div>

          <div className="rounded-[14px] border-2 overflow-hidden bg-white" style={{ borderColor: INK, boxShadow: `4px 4px 0 ${INK}` }}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse" style={{ minWidth: 520 }}>
                <thead>
                  <tr style={{ background: INK }}>
                    {["What you need", "Spreadsheet", "Boarding house management system"].map((h) => (
                      <th key={h} className="text-left px-4 py-3 text-xs uppercase tracking-wide font-semibold text-white">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.map(([need, sheet, system]) => (
                    <tr key={need} style={{ borderBottom: `1px solid ${LINE}` }}>
                      <td className="px-4 py-3 font-bold" style={{ color: INK }}>{need}</td>
                      <td className="px-4 py-3" style={{ color: MUTED }}>{sheet}</td>
                      <td className="px-4 py-3" style={{ color: INK }}>{system}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Eyebrow>Features</Eyebrow>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight" style={{ color: INK }}>
              Everything a Philippine boarding house needs
            </h2>
            <p className="mt-4 max-w-2xl mx-auto leading-relaxed" style={{ color: MUTED }}>
              Deliberately simple software for owner-operators. Switch on what you need and
              ignore the rest.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f) => (
              <Card key={f.title}>
                <div className="w-9 h-9 rounded-[9px] border-2 grid place-items-center text-base mb-3" style={{ borderColor: INK, background: f.bg, color: f.fg }}>
                  {f.icon}
                </div>
                <h3 className="font-bold text-base" style={{ color: INK }}>{f.title}</h3>
                <p className="text-sm mt-2 leading-relaxed" style={{ color: MUTED }}>{f.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="py-20 px-6" style={{ background: CREAM }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <Eyebrow>How it works</Eyebrow>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight" style={{ color: INK }}>
              Up and running in minutes
            </h2>
            <p className="mt-4" style={{ color: MUTED }}>No demo calls, manuals, rollouts, or IT setup required.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {STEPS.map((s) => (
              <Card key={s.n}>
                <span className="inline-block border-2 rounded-lg px-2.5 py-0.5 text-xs font-medium mb-3" style={{ ...mono, borderColor: INK, background: AMBER, color: INK }}>
                  {s.n}
                </span>
                <h3 className="font-bold text-base" style={{ color: INK }}>{s.title}</h3>
                <p className="text-sm mt-2 leading-relaxed" style={{ color: MUTED }}>{s.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* BUILT FOR THE PHILIPPINES */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <Eyebrow>Built for the Philippines</Eyebrow>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight" style={{ color: INK }}>
              Not a foreign rental app with a peso sign
            </h2>
            <p className="mt-4 max-w-2xl mx-auto leading-relaxed" style={{ color: MUTED }}>
              International property software assumes one tenant, one unit, one bank transfer.
              Philippine boarding houses do not work that way.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {PH_POINTS.map((p) => (
              <Card key={p.title} accent={p.bg === AMBER ? AMBER : BLUE} pad="p-6">
                <div className="w-10 h-10 rounded-xl border-2 grid place-items-center text-base mb-3" style={{ borderColor: INK, background: p.bg, color: p.fg }}>
                  {p.icon}
                </div>
                <h3 className="font-bold text-base" style={{ color: INK }}>{p.title}</h3>
                <p className="text-sm mt-2 leading-relaxed" style={{ color: MUTED }}>{p.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Pricing />

      {/* FAQ */}
      <section id="faq" className="py-20 px-6" style={{ background: CREAM }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight" style={{ color: INK }}>Common questions</h2>
          </div>
          <div className="flex flex-col gap-2.5">
            {FAQS.map(({ q, a }, i) => (
              <div key={q} className="rounded-[11px] border-2 bg-white overflow-hidden" style={{ borderColor: INK }}>
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                  aria-controls={`bh-faq-${i}`}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left font-bold text-sm"
                  style={{ color: INK }}
                >
                  {q}
                  <span className="text-lg font-bold shrink-0" style={{ color: BLUE }}>{open === i ? "–" : "+"}</span>
                </button>
                {/* Kept in the DOM and collapsed with CSS: the page asserts FAQPage
                    schema for this text, and crawlers cannot click to reveal it. */}
                <div
                  id={`bh-faq-${i}`}
                  role="region"
                  className="px-5 pb-4 text-sm leading-relaxed"
                  style={{ color: MUTED, display: open === i ? "block" : "none" }}
                >
                  {a}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <BookDemoForm product="BOARDING_HOUSE" />

      {/* CTA */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-2xl mx-auto rounded-[20px] border-2 p-10 md:p-12 text-center" style={{ background: AMBER, borderColor: INK, boxShadow: `7px 7px 0 ${INK}` }}>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3" style={{ color: INK }}>
            Ready to modernise your boarding house?
          </h2>
          <p className="mb-6 max-w-md mx-auto text-sm leading-relaxed" style={{ color: "#4a3f22" }}>
            Manage rooms, tenants, rent, and utility bills without the paperwork.
          </p>
          <a href={REGISTER} className="inline-flex items-center gap-2 font-bold px-7 py-3.5 rounded-full border-2 transition-transform hover:-translate-y-0.5" style={{ background: INK, color: "#fff", borderColor: INK }}>
            Get started for free →
          </a>
          <p className="mt-4 text-xs" style={{ color: "#4a3f22" }}>Free to start. No credit card required.</p>
        </div>
      </section>

      {/* GUIDES - the money page's only internal link module. Rule 1 limits it
          to the three hubs; the data-silo-hub attributes keep click tracking
          and the crawl working on the design's own markup. */}
      <section id="guides" className="py-20 px-6" style={{ background: CREAM }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Eyebrow>Go deeper</Eyebrow>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight" style={{ color: INK }}>
              Guides for running a boarding house
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {builtHubs().map((hub) => (
              <Link
                key={hub.path}
                href={hub.path}
                data-silo-hub={hub.branch ?? ""}
                className="group rounded-[14px] border-2 bg-white p-5 flex flex-col transition-transform hover:-translate-y-1"
                style={{ borderColor: INK, boxShadow: `4px 4px 0 ${INK}` }}
              >
                <h3 className="font-bold text-base mb-2" style={{ color: INK }}>
                  {anchorFor(hub.path, APEX)}
                </h3>
                <p className="text-sm leading-relaxed flex-1" style={{ color: MUTED }}>
                  {hub.covers ?? hub.h1}
                </p>
                <span className="text-sm font-bold mt-3 group-hover:translate-x-1 transition-transform" style={{ color: BLUE }}>
                  Read the guide →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-7 px-6" style={{ borderTop: `2px solid ${INK}` }}>
        <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center gap-4 text-sm" style={{ color: MUTED }}>
          <span className="flex items-center gap-2 font-extrabold" style={{ color: INK }}>
            <span className="w-5 h-5 rounded-md border-2 block" style={{ background: BLUE, borderColor: INK }} />
            Boarding House by Smapey
          </span>
          <span className="flex items-center gap-5 text-xs font-semibold">
            <Link href="/privacy-policy" className="hover:underline">Privacy</Link>
            <Link href="/terms-and-conditions" className="hover:underline">Terms</Link>
            <Link href="/invoice/contact" className="hover:underline">Contact</Link>
          </span>
          <span className="text-xs">© {new Date().getFullYear()} Smapey. All rights reserved.</span>
        </div>
      </footer>
    </main>
  )
}
