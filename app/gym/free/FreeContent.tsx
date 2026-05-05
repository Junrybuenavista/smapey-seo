"use client"

import { useState, useEffect, useRef } from "react"
import {
  Users, UserCheck, BarChart3, Shield, Globe,
  CheckCircle2, ChevronRight, Menu, X, Zap, XCircle, CreditCard,
} from "lucide-react"

const FREE_FEATURES = [
  {
    icon: Users,
    title: "Up to 50 Members",
    desc: "Register and manage up to 50 gym members completely free. Full profiles, contact info, and subscription history included.",
    color: "from-blue-600 to-blue-400",
    shadow: "shadow-blue-500/20",
  },
  {
    icon: UserCheck,
    title: "Walk-in Tracking",
    desc: "Record up to 50 walk-in visits per month. Track drop-in revenue separately from memberships.",
    color: "from-amber-500 to-orange-400",
    shadow: "shadow-amber-500/20",
  },
  {
    icon: CreditCard,
    title: "Subscription Plans",
    desc: "Create membership plans for your members. Track expiry dates automatically — no spreadsheets needed.",
    color: "from-blue-500 to-cyan-400",
    shadow: "shadow-blue-400/20",
  },
  {
    icon: BarChart3,
    title: "Basic Dashboard",
    desc: "See your active members, recent walk-ins, and expiring memberships from a single live dashboard.",
    color: "from-orange-500 to-amber-400",
    shadow: "shadow-orange-500/20",
  },
  {
    icon: Shield,
    title: "2 Team Members",
    desc: "Invite one staff member to help manage your gym. Role-based access keeps your data secure.",
    color: "from-blue-700 to-blue-500",
    shadow: "shadow-blue-600/20",
  },
  {
    icon: Globe,
    title: "Multi-Currency",
    desc: "Display prices in your local currency. PHP, USD, SGD, and more supported out of the box.",
    color: "from-amber-600 to-yellow-400",
    shadow: "shadow-amber-500/20",
  },
]

const COMPARISON = [
  { feature: "Members", free: "Up to 50", pro: "Up to 100", enterprise: "Unlimited" },
  { feature: "Walk-in visits / month", free: "50", pro: "Unlimited", enterprise: "Unlimited" },
  { feature: "Team members", free: "2", pro: "5", enterprise: "Unlimited" },
  { feature: "Manual check-in", free: true, pro: true, enterprise: true },
  { feature: "QR code check-in", free: false, pro: true, enterprise: true },
  { feature: "Advanced analytics", free: false, pro: false, enterprise: true },
  { feature: "Priority support", free: false, pro: false, enterprise: true },
]

const FAQS = [
  {
    q: "Is the free plan really free forever?",
    a: "Yes. The Free plan has no time limit and no credit card is required. You can run your gym on it as long as you like.",
  },
  {
    q: "What happens when I hit 50 members?",
    a: "You'll be prompted to upgrade to the Pro plan to add more members. Your existing data is never deleted.",
  },
  {
    q: "Can I upgrade anytime?",
    a: "Yes. You can upgrade from Free to Pro or Enterprise at any time directly from your dashboard.",
  },
  {
    q: "Is QR code check-in available on the free plan?",
    a: "QR code check-in is a Pro feature. The Free plan includes manual check-in. You can upgrade anytime to unlock QR check-in.",
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
          <a href="/gym/pricing" className="text-sm text-white/60 hover:text-white transition-colors">Pricing</a>
          <a href="/gym/guide" className="text-sm text-white/60 hover:text-white transition-colors">Guide</a>
        </div>
        <div className="hidden md:flex items-center gap-3">
          <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/login`} className="text-sm text-white/60 hover:text-white transition-colors px-4 py-2">Sign in</a>
          <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=GYM&plan=FREE`}
            className="text-sm font-semibold px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-colors shadow-lg shadow-blue-600/25">
            Get started free
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
            Get started free
          </a>
        </div>
      )}
    </nav>
  )
}

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden"
      style={{ background: "#0a0f1e", backgroundImage: "repeating-linear-gradient(45deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 28px)", backgroundSize: "28px 28px" }}>
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(251,191,36,0.1) 0%, transparent 70%)" }} />
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)" }} />
      <div className="relative max-w-6xl mx-auto px-6 py-24 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-6">
          <Zap className="w-3 h-3" />
          Free forever — no credit card required
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight mb-6">
          Free gym management software{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-blue-400">
            that actually works
          </span>
        </h1>
        <p className="text-lg text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed">
          GymOS gives you a full gym management system at zero cost. Manage up to 50 members, track walk-ins,
          handle subscriptions, and monitor your gym — all for free, forever.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=GYM&plan=FREE`}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all shadow-lg shadow-blue-600/30">
            Start free — no card needed <ChevronRight className="w-4 h-4" />
          </a>
          <a href="#whats-included"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white font-medium text-sm transition-all border border-white/10">
            See what's included
          </a>
        </div>
        <div className="mt-16 flex flex-wrap items-center justify-center gap-6 text-white/30 text-xs">
          {["No credit card required", "Free plan forever", "Setup in 2 minutes"].map((t) => (
            <span key={t} className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />{t}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

function WhatsIncluded() {
  return (
    <section id="whats-included" className="py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        <Animate className="text-center mb-16">
          <p className="text-blue-600 text-sm font-semibold uppercase tracking-widest mb-3">Free Plan</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">
            What's included in the free plan
          </h2>
          <p className="text-slate-500 mt-4 max-w-xl mx-auto">
            No trial period. No feature lockouts after 14 days. This is what you get, forever.
          </p>
        </Animate>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FREE_FEATURES.map(({ icon: Icon, title, desc, color, shadow }, i) => (
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

function ComparisonTable() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <Animate className="text-center mb-16">
          <p className="text-blue-600 text-sm font-semibold uppercase tracking-widest mb-3">Compare Plans</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">Free vs. paid plans</h2>
          <p className="text-slate-500 mt-4">Start free and upgrade only when you're ready.</p>
        </Animate>
        <Animate>
          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left px-6 py-4 text-slate-500 font-medium">Feature</th>
                  <th className="text-center px-6 py-4 text-slate-800 font-bold">Free</th>
                  <th className="text-center px-6 py-4 text-blue-700 font-bold bg-blue-50">Pro <span className="text-xs text-blue-400 font-normal">$15/mo</span></th>
                  <th className="text-center px-6 py-4 text-slate-800 font-bold">Enterprise <span className="text-xs text-slate-400 font-normal">$29/mo</span></th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row, i) => (
                  <tr key={row.feature} className={`border-b border-slate-100 ${i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}`}>
                    <td className="px-6 py-4 text-slate-700 font-medium">{row.feature}</td>
                    {[row.free, row.pro, row.enterprise].map((val, j) => (
                      <td key={j} className={`text-center px-6 py-4 ${j === 1 ? "bg-blue-50/50" : ""}`}>
                        {typeof val === "boolean" ? (
                          val
                            ? <CheckCircle2 className="w-5 h-5 text-blue-500 mx-auto" />
                            : <XCircle className="w-5 h-5 text-slate-300 mx-auto" />
                        ) : (
                          <span className="text-slate-700 font-medium">{val}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Animate>
        <Animate className="text-center mt-8">
          <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=GYM&plan=FREE`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all shadow-lg shadow-blue-600/30">
            Get started free <ChevronRight className="w-4 h-4" />
          </a>
        </Animate>
      </div>
    </section>
  )
}

function FAQ() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-2xl mx-auto px-6">
        <Animate className="text-center mb-16">
          <p className="text-blue-600 text-sm font-semibold uppercase tracking-widest mb-3">FAQ</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">Questions about the free plan</h2>
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
          Start managing your gym for free
        </h2>
        <p className="text-white/40 mb-8">No card, no trial, no catch. Just free gym management software that works.</p>
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

export default function FreeContent() {
  return (
    <main>
      <Navbar />
      <Hero />
      <WhatsIncluded />
      <ComparisonTable />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  )
}
