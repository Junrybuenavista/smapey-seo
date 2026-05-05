"use client"

import { useState, useEffect, useRef } from "react"
import {
  Users, CreditCard, Bell, Search, BarChart3, Shield,
  CheckCircle2, ChevronRight, Menu, X, Zap, UserPlus, RefreshCw,
} from "lucide-react"

const FEATURES = [
  {
    icon: UserPlus,
    title: "Member Registration",
    desc: "Add new members with full profiles — name, contact, emergency info, photo, and subscription history. Everything in one place.",
    color: "from-blue-600 to-blue-400",
    shadow: "shadow-blue-500/20",
  },
  {
    icon: CreditCard,
    title: "Subscription Plans",
    desc: "Create monthly, quarterly, or custom plans. Set pricing, duration, and renewal rules. Members are automatically marked as expired when their plan ends.",
    color: "from-amber-500 to-orange-400",
    shadow: "shadow-amber-500/20",
  },
  {
    icon: Bell,
    title: "Expiry Tracking",
    desc: "See every expiring membership at a glance on your dashboard. No more manually checking who's due for renewal.",
    color: "from-blue-500 to-cyan-400",
    shadow: "shadow-blue-400/20",
  },
  {
    icon: RefreshCw,
    title: "One-Click Renewal",
    desc: "Renew any expired membership with a single click. Choose the new plan, set the start date, and you're done.",
    color: "from-orange-500 to-amber-400",
    shadow: "shadow-orange-500/20",
  },
  {
    icon: Search,
    title: "Quick Member Search",
    desc: "Find any member instantly by name, email, or membership status. No more scrolling through spreadsheets.",
    color: "from-blue-700 to-blue-500",
    shadow: "shadow-blue-600/20",
  },
  {
    icon: BarChart3,
    title: "Membership Analytics",
    desc: "Track active vs. expired members, monthly growth, and revenue from memberships — all from a single dashboard.",
    color: "from-amber-600 to-yellow-400",
    shadow: "shadow-amber-500/20",
  },
  {
    icon: Users,
    title: "Member Status Flags",
    desc: "Active, expired, on-hold — members are clearly flagged so your staff always knows who can access the gym.",
    color: "from-blue-500 to-cyan-400",
    shadow: "shadow-blue-400/20",
  },
  {
    icon: Shield,
    title: "Role-Based Access",
    desc: "Invite staff to manage members without giving them full admin access. Control exactly what each team member can see and do.",
    color: "from-orange-600 to-amber-500",
    shadow: "shadow-orange-500/20",
  },
]

const STEPS = [
  { step: "01", title: "Add your members", desc: "Register members with their contact info, emergency contacts, and starting plan." },
  { step: "02", title: "Assign a plan", desc: "Attach a subscription plan to each member. Duration and expiry are tracked automatically." },
  { step: "03", title: "Monitor & renew", desc: "Get a live view of active, expiring, and expired members — and renew with one click." },
]

const FAQS = [
  {
    q: "How does expiry tracking work?",
    a: "When you assign a membership plan to a member, GymOS calculates the expiry date automatically. Expired members are flagged on your dashboard the moment their plan ends.",
  },
  {
    q: "Can I have different membership tiers?",
    a: "Yes. You can create as many plans as you need — day passes, monthly, quarterly, annual, or any custom duration — each with its own price.",
  },
  {
    q: "What happens when a member's subscription expires?",
    a: "The member is automatically marked as expired and flagged on your dashboard. You can renew them with a single click.",
  },
  {
    q: "Can staff renew memberships without admin access?",
    a: "Yes. You can grant staff the ability to renew memberships without giving them full admin access to your gym account.",
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
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden"
      style={{ background: "#0a0f1e", backgroundImage: "repeating-linear-gradient(45deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 28px)", backgroundSize: "28px 28px" }}>
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(251,191,36,0.1) 0%, transparent 70%)" }} />
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)" }} />
      <div className="relative max-w-6xl mx-auto px-6 py-24 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-6">
          <Zap className="w-3 h-3" />
          Member management made simple
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight mb-6">
          Gym membership management software{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-blue-400">
            that does the heavy lifting
          </span>
        </h1>
        <p className="text-lg text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed">
          Track every member, every plan, and every renewal — automatically. GymOS replaces your spreadsheets
          with a live dashboard that shows you exactly who's active, who's expiring, and who needs attention.
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
            Complete gym membership management
          </h2>
          <p className="text-slate-500 mt-4 max-w-xl mx-auto">
            Everything you need to manage members from sign-up to renewal — and everything in between.
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

function FAQ() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <section className="py-24 bg-slate-50">
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
      <Animate className="relative max-w-2xl mx-auto px-6 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
          Stop managing members in spreadsheets
        </h2>
        <p className="text-white/40 mb-8">Switch to GymOS and get full membership control from day one.</p>
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

export default function MembershipContent() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  )
}
