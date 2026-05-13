"use client"

import { useState, useEffect, useRef } from "react"
import { usePricing, type Plan } from "@/lib/usePricing"
import InternalLinks from "@/components/InternalLinks"
import {
  Car, Users, BarChart3, CheckCircle2, ChevronRight,
  Menu, X, Star, CreditCard, Shield, FileText,
  AlertCircle, Calendar, Wrench, Key, Globe, MessageSquare, Palette, QrCode, Bell, ImagePlus,
} from "lucide-react"

const FEATURES = [
  {
    icon: Car,
    title: "Fleet Management",
    desc: "Track every vehicle in your fleet — availability, status, and maintenance history. Know which cars are available, rented, or in the shop at any time.",
    color: "from-orange-600 to-amber-500",
    shadow: "shadow-orange-500/20",
  },
  {
    icon: Key,
    title: "Rental Reservations",
    desc: "Create and manage reservations with pickup and return dates, locations, and deposit tracking. No double bookings, no missed handoffs.",
    color: "from-amber-600 to-orange-500",
    shadow: "shadow-amber-500/20",
  },
  {
    icon: Users,
    title: "Customer Records",
    desc: "Keep a complete record of every customer — license number, contact details, and full rental history. Reactivate or deactivate customers without losing history.",
    color: "from-orange-500 to-yellow-500",
    shadow: "shadow-orange-400/20",
  },
  {
    icon: CreditCard,
    title: "Revenue Tracking",
    desc: "Track total amount per rental and see your monthly revenue at a glance. Know which vehicles are earning the most and which are sitting idle.",
    color: "from-amber-500 to-orange-400",
    shadow: "shadow-amber-400/20",
  },
  {
    icon: AlertCircle,
    title: "Overdue Detection",
    desc: "Rentals past their return date are automatically flagged as overdue. See them instantly on your dashboard and follow up with customers faster.",
    color: "from-orange-700 to-amber-600",
    shadow: "shadow-orange-600/20",
  },
  {
    icon: Wrench,
    title: "Maintenance Status",
    desc: "Mark vehicles as under maintenance with one click so they can't be booked. Return them to available when the work is done.",
    color: "from-yellow-600 to-orange-500",
    shadow: "shadow-yellow-500/20",
  },
  {
    icon: Calendar,
    title: "Upcoming Returns",
    desc: "See all active rentals sorted by return date. Know who's returning a car today, tomorrow, and this week — without digging through records.",
    color: "from-orange-600 to-yellow-400",
    shadow: "shadow-orange-500/20",
  },
  {
    icon: BarChart3,
    title: "Rental Dashboard",
    desc: "One screen shows available vehicles, active rentals, overdue count, and monthly revenue. Everything you need to run your day.",
    color: "from-amber-600 to-yellow-500",
    shadow: "shadow-amber-500/20",
  },
  {
    icon: Shield,
    title: "Secure & Isolated",
    desc: "Your fleet and customer data are fully isolated per business. Nothing is shared, nothing is exposed. Your records stay yours.",
    color: "from-orange-500 to-amber-400",
    shadow: "shadow-orange-400/20",
  },
  {
    icon: Globe,
    title: "Public Booking Page",
    desc: "Share a public link where customers can browse your fleet and submit booking inquiries 24/7 — no login required on their end.",
    color: "from-orange-600 to-amber-500",
    shadow: "shadow-orange-500/20",
  },
  {
    icon: MessageSquare,
    title: "Booking Inquiries",
    desc: "Review incoming booking requests from your public page. Approve or reject each inquiry and convert approved ones to rentals in one click.",
    color: "from-amber-600 to-orange-500",
    shadow: "shadow-amber-500/20",
  },
  {
    icon: QrCode,
    title: "Deposit QR Code",
    desc: "Upload your GCash, Maya, or bank QR code to your booking page so customers can scan and pay their deposit instantly — no back-and-forth messaging.",
    color: "from-orange-600 to-amber-500",
    shadow: "shadow-orange-500/20",
  },
  {
    icon: Palette,
    title: "Page Personalization",
    desc: "Choose from 5 themes — Midnight, Clean, Ocean, Forest, Luxury — then personalize any theme with a cover photo, tagline, and accent color to match your brand.",
    color: "from-orange-500 to-yellow-500",
    shadow: "shadow-orange-400/20",
  },
  {
    icon: Bell,
    title: "Instant Booking Alerts",
    desc: "Get notified the moment a customer submits a booking inquiry. A badge appears on your notification bell — click it to jump straight to the inquiry.",
    color: "from-amber-500 to-orange-400",
    shadow: "shadow-amber-400/20",
  },
  {
    icon: ImagePlus,
    title: "Vehicle Photos",
    desc: "Upload a photo for each vehicle in your fleet. Photos display on your public booking page so customers see exactly what they're renting before they inquire.",
    color: "from-orange-600 to-amber-500",
    shadow: "shadow-orange-500/20",
  },
]

const STEPS = [
  { step: "01", title: "Add your vehicles", desc: "Enter your fleet — make, model, plate number, and daily rate. Set each vehicle's status and you're ready to rent." },
  { step: "02", title: "Register your customers", desc: "Add customer profiles with contact details and license numbers. Their full rental history builds automatically over time." },
  { step: "03", title: "Create and track rentals", desc: "Book a rental, set pickup and return dates, track deposits, and manage the full lifecycle from reserved to returned." },
]

const FAQS = [
  {
    q: "Can I track which vehicles are available right now?",
    a: "Yes. The fleet page shows every vehicle's current status — Available, Rented, or Maintenance. The dashboard also shows a live count so you always know your fleet state at a glance.",
  },
  {
    q: "What happens when a rental goes past its return date?",
    a: "Smapey automatically flags it as Overdue. You'll see overdue rentals highlighted on your dashboard so you can follow up with customers immediately.",
  },
  {
    q: "Can I delete a customer who completed their rental?",
    a: "Customers with rental history can't be hard-deleted to protect your revenue records. Instead, you can deactivate them — they're hidden from active views but their history is preserved.",
  },
  {
    q: "How do I track revenue?",
    a: "Each rental has a total amount field. Your dashboard shows monthly revenue from active and returned rentals, plus a 7-day trend chart.",
  },
  {
    q: "Can my team use this too?",
    a: "Yes. You can invite staff with role-based access. Owners and admins can manage everything, while members can handle day-to-day rental operations.",
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
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#1a0800]/90 backdrop-blur-md border-b border-white/5 shadow-lg" : "bg-transparent"}`}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <img src="/logo.png" alt="Smapey Car Rental" className="w-8 h-8 rounded-lg object-cover" />
          <span className="text-white font-bold tracking-tight">Smapey Car Rental</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <a href="/car-rental" className="text-sm text-white/60 hover:text-white transition-colors">Home</a>
          <a href="#features" className="text-sm text-white/60 hover:text-white transition-colors">Features</a>
          <a href="#pricing" className="text-sm text-white/60 hover:text-white transition-colors">Pricing</a>
          <a href="/car-rental/guide" className="text-sm text-white/60 hover:text-white transition-colors">Guide</a>
        </div>
        <div className="hidden md:flex items-center gap-3">
          <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/login`} className="text-sm text-white/60 hover:text-white transition-colors px-4 py-2">Sign in</a>
          <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=CAR_RENTAL&plan=FREE`}
            className="text-sm font-semibold px-4 py-2 rounded-lg bg-orange-600 hover:bg-orange-500 text-white transition-colors shadow-lg shadow-orange-600/25">
            Get started
          </a>
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden text-white/60 hover:text-white">
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-[#1a0800] border-t border-white/5 px-6 py-4 flex flex-col gap-4">
          <a href="/car-rental" className="text-sm text-white/60 hover:text-white transition-colors">Home</a>
          <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=CAR_RENTAL&plan=FREE`}
            className="text-sm font-semibold px-4 py-2 rounded-lg bg-orange-600 text-white text-center">
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
      style={{ background: "#1a0800", backgroundImage: "repeating-linear-gradient(45deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 28px)", backgroundSize: "28px 28px" }}>
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(249,115,22,0.15) 0%, transparent 70%)" }} />
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(245,158,11,0.12) 0%, transparent 70%)" }} />
      <div className="relative max-w-6xl mx-auto px-6 py-24 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold mb-6">
          <Car className="w-3 h-3" />
          Built for car rental businesses
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight mb-6">
          Car rental software that{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400">
            keeps your fleet moving
          </span>
        </h1>
        <p className="text-lg text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed">
          Smapey helps car rental businesses manage their fleet, track reservations,
          handle customers, and monitor revenue — all from one simple dashboard.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=CAR_RENTAL&plan=FREE`}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-semibold text-sm transition-all shadow-lg shadow-orange-600/30">
            Start for free <ChevronRight className="w-4 h-4" />
          </a>
          <a href="#features"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white font-medium text-sm transition-all border border-white/10">
            See features
          </a>
        </div>
        <div className="mt-16 flex flex-wrap items-center justify-center gap-6 text-white/30 text-xs">
          {["No credit card required", "Free plan forever", "Set up in under 5 minutes"].map((t) => (
            <span key={t} className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-orange-400" />{t}
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
          <p className="text-orange-600 text-sm font-semibold uppercase tracking-widest mb-3">Features</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">Everything your rental business needs</h2>
          <p className="text-slate-500 mt-4 max-w-xl mx-auto">
            From fleet tracking to revenue reports — manage your entire car rental operation in one place.
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
          <p className="text-orange-600 text-sm font-semibold uppercase tracking-widest mb-3">How it Works</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">Up and running in minutes</h2>
        </Animate>
        <div className="grid md:grid-cols-3 gap-8">
          {STEPS.map(({ step, title, desc }, i) => (
            <Animate key={step} delay={i * 120}>
              <div className="relative text-center group">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-orange-50 border-2 border-orange-100 text-orange-600 font-extrabold text-lg mb-5 group-hover:bg-gradient-to-tr group-hover:from-orange-500 group-hover:to-amber-500 group-hover:text-white group-hover:border-transparent transition-all duration-300">
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
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null)
  const { plans, isPhilippines } = usePricing("CAR_RENTAL")
  const handleSelect = (p: Plan) => {
    if (p.planKey === "FREE") { window.location.href = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=${p.product}&plan=FREE`; return }
    setSelectedPlan(p)
  }
  return (
    <section id="pricing" className="py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        <Animate className="text-center mb-16">
          <p className="text-orange-600 text-sm font-semibold uppercase tracking-widest mb-3">Pricing</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">Simple, transparent pricing</h2>
          <p className="text-slate-500 mt-4">Start free. Scale as your fleet grows.</p>
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
                <div className={`rounded-2xl p-8 border transition-all duration-300 hover:-translate-y-1 ${p.highlight ? "bg-gradient-to-b from-orange-700 to-orange-900 border-orange-500/30 shadow-2xl shadow-orange-600/20 scale-105" : "bg-white border-slate-200 shadow-sm hover:shadow-md"}`}>
                  {p.highlight && <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-semibold mb-4"><Star className="w-3 h-3" /> Most popular</span>}
                  <p className={`font-bold text-lg mb-1 ${p.highlight ? "text-white" : "text-slate-800"}`}>{p.name}</p>
                  <p className={`text-sm mb-4 ${p.highlight ? "text-orange-200/60" : "text-slate-400"}`}>{p.desc}</p>
                  <div className="flex items-end gap-1 mb-6">
                    <span className={`text-4xl font-extrabold tracking-tight ${p.highlight ? "text-white" : "text-slate-800"}`}>{displayPrice}</span>
                    <span className={`text-sm mb-1 ${p.highlight ? "text-orange-200/50" : "text-slate-400"}`}>{p.period}</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-center gap-2.5 text-sm">
                        <CheckCircle2 className={`w-4 h-4 shrink-0 ${p.highlight ? "text-amber-300" : "text-orange-500"}`} />
                        <span className={p.highlight ? "text-orange-100/80" : "text-slate-600"}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <button onClick={() => handleSelect(p)}
                    className={`w-full text-center py-2.5 rounded-xl text-sm font-semibold transition-all ${p.highlight ? "bg-amber-400 hover:bg-amber-300 text-amber-900 shadow-lg shadow-amber-400/25" : "bg-orange-600 hover:bg-orange-500 text-white shadow-md shadow-orange-600/20"}`}>
                    {p.cta}
                  </button>
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
    <section className="py-24 bg-white">
      <div className="max-w-2xl mx-auto px-6">
        <Animate className="text-center mb-16">
          <p className="text-orange-600 text-sm font-semibold uppercase tracking-widest mb-3">FAQ</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">Common questions</h2>
        </Animate>
        <div className="flex flex-col gap-3">
          {FAQS.map(({ q, a }, i) => (
            <Animate key={i} delay={i * 60}>
              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <button onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left text-slate-700 font-medium text-sm hover:bg-slate-50 transition-colors">
                  {q}<ChevronRight className={`w-4 h-4 text-orange-400 transition-transform duration-200 shrink-0 ${open === i ? "rotate-90" : ""}`} />
                </button>
                {open === i && <div className="px-5 pb-4 text-sm text-slate-500 leading-relaxed border-t border-slate-100 pt-3">{a}</div>}
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
      style={{ background: "#1a0800", backgroundImage: "repeating-linear-gradient(45deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 28px)", backgroundSize: "28px 28px" }}>
      <Animate className="relative max-w-2xl mx-auto px-6 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">Ready to take control of your fleet?</h2>
        <p className="text-white/40 mb-8">Join rental businesses that trust Smapey to manage their cars, customers, and revenue.</p>
        <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=CAR_RENTAL&plan=FREE`}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white font-semibold transition-all shadow-xl shadow-orange-600/20">
          Get started for free <ChevronRight className="w-4 h-4" />
        </a>
      </Animate>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-[#0f0500] border-t border-white/5 px-6 py-8">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Smapey Car Rental" className="w-6 h-6 rounded-md object-cover" />
          <span className="text-white/60 text-sm font-semibold">Smapey Car Rental</span>
        </div>
        <p className="text-white/20 text-xs">© {new Date().getFullYear()} Smapey. All rights reserved.</p>
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

function PaymentModal({ plan, isPhilippines, onClose }: {
  plan: { name: string; phpPrice: string; usdPrice: string; period: string; planKey: string; product: string } | null
  isPhilippines: boolean
  onClose: () => void
}) {
  const [step, setStep] = useState<"details" | "payment">("details")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState<CheckoutMethod | null>(null)
  const [token, setToken] = useState<string | null>(null)
  useEffect(() => { const t = localStorage.getItem("accessToken"); setToken(t); if (t) setStep("payment") }, [])
  if (!plan) return null
  const displayPrice = isPhilippines ? plan.phpPrice : plan.usdPrice
  const checkout = async (method: CheckoutMethod) => {
    try {
      setLoading(method)
      const isLoggedIn = !!token
      const endpoint = isLoggedIn
        ? (method === "paypal" ? "/api/billing/subscribe/paypal" : "/api/billing/subscribe/paymongo")
        : (method === "paypal" ? "/api/billing/newaccount/paypal" : "/api/billing/newaccount/paymongo")
      const payload = isLoggedIn ? { product: plan.product, plan: plan.planKey } : { name, email, product: plan.product, plan: plan.planKey }
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
    } catch (err: any) { alert(err?.message || "Checkout failed. Please try again.") }
    finally { setLoading(null) }
  }
  const handleContinue = () => {
    if (!name.trim() || !email.trim()) { alert("Name and email are required"); return }
    if (!isPhilippines) { checkout("paypal") } else { setStep("payment") }
  }
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-orange-700 to-orange-500 px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {step === "payment" && !token && (
              <button onClick={() => setStep("details")} className="text-white/60 hover:text-white transition">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
              </button>
            )}
            <div>
              <h2 className="text-white font-bold text-lg">{step === "details" ? "Create your account" : "Choose payment method"}</h2>
              <p className="text-orange-100 text-sm mt-0.5">{plan.name} plan — <span className="font-semibold">{displayPrice}</span>{plan.period}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-white/70 hover:text-white transition-colors"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-6 flex flex-col gap-4">
          {step === "details" && (
            <>
              <input placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-400" />
              <input type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-400" />
              <button onClick={handleContinue} disabled={loading !== null} className="w-full py-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-60">
                {loading ? <><Spinner /> Redirecting…</> : <>Continue <ChevronRight className="w-4 h-4" /></>}
              </button>
            </>
          )}
          {step === "payment" && (
            <>
              {isPhilippines && (
                <button onClick={() => checkout("paymongo")} disabled={loading !== null} className="w-full flex items-center gap-4 px-5 py-4 border-2 border-slate-200 rounded-2xl hover:border-green-500 hover:bg-green-50 transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-green-600 flex items-center justify-center shrink-0"><svg viewBox="0 0 24 24" className="w-5 h-5 fill-white"><path d="M3 3h7v7H3zm0 11h7v7H3zm11-11h7v7h-7zm0 11h7v7h-7z"/></svg></div>
                  <div className="flex-1 text-left"><p className="text-sm font-semibold text-slate-800 group-hover:text-green-700">QR Ph / GCash / Card</p><p className="text-xs text-slate-400">Philippine payment methods</p></div>
                  {loading === "paymongo" ? <Spinner /> : <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-green-500" />}
                </button>
              )}
              <button onClick={() => checkout("paypal")} disabled={loading !== null} className="w-full flex items-center gap-4 px-5 py-4 border-2 border-slate-200 rounded-2xl hover:border-orange-500 hover:bg-orange-50 transition-all group">
                <div className="w-10 h-10 rounded-xl bg-[#003087] flex items-center justify-center shrink-0"><svg viewBox="0 0 24 24" className="w-5 h-5 fill-white"><path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c1.379 8.883-5.43 11.61-10.377 11.61H8.23l-1.133 7.184h3.78c.458 0 .848-.332.92-.783l.038-.196.728-4.617.047-.252a.93.93 0 0 1 .919-.784h.578c3.746 0 6.678-1.522 7.534-5.927.358-1.833.173-3.363-.42-4.494z"/></svg></div>
                <div className="flex-1 text-left"><p className="text-sm font-semibold text-slate-800 group-hover:text-orange-700">PayPal</p><p className="text-xs text-slate-400">Pay with your PayPal account</p></div>
                {loading === "paypal" ? <Spinner /> : <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-orange-500" />}
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

export default function CarRentalContent() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Pricing />
      <FAQ />
      <CTA />
      <InternalLinks cluster="car-rental" currentPath="/car-rental" />
      <Footer />
    </main>
  )
}
