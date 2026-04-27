"use client"

import { useState, useEffect, useRef } from "react"
import {
  Dumbbell, QrCode, Users, BarChart3, CreditCard,
  Zap, CheckCircle2, ChevronRight, Menu, X, UserCheck,
  DollarSign, Globe, UserPlus,
} from "lucide-react"

const NAV_LINKS = ["Features", "How it Works", "Pricing", "FAQ"]

const FEATURES = [
  {
    icon: Users,
    title: "Member Management",
    desc: "Register, track, and manage all your gym members in one place. Full profile, emergency contacts, and subscription history.",
    color: "from-blue-600 to-blue-400",
    shadow: "shadow-blue-500/20",
  },
  {
    icon: QrCode,
    title: "QR Code Check-in",
    desc: "Members check in instantly by scanning their personal QR code. No more manual logs or long queues at the front desk.",
    color: "from-amber-500 to-orange-400",
    shadow: "shadow-amber-500/20",
  },
  {
    icon: UserCheck,
    title: "Walk-in Tracking",
    desc: "Record one-day visitors in seconds. Track walk-in revenue separately and see today's drop-ins at a glance.",
    color: "from-blue-500 to-cyan-400",
    shadow: "shadow-blue-400/20",
  },
  {
    icon: CreditCard,
    title: "Subscription Plans",
    desc: "Create flexible plans, set durations and pricing, and handle renewals with automatic expiry tracking.",
    color: "from-orange-500 to-amber-400",
    shadow: "shadow-orange-500/20",
  },
  {
    icon: BarChart3,
    title: "Gym Analytics",
    desc: "Track revenue trends, peak hours, attendance patterns, and member growth — all from a single dashboard.",
    color: "from-blue-700 to-blue-500",
    shadow: "shadow-blue-600/20",
  },
  {
    icon: Dumbbell,
    title: "Trainer Assignment",
    desc: "Assign certified trainers to members, track their specialties, and manage their active status with ease.",
    color: "from-amber-600 to-yellow-400",
    shadow: "shadow-amber-500/20",
  },
  {
    icon: DollarSign,
    title: "Multi-Currency",
    desc: "Accept and display payments in your local currency. Full support for PHP, USD, SGD, and more out of the box.",
    color: "from-orange-600 to-amber-500",
    shadow: "shadow-orange-500/20",
  },
  {
    icon: Globe,
    title: "Multi-Timezone",
    desc: "Run your gym in any timezone. Check-ins, reports, and dashboards always reflect your local time accurately.",
    color: "from-blue-600 to-blue-400",
    shadow: "shadow-blue-500/20",
  },
  {
    icon: UserPlus,
    title: "Team Collaboration",
    desc: "Invite staff to your gym dashboard. Assign Admin or Member-level access so everyone only sees what they need.",
    color: "from-amber-500 to-orange-500",
    shadow: "shadow-amber-500/20",
  },
]

const STEPS = [
  { step: "01", title: "Create your gym", desc: "Sign up and set up your gym profile in under 2 minutes." },
  { step: "02", title: "Add members & plans", desc: "Register members and create subscription plans that fit your pricing." },
  { step: "03", title: "Start checking in", desc: "Members scan their QR code and you track everything automatically." },
]

const PLANS = [
  {
    name: "Free",
    price: "₱0",
    period: "/mo",
    planKey: "FREE",
    product: "GYM",
    desc: "Perfect for small gyms just getting started.",
    features: ["Up to 10 members", "Up to 50 walk-ins/mo", "QR check-in", "Basic dashboard", "1 trainer"],
    cta: "Get started free",
    highlight: false,
  },
  {
    name: "Pro",
    price: "₱999",
    period: "/mo",
    planKey: "PRO",
    product: "GYM",
    desc: "For growing gyms that need more power.",
    features: ["Up to 500 members", "Unlimited walk-ins", "Revenue analytics", "Trainer management", "Priority support"],
    cta: "Start Pro trial",
    highlight: true,
  },
  {
    name: "Business",
    price: "₱2,499",
    period: "/mo",
    planKey: "ENTERPRISE",
    product: "GYM",
    desc: "For large gyms and multi-branch operations.",
    features: ["Unlimited members", "Unlimited walk-ins", "Advanced analytics", "Multi-trainer support", "Dedicated support"],
    cta: "Contact sales",
    highlight: false,
  },
]

const FAQS = [
  {
    q: "Do members need to install an app?",
    a: "No. Members receive a QR code they can save to their phone or print. No app needed.",
  },
  {
    q: "Can I track walk-in revenue separately?",
    a: "Yes. Walk-in revenue is tracked separately from subscription revenue in your dashboard.",
  },
  {
    q: "What happens when a subscription expires?",
    a: "Expired members are flagged on your dashboard. You can renew them with one click.",
  },
  {
    q: "Can I assign different trainers to different members?",
    a: "Yes. You can assign any active trainer to any member and change assignments anytime.",
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
      scrolled ? "bg-[#0a0f1e]/90 backdrop-blur-md border-b border-white/5 shadow-lg" : "bg-transparent"
    }`}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* LOGO */}
       <div className="flex items-center gap-2.5">
  <img src="/logo.png" alt="GymOS" className="w-8 h-8 rounded-lg object-cover" />
  <span className="text-white font-bold tracking-tight">Smapey GymOS</span>
</div>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <a key={l}
              href={`#${l.toLowerCase().replace(/\s+/g, "-")}`}
              onClick={(e) => scrollTo(e, l.toLowerCase().replace(/\s+/g, "-"))}
              className="text-sm text-white/60 hover:text-white transition-colors">
              {l}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/login`} className="text-sm text-white/60 hover:text-white transition-colors px-4 py-2">
            Sign in
          </a>
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
          {NAV_LINKS.map((l) => (
            <a key={l}
              href={`#${l.toLowerCase().replace(/\s+/g, "-")}`}
              onClick={(e) => scrollTo(e, l.toLowerCase().replace(/\s+/g, "-"))}
              className="text-sm text-white/60 hover:text-white transition-colors">
              {l}
            </a>
          ))}
          <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=GYM&plan=FREE`}
            className="text-sm font-semibold px-4 py-2 rounded-lg bg-blue-600 text-white text-center">
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
        background: "#0a0f1e",
        backgroundImage:
          "repeating-linear-gradient(45deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 28px)",
        backgroundSize: "28px 28px",
      }}
    >
      {/* Amber glow left */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(251,191,36,0.1) 0%, transparent 70%)" }} />
      {/* Blue glow right */}
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)" }} />

      <div className="relative max-w-6xl mx-auto px-6 py-24 text-center">

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-6">
          <Zap className="w-3 h-3" />
          Built for modern gyms
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight mb-6">
          Run your gym smarter,{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-blue-400">
            not harder
          </span>
        </h1>

        <p className="text-lg text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed">
          GymOS handles member management, QR check-ins, subscription tracking, and revenue reporting —
          so you can focus on what matters: your members.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=GYM&plan=FREE`}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all shadow-lg shadow-blue-600/30">
            Start for free
            <ChevronRight className="w-4 h-4" />
          </a>
          <a href="#features"
            onClick={(e) => { e.preventDefault(); document.getElementById("features")?.scrollIntoView({ behavior: "smooth" }) }}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white font-medium text-sm transition-all border border-white/10">
            See features
          </a>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-center gap-6 text-white/30 text-xs">
          {["No credit card required", "Free plan forever", "Setup in 2 minutes"].map((t) => (
            <span key={t} className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
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
          <p className="text-blue-600 text-sm font-semibold uppercase tracking-widest mb-3">Features</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">
            Everything your gym needs
          </h2>
          <p className="text-slate-500 mt-4 max-w-xl mx-auto">
            From the front desk to your finances — GymOS covers every part of your operation.
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
          <p className="text-blue-600 text-sm font-semibold uppercase tracking-widest mb-3">How it Works</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">
            Up and running in minutes
          </h2>
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

//////////////////////////////////////////////////////
// PRICING
//////////////////////////////////////////////////////
function Pricing() {
  const [selectedPlan, setSelectedPlan] = useState<typeof PLANS[0] | null>(null)

  const handleSelect = (p: typeof PLANS[0]) => {
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
          <p className="text-blue-600 text-sm font-semibold uppercase tracking-widest mb-3">Pricing</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">
            Simple, transparent pricing
          </h2>
          <p className="text-slate-500 mt-4">Start free. Scale as you grow.</p>
        </Animate>

        <div className="grid md:grid-cols-3 gap-6 items-center">
          {PLANS.map((p, i) => (
            <Animate key={p.name} delay={i * 100}>
              <div className={`rounded-2xl p-8 border transition-all duration-300 hover:-translate-y-1 ${
                p.highlight
                  ? "bg-gradient-to-b from-blue-700 to-blue-900 border-blue-500/30 shadow-2xl shadow-blue-600/20 scale-105"
                  : "bg-white border-slate-200 shadow-sm hover:shadow-md"
              }`}>
                {p.highlight && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-semibold mb-4">
                    <Zap className="w-3 h-3" /> Most popular
                  </span>
                )}
                <p className={`font-bold text-lg mb-1 ${p.highlight ? "text-white" : "text-slate-800"}`}>{p.name}</p>
                <p className={`text-sm mb-4 ${p.highlight ? "text-blue-200/60" : "text-slate-400"}`}>{p.desc}</p>
                <div className="flex items-end gap-1 mb-6">
                  <span className={`text-4xl font-extrabold tracking-tight ${p.highlight ? "text-white" : "text-slate-800"}`}>
                    {p.price}
                  </span>
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

                <button
                  onClick={() => handleSelect(p)}
                  className={`w-full text-center py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    p.highlight
                      ? "bg-amber-400 hover:bg-amber-300 text-amber-900 shadow-lg shadow-amber-400/25"
                      : "bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/20"
                  }`}>
                  {p.cta}
                </button>
              </div>
            </Animate>
          ))}
        </div>
      </div>

      {selectedPlan && (
        <PaymentModal
          plan={selectedPlan}
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
          <p className="text-blue-600 text-sm font-semibold uppercase tracking-widest mb-3">FAQ</p>
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
                  <ChevronRight className={`w-4 h-4 text-blue-400 transition-transform duration-200 shrink-0 ${open === i ? "rotate-90" : ""}`} />
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
        background: "#0a0f1e",
        backgroundImage:
          "repeating-linear-gradient(45deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 28px)",
        backgroundSize: "28px 28px",
      }}
    >
      <div className="absolute -top-40 -left-40 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(251,191,36,0.07) 0%, transparent 70%)" }} />
      <div className="absolute -bottom-40 -right-40 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)" }} />

      <Animate className="relative max-w-2xl mx-auto px-6 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
          Ready to modernize your gym?
        </h2>
        <p className="text-white/40 mb-8">
          Join gym owners who trust GymOS to run their operations.
        </p>
        <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=GYM&plan=FREE`}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-blue-500 hover:from-amber-300 hover:to-blue-400 text-white font-semibold transition-all shadow-xl shadow-blue-600/20">
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

//////////////////////////////////////////////////////
// PAYMENT MODAL
//////////////////////////////////////////////////////
type PaymentMethod = "paypal" | "card" | "gcash" | null

const Spinner = () => (
  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
  </svg>
)

function PaymentModal({
  plan,
  onClose,
}: {
  plan: { name: string; price: string; period: string; planKey: string; product: string } | null
  onClose: () => void
}) {
  const [method, setMethod] = useState<PaymentMethod>(null)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [cardForm, setCardForm] = useState({ name: "", number: "", expiry: "", cvv: "" })
  const [gcashNumber, setGcashNumber] = useState("")
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  if (!plan) return null

  const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null

  const formatCard = (val: string) =>
    val.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim()

  const formatExpiry = (val: string) =>
    val.replace(/\D/g, "").slice(0, 4).replace(/(.{2})(.+)/, "$1/$2")

  //////////////////////////////////////////////////////
  // PAYPAL — real implementation
  //////////////////////////////////////////////////////
  const checkoutPayPal = async () => {
    try {
      setLoading(true)
      let endpoint = ""
      let payload: any = {}

      if (token) {
        endpoint = "/api/billing/subscribe/paypal"
        payload = { product: plan.product, plan: plan.planKey }
      } else {
        if (!name.trim() || !email.trim()) {
          alert("Name and email are required")
          return
        }
        endpoint = "/api/billing/newaccount/paypal"
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
      const redirectUrl = data.approveUrl || data.checkoutUrl
      if (!redirectUrl) throw new Error("No redirect URL")
      window.location.href = redirectUrl
    } catch (err) {
      console.error(err)
      alert("Checkout failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  //////////////////////////////////////////////////////
  // CARD / GCASH — wire to your own endpoints
  //////////////////////////////////////////////////////
  const checkoutOther = async () => {
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1800))
    setLoading(false)
    setDone(true)
  }

  const METHODS = [
    {
      id: "paypal" as PaymentMethod,
      label: "PayPal",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.59 3.025-2.566 6.082-8.558 6.082H9.825l-1.43 9.083h3.89c.524 0 .968-.383 1.05-.9l.326-2.07.503-3.189c.083-.517.527-.9 1.05-.9h.67c3.865 0 6.542-1.57 7.383-6.114.31-1.67.153-3.07-.645-4.705z" />
        </svg>
      ),
      bg: "bg-sky-50 border-sky-200 text-sky-700",
      active: "bg-sky-500 border-sky-500 text-white",
    },
    {
      id: "card" as PaymentMethod,
      label: "Card",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <rect x="1" y="4" width="22" height="16" rx="2" />
          <line x1="1" y1="10" x2="23" y2="10" />
        </svg>
      ),
      bg: "bg-blue-50 border-blue-200 text-blue-700",
      active: "bg-blue-600 border-blue-600 text-white",
    },
    {
      id: "gcash" as PaymentMethod,
      label: "GCash",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
        </svg>
      ),
      bg: "bg-blue-50 border-blue-200 text-blue-800",
      active: "bg-[#007DFF] border-[#007DFF] text-white",
    },
  ]

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-700 to-blue-500 px-6 py-5 flex items-center justify-between">
          <div>
            <h2 className="text-white font-bold text-lg">Complete your order</h2>
            <p className="text-blue-100 text-sm mt-0.5">
              {plan.name} plan — <span className="font-semibold">{plan.price}</span>{plan.period}
            </p>
          </div>
          <button onClick={onClose} className="text-white/70 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {done ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-slate-800 font-bold text-lg mb-1">Payment successful!</h3>
              <p className="text-slate-500 text-sm mb-6">
                You're now on the <span className="font-semibold text-blue-600">{plan.name}</span> plan.
              </p>
              <a href="/dashboard"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all">
                Go to dashboard <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          ) : (
            <>
              {/* METHOD SELECTOR */}
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                Select payment method
              </p>
              <div className="grid grid-cols-3 gap-2 mb-5">
                {METHODS.map((m) => (
                  <button key={m.id} onClick={() => setMethod(m.id)}
                    className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl border text-xs font-semibold transition-all ${
                      method === m.id ? m.active : m.bg
                    }`}>
                    {m.icon}
                    {m.label}
                  </button>
                ))}
              </div>

              {/* ── PAYPAL ── */}
              {method === "paypal" && (
                <div className="flex flex-col gap-3">
                  {token ? (
                    <div className="bg-sky-50 border border-sky-100 rounded-xl p-4 text-center text-sm text-slate-500">
                      You'll be redirected to PayPal to complete your payment securely.
                    </div>
                  ) : (
                    <>
                      <p className="text-xs text-slate-500 text-center">
                        Enter your details to create an account and continue to PayPal.
                      </p>
                      <input
                        placeholder="Full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400"
                      />
                      <input
                        type="email"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400"
                      />
                    </>
                  )}
                  <button onClick={checkoutPayPal} disabled={loading}
                    className="w-full mt-1 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-orange-500/20 disabled:opacity-70">
                    {loading ? <><Spinner /> Redirecting…</> : <>Continue to PayPal <ChevronRight className="w-4 h-4" /></>}
                  </button>
                </div>
              )}

              {/* ── CARD ── */}
              {method === "card" && (
                <div className="flex flex-col gap-3">
                  <input placeholder="Cardholder name" value={cardForm.name}
                    onChange={(e) => setCardForm({ ...cardForm, name: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400" />
                  <input placeholder="Card number" value={cardForm.number}
                    onChange={(e) => setCardForm({ ...cardForm, number: formatCard(e.target.value) })}
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 tracking-widest" />
                  <div className="grid grid-cols-2 gap-3">
                    <input placeholder="MM/YY" value={cardForm.expiry}
                      onChange={(e) => setCardForm({ ...cardForm, expiry: formatExpiry(e.target.value) })}
                      className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400" />
                    <input placeholder="CVV" maxLength={4} value={cardForm.cvv}
                      onChange={(e) => setCardForm({ ...cardForm, cvv: e.target.value.replace(/\D/g, "") })}
                      className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400" />
                  </div>
                  <button onClick={checkoutOther} disabled={loading}
                    className="w-full mt-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-70">
                    {loading ? <><Spinner /> Processing…</> : <>Pay {plan.price} <ChevronRight className="w-4 h-4" /></>}
                  </button>
                </div>
              )}

              {/* ── GCASH ── */}
              {method === "gcash" && (
                <div className="flex flex-col gap-3">
                  <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-center">
                    <p className="text-xs text-slate-500 mb-3">Enter your GCash mobile number</p>
                    <input placeholder="09XX XXX XXXX" value={gcashNumber} maxLength={11}
                      onChange={(e) => setGcashNumber(e.target.value.replace(/\D/g, ""))}
                      className="w-full border border-blue-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 text-center tracking-widest focus:outline-none focus:ring-2 focus:ring-blue-500/30 bg-white" />
                    <p className="text-xs text-slate-400 mt-2">
                      You'll receive a GCash payment request on this number.
                    </p>
                  </div>
                  <button onClick={checkoutOther} disabled={loading}
                    className="w-full py-3 rounded-xl bg-[#007DFF] hover:bg-blue-600 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-70">
                    {loading ? <><Spinner /> Processing…</> : <>Pay via GCash <ChevronRight className="w-4 h-4" /></>}
                  </button>
                </div>
              )}

              <p className="text-center text-xs text-slate-400 mt-4 flex items-center justify-center gap-1">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                Secure checkout · Cancel anytime · No hidden fees
              </p>
            </>
          )}
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
      <Features />
      <HowItWorks />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  )
}