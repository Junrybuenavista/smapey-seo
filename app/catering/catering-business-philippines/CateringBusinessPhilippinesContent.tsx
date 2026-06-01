"use client"

import { useState, useEffect, useRef } from "react"
import InternalLinks from "@/components/InternalLinks"
import Link from "next/link"
import { ChefHat, CheckCircle2, ChevronRight, CalendarDays, Package, Banknote, FlaskConical, UserCheck, BarChart3 } from "lucide-react"

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
    icon: CalendarDays,
    problem: "Bookings tracked in a group chat or notebook",
    solution: "A centralized booking list with status, event date, guest count, and assigned packages — every booking visible at once.",
    color: "from-rose-500 to-pink-400", shadow: "shadow-rose-400/20",
  },
  {
    icon: Banknote,
    problem: "Chasing clients for partial payments and balances",
    solution: "Payment milestones per booking — reservation fee, partial, and final balance — with status tracking and overdue alerts on the dashboard.",
    color: "from-pink-500 to-rose-400", shadow: "shadow-pink-400/20",
  },
  {
    icon: Package,
    problem: "Re-quoting the same packages every inquiry",
    solution: "A package catalog with name, description, and price per head. Attach packages to any booking in seconds.",
    color: "from-rose-600 to-pink-500", shadow: "shadow-rose-500/20",
  },
  {
    icon: FlaskConical,
    problem: "No clear picture of food costs per event",
    solution: "A supply catalog with unit types and cost per unit. Link ingredients to packages and estimate procurement cost before the event.",
    color: "from-pink-600 to-rose-500", shadow: "shadow-pink-500/20",
  },
  {
    icon: UserCheck,
    problem: "Staff assignments scattered across messages",
    solution: "Assign staff to each booking directly in the system. Everyone sees their roster — no separate announcement needed.",
    color: "from-rose-500 to-red-400", shadow: "shadow-rose-400/20",
  },
  {
    icon: BarChart3,
    problem: "No clear view of monthly revenue and collections",
    solution: "A revenue dashboard with upcoming events, money collected this month, pending milestones, and a monthly trend chart.",
    color: "from-rose-600 to-pink-400", shadow: "shadow-rose-500/20",
  },
]

const FAQS = [
  {
    q: "How profitable is a catering business in the Philippines?",
    a: "Profitability depends on event volume, package pricing, and food cost management. A well-run small catering business in the Philippines handling 4–8 events per month can generate ₱50,000–₱150,000 monthly in revenue. Keeping food costs below 35% of revenue and minimizing uncollected payments are the two biggest levers. A catering management system like Smapey helps you track both.",
  },
  {
    q: "What's the biggest operational challenge for catering businesses in the Philippines?",
    a: "Most catering businesses struggle with three things: tracking multiple simultaneous bookings, collecting staggered payments on time, and estimating supply costs accurately. These are all manageable with the right system — Smapey is built specifically around these pain points.",
  },
  {
    q: "Do I need software even if I only do a few events per month?",
    a: "Yes — even at 2–4 events per month, the time spent manually tracking payments, quoting packages, and coordinating staff adds up. A free catering management system eliminates that overhead so you spend more time on the business itself.",
  },
  {
    q: "Can I manage a home-based catering business with Smapey?",
    a: "Absolutely. Smapey's free plan is designed for small catering operations — home-based caterers, solo operators, and teams just starting out. There's no minimum event volume or setup fee.",
  },
  {
    q: "Does Smapey support GCash and other Philippine payment methods?",
    a: "Yes. When recording milestone payments, you can log the method as Cash, GCash, Maya, Card, or Bank Transfer. The system doesn't process payments itself — it records what you collect and keeps the collection history accurate.",
  },
]

export default function CateringBusinessPhilippinesContent() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <main className="min-h-screen bg-white">
      {/* NAV */}
      <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-100 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/catering" className="flex items-center gap-2">
            <img src="/logo.png" alt="Smapey" className="w-7 h-7 rounded-lg" />
            <span className="font-bold text-slate-800 text-sm">Smapey Catering</span>
          </Link>
          <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=CATERING&plan=FREE`}
            className="text-sm font-semibold px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white transition-colors shadow-md shadow-rose-600/20">
            Try free
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="bg-gradient-to-br from-rose-50 via-pink-50 to-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Animate>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-100 text-rose-700 text-xs font-semibold mb-5">
              <ChefHat className="w-3.5 h-3.5" /> Catering business · Philippines
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-5">
              Run your catering business in the Philippines<br />
              <span className="text-rose-600">without the paperwork chaos</span>
            </h1>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-8 leading-relaxed">
              Smapey is built for Philippine catering businesses — manage bookings, packages, payment milestones, supply costs, and staff assignments all from one clean dashboard.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=CATERING&plan=FREE`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-sm transition-all shadow-lg shadow-rose-500/25">
                Start free — no credit card <ChevronRight className="w-4 h-4" />
              </a>
              <Link href="/catering" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-slate-200 text-slate-600 hover:border-rose-400 hover:text-rose-600 font-medium text-sm transition-all">
                See full product overview
              </Link>
            </div>
          </Animate>
        </div>
      </section>

      {/* PROBLEMS & SOLUTIONS */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <Animate className="mb-12 text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800">
              The problems every Philippine catering business faces — and how Smapey solves them
            </h2>
          </Animate>
          <div className="grid sm:grid-cols-2 gap-6">
            {CHALLENGES.map(({ icon: Icon, problem, solution, color, shadow }, i) => (
              <Animate key={problem} delay={i * 70}>
                <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all h-full">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${color} shadow-md ${shadow} flex items-center justify-center mb-4`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-xs font-semibold text-rose-500 uppercase tracking-wider mb-1">Problem</p>
                  <p className="text-slate-700 font-medium text-sm mb-3">{problem}</p>
                  <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wider mb-1">Solution</p>
                  <p className="text-slate-500 text-sm leading-relaxed">{solution}</p>
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT CATERING IN PH */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <Animate>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 mb-5">
              The catering business landscape in the Philippines
            </h2>
            <p className="text-slate-500 leading-relaxed mb-4">
              The catering industry in the Philippines is driven by a culture of large family gatherings, weddings, debuts, baptisms, and corporate events. Filipino families are known for going all-out on celebrations — which means catering businesses often handle high-value bookings where getting the payment schedule and supply planning right is critical.
            </p>
            <p className="text-slate-500 leading-relaxed mb-4">
              Most catering businesses in the Philippines start small — a home-based operation run by one or two people, often taking bookings through Facebook or referrals. As the business grows, the operational complexity grows with it: more clients, more events running simultaneously, more staff to coordinate, and more suppliers to track.
            </p>
            <p className="text-slate-500 leading-relaxed">
              The shift from running a catering business on notebooks, spreadsheets, and Messenger threads to using a dedicated catering management system is usually what separates businesses that scale from those that stay stuck in manual operations. Smapey is designed to make that shift as easy as possible — free to start, no IT setup, accessible from any device.
            </p>
          </Animate>
        </div>
      </section>

      {/* WHAT YOU GET */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <Animate className="mb-10 text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800">What you get with Smapey</h2>
          </Animate>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              "Event booking management with status tracking",
              "Client profiles with full booking history",
              "Package catalog with price per head",
              "Payment milestones per booking — reservation, partial, balance",
              "Supply catalog with unit costs",
              "Staff assignment per event",
              "Revenue dashboard with monthly trend chart",
              "GCash, Cash, Maya, Card, Bank Transfer payment logging",
              "Free plan — no credit card required",
              "Accessible from any browser, any device",
            ].map((item, i) => (
              <Animate key={item} delay={i * 40}>
                <div className="flex items-start gap-3 p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-rose-50 hover:border-rose-100 transition-all">
                  <CheckCircle2 className="w-4 h-4 text-rose-500 mt-0.5 shrink-0" />
                  <span className="text-slate-700 text-sm">{item}</span>
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
                    <ChevronRight className={`w-4 h-4 text-rose-400 transition-transform duration-200 shrink-0 ${open === i ? "rotate-90" : ""}`} />
                  </button>
                  {open === i && <div className="px-5 pb-4 text-sm text-slate-500 leading-relaxed border-t border-slate-100 pt-3">{a}</div>}
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gradient-to-br from-rose-600 to-pink-500 text-white text-center">
        <Animate className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-extrabold mb-4">Ready to run your catering business smarter?</h2>
          <p className="text-rose-100/80 mb-8 max-w-lg mx-auto">
            Free forever for small catering businesses. No setup fee, no credit card, no IT team required.
          </p>
          <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=CATERING&plan=FREE`}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white text-rose-600 font-semibold hover:bg-rose-50 transition-all shadow-xl">
            Get started free <ChevronRight className="w-4 h-4" />
          </a>
        </Animate>
      </section>

      <InternalLinks cluster="catering" currentPath="/catering/catering-business-philippines" />

      <footer className="bg-slate-900 px-6 py-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <img src="/logo.png" alt="Smapey" className="w-6 h-6 rounded-md" />
          <span className="text-white/60 text-sm font-semibold">Smapey Catering Manager</span>
        </div>
        <p className="text-white/20 text-xs">© {new Date().getFullYear()} Smapey. All rights reserved.</p>
      </footer>
    </main>
  )
}
