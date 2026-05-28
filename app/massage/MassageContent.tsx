"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Calendar, Users, Flower2, Globe, Inbox, BarChart3, HandHelping, HeartPulse, CheckCircle2, ChevronRight, Zap, X } from "lucide-react"
import { usePricing, type Plan } from "@/lib/usePricing"
import InternalLinks from "@/components/InternalLinks"

const FEATURES = [
  {
    icon: Calendar,
    title: "Appointment Scheduling",
    desc: "Book sessions, assign services and therapists, set durations. View your day at a glance.",
  },
  {
    icon: HandHelping,
    title: "Therapist Management",
    desc: "Track your therapists, their specialties, and assign them to sessions. Filter the calendar by therapist.",
  },
  {
    icon: HeartPulse,
    title: "Client Intake & Health Notes",
    desc: "Full client profiles with medical conditions, allergies, focus areas, and pressure preferences — visible only to staff.",
  },
  {
    icon: Flower2,
    title: "Service Menu",
    desc: "Swedish, deep tissue, hot stone, reflexology — define your full menu with prices and durations. Each service appears on your public booking page automatically.",
  },
  {
    icon: Globe,
    title: "Public Booking Page",
    desc: "Your spa gets a unique URL clients can visit to browse services and send a booking inquiry. Choose from 5 spa-themed designs.",
  },
  {
    icon: Inbox,
    title: "Inquiry Management",
    desc: "See all incoming booking requests in one place. Approve, reject, or convert them into confirmed appointments with one click.",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    desc: "Track monthly revenue, session count, completed appointments, therapist utilization, and pending inquiries.",
  },
]

const STEPS = [
  { num: "1", title: "Set up your services", desc: "Add your massage menu — Swedish, deep tissue, hot stone, foot massage. Set prices and durations." },
  { num: "2", title: "Add your therapists", desc: "List your team with their specialties so clients know who's available." },
  { num: "3", title: "Publish your booking page", desc: "Pick a theme (Zen, Stone, Bamboo, Ivory, or Charcoal), customize your URL, and share." },
  { num: "4", title: "Accept inquiries", desc: "Approve booking requests from your public page and convert them to confirmed appointments." },
]

const FAQ = [
  {
    q: "Is there a free plan?",
    a: "Yes. The free plan includes up to 10 services, 30 appointments per month, 2 team members, and a public booking page. No credit card required.",
  },
  {
    q: "Can clients book online?",
    a: "Yes. Every business gets a unique public URL (e.g. smapey.com/massage/your-spa) where clients can browse services and send a booking request. Approve or decline from your dashboard.",
  },
  {
    q: "Can I track therapist assignments?",
    a: "Yes. Add your therapists, assign them to appointments, and filter the schedule by therapist. Each appointment can also record the client's pressure preference and focus areas.",
  },
  {
    q: "Do you store health information securely?",
    a: "Yes. Health notes are stored on each client profile and only visible to authenticated staff in your organization.",
  },
  {
    q: "Can I take deposits?",
    a: "On the Pro plan and above, you can upload a payment QR (GCash, Maya, bank) and require a reference number before clients can submit a booking request.",
  },
]

function Pricing() {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null)
  const { plans, isPhilippines } = usePricing("MASSAGE")

  const handleSelect = (p: Plan) => {
    if (p.planKey === "FREE") {
      window.location.href = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=${p.product}&plan=FREE`
      return
    }
    setSelectedPlan(p)
  }

  return (
    <section id="pricing" className="max-w-6xl mx-auto px-6 py-20">
      <div className="text-center mb-12">
        <p className="text-xs uppercase tracking-widest font-bold text-emerald-600 mb-2">Pricing</p>
        <h2 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tight">Start free. Upgrade when you grow.</h2>
        <p className="text-slate-500 mt-4">The free plan stays free forever.</p>

        {isPhilippines !== null && (
          <div className="inline-flex items-center gap-1.5 mt-4 px-3 py-1 rounded-full bg-white border border-slate-200 text-xs text-slate-500 shadow-sm">
            <span>{isPhilippines ? "🇵🇭" : "🌍"}</span>
            <span>Prices in <span className="font-semibold text-slate-700">{isPhilippines ? "Philippine Peso (₱)" : "US Dollar ($)"}</span></span>
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-3 gap-6 items-center">
        {plans.map((p) => {
          const displayPrice = isPhilippines === null ? "..." : isPhilippines ? p.phpPrice : p.usdPrice
          return (
            <div key={p.name} className={`rounded-2xl p-8 border transition-all duration-300 hover:-translate-y-1 ${
              p.highlight
                ? "bg-gradient-to-b from-emerald-700 to-teal-900 border-emerald-500/30 shadow-2xl shadow-emerald-500/20 scale-105"
                : "bg-white border-slate-200 shadow-sm hover:shadow-md"
            }`}>
              {p.highlight && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-teal-400/20 text-teal-200 text-xs font-semibold mb-4">
                  <Zap className="w-3 h-3" /> Most popular
                </span>
              )}
              <p className={`font-bold text-lg mb-1 ${p.highlight ? "text-white" : "text-slate-800"}`}>{p.name}</p>
              <p className={`text-sm mb-4 ${p.highlight ? "text-emerald-200/60" : "text-slate-400"}`}>{p.desc}</p>
              <div className="flex items-end gap-1 mb-6">
                <span className={`text-4xl font-extrabold tracking-tight ${p.highlight ? "text-white" : "text-slate-800"}`}>
                  {displayPrice}
                </span>
                <span className={`text-sm mb-1 ${p.highlight ? "text-emerald-200/50" : "text-slate-400"}`}>{p.period}</span>
              </div>

              <ul className="space-y-3 mb-8">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm">
                    <CheckCircle2 className={`w-4 h-4 shrink-0 ${p.highlight ? "text-teal-300" : "text-emerald-500"}`} />
                    <span className={p.highlight ? "text-emerald-100/80" : "text-slate-600"}>{f}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleSelect(p)}
                className={`w-full text-center py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  p.highlight
                    ? "bg-teal-400 hover:bg-teal-300 text-teal-900 shadow-lg shadow-teal-400/25"
                    : "bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-500/20"
                }`}
              >
                {p.cta}
              </button>
            </div>
          )
        })}
      </div>

      {selectedPlan && (
        <PaymentModal
          plan={selectedPlan}
          isPhilippines={isPhilippines ?? false}
          onClose={() => setSelectedPlan(null)}
        />
      )}
    </section>
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
        <div className="bg-gradient-to-r from-emerald-700 to-teal-500 px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {step === "payment" && !token && (
              <button onClick={() => setStep("details")} className="text-white/60 hover:text-white transition">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
              </button>
            )}
            <div>
              <h2 className="text-white font-bold text-lg">{step === "details" ? "Create your account" : "Choose payment method"}</h2>
              <p className="text-emerald-100 text-sm mt-0.5">{plan.name} plan — <span className="font-semibold">{displayPrice}</span>{plan.period}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-white/70 hover:text-white transition-colors"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-6 flex flex-col gap-4">
          {step === "details" && (
            <>
              <input placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400" />
              <input type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400" />
              <button onClick={handleContinue} disabled={loading !== null} className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-60">
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

export default function MassageContent() {
  return (
    <div className="min-h-screen bg-white">

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-teal-50 border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-28">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-400 flex items-center justify-center shadow-md shadow-emerald-500/30">
              <Flower2 className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-slate-700 tracking-tight">Smapey Massage & Spa</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-800 tracking-tight leading-tight max-w-3xl">
            Manage your massage business. <span className="text-emerald-600">Get more bookings.</span>
          </h1>
          <p className="text-slate-500 text-lg mt-5 max-w-2xl">
            Everything you need to run a small spa or massage business — therapists, appointments, client intake forms, a public booking page, and revenue reports. Start free.
          </p>
          <div className="flex flex-wrap items-center gap-3 mt-8">
            <Link href="/register"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-white font-semibold text-sm shadow-lg shadow-emerald-500/30 hover:opacity-90 transition">
              Start Free <ChevronRight className="w-4 h-4" />
            </Link>
            <Link href="/massage/guide"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-200 text-slate-600 font-semibold text-sm hover:bg-slate-50 transition">
              How it works
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-widest font-bold text-emerald-600 mb-2">Features</p>
          <h2 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tight">Built for spas and wellness clinics</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map(f => {
            const Icon = f.icon
            return (
              <div key={f.title} className="rounded-2xl border border-slate-100 p-6 bg-white hover:shadow-md transition">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-400 flex items-center justify-center shadow-md shadow-emerald-500/20 mb-4">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <p className="font-bold text-slate-800 text-base mb-1.5">{f.title}</p>
                <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-slate-50 border-y border-slate-100">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-widest font-bold text-emerald-600 mb-2">How it works</p>
            <h2 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tight">Up and running in minutes</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            {STEPS.map(s => (
              <div key={s.num} className="bg-white rounded-2xl border border-slate-100 p-6">
                <div className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-sm border border-emerald-200 mb-4">
                  {s.num}
                </div>
                <p className="font-bold text-slate-800 mb-1.5">{s.title}</p>
                <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <Pricing />

      {/* FAQ */}
      <section className="bg-slate-50 border-y border-slate-100">
        <div className="max-w-3xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-widest font-bold text-emerald-600 mb-2">FAQ</p>
            <h2 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tight">Frequently asked questions</h2>
          </div>
          <div className="space-y-4">
            {FAQ.map(f => (
              <details key={f.q} className="bg-white rounded-2xl border border-slate-100 px-5 py-4 group">
                <summary className="cursor-pointer font-semibold text-slate-800 text-sm flex items-center justify-between">
                  {f.q}
                  <ChevronRight className="w-4 h-4 text-slate-400 group-open:rotate-90 transition" />
                </summary>
                <p className="text-slate-500 text-sm mt-3 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-bold border border-emerald-200 mb-5">
          <Zap className="w-3 h-3" /> Free Plan Available
        </div>
        <h2 className="text-3xl md:text-5xl font-black text-slate-800 tracking-tight max-w-2xl mx-auto">
          Ready to run your spa with less stress?
        </h2>
        <p className="text-slate-500 text-lg mt-5 max-w-xl mx-auto">
          Set up your services, share your booking link, and start taking inquiries today.
        </p>
        <Link href="/register"
          className="inline-flex items-center gap-2 px-8 py-3.5 mt-8 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-white font-semibold text-sm shadow-lg shadow-emerald-500/30 hover:opacity-90 transition">
          Start Free <ChevronRight className="w-4 h-4" />
        </Link>
      </section>

      {/* INTERNAL LINKS */}
      <InternalLinks cluster="massage" currentPath="/massage" />

      {/* FOOTER */}
      <footer className="border-t border-slate-100 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Flower2 className="w-4 h-4 text-emerald-500" />
            <span>Smapey Massage & Spa</span>
          </div>
          <div className="flex gap-5">
            <Link href="/massage/guide" className="hover:text-slate-700 transition">Guide</Link>
            <Link href="/privacy-policy" className="hover:text-slate-700 transition">Privacy</Link>
            <Link href="/terms-and-conditions" className="hover:text-slate-700 transition">Terms</Link>
            <Link href="/" className="hover:text-slate-700 transition">All Products</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
