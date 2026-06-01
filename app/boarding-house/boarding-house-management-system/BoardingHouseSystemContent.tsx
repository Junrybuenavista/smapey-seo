"use client"

import { useState, useEffect, useRef } from "react"
import InternalLinks from "@/components/InternalLinks"
import Link from "next/link"
import {
  Building2, Users, BedDouble, CheckCircle2, ChevronRight,
  Banknote, Zap, AlertTriangle, BarChart3, Shield, Receipt,
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

const MODULES = [
  {
    icon: BedDouble,
    title: "Room Management",
    desc: "Add rooms with name, floor, capacity, and monthly rate. Activate or deactivate rooms — occupancy recalculates automatically.",
    color: "from-orange-500 to-amber-400", shadow: "shadow-orange-400/20",
  },
  {
    icon: Users,
    title: "Tenant Registration",
    desc: "Store complete tenant profiles — name, contact, emergency contact, and ID info. Searchable records, no paper folders.",
    color: "from-amber-500 to-orange-400", shadow: "shadow-amber-400/20",
  },
  {
    icon: Building2,
    title: "Tenancy Management",
    desc: "Assign tenants to rooms with a move-in date and agreed monthly rate. Record move-outs and the room is freed instantly.",
    color: "from-orange-600 to-amber-500", shadow: "shadow-orange-500/20",
  },
  {
    icon: Banknote,
    title: "Rent Billing",
    desc: "Generate monthly rent bills per tenant. Record payments — full or partial — and track outstanding balances automatically.",
    color: "from-amber-600 to-orange-500", shadow: "shadow-amber-500/20",
  },
  {
    icon: Zap,
    title: "Utility Billing",
    desc: "Create separate electricity, water, and internet bills per tenant per month. Keeps rent and utilities clearly itemized.",
    color: "from-orange-500 to-yellow-400", shadow: "shadow-orange-400/20",
  },
  {
    icon: BarChart3,
    title: "Occupancy Dashboard",
    desc: "Real-time view of occupancy rate, overdue bills, rent collected, and utility collected. Monthly revenue trend chart included.",
    color: "from-orange-600 to-amber-400", shadow: "shadow-orange-500/20",
  },
]

const FAQS = [
  {
    q: "What does a boarding house management system do?",
    a: "It replaces spreadsheets and paper records by centralizing room setup, tenant registration, move-in/move-out tracking, monthly rent billing, utility billing, payment recording, and occupancy analytics in one dashboard. Philippine boarding house owners use it to collect rent faster and reduce manual follow-up.",
  },
  {
    q: "Can the system separate rent from utilities?",
    a: "Yes. Rent bills and utility bills are created separately so tenants always know which amount is rent and which is for electricity or water. Both types appear on the dashboard's revenue breakdown.",
  },
  {
    q: "Does it support partial payments?",
    a: "Yes. You can record partial payments on any rent or utility bill. The system calculates the outstanding balance and marks the bill as partially paid. Overdue balances surface automatically on the dashboard.",
  },
  {
    q: "How is occupancy rate calculated?",
    a: "The system counts all rooms with an active tenancy as occupied. Occupancy rate is calculated as occupied rooms divided by total active rooms, shown as a percentage on the dashboard.",
  },
  {
    q: "Is it free to use?",
    a: "Yes — Smapey Boarding House Manager has a free plan. You can manage rooms, tenants, tenancies, rent billing, and utility billing at no cost. Upgrade to PRO or ENTERPRISE when your boarding house needs more capacity.",
  },
]

export default function BoardingHouseSystemContent() {
  const [open, setOpen] = useState<number | null>(null)

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
              <Building2 className="w-3.5 h-3.5" /> Boarding house management system · Philippines
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-5">
              Boarding House Management System<br />
              <span className="text-orange-600">for Philippine Landlords</span>
            </h1>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-8 leading-relaxed">
              Smapey is a boarding house management system that replaces paper records and spreadsheets with a clean dashboard for rooms, tenants, rent billing, utility billing, and occupancy tracking.
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
              What is a boarding house management system?
            </h2>
            <p className="text-slate-500 leading-relaxed mb-4">
              A <strong className="text-slate-700">boarding house management system</strong> is software that helps boarding house owners and landlords in the Philippines manage the full lifecycle of their rental property — from setting up rooms and registering tenants, to issuing monthly rent and utility bills, recording payments, and monitoring occupancy.
            </p>
            <p className="text-slate-500 leading-relaxed mb-4">
              Most Philippine boarding house owners still track tenants in a notebook, record payments on paper, and calculate occupancy manually. A boarding house management system like Smapey replaces all of that with a single digital dashboard — accessible from any device, no installation required.
            </p>
            <p className="text-slate-500 leading-relaxed">
              Whether you run a 5-room boarding house near a university or a 50-room property in the city, the system works the same way: rooms, tenants, bills, payments — all tracked automatically so you can focus on running the property, not doing paperwork.
            </p>
          </Animate>
        </div>
      </section>

      {/* MODULES */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <Animate className="text-center mb-14">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
              Key modules of the system
            </h2>
            <p className="text-slate-500 mt-3 max-w-lg mx-auto">
              Every module works together — rooms feed into tenancy, tenancy feeds into billing, billing feeds into the dashboard.
            </p>
          </Animate>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {MODULES.map(({ icon: Icon, title, desc, color, shadow }, i) => (
              <Animate key={title} delay={i * 70}>
                <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all h-full">
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

      {/* WHO NEEDS IT */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <Animate>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 mb-8 text-center">
              Who needs a boarding house management system?
            </h2>
          </Animate>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: "Boarding house owners near universities", desc: "Manage student tenants with monthly billing, utility tracking, and move-in/move-out records — all in one place." },
              { title: "Dormitory operators in the city", desc: "Track multiple rooms across floors, separate rent and utilities, and monitor occupancy rate from a single dashboard." },
              { title: "Bedspace landlords in Metro Manila", desc: "Issue monthly bills, record GCash and cash payments, and see exactly who has paid and who hasn't." },
              { title: "Property owners managing multiple units", desc: "Add all your rooms, assign tenants, and get a complete picture of collections and overdue accounts at a glance." },
            ].map(({ title, desc }, i) => (
              <Animate key={title} delay={i * 80}>
                <div className="bg-orange-50 border border-orange-100 rounded-2xl p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0" />
                    <h3 className="font-semibold text-slate-800 text-sm">{title}</h3>
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed pl-6">{desc}</p>
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-2xl mx-auto">
          <Animate className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800">Frequently asked questions</h2>
          </Animate>
          <div className="flex flex-col gap-3">
            {FAQS.map(({ q, a }, i) => (
              <Animate key={i} delay={i * 60}>
                <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
                  <button onClick={() => setOpen(open === i ? null : i)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left text-slate-700 font-medium text-sm hover:bg-slate-50 transition-colors">
                    {q}
                    <ChevronRight className={`w-4 h-4 text-orange-400 transition-transform duration-200 shrink-0 ${open === i ? "rotate-90" : ""}`} />
                  </button>
                  {open === i && <div className="px-5 pb-4 text-sm text-slate-500 leading-relaxed border-t border-slate-100 pt-3">{a}</div>}
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gradient-to-br from-orange-600 to-amber-500 text-white text-center">
        <Animate className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-extrabold mb-4">Try the boarding house management system for free</h2>
          <p className="text-orange-100/80 mb-8 max-w-lg mx-auto">
            Set up rooms, register tenants, and issue your first rent bill in under 10 minutes. No credit card. No IT setup.
          </p>
          <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=BOARDING_HOUSE&plan=FREE`}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white text-orange-600 font-semibold hover:bg-orange-50 transition-all shadow-xl">
            Get started free <ChevronRight className="w-4 h-4" />
          </a>
        </Animate>
      </section>

      <InternalLinks cluster="boarding-house" currentPath="/boarding-house/boarding-house-management-system" />

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
