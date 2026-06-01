"use client"

import { useState, useEffect, useRef } from "react"
import InternalLinks from "@/components/InternalLinks"
import Link from "next/link"
import {
  Building2, CheckCircle2, ChevronRight,
  Banknote, Zap, AlertTriangle, BarChart3, Receipt, Users,
} from "lucide-react"

function useInView(opts?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect() } },
      { threshold: 0.12, ...opts }
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
      opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(24px)",
    }}>
      {children}
    </div>
  )
}

const BILLING_FEATURES = [
  {
    icon: Banknote,
    title: "Monthly Rent Billing",
    desc: "Generate a rent bill for each tenant at the start of the month. Set the amount, due date, and payment method. The system tracks the balance automatically.",
    color: "from-orange-500 to-amber-400",
  },
  {
    icon: Zap,
    title: "Utility Billing",
    desc: "Create separate electricity, water, or internet bills per tenant per month. Utilities are clearly separated from rent so tenants always understand what they owe.",
    color: "from-amber-500 to-yellow-400",
  },
  {
    icon: Receipt,
    title: "Partial Payment Support",
    desc: "Record partial payments on any bill. The remaining balance is tracked automatically — no manual calculations needed.",
    color: "from-orange-600 to-amber-500",
  },
  {
    icon: AlertTriangle,
    title: "Overdue Bill Alerts",
    desc: "Every overdue rent bill surfaces on the dashboard with tenant name, room, amount, and due date. You always know who hasn't paid without having to check manually.",
    color: "from-red-500 to-orange-400",
  },
  {
    icon: BarChart3,
    title: "Revenue Dashboard",
    desc: "See rent collected and utilities collected this month — plus a 6-month stacked bar chart showing rent vs. utility revenue trends.",
    color: "from-orange-600 to-amber-400",
  },
  {
    icon: Users,
    title: "Tenant-linked Bills",
    desc: "Every bill is linked to a specific tenant and tenancy. Payment history is stored per tenant — you always have a complete record for any dispute or query.",
    color: "from-amber-600 to-orange-500",
  },
]

const HOW_IT_WORKS = [
  {
    step: "1",
    title: "Set up rooms and assign tenants",
    desc: "Add your rooms once. Assign tenants with a move-in date and monthly rate. The system links every bill to the right tenant automatically.",
  },
  {
    step: "2",
    title: "Generate bills each month",
    desc: "Create a rent bill and utility bill per tenant. Set amounts and due dates. It takes under a minute per tenant.",
  },
  {
    step: "3",
    title: "Record payments as they come in",
    desc: "When a tenant pays — cash, GCash, Maya, or bank transfer — mark the payment on their bill. Partial payments are tracked. Overdue balances flag themselves.",
  },
]

export default function BoardingHouseBillingContent() {
  return (
    <main className="min-h-screen bg-white">
      {/* NAV */}
      <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-100 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/boarding-house" className="flex items-center gap-2">
            <img src="/logo.png" alt="Smapey" className="w-7 h-7 rounded-lg" />
            <span className="font-bold text-slate-800 text-sm">Smapey Boarding House</span>
          </Link>
          <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=BOARDING_HOUSE&plan=FREE`}
            className="text-sm font-semibold px-4 py-2 rounded-lg bg-orange-600 hover:bg-orange-500 text-white transition-colors shadow-md shadow-orange-600/20">
            Try free
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="bg-gradient-to-br from-orange-50 via-amber-50 to-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Animate>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-100 text-orange-700 text-xs font-semibold mb-5">
              <Building2 className="w-3.5 h-3.5" /> Management + billing · Philippines
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-5">
              Boarding House Management<br />
              <span className="text-orange-600">and Billing System</span>
            </h1>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-8 leading-relaxed">
              Smapey combines boarding house management and billing in one system — rooms, tenants, rent bills, utility bills, payment tracking, and overdue alerts. Built for Philippine landlords who want the whole operation in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=BOARDING_HOUSE&plan=FREE`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-semibold text-sm transition-all shadow-lg shadow-orange-500/25">
                Start free — no credit card <ChevronRight className="w-4 h-4" />
              </a>
              <Link href="/boarding-house" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-slate-200 text-slate-600 hover:border-orange-400 hover:text-orange-600 font-medium text-sm transition-all">
                See full product overview
              </Link>
            </div>
          </Animate>
        </div>
      </section>

      {/* WHAT IS IT */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <Animate>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 mb-5">
              What is a boarding house management and billing system?
            </h2>
            <p className="text-slate-500 leading-relaxed mb-4">
              A <strong className="text-slate-700">boarding house management and billing system</strong> combines two things that most Philippine landlords still handle separately: (1) managing their property — rooms, tenants, occupancy — and (2) billing tenants for rent and utilities every month.
            </p>
            <p className="text-slate-500 leading-relaxed mb-4">
              When these two things are in the same system, everything connects automatically. A tenant is assigned to a room — their billing details are already there. They move out — the room is freed and billing stops. They pay a bill — the payment is recorded against their account instantly.
            </p>
            <p className="text-slate-500 leading-relaxed">
              Smapey is exactly that: a combined boarding house management and billing system that keeps every room, tenant, and payment connected — so you always know the full picture without manually reconciling records.
            </p>
          </Animate>
        </div>
      </section>

      {/* BILLING FEATURES */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <Animate className="text-center mb-14">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800">
              Billing features built for boarding houses
            </h2>
            <p className="text-slate-500 mt-3 max-w-lg mx-auto">
              Every billing feature is designed around the way Philippine boarding houses actually collect rent.
            </p>
          </Animate>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {BILLING_FEATURES.map(({ icon: Icon, title, desc, color }, i) => (
              <Animate key={title} delay={i * 70}>
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 hover:shadow-md hover:-translate-y-1 transition-all h-full">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-tr ${color} shadow-md flex items-center justify-center mb-4`}>
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

      {/* HOW IT WORKS */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <Animate className="text-center mb-14">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800">
              How the billing system works
            </h2>
          </Animate>
          <div className="grid md:grid-cols-3 gap-8">
            {HOW_IT_WORKS.map(({ step, title, desc }, i) => (
              <Animate key={step} delay={i * 100}>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-orange-50 border-2 border-orange-100 text-orange-600 font-extrabold text-lg mb-5">
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

      {/* COMPARISON */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <Animate className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800">
              Manual billing vs. using Smapey
            </h2>
          </Animate>
          <div className="grid sm:grid-cols-2 gap-6">
            <Animate>
              <div className="bg-red-50 border border-red-100 rounded-2xl p-6">
                <p className="text-red-500 font-bold text-sm uppercase tracking-widest mb-4">Manual billing</p>
                {[
                  "Writing bills by hand in a notebook",
                  "Texting tenants individually about rent",
                  "Forgetting who paid and who didn't",
                  "Calculating utility shares with a calculator",
                  "No clear record of payment history",
                  "Overdue accounts slip through the cracks",
                ].map(t => (
                  <div key={t} className="flex items-center gap-2 py-2 border-b border-red-100 text-sm text-slate-500 last:border-0">
                    <span className="text-red-400 font-bold">✗</span> {t}
                  </div>
                ))}
              </div>
            </Animate>
            <Animate delay={100}>
              <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6">
                <p className="text-orange-600 font-bold text-sm uppercase tracking-widest mb-4">With Smapey</p>
                {[
                  "Bills created in seconds per tenant",
                  "Overdue accounts flagged automatically",
                  "Every payment recorded and tracked",
                  "Rent and utilities clearly separated",
                  "Full payment history per tenant",
                  "Real-time dashboard with monthly revenue",
                ].map(t => (
                  <div key={t} className="flex items-center gap-2 py-2 border-b border-orange-100 text-sm text-slate-700 last:border-0">
                    <CheckCircle2 className="w-3.5 h-3.5 text-orange-500 shrink-0" /> {t}
                  </div>
                ))}
              </div>
            </Animate>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gradient-to-br from-orange-600 to-amber-500 text-white text-center">
        <Animate className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-extrabold mb-4">Try the boarding house billing system for free</h2>
          <p className="text-orange-100/80 mb-8 max-w-lg mx-auto">
            Free plan available. Issue your first rent and utility bills in under 10 minutes.
          </p>
          <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=BOARDING_HOUSE&plan=FREE`}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white text-orange-600 font-semibold hover:bg-orange-50 transition-all shadow-xl">
            Get started free <ChevronRight className="w-4 h-4" />
          </a>
        </Animate>
      </section>

      <InternalLinks cluster="boarding-house" currentPath="/boarding-house/boarding-house-management-and-billing-system" />

      <footer className="bg-slate-900 px-6 py-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <img src="/logo.png" alt="Smapey" className="w-6 h-6 rounded-md" />
          <span className="text-white/60 text-sm font-semibold">Smapey Boarding House Manager</span>
        </div>
        <p className="text-white/20 text-xs">© {new Date().getFullYear()} Smapey. All rights reserved.</p>
      </footer>
    </main>
  )
}
