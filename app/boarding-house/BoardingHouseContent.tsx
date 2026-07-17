"use client"

import { useState, useEffect, useRef } from "react"
import {
  Building2, Users, BedDouble, CheckCircle2, ChevronRight,
  Menu, X, Star, BarChart3, Shield, Clock, Zap,
  Banknote, AlertTriangle, BookOpen, Receipt,
  CalendarCheck, BedSingle, Wrench, QrCode, Mail, Scale,
} from "lucide-react"
import { usePricing, type Plan } from "@/lib/usePricing"
import InternalLinks from "@/components/InternalLinks"
import BookDemoForm from "@/components/BookDemoForm"

const INK = "#161616"
const BLUE = "#2f6bff"
const AMBER = "#ff9e2c"
const CREAM = "#fbf7f0"
const display = { fontFamily: "'Hanken Grotesk', system-ui, sans-serif" }

const FEATURES = [
  { icon: BedDouble, title: "Visual Room Cards", desc: "Every room is a card showing exactly who's inside and which beds or slots are free. Move tenants in, transfer them to another room or bed, swap two tenants, or move them out - all without leaving the page." },
  { icon: BedSingle, title: "Bed-Level Tracking", desc: "For bedspace rooms, add named beds (Lower A, Upper A) each with its own rate. Charge more for lower decks, see which exact bed is vacant, and fill it in one click." },
  { icon: Users, title: "Tenants & Ledger", desc: "Full tenant profiles plus a one-click Ledger per tenant - original move-in date, deposit status, every stay and transfer, and a month-by-month payment table with running totals. A statement of account, always ready." },
  { icon: Banknote, title: "Rent Billing", desc: "Generate a month's bills in one click - each tenant's due date follows their own move-in day. Record full or partial payments via Cash, GCash, Maya, Card, or Bank Transfer; balances and overdue flags update automatically." },
  { icon: Zap, title: "Utility Billing", desc: "Enter a whole month's water and electric in seconds with Quick Fill - your rooms listed, just type the amounts - or import from an Excel template. Itemized per room, clearly separated from rent." },
  { icon: Wrench, title: "Maintenance Tracking", desc: "Log every repair (leaks, busted outlets, pests) with category, priority, and status. Track jobs from Open to Resolved and record repair costs so you know what maintenance really costs each month." },
  { icon: QrCode, title: "QR Issue Reporting", desc: "Print a QR code poster for each room. Tenants scan it with their phone (no app, no login) and report issues with photos straight to your Maintenance page. They also see what's already been reported and its status, so you don't get the same leak five times." },
  { icon: Mail, title: "Email Billing Statements", desc: "The moment you create bills, every tenant with an email gets a clean statement: rent, their share of utilities, total, and due date. In shared rooms, utilities are split per tenant with the math shown - no more 'magkano ulit ako?'." },
  { icon: BarChart3, title: "Occupancy Dashboard", desc: "See total rooms, active tenants, occupancy rate, overdue count, open maintenance, rent collected, and utility collected - all on one dashboard. Monthly revenue trend chart included." },
  { icon: Clock, title: "Stay History", desc: "Every move-in, transfer, swap, and move-out is a permanent record - who lived in which room and bed, for how long, at what rate, with deposit status. Your paper trail for disputes, always intact." },
  { icon: Scale, title: "Cashflow & Expenses", desc: "Your cashbook, automated: rent, utility payments, and deposits flow in by themselves; log repairs and expenses in seconds. One chronological ledger with a running balance and a monthly Money In / Out / Net summary." },
  { icon: Shield, title: "Secure & Isolated", desc: "Each boarding house gets its own isolated data space. Your tenant records, billing history, and occupancy data are never shared with anyone else." },
]

const FAQS = [
  { q: "What is a boarding house management system?", a: "A boarding house management system is software that helps boarding house owners in the Philippines track rooms and beds, register tenants, record move-ins and move-outs, generate monthly rent and utility bills, accept payments, handle maintenance requests, and monitor occupancy, all in one place instead of spreadsheets and paper records." },
  { q: "Can I charge different rates for upper and lower deck beds?", a: "Yes. In a bedspace room you add each bed by name (Lower A, Upper A) and give it its own monthly rate. Lower decks can cost more than upper decks, and when a tenant moves into a bed, their rent defaults to that bed's rate automatically." },
  { q: "How do tenants report maintenance issues?", a: "Each room gets its own QR code that you can print and post inside the room. Tenants scan it with their phone camera (no app or login needed) and fill in a short form describing the issue, with up to 3 photos of the problem. The report lands on your Maintenance page instantly and you get an in-app notification. The same page shows the room's recent reports with their status (Open, In Progress, or Resolved) so tenants can see a fix is already on the way instead of reporting it again." },
  { q: "How does rent billing work?", a: "You generate a monthly rent bill per tenant with a due date and amount. Tenants pay via Cash, GCash, Maya, Card, or Bank Transfer. The system records full or partial payments and tracks outstanding balances, overdue bills appear on the dashboard automatically." },
  { q: "Can I bill tenants separately for utilities?", a: "Yes. Utility bills (electricity, water, internet) are created separately from rent bills. This keeps rent and utility charges clearly itemized so tenants always know exactly what each bill is for." },
  { q: "Can I see a tenant's complete payment record?", a: "Yes, every tenant has a Ledger: their original move-in date, deposit and whether it's paid, every room and bed they've stayed in, and a month-by-month table of rent bills showing billed, paid, balance, and payment dates, with running totals. It's a statement of account you can pull up in one click." },
  { q: "Can tenants transfer or swap rooms and beds?", a: "Yes. Transfer moves a tenant to any vacant room or bed, the deposit carries over and the rate updates to the new spot. And if two tenants want to trade places (like upper deck for lower deck) even with no vacancy, Swap exchanges them in one step. Every move is recorded in Stay History." },
  { q: "Do tenants receive their bill automatically?", a: "Yes. When you create the month's bills, every tenant with an email address instantly receives a billing statement: rent, their share of the room's utilities, the total, and the due date. In bedspace and shared rooms, utilities are split evenly per tenant with the computation shown right on the statement." },
  { q: "Can it track my expenses and tell me if I made money?", a: "Yes. The Cashflow page is an automatic cashbook: rent payments, utility payments, and deposits appear as money in on their own; you log expenses (repairs, replacements, supplies) in seconds, and resolved maintenance costs flow in automatically. Every month shows Money In, Money Out, and Net with a running balance." },
  { q: "Does it track occupancy automatically?", a: "Yes. When you move a tenant into a room or bed, that slot is marked occupied. When you record a move-out, it's freed instantly. Occupancy rate, active tenants, and total capacity are all calculated and shown on the dashboard in real time." },
  { q: "Is there a free plan?", a: "Yes. The free plan lets you manage a small boarding house with core features, rooms and beds, tenant registration, rent billing, utility billing, maintenance tracking with QR reporting, and the occupancy dashboard, at no cost." },
]

function useInView(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect() } }, { threshold: 0.15, ...options })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return { ref, inView }
}

function Animate({ children, className = "", delay = 0, style }: { children: React.ReactNode; className?: string; delay?: number; style?: React.CSSProperties }) {
  const { ref, inView } = useInView()
  return (
    <div ref={ref} className={className} style={{ ...style, transitionProperty: "opacity, transform", transitionDuration: "600ms", transitionTimingFunction: "cubic-bezier(0.4,0,0.2,1)", transitionDelay: `${delay}ms`, opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(28px)" }}>
      {children}
    </div>
  )
}

function Navbar() {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const id = "smapey-pop-fonts"
    if (!document.getElementById(id)) {
      const l = document.createElement("link"); l.id = id; l.rel = "stylesheet"
      l.href = "https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600;700;800&display=swap"
      document.head.appendChild(l)
    }
  }, [])
  return (
    <nav className="fixed top-0 inset-x-0 z-50" style={{ background: CREAM, borderBottom: `2px solid ${INK}`, fontFamily: display.fontFamily }}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/boarding-house" className="flex items-center gap-2.5">
          <img src="/logo.png" alt="Smapey" className="w-8 h-8 rounded-lg object-cover" />
          <span className="font-extrabold tracking-tight" style={{ color: INK }}>Smapey Boarding House</span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          <a href="/boarding-house" className="text-sm font-semibold hover:opacity-60 transition-opacity" style={{ color: INK }}>Home</a>
          <a href="#features" className="text-sm font-semibold hover:opacity-60 transition-opacity" style={{ color: INK }}>Features</a>
          <a href="#how-it-works" className="text-sm font-semibold hover:opacity-60 transition-opacity" style={{ color: INK }}>How it Works</a>
          <a href="#pricing" className="text-sm font-semibold hover:opacity-60 transition-opacity" style={{ color: INK }}>Pricing</a>
          <a href="#faq" className="text-sm font-semibold hover:opacity-60 transition-opacity" style={{ color: INK }}>FAQ</a>
          <a href="/boarding-house/guide" className="text-sm font-semibold hover:opacity-60 transition-opacity" style={{ color: INK }}>Guide</a>
        </div>
        <div className="hidden md:flex items-center gap-3">
          <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/login`} className="text-sm font-semibold hover:opacity-60 transition-opacity px-2 py-2" style={{ color: INK }}>Sign in</a>
          <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=BOARDING_HOUSE&plan=FREE`} className="text-sm font-bold px-5 py-2.5 rounded-full border-2 transition-transform hover:-translate-y-0.5" style={{ ...display, background: AMBER, color: INK, borderColor: INK, boxShadow: `3px 3px 0 ${INK}` }}>Get started free</a>
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden" style={{ color: INK }}>{open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}</button>
      </div>
      {open && (
        <div className="md:hidden px-6 py-4 flex flex-col gap-4" style={{ background: CREAM, borderTop: `2px solid ${INK}` }}>
          <a href="/boarding-house" className="text-sm font-semibold" style={{ color: INK }}>Home</a>
          <a href="#features" className="text-sm font-semibold" style={{ color: INK }}>Features</a>
          <a href="#how-it-works" className="text-sm font-semibold" style={{ color: INK }}>How it Works</a>
          <a href="#pricing" className="text-sm font-semibold" style={{ color: INK }}>Pricing</a>
          <a href="#faq" className="text-sm font-semibold" style={{ color: INK }}>FAQ</a>
          <a href="/boarding-house/guide" className="text-sm font-semibold" style={{ color: INK }}>Guide</a>
          <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=BOARDING_HOUSE&plan=FREE`} className="text-sm font-bold px-4 py-2.5 rounded-full border-2 text-center" style={{ ...display, background: AMBER, color: INK, borderColor: INK }}>Get started free</a>
        </div>
      )}
    </nav>
  )
}

function Hero() {
  // room board, occupancy tiles
  const rooms = [
    { no: "101", state: "occupied" }, { no: "102", state: "occupied" },
    { no: "103", state: "due" },      { no: "104", state: "occupied" },
    { no: "105", state: "vacant" },   { no: "106", state: "occupied" },
    { no: "201", state: "occupied" }, { no: "202", state: "due" },
    { no: "203", state: "occupied" }, { no: "204", state: "occupied" },
    { no: "205", state: "occupied" }, { no: "206", state: "vacant" },
  ]
  const tile = {
    occupied: { bg: BLUE, fg: "#fff", label: "In" },
    due:      { bg: AMBER, fg: INK, label: "Due" },
    vacant:   { bg: "#fff", fg: "#9a948b", label: "—" },
  }

  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden" style={{ background: CREAM, fontFamily: display.fontFamily }}>
      <div className="absolute inset-0 pointer-events-none hidden lg:block" aria-hidden>
        <div className="absolute rounded-full border-2" style={{ top: "-130px", left: "-90px", width: 360, height: 360, borderColor: INK, opacity: 0.06 }} />
        <div className="absolute rounded-full border-2" style={{ bottom: "-150px", right: "-70px", width: 300, height: 300, borderColor: INK, opacity: 0.05 }} />
      </div>

      <div className="relative w-full max-w-6xl mx-auto px-6 py-24 grid lg:grid-cols-[1fr_1fr] gap-12 lg:gap-16 items-center">
        {/* LEFT, copy */}
        <div className="min-w-0 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border-2 text-xs font-bold mb-7" style={{ color: INK, borderColor: INK, boxShadow: `3px 3px 0 ${BLUE}` }}>
            <Zap className="w-3 h-3" />
            Built for boarding house &amp; dorm owners
          </div>

          <h1 className="font-extrabold tracking-tight mb-6" style={{ color: INK, fontSize: "clamp(44px,6vw,78px)", lineHeight: 0.97, letterSpacing: "-0.03em" }}>
            Every room,{" "}
            <span className="relative inline-block" style={{ color: BLUE }}>
              every rent
              <span className="absolute left-0 right-0" style={{ bottom: 6, height: 14, background: AMBER, zIndex: -1, transform: "rotate(-1.2deg)" }} />
            </span>
            , tracked
          </h1>

          <p className="text-lg max-w-md mx-auto lg:mx-0 mb-9 leading-relaxed" style={{ color: "#54514c" }}>
            See who's in, who's due, and which beds are open at a glance. Smapey logs tenants, tracks rent per bed, flags overdue payments, and lets tenants report issues by scanning a QR code, so collection day runs itself.
          </p>

          <div className="flex flex-col sm:flex-row items-center lg:justify-start justify-center gap-3 mb-9">
            <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=BOARDING_HOUSE&plan=FREE`} className="flex items-center gap-2 px-7 py-4 rounded-full font-bold text-sm border-2 transition-transform hover:-translate-y-0.5" style={{ ...display, background: AMBER, color: INK, borderColor: INK, boxShadow: `4px 4px 0 ${INK}` }}>
              Start for free <ChevronRight className="w-4 h-4" />
            </a>
            <a href="#book-demo" onClick={(e) => { e.preventDefault(); document.getElementById("book-demo")?.scrollIntoView({ behavior: "smooth" }) }} className="flex items-center gap-2 px-7 py-4 rounded-full font-bold text-sm border-2 bg-white transition-transform hover:-translate-y-0.5" style={{ ...display, color: INK, borderColor: INK }}>
              <CalendarCheck className="w-4 h-4" /> Book a Demo
            </a>
          </div>

          <div className="flex flex-wrap items-center lg:justify-start justify-center gap-x-6 gap-y-2 text-xs font-semibold" style={{ color: "#54514c" }}>
            {["No credit card required", "Free plan forever", "Setup in minutes"].map((t) => (
              <span key={t} className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />{t}</span>
            ))}
          </div>
        </div>

        {/* RIGHT, room board card */}
        <div className="relative min-w-0 w-full max-w-md mx-auto">
          {/* floating overdue chip */}
          <div className="absolute z-10 flex items-center gap-2 bg-white border-2 rounded-full px-3.5 py-2" style={{ top: -20, left: -16, borderColor: INK, boxShadow: `4px 4px 0 ${AMBER}`, transform: "rotate(-5deg)" }}>
            <span className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: AMBER, border: `2px solid ${INK}` }}><AlertTriangle className="w-3 h-3" style={{ color: INK }} /></span>
            <span className="text-[11px] font-extrabold" style={{ color: INK }}>2 rooms due today</span>
          </div>

          <div className="relative bg-white border-2 rounded-[24px] p-6" style={{ borderColor: INK, boxShadow: `9px 9px 0 ${INK}` }}>
            {/* header */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2.5">
                <span className="w-9 h-9 rounded-xl border-2 flex items-center justify-center" style={{ background: BLUE, borderColor: INK }}><Building2 className="w-4 h-4 text-white" /></span>
                <div className="leading-tight">
                  <div className="text-[13px] font-extrabold" style={{ color: INK }}>Sunrise Boarding House</div>
                  <div className="text-[11px] font-semibold" style={{ color: "#9a948b" }}>12 rooms · 2 floors</div>
                </div>
              </div>
              <span className="text-[10px] font-extrabold tracking-widest rounded-full px-2.5 py-1 border" style={{ color: BLUE, borderColor: BLUE }}>OCT</span>
            </div>

            {/* room grid */}
            <div className="grid grid-cols-6 gap-2 mb-5">
              {rooms.map((r) => {
                const t = tile[r.state as keyof typeof tile]
                return (
                  <div key={r.no} className="aspect-square rounded-[10px] border-2 flex flex-col items-center justify-center" style={{ background: t.bg, borderColor: INK }}>
                    <span className="text-[11px] font-extrabold leading-none" style={{ color: t.fg }}>{r.no}</span>
                    <span className="text-[8px] font-bold mt-0.5" style={{ color: t.fg, opacity: 0.85 }}>{t.label}</span>
                  </div>
                )
              })}
            </div>

            {/* legend */}
            <div className="flex items-center gap-4 mb-5 text-[10px] font-bold" style={{ color: "#54514c" }}>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm border" style={{ background: BLUE, borderColor: INK }} />Occupied</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm border" style={{ background: AMBER, borderColor: INK }} />Rent due</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm border" style={{ background: "#fff", borderColor: INK }} />Vacant</span>
            </div>

            {/* rent collection meter */}
            <div className="rounded-[14px] border-2 px-4 py-3.5" style={{ background: CREAM, borderColor: INK }}>
              <div className="flex items-center justify-between mb-2">
                <span className="flex items-center gap-1.5 text-[12px] font-bold" style={{ color: INK }}><Banknote className="w-3.5 h-3.5" style={{ color: "#059669" }} />Rent collected</span>
                <span className="text-[12px] font-extrabold" style={{ color: INK }}>₱42,000 <span style={{ color: "#9a948b", fontWeight: 600 }}>/ ₱50,000</span></span>
              </div>
              <span className="block h-2.5 rounded-full overflow-hidden border" style={{ background: "#efe9de", borderColor: INK }}>
                <span className="block h-full" style={{ width: "84%", background: "#10b981" }} />
              </span>
            </div>
          </div>

          {/* floating occupancy chip */}
          <div className="absolute z-10 flex items-center gap-2 bg-white border-2 rounded-2xl px-3.5 py-2.5" style={{ bottom: -22, right: -16, borderColor: INK, boxShadow: `4px 4px 0 ${INK}`, transform: "rotate(4deg)" }}>
            <span className="w-7 h-7 rounded-lg border-2 flex items-center justify-center" style={{ background: BLUE, borderColor: INK }}><BedDouble className="w-3.5 h-3.5 text-white" /></span>
            <div className="leading-tight">
              <div className="text-[10px] font-bold" style={{ color: "#9a948b" }}>Occupancy</div>
              <div className="text-[12px] font-extrabold" style={{ color: INK }}>10 / 12</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Features() {
  return (
    <section id="features" className="py-24" style={{ background: "#fff", fontFamily: display.fontFamily }}>
      <div className="max-w-6xl mx-auto px-6">
        <Animate className="text-center mb-16">
          <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: BLUE }}>Features</p>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight" style={{ color: INK }}>Everything a Philippine boarding house needs</h2>
          <p className="mt-4 max-w-xl mx-auto" style={{ color: "#54514c" }}>From room setup to monthly billing, Smapey Boarding House Manager keeps your property running without paper records or scattered spreadsheets.</p>
        </Animate>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map(({ icon: Icon, title, desc }, i) => {
            const c = i % 2 === 0 ? BLUE : AMBER
            return (
              <Animate key={title} delay={i * 80}>
                <div className="rounded-[22px] p-6 border-2 h-full transition-transform hover:-translate-y-1" style={{ background: CREAM, borderColor: INK, boxShadow: `6px 6px 0 ${c}` }}>
                  <div className="w-12 h-12 rounded-[14px] border-2 flex items-center justify-center mb-4" style={{ background: c, borderColor: INK }}>
                    <Icon className="w-5 h-5" style={{ color: c === AMBER ? INK : "#fff" }} />
                  </div>
                  <h3 className="font-extrabold mb-2" style={{ color: INK }}>{title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#54514c" }}>{desc}</p>
                </div>
              </Animate>
            )
          })}
        </div>
      </div>
    </section>
  )
}

const STEPS = [
  { step: "01", title: "Set up rooms & beds", desc: "Add each room with a name, floor, and monthly rate. For bedspace rooms, add named beds with their own rates - lower deck, upper deck, whatever your setup is. Takes about 5 minutes." },
  { step: "02", title: "Move tenants in from the room card", desc: "Create tenant profiles once, then click any vacant bed or slot to move someone in. Occupancy, rates, and deposits are tracked automatically - and each room's QR poster lets tenants report issues." },
  { step: "03", title: "Generate bills & collect payments", desc: "Enter utilities with Quick Fill, hit Generate, and every tenant gets an emailed statement automatically. Record payments (full or partial) and the Cashflow page shows exactly what came in, what went out, and your net for the month." },
]

function HowItWorks() {
  const acc = [BLUE, AMBER, BLUE, AMBER]
  return (
    <section id="how-it-works" className="py-24" style={{ background: CREAM, fontFamily: display.fontFamily }}>
      <div className="max-w-6xl mx-auto px-6">
        <Animate className="text-center mb-16">
          <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: BLUE }}>How it Works</p>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight" style={{ color: INK }}>Up and running in minutes</h2>
        </Animate>
        <div className="grid md:grid-cols-3 gap-6">
          {STEPS.map(({ step, title, desc }, i) => (
            <Animate key={step} delay={i * 120}>
              <div className="rounded-[22px] border-2 p-8 h-full transition-transform hover:-translate-y-1" style={{ background: "#fff", borderColor: INK, boxShadow: `6px 6px 0 ${acc[i % acc.length]}` }}>
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-[16px] border-2 font-extrabold text-lg mb-5" style={{ background: acc[i % acc.length], color: acc[i % acc.length] === AMBER ? INK : "#fff", borderColor: INK }}>{step}</div>
                <h3 className="font-extrabold mb-2" style={{ color: INK }}>{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#54514c" }}>{desc}</p>
              </div>
            </Animate>
          ))}
        </div>
      </div>
    </section>
  )
}

function Pricing() {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null)
  const { plans, isPhilippines } = usePricing("BOARDING_HOUSE")
  const handleSelect = (p: Plan) => { if (p.planKey === "FREE") { window.location.href = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=${p.product}&plan=FREE`; return } setSelectedPlan(p) }
  return (
    <section id="pricing" className="py-24" style={{ background: CREAM, fontFamily: display.fontFamily }}>
      <div className="max-w-6xl mx-auto px-6">
        <Animate className="text-center mb-16">
          <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: BLUE }}>Pricing</p>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight" style={{ color: INK }}>Start free. Upgrade when ready.</h2>
          <p className="mt-4" style={{ color: "#54514c" }}>The free plan stays free forever.</p>
          {isPhilippines !== null && (
            <div className="inline-flex items-center gap-1.5 mt-4 px-3 py-1 rounded-full bg-white border-2 text-xs font-semibold" style={{ borderColor: INK, color: INK }}>
              <span>{isPhilippines ? "🇵🇭" : "🌍"}</span>
              <span>Prices in <span className="font-extrabold">{isPhilippines ? "Philippine Peso (₱)" : "US Dollar ($)"}</span></span>
            </div>
          )}
        </Animate>
        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {plans.map((p, i) => {
            const displayPrice = isPhilippines === null ? "..." : isPhilippines ? p.phpPrice : p.usdPrice
            return (
              <Animate key={p.name} delay={i * 100}>
                <div className="rounded-[24px] p-8 border-2 h-full transition-transform hover:-translate-y-1" style={p.highlight ? { background: BLUE, borderColor: INK, boxShadow: `8px 8px 0 ${INK}`, color: "#fff" } : { background: "#fff", borderColor: INK, boxShadow: `8px 8px 0 ${AMBER}` }}>
                  {p.highlight && <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border-2 text-xs font-bold mb-4" style={{ background: AMBER, color: INK, borderColor: INK }}><Zap className="w-3 h-3" /> Most popular</span>}
                  <p className="font-extrabold text-lg mb-1" style={{ color: p.highlight ? "#fff" : INK }}>{p.name}</p>
                  <p className="text-sm mb-4" style={{ color: p.highlight ? "rgba(255,255,255,.7)" : "#9a948b" }}>{p.desc}</p>
                  <div className="flex items-end gap-1 mb-6">
                    <span className="text-4xl font-extrabold tracking-tight" style={{ color: p.highlight ? "#fff" : INK }}>{displayPrice}</span>
                    <span className="text-sm mb-1" style={{ color: p.highlight ? "rgba(255,255,255,.6)" : "#9a948b" }}>{p.period}</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {p.features.map((f) => (<li key={f} className="flex items-center gap-2.5 text-sm"><CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: p.highlight ? AMBER : BLUE }} /><span style={{ color: p.highlight ? "rgba(255,255,255,.85)" : "#3f3b36" }}>{f}</span></li>))}
                  </ul>
                  <button onClick={() => handleSelect(p)} className="w-full text-center py-3 rounded-full text-sm font-bold border-2 transition-transform hover:-translate-y-0.5" style={p.highlight ? { ...display, background: AMBER, color: INK, borderColor: INK } : { ...display, background: INK, color: "#fff", borderColor: INK }}>{p.cta}</button>
                </div>
              </Animate>
            )
          })}
        </div>
      </div>
      {selectedPlan && <PaymentModal plan={selectedPlan} isPhilippines={isPhilippines ?? false} onClose={() => setSelectedPlan(null)} />}
    </section>
  )
}

function FAQ() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <section id="faq" className="py-24" style={{ background: "#fff", fontFamily: display.fontFamily }}>
      <div className="max-w-2xl mx-auto px-6">
        <Animate className="text-center mb-16">
          <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: BLUE }}>FAQ</p>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight" style={{ color: INK }}>Common questions</h2>
        </Animate>
        <div className="flex flex-col gap-3">
          {FAQS.map(({ q, a }, i) => (
            <Animate key={i} delay={i * 60}>
              <div className="rounded-[18px] overflow-hidden border-2 bg-white" style={{ borderColor: INK }}>
                <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between px-5 py-4 text-left font-bold text-sm" style={{ color: INK }}>{q}<ChevronRight className="w-4 h-4 transition-transform duration-200 shrink-0" style={{ color: BLUE, transform: open === i ? "rotate(90deg)" : "rotate(0deg)" }} /></button>
                {open === i && <div className="px-5 pb-4 text-sm leading-relaxed pt-3" style={{ color: "#54514c", borderTop: "1px solid rgba(22,22,22,.1)" }}>{a}</div>}
              </div>
            </Animate>
          ))}
        </div>
      </div>
    </section>
  )
}

function CTA() {
  return (
    <section className="py-24 px-6" style={{ background: "#fff", fontFamily: display.fontFamily }}>
      <Animate className="relative max-w-3xl mx-auto rounded-[30px] border-2 p-12 md:p-16 text-center" style={{ background: AMBER, borderColor: INK, boxShadow: `10px 10px 0 ${INK}` }}>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4" style={{ color: INK }}>Ready to modernize your boarding house?</h2>
        <p className="mb-8 font-medium" style={{ color: "#5c4a28" }}>Join boarding house owners across the Philippines using Smapey to manage rooms, tenants, rent, and utility bills without the chaos.</p>
        <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=BOARDING_HOUSE&plan=FREE`} className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold border-2 transition-transform hover:-translate-y-0.5" style={{ ...display, background: INK, color: "#fff", borderColor: INK }}>Get started for free <ChevronRight className="w-4 h-4" /></a>
      </Animate>
    </section>
  )
}

function Footer() {
  return (
    <footer className="px-6 py-8" style={{ background: CREAM, borderTop: `2px solid ${INK}`, fontFamily: display.fontFamily }}>
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2"><img src="/logo.png" alt="Smapey" className="w-6 h-6 rounded-md object-cover" /><span className="text-sm font-extrabold" style={{ color: INK }}>Boarding House by Smapey</span></div>
        <p className="text-xs" style={{ color: "#9a948b" }}>© {new Date().getFullYear()} Smapey. All rights reserved.</p>
      </div>
    </footer>
  )
}

type CheckoutMethod = "paypal" | "paymongo"
const Spinner = () => (<svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>)

function PaymentModal({ plan, isPhilippines, onClose }: { plan: { name: string; phpPrice: string; usdPrice: string; period: string; planKey: string; product: string } | null; isPhilippines: boolean; onClose: () => void }) {
  const [step, setStep] = useState<"details" | "payment">("details")
  const [name, setName] = useState(""); const [email, setEmail] = useState("")
  const [loading, setLoading] = useState<CheckoutMethod | null>(null)
  const [token, setToken] = useState<string | null>(null)
  useEffect(() => { const t = localStorage.getItem("accessToken"); setToken(t); if (t) setStep("payment") }, [])
  if (!plan) return null
  const displayPrice = isPhilippines ? plan.phpPrice : plan.usdPrice
  const inputStyle = { borderColor: INK, color: INK } as React.CSSProperties
  const checkout = async (method: CheckoutMethod) => {
    try {
      setLoading(method)
      const endpoint = token ? (method === "paypal" ? "/api/billing/subscribe/paypal" : "/api/billing/subscribe/paymongo") : (method === "paypal" ? "/api/billing/newaccount/paypal" : "/api/billing/newaccount/paymongo")
      const payload = token ? { product: plan.product, plan: plan.planKey } : { name, email, product: plan.product, plan: plan.planKey }
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, { method: "POST", headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) }, body: JSON.stringify(payload) })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || JSON.stringify(data))
      const redirectUrl = data.approveUrl || data.checkoutUrl
      if (!redirectUrl) throw new Error("No redirect URL returned")
      window.location.href = redirectUrl
    } catch (err: any) { alert(err?.message || "Checkout failed. Please try again.") } finally { setLoading(null) }
  }
  const handleContinue = () => { if (!name.trim() || !email.trim()) { alert("Name and email are required"); return } if (!isPhilippines) { checkout("paypal") } else { setStep("payment") } }
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" style={{ fontFamily: display.fontFamily }}>
      <div className="bg-white rounded-[22px] w-full max-w-md overflow-hidden border-2" style={{ borderColor: INK, boxShadow: `10px 10px 0 ${AMBER}` }}>
        <div className="px-6 py-5 flex items-center justify-between" style={{ background: INK }}>
          <div className="flex items-center gap-3">
            {step === "payment" && !token && <button onClick={() => setStep("details")} className="text-white/70 hover:text-white transition"><svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 5l-7 7 7 7"/></svg></button>}
            <div><h2 className="text-white font-extrabold text-lg">{step === "details" ? "Create your account" : "Choose payment method"}</h2><p className="text-sm mt-0.5" style={{ color: "rgba(255,255,255,.7)" }}>{plan.name} plan, <span className="font-bold" style={{ color: AMBER }}>{displayPrice}</span>{plan.period}</p></div>
          </div>
          <button onClick={onClose} className="text-white/70 hover:text-white transition-colors"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-6 flex flex-col gap-4">
          {step === "details" && (<>
            <input placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} className="w-full border-2 rounded-xl px-4 py-2.5 text-sm focus:outline-none" style={inputStyle} />
            <input type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border-2 rounded-xl px-4 py-2.5 text-sm focus:outline-none" style={inputStyle} />
            <button onClick={handleContinue} disabled={loading !== null} className="w-full py-3 rounded-full border-2 font-bold text-sm flex items-center justify-center gap-2 transition-transform hover:-translate-y-0.5 disabled:opacity-60" style={{ ...display, background: AMBER, color: INK, borderColor: INK }}>{loading ? <><Spinner /> Redirecting…</> : <>Continue <ChevronRight className="w-4 h-4" /></>}</button>
          </>)}
          {step === "payment" && (<>
            {isPhilippines && (<button onClick={() => checkout("paymongo")} disabled={loading !== null} className="w-full flex items-center gap-4 px-5 py-4 border-2 rounded-2xl transition-all group" style={{ borderColor: INK }}><div className="w-10 h-10 rounded-xl bg-green-600 flex items-center justify-center shrink-0"><svg viewBox="0 0 24 24" className="w-5 h-5 fill-white"><path d="M3 3h7v7H3zm0 11h7v7H3zm11-11h7v7h-7zm0 11h7v7h-7z"/></svg></div><div className="flex-1 text-left"><p className="text-sm font-bold" style={{ color: INK }}>QR Ph / GCash / Card</p><p className="text-xs" style={{ color: "#9a948b" }}>Philippine payment methods</p></div>{loading === "paymongo" ? <Spinner /> : <ChevronRight className="w-4 h-4" style={{ color: INK }} />}</button>)}
            <button onClick={() => checkout("paypal")} disabled={loading !== null} className="w-full flex items-center gap-4 px-5 py-4 border-2 rounded-2xl transition-all group" style={{ borderColor: INK }}><div className="w-10 h-10 rounded-xl bg-[#003087] flex items-center justify-center shrink-0"><svg viewBox="0 0 24 24" className="w-5 h-5 fill-white"><path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c1.379 8.883-5.43 11.61-10.377 11.61H8.23l-1.133 7.184h3.78c.458 0 .848-.332.92-.783l.038-.196.728-4.617.047-.252a.93.93 0 0 1 .919-.784h.578c3.746 0 6.678-1.522 7.534-5.927.358-1.833.173-3.363-.42-4.494z"/></svg></div><div className="flex-1 text-left"><p className="text-sm font-bold" style={{ color: INK }}>PayPal</p><p className="text-xs" style={{ color: "#9a948b" }}>Pay with your PayPal account</p></div>{loading === "paypal" ? <Spinner /> : <ChevronRight className="w-4 h-4" style={{ color: INK }} />}</button>
          </>)}
          <p className="text-center text-xs flex items-center justify-center gap-1" style={{ color: "#9a948b" }}><svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>Secure checkout · Cancel anytime · No hidden fees</p>
        </div>
      </div>
    </div>
  )
}

export default function BoardingHouseContent() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Pricing />
      <FAQ />
      <BookDemoForm product="BOARDING_HOUSE" />
      <CTA />
      <InternalLinks cluster="boarding-house" currentPath="/boarding-house" />
      <Footer />
    </main>
  )
}
