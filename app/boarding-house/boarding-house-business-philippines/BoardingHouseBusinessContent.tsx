"use client"

import { useState, useEffect, useRef } from "react"
import InternalLinks from "@/components/InternalLinks"
import Link from "next/link"
import {
  Building2, Users, BedDouble, CheckCircle2, ChevronRight,
  Banknote, Zap, BarChart3, AlertTriangle,
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

const CHALLENGES = [
  {
    icon: AlertTriangle,
    title: "Chasing overdue rent",
    problem: "Tenants forget to pay. You forget who hasn't paid. The month ends and you're still texting individuals one by one.",
    solution: "Smapey surfaces every overdue bill on the dashboard — tenant name, amount, and how many days past due.",
  },
  {
    icon: Zap,
    title: "Splitting utility costs",
    problem: "Calculating each tenant's share of electricity and water — manually, every month — takes hours and creates arguments.",
    solution: "Create individual utility bills per tenant per month. Rent and utilities are itemized separately, no confusion.",
  },
  {
    icon: Users,
    title: "Tracking move-ins and move-outs",
    problem: "Paper records get lost. You don't remember when a tenant moved in or what rate you agreed on.",
    solution: "Every tenancy has a move-in date, room assignment, and agreed rate stored in the system — searchable anytime.",
  },
  {
    icon: BarChart3,
    title: "Knowing your monthly income",
    problem: "You have to manually add up payments from a notebook to know how much you collected this month.",
    solution: "The dashboard shows rent collected, utilities collected, and total revenue — with a 6-month trend chart.",
  },
]

export default function BoardingHouseBusinessContent() {
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
              <Building2 className="w-3.5 h-3.5" /> Boarding house business · Philippines
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-5">
              Running a Boarding House Business<br />
              <span className="text-orange-600">in the Philippines</span>
            </h1>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-8 leading-relaxed">
              A boarding house business in the Philippines can be one of the most stable sources of passive income — if you have the right system to manage it. Here's how Smapey helps landlords stay on top of rooms, tenants, and collections.
            </p>
            <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=BOARDING_HOUSE&plan=FREE`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-semibold text-sm transition-all shadow-lg shadow-orange-500/25">
              Try Smapey free <ChevronRight className="w-4 h-4" />
            </a>
          </Animate>
        </div>
      </section>

      {/* WHY BOARDING HOUSE */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <Animate>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 mb-5">
              Why boarding houses are popular in the Philippines
            </h2>
            <p className="text-slate-500 leading-relaxed mb-4">
              The <strong className="text-slate-700">boarding house business in the Philippines</strong> thrives near universities, hospitals, call centers, and business districts. Students, nurses, and young professionals need affordable housing close to where they study or work — and bedspaces or dormitory-style rooms fill that gap at a price point that works for both tenant and landlord.
            </p>
            <p className="text-slate-500 leading-relaxed mb-4">
              Unlike traditional long-term leases, boarding house arrangements are typically month-to-month — which means landlords can adjust rates, replace tenants quickly, and maintain flexibility over the property. The trade-off is that it requires more active management: collecting rent every month, tracking utility usage per tenant, and keeping records of who lives where.
            </p>
            <p className="text-slate-500 leading-relaxed">
              That's exactly the problem Smapey solves. Instead of managing it all in notebooks, group chats, and spreadsheets, you get a clean system that handles rooms, tenants, billing, and collections — all in one place.
            </p>
          </Animate>
        </div>
      </section>

      {/* CHALLENGES */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <Animate className="text-center mb-14">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800">
              The biggest challenges — and how Smapey solves them
            </h2>
            <p className="text-slate-500 mt-3 max-w-lg mx-auto">
              Every boarding house owner in the Philippines faces the same four problems. Here's exactly how the system addresses each one.
            </p>
          </Animate>
          <div className="grid sm:grid-cols-2 gap-6">
            {CHALLENGES.map(({ icon: Icon, title, problem, solution }, i) => (
              <Animate key={title} delay={i * 80}>
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 h-full">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-orange-500" />
                  </div>
                  <h3 className="font-bold text-slate-800 mb-3">{title}</h3>
                  <div className="space-y-2">
                    <div className="flex gap-2 text-sm">
                      <span className="text-red-400 font-semibold shrink-0 mt-0.5">✗</span>
                      <p className="text-slate-500 leading-relaxed">{problem}</p>
                    </div>
                    <div className="flex gap-2 text-sm">
                      <span className="text-orange-500 font-semibold shrink-0 mt-0.5">✓</span>
                      <p className="text-slate-700 leading-relaxed font-medium">{solution}</p>
                    </div>
                  </div>
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT YOU CAN MANAGE */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <Animate className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800">
              What Smapey manages for your boarding house business
            </h2>
          </Animate>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: BedDouble, label: "Rooms", desc: "Add rooms with floor, capacity, and monthly rate. Track which are occupied and which are vacant." },
              { icon: Users, label: "Tenants", desc: "Register tenants with complete profiles — contact, emergency contact, and ID info." },
              { icon: Building2, label: "Tenancies", desc: "Assign tenants to rooms with move-in dates. Record move-outs when they leave." },
              { icon: Banknote, label: "Rent Bills", desc: "Generate monthly rent bills. Record full or partial payments. Track overdue accounts." },
              { icon: Zap, label: "Utility Bills", desc: "Issue separate electricity, water, and internet bills per tenant per month." },
              { icon: BarChart3, label: "Dashboard", desc: "Real-time occupancy, monthly revenue by type, and a 6-month trend chart." },
            ].map(({ icon: Icon, label, desc }, i) => (
              <Animate key={label} delay={i * 60}>
                <div className="flex items-start gap-4 bg-orange-50 border border-orange-100 rounded-2xl p-4">
                  <div className="w-9 h-9 rounded-lg bg-orange-100 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="w-4 h-4 text-orange-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800 text-sm">{label}</p>
                    <p className="text-slate-500 text-xs mt-0.5 leading-relaxed">{desc}</p>
                  </div>
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gradient-to-br from-orange-600 to-amber-500 text-white text-center">
        <Animate className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-extrabold mb-4">Start managing your boarding house business today</h2>
          <p className="text-orange-100/80 mb-8 max-w-lg mx-auto">
            Free plan available. Set up rooms, add tenants, and issue your first rent bill in under 10 minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=BOARDING_HOUSE&plan=FREE`}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-white text-orange-600 font-semibold hover:bg-orange-50 transition-all shadow-xl">
              Get started free <ChevronRight className="w-4 h-4" />
            </a>
            <Link href="/boarding-house"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-sm transition-all border border-white/20">
              Learn more about Smapey
            </Link>
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-4 text-orange-100/70 text-xs">
            {["Free plan forever", "No credit card needed", "Philippines-focused"].map(t => (
              <span key={t} className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" /> {t}
              </span>
            ))}
          </div>
        </Animate>
      </section>

      <InternalLinks cluster="boarding-house" currentPath="/boarding-house/boarding-house-business-philippines" />

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
