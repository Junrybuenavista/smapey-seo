"use client"

import { useState, useEffect, useRef } from "react"
import {
  Dumbbell, QrCode, Users, BarChart3, CreditCard,
  Zap, CheckCircle2, ChevronRight, Menu, X, UserCheck,
  Target, Clock, Trophy,
} from "lucide-react"

const FEATURES = [
  {
    icon: Users,
    title: "Box Member Management",
    desc: "Register every athlete with full profiles, emergency contacts, and membership history. Know exactly who's active, expired, or on hold.",
    color: "from-blue-600 to-blue-400",
    shadow: "shadow-blue-500/20",
  },
  {
    icon: QrCode,
    title: "QR Code Check-in",
    desc: "Athletes scan their personal QR code to check in for class. No front desk bottleneck — fast, contactless, and automatic.",
    color: "from-amber-500 to-orange-400",
    shadow: "shadow-amber-500/20",
  },
  {
    icon: Clock,
    title: "Class Attendance Tracking",
    desc: "Track who showed up for each class session. See attendance trends and identify members who are dropping off before they churn.",
    color: "from-blue-500 to-cyan-400",
    shadow: "shadow-blue-400/20",
  },
  {
    icon: CreditCard,
    title: "Membership Plans",
    desc: "Create unlimited/drop-in/monthly plans. Set prices, durations, and renewal rules. Expiry alerts keep your revenue consistent.",
    color: "from-orange-500 to-amber-400",
    shadow: "shadow-orange-500/20",
  },
  {
    icon: BarChart3,
    title: "Box Analytics",
    desc: "Monitor revenue, peak class hours, attendance rates, and member growth from a single dashboard built for box owners.",
    color: "from-blue-700 to-blue-500",
    shadow: "shadow-blue-600/20",
  },
  {
    icon: Dumbbell,
    title: "Coach Assignment",
    desc: "Assign coaches to members or classes. Track their specialties and manage their active status with ease.",
    color: "from-amber-600 to-yellow-400",
    shadow: "shadow-amber-500/20",
  },
  {
    icon: UserCheck,
    title: "Drop-in / Walk-in Tracking",
    desc: "Record drop-in visitors in seconds. Track drop-in revenue separately and see today's visitors at a glance.",
    color: "from-blue-500 to-cyan-400",
    shadow: "shadow-blue-400/20",
  },
  {
    icon: Target,
    title: "Multi-Currency Support",
    desc: "Accept payments in your local currency — PHP, USD, SGD, and more. Perfect for boxes serving international athletes.",
    color: "from-orange-600 to-amber-500",
    shadow: "shadow-orange-500/20",
  },
  {
    icon: Trophy,
    title: "Team Collaboration",
    desc: "Invite coaches and staff to the dashboard with role-based access. Admins see everything; staff see only what they need.",
    color: "from-amber-500 to-orange-500",
    shadow: "shadow-amber-500/20",
  },
]

const STEPS = [
  { step: "01", title: "Set up your box", desc: "Sign up and configure your CrossFit gym profile in under 2 minutes." },
  { step: "02", title: "Add athletes & plans", desc: "Register members and create the membership plans your box offers." },
  { step: "03", title: "Track every class", desc: "Athletes scan QR codes, check-ins are logged, and you see it all in real time." },
]

const PLANS = [
  {
    name: "Free",
    phpPrice: "₱0",
    usdPrice: "$0",
    period: "/mo",
    planKey: "FREE",
    product: "GYM",
    desc: "Perfect for small boxes just getting started.",
    features: ["Up to 50 members", "50 drop-in visits / month", "2 team members", "Manual check-in"],
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
    desc: "For growing boxes that need more power.",
    features: ["Up to 100 members", "Unlimited drop-in visits", "5 team members", "QR code check-in"],
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
    desc: "For large boxes and multi-location operations.",
    features: ["Unlimited members", "Unlimited drop-in visits", "Unlimited team members", "Everything in Pro", "Advanced analytics", "Priority support"],
    cta: "Get Enterprise",
    highlight: false,
  },
]

const FAQS = [
  {
    q: "Is this built specifically for CrossFit gyms?",
    a: "GymOS works for any gym type, including CrossFit boxes. Features like drop-in tracking, QR check-in, and coach assignment map directly to how CrossFit boxes operate.",
  },
  {
    q: "Can I track drop-in athletes separately from members?",
    a: "Yes. Walk-in/drop-in visits are tracked separately from subscriptions, with their own revenue line in your dashboard.",
  },
  {
    q: "Do athletes need to download an app?",
    a: "No. Athletes receive a personal QR code they can save to their phone or print. No app install required.",
  },
  {
    q: "Can I assign coaches to specific athletes?",
    a: "Yes. You can assign any active coach to any member and update assignments anytime.",
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
          {["Features", "Pricing", "FAQ"].map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} className="text-sm text-white/60 hover:text-white transition-colors">{l}</a>
          ))}
          <a href="/gym/guide" className="text-sm text-white/60 hover:text-white transition-colors">Guide</a>
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
          <a href="/gym/guide" className="text-sm text-white/60 hover:text-white transition-colors">Guide</a>
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
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden"
      style={{ background: "#0a0f1e", backgroundImage: "repeating-linear-gradient(45deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 28px)", backgroundSize: "28px 28px" }}>
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(251,191,36,0.1) 0%, transparent 70%)" }} />
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)" }} />
      <div className="relative max-w-6xl mx-auto px-6 py-24 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-6">
          <Zap className="w-3 h-3" />
          Built for CrossFit boxes
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight mb-6">
          CrossFit gym management software{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-blue-400">
            built for boxes
          </span>
        </h1>
        <p className="text-lg text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed">
          GymOS handles athlete management, QR check-in, drop-in tracking, coach assignment, and revenue reporting —
          so you can focus on programming and coaching.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=GYM&plan=FREE`}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all shadow-lg shadow-blue-600/30">
            Start for free <ChevronRight className="w-4 h-4" />
          </a>
          <a href="#features"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white font-medium text-sm transition-all border border-white/10">
            See features
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

function Features() {
  return (
    <section id="features" className="py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        <Animate className="text-center mb-16">
          <p className="text-blue-600 text-sm font-semibold uppercase tracking-widest mb-3">Features</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">
            Everything your CrossFit box needs
          </h2>
          <p className="text-slate-500 mt-4 max-w-xl mx-auto">
            From athlete check-in to monthly revenue — GymOS covers every part of your box's operation.
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

function HowItWorks() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <Animate className="text-center mb-16">
          <p className="text-blue-600 text-sm font-semibold uppercase tracking-widest mb-3">How it Works</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">Up and running in minutes</h2>
        </Animate>
        <div className="grid md:grid-cols-3 gap-8">
          {STEPS.map(({ step, title, desc }, i) => (
            <Animate key={step} delay={i * 120}>
              <div className="relative text-center group">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-50 border-2 border-blue-100 text-blue-600 font-extrabold text-lg mb-5 group-hover:bg-gradient-to-tr group-hover:from-amber-400 group-hover:to-blue-500 group-hover:text-white group-hover:border-transparent transition-all duration-300">
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

function Pricing() {
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
    <section id="pricing" className="py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        <Animate className="text-center mb-16">
          <p className="text-blue-600 text-sm font-semibold uppercase tracking-widest mb-3">Pricing</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">Simple, transparent pricing</h2>
          <p className="text-slate-500 mt-4">Start free. Scale as your box grows.</p>
          {isPhilippines !== null && (
            <div className="inline-flex items-center gap-1.5 mt-4 px-3 py-1 rounded-full bg-white border border-slate-200 text-xs text-slate-500 shadow-sm">
              <span>{isPhilippines ? "🇵🇭" : "🌍"}</span>
              <span>Prices in <span className="font-semibold text-slate-700">{isPhilippines ? "Philippine Peso (₱)" : "US Dollar ($)"}</span></span>
            </div>
          )}
        </Animate>
        <div className="grid md:grid-cols-3 gap-6 items-center">
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
                      <li key={f} className="flex items-center gap-2.5 text-sm">
                        <CheckCircle2 className={`w-4 h-4 shrink-0 ${p.highlight ? "text-amber-400" : "text-blue-500"}`} />
                        <span className={p.highlight ? "text-blue-100/80" : "text-slate-600"}>{f}</span>
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
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">Common questions</h2>
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
      <div className="absolute -bottom-40 -right-40 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)" }} />
      <Animate className="relative max-w-2xl mx-auto px-6 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
          Ready to modernize your CrossFit box?
        </h2>
        <p className="text-white/40 mb-8">Join box owners who trust GymOS to run their operations.</p>
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

export default function CrossfitContent() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  )
}
