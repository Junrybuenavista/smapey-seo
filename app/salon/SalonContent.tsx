"use client"

import { useState, useEffect, useRef } from "react"
import {
  Calendar, Users, Scissors, Globe, Inbox, BarChart3,
  CheckCircle2, ChevronRight, Menu, X, Zap, XCircle,
} from "lucide-react"
import { usePricing, type Plan } from "@/lib/usePricing"
import InternalLinks from "@/components/InternalLinks"
import SalonVideo from "@/components/SalonVideo"

const NAV_LINKS = ["Features", "How it Works", "Pricing", "FAQ", "Guide"]

const FEATURES = [
  {
    icon: Calendar,
    title: "Appointment Scheduling",
    desc: "Book appointments, assign services, and set durations. View your day at a glance in a clean calendar-style list.",
    color: "from-pink-600 to-rose-400",
    shadow: "shadow-pink-500/20",
  },
  {
    icon: Users,
    title: "Client Management",
    desc: "Full client profiles with contact info, appointment history, and notes. Find any client by name or phone in seconds.",
    color: "from-rose-600 to-pink-400",
    shadow: "shadow-rose-500/20",
  },
  {
    icon: Scissors,
    title: "Service Menu",
    desc: "Define your full list of services with prices and durations. Each service appears on your public booking page automatically.",
    color: "from-fuchsia-600 to-pink-400",
    shadow: "shadow-fuchsia-500/20",
  },
  {
    icon: Globe,
    title: "Public Booking Page",
    desc: "Your salon gets a unique URL clients can visit to browse services and send a booking inquiry. No coding needed.",
    color: "from-pink-500 to-rose-400",
    shadow: "shadow-pink-500/20",
  },
  {
    icon: Inbox,
    title: "Inquiry Management",
    desc: "See all incoming booking requests in one place. Accept or decline inquiries and convert them into confirmed appointments.",
    color: "from-rose-500 to-fuchsia-400",
    shadow: "shadow-rose-500/20",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    desc: "Track monthly revenue, appointment count, completed sessions, and pending inquiries — all from a single dashboard.",
    color: "from-pink-600 to-fuchsia-500",
    shadow: "shadow-pink-600/20",
  },
]

const STEPS = [
  {
    step: "01",
    title: "Add your services",
    desc: "Set up your service menu with names, prices, and durations. This builds your public booking page automatically.",
  },
  {
    step: "02",
    title: "Share your booking link",
    desc: "Every salon gets a unique URL. Share it on social media, WhatsApp, or your bio so clients can browse and inquire.",
  },
  {
    step: "03",
    title: "Manage appointments",
    desc: "Accept inquiries, book appointments, complete sessions, and track revenue — all from your salon dashboard.",
  },
]

const FEATURE_ROWS = [
  { feature: "Public booking page", free: true, pro: true, enterprise: true },
  { feature: "Inquiry management", free: true, pro: true, enterprise: true },
  { feature: "Analytics dashboard", free: true, pro: true, enterprise: true },
  { feature: "Priority support", free: false, pro: false, enterprise: true },
]

function limitDisplay(plan: Plan | undefined, key: string): string {
  if (!plan) return "…"
  const val = plan.limits?.[key]
  if (val === -1 || val === null || val === undefined) return "Unlimited"
  return String(val)
}

const FAQS = [
  {
    q: "Does the app include a public booking page?",
    a: "Yes. Every salon account gets a unique URL like smapey.com/salon/your-salon-name. Clients can browse your services and send a booking inquiry directly from that page.",
  },
  {
    q: "Can I manage multiple staff members?",
    a: "Yes. You can add team members to your account and assign appointments to specific staff. The Pro plan supports up to 5 team members.",
  },
  {
    q: "How do I accept payments?",
    a: "Smapey SalonOS tracks appointment totals and completion status. You can record cash, GCash, or bank transfer payments per appointment.",
  },
  {
    q: "Is there a free plan?",
    a: "Yes. The free plan supports up to 50 appointments per month, 5 services, and a public booking page — no credit card required.",
  },
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
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    setOpen(false)
  }

  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
      scrolled ? "bg-[#120a18]/90 backdrop-blur-md border-b border-white/5 shadow-lg" : "bg-transparent"
    }`}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/salon" className="flex items-center gap-2.5">
          <img src="/logo.png" alt="SalonOS" className="w-8 h-8 rounded-lg object-cover" />
          <span className="text-white font-bold tracking-tight">Smapey SalonOS</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => {
            if (l === "Guide") {
              return (
                <a key={l} href="/salon/guide" className="text-sm text-white/60 hover:text-white transition-colors">
                  {l}
                </a>
              )
            }
            return (
              <a
                key={l}
                href={`#${l.toLowerCase().replace(/\s+/g, "-")}`}
                onClick={(e) => scrollTo(e, l.toLowerCase().replace(/\s+/g, "-"))}
                className="text-sm text-white/60 hover:text-white transition-colors"
              >
                {l}
              </a>
            )
          })}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/login`} className="text-sm text-white/60 hover:text-white transition-colors px-4 py-2">
            Sign in
          </a>
          <a
            href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=SALON&plan=FREE`}
            className="text-sm font-semibold px-4 py-2 rounded-lg bg-pink-600 hover:bg-pink-500 text-white transition-colors shadow-lg shadow-pink-500/20"
          >
            Get started
          </a>
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden text-white/60 hover:text-white">
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-[#120a18] border-t border-white/5 px-6 py-4 flex flex-col gap-4">
          {NAV_LINKS.map((l) => {
            if (l === "Guide") {
              return (
                <a key={l} href="/salon/guide" className="text-sm text-white/60 hover:text-white transition-colors">
                  {l}
                </a>
              )
            }
            return (
              <a
                key={l}
                href={`#${l.toLowerCase().replace(/\s+/g, "-")}`}
                onClick={(e) => scrollTo(e, l.toLowerCase().replace(/\s+/g, "-"))}
                className="text-sm text-white/60 hover:text-white transition-colors"
              >
                {l}
              </a>
            )
          })}
          <a
            href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=SALON&plan=FREE`}
            className="text-sm font-semibold px-4 py-2 rounded-lg bg-pink-600 text-white text-center"
          >
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
    <section
      className="relative min-h-screen flex items-center pt-16 overflow-hidden"
      style={{
        background: "#120a18",
        backgroundImage:
          "repeating-linear-gradient(45deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 28px)",
        backgroundSize: "28px 28px",
      }}
    >
      <div
        className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(236,72,153,0.12) 0%, transparent 70%)" }}
      />
      <div
        className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(236,72,153,0.08) 0%, transparent 70%)" }}
      />

      <div className="relative max-w-6xl mx-auto px-6 py-24 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs font-semibold mb-6">
          <Zap className="w-3 h-3" />
          Built for small salons and beauty studios
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight mb-6">
          Run your salon smarter,{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-400 to-fuchsia-400">
            not harder
          </span>
        </h1>

        <p className="text-lg text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed">
          SalonOS handles appointment scheduling, client management, and your public booking page —
          so you can focus on delivering great service to every client.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=SALON&plan=FREE`}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-semibold text-sm transition-all shadow-lg shadow-pink-500/20"
          >
            Start for free
            <ChevronRight className="w-4 h-4" />
          </a>
          <a
            href="#features"
            onClick={(e) => { e.preventDefault(); document.getElementById("features")?.scrollIntoView({ behavior: "smooth" }) }}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white font-medium text-sm transition-all border border-white/10"
          >
            See features
          </a>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-center gap-6 text-white/30 text-xs">
          {["No credit card required", "Free plan forever", "Setup in 5 minutes"].map((t) => (
            <span key={t} className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-pink-400" />
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

//////////////////////////////////////////////////////
// FEATURES
//////////////////////////////////////////////////////
function Features() {
  return (
    <section id="features" className="py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        <Animate className="text-center mb-16">
          <p className="text-pink-600 text-sm font-semibold uppercase tracking-widest mb-3">Features</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">
            Everything your salon needs
          </h2>
          <p className="text-slate-500 mt-4 max-w-xl mx-auto">
            From booking the first appointment to tracking monthly revenue — SalonOS covers your entire salon operation.
          </p>
        </Animate>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map(({ icon: Icon, title, desc, color, shadow }, i) => (
            <Animate key={title} delay={i * 80}>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300 h-full">
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-tr ${color} shadow-lg ${shadow} flex items-center justify-center mb-4`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold text-slate-800 mb-2">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              </div>
            </Animate>
          ))}
        </div>
      </div>
    </section>
  )
}

//////////////////////////////////////////////////////
// HOW IT WORKS
//////////////////////////////////////////////////////
function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <Animate className="text-center mb-16">
          <p className="text-pink-600 text-sm font-semibold uppercase tracking-widest mb-3">How it Works</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">
            Up and running in minutes
          </h2>
        </Animate>

        <div className="grid md:grid-cols-3 gap-8">
          {STEPS.map(({ step, title, desc }, i) => (
            <Animate key={step} delay={i * 120}>
              <div className="relative text-center group">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-pink-50 border-2 border-pink-100 text-pink-600 font-extrabold text-lg mb-5 group-hover:bg-gradient-to-tr group-hover:from-pink-500 group-hover:to-rose-400 group-hover:text-white group-hover:border-transparent transition-all duration-300">
                  {step}
                </div>
                <h3 className="font-bold text-slate-800 mb-2">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              </div>
            </Animate>
          ))}
        </div>
      </div>
    </section>
  )
}

//////////////////////////////////////////////////////
// COMPARISON TABLE
//////////////////////////////////////////////////////
function ComparisonTable() {
  const { plans, isPhilippines } = usePricing("SALON")
  const freePlan = plans.find(p => p.planKey === "FREE")
  const proPlan = plans.find(p => p.planKey === "PRO")
  const entPlan = plans.find(p => p.planKey === "ENTERPRISE")
  const proPrice = isPhilippines === null ? "…" : isPhilippines ? proPlan?.phpPrice : proPlan?.usdPrice
  const entPrice = isPhilippines === null ? "…" : isPhilippines ? entPlan?.phpPrice : entPlan?.usdPrice

  const limitRows = [
    { feature: "Appointments / month", key: "appointments" },
    { feature: "Services", key: "services" },
    { feature: "Team members", key: "users" },
  ]

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-4xl mx-auto px-6">
        <Animate className="text-center mb-16">
          <p className="text-pink-600 text-sm font-semibold uppercase tracking-widest mb-3">Compare plans</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">Free vs. paid plans</h2>
          <p className="text-slate-500 mt-4">Start free and upgrade only when your salon grows.</p>
        </Animate>
        <Animate>
          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm bg-white">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left px-6 py-4 text-slate-500 font-medium">Feature</th>
                  <th className="text-center px-6 py-4 text-slate-800 font-bold">Free</th>
                  <th className="text-center px-6 py-4 text-pink-700 font-bold bg-pink-50">Pro <span className="text-xs text-pink-400 font-normal">{proPrice}/mo</span></th>
                  <th className="text-center px-6 py-4 text-slate-800 font-bold">Enterprise <span className="text-xs text-slate-400 font-normal">{entPrice}/mo</span></th>
                </tr>
              </thead>
              <tbody>
                {limitRows.map(({ feature, key }, i) => (
                  <tr key={feature} className={`border-b border-slate-100 ${i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}`}>
                    <td className="px-6 py-4 text-slate-700 font-medium">{feature}</td>
                    <td className="text-center px-6 py-4"><span className="text-slate-700 font-medium">{limitDisplay(freePlan, key)}</span></td>
                    <td className="text-center px-6 py-4 bg-pink-50/50"><span className="text-slate-700 font-medium">{limitDisplay(proPlan, key)}</span></td>
                    <td className="text-center px-6 py-4"><span className="text-slate-700 font-medium">{limitDisplay(entPlan, key)}</span></td>
                  </tr>
                ))}
                {FEATURE_ROWS.map((row, i) => (
                  <tr key={row.feature} className={`border-b border-slate-100 ${(limitRows.length + i) % 2 === 0 ? "bg-white" : "bg-slate-50/50"}`}>
                    <td className="px-6 py-4 text-slate-700 font-medium">{row.feature}</td>
                    {[row.free, row.pro, row.enterprise].map((val, j) => (
                      <td key={j} className={`text-center px-6 py-4 ${j === 1 ? "bg-pink-50/50" : ""}`}>
                        {val ? <CheckCircle2 className="w-5 h-5 text-pink-500 mx-auto" /> : <XCircle className="w-5 h-5 text-slate-300 mx-auto" />}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Animate>
      </div>
    </section>
  )
}

//////////////////////////////////////////////////////
// PRICING
//////////////////////////////////////////////////////
function Pricing() {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null)
  const { plans, isPhilippines } = usePricing("SALON")

  const handleSelect = (p: Plan) => {
    if (p.planKey === "FREE") {
      window.location.href = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=${p.product}&plan=FREE`
      return
    }
    setSelectedPlan(p)
  }

  return (
    <section id="pricing" className="py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        <Animate className="text-center mb-16">
          <p className="text-pink-600 text-sm font-semibold uppercase tracking-widest mb-3">Pricing</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">
            Simple, transparent pricing
          </h2>
          <p className="text-slate-500 mt-4">Start free. Scale as you grow.</p>

          {isPhilippines !== null && (
            <div className="inline-flex items-center gap-1.5 mt-4 px-3 py-1 rounded-full bg-white border border-slate-200 text-xs text-slate-500 shadow-sm">
              <span>{isPhilippines ? "🇵🇭" : "🌍"}</span>
              <span>Prices in <span className="font-semibold text-slate-700">{isPhilippines ? "Philippine Peso (₱)" : "US Dollar ($)"}</span></span>
            </div>
          )}
        </Animate>

        <div className="grid md:grid-cols-3 gap-6 items-center">
          {plans.map((p, i) => {
            const displayPrice = isPhilippines === null ? "..." : isPhilippines ? p.phpPrice : p.usdPrice
            return (
              <Animate key={p.name} delay={i * 100}>
                <div className={`rounded-2xl p-8 border transition-all duration-300 hover:-translate-y-1 ${
                  p.highlight
                    ? "bg-gradient-to-b from-pink-700 to-rose-900 border-pink-500/30 shadow-2xl shadow-pink-500/20 scale-105"
                    : "bg-white border-slate-200 shadow-sm hover:shadow-md"
                }`}>
                  {p.highlight && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-400/20 text-rose-200 text-xs font-semibold mb-4">
                      <Zap className="w-3 h-3" /> Most popular
                    </span>
                  )}
                  <p className={`font-bold text-lg mb-1 ${p.highlight ? "text-white" : "text-slate-800"}`}>{p.name}</p>
                  <p className={`text-sm mb-4 ${p.highlight ? "text-pink-200/60" : "text-slate-400"}`}>{p.desc}</p>
                  <div className="flex items-end gap-1 mb-6">
                    <span className={`text-4xl font-extrabold tracking-tight ${p.highlight ? "text-white" : "text-slate-800"}`}>
                      {displayPrice}
                    </span>
                    <span className={`text-sm mb-1 ${p.highlight ? "text-pink-200/50" : "text-slate-400"}`}>{p.period}</span>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-center gap-2.5 text-sm">
                        <CheckCircle2 className={`w-4 h-4 shrink-0 ${p.highlight ? "text-rose-300" : "text-pink-500"}`} />
                        <span className={p.highlight ? "text-pink-100/80" : "text-slate-600"}>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handleSelect(p)}
                    className={`w-full text-center py-2.5 rounded-xl text-sm font-semibold transition-all ${
                      p.highlight
                        ? "bg-rose-400 hover:bg-rose-300 text-rose-900 shadow-lg shadow-rose-400/25"
                        : "bg-pink-600 hover:bg-pink-500 text-white shadow-md shadow-pink-500/20"
                    }`}
                  >
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
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-2xl mx-auto px-6">
        <Animate className="text-center mb-16">
          <p className="text-pink-600 text-sm font-semibold uppercase tracking-widest mb-3">FAQ</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">
            Common questions
          </h2>
        </Animate>

        <div className="flex flex-col gap-3">
          {FAQS.map(({ q, a }, i) => (
            <Animate key={i} delay={i * 60}>
              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left text-slate-700 font-medium text-sm hover:bg-slate-50 transition-colors"
                >
                  {q}
                  <ChevronRight className={`w-4 h-4 text-pink-400 transition-transform duration-200 shrink-0 ${open === i ? "rotate-90" : ""}`} />
                </button>
                {open === i && (
                  <div className="px-5 pb-4 text-sm text-slate-500 leading-relaxed border-t border-slate-100 pt-3">
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
    <section
      className="py-24 relative overflow-hidden"
      style={{
        background: "#120a18",
        backgroundImage:
          "repeating-linear-gradient(45deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 28px)",
        backgroundSize: "28px 28px",
      }}
    >
      <div
        className="absolute -top-40 -left-40 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(236,72,153,0.08) 0%, transparent 70%)" }}
      />
      <div
        className="absolute -bottom-40 -right-40 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(236,72,153,0.10) 0%, transparent 70%)" }}
      />

      <Animate className="relative max-w-2xl mx-auto px-6 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
          Ready to run your salon smarter?
        </h2>
        <p className="text-white/40 mb-8">
          Join salon owners who use SalonOS to manage appointments and keep clients coming back.
        </p>
        <a
          href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=SALON&plan=FREE`}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-pink-600 to-rose-400 hover:from-pink-500 hover:to-rose-300 text-white font-semibold transition-all shadow-xl shadow-pink-500/20"
        >
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
    <footer className="bg-[#0a0612] border-t border-white/5 px-6 py-8">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="SalonOS" className="w-6 h-6 rounded-md object-cover" />
          <span className="text-white/60 text-sm font-semibold">SalonOS by Smapey</span>
        </div>
        <p className="text-white/20 text-xs">© {new Date().getFullYear()} Smapey. All rights reserved.</p>
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

  const checkout = async (method: CheckoutMethod) => {
    try {
      setLoading(method)
      const endpoint = token
        ? (method === "paypal" ? "/api/billing/subscribe/paypal" : "/api/billing/subscribe/paymongo")
        : (method === "paypal" ? "/api/billing/newaccount/paypal" : "/api/billing/newaccount/paymongo")
      const payload = token
        ? { product: plan.product, plan: plan.planKey }
        : { name, email, product: plan.product, plan: plan.planKey }
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || JSON.stringify(data))
      const redirectUrl = data.approveUrl || data.checkoutUrl
      if (!redirectUrl) throw new Error("No redirect URL returned")
      window.location.href = redirectUrl
    } catch (err: any) {
      alert(err?.message || "Checkout failed. Please try again.")
    } finally {
      setLoading(null)
    }
  }

  const handleContinue = () => {
    if (!name.trim() || !email.trim()) { alert("Name and email are required"); return }
    if (!isPhilippines) { checkout("paypal") } else { setStep("payment") }
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-pink-700 to-rose-500 px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {step === "payment" && !token && (
              <button onClick={() => setStep("details")} className="text-white/60 hover:text-white transition">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
              </button>
            )}
            <div>
              <h2 className="text-white font-bold text-lg">
                {step === "details" ? "Create your account" : "Choose payment method"}
              </h2>
              <p className="text-pink-100 text-sm mt-0.5">
                {plan.name} plan — <span className="font-semibold">{displayPrice}</span>{plan.period}
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
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-pink-500/30 focus:border-pink-400"
              />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-pink-500/30 focus:border-pink-400"
              />
              <button
                onClick={handleContinue}
                disabled={loading !== null}
                className="w-full py-3 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-60"
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
                  className="w-full flex items-center gap-4 px-5 py-4 border-2 border-slate-200 rounded-2xl hover:border-green-500 hover:bg-green-50 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-green-600 flex items-center justify-center shrink-0">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white"><path d="M3 3h7v7H3zm0 11h7v7H3zm11-11h7v7h-7zm0 11h7v7h-7z"/></svg>
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-semibold text-slate-800 group-hover:text-green-700">QR Ph / GCash / Card</p>
                    <p className="text-xs text-slate-400">Philippine payment methods</p>
                  </div>
                  {loading === "paymongo" ? <Spinner /> : <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-green-500" />}
                </button>
              )}

              <button
                onClick={() => checkout("paypal")}
                disabled={loading !== null}
                className="w-full flex items-center gap-4 px-5 py-4 border-2 border-slate-200 rounded-2xl hover:border-blue-500 hover:bg-blue-50 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#003087] flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                    <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c1.379 8.883-5.43 11.61-10.377 11.61H8.23l-1.133 7.184h3.78c.458 0 .848-.332.92-.783l.038-.196.728-4.617.047-.252a.93.93 0 0 1 .919-.784h.578c3.746 0 6.678-1.522 7.534-5.927.358-1.833.173-3.363-.42-4.494z"/>
                  </svg>
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-semibold text-slate-800 group-hover:text-blue-700">PayPal</p>
                  <p className="text-xs text-slate-400">Pay with your PayPal account</p>
                </div>
                {loading === "paypal" ? <Spinner /> : <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500" />}
              </button>
            </>
          )}

          <p className="text-center text-xs text-slate-400 flex items-center justify-center gap-1">
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
export default function SalonContent() {
  return (
    <main>
      <Navbar />
      <Hero />
      <SalonVideo />
      <Features />
      <HowItWorks />
      <ComparisonTable />
      <Pricing />
      <FAQ />
      <CTA />
      <InternalLinks cluster="salon" currentPath="/salon" />
      <Footer />
    </main>
  )
}
