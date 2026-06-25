"use client"

import { useState, useEffect, useRef } from "react"
import BookDemoForm from "@/components/BookDemoForm"
import GymVideoSection from "./GymVideoSection"
import {
  Dumbbell, QrCode, Users, BarChart3, CreditCard,
  Zap, CheckCircle2, ChevronRight, Menu, X, UserCheck,
  DollarSign, Globe, UserPlus,
  CalendarCheck,
} from "lucide-react"
import { usePricing, type Plan } from "@/lib/usePricing"
import InternalLinks from "@/components/InternalLinks"

// ── Layered Pop design tokens ──
const INK = "#161616"
const BLUE = "#2f6bff"
const AMBER = "#ff9e2c"
const CREAM = "#fbf7f0"
const display = { fontFamily: "'Hanken Grotesk', system-ui, sans-serif" }

const NAV_LINKS = ["Features", "How it Works", "Pricing", "FAQ", "Guide"]

const FEATURES = [
  { icon: Users, title: "Member Management", desc: "Register, track, and manage all your gym members in one place. Full profile, emergency contacts, and subscription history." },
  { icon: QrCode, title: "QR Code Check-in", desc: "Members check in instantly by scanning their personal QR code. No more manual logs or long queues at the front desk." },
  { icon: UserCheck, title: "Walk-in Tracking", desc: "Record one-day visitors in seconds. Track walk-in revenue separately and see today's drop-ins at a glance." },
  { icon: CreditCard, title: "Subscription Plans", desc: "Create flexible plans, set durations and pricing, and handle renewals with automatic expiry tracking." },
  { icon: BarChart3, title: "Gym Analytics", desc: "Track revenue trends, peak hours, attendance patterns, and member growth — all from a single dashboard." },
  { icon: Dumbbell, title: "Trainer Assignment", desc: "Assign certified trainers to members, track their specialties, and manage their active status with ease." },
  { icon: DollarSign, title: "Multi-Currency", desc: "Accept and display payments in your local currency. Full support for PHP, USD, SGD, and more out of the box." },
  { icon: Globe, title: "Multi-Timezone", desc: "Run your gym in any timezone. Check-ins, reports, and dashboards always reflect your local time accurately." },
  { icon: UserPlus, title: "Team Collaboration", desc: "Invite staff to your gym dashboard. Assign Admin or Member-level access so everyone only sees what they need." },
]

const STEPS = [
  { step: "01", title: "Create your gym", desc: "Sign up and set up your gym profile in under 2 minutes." },
  { step: "02", title: "Add members & plans", desc: "Register members and create subscription plans that fit your pricing." },
  { step: "03", title: "Start checking in", desc: "Members scan their QR code and you track everything automatically." },
]

const FAQS = [
  { q: "Do members need to install an app?", a: "No. Members receive a QR code they can save to their phone or print. No app needed." },
  { q: "Can I track walk-in revenue separately?", a: "Yes. Walk-in revenue is tracked separately from subscription revenue in your dashboard." },
  { q: "What happens when a subscription expires?", a: "Expired members are flagged on your dashboard. You can renew them with one click." },
  { q: "Can I assign different trainers to different members?", a: "Yes. You can assign any active trainer to any member and change assignments anytime." },
]

//////////////////////////////////////////////////////
// ANIMATION HOOK
//////////////////////////////////////////////////////
function useInView(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15, ...options }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return { ref, inView }
}

function Animate({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const { ref, inView } = useInView()
  return (
    <div
      ref={ref}
      className={className}
      style={{
        transitionProperty: "opacity, transform",
        transitionDuration: "600ms",
        transitionTimingFunction: "cubic-bezier(0.4,0,0.2,1)",
        transitionDelay: `${delay}ms`,
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
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

  useEffect(() => {
    const id = "smapey-pop-fonts"
    if (!document.getElementById(id)) {
      const l = document.createElement("link")
      l.id = id
      l.rel = "stylesheet"
      l.href = "https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600;700;800&display=swap"
      document.head.appendChild(l)
    }
  }, [])

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    setOpen(false)
  }

  return (
    <nav className="fixed top-0 inset-x-0 z-50" style={{ background: CREAM, borderBottom: `2px solid ${INK}`, fontFamily: display.fontFamily }}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        <div className="flex items-center gap-2.5">
          <img src="/logo.png" alt="GymOS" className="w-8 h-8 rounded-lg object-cover" />
          <span className="font-extrabold tracking-tight" style={{ color: INK }}>Smapey GymOS</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => {
            if (l === "Guide") {
              return (
                <a key={l} href="/gym/guide" className="text-sm font-semibold hover:opacity-60 transition-opacity" style={{ color: INK }}>
                  {l}
                </a>
              )
            }
            return (
              <a key={l}
                href={`#${l.toLowerCase().replace(/\s+/g, "-")}`}
                onClick={(e) => scrollTo(e, l.toLowerCase().replace(/\s+/g, "-"))}
                className="text-sm font-semibold hover:opacity-60 transition-opacity" style={{ color: INK }}>
                {l}
              </a>
            )
          })}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/login`} className="text-sm font-semibold hover:opacity-60 transition-opacity px-2 py-2" style={{ color: INK }}>
            Sign in
          </a>
          <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=GYM&plan=FREE`}
            className="text-sm font-bold px-5 py-2.5 rounded-full border-2 transition-transform hover:-translate-y-0.5"
            style={{ ...display, background: AMBER, color: INK, borderColor: INK, boxShadow: `3px 3px 0 ${INK}` }}>
            Get started
          </a>
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden" style={{ color: INK }}>
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden px-6 py-4 flex flex-col gap-4" style={{ background: CREAM, borderTop: `2px solid ${INK}` }}>
          {NAV_LINKS.map((l) => {
            if (l === "Guide") {
              return (
                <a key={l} href="/gym/guide" className="text-sm font-semibold" style={{ color: INK }}>
                  {l}
                </a>
              )
            }
            return (
              <a key={l}
                href={`#${l.toLowerCase().replace(/\s+/g, "-")}`}
                onClick={(e) => scrollTo(e, l.toLowerCase().replace(/\s+/g, "-"))}
                className="text-sm font-semibold" style={{ color: INK }}>
                {l}
              </a>
            )
          })}
          <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=GYM&plan=FREE`}
            className="text-sm font-bold px-4 py-2.5 rounded-full border-2 text-center"
            style={{ ...display, background: AMBER, color: INK, borderColor: INK }}>
            Get started
          </a>
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
    <section className="relative pt-16 overflow-hidden" style={{ background: CREAM, fontFamily: display.fontFamily }}>
      {/* playful layered-bar accents */}
      <div className="absolute inset-0 pointer-events-none hidden md:block" aria-hidden>
        <div className="absolute rounded-[22px] border-2" style={{ top: "14%", left: "-70px", width: 280, height: 80, background: AMBER, borderColor: INK, transform: "rotate(-10deg)" }} />
        <div className="absolute rounded-[22px] border-2" style={{ top: "20%", right: "-80px", width: 300, height: 84, background: BLUE, borderColor: INK, transform: "rotate(8deg)", boxShadow: "5px 5px 0 rgba(22,22,22,.12)" }} />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-24 text-center">

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border-2 text-xs font-bold mb-6" style={{ color: INK, borderColor: INK, boxShadow: `3px 3px 0 ${BLUE}` }}>
          <Zap className="w-3 h-3" />
          Built for modern gyms
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.04] tracking-tight mb-6" style={{ color: INK }}>
          Run your gym <span style={{ color: BLUE }}>smarter</span>,<br className="hidden sm:block" /> not <span style={{ color: AMBER }}>harder</span>
        </h1>

        <p className="text-lg max-w-2xl mx-auto mb-10 leading-relaxed" style={{ color: "#54514c" }}>
          GymOS handles member management, QR check-ins, subscription tracking, and revenue reporting —
          so you can focus on what matters: your members.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=GYM&plan=FREE`}
            className="flex items-center gap-2 px-7 py-4 rounded-full font-bold text-sm border-2 transition-transform hover:-translate-y-0.5"
            style={{ ...display, background: AMBER, color: INK, borderColor: INK, boxShadow: `4px 4px 0 ${INK}` }}>
            Start for free
            <ChevronRight className="w-4 h-4" />
          </a>
          <a href="#features"
            onClick={(e) => { e.preventDefault(); document.getElementById("features")?.scrollIntoView({ behavior: "smooth" }) }}
            className="flex items-center gap-2 px-7 py-4 rounded-full font-bold text-sm border-2 bg-white transition-transform hover:-translate-y-0.5" style={{ ...display, color: INK, borderColor: INK }}>
            See features
          </a>
          <a href="#book-demo"
            onClick={(e) => { e.preventDefault(); document.getElementById("book-demo")?.scrollIntoView({ behavior: "smooth" }) }}
            className="flex items-center gap-2 px-7 py-4 rounded-full font-bold text-sm border-2 bg-white transition-transform hover:-translate-y-0.5" style={{ ...display, color: INK, borderColor: INK }}>
            <CalendarCheck className="w-4 h-4" />
            Book a Demo
          </a>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs font-semibold" style={{ color: "#54514c" }}>
          {["No credit card required", "Free plan forever", "Setup in 2 minutes"].map((t) => (
            <span key={t} className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              {t}
            </span>
          ))}
        </div>

        {/* ── Product mockup: GymOS dashboard ── */}
        <DashboardMockup />
      </div>
    </section>
  )
}

function DashboardMockup() {
  const stats = [
    { icon: Users, label: "Active members", value: "248", trend: "+12 this week", c: BLUE },
    { icon: UserCheck, label: "Check-ins today", value: "73", trend: "Peak 6–8 PM", c: AMBER },
    { icon: CreditCard, label: "Revenue this month", value: "₱48,200", trend: "+18% vs last", c: BLUE },
  ]
  const checkins = [
    { name: "Maria Santos", plan: "Monthly · Unlimited", time: "2 min ago", initials: "MS", c: BLUE },
    { name: "Jre Dela Cruz", plan: "10-Session pass", time: "8 min ago", initials: "JD", c: AMBER },
    { name: "Anna Reyes", plan: "Monthly · Unlimited", time: "15 min ago", initials: "AR", c: BLUE },
  ]
  const bars = [42, 58, 35, 70, 88, 64, 73]

  return (
    <div className="relative mt-20 max-w-4xl mx-auto text-left">
      {/* floating pop badges */}
      <div className="hidden sm:flex absolute -top-5 -left-4 z-20 items-center gap-2 px-3.5 py-2 rounded-full bg-white border-2 text-xs font-bold -rotate-3" style={{ color: INK, borderColor: INK, boxShadow: `3px 3px 0 ${AMBER}` }}>
        <QrCode className="w-3.5 h-3.5" style={{ color: BLUE }} /> QR check-in
      </div>
      <div className="hidden sm:flex absolute -bottom-5 -right-4 z-20 items-center gap-2 px-3.5 py-2 rounded-full border-2 text-xs font-bold rotate-3" style={{ background: BLUE, color: "#fff", borderColor: INK, boxShadow: `3px 3px 0 ${INK}` }}>
        <Dumbbell className="w-3.5 h-3.5" /> Live dashboard
      </div>

      {/* window card */}
      <div className="relative rounded-[24px] border-2 overflow-hidden" style={{ background: "#fff", borderColor: INK, boxShadow: `12px 12px 0 ${INK}` }}>
        {/* window bar */}
        <div className="flex items-center gap-2 px-5 py-3.5" style={{ background: CREAM, borderBottom: `2px solid ${INK}` }}>
          <span className="w-3 h-3 rounded-full border-2" style={{ background: AMBER, borderColor: INK }} />
          <span className="w-3 h-3 rounded-full border-2" style={{ background: "#fff", borderColor: INK }} />
          <span className="w-3 h-3 rounded-full border-2" style={{ background: BLUE, borderColor: INK }} />
          <span className="ml-3 inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold" style={{ background: "#fff", border: `2px solid ${INK}`, color: "#54514c" }}>
            app.smapey.com/gym
          </span>
        </div>

        <div className="p-5 sm:p-6">
          {/* stat row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="rounded-[16px] border-2 p-4" style={{ background: CREAM, borderColor: INK }}>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-9 h-9 rounded-[11px] border-2 flex items-center justify-center" style={{ background: s.c, borderColor: INK }}>
                    <s.icon className="w-4 h-4" style={{ color: s.c === AMBER ? INK : "#fff" }} />
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: "#fff", border: `1.5px solid ${INK}`, color: "#54514c" }}>{s.trend}</span>
                </div>
                <p className="text-2xl font-extrabold leading-none" style={{ color: INK }}>{s.value}</p>
                <p className="text-xs font-semibold mt-1.5" style={{ color: "#9a948b" }}>{s.label}</p>
              </div>
            ))}
          </div>

          {/* lower row: chart + check-ins */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
            {/* revenue chart */}
            <div className="rounded-[16px] border-2 p-5" style={{ background: "#fff", borderColor: INK }}>
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-extrabold" style={{ color: INK }}>Weekly check-ins</p>
                <BarChart3 className="w-4 h-4" style={{ color: BLUE }} />
              </div>
              <div className="flex items-end justify-between gap-2 h-28">
                {bars.map((h, i) => (
                  <div key={i} className="flex-1 rounded-t-[6px] border-2" style={{ height: `${h}%`, background: i === 4 ? AMBER : BLUE, borderColor: INK }} />
                ))}
              </div>
              <div className="flex justify-between mt-2 text-[10px] font-bold" style={{ color: "#9a948b" }}>
                {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => <span key={i} className="flex-1 text-center">{d}</span>)}
              </div>
            </div>

            {/* recent check-ins */}
            <div className="rounded-[16px] border-2 p-5" style={{ background: "#fff", borderColor: INK }}>
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-extrabold" style={{ color: INK }}>Recent check-ins</p>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full" style={{ background: "#e9f9f0", color: "#0d7a55", border: "1.5px solid #0d9f6e" }}>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#0d9f6e" }} /> Live
                </span>
              </div>
              <div className="flex flex-col gap-3">
                {checkins.map((m) => (
                  <div key={m.name} className="flex items-center gap-3">
                    <span className="w-9 h-9 rounded-full border-2 flex items-center justify-center text-[11px] font-bold shrink-0" style={{ background: m.c, color: m.c === AMBER ? INK : "#fff", borderColor: INK }}>
                      {m.initials}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold truncate" style={{ color: INK }}>{m.name}</p>
                      <p className="text-xs truncate" style={{ color: "#9a948b" }}>{m.plan}</p>
                    </div>
                    <span className="text-[11px] font-semibold shrink-0" style={{ color: "#9a948b" }}>{m.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

//////////////////////////////////////////////////////
// FEATURES
//////////////////////////////////////////////////////
function Features() {
  return (
    <section id="features" className="py-24" style={{ background: "#fff", fontFamily: display.fontFamily }}>
      <div className="max-w-6xl mx-auto px-6">
        <Animate className="text-center mb-16">
          <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: BLUE }}>Features</p>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight" style={{ color: INK }}>
            Everything your gym needs
          </h2>
          <p className="mt-4 max-w-xl mx-auto" style={{ color: "#54514c" }}>
            From the front desk to your finances — GymOS covers every part of your operation.
          </p>
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

//////////////////////////////////////////////////////
// HOW IT WORKS
//////////////////////////////////////////////////////
function HowItWorks() {
  const acc = [BLUE, AMBER, BLUE]
  return (
    <section id="how-it-works" className="py-24" style={{ background: CREAM, fontFamily: display.fontFamily }}>
      <div className="max-w-6xl mx-auto px-6">
        <Animate className="text-center mb-16">
          <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: BLUE }}>How it Works</p>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight" style={{ color: INK }}>
            Up and running in minutes
          </h2>
        </Animate>

        <div className="grid md:grid-cols-3 gap-6">
          {STEPS.map(({ step, title, desc }, i) => (
            <Animate key={step} delay={i * 120}>
              <div className="rounded-[22px] border-2 p-8 h-full transition-transform hover:-translate-y-1" style={{ background: "#fff", borderColor: INK, boxShadow: `6px 6px 0 ${acc[i]}` }}>
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-[16px] border-2 font-extrabold text-lg mb-5" style={{ background: acc[i], color: acc[i] === AMBER ? INK : "#fff", borderColor: INK }}>
                  {step}
                </div>
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

//////////////////////////////////////////////////////
// PRICING
//////////////////////////////////////////////////////
function Pricing() {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null)
  const { plans, isPhilippines } = usePricing("GYM")

  const handleSelect = (p: Plan) => {
    if (p.planKey === "FREE") {
      window.location.href = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=${p.product}&plan=FREE`
      return
    }
    setSelectedPlan(p)
  }

  return (
    <section id="pricing" className="py-24" style={{ background: "#fff", fontFamily: display.fontFamily }}>
      <div className="max-w-6xl mx-auto px-6">
        <Animate className="text-center mb-16">
          <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: BLUE }}>Pricing</p>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight" style={{ color: INK }}>
            Simple, transparent pricing
          </h2>
          <p className="mt-4" style={{ color: "#54514c" }}>Start free. Scale as you grow.</p>

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
                <div className="rounded-[24px] p-8 border-2 h-full transition-transform hover:-translate-y-1"
                  style={p.highlight
                    ? { background: BLUE, borderColor: INK, boxShadow: `8px 8px 0 ${INK}`, color: "#fff" }
                    : { background: "#fff", borderColor: INK, boxShadow: `8px 8px 0 ${AMBER}` }}>
                  {p.highlight && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border-2 text-xs font-bold mb-4" style={{ background: AMBER, color: INK, borderColor: INK }}>
                      <Zap className="w-3 h-3" /> Most popular
                    </span>
                  )}
                  <p className="font-extrabold text-lg mb-1" style={{ color: p.highlight ? "#fff" : INK }}>{p.name}</p>
                  <p className="text-sm mb-4" style={{ color: p.highlight ? "rgba(255,255,255,.7)" : "#9a948b" }}>{p.desc}</p>
                  <div className="flex items-end gap-1 mb-6">
                    <span className="text-4xl font-extrabold tracking-tight" style={{ color: p.highlight ? "#fff" : INK }}>
                      {displayPrice}
                    </span>
                    <span className="text-sm mb-1" style={{ color: p.highlight ? "rgba(255,255,255,.6)" : "#9a948b" }}>{p.period}</span>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-center gap-2.5 text-sm">
                        <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: p.highlight ? AMBER : BLUE }} />
                        <span style={{ color: p.highlight ? "rgba(255,255,255,.85)" : "#3f3b36" }}>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handleSelect(p)}
                    className="w-full text-center py-3 rounded-full text-sm font-bold border-2 transition-transform hover:-translate-y-0.5"
                    style={p.highlight
                      ? { ...display, background: AMBER, color: INK, borderColor: INK }
                      : { ...display, background: INK, color: "#fff", borderColor: INK }}>
                    {p.cta}
                  </button>
                </div>
              </Animate>
            )
          })}
        </div>
      </div>

      {selectedPlan && (
        <PaymentModal
          plan={selectedPlan}
          isPhilippines={isPhilippines ?? false}
          onClose={() => setSelectedPlan(null)}
        />
      )}
    </section>
  )
}

//////////////////////////////////////////////////////
// FAQ
//////////////////////////////////////////////////////
function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq" className="py-24" style={{ background: CREAM, fontFamily: display.fontFamily }}>
      <div className="max-w-2xl mx-auto px-6">
        <Animate className="text-center mb-16">
          <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: BLUE }}>FAQ</p>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight" style={{ color: INK }}>
            Common questions
          </h2>
        </Animate>

        <div className="flex flex-col gap-3">
          {FAQS.map(({ q, a }, i) => (
            <Animate key={i} delay={i * 60}>
              <div className="rounded-[18px] overflow-hidden border-2 bg-white" style={{ borderColor: INK }}>
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left font-bold text-sm transition-colors"
                  style={{ color: INK }}
                >
                  {q}
                  <ChevronRight className="w-4 h-4 transition-transform duration-200 shrink-0" style={{ color: BLUE, transform: open === i ? "rotate(90deg)" : "rotate(0deg)" }} />
                </button>
                {open === i && (
                  <div className="px-5 pb-4 text-sm leading-relaxed pt-3" style={{ color: "#54514c", borderTop: "1px solid rgba(22,22,22,.1)" }}>
                    {a}
                  </div>
                )}
              </div>
            </Animate>
          ))}
        </div>
      </div>
    </section>
  )
}

//////////////////////////////////////////////////////
// CTA
//////////////////////////////////////////////////////
function CTA() {
  return (
    <section className="py-24 px-6" style={{ background: "#fff", fontFamily: display.fontFamily }}>
      <Animate className="relative max-w-3xl mx-auto rounded-[30px] border-2 p-12 md:p-16 text-center" style={{ background: AMBER, borderColor: INK, boxShadow: `10px 10px 0 ${INK}` }}>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4" style={{ color: INK }}>
          Ready to modernize your gym?
        </h2>
        <p className="mb-8 font-medium" style={{ color: "#5c4a28" }}>
          Join gym owners who trust GymOS to run their operations.
        </p>
        <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=GYM&plan=FREE`}
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold border-2 transition-transform hover:-translate-y-0.5"
          style={{ ...display, background: INK, color: "#fff", borderColor: INK }}>
          Get started for free
          <ChevronRight className="w-4 h-4" />
        </a>
      </Animate>
    </section>
  )
}

//////////////////////////////////////////////////////
// FOOTER
//////////////////////////////////////////////////////
function Footer() {
  return (
    <footer className="px-6 py-8" style={{ background: CREAM, borderTop: `2px solid ${INK}`, fontFamily: display.fontFamily }}>
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="GymOS" className="w-6 h-6 rounded-md object-cover" />
          <span className="text-sm font-extrabold" style={{ color: INK }}>GymOS</span>
        </div>
        <p className="text-xs" style={{ color: "#9a948b" }}>© {new Date().getFullYear()} GymOS. All rights reserved.</p>
      </div>
    </footer>
  )
}

//////////////////////////////////////////////////////
// PAYMENT MODAL
//////////////////////////////////////////////////////
type CheckoutMethod = "paypal" | "paymongo"

const Spinner = () => (
  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
  </svg>
)

function PaymentModal({
  plan,
  isPhilippines,
  onClose,
}: {
  plan: { name: string; phpPrice: string; usdPrice: string; period: string; planKey: string; product: string } | null
  isPhilippines: boolean
  onClose: () => void
}) {
  const [step, setStep] = useState<"details" | "payment">("details")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState<CheckoutMethod | null>(null)
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const t = localStorage.getItem("accessToken")
    setToken(t)
    if (t) setStep("payment")
  }, [])

  if (!plan) return null

  const displayPrice = isPhilippines ? plan.phpPrice : plan.usdPrice
  const inputStyle = { borderColor: INK, color: INK } as React.CSSProperties

  const checkout = async (method: CheckoutMethod) => {
    try {
      setLoading(method)
      let endpoint = ""
      let payload: any = {}

      if (token) {
        endpoint = method === "paypal"
          ? "/api/billing/subscribe/paypal"
          : "/api/billing/subscribe/paymongo"
        payload = { product: plan.product, plan: plan.planKey }
      } else {
        endpoint = method === "paypal"
          ? "/api/billing/newaccount/paypal"
          : "/api/billing/newaccount/paymongo"
        payload = { name, email, product: plan.product, plan: plan.planKey }
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(payload),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.message || JSON.stringify(data))
      const redirectUrl = data.approveUrl || data.checkoutUrl
      if (!redirectUrl) throw new Error("No redirect URL returned")
      window.location.href = redirectUrl
    } catch (err: any) {
      console.error(err)
      alert(err?.message || "Checkout failed. Please try again.")
    } finally {
      setLoading(null)
    }
  }

  const handleContinue = () => {
    if (!name.trim() || !email.trim()) { alert("Name and email are required"); return }
    if (!isPhilippines) {
      checkout("paypal")
    } else {
      setStep("payment")
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" style={{ fontFamily: display.fontFamily }}>
      <div className="bg-white rounded-[22px] w-full max-w-md overflow-hidden border-2" style={{ borderColor: INK, boxShadow: `10px 10px 0 ${AMBER}` }}>

        {/* Header */}
        <div className="px-6 py-5 flex items-center justify-between" style={{ background: INK, borderBottom: `2px solid ${INK}` }}>
          <div className="flex items-center gap-3">
            {step === "payment" && !token && (
              <button onClick={() => setStep("details")} className="text-white/70 hover:text-white transition">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
              </button>
            )}
            <div>
              <h2 className="text-white font-extrabold text-lg">
                {step === "details" ? "Create your account" : "Choose payment method"}
              </h2>
              <p className="text-sm mt-0.5" style={{ color: "rgba(255,255,255,.7)" }}>
                {plan.name} plan — <span className="font-bold" style={{ color: AMBER }}>{displayPrice}</span>{plan.period}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-white/70 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 flex flex-col gap-4">

          {step === "details" && (
            <>
              <input
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border-2 rounded-xl px-4 py-2.5 text-sm focus:outline-none"
                style={inputStyle}
              />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-2 rounded-xl px-4 py-2.5 text-sm focus:outline-none"
                style={inputStyle}
              />
              <button
                onClick={handleContinue}
                disabled={loading !== null}
                className="w-full py-3 rounded-full border-2 font-bold text-sm flex items-center justify-center gap-2 transition-transform hover:-translate-y-0.5 disabled:opacity-60"
                style={{ ...display, background: AMBER, color: INK, borderColor: INK }}
              >
                {loading ? <><Spinner /> Redirecting…</> : <>Continue <ChevronRight className="w-4 h-4" /></>}
              </button>
            </>
          )}

          {step === "payment" && (
            <>
              {isPhilippines && (
                <button
                  onClick={() => checkout("paymongo")}
                  disabled={loading !== null}
                  className="w-full flex items-center gap-4 px-5 py-4 border-2 rounded-2xl transition-all group"
                  style={{ borderColor: INK }}
                >
                  <div className="w-10 h-10 rounded-xl bg-green-600 flex items-center justify-center shrink-0">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white"><path d="M3 3h7v7H3zm0 11h7v7H3zm11-11h7v7h-7zm0 11h7v7h-7z"/></svg>
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-bold" style={{ color: INK }}>QR Ph / GCash / Card</p>
                    <p className="text-xs" style={{ color: "#9a948b" }}>Philippine payment methods</p>
                  </div>
                  {loading === "paymongo" ? <Spinner /> : <ChevronRight className="w-4 h-4" style={{ color: INK }} />}
                </button>
              )}

              <button
                onClick={() => checkout("paypal")}
                disabled={loading !== null}
                className="w-full flex items-center gap-4 px-5 py-4 border-2 rounded-2xl transition-all group"
                style={{ borderColor: INK }}
              >
                <div className="w-10 h-10 rounded-xl bg-[#003087] flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                    <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c1.379 8.883-5.43 11.61-10.377 11.61H8.23l-1.133 7.184h3.78c.458 0 .848-.332.92-.783l.038-.196.728-4.617.047-.252a.93.93 0 0 1 .919-.784h.578c3.746 0 6.678-1.522 7.534-5.927.358-1.833.173-3.363-.42-4.494z"/>
                  </svg>
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-bold" style={{ color: INK }}>PayPal</p>
                  <p className="text-xs" style={{ color: "#9a948b" }}>Pay with your PayPal account</p>
                </div>
                {loading === "paypal" ? <Spinner /> : <ChevronRight className="w-4 h-4" style={{ color: INK }} />}
              </button>
            </>
          )}

          <p className="text-center text-xs flex items-center justify-center gap-1" style={{ color: "#9a948b" }}>
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            Secure checkout · Cancel anytime · No hidden fees
          </p>

        </div>
      </div>
    </div>
  )
}

//////////////////////////////////////////////////////
// PAGE
//////////////////////////////////////////////////////
export default function LandingPage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <GymVideoSection />
      <Features />
      <HowItWorks />
      <Pricing />
      <FAQ />
      <BookDemoForm product="GYM" />
      <CTA />
      <InternalLinks cluster="gym" currentPath="/gym" />
      <Footer />
    </main>
  )
}
