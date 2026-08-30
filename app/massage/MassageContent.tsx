"use client"

import { useState, useEffect, useRef } from "react"
import {
  Calendar, Users, Flower2, Globe, Inbox, BarChart3, HandHelping, HeartPulse,
  CheckCircle2, ChevronRight, Menu, X, Zap, XCircle,
  CalendarCheck,
} from "lucide-react"
import { usePricing, type Plan } from "@/lib/usePricing"
import InternalLinks from "@/components/InternalLinks"
import HubGuides from "@/components/blog/HubGuides"
import type { BlogPost } from "@/lib/blog"
import BookDemoForm from "@/components/BookDemoForm"
import { FAQS } from "./faqs"

const INK = "#161616"
const BLUE = "#2f6bff"
const AMBER = "#ff9e2c"
const CREAM = "#fbf7f0"
const display = { fontFamily: "'Hanken Grotesk', system-ui, sans-serif" }

const FEATURES = [
  { icon: Calendar, title: "Appointment Scheduling", desc: "Book sessions, assign services and therapists, and set durations. View your day at a glance from one clean dashboard." },
  { icon: HandHelping, title: "Therapist Management", desc: "Track each therapist's specialties and schedule. Assign sessions by skill (Swedish, deep tissue, Thai, hot stone) and filter the calendar by therapist." },
  { icon: HeartPulse, title: "Client Intake & Health Notes", desc: "Full client profiles with medical conditions, allergies, focus areas, and pressure preferences - visible only to your staff, never on the public page." },
  { icon: Flower2, title: "Treatment Menu", desc: "Define every treatment (Swedish, deep tissue, hot stone, reflexology) with prices, durations, and photos. Updates flow to your booking page instantly." },
  { icon: Globe, title: "Public Booking Page", desc: "Your spa gets a unique URL clients can visit to browse treatments and submit a booking request. Pick from 5 spa-themed designs." },
  { icon: Inbox, title: "Inquiry Management", desc: "Booking requests land in one inbox. Approve, reject, or convert them into confirmed appointments (with optional deposit collection) in one click." },
  { icon: BarChart3, title: "Analytics Dashboard", desc: "Live numbers - monthly revenue, session count, completion rate, therapist utilization, and pending inquiries - without a spreadsheet in sight." },
  { icon: Users, title: "Team Roles & Permissions", desc: "Owners see everything. Therapists see only their own bookings. Receptionists see the schedule. Role-based access keeps data clean and private." },
]

function useInView(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect() } }, { threshold: 0.15, ...options })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return { ref, inView }
}

function Animate({ children, className = "", delay = 0, style }: { children: React.ReactNode; className?: string; delay?: number; style?: React.CSSProperties }) {
  const { ref, inView } = useInView()
  return (
    <div ref={ref} className={className} style={{ ...style, transitionProperty: "opacity, transform", transitionDuration: "600ms", transitionTimingFunction: "cubic-bezier(0.4,0,0.2,1)", transitionDelay: `${delay}ms`, opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(28px)" }}>
      {children}
    </div>
  )
}

function Navbar() {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const id = "smapey-pop-fonts"
    if (!document.getElementById(id)) {
      const l = document.createElement("link"); l.id = id; l.rel = "stylesheet"
      l.href = "https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600;700;800&display=swap"
      document.head.appendChild(l)
    }
  }, [])
  return (
    <nav className="fixed top-0 inset-x-0 z-50" style={{ background: CREAM, borderBottom: `2px solid ${INK}`, fontFamily: display.fontFamily }}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/massage" className="flex items-center gap-2.5">
          <img src="/logo.png" alt="Smapey" className="w-8 h-8 rounded-lg object-cover" />
          <span className="font-extrabold tracking-tight" style={{ color: INK }}>Smapey Massage</span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          <a href="/massage" className="text-sm font-semibold hover:opacity-60 transition-opacity" style={{ color: INK }}>Home</a>
          <a href="#features" className="text-sm font-semibold hover:opacity-60 transition-opacity" style={{ color: INK }}>Features</a>
          <a href="#pricing" className="text-sm font-semibold hover:opacity-60 transition-opacity" style={{ color: INK }}>Pricing</a>
          <a href="#faq" className="text-sm font-semibold hover:opacity-60 transition-opacity" style={{ color: INK }}>FAQ</a>
          <a href="/massage/guide" className="text-sm font-semibold hover:opacity-60 transition-opacity" style={{ color: INK }}>Guide</a>
        </div>
        <div className="hidden md:flex items-center gap-3">
          <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/login`} className="text-sm font-semibold hover:opacity-60 transition-opacity px-2 py-2" style={{ color: INK }}>Sign in</a>
          <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=MASSAGE&plan=FREE`} className="text-sm font-bold px-5 py-2.5 rounded-full border-2 transition-transform hover:-translate-y-0.5" style={{ ...display, background: AMBER, color: INK, borderColor: INK, boxShadow: `3px 3px 0 ${INK}` }}>Get started free</a>
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden" style={{ color: INK }}>{open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}</button>
      </div>
      {open && (
        <div className="md:hidden px-6 py-4 flex flex-col gap-4" style={{ background: CREAM, borderTop: `2px solid ${INK}` }}>
          <a href="/massage" className="text-sm font-semibold" style={{ color: INK }}>Home</a>
          <a href="#features" className="text-sm font-semibold" style={{ color: INK }}>Features</a>
          <a href="#pricing" className="text-sm font-semibold" style={{ color: INK }}>Pricing</a>
          <a href="#faq" className="text-sm font-semibold" style={{ color: INK }}>FAQ</a>
          <a href="/massage/guide" className="text-sm font-semibold" style={{ color: INK }}>Guide</a>
          <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=MASSAGE&plan=FREE`} className="text-sm font-bold px-4 py-2.5 rounded-full border-2 text-center" style={{ ...display, background: AMBER, color: INK, borderColor: INK }}>Get started free</a>
        </div>
      )}
    </nav>
  )
}

function Hero() {
  return (
    <section className="relative min-h-screen grid lg:grid-cols-[1.4fr_.85fr] gap-12 items-center px-6 sm:px-12 lg:px-20 py-20 pt-24 overflow-hidden" style={{ background: CREAM, fontFamily: display.fontFamily }}>
      {/* bg ghost wordmark */}
      <div className="absolute -bottom-12 -left-5 pointer-events-none select-none" aria-hidden>
        <span className="font-extrabold whitespace-nowrap" style={{ fontSize: 250, letterSpacing: "-.05em", color: "transparent", WebkitTextStroke: "2px rgba(22,22,22,.05)" }}>SPA</span>
      </div>

      {/* Left: copy */}
      <div className="relative z-10">
        <div className="flex items-center gap-3.5 mb-7">
          <span className="block h-[3px] w-14" style={{ background: INK }} />
          <span className="text-[13px] font-extrabold tracking-[.16em] uppercase" style={{ color: INK }}>Built for massage &amp; spa businesses</span>
        </div>
        <h1 className="font-extrabold mb-6 text-5xl sm:text-6xl lg:text-[84px]" style={{ color: INK, lineHeight: 0.96, letterSpacing: "-.04em" }}>
          Run your<br className="hidden lg:block" /> massage <span style={{ color: BLUE }}>business</span><br className="hidden lg:block" /> &amp; get more <span style={{ color: AMBER }}>bookings.</span>
        </h1>
        <p className="text-lg max-w-lg mb-9 leading-relaxed" style={{ color: "#54514c" }}>
          Therapists, treatments, client intake, deposits, and a branded booking page,
          everything you need to run a small spa, in one clean dashboard. No bloat, no learning curve.
        </p>
        <div className="flex flex-wrap items-center gap-3 mb-7">
          <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=MASSAGE&plan=FREE`} className="flex items-center gap-2 px-7 py-4 rounded-full font-bold text-sm border-2 transition-transform hover:-translate-y-0.5" style={{ ...display, background: AMBER, color: INK, borderColor: INK, boxShadow: `5px 5px 0 ${INK}` }}>
            Start free, no card needed <ChevronRight className="w-4 h-4" />
          </a>
          <a href="/massage" className="flex items-center px-7 py-4 rounded-full font-bold text-sm border-2 transition-transform hover:-translate-y-0.5" style={{ ...display, background: "transparent", color: INK, borderColor: INK }}>
            View all features
          </a>
        </div>
        <div className="flex flex-wrap gap-5 text-xs font-semibold" style={{ color: "#54514c" }}>
          {["No credit card required", "Free plan forever"].map((t) => (
            <span key={t} className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />{t}</span>
          ))}
        </div>
      </div>

      {/* Right: tilted stacked cards */}
      <div className="relative z-10 hidden lg:flex flex-col gap-[18px]">
        <div className="border-2 rounded-[18px] p-4 bg-white" style={{ borderColor: INK, boxShadow: `6px 6px 0 ${BLUE}`, transform: "rotate(-3deg)" }}>
          <div className="flex items-center justify-between mb-2.5"><span className="text-sm font-extrabold" style={{ color: INK }}>2:00 PM · Swedish</span><span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full" style={{ background: "#0d9f6e", color: "#fff" }}>BOOKED</span></div>
          <div className="flex justify-between text-xs font-bold" style={{ color: "#54514c" }}><span>Mia R. · 60 min</span><span style={{ color: INK }}>₱1,200</span></div>
        </div>
        <div className="border-2 rounded-[18px] p-4 ml-[30px]" style={{ background: INK, borderColor: INK, boxShadow: `6px 6px 0 ${AMBER}`, transform: "rotate(2deg)" }}>
          <div className="flex items-center justify-between mb-2.5"><span className="text-sm font-extrabold text-white">Therapists</span><span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-white" style={{ color: INK }}>4 on shift</span></div>
          <div className="flex gap-1.5">
            <span className="flex-1 h-2 rounded-full" style={{ background: "#34d399" }} /><span className="flex-1 h-2 rounded-full" style={{ background: "#34d399" }} /><span className="flex-1 h-2 rounded-full" style={{ background: AMBER }} /><span className="flex-1 h-2 rounded-full" style={{ background: "rgba(255,255,255,.25)" }} />
          </div>
        </div>
        <div className="border-2 rounded-[18px] p-4 ml-2 bg-white" style={{ borderColor: INK, boxShadow: `6px 6px 0 ${AMBER}`, transform: "rotate(-2deg)" }}>
          <div className="flex items-center justify-between"><span className="text-xs font-bold" style={{ color: "#54514c" }}>Deposits today</span><span className="text-lg font-extrabold" style={{ color: INK }}>₱8,400</span></div>
        </div>
      </div>
    </section>
  )
}

function Features() {
  return (
    <section id="features" className="py-24" style={{ background: "#fff", fontFamily: display.fontFamily }}>
      <div className="max-w-6xl mx-auto px-6">
        <Animate className="text-center mb-16">
          <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: BLUE }}>Features</p>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight" style={{ color: INK }}>Built for spas and wellness clinics</h2>
          <p className="mt-4 max-w-xl mx-auto" style={{ color: "#54514c" }}>From the first inquiry to the final session, every essential a small spa needs, none of the enterprise bloat.</p>
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

function Pricing() {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null)
  const { plans, isPhilippines } = usePricing("MASSAGE")
  const handleSelect = (p: Plan) => { if (p.planKey === "FREE") { window.location.href = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=${p.product}&plan=FREE`; return } setSelectedPlan(p) }
  return (
    <section id="pricing" className="py-24" style={{ background: CREAM, fontFamily: display.fontFamily }}>
      <div className="max-w-6xl mx-auto px-6">
        <Animate className="text-center mb-16">
          <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: BLUE }}>Pricing</p>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight" style={{ color: INK }}>Start free. Upgrade when ready.</h2>
          <p className="mt-4" style={{ color: "#54514c" }}>The free plan stays free forever.</p>
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
                <div className="rounded-[24px] p-8 border-2 h-full transition-transform hover:-translate-y-1" style={p.highlight ? { background: BLUE, borderColor: INK, boxShadow: `8px 8px 0 ${INK}`, color: "#fff" } : { background: "#fff", borderColor: INK, boxShadow: `8px 8px 0 ${AMBER}` }}>
                  {p.highlight && <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border-2 text-xs font-bold mb-4" style={{ background: AMBER, color: INK, borderColor: INK }}><Zap className="w-3 h-3" /> Most popular</span>}
                  <p className="font-extrabold text-lg mb-1" style={{ color: p.highlight ? "#fff" : INK }}>{p.name}</p>
                  <p className="text-sm mb-4" style={{ color: p.highlight ? "rgba(255,255,255,.7)" : "#9a948b" }}>{p.desc}</p>
                  <div className="flex items-end gap-1 mb-6">
                    <span className="text-4xl font-extrabold tracking-tight" style={{ color: p.highlight ? "#fff" : INK }}>{displayPrice}</span>
                    <span className="text-sm mb-1" style={{ color: p.highlight ? "rgba(255,255,255,.6)" : "#9a948b" }}>{p.period}</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {p.features.map((f) => (<li key={f} className="flex items-center gap-2.5 text-sm"><CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: p.highlight ? AMBER : BLUE }} /><span style={{ color: p.highlight ? "rgba(255,255,255,.85)" : "#3f3b36" }}>{f}</span></li>))}
                  </ul>
                  <button onClick={() => handleSelect(p)} className="w-full text-center py-3 rounded-full text-sm font-bold border-2 transition-transform hover:-translate-y-0.5" style={p.highlight ? { ...display, background: AMBER, color: INK, borderColor: INK } : { ...display, background: INK, color: "#fff", borderColor: INK }}>{p.cta}</button>
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
    <section id="faq" className="py-24" style={{ background: "#fff", fontFamily: display.fontFamily }}>
      <div className="max-w-2xl mx-auto px-6">
        <Animate className="text-center mb-16">
          <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: BLUE }}>FAQ</p>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight" style={{ color: INK }}>Common questions</h2>
        </Animate>
        <div className="flex flex-col gap-3">
          {FAQS.map(({ q, a }, i) => (
            <Animate key={i} delay={i * 60}>
              <div className="rounded-[18px] overflow-hidden border-2 bg-white" style={{ borderColor: INK }}>
                <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between px-5 py-4 text-left font-bold text-sm" style={{ color: INK }}>{q}<ChevronRight className="w-4 h-4 transition-transform duration-200 shrink-0" style={{ color: BLUE, transform: open === i ? "rotate(90deg)" : "rotate(0deg)" }} /></button>
                {open === i && <div className="px-5 pb-4 text-sm leading-relaxed pt-3" style={{ color: "#54514c", borderTop: "1px solid rgba(22,22,22,.1)" }}>{a}</div>}
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
    <section className="py-24 px-6" style={{ background: "#fff", fontFamily: display.fontFamily }}>
      <Animate className="relative max-w-3xl mx-auto rounded-[30px] border-2 p-12 md:p-16 text-center" style={{ background: AMBER, borderColor: INK, boxShadow: `10px 10px 0 ${INK}` }}>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4" style={{ color: INK }}>Ready to run your spa with less stress?</h2>
        <p className="mb-8 font-medium" style={{ color: "#5c4a28" }}>Free forever. No card, no trial. Set up your treatments and share your booking link in under five minutes.</p>
        <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=MASSAGE&plan=FREE`} className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold border-2 transition-transform hover:-translate-y-0.5" style={{ ...display, background: INK, color: "#fff", borderColor: INK }}>Get started for free <ChevronRight className="w-4 h-4" /></a>
      </Animate>
    </section>
  )
}

function Footer() {
  return (
    <footer className="px-6 py-8" style={{ background: CREAM, borderTop: `2px solid ${INK}`, fontFamily: display.fontFamily }}>
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2"><img src="/logo.png" alt="Smapey" className="w-6 h-6 rounded-md object-cover" /><span className="text-sm font-extrabold" style={{ color: INK }}>Massage by Smapey</span></div>
        <p className="text-xs" style={{ color: "#9a948b" }}>© {new Date().getFullYear()} Smapey. All rights reserved.</p>
      </div>
    </footer>
  )
}

type CheckoutMethod = "paypal" | "paymongo"
const Spinner = () => (<svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>)

function PaymentModal({ plan, isPhilippines, onClose }: { plan: { name: string; phpPrice: string; usdPrice: string; period: string; planKey: string; product: string } | null; isPhilippines: boolean; onClose: () => void }) {
  const [step, setStep] = useState<"details" | "payment">("details")
  const [name, setName] = useState(""); const [email, setEmail] = useState("")
  const [loading, setLoading] = useState<CheckoutMethod | null>(null)
  const [token, setToken] = useState<string | null>(null)
  useEffect(() => { const t = localStorage.getItem("accessToken"); setToken(t); if (t) setStep("payment") }, [])
  if (!plan) return null
  const displayPrice = isPhilippines ? plan.phpPrice : plan.usdPrice
  const inputStyle = { borderColor: INK, color: INK } as React.CSSProperties
  const checkout = async (method: CheckoutMethod) => {
    try {
      setLoading(method)
      const endpoint = token ? (method === "paypal" ? "/api/billing/subscribe/paypal" : "/api/billing/subscribe/paymongo") : (method === "paypal" ? "/api/billing/newaccount/paypal" : "/api/billing/newaccount/paymongo")
      const payload = token ? { product: plan.product, plan: plan.planKey } : { name, email, product: plan.product, plan: plan.planKey }
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, { method: "POST", headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) }, body: JSON.stringify(payload) })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || JSON.stringify(data))
      const redirectUrl = data.approveUrl || data.checkoutUrl
      if (!redirectUrl) throw new Error("No redirect URL returned")
      window.location.href = redirectUrl
    } catch (err: any) { alert(err?.message || "Checkout failed. Please try again.") } finally { setLoading(null) }
  }
  const handleContinue = () => { if (!name.trim() || !email.trim()) { alert("Name and email are required"); return } if (!isPhilippines) { checkout("paypal") } else { setStep("payment") } }
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" style={{ fontFamily: display.fontFamily }}>
      <div className="bg-white rounded-[22px] w-full max-w-md overflow-hidden border-2" style={{ borderColor: INK, boxShadow: `10px 10px 0 ${AMBER}` }}>
        <div className="px-6 py-5 flex items-center justify-between" style={{ background: INK }}>
          <div className="flex items-center gap-3">
            {step === "payment" && !token && <button onClick={() => setStep("details")} className="text-white/70 hover:text-white transition"><svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 5l-7 7 7 7"/></svg></button>}
            <div><h2 className="text-white font-extrabold text-lg">{step === "details" ? "Create your account" : "Choose payment method"}</h2><p className="text-sm mt-0.5" style={{ color: "rgba(255,255,255,.7)" }}>{plan.name} plan, <span className="font-bold" style={{ color: AMBER }}>{displayPrice}</span>{plan.period}</p></div>
          </div>
          <button onClick={onClose} className="text-white/70 hover:text-white transition-colors"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-6 flex flex-col gap-4">
          {step === "details" && (<>
            <input placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} className="w-full border-2 rounded-xl px-4 py-2.5 text-sm focus:outline-none" style={inputStyle} />
            <input type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border-2 rounded-xl px-4 py-2.5 text-sm focus:outline-none" style={inputStyle} />
            <button onClick={handleContinue} disabled={loading !== null} className="w-full py-3 rounded-full border-2 font-bold text-sm flex items-center justify-center gap-2 transition-transform hover:-translate-y-0.5 disabled:opacity-60" style={{ ...display, background: AMBER, color: INK, borderColor: INK }}>{loading ? <><Spinner /> Redirecting…</> : <>Continue <ChevronRight className="w-4 h-4" /></>}</button>
          </>)}
          {step === "payment" && (<>
            {isPhilippines && (<button onClick={() => checkout("paymongo")} disabled={loading !== null} className="w-full flex items-center gap-4 px-5 py-4 border-2 rounded-2xl transition-all group" style={{ borderColor: INK }}><div className="w-10 h-10 rounded-xl bg-green-600 flex items-center justify-center shrink-0"><svg viewBox="0 0 24 24" className="w-5 h-5 fill-white"><path d="M3 3h7v7H3zm0 11h7v7H3zm11-11h7v7h-7zm0 11h7v7h-7z"/></svg></div><div className="flex-1 text-left"><p className="text-sm font-bold" style={{ color: INK }}>QR Ph / GCash / Card</p><p className="text-xs" style={{ color: "#9a948b" }}>Philippine payment methods</p></div>{loading === "paymongo" ? <Spinner /> : <ChevronRight className="w-4 h-4" style={{ color: INK }} />}</button>)}
            <button onClick={() => checkout("paypal")} disabled={loading !== null} className="w-full flex items-center gap-4 px-5 py-4 border-2 rounded-2xl transition-all group" style={{ borderColor: INK }}><div className="w-10 h-10 rounded-xl bg-[#003087] flex items-center justify-center shrink-0"><svg viewBox="0 0 24 24" className="w-5 h-5 fill-white"><path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c1.379 8.883-5.43 11.61-10.377 11.61H8.23l-1.133 7.184h3.78c.458 0 .848-.332.92-.783l.038-.196.728-4.617.047-.252a.93.93 0 0 1 .919-.784h.578c3.746 0 6.678-1.522 7.534-5.927.358-1.833.173-3.363-.42-4.494z"/></svg></div><div className="flex-1 text-left"><p className="text-sm font-bold" style={{ color: INK }}>PayPal</p><p className="text-xs" style={{ color: "#9a948b" }}>Pay with your PayPal account</p></div>{loading === "paypal" ? <Spinner /> : <ChevronRight className="w-4 h-4" style={{ color: INK }} />}</button>
          </>)}
          <p className="text-center text-xs flex items-center justify-center gap-1" style={{ color: "#9a948b" }}><svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>Secure checkout · Cancel anytime · No hidden fees</p>
        </div>
      </div>
    </div>
  )
}

export default function MassageContent({ guides = [] }: { guides?: BlogPost[] }) {
  return (
    <main>
      <Navbar />
      <Hero />
      <Features />
      <Pricing />
      <FAQ />
      <BookDemoForm product="MASSAGE" />
      <CTA />
      <InternalLinks cluster="massage" currentPath="/massage" />
      <HubGuides posts={guides} hubPath="/massage" />
      <Footer />
    </main>
  )
}
