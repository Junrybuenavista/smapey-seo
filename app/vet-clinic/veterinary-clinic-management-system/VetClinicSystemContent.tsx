"use client"

import { useState, useEffect, useRef } from "react"
import { usePricing, type Plan } from "@/lib/usePricing"
import InternalLinks from "@/components/InternalLinks"
import Link from "next/link"
import {
  PawPrint, Users, CalendarDays, CheckCircle2, ChevronRight,
  Menu, X, Star, BarChart3, Shield, ListOrdered, Syringe, Receipt,
} from "lucide-react"

const FEATURES = [
  {
    icon: PawPrint,
    title: "Pet & Patient Records",
    desc: "Store complete pet profiles — species, breed, age, owner contact, medical history, and allergies. Pull up any record instantly when the owner arrives.",
    color: "from-emerald-600 to-teal-400", shadow: "shadow-emerald-500/20",
  },
  {
    icon: CalendarDays,
    title: "Appointment Scheduling",
    desc: "Book appointments by pet, veterinarian, date, and time. Attach chief complaint and service notes so the right vet is always prepared.",
    color: "from-teal-600 to-emerald-400", shadow: "shadow-teal-500/20",
  },
  {
    icon: ListOrdered,
    title: "Live Queue Board",
    desc: "Track every pet in real time — In Queue, In Progress, Done. One screen, every status, every vet — no more shouting names across the waiting room.",
    color: "from-emerald-500 to-cyan-400", shadow: "shadow-emerald-400/20",
  },
  {
    icon: Syringe,
    title: "Vaccination Records",
    desc: "Log vaccines per pet with the date given and next due date. The system flags upcoming vaccinations so your team can proactively remind pet owners.",
    color: "from-emerald-700 to-teal-500", shadow: "shadow-emerald-600/20",
  },
  {
    icon: Receipt,
    title: "Billing & Invoicing",
    desc: "Generate itemized bills after each visit — consultation, medicines, procedures. Accept partial and full payments across multiple payment methods.",
    color: "from-teal-500 to-emerald-500", shadow: "shadow-teal-500/20",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    desc: "Today's appointments, weekly trends, completion rates, unpaid bills, and upcoming vaccinations — all visible on your clinic dashboard.",
    color: "from-emerald-600 to-cyan-500", shadow: "shadow-emerald-500/20",
  },
]

const STEPS = [
  { step: "01", title: "Add your vets & set schedules", desc: "Register each veterinarian with their specialty and availability. The system knows who's on duty and when." },
  { step: "02", title: "Register pets & book visits", desc: "Create a pet profile once. Book each visit in seconds — pick the pet, vet, date, and time." },
  { step: "03", title: "Run queue, log vaccines & bill", desc: "Move pets through the live queue. After each visit, log vaccinations and generate a bill with line items." },
]

const FAQS = [
  {
    q: "What is a veterinary clinic management system?",
    a: "It is software that centralizes all clinic operations — pet records, vet schedules, appointment booking, a live patient queue, vaccination tracking, and billing — in one place instead of paper cards and spreadsheets.",
  },
  {
    q: "Does it work for both dog and cat clinics?",
    a: "Yes. Pet profiles include a species and breed field, so the system works for any animal — dogs, cats, birds, reptiles, rabbits, and more. There are no species restrictions.",
  },
  {
    q: "Can I track vaccination schedules per pet?",
    a: "Yes. Each vaccination entry stores the vaccine name, date given, and next due date. A 30-day upcoming vaccinations list appears on the dashboard so your team can remind owners in advance.",
  },
  {
    q: "How does billing work?",
    a: "After a visit, create a bill with line items — consultation fee, medications, procedures. Set quantity and unit price per item. Record payments via Cash, GCash, Maya, Card, or Bank Transfer. The system tracks unpaid and partial balances.",
  },
  {
    q: "Is there a free plan?",
    a: "Yes. The free plan includes core features — pet records, appointment scheduling, live queue, vaccination tracking, and billing — at no cost. Upgrade when your clinic needs more capacity.",
  },
]

function useInView(opts?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null); const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect() } }, { threshold: 0.1, ...opts })
    obs.observe(el); return () => obs.disconnect()
  }, []); return { ref, inView }
}
function Animate({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, inView } = useInView()
  return <div ref={ref} className={className} style={{ transitionProperty: "opacity, transform", transitionDuration: "600ms", transitionTimingFunction: "cubic-bezier(0.4,0,0.2,1)", transitionDelay: `${delay}ms`, opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(24px)" }}>{children}</div>
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
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#050d1a]/90 backdrop-blur-md border-b border-white/5 shadow-lg" : "bg-transparent"}`}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/vet-clinic" className="flex items-center gap-2.5">
          <img src="/logo.png" alt="Smapey Vet Clinic Manager" className="w-8 h-8 rounded-lg object-cover" />
          <span className="text-white font-bold tracking-tight">Smapey Vet</span>
        </Link>
        <div className="hidden md:flex items-center gap-3">
          <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/login`} className="text-sm text-white/60 hover:text-white transition-colors px-4 py-2">Sign in</a>
          <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=VET_CLINIC&plan=FREE`}
            className="text-sm font-semibold px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-colors shadow-lg shadow-emerald-600/25">
            Get started free
          </a>
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden text-white/60 hover:text-white">
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-[#050d1a] border-t border-white/5 px-6 py-4">
          <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=VET_CLINIC&plan=FREE`}
            className="block text-sm font-semibold px-4 py-2 rounded-lg bg-emerald-600 text-white text-center">
            Get started free
          </a>
        </div>
      )}
    </nav>
  )
}

function Pricing() {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null)
  const { plans, isPhilippines } = usePricing("VET_CLINIC")
  const handleSelect = (p: Plan) => {
    if (p.planKey === "FREE") { window.location.href = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=${p.product}&plan=FREE`; return }
    setSelectedPlan(p)
  }
  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <Animate className="text-center mb-12">
          <p className="text-emerald-600 text-sm font-semibold uppercase tracking-widest mb-3">Pricing</p>
          <h2 className="text-3xl font-extrabold text-slate-800">Simple, transparent pricing</h2>
          <p className="text-slate-500 mt-3">Start free. Upgrade when your clinic grows.</p>
        </Animate>
        <div className="grid md:grid-cols-3 gap-6 items-center">
          {plans.map((p, i) => {
            const displayPrice = isPhilippines === null ? "..." : isPhilippines ? p.phpPrice : p.usdPrice
            return (
              <Animate key={p.name} delay={i * 100}>
                <div className={`rounded-2xl p-8 border transition-all hover:-translate-y-1 ${p.highlight ? "bg-gradient-to-b from-emerald-800 to-emerald-950 border-emerald-500/30 shadow-2xl shadow-emerald-600/20 scale-105" : "bg-slate-50 border-slate-200 shadow-sm"}`}>
                  {p.highlight && <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-teal-400/20 text-teal-300 text-xs font-semibold mb-4"><Star className="w-3 h-3" /> Most popular</span>}
                  <p className={`font-bold text-lg mb-1 ${p.highlight ? "text-white" : "text-slate-800"}`}>{p.name}</p>
                  <div className="flex items-end gap-1 mb-5"><span className={`text-4xl font-extrabold ${p.highlight ? "text-white" : "text-slate-800"}`}>{displayPrice}</span><span className={`text-sm mb-1 ${p.highlight ? "text-emerald-200/50" : "text-slate-400"}`}>{p.period}</span></div>
                  <ul className="space-y-3 mb-8">{p.features.map(f => (<li key={f} className="flex items-center gap-2.5 text-sm"><CheckCircle2 className={`w-4 h-4 shrink-0 ${p.highlight ? "text-teal-300" : "text-emerald-500"}`} /><span className={p.highlight ? "text-emerald-100/80" : "text-slate-600"}>{f}</span></li>))}</ul>
                  <button onClick={() => handleSelect(p)} className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all ${p.highlight ? "bg-teal-400 hover:bg-teal-300 text-teal-900" : "bg-emerald-600 hover:bg-emerald-500 text-white"}`}>{p.cta}</button>
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
  const checkout = async (method: CheckoutMethod) => {
    try {
      setLoading(method)
      const isLoggedIn = !!token
      const endpoint = isLoggedIn ? (method === "paypal" ? "/api/billing/subscribe/paypal" : "/api/billing/subscribe/paymongo") : (method === "paypal" ? "/api/billing/newaccount/paypal" : "/api/billing/newaccount/paymongo")
      const payload = isLoggedIn ? { product: plan.product, plan: plan.planKey } : { name, email, product: plan.product, plan: plan.planKey }
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, { method: "POST", headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) }, body: JSON.stringify(payload) })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message)
      window.location.href = data.approveUrl || data.checkoutUrl
    } catch (err: any) { alert(err?.message || "Checkout failed.") } finally { setLoading(null) }
  }
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-emerald-700 to-teal-500 px-6 py-5 flex items-center justify-between">
          <div><h2 className="text-white font-bold text-lg">{step === "details" ? "Create your account" : "Choose payment"}</h2><p className="text-emerald-100 text-sm">{plan.name} — {displayPrice}{plan.period}</p></div>
          <button onClick={onClose} className="text-white/70 hover:text-white"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-6 flex flex-col gap-4">
          {step === "details" && (<>
            <input placeholder="Full name" value={name} onChange={e => setName(e.target.value)} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30" />
            <input type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30" />
            <button onClick={() => { if (!name.trim() || !email.trim()) { alert("Required"); return }; if (!isPhilippines) checkout("paypal"); else setStep("payment") }} disabled={loading !== null} className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-60">
              {loading ? <><Spinner /> Redirecting…</> : <>Continue <ChevronRight className="w-4 h-4" /></>}
            </button>
          </>)}
          {step === "payment" && (<>
            {isPhilippines && <button onClick={() => checkout("paymongo")} disabled={loading !== null} className="w-full flex items-center gap-4 px-5 py-4 border-2 border-slate-200 rounded-2xl hover:border-emerald-500 hover:bg-emerald-50 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center shrink-0"><svg viewBox="0 0 24 24" className="w-5 h-5 fill-white"><path d="M3 3h7v7H3zm0 11h7v7H3zm11-11h7v7h-7zm0 11h7v7h-7z"/></svg></div>
              <div className="flex-1 text-left"><p className="text-sm font-semibold text-slate-800 group-hover:text-emerald-700">QR Ph / GCash / Card</p><p className="text-xs text-slate-400">Philippine payment methods</p></div>
              {loading === "paymongo" ? <Spinner /> : <ChevronRight className="w-4 h-4 text-slate-300" />}
            </button>}
            <button onClick={() => checkout("paypal")} disabled={loading !== null} className="w-full flex items-center gap-4 px-5 py-4 border-2 border-slate-200 rounded-2xl hover:border-blue-500 hover:bg-blue-50 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-[#003087] flex items-center justify-center shrink-0"><svg viewBox="0 0 24 24" className="w-5 h-5 fill-white"><path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c1.379 8.883-5.43 11.61-10.377 11.61H8.23l-1.133 7.184h3.78c.458 0 .848-.332.92-.783l.038-.196.728-4.617.047-.252a.93.93 0 0 1 .919-.784h.578c3.746 0 6.678-1.522 7.534-5.927.358-1.833.173-3.363-.42-4.494z"/></svg></div>
              <div className="flex-1 text-left"><p className="text-sm font-semibold text-slate-800 group-hover:text-blue-700">PayPal</p><p className="text-xs text-slate-400">Pay with your PayPal account</p></div>
              {loading === "paypal" ? <Spinner /> : <ChevronRight className="w-4 h-4 text-slate-300" />}
            </button>
          </>)}
        </div>
      </div>
    </div>
  )
}

export default function VetClinicSystemContent() {
  const [faqOpen, setFaqOpen] = useState<number | null>(null)
  return (
    <main className="bg-white min-h-screen">
      <Navbar />

      {/* HERO */}
      <section className="relative pt-32 pb-20 overflow-hidden"
        style={{ background: "#050d1a", backgroundImage: "repeating-linear-gradient(45deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 28px)", backgroundSize: "28px 28px" }}>
        <div className="absolute -top-32 -left-32 w-[400px] h-[400px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(16,185,129,0.13) 0%, transparent 70%)" }} />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-6">
            <PawPrint className="w-3 h-3" /> Veterinary Clinic Management System
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight tracking-tight mb-6">
            A veterinary clinic management system built for real clinics
          </h1>
          <p className="text-lg text-white/50 max-w-2xl mx-auto mb-10">
            Smapey gives vet clinics one place to manage pets, vets, appointments, vaccinations, and billing. No paper cards. No spreadsheets. No extra software to learn.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=VET_CLINIC&plan=FREE`}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all shadow-lg shadow-emerald-600/30">
              Try it free <ChevronRight className="w-4 h-4" />
            </a>
            <Link href="/vet-clinic" className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white font-medium text-sm transition-all border border-white/10">
              See full overview
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <Animate className="text-center mb-12">
            <p className="text-emerald-600 text-sm font-semibold uppercase tracking-widest mb-3">System Modules</p>
            <h2 className="text-3xl font-extrabold text-slate-800">What the system includes</h2>
            <p className="text-slate-500 mt-3 max-w-xl mx-auto">Every module a vet clinic needs — from the front desk to billing — in one connected system.</p>
          </Animate>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map(({ icon: Icon, title, desc, color, shadow }, i) => (
              <Animate key={title} delay={i * 80}>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md hover:-translate-y-1 transition-all h-full">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-tr ${color} shadow-lg ${shadow} flex items-center justify-center mb-4`}><Icon className="w-5 h-5 text-white" /></div>
                  <h3 className="font-bold text-slate-800 mb-2">{title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <Animate className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-slate-800">How it works</h2>
            <p className="text-slate-500 mt-3">Set up in minutes. Run your clinic the same day.</p>
          </Animate>
          <div className="grid md:grid-cols-3 gap-8">
            {STEPS.map(({ step, title, desc }, i) => (
              <Animate key={step} delay={i * 120}>
                <div className="text-center group">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-50 border-2 border-emerald-100 text-emerald-600 font-extrabold text-lg mb-5 group-hover:bg-gradient-to-tr group-hover:from-emerald-600 group-hover:to-teal-500 group-hover:text-white group-hover:border-transparent transition-all duration-300">{step}</div>
                  <h3 className="font-bold text-slate-800 mb-2">{title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      <Pricing />

      {/* FAQ */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-2xl mx-auto px-6">
          <Animate className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-slate-800">Frequently asked questions</h2>
          </Animate>
          <div className="flex flex-col gap-3">
            {FAQS.map(({ q, a }, i) => (
              <Animate key={i} delay={i * 60}>
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <button onClick={() => setFaqOpen(faqOpen === i ? null : i)} className="w-full flex items-center justify-between px-5 py-4 text-left text-slate-700 font-medium text-sm hover:bg-slate-100 transition-colors">
                    {q}<ChevronRight className={`w-4 h-4 text-emerald-400 transition-transform shrink-0 ${faqOpen === i ? "rotate-90" : ""}`} />
                  </button>
                  {faqOpen === i && <div className="px-5 pb-4 text-sm text-slate-500 leading-relaxed border-t border-slate-100 pt-3">{a}</div>}
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 relative overflow-hidden" style={{ background: "#050d1a" }}>
        <Animate className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-extrabold text-white mb-4">Ready to run a smarter vet clinic?</h2>
          <p className="text-white/40 mb-8">Free to start. No card required. Set up in minutes.</p>
          <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=VET_CLINIC&plan=FREE`}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-semibold transition-all shadow-xl">
            Get started for free <ChevronRight className="w-4 h-4" />
          </a>
        </Animate>
      </section>

      <InternalLinks cluster="vet-clinic" currentPath="/vet-clinic/veterinary-clinic-management-system" />

      <footer className="bg-[#030810] border-t border-white/5 px-6 py-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2"><img src="/logo.png" alt="Smapey" className="w-6 h-6 rounded-md object-cover" /><span className="text-white/60 text-sm font-semibold">Smapey Vet Clinic Manager</span></div>
          <p className="text-white/20 text-xs">© {new Date().getFullYear()} Smapey. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}
