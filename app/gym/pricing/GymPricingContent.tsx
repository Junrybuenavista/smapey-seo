"use client"

import { useState, useEffect, useRef } from "react"
import {
  CheckCircle2, ChevronRight, Menu, X, Zap, XCircle,
} from "lucide-react"

const PLANS = [
  {
    name: "Free",
    phpPrice: "₱0",
    usdPrice: "$0",
    period: "/mo",
    planKey: "FREE",
    product: "GYM",
    desc: "Perfect for small gyms just getting started.",
    features: [
      { text: "Up to 50 members", included: true },
      { text: "50 walk-in visits / month", included: true },
      { text: "2 team members", included: true },
      { text: "Manual check-in", included: true },
      { text: "QR code check-in", included: false },
      { text: "Advanced analytics", included: false },
      { text: "Priority support", included: false },
    ],
    cta: "Get started free",
    highlight: false,
  },
  {
    name: "Pro",
    phpPrice: "₱999",
    usdPrice: "$15",
    period: "/mo",
    planKey: "PRO",
    product: "GYM",
    desc: "For growing gyms that need more power.",
    features: [
      { text: "Up to 100 members", included: true },
      { text: "Unlimited walk-in visits", included: true },
      { text: "5 team members", included: true },
      { text: "Manual check-in", included: true },
      { text: "QR code check-in", included: true },
      { text: "Advanced analytics", included: false },
      { text: "Priority support", included: false },
    ],
    cta: "Start Pro",
    highlight: true,
  },
  {
    name: "Enterprise",
    phpPrice: "₱1,499",
    usdPrice: "$29",
    period: "/mo",
    planKey: "ENTERPRISE",
    product: "GYM",
    desc: "For large gyms and multi-branch operations.",
    features: [
      { text: "Unlimited members", included: true },
      { text: "Unlimited walk-in visits", included: true },
      { text: "Unlimited team members", included: true },
      { text: "Manual check-in", included: true },
      { text: "QR code check-in", included: true },
      { text: "Advanced analytics", included: true },
      { text: "Priority support", included: true },
    ],
    cta: "Get Enterprise",
    highlight: false,
  },
]

const FAQS = [
  {
    q: "Is the free plan really free forever?",
    a: "Yes. The Free plan has no time limit. You can run your gym on it as long as you like. Upgrade only when you need more capacity.",
  },
  {
    q: "Are there any hidden fees?",
    a: "No. The price you see is what you pay. No setup fees, no per-member fees, no surprise charges.",
  },
  {
    q: "Can I cancel my subscription anytime?",
    a: "Yes. Cancel anytime from your dashboard. You keep access until the end of your billing period.",
  },
  {
    q: "Do you offer annual billing?",
    a: "Monthly billing is available now. Annual plans with a discount are coming soon — contact us if you need one today.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept PayPal worldwide. For Philippine customers, we also accept GCash, QR Ph, and card payments via PayMongo.",
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
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#0a0f1e]/90 backdrop-blur-md border-b border-white/5 shadow-lg" : "bg-transparent"}`}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <img src="/logo.png" alt="GymOS" className="w-8 h-8 rounded-lg object-cover" />
          <span className="text-white font-bold tracking-tight">Smapey GymOS</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <a href="/gym" className="text-sm text-white/60 hover:text-white transition-colors">Home</a>
          <a href="/gym/guide" className="text-sm text-white/60 hover:text-white transition-colors">Guide</a>
          <a href="#faq" className="text-sm text-white/60 hover:text-white transition-colors">FAQ</a>
        </div>
        <div className="hidden md:flex items-center gap-3">
          <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/login`} className="text-sm text-white/60 hover:text-white transition-colors px-4 py-2">Sign in</a>
          <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=GYM&plan=FREE`}
            className="text-sm font-semibold px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-colors shadow-lg shadow-blue-600/25">
            Get started
          </a>
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden text-white/60 hover:text-white">
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-[#0a0f1e] border-t border-white/5 px-6 py-4 flex flex-col gap-4">
          <a href="/gym" className="text-sm text-white/60 hover:text-white transition-colors">Home</a>
          <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=GYM&plan=FREE`}
            className="text-sm font-semibold px-4 py-2 rounded-lg bg-blue-600 text-white text-center">
            Get started
          </a>
        </div>
      )}
    </nav>
  )
}

function Hero() {
  return (
    <section className="relative min-h-[50vh] flex items-center pt-16 overflow-hidden"
      style={{ background: "#0a0f1e", backgroundImage: "repeating-linear-gradient(45deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 28px)", backgroundSize: "28px 28px" }}>
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(251,191,36,0.1) 0%, transparent 70%)" }} />
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)" }} />
      <div className="relative max-w-6xl mx-auto px-6 py-24 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-6">
          <Zap className="w-3 h-3" />
          No hidden fees
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight mb-6">
          Gym management software{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-blue-400">
            pricing that makes sense
          </span>
        </h1>
        <p className="text-lg text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed">
          Start free. Pay only when you need more. No contracts, no setup fees, no per-member charges.
          Cancel anytime.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-6 text-white/30 text-xs">
          {["No credit card required", "Free plan forever", "Cancel anytime"].map((t) => (
            <span key={t} className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />{t}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

function PricingTable() {
  const [isPhilippines, setIsPhilippines] = useState<boolean | null>(null)
  useEffect(() => {
    const tzFallback = Intl.DateTimeFormat().resolvedOptions().timeZone === "Asia/Manila"
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/billing/geo`)
      .then(r => r.json()).then(d => setIsPhilippines(d.isPhilippines ?? tzFallback))
      .catch(() => setIsPhilippines(tzFallback))
  }, [])

  const handleSelect = (p: typeof PLANS[0]) => {
    window.location.href = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=${p.product}&plan=${p.planKey}`
  }

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        {isPhilippines !== null && (
          <div className="flex justify-center mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-xs text-slate-500 shadow-sm">
              <span>{isPhilippines ? "🇵🇭" : "🌍"}</span>
              <span>Prices in <span className="font-semibold text-slate-700">{isPhilippines ? "Philippine Peso (₱)" : "US Dollar ($)"}</span></span>
            </div>
          </div>
        )}
        <div className="grid md:grid-cols-3 gap-6 items-start">
          {PLANS.map((p, i) => {
            const displayPrice = isPhilippines === null ? "..." : isPhilippines ? p.phpPrice : p.usdPrice
            return (
              <Animate key={p.name} delay={i * 100}>
                <div className={`rounded-2xl p-8 border transition-all duration-300 hover:-translate-y-1 ${p.highlight ? "bg-gradient-to-b from-blue-700 to-blue-900 border-blue-500/30 shadow-2xl shadow-blue-600/20 scale-105" : "bg-white border-slate-200 shadow-sm hover:shadow-md"}`}>
                  {p.highlight && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-semibold mb-4">
                      <Zap className="w-3 h-3" /> Most popular
                    </span>
                  )}
                  <p className={`font-bold text-lg mb-1 ${p.highlight ? "text-white" : "text-slate-800"}`}>{p.name}</p>
                  <p className={`text-sm mb-4 ${p.highlight ? "text-blue-200/60" : "text-slate-400"}`}>{p.desc}</p>
                  <div className="flex items-end gap-1 mb-6">
                    <span className={`text-4xl font-extrabold tracking-tight ${p.highlight ? "text-white" : "text-slate-800"}`}>{displayPrice}</span>
                    <span className={`text-sm mb-1 ${p.highlight ? "text-blue-200/50" : "text-slate-400"}`}>{p.period}</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {p.features.map((f) => (
                      <li key={f.text} className="flex items-center gap-2.5 text-sm">
                        {f.included
                          ? <CheckCircle2 className={`w-4 h-4 shrink-0 ${p.highlight ? "text-amber-400" : "text-blue-500"}`} />
                          : <XCircle className="w-4 h-4 shrink-0 text-slate-300" />}
                        <span className={f.included ? (p.highlight ? "text-blue-100/80" : "text-slate-600") : "text-slate-400 line-through"}>{f.text}</span>
                      </li>
                    ))}
                  </ul>
                  <button onClick={() => handleSelect(p)}
                    className={`w-full text-center py-2.5 rounded-xl text-sm font-semibold transition-all ${p.highlight ? "bg-amber-400 hover:bg-amber-300 text-amber-900 shadow-lg shadow-amber-400/25" : "bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/20"}`}>
                    {p.cta}
                  </button>
                </div>
              </Animate>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function FAQ() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-2xl mx-auto px-6">
        <Animate className="text-center mb-16">
          <p className="text-blue-600 text-sm font-semibold uppercase tracking-widest mb-3">FAQ</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">Pricing questions</h2>
        </Animate>
        <div className="flex flex-col gap-3">
          {FAQS.map(({ q, a }, i) => (
            <Animate key={i} delay={i * 60}>
              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <button onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left text-slate-700 font-medium text-sm hover:bg-slate-50 transition-colors">
                  {q}
                  <ChevronRight className={`w-4 h-4 text-blue-400 transition-transform duration-200 shrink-0 ${open === i ? "rotate-90" : ""}`} />
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

function CTA() {
  return (
    <section className="py-24 relative overflow-hidden"
      style={{ background: "#0a0f1e", backgroundImage: "repeating-linear-gradient(45deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 28px)", backgroundSize: "28px 28px" }}>
      <div className="absolute -top-40 -left-40 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(251,191,36,0.07) 0%, transparent 70%)" }} />
      <Animate className="relative max-w-2xl mx-auto px-6 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
          Start free. No card needed.
        </h2>
        <p className="text-white/40 mb-8">Try GymOS at no cost. Upgrade when you're ready to grow.</p>
        <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=GYM&plan=FREE`}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-blue-500 hover:from-amber-300 hover:to-blue-400 text-white font-semibold transition-all shadow-xl shadow-blue-600/20">
          Get started for free <ChevronRight className="w-4 h-4" />
        </a>
      </Animate>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-[#060b16] border-t border-white/5 px-6 py-8">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="GymOS" className="w-6 h-6 rounded-md object-cover" />
          <span className="text-white/60 text-sm font-semibold">GymOS</span>
        </div>
        <p className="text-white/20 text-xs">© {new Date().getFullYear()} GymOS. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default function GymPricingContent() {
  return (
    <main>
      <Navbar />
      <Hero />
      <PricingTable />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  )
}
