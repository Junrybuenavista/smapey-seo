"use client"

import { useState, useEffect, useRef } from "react"
import BookDemoForm from "@/components/BookDemoForm"
import {
  Landmark, Users, CalendarRange, BarChart3, Wallet, Percent,
  HandCoins, CheckCircle2, ChevronRight, Menu, X, Zap, XCircle, AlertTriangle,
  CalendarCheck,
} from "lucide-react"
import { usePricing, type Plan } from "@/lib/usePricing"
import InternalLinks from "@/components/InternalLinks"

const FEATURES = [
  {
    icon: Users,
    title: "Borrower Profiles",
    desc: "Build a complete borrower database with contact details, ID info, and notes. Every borrower's loan history, total borrowed, and outstanding balance update automatically.",
    color: "from-slate-600 to-slate-800",
    shadow: "shadow-slate-700/30",
  },
  {
    icon: HandCoins,
    title: "Loan Issuance",
    desc: "Issue a loan in seconds — set the principal, interest rate, term, and start date. The system records everything and links it to the borrower's profile.",
    color: "from-slate-600 to-slate-800",
    shadow: "shadow-slate-700/30",
  },
  {
    icon: CalendarRange,
    title: "Amortization Schedules",
    desc: "Auto-generate a full repayment schedule with due dates and amounts the moment a loan is created. No spreadsheets, no manual math — every installment is laid out for you.",
    color: "from-slate-600 to-slate-800",
    shadow: "shadow-slate-700/30",
  },
  {
    icon: Wallet,
    title: "Payment Tracking",
    desc: "Record repayments by Cash, GCash, or Bank Transfer. Handle partial payments, and watch each loan's outstanding balance drop in real time as borrowers pay.",
    color: "from-slate-600 to-slate-800",
    shadow: "shadow-slate-700/30",
  },
  {
    icon: AlertTriangle,
    title: "Overdue & Collections",
    desc: "Loans with missed due dates are flagged automatically. See who's late, how much they owe, and how many days overdue — so you can follow up before it becomes a bad debt.",
    color: "from-slate-600 to-slate-800",
    shadow: "shadow-slate-700/30",
  },
  {
    icon: Percent,
    title: "Interest & Fees",
    desc: "Set the interest rate per loan and let the system compute totals and installment amounts. Your terms, applied consistently across every loan you issue.",
    color: "from-slate-600 to-slate-800",
    shadow: "shadow-slate-700/30",
  },
  {
    icon: CheckCircle2,
    title: "Loan Lifecycle",
    desc: "Move every loan through a clear status — Active, Fully Paid, or Defaulted. Know exactly where your portfolio stands at any moment, no guesswork.",
    color: "from-slate-600 to-slate-800",
    shadow: "shadow-slate-700/30",
  },
  {
    icon: BarChart3,
    title: "Lending Analytics",
    desc: "A live dashboard with monthly collections, total outstanding, repayment rate, default rate, and a 6-month collections-vs-disbursed chart — so you always know how your lending business is performing.",
    color: "from-slate-600 to-slate-800",
    shadow: "shadow-slate-700/30",
  },
]

const STEPS = [
  { num: "01", title: "Add your borrowers", desc: "Record each borrower once with their contact info and ID details. Their loan history and balance follow them across every future loan automatically." },
  { num: "02", title: "Issue a loan", desc: "Pick a borrower, set the principal, interest rate, and term — and the amortization schedule generates itself with every due date and amount." },
  { num: "03", title: "Track repayments", desc: "Log each payment by Cash, GCash, or Bank Transfer. Partial payments are supported and the outstanding balance updates instantly." },
  { num: "04", title: "Monitor collections", desc: "Spot overdue loans, follow up on collections, and watch your monthly collections, repayment rate, and outstanding balance in real time." },
]

const FEATURE_ROWS = [
  { feature: "Amortization schedules", free: true, pro: true, enterprise: true },
  { feature: "Payment tracking (Cash / GCash / Bank)", free: true, pro: true, enterprise: true },
  { feature: "Overdue & collections tracking", free: true, pro: true, enterprise: true },
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
    q: "Is this a loan app for borrowers, or for lenders?",
    a: "It's for lenders. Smapey Lending is the software you use to run your own lending business — issuing loans, tracking borrowers, and managing repayments. It is not a place to borrow money; it's the system that lending businesses and individual lenders use to manage the money they lend out.",
  },
  {
    q: "Is there really a free plan?",
    a: "Yes. The free plan includes up to 20 borrowers, 30 active loans, amortization schedules, payment tracking, and the full analytics dashboard — no credit card required, no trial timer. Upgrade only when your portfolio grows.",
  },
  {
    q: "Does it calculate the amortization schedule automatically?",
    a: "Yes. The moment you create a loan with a principal, interest rate, and term, the system generates a complete repayment schedule — every due date and installment amount — so you never have to compute it by hand.",
  },
  {
    q: "Can I record GCash and bank transfer payments?",
    a: "Yes. Every payment can be logged as Cash, GCash, or Bank Transfer. Partial payments are supported, and each loan's outstanding balance updates the instant you record a payment.",
  },
  {
    q: "How does overdue and collections tracking work?",
    a: "Loans with a missed due date are flagged automatically. Your dashboard shows who is late, how much they owe, and how many days overdue — so you can follow up early and keep your default rate low.",
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

export type LendingVariant = {
  /** Canonical path of the page rendering this component, e.g. "/lending" or "/lending/loan-app-philippines" */
  currentPath: string
  /** "anchors" = hub page (in-page section links); "page" = keyword page (links back to hub) */
  navMode: "anchors" | "page"
  hero: {
    badge: string
    titleLead: string
    titleAccent: string
    subtitle: string
  }
  features: {
    eyebrow: string
    heading: string
    sub: string
  }
  cta: {
    heading: string
    sub: string
  }
}

function Navbar({ variant }: { variant: LendingVariant }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])
  const links = variant.navMode === "anchors" ? (
    <>
      <a href="#features" className="text-sm text-white/60 hover:text-white transition-colors">Features</a>
      <a href="#how-it-works" className="text-sm text-white/60 hover:text-white transition-colors">How it Works</a>
      <a href="#pricing" className="text-sm text-white/60 hover:text-white transition-colors">Pricing</a>
      <a href="#faq" className="text-sm text-white/60 hover:text-white transition-colors">FAQ</a>
      <a href="/lending/guide" className="text-sm text-white/60 hover:text-white transition-colors">Guide</a>
    </>
  ) : (
    <>
      <a href="/lending" className="text-sm text-white/60 hover:text-white transition-colors">Home</a>
      <a href="#features" className="text-sm text-white/60 hover:text-white transition-colors">Features</a>
      <a href="#pricing" className="text-sm text-white/60 hover:text-white transition-colors">Pricing</a>
      <a href="#faq" className="text-sm text-white/60 hover:text-white transition-colors">FAQ</a>
      <a href="/lending/guide" className="text-sm text-white/60 hover:text-white transition-colors">Guide</a>
    </>
  )
  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#071219]/90 backdrop-blur-md border-b border-white/5 shadow-lg" : "bg-transparent"}`}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/lending" className="flex items-center gap-2.5">
          <img src="/logo.png" alt="Smapey Lending" className="w-8 h-8 rounded-lg object-cover" />
          <span className="text-white font-bold tracking-tight">Smapey Lending</span>
        </a>
        <div className="hidden md:flex items-center gap-8">{links}</div>
        <div className="hidden md:flex items-center gap-3">
          <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/login`} className="text-sm text-white/60 hover:text-white transition-colors px-4 py-2">Sign in</a>
          <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=LENDING&plan=FREE`}
            className="text-sm font-semibold px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white transition-colors shadow-lg shadow-slate-600/20">
            Get started free
          </a>
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden text-white/60 hover:text-white">
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-[#071219] border-t border-white/5 px-6 py-4 flex flex-col gap-4">
          {links}
          <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=LENDING&plan=FREE`}
            className="text-sm font-semibold px-4 py-2 rounded-lg bg-slate-700 text-white text-center">
            Get started free
          </a>
        </div>
      )}
    </nav>
  )
}

function Hero({ variant }: { variant: LendingVariant }) {
  const secondary = variant.navMode === "anchors"
    ? { href: "#how-it-works", label: "See how it works" }
    : { href: "/lending", label: "View all features" }
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden"
      style={{ background: "#071219", backgroundImage: "repeating-linear-gradient(45deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 28px)", backgroundSize: "28px 28px" }}>
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(148,163,184,0.15) 0%, transparent 70%)" }} />
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(100,116,139,0.10) 0%, transparent 70%)" }} />
      <div className="relative max-w-6xl mx-auto px-6 py-24 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-600/10 border border-slate-600/20 text-slate-300 text-xs font-semibold mb-6">
          <Landmark className="w-3 h-3" />
          {variant.hero.badge}
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight mb-6">
          {variant.hero.titleLead}{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-300 to-slate-400">
            {variant.hero.titleAccent}
          </span>
        </h1>
        <p className="text-lg text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed">
          {variant.hero.subtitle}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=LENDING&plan=FREE`}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-semibold text-sm transition-all shadow-lg shadow-slate-600/20">
            Start free — no card needed <ChevronRight className="w-4 h-4" />
          </a>
          <a href={secondary.href} className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white font-medium text-sm transition-all border border-white/10">
            {secondary.label}
          </a>
          <a
            href="#book-demo"
            onClick={(e) => { e.preventDefault(); document.getElementById("book-demo")?.scrollIntoView({ behavior: "smooth" }) }}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white font-medium text-sm transition-all border border-white/10"
          >
            <CalendarCheck className="w-4 h-4" />
            Book a Demo
          </a>
        </div>
        <div className="mt-16 flex flex-wrap items-center justify-center gap-6 text-white/30 text-xs">
          {["No credit card required", "Free plan forever", "Setup in 5 minutes"].map((t) => (
            <span key={t} className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-slate-400" />{t}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

function Features({ variant }: { variant: LendingVariant }) {
  return (
    <section id="features" className="py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        <Animate className="text-center mb-16">
          <p className="text-slate-700 text-sm font-semibold uppercase tracking-widest mb-3">{variant.features.eyebrow}</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">
            {variant.features.heading}
          </h2>
          <p className="text-slate-500 mt-4 max-w-xl mx-auto">
            {variant.features.sub}
          </p>
        </Animate>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {FEATURES.map(({ icon: Icon, title, desc, color, shadow }, i) => (
            <Animate key={title} delay={i * 60}>
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

function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <Animate className="text-center mb-16">
          <p className="text-slate-700 text-sm font-semibold uppercase tracking-widest mb-3">How it works</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">
            Up and running in four steps
          </h2>
          <p className="text-slate-500 mt-4 max-w-xl mx-auto">
            Most lenders issue their first loan and generate their first amortization schedule within 30 minutes.
          </p>
        </Animate>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((s, i) => (
            <Animate key={s.num} delay={i * 80}>
              <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-100 flex items-center justify-center font-bold text-slate-700 text-sm">
                    {s.num}
                  </div>
                  <div className="h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent" />
                </div>
                <h3 className="font-bold text-slate-800 mb-2">{s.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            </Animate>
          ))}
        </div>
      </div>
    </section>
  )
}

function ComparisonTable({ showCta = false }: { showCta?: boolean }) {
  const { plans, isPhilippines } = usePricing("LENDING")
  const freePlan = plans.find(p => p.planKey === "FREE")
  const proPlan = plans.find(p => p.planKey === "PRO")
  const entPlan = plans.find(p => p.planKey === "ENTERPRISE")
  const proPrice = isPhilippines === null ? "…" : isPhilippines ? proPlan?.phpPrice : proPlan?.usdPrice
  const entPrice = isPhilippines === null ? "…" : isPhilippines ? entPlan?.phpPrice : entPlan?.usdPrice

  const limitRows = [
    { feature: "Borrowers", key: "borrowers" },
    { feature: "Active loans", key: "loans" },
    { feature: "Team users", key: "users" },
  ]

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-4xl mx-auto px-6">
        <Animate className="text-center mb-16">
          <p className="text-slate-700 text-sm font-semibold uppercase tracking-widest mb-3">Compare plans</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">Free vs. paid plans</h2>
          <p className="text-slate-500 mt-4">Start free and upgrade only when your loan book grows.</p>
        </Animate>
        <Animate>
          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm bg-white">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left px-6 py-4 text-slate-500 font-medium">Feature</th>
                  <th className="text-center px-6 py-4 text-slate-800 font-bold">Free</th>
                  <th className="text-center px-6 py-4 text-slate-800 font-bold bg-slate-100">Pro <span className="text-xs text-slate-400 font-normal">{proPrice}/mo</span></th>
                  <th className="text-center px-6 py-4 text-slate-800 font-bold">Enterprise <span className="text-xs text-slate-400 font-normal">{entPrice}/mo</span></th>
                </tr>
              </thead>
              <tbody>
                {limitRows.map(({ feature, key }, i) => (
                  <tr key={feature} className={`border-b border-slate-100 ${i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}`}>
                    <td className="px-6 py-4 text-slate-700 font-medium">{feature}</td>
                    <td className="text-center px-6 py-4"><span className="text-slate-700 font-medium">{limitDisplay(freePlan, key)}</span></td>
                    <td className="text-center px-6 py-4 bg-slate-100/50"><span className="text-slate-700 font-medium">{limitDisplay(proPlan, key)}</span></td>
                    <td className="text-center px-6 py-4"><span className="text-slate-700 font-medium">{limitDisplay(entPlan, key)}</span></td>
                  </tr>
                ))}
                {FEATURE_ROWS.map((row, i) => (
                  <tr key={row.feature} className={`border-b border-slate-100 ${(limitRows.length + i) % 2 === 0 ? "bg-white" : "bg-slate-50/50"}`}>
                    <td className="px-6 py-4 text-slate-700 font-medium">{row.feature}</td>
                    {[row.free, row.pro, row.enterprise].map((val, j) => (
                      <td key={j} className={`text-center px-6 py-4 ${j === 1 ? "bg-slate-100/50" : ""}`}>
                        {val ? <CheckCircle2 className="w-5 h-5 text-slate-600 mx-auto" /> : <XCircle className="w-5 h-5 text-slate-300 mx-auto" />}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Animate>
        {showCta && (
          <Animate className="text-center mt-10">
            <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=LENDING&plan=FREE`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-semibold text-sm transition-all shadow-lg shadow-slate-600/20">
              Start free today <ChevronRight className="w-4 h-4" />
            </a>
          </Animate>
        )}
      </div>
    </section>
  )
}

function Pricing() {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null)
  const { plans, isPhilippines } = usePricing("LENDING")

  const handleSelect = (p: Plan) => {
    if (p.planKey === "FREE") {
      window.location.href = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=${p.product}&plan=FREE`
      return
    }
    setSelectedPlan(p)
  }

  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <Animate className="text-center mb-16">
          <p className="text-slate-700 text-sm font-semibold uppercase tracking-widest mb-3">Pricing</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">Start free. Upgrade when you grow.</h2>
          <p className="text-slate-500 mt-4">The free plan stays free forever.</p>
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
                <div className={`rounded-2xl p-8 border transition-all duration-300 hover:-translate-y-1 ${p.highlight ? "bg-gradient-to-b from-slate-800 to-slate-900 border-slate-600/30 shadow-2xl shadow-slate-600/20 scale-105" : "bg-white border-slate-200 shadow-sm hover:shadow-md"}`}>
                  {p.highlight && <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-400/20 text-slate-200 text-xs font-semibold mb-4"><Zap className="w-3 h-3" /> Most popular</span>}
                  <p className={`font-bold text-lg mb-1 ${p.highlight ? "text-white" : "text-slate-800"}`}>{p.name}</p>
                  <p className={`text-sm mb-4 ${p.highlight ? "text-slate-200/60" : "text-slate-400"}`}>{p.desc}</p>
                  <div className="flex items-end gap-1 mb-6">
                    <span className={`text-4xl font-extrabold tracking-tight ${p.highlight ? "text-white" : "text-slate-800"}`}>{displayPrice}</span>
                    <span className={`text-sm mb-1 ${p.highlight ? "text-slate-200/50" : "text-slate-400"}`}>{p.period}</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-center gap-2.5 text-sm">
                        <CheckCircle2 className={`w-4 h-4 shrink-0 ${p.highlight ? "text-slate-300" : "text-slate-600"}`} />
                        <span className={p.highlight ? "text-slate-100/80" : "text-slate-600"}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <button onClick={() => handleSelect(p)} className={`w-full text-center py-2.5 rounded-xl text-sm font-semibold transition-all ${p.highlight ? "bg-slate-400 hover:bg-slate-300 text-slate-900 shadow-lg shadow-slate-400/25" : "bg-slate-700 hover:bg-slate-600 text-white shadow-md shadow-slate-600/20"}`}>{p.cta}</button>
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
    <section id="faq" className="py-24 bg-slate-50">
      <div className="max-w-2xl mx-auto px-6">
        <Animate className="text-center mb-16">
          <p className="text-slate-700 text-sm font-semibold uppercase tracking-widest mb-3">FAQ</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">Common questions</h2>
        </Animate>
        <div className="flex flex-col gap-3">
          {FAQS.map(({ q, a }, i) => (
            <Animate key={i} delay={i * 60}>
              <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
                <button onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left text-slate-700 font-medium text-sm hover:bg-slate-50 transition-colors">
                  {q}
                  <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${open === i ? "rotate-90" : ""}`} />
                </button>
                {open === i && (
                  <div className="px-5 pb-4 text-sm text-slate-500 leading-relaxed border-t border-slate-100 pt-3">{a}</div>
                )}
              </div>
            </Animate>
          ))}
        </div>
      </div>
    </section>
  )
}

function CTA({ variant }: { variant: LendingVariant }) {
  return (
    <section className="py-24 relative overflow-hidden"
      style={{ background: "#071219", backgroundImage: "repeating-linear-gradient(45deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 28px)", backgroundSize: "28px 28px" }}>
      <div className="absolute -top-40 -left-40 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(148,163,184,0.10) 0%, transparent 70%)" }} />
      <Animate className="relative max-w-2xl mx-auto px-6 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
          {variant.cta.heading}
        </h2>
        <p className="text-white/40 mb-8">{variant.cta.sub}</p>
        <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=LENDING&plan=FREE`}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-400 text-white font-semibold transition-all shadow-xl shadow-slate-600/20">
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
          <img src="/logo.png" alt="Smapey Lending" className="w-6 h-6 rounded-md object-cover" />
          <span className="text-white/60 text-sm font-semibold">Lending by Smapey</span>
        </div>
        <div className="flex items-center gap-5 text-white/40 text-xs">
          <a href="/lending/guide" className="hover:text-white/70 transition">Guide</a>
          <a href="/privacy-policy" className="hover:text-white/70 transition">Privacy</a>
          <a href="/terms-and-conditions" className="hover:text-white/70 transition">Terms</a>
          <a href="/" className="hover:text-white/70 transition">All Products</a>
        </div>
        <p className="text-white/20 text-xs">© {new Date().getFullYear()} Smapey</p>
      </div>
    </footer>
  )
}

type CheckoutMethod = "paypal" | "paymongo"
const Spinner = () => (
  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
  </svg>
)

function PaymentModal({ plan, isPhilippines, onClose }: { plan: Plan | null; isPhilippines: boolean; onClose: () => void }) {
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
        <div className="bg-gradient-to-r from-slate-800 to-slate-600 px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {step === "payment" && !token && (
              <button onClick={() => setStep("details")} className="text-white/60 hover:text-white transition">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
              </button>
            )}
            <div>
              <h2 className="text-white font-bold text-lg">{step === "details" ? "Create your account" : "Choose payment method"}</h2>
              <p className="text-slate-100 text-sm mt-0.5">{plan.name} plan — <span className="font-semibold">{displayPrice}</span>{plan.period}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-white/70 hover:text-white transition-colors"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-6 flex flex-col gap-4">
          {step === "details" && (
            <>
              <input placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-600/30 focus:border-slate-400" />
              <input type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-600/30 focus:border-slate-400" />
              <button onClick={handleContinue} disabled={loading !== null} className="w-full py-3 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-60">
                {loading ? <><Spinner /> Redirecting…</> : <>Continue <ChevronRight className="w-4 h-4" /></>}
              </button>
            </>
          )}
          {step === "payment" && (
            <>
              {isPhilippines && (
                <button onClick={() => checkout("paymongo")} disabled={loading !== null} className="w-full flex items-center gap-4 px-5 py-4 border-2 border-slate-200 rounded-2xl hover:border-green-500 hover:bg-green-50 transition-all group">
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
              <button onClick={() => checkout("paypal")} disabled={loading !== null} className="w-full flex items-center gap-4 px-5 py-4 border-2 border-slate-200 rounded-2xl hover:border-blue-500 hover:bg-blue-50 transition-all group">
                <div className="w-10 h-10 rounded-xl bg-[#003087] flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white"><path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c1.379 8.883-5.43 11.61-10.377 11.61H8.23l-1.133 7.184h3.78c.458 0 .848-.332.92-.783l.038-.196.728-4.617.047-.252a.93.93 0 0 1 .919-.784h.578c3.746 0 6.678-1.522 7.534-5.927.358-1.833.173-3.363-.42-4.494z"/></svg>
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
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
            Secure checkout · Cancel anytime · No hidden fees
          </p>
        </div>
      </div>
    </div>
  )
}

export default function LendingLanding({ variant }: { variant: LendingVariant }) {
  return (
    <main>
      <Navbar variant={variant} />
      <Hero variant={variant} />
      <Features variant={variant} />
      <HowItWorks />
      <ComparisonTable showCta={variant.navMode === "page"} />
      <Pricing />
      <FAQ />
      <BookDemoForm product="LENDING" />
      <CTA variant={variant} />
      <InternalLinks cluster="lending" currentPath={variant.currentPath} />
      <Footer />
    </main>
  )
}
