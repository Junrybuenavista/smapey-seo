"use client"

import { useState, useEffect, useRef } from "react"
import {
  Home, Users, CalendarRange, ShieldCheck, BarChart3, Sparkles, Wallet, BedDouble,
  CheckCircle2, ChevronRight, Menu, X,
} from "lucide-react"
import InternalLinks from "@/components/InternalLinks"

const INK = "#161616"
const BLUE = "#2f6bff"
const AMBER = "#ff9e2c"
const CREAM = "#fbf7f0"
const display = { fontFamily: "'Hanken Grotesk', system-ui, sans-serif" }
const REGISTER_URL = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=AIRBNB&plan=FREE`
const accentFor = (i: number) => (i % 2 === 0 ? BLUE : AMBER)
const onAccent = (c: string) => (c === AMBER ? INK : "#fff")

const FEATURES = [
  { icon: Home, title: "Property Listings", must: true, desc: "Each property needs its own record with property type, address, bedrooms, bathrooms, max guest count, nightly rate, and cleaning fee. Photo upload is a strong plus — it helps your team identify properties quickly.", smapey: "Smapey stores all of the above per property, with photo upload and an active/inactive toggle." },
  { icon: ShieldCheck, title: "Double-Booking Protection", must: true, desc: "This is the most critical feature. Software that allows overlapping reservations on the same property is dangerous. The system should validate date ranges on save and reject conflicts before they're created.", smapey: "Smapey checks for date overlaps on every new reservation and blocks conflicting bookings at the database level." },
  { icon: CalendarRange, title: "Reservation Management", must: true, desc: "Full reservation records including check-in/check-out dates, cost breakdown (nights × rate + cleaning fee + extras), number of guests, notes, and staff-only notes. Status should flow through a lifecycle: Booked → Checked In → Checked Out.", smapey: "Smapey reservation records include all of the above plus a booking source field and automatic cost calculation." },
  { icon: Wallet, title: "Deposit & Payment Tracking", must: true, desc: "You need to know — per reservation — what deposit was expected, whether it was paid, and the overall payment status. A \"deposit paid\" checkbox on paper is not enough for a multi-property operation.", smapey: "Each reservation tracks deposit amount, deposit paid status, payment status (Unpaid / Partial / Paid), and payment method." },
  { icon: Users, title: "Guest Profiles", must: true, desc: "A searchable guest database that auto-updates total stays, total spend, and last stay date after each checkout. You should be able to attach any number of reservations to the same guest profile.", smapey: "Smapey guest profiles track stays, spend, and last stay date automatically. Profiles are reusable across all properties." },
  { icon: Sparkles, title: "Booking Source Tracking", must: false, desc: "Which channel fills your calendar — Airbnb, Booking.com, Direct, or Facebook? Without source tagging, you can't make data-driven decisions about where to list your property.", smapey: "Every Smapey reservation has a source field: Airbnb, Booking.com, Agoda, Direct, Facebook, Referral, or Other." },
  { icon: BedDouble, title: "Check-in / Check-out Actions", must: false, desc: "Status buttons that move a reservation through its lifecycle give you an audit trail and trigger downstream updates — like incrementing the guest's total stay count.", smapey: "Smapey has one-click Check In, Check Out, Cancel, and No Show actions. Each updates the guest profile automatically." },
  { icon: BarChart3, title: "Revenue & Occupancy Analytics", must: false, desc: "A live dashboard showing monthly revenue, occupancy rate, total reservations, average nightly rate, and upcoming check-ins. This is the difference between running blind and running a real business.", smapey: "Smapey's dashboard shows all of the above metrics, updated in real time on every reservation status change." },
]

function useFont() {
  useEffect(() => {
    const id = "smapey-pop-fonts"
    if (!document.getElementById(id)) {
      const l = document.createElement("link"); l.id = id; l.rel = "stylesheet"
      l.href = "https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600;700;800&display=swap"
      document.head.appendChild(l)
    }
  }, [])
}
function useInView(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect() } }, { threshold: 0.15, ...options })
    observer.observe(el); return () => observer.disconnect()
  }, [])
  return { ref, inView }
}
function Animate({ children, className = "", delay = 0, style }: { children: React.ReactNode; className?: string; delay?: number; style?: React.CSSProperties }) {
  const { ref, inView } = useInView()
  return <div ref={ref} className={className} style={{ ...style, transitionProperty: "opacity, transform", transitionDuration: "600ms", transitionTimingFunction: "cubic-bezier(0.4,0,0.2,1)", transitionDelay: `${delay}ms`, opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(28px)" }}>{children}</div>
}

function Navbar() {
  const [open, setOpen] = useState(false)
  const links = [
    { href: "/airbnb", label: "Home" },
    { href: "/airbnb#pricing", label: "Pricing" },
    { href: "/airbnb#faq", label: "FAQ" },
    { href: "/airbnb/guide", label: "Guide" },
  ]
  return (
    <nav className="fixed top-0 inset-x-0 z-50" style={{ background: CREAM, borderBottom: `2px solid ${INK}`, fontFamily: display.fontFamily }}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/airbnb" className="flex items-center gap-2.5">
          <img src="/logo.png" alt="Airbnb Management" className="w-8 h-8 rounded-lg object-cover" />
          <span className="font-extrabold tracking-tight" style={{ color: INK }}>Smapey Airbnb</span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (<a key={l.label} href={l.href} className="text-sm font-semibold hover:opacity-60 transition-opacity" style={{ color: INK }}>{l.label}</a>))}
        </div>
        <div className="hidden md:flex items-center gap-3">
          <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/login`} className="text-sm font-semibold hover:opacity-60 transition-opacity px-2 py-2" style={{ color: INK }}>Sign in</a>
          <a href={REGISTER_URL} className="text-sm font-bold px-5 py-2.5 rounded-full border-2 transition-transform hover:-translate-y-0.5" style={{ ...display, background: AMBER, color: INK, borderColor: INK, boxShadow: `3px 3px 0 ${INK}` }}>Get started free</a>
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden" style={{ color: INK }}>{open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}</button>
      </div>
      {open && (
        <div className="md:hidden px-6 py-4 flex flex-col gap-4" style={{ background: CREAM, borderTop: `2px solid ${INK}` }}>
          {links.map((l) => (<a key={l.label} href={l.href} className="text-sm font-semibold" style={{ color: INK }}>{l.label}</a>))}
          <a href={REGISTER_URL} className="text-sm font-bold px-4 py-2.5 rounded-full border-2 text-center" style={{ ...display, background: AMBER, color: INK, borderColor: INK }}>Get started free</a>
        </div>
      )}
    </nav>
  )
}

function Hero() {
  return (
    <section className="relative min-h-[60vh] flex items-center pt-16 overflow-hidden" style={{ background: CREAM }}>
      <div className="absolute inset-0 pointer-events-none hidden md:block" aria-hidden>
        <div className="absolute rounded-[22px] border-2" style={{ top: "24%", left: "-70px", width: 240, height: 70, background: AMBER, borderColor: INK, transform: "rotate(-9deg)" }} />
        <div className="absolute rounded-[22px] border-2" style={{ bottom: "16%", right: "-70px", width: 260, height: 74, background: BLUE, borderColor: INK, transform: "rotate(8deg)", boxShadow: "5px 5px 0 rgba(22,22,22,.12)" }} />
      </div>
      <div className="relative max-w-4xl mx-auto px-6 py-20 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border-2 text-xs font-bold mb-6" style={{ color: INK, borderColor: INK, boxShadow: `3px 3px 0 ${BLUE}` }}>
          <Home className="w-3 h-3" /> Airbnb management software features
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight mb-6" style={{ color: INK }}>
          Airbnb management software features: <span style={{ color: BLUE }}>what you actually need</span>
        </h1>
        <p className="text-lg max-w-2xl mx-auto mb-10 leading-relaxed" style={{ color: "#54514c" }}>
          A plain-language breakdown of every feature your rental management software should have — and exactly how Smapey handles each one.
        </p>
        <a href={REGISTER_URL} className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm border-2 transition-transform hover:-translate-y-0.5" style={{ ...display, background: AMBER, color: INK, borderColor: INK, boxShadow: `4px 4px 0 ${INK}` }}>
          Try Smapey free <ChevronRight className="w-4 h-4" />
        </a>
      </div>
    </section>
  )
}

function FeatureBreakdown() {
  return (
    <section className="py-20" style={{ background: "#fff", borderTop: `2px solid ${INK}` }}>
      <div className="max-w-4xl mx-auto px-6 space-y-8">
        <Animate className="text-center mb-12">
          <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: BLUE }}>Feature checklist</p>
          <h2 className="text-3xl font-extrabold" style={{ color: INK }}>8 features — 5 must-haves, 3 strong additions</h2>
          <p className="mt-3 max-w-xl mx-auto" style={{ color: "#54514c" }}>Sorted by importance. The must-haves are non-negotiable for any host managing more than 2 properties.</p>
        </Animate>

        {FEATURES.map(({ icon: Icon, title, must, desc, smapey }, i) => {
          const c = accentFor(i)
          return (
            <Animate key={title} delay={i * 50}>
              <div className="rounded-[20px] border-2 p-6 hover:-translate-y-1 transition-transform" style={{ background: "#fff", borderColor: INK, boxShadow: `6px 6px 0 ${c}` }}>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-[12px] border-2 flex items-center justify-center shrink-0" style={{ background: c, borderColor: INK }}>
                    <Icon className="w-5 h-5" style={{ color: onAccent(c) }} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-extrabold" style={{ color: INK }}>{title}</h3>
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full border-2" style={must ? { background: BLUE, color: "#fff", borderColor: INK } : { background: "#fff", color: INK, borderColor: INK }}>
                        {must ? "Must-have" : "Strong addition"}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed mb-3" style={{ color: "#54514c" }}>{desc}</p>
                    <div className="flex items-start gap-2 rounded-[12px] px-4 py-3 border-2" style={{ background: "#eaf1ff", borderColor: INK }}>
                      <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: BLUE }} />
                      <p className="text-sm leading-relaxed" style={{ color: "#21314f" }}><span className="font-bold" style={{ color: INK }}>Smapey:</span> {smapey}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Animate>
          )
        })}
      </div>
    </section>
  )
}

function CTA() {
  return (
    <section className="py-24 px-6" style={{ background: CREAM, borderTop: `2px solid ${INK}` }}>
      <Animate className="relative max-w-3xl mx-auto rounded-[30px] border-2 p-12 md:p-16 text-center" style={{ background: AMBER, borderColor: INK, boxShadow: `10px 10px 0 ${INK}` }}>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4" style={{ color: INK }}>All 8 features. Free to start.</h2>
        <p className="mb-8 font-medium" style={{ color: "#5c4a28" }}>No credit card. No trial timer. Start with up to 3 properties and unlimited guest profiles.</p>
        <a href={REGISTER_URL} className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold border-2 transition-transform hover:-translate-y-0.5" style={{ ...display, background: INK, color: "#fff", borderColor: INK }}>Get started for free <ChevronRight className="w-4 h-4" /></a>
      </Animate>
    </section>
  )
}

function Footer() {
  return (
    <footer className="px-6 py-8" style={{ background: CREAM, borderTop: `2px solid ${INK}`, fontFamily: display.fontFamily }}>
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Airbnb Management" className="w-6 h-6 rounded-md object-cover" />
          <span className="text-sm font-extrabold" style={{ color: INK }}>Airbnb / Rentals by Smapey</span>
        </div>
        <p className="text-xs" style={{ color: "#9a948b" }}>© {new Date().getFullYear()} Smapey. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default function AirbnbManagementSoftwareFeaturesContent() {
  useFont()
  return (
    <main style={{ fontFamily: display.fontFamily }}>
      <Navbar />
      <Hero />
      <FeatureBreakdown />
      <CTA />
      <InternalLinks cluster="airbnb" currentPath="/airbnb/airbnb-management-software-features" />
      <Footer />
    </main>
  )
}
