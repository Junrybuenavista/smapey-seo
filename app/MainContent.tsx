"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import {
  FileText, Dumbbell, BookOpen, CalendarDays, Car,
  ArrowRight, CheckCircle2, Zap, Shield, TrendingUp,
  Clock, ChevronDown, Menu, X,
} from "lucide-react"

//////////////////////////////////////////////////////
// DATA
//////////////////////////////////////////////////////

const PRODUCTS = [
  {
    key: "INVOICE",
    name: "Invoice Manager",
    tagline: "Get paid faster.",
    desc: "Create professional invoices, track payments, and send PDF receipts — all in under 2 minutes.",
    href: "/invoice",
    register: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=INVOICE&plan=FREE`,
    accent: "#2563eb",
    accentLight: "#eff6ff",
    Icon: FileText,
    features: ["Professional PDF invoices", "Real-time payment tracking", "Multi-currency support", "Automated reminders"],
    stat: { value: "< 2 min", label: "to create an invoice" },
    col: "md:col-span-1",
  },
  {
    key: "GYM",
    name: "Gym Management",
    tagline: "Run your gym smarter.",
    desc: "Manage members, automate billing, track attendance, and assign trainers — one dashboard, zero chaos.",
    href: "/gym",
    register: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=GYM&plan=FREE`,
    accent: "#059669",
    accentLight: "#ecfdf5",
    Icon: Dumbbell,
    features: ["Member profiles & QR check-in", "Subscription & renewal billing", "Walk-in tracking", "Trainer management"],
    stat: { value: "500+", label: "members per gym" },
    col: "md:col-span-1",
  },
  {
    key: "ESSAY",
    name: "Essay Feedback",
    tagline: "Grade smarter, teach better.",
    desc: "AI-powered essay grading with rubric scores, structured feedback, and handwritten OCR support.",
    href: "/essay",
    register: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=ESSAY&plan=FREE`,
    accent: "#7c3aed",
    accentLight: "#f5f3ff",
    Icon: BookOpen,
    features: ["AI grading in seconds", "Camera OCR support", "Rubric-based scoring", "Student progress tracking"],
    stat: { value: "< 10s", label: "per essay graded" },
    col: "md:col-span-1",
  },
  {
    key: "BOOKING",
    name: "Booking & Appointments",
    tagline: "Zero scheduling stress.",
    desc: "Manage client appointments, staff availability, and deposits — built for clinics, salons & studios.",
    href: "/booking",
    register: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=BOOKING&plan=FREE`,
    accent: "#0d9488",
    accentLight: "#f0fdfa",
    Icon: CalendarDays,
    features: ["Appointment scheduling", "Staff & availability config", "Service catalog", "Deposit tracking"],
    stat: { value: "60%", label: "fewer no-shows" },
    col: "md:col-span-1",
  },
  {
    key: "CAR_RENTAL",
    name: "Car Rental",
    tagline: "Keep your fleet moving.",
    desc: "Manage vehicles, reservations, deposits, and overdue alerts — everything a rental business needs in one dashboard.",
    href: "/car-rental",
    register: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=CAR_RENTAL&plan=FREE`,
    accent: "#ea580c",
    accentLight: "#fff7ed",
    Icon: Car,
    features: ["Fleet status tracking", "Reservation management", "Overdue detection", "Revenue dashboard"],
    stat: { value: "76%", label: "avg fleet utilization" },
    col: "md:col-span-1",
  },
]

const STATS = [
  { value: "2,400+", label: "businesses" },
  { value: "180k+",  label: "invoices sent" },
  { value: "95k+",   label: "members managed" },
  { value: "50k+",   label: "essays graded" },
]

const WHY = [
  { Icon: Zap,        title: "Instant setup",      desc: "Start using any tool in minutes. No training, no complexity." },
  { Icon: Shield,     title: "Secure by default",  desc: "Modern encryption and reliable infrastructure — always on." },
  { Icon: TrendingUp, title: "Built to grow",       desc: "Start free, upgrade when you're ready. Tools that scale with you." },
  { Icon: Clock,      title: "Save hours weekly",   desc: "Automate repetitive tasks and focus on what actually matters." },
]

//////////////////////////////////////////////////////
// ANIMATE ON SCROLL
//////////////////////////////////////////////////////

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } }, { threshold })
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, visible } = useInView()
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

//////////////////////////////////////////////////////
// NAVBAR
//////////////////////////////////////////////////////

function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", fn)
    return () => window.removeEventListener("scroll", fn)
  }, [])

  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">

        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2.5">
          <img src="/logo.png" alt="Smapey" className="h-8 w-8 object-contain" />
          <span className={`text-lg font-bold tracking-tight transition-colors ${scrolled ? "text-gray-900" : "text-white"}`}>Smapey</span>
        </Link>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex items-center gap-8">
          {[["#products", "Products"], ["#why", "Why Smapey"], ["#cta", "Pricing"]].map(([href, label]) => (
            <a key={label} href={href} className={`text-sm font-medium transition-colors ${scrolled ? "text-gray-600 hover:text-gray-900" : "text-white/80 hover:text-white"}`}>
              {label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="https://app.smapey.com/login" className={`text-sm font-medium transition-colors ${scrolled ? "text-gray-600 hover:text-gray-900" : "text-white/80 hover:text-white"}`}>
            Sign in
          </Link>
          <Link href="https://app.smapey.com/register" className="bg-white text-gray-900 text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-gray-100 transition-colors shadow-sm">
            Get started free
          </Link>
        </div>

        {/* MOBILE TOGGLE */}
        <button onClick={() => setOpen(!open)} className={`md:hidden ${scrolled ? "text-gray-700" : "text-white"}`}>
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-5 space-y-4 shadow-lg">
          {PRODUCTS.map(p => (
            <Link key={p.key} href={p.href} onClick={() => setOpen(false)} className="flex items-center gap-3 py-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: p.accentLight }}>
                <p.Icon className="w-4 h-4" style={{ color: p.accent }} />
              </div>
              <span className="text-sm font-medium text-gray-800">{p.name}</span>
            </Link>
          ))}
          <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
            <Link href="https://app.smapey.com/login" className="text-center text-sm font-medium text-gray-600 py-2.5 border border-gray-200 rounded-full">Sign in</Link>
            <Link href="https://app.smapey.com/register" className="text-center text-sm font-semibold text-white py-2.5 bg-gray-900 rounded-full">Get started free</Link>
          </div>
        </div>
      )}
    </nav>
  )
}

//////////////////////////////////////////////////////
// HERO
//////////////////////////////////////////////////////

function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0a0f1e] px-6 pt-16">

      {/* GRID BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />

      {/* GLOW BLOBS */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(37,99,235,0.15) 0%, transparent 70%)" }} />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)" }} />

      <div className="relative z-10 max-w-5xl mx-auto text-center">

        {/* BADGE */}
        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 mb-8">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-medium text-white/70 tracking-wide">4 powerful tools — one platform</span>
        </div>

        {/* HEADLINE */}
        <h1 className="text-5xl md:text-7xl font-bold text-white leading-[1.05] tracking-tight">
          The business platform
          <br />
          <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-teal-400 bg-clip-text text-transparent">
            built to save you time.
          </span>
        </h1>

        <p className="mt-6 text-lg md:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed">
          Invoicing, gym management, essay grading, and appointment scheduling — everything your business needs in one clean, fast platform.
        </p>

        {/* ACTIONS */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link href="https://app.smapey.com/register" className="group flex items-center gap-2 bg-white text-gray-900 font-semibold text-sm px-8 py-3.5 rounded-full hover:bg-gray-100 transition-all shadow-lg hover:-translate-y-0.5">
            Start for free
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <a href="#products" className="flex items-center gap-2 text-white/60 font-medium text-sm px-6 py-3.5 rounded-full border border-white/10 hover:border-white/30 hover:text-white/80 transition-all">
            See all products
            <ChevronDown className="w-4 h-4" />
          </a>
        </div>

        {/* TRUST BADGES */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
          {["No credit card required", "Setup in minutes", "Cancel anytime"].map(t => (
            <span key={t} className="flex items-center gap-2 text-xs text-white/40">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              {t}
            </span>
          ))}
        </div>

        {/* FLOATING PRODUCT PILLS */}
        <div className="mt-16 flex flex-wrap justify-center gap-3">
          {PRODUCTS.map(p => (
            <Link key={p.key} href={p.href} className="flex items-center gap-2.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-2xl px-4 py-3 transition-all group">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: `${p.accent}25` }}>
                <p.Icon className="w-4 h-4" style={{ color: p.accent }} />
              </div>
              <span className="text-sm font-medium text-white/70 group-hover:text-white/90 transition-colors">{p.name}</span>
              <ArrowRight className="w-3.5 h-3.5 text-white/20 group-hover:text-white/50 group-hover:translate-x-0.5 transition-all" />
            </Link>
          ))}
        </div>
      </div>

      {/* SCROLL INDICATOR */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/20 animate-bounce">
        <ChevronDown className="w-5 h-5" />
      </div>
    </section>
  )
}

//////////////////////////////////////////////////////
// STATS BAR
//////////////////////////////////////////////////////

function StatsBar() {
  return (
    <div className="bg-gray-900 border-y border-white/5">
      <div className="max-w-5xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-8">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 80} className="text-center">
            <p className="text-3xl font-bold text-white">{s.value}</p>
            <p className="text-sm text-white/40 mt-1">{s.label}</p>
          </Reveal>
        ))}
      </div>
    </div>
  )
}

//////////////////////////////////////////////////////
// PRODUCTS SECTION
//////////////////////////////////////////////////////

function Products() {
  return (
    <section id="products" className="bg-gray-50 py-28 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">

        <Reveal>
          <p className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-3">Our products</p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight max-w-2xl">
            Four tools. Every workflow covered.
          </h2>
          <p className="mt-4 text-lg text-gray-500 max-w-xl">
            Pick one to start. Add more as you grow. Each product is fully standalone — no bundles, no bloat.
          </p>
        </Reveal>

        <div className="mt-14 grid md:grid-cols-2 gap-6">
          {PRODUCTS.map((p, i) => (
            <Reveal key={p.key} delay={i * 80}>
              <div className="group bg-white rounded-3xl border border-gray-200 overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">

                {/* ACCENT BAR */}
                <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${p.accent}, ${p.accent}88)` }} />

                <div className="p-8 flex flex-col flex-1">

                  {/* HEADER */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: p.accentLight }}>
                        <p.Icon className="w-6 h-6" style={{ color: p.accent }} />
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: p.accent }}>{p.key}</p>
                        <h3 className="text-xl font-bold text-gray-900 leading-tight">{p.name}</h3>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-2xl font-bold text-gray-900">{p.stat.value}</p>
                      <p className="text-xs text-gray-400">{p.stat.label}</p>
                    </div>
                  </div>

                  {/* TAGLINE + DESC */}
                  <p className="text-xl font-semibold text-gray-800 mb-2">{p.tagline}</p>
                  <p className="text-sm text-gray-500 leading-relaxed mb-6">{p.desc}</p>

                  {/* FEATURES */}
                  <ul className="grid grid-cols-2 gap-2.5 mb-8 flex-1">
                    {p.features.map(f => (
                      <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" style={{ color: p.accent }} />
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* ACTIONS */}
                  <div className="flex gap-3 mt-auto">
                    <Link href={p.register} className="flex-1 text-center text-sm font-semibold text-white py-3 rounded-2xl transition-all hover:opacity-90 hover:-translate-y-0.5"
                      style={{ background: p.accent }}>
                      Try free
                    </Link>
                    <Link href={p.href} className="flex items-center gap-1.5 justify-center text-sm font-semibold text-gray-700 px-5 py-3 rounded-2xl border border-gray-200 hover:border-gray-400 transition-colors group-hover:border-gray-300">
                      Learn more <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

//////////////////////////////////////////////////////
// WHY SMAPEY
//////////////////////////////////////////////////////

function Why() {
  return (
    <section id="why" className="bg-[#0a0f1e] py-28 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">

        <Reveal>
          <p className="text-xs font-bold tracking-widest uppercase text-white/30 mb-3">Why Smapey</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight max-w-2xl">
            Everything you need.<br />
            <span className="text-white/40">Nothing you don't.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          {WHY.map((w, i) => (
            <Reveal key={w.title} delay={i * 80}>
              <div className="bg-white/5 hover:bg-white/8 border border-white/8 rounded-3xl p-7 transition-colors h-full">
                <div className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center mb-5">
                  <w.Icon className="w-5 h-5 text-white/60" />
                </div>
                <h3 className="text-base font-semibold text-white mb-2">{w.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{w.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* COMPARISON TABLE */}
        <Reveal delay={200}>
          <div className="mt-10 bg-white/5 border border-white/8 rounded-3xl p-8">
            <p className="text-sm font-semibold text-white/50 mb-6 uppercase tracking-widest">Smapey vs. managing tools separately</p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-xs font-bold text-red-400 uppercase tracking-widest mb-4">Without Smapey</p>
                {["5+ different apps & subscriptions", "Manual data entry across tools", "No unified analytics", "Expensive per-app pricing"].map(t => (
                  <div key={t} className="flex items-center gap-3 py-2.5 border-b border-white/5">
                    <X className="w-4 h-4 text-red-400 shrink-0" />
                    <span className="text-sm text-white/40">{t}</span>
                  </div>
                ))}
              </div>
              <div>
                <p className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-4">With Smapey</p>
                {["One platform for every workflow", "Unified dashboard & analytics", "Use only what you need", "Start free, scale affordably"].map(t => (
                  <div key={t} className="flex items-center gap-3 py-2.5 border-b border-white/5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="text-sm text-white/70">{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

//////////////////////////////////////////////////////
// CTA
//////////////////////////////////////////////////////

function CTA() {
  return (
    <section id="cta" className="bg-white py-28 px-6 text-center">
      <div className="max-w-3xl mx-auto">

        <Reveal>
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 rounded-full px-4 py-2 text-xs font-semibold mb-6">
            <Zap className="w-3.5 h-3.5" /> Free to start — no card required
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
            Ready to run your business<br />without the chaos?
          </h2>
          <p className="mt-5 text-lg text-gray-500 max-w-lg mx-auto">
            Join thousands of businesses using Smapey to save time, stay organised, and grow faster.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-10 flex flex-wrap gap-3 justify-center">
            {PRODUCTS.map(p => (
              <Link key={p.key} href={p.register} className="flex items-center gap-2 text-sm font-semibold px-5 py-3 rounded-2xl border-2 transition-all hover:-translate-y-0.5"
                style={{ borderColor: p.accent, color: p.accent }}>
                <p.Icon className="w-4 h-4" />
                {p.name}
              </Link>
            ))}
          </div>
          <p className="mt-8 text-sm text-gray-400">
            No credit card required · Cancel anytime · Setup in minutes
          </p>
        </Reveal>
      </div>
    </section>
  )
}

//////////////////////////////////////////////////////
// FOOTER
//////////////////////////////////////////////////////

function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 px-6 md:px-12 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">

          {/* BRAND */}
          <div className="flex items-center gap-2.5">
            <img src="/logo.png" alt="Smapey" className="h-7 w-7 object-contain" />
            <span className="text-base font-bold text-gray-900">Smapey</span>
          </div>

          {/* PRODUCT LINKS */}
          <div className="flex flex-wrap gap-x-8 gap-y-2">
            {PRODUCTS.map(p => (
              <Link key={p.key} href={p.href} className="text-sm text-gray-500 hover:text-gray-900 transition-colors">{p.name}</Link>
            ))}
            <Link href="/privacy-policy" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Privacy</Link>
            <Link href="/terms-and-conditions" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Terms</Link>
          </div>

          <span className="text-sm text-gray-300">© {new Date().getFullYear()} Smapey</span>
        </div>
      </div>
    </footer>
  )
}

//////////////////////////////////////////////////////
// PAGE
//////////////////////////////////////////////////////

export default function MainContent() {
  return (
    <>
      <Navbar />
      <Hero />
      <StatsBar />
      <Products />
      <Why />
      <CTA />
      <Footer />
    </>
  )
}
