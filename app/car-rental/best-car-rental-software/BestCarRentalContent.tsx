"use client"

import { useState, useEffect, useRef } from "react"
import { Car, CheckCircle2, ChevronRight, Menu, X, Star, BarChart3, Users, Shield, Key, AlertCircle } from "lucide-react"

const FEATURES = [
  { icon: Car, title: "Fleet at a glance", desc: "See every vehicle's status — available, rented, or in maintenance — from one screen. No spreadsheets, no guessing.", color: "from-orange-600 to-amber-500", shadow: "shadow-orange-500/20" },
  { icon: Key, title: "Reservation management", desc: "Create rentals with pickup dates, return dates, locations, and deposit tracking. Activate, return, or cancel with a single click.", color: "from-amber-600 to-orange-500", shadow: "shadow-amber-500/20" },
  { icon: AlertCircle, title: "Overdue alerts", desc: "Rentals past their return date are automatically flagged so you can act fast. No more chasing customers manually.", color: "from-orange-700 to-amber-600", shadow: "shadow-orange-600/20" },
  { icon: BarChart3, title: "Revenue dashboard", desc: "Track monthly revenue, rental counts, and fleet utilization from one clean dashboard. Know what's earning and what's sitting idle.", color: "from-amber-500 to-orange-400", shadow: "shadow-amber-400/20" },
  { icon: Users, title: "Customer history", desc: "Every customer has a full rental history. Deactivate without losing records — your data stays protected.", color: "from-orange-500 to-yellow-500", shadow: "shadow-orange-400/20" },
  { icon: Shield, title: "Secure & isolated", desc: "Your data is fully isolated per business. Nothing is shared across accounts. Your fleet stays yours.", color: "from-orange-600 to-yellow-400", shadow: "shadow-orange-500/20" },
]

const PLANS = [
  { name: "Free", phpPrice: "₱0", usdPrice: "$0", period: "/mo", planKey: "FREE", product: "CAR_RENTAL", desc: "Great for operators just starting out.", features: ["Up to 5 vehicles", "20 rentals / month", "Customer records", "2 team members"], cta: "Get started free", highlight: false },
  { name: "Pro", phpPrice: "₱599", usdPrice: "$12", period: "/mo", planKey: "PRO", product: "CAR_RENTAL", desc: "For growing fleets.", features: ["Up to 30 vehicles", "Unlimited rentals", "Overdue tracking", "Revenue dashboard", "5 team members"], cta: "Start Pro", highlight: true },
  { name: "Enterprise", phpPrice: "₱999", usdPrice: "$20", period: "/mo", planKey: "ENTERPRISE", product: "CAR_RENTAL", desc: "No limits, full control.", features: ["Unlimited vehicles", "Unlimited rentals", "Everything in Pro", "Unlimited team members", "Priority support"], cta: "Get Enterprise", highlight: false },
]

const FAQS = [
  { q: "Is Smapey really the best car rental software for small operators?", a: "It's built specifically for small to mid-sized rental businesses. You get fleet tracking, reservation management, overdue detection, and revenue dashboards — without paying for features you don't need." },
  { q: "How is it different from generic rental tools?", a: "Smapey is purpose-built for car rental, not a generic service booking tool. Every feature — vehicle status, return date tracking, maintenance flags — is designed around how a rental business actually works." },
  { q: "Can I try it before paying?", a: "Yes. The free plan gives you up to 5 vehicles and 20 rentals per month with no credit card required. Upgrade when you're ready to grow." },
  { q: "Does it handle deposits?", a: "Yes. Each rental has a deposit amount field so you can track what's been collected before a vehicle leaves the lot." },
]

function useInView(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect() } }, { threshold: 0.15, ...options })
    observer.observe(el); return () => observer.disconnect()
  }, [])
  return { ref, inView }
}

function Animate({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, inView } = useInView()
  return (
    <div ref={ref} className={className} style={{ transitionProperty: "opacity, transform", transitionDuration: "600ms", transitionTimingFunction: "cubic-bezier(0.4,0,0.2,1)", transitionDelay: `${delay}ms`, opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(28px)" }}>
      {children}
    </div>
  )
}

type CheckoutMethod = "paypal" | "paymongo"
const Spinner = () => (<svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>)

function PaymentModal({ plan, isPhilippines, onClose }: { plan: typeof PLANS[0] | null; isPhilippines: boolean; onClose: () => void }) {
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
      if (!res.ok) throw new Error(data.message || JSON.stringify(data))
      window.location.href = data.approveUrl || data.checkoutUrl
    } catch (err: any) { alert(err?.message || "Checkout failed.") } finally { setLoading(null) }
  }
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-orange-700 to-orange-500 px-6 py-5 flex items-center justify-between">
          <div><h2 className="text-white font-bold text-lg">{step === "details" ? "Create your account" : "Choose payment"}</h2><p className="text-orange-100 text-sm">{plan.name} — <span className="font-semibold">{displayPrice}</span>{plan.period}</p></div>
          <button onClick={onClose} className="text-white/70 hover:text-white"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-6 flex flex-col gap-4">
          {step === "details" && (<>
            <input placeholder="Full name" value={name} onChange={e => setName(e.target.value)} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-400" />
            <input type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-400" />
            <button onClick={() => { if (!name.trim() || !email.trim()) { alert("Name and email required"); return } if (!isPhilippines) checkout("paypal"); else setStep("payment") }} disabled={!!loading} className="w-full py-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-60">
              {loading ? <><Spinner /> Redirecting…</> : <>Continue <ChevronRight className="w-4 h-4" /></>}
            </button>
          </>)}
          {step === "payment" && (<>
            {isPhilippines && (<button onClick={() => checkout("paymongo")} disabled={!!loading} className="w-full flex items-center gap-4 px-5 py-4 border-2 border-slate-200 rounded-2xl hover:border-green-500 hover:bg-green-50 transition-all group"><div className="w-10 h-10 rounded-xl bg-green-600 flex items-center justify-center shrink-0"><svg viewBox="0 0 24 24" className="w-5 h-5 fill-white"><path d="M3 3h7v7H3zm0 11h7v7H3zm11-11h7v7h-7zm0 11h7v7h-7z"/></svg></div><div className="flex-1 text-left"><p className="text-sm font-semibold">QR Ph / GCash / Card</p><p className="text-xs text-slate-400">Philippine payment methods</p></div>{loading === "paymongo" ? <Spinner /> : <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-green-500" />}</button>)}
            <button onClick={() => checkout("paypal")} disabled={!!loading} className="w-full flex items-center gap-4 px-5 py-4 border-2 border-slate-200 rounded-2xl hover:border-orange-500 hover:bg-orange-50 transition-all group"><div className="w-10 h-10 rounded-xl bg-[#003087] flex items-center justify-center shrink-0"><svg viewBox="0 0 24 24" className="w-5 h-5 fill-white"><path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c1.379 8.883-5.43 11.61-10.377 11.61H8.23l-1.133 7.184h3.78c.458 0 .848-.332.92-.783l.038-.196.728-4.617.047-.252a.93.93 0 0 1 .919-.784h.578c3.746 0 6.678-1.522 7.534-5.927.358-1.833.173-3.363-.42-4.494z"/></svg></div><div className="flex-1 text-left"><p className="text-sm font-semibold">PayPal</p><p className="text-xs text-slate-400">Pay with your PayPal account</p></div>{loading === "paypal" ? <Spinner /> : <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-orange-500" />}</button>
          </>)}
          <p className="text-center text-xs text-slate-400">Secure checkout · Cancel anytime · No hidden fees</p>
        </div>
      </div>
    </div>
  )
}

export default function BestCarRentalContent() {
  const [open, setOpen] = useState<number | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<typeof PLANS[0] | null>(null)
  const [isPhilippines, setIsPhilippines] = useState<boolean | null>(null)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20); window.addEventListener("scroll", onScroll); return () => window.removeEventListener("scroll", onScroll)
  }, [])
  useEffect(() => {
    const tzFallback = Intl.DateTimeFormat().resolvedOptions().timeZone === "Asia/Manila"
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/billing/geo`).then(r => r.json()).then(d => setIsPhilippines(d.isPhilippines ?? tzFallback)).catch(() => setIsPhilippines(tzFallback))
  }, [])
  const handleSelect = (p: typeof PLANS[0]) => { if (p.planKey === "FREE") { window.location.href = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=${p.product}&plan=FREE`; return } setSelectedPlan(p) }

  return (
    <main>
      {/* NAV */}
      <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#1a0800]/90 backdrop-blur-md border-b border-white/5 shadow-lg" : "bg-transparent"}`}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/car-rental" className="flex items-center gap-2.5"><img src="/logo.png" alt="Smapey" className="w-8 h-8 rounded-lg object-cover" /><span className="text-white font-bold tracking-tight">Smapey Car Rental</span></a>
          <div className="hidden md:flex items-center gap-8">
            <a href="/car-rental" className="text-sm text-white/60 hover:text-white transition-colors">Home</a>
            <a href="#features" className="text-sm text-white/60 hover:text-white transition-colors">Features</a>
            <a href="#pricing" className="text-sm text-white/60 hover:text-white transition-colors">Pricing</a>
            <a href="/car-rental/guide" className="text-sm text-white/60 hover:text-white transition-colors">Guide</a>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/login`} className="text-sm text-white/60 hover:text-white px-4 py-2">Sign in</a>
            <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=CAR_RENTAL&plan=FREE`} className="text-sm font-semibold px-4 py-2 rounded-lg bg-orange-600 hover:bg-orange-500 text-white shadow-lg shadow-orange-600/25">Get started</a>
          </div>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-white/60 hover:text-white">{mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}</button>
        </div>
        {mobileOpen && (<div className="md:hidden bg-[#1a0800] border-t border-white/5 px-6 py-4 flex flex-col gap-4"><a href="/car-rental" className="text-sm text-white/60">Home</a><a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=CAR_RENTAL&plan=FREE`} className="text-sm font-semibold px-4 py-2 rounded-lg bg-orange-600 text-white text-center">Get started</a></div>)}
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center pt-16 overflow-hidden" style={{ background: "#1a0800", backgroundImage: "repeating-linear-gradient(45deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 28px)", backgroundSize: "28px 28px" }}>
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(249,115,22,0.15) 0%, transparent 70%)" }} />
        <div className="relative max-w-6xl mx-auto px-6 py-24 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold mb-6"><Car className="w-3 h-3" />Best car rental software</div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight mb-6">
            The best car rental software{" "}<span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400">built for real operators</span>
          </h1>
          <p className="text-lg text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed">Smapey gives you everything you need to manage your fleet, track rentals, and grow your car rental business — without paying for features you'll never use.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=CAR_RENTAL&plan=FREE`} className="flex items-center gap-2 px-6 py-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-semibold text-sm transition-all shadow-lg shadow-orange-600/30">Start for free <ChevronRight className="w-4 h-4" /></a>
            <a href="#features" className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 font-medium text-sm transition-all border border-white/10">See features</a>
          </div>
          <div className="mt-16 flex flex-wrap items-center justify-center gap-6 text-white/30 text-xs">
            {["No credit card required", "Free plan forever", "Set up in minutes"].map(t => (<span key={t} className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-orange-400" />{t}</span>))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <Animate className="text-center mb-16">
            <p className="text-orange-600 text-sm font-semibold uppercase tracking-widest mb-3">Why Smapey</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">What makes it the best choice</h2>
            <p className="text-slate-500 mt-4 max-w-xl mx-auto">Purpose-built for car rental — not a generic tool with a rename.</p>
          </Animate>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map(({ icon: Icon, title, desc, color, shadow }, i) => (
              <Animate key={title} delay={i * 80}>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300 h-full">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-tr ${color} shadow-lg ${shadow} flex items-center justify-center mb-4`}><Icon className="w-5 h-5 text-white" /></div>
                  <h3 className="font-bold text-slate-800 mb-2">{title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <Animate className="text-center mb-16">
            <p className="text-orange-600 text-sm font-semibold uppercase tracking-widest mb-3">Pricing</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">Affordable for any fleet size</h2>
            <p className="text-slate-500 mt-4">Start free. Upgrade only when you need to.</p>
            {isPhilippines !== null && (<div className="inline-flex items-center gap-1.5 mt-4 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs text-slate-500"><span>{isPhilippines ? "🇵🇭" : "🌍"}</span><span>Prices in <span className="font-semibold text-slate-700">{isPhilippines ? "Philippine Peso (₱)" : "US Dollar ($)"}</span></span></div>)}
          </Animate>
          <div className="grid md:grid-cols-3 gap-6 items-center">
            {PLANS.map((p, i) => {
              const displayPrice = isPhilippines === null ? "..." : isPhilippines ? p.phpPrice : p.usdPrice
              return (
                <Animate key={p.name} delay={i * 100}>
                  <div className={`rounded-2xl p-8 border transition-all duration-300 hover:-translate-y-1 ${p.highlight ? "bg-gradient-to-b from-orange-700 to-orange-900 border-orange-500/30 shadow-2xl shadow-orange-600/20 scale-105" : "bg-white border-slate-200 shadow-sm hover:shadow-md"}`}>
                    {p.highlight && <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-semibold mb-4"><Star className="w-3 h-3" /> Most popular</span>}
                    <p className={`font-bold text-lg mb-1 ${p.highlight ? "text-white" : "text-slate-800"}`}>{p.name}</p>
                    <p className={`text-sm mb-4 ${p.highlight ? "text-orange-200/60" : "text-slate-400"}`}>{p.desc}</p>
                    <div className="flex items-end gap-1 mb-6"><span className={`text-4xl font-extrabold tracking-tight ${p.highlight ? "text-white" : "text-slate-800"}`}>{displayPrice}</span><span className={`text-sm mb-1 ${p.highlight ? "text-orange-200/50" : "text-slate-400"}`}>{p.period}</span></div>
                    <ul className="space-y-3 mb-8">{p.features.map(f => (<li key={f} className="flex items-center gap-2.5 text-sm"><CheckCircle2 className={`w-4 h-4 shrink-0 ${p.highlight ? "text-amber-300" : "text-orange-500"}`} /><span className={p.highlight ? "text-orange-100/80" : "text-slate-600"}>{f}</span></li>))}</ul>
                    <button onClick={() => handleSelect(p)} className={`w-full text-center py-2.5 rounded-xl text-sm font-semibold transition-all ${p.highlight ? "bg-amber-400 hover:bg-amber-300 text-amber-900" : "bg-orange-600 hover:bg-orange-500 text-white"}`}>{p.cta}</button>
                  </div>
                </Animate>
              )
            })}
          </div>
        </div>
        {selectedPlan && <PaymentModal plan={selectedPlan} isPhilippines={isPhilippines ?? false} onClose={() => setSelectedPlan(null)} />}
      </section>

      {/* FAQ */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-2xl mx-auto px-6">
          <Animate className="text-center mb-16"><p className="text-orange-600 text-sm font-semibold uppercase tracking-widest mb-3">FAQ</p><h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">Common questions</h2></Animate>
          <div className="flex flex-col gap-3">
            {FAQS.map(({ q, a }, i) => (
              <Animate key={i} delay={i * 60}>
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between px-5 py-4 text-left text-slate-700 font-medium text-sm hover:bg-slate-50 transition-colors">{q}<ChevronRight className={`w-4 h-4 text-orange-400 transition-transform duration-200 shrink-0 ${open === i ? "rotate-90" : ""}`} /></button>
                  {open === i && <div className="px-5 pb-4 text-sm text-slate-500 leading-relaxed border-t border-slate-100 pt-3">{a}</div>}
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative overflow-hidden" style={{ background: "#1a0800", backgroundImage: "repeating-linear-gradient(45deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 28px)", backgroundSize: "28px 28px" }}>
        <Animate className="relative max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">Try the best car rental software free</h2>
          <p className="text-white/40 mb-8">No credit card. No setup fees. Start managing your fleet today.</p>
          <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=CAR_RENTAL&plan=FREE`} className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white font-semibold transition-all shadow-xl shadow-orange-600/20">Get started for free <ChevronRight className="w-4 h-4" /></a>
        </Animate>
      </section>

      <footer className="bg-[#0f0500] border-t border-white/5 px-6 py-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2"><img src="/logo.png" alt="Smapey" className="w-6 h-6 rounded-md object-cover" /><span className="text-white/60 text-sm font-semibold">Smapey Car Rental</span></div>
          <p className="text-white/20 text-xs">© {new Date().getFullYear()} Smapey. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}
