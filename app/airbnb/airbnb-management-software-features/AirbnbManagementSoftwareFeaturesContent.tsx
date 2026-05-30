"use client"

import { useState, useEffect, useRef } from "react"
import {
  Home, Users, CalendarRange, ShieldCheck, BarChart3, Sparkles, Wallet, BedDouble,
  CheckCircle2, ChevronRight, Menu, X,
} from "lucide-react"
import InternalLinks from "@/components/InternalLinks"

const FEATURES = [
  {
    icon: Home,
    title: "Property Listings",
    must: true,
    desc: "Each property needs its own record with property type, address, bedrooms, bathrooms, max guest count, nightly rate, and cleaning fee. Photo upload is a strong plus — it helps your team identify properties quickly.",
    smapey: "Smapey stores all of the above per property, with photo upload and an active/inactive toggle.",
  },
  {
    icon: ShieldCheck,
    title: "Double-Booking Protection",
    must: true,
    desc: "This is the most critical feature. Software that allows overlapping reservations on the same property is dangerous. The system should validate date ranges on save and reject conflicts before they're created.",
    smapey: "Smapey checks for date overlaps on every new reservation and blocks conflicting bookings at the database level.",
  },
  {
    icon: CalendarRange,
    title: "Reservation Management",
    must: true,
    desc: "Full reservation records including check-in/check-out dates, cost breakdown (nights × rate + cleaning fee + extras), number of guests, notes, and staff-only notes. Status should flow through a lifecycle: Booked → Checked In → Checked Out.",
    smapey: "Smapey reservation records include all of the above plus a booking source field and automatic cost calculation.",
  },
  {
    icon: Wallet,
    title: "Deposit & Payment Tracking",
    must: true,
    desc: "You need to know — per reservation — what deposit was expected, whether it was paid, and the overall payment status. A \"deposit paid\" checkbox on paper is not enough for a multi-property operation.",
    smapey: "Each reservation tracks deposit amount, deposit paid status, payment status (Unpaid / Partial / Paid), and payment method.",
  },
  {
    icon: Users,
    title: "Guest Profiles",
    must: true,
    desc: "A searchable guest database that auto-updates total stays, total spend, and last stay date after each checkout. You should be able to attach any number of reservations to the same guest profile.",
    smapey: "Smapey guest profiles track stays, spend, and last stay date automatically. Profiles are reusable across all properties.",
  },
  {
    icon: Sparkles,
    title: "Booking Source Tracking",
    must: false,
    desc: "Which channel fills your calendar — Airbnb, Booking.com, Direct, or Facebook? Without source tagging, you can't make data-driven decisions about where to list your property.",
    smapey: "Every Smapey reservation has a source field: Airbnb, Booking.com, Agoda, Direct, Facebook, Referral, or Other.",
  },
  {
    icon: BedDouble,
    title: "Check-in / Check-out Actions",
    must: false,
    desc: "Status buttons that move a reservation through its lifecycle give you an audit trail and trigger downstream updates — like incrementing the guest's total stay count.",
    smapey: "Smapey has one-click Check In, Check Out, Cancel, and No Show actions. Each updates the guest profile automatically.",
  },
  {
    icon: BarChart3,
    title: "Revenue & Occupancy Analytics",
    must: false,
    desc: "A live dashboard showing monthly revenue, occupancy rate, total reservations, average nightly rate, and upcoming check-ins. This is the difference between running blind and running a real business.",
    smapey: "Smapey's dashboard shows all of the above metrics, updated in real time on every reservation status change.",
  },
]

function useInView(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect() } },
      { threshold: 0.15, ...options }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return { ref, inView }
}

function Animate({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, inView } = useInView()
  return (
    <div ref={ref} className={className} style={{
      transitionProperty: "opacity, transform", transitionDuration: "600ms",
      transitionTimingFunction: "cubic-bezier(0.4,0,0.2,1)", transitionDelay: `${delay}ms`,
      opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(28px)",
    }}>
      {children}
    </div>
  )
}

function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])
  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#071219]/90 backdrop-blur-md border-b border-white/5 shadow-lg" : "bg-transparent"}`}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/airbnb" className="flex items-center gap-2.5">
          <img src="/logo.png" alt="Airbnb Management" className="w-8 h-8 rounded-lg object-cover" />
          <span className="text-white font-bold tracking-tight">Smapey Airbnb</span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          <a href="/airbnb" className="text-sm text-white/60 hover:text-white transition-colors">Home</a>
          <a href="/airbnb/guide" className="text-sm text-white/60 hover:text-white transition-colors">Guide</a>
        </div>
        <div className="hidden md:flex items-center gap-3">
          <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/login`} className="text-sm text-white/60 hover:text-white transition-colors px-4 py-2">Sign in</a>
          <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=AIRBNB&plan=FREE`}
            className="text-sm font-semibold px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white transition-colors shadow-lg shadow-sky-500/20">
            Get started free
          </a>
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden text-white/60 hover:text-white">
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-[#071219] border-t border-white/5 px-6 py-4 flex flex-col gap-4">
          <a href="/airbnb" className="text-sm text-white/60 hover:text-white transition-colors">Home</a>
          <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=AIRBNB&plan=FREE`}
            className="text-sm font-semibold px-4 py-2 rounded-lg bg-sky-600 text-white text-center">
            Get started free
          </a>
        </div>
      )}
    </nav>
  )
}

function Hero() {
  return (
    <section className="relative min-h-[60vh] flex items-center pt-16 overflow-hidden"
      style={{ background: "#071219", backgroundImage: "repeating-linear-gradient(45deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 28px)", backgroundSize: "28px 28px" }}>
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(14,165,233,0.12) 0%, transparent 70%)" }} />
      <div className="relative max-w-4xl mx-auto px-6 py-20 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-300 text-xs font-semibold mb-6">
          <Home className="w-3 h-3" />
          Airbnb management software features
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight tracking-tight mb-6">
          Airbnb management software features:{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-blue-300 to-cyan-300">
            what you actually need
          </span>
        </h1>
        <p className="text-lg text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed">
          A plain-language breakdown of every feature your rental management software should have — and exactly how Smapey handles each one.
        </p>
        <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=AIRBNB&plan=FREE`}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-sm transition-all shadow-lg shadow-sky-500/20">
          Try Smapey free <ChevronRight className="w-4 h-4" />
        </a>
      </div>
    </section>
  )
}

function FeatureBreakdown() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6 space-y-10">
        <Animate className="text-center mb-12">
          <p className="text-sky-600 text-sm font-semibold uppercase tracking-widest mb-3">Feature checklist</p>
          <h2 className="text-3xl font-extrabold text-slate-800">8 features — 5 must-haves, 3 strong additions</h2>
          <p className="text-slate-500 mt-3 max-w-xl mx-auto">Sorted by importance. The must-haves are non-negotiable for any host managing more than 2 properties.</p>
        </Animate>

        {FEATURES.map(({ icon: Icon, title, must, desc, smapey }, i) => (
          <Animate key={title} delay={i * 50}>
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 hover:shadow-md transition-all">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-sky-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-bold text-slate-800">{title}</h3>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${must ? "bg-sky-100 text-sky-700" : "bg-slate-100 text-slate-500"}`}>
                      {must ? "Must-have" : "Strong addition"}
                    </span>
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed mb-3">{desc}</p>
                  <div className="flex items-start gap-2 bg-sky-50 rounded-xl px-4 py-3">
                    <CheckCircle2 className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                    <p className="text-sky-700 text-sm leading-relaxed"><span className="font-semibold">Smapey:</span> {smapey}</p>
                  </div>
                </div>
              </div>
            </div>
          </Animate>
        ))}
      </div>
    </section>
  )
}

function CTA() {
  return (
    <section className="py-24 relative overflow-hidden"
      style={{ background: "#071219", backgroundImage: "repeating-linear-gradient(45deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 28px)", backgroundSize: "28px 28px" }}>
      <div className="absolute -top-40 -left-40 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(14,165,233,0.08) 0%, transparent 70%)" }} />
      <Animate className="relative max-w-2xl mx-auto px-6 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
          All 8 features. Free to start.
        </h2>
        <p className="text-white/40 mb-8">No credit card. No trial timer. Start with up to 3 properties and unlimited guest profiles.</p>
        <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=AIRBNB&plan=FREE`}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-sky-600 to-blue-500 hover:from-sky-500 hover:to-blue-400 text-white font-semibold transition-all shadow-xl shadow-sky-500/20">
          Get started for free <ChevronRight className="w-4 h-4" />
        </a>
      </Animate>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-[#040b12] border-t border-white/5 px-6 py-8">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Airbnb Management" className="w-6 h-6 rounded-md object-cover" />
          <span className="text-white/60 text-sm font-semibold">Airbnb / Rentals by Smapey</span>
        </div>
        <p className="text-white/20 text-xs">© {new Date().getFullYear()} Smapey. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default function AirbnbManagementSoftwareFeaturesContent() {
  return (
    <main>
      <Navbar />
      <Hero />
      <FeatureBreakdown />
      <CTA />
      <InternalLinks cluster="airbnb" currentPath="/airbnb/airbnb-management-software-features" />
      <Footer />
    </main>
  )
}
