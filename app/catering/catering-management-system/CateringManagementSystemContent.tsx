"use client"

import { useState, useEffect, useRef } from "react"
import InternalLinks from "@/components/InternalLinks"
import Link from "next/link"
import {
  ChefHat, CalendarDays, Users, Package, CheckCircle2, ChevronRight,
  Banknote, FlaskConical, UserCheck, BarChart3,
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
    icon: CalendarDays,
    title: "Event Booking Management",
    desc: "Create bookings with client, event date, venue, guest count, and status. Track every event from Pending to Confirmed to Completed in one list.",
    color: "from-rose-500 to-pink-400", shadow: "shadow-rose-400/20",
  },
  {
    icon: Users,
    title: "Client Management",
    desc: "Register clients once and reuse their details on every booking. Full contact history and booking records per client.",
    color: "from-pink-500 to-rose-400", shadow: "shadow-pink-400/20",
  },
  {
    icon: Package,
    title: "Package & Menu Builder",
    desc: "Define catering packages with name, description, and price per head. Attach one or more packages to each booking.",
    color: "from-rose-600 to-pink-500", shadow: "shadow-rose-500/20",
  },
  {
    icon: Banknote,
    title: "Payment Milestone Tracking",
    desc: "Break payments into milestones — reservation fee, partial, balance. Record each collection with method and date. Outstanding balances tracked automatically.",
    color: "from-pink-600 to-rose-500", shadow: "shadow-pink-500/20",
  },
  {
    icon: FlaskConical,
    title: "Supply Catalog",
    desc: "Maintain a catalog of ingredients and supplies with unit type and cost per unit. Link to packages for food cost estimation.",
    color: "from-rose-500 to-red-400", shadow: "shadow-rose-400/20",
  },
  {
    icon: BarChart3,
    title: "Revenue Dashboard",
    desc: "See upcoming events, monthly revenue, payments collected, and overdue milestones at a glance. Monthly trend chart included.",
    color: "from-rose-600 to-pink-400", shadow: "shadow-rose-500/20",
  },
]

const FAQS = [
  {
    q: "What does a catering management system do?",
    a: "A catering management system helps catering businesses manage the full event lifecycle — from client registration and booking creation, to package assignment, payment milestone tracking, supply catalog management, and staff assignment. It replaces spreadsheets and paper records with a single digital dashboard.",
  },
  {
    q: "Can it handle payment milestones for each booking?",
    a: "Yes. Each booking can have multiple payment milestones — for example, a reservation fee, a partial payment before the event, and a final balance on event day. You record each payment against its milestone and the system tracks outstanding balances automatically.",
  },
  {
    q: "Does it support multiple catering packages?",
    a: "Yes. You can build a catalog of catering packages with name, description, and price per head. Multiple packages can be attached to a single booking — useful when a client books both a buffet package and a drinks package, for example.",
  },
  {
    q: "Can I track ingredients and supply costs?",
    a: "Yes. The supply catalog lets you add ingredients and materials with unit type (kg, liters, pieces) and cost per unit. This gives you a reference point for estimating procurement cost when planning for an event.",
  },
  {
    q: "Is the system free to use?",
    a: "Yes — Smapey Catering Manager has a free plan that covers bookings, client profiles, packages, payment milestones, supply catalog, and staff assignment at no cost. Upgrade to PRO or ENTERPRISE when your business needs more capacity.",
  },
]

export default function CateringManagementSystemContent() {
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
              <ChefHat className="w-3.5 h-3.5" /> Catering management system · Philippines
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-5">
              Catering Management System<br />
              <span className="text-rose-600">for Philippine Catering Businesses</span>
            </h1>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-8 leading-relaxed">
              Smapey is a catering management system that replaces spreadsheets and paper records with a clean dashboard for bookings, packages, payment milestones, supply catalog, and staff assignment.
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

      {/* WHAT IS IT */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <Animate>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 mb-5">
              What is a catering management system?
            </h2>
            <p className="text-slate-500 leading-relaxed mb-4">
              A <strong className="text-slate-700">catering management system</strong> is software that helps catering businesses organize and run their operations digitally. Instead of tracking bookings in a notebook, writing payment receipts by hand, and chasing clients on Messenger, a catering management system centralizes everything — clients, events, packages, payments, supplies, and staff — in one place.
            </p>
            <p className="text-slate-500 leading-relaxed mb-4">
              For Philippine catering businesses, this typically means managing dozens of events at different stages simultaneously — inquiries, confirmed bookings, events coming up this weekend, and invoices waiting for final payment. A catering management system like Smapey gives you a real-time view of all of it without needing to maintain multiple spreadsheets.
            </p>
            <p className="text-slate-500 leading-relaxed">
              Whether you're running a small home-based catering operation or a full-service catering company handling corporate events, the core job of the system is the same: keep every booking, every payment, and every event detail organized and accessible from any device.
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
              Every module connects — clients feed into bookings, bookings feed into packages and milestones, milestones feed into the revenue dashboard.
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
              Who needs a catering management system?
            </h2>
          </Animate>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: "Home-based catering businesses", desc: "Track every booking, package, and payment without a dedicated office — manage everything from your phone or laptop." },
              { title: "Catering companies handling corporate events", desc: "Manage multiple simultaneous bookings, assign staff to each event, and monitor payment collections across all active contracts." },
              { title: "Wedding and debut caterers", desc: "Keep track of complex milestone payment schedules — reservation fees, partials, and final balances — for every client, automatically." },
              { title: "Catering teams scaling their operations", desc: "Give your team visibility into which events are coming up, which payments are outstanding, and which supplies need to be procured." },
            ].map(({ title, desc }, i) => (
              <Animate key={title} delay={i * 80}>
                <div className="bg-rose-50 border border-rose-100 rounded-2xl p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-4 h-4 text-rose-500 shrink-0" />
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
          <h2 className="text-3xl font-extrabold mb-4">Try the catering management system for free</h2>
          <p className="text-rose-100/80 mb-8 max-w-lg mx-auto">
            Set up your packages, add your first client, and create your first booking in under 10 minutes. No credit card. No IT setup.
          </p>
          <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=CATERING&plan=FREE`}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white text-rose-600 font-semibold hover:bg-rose-50 transition-all shadow-xl">
            Get started free <ChevronRight className="w-4 h-4" />
          </a>
        </Animate>
      </section>

      <InternalLinks cluster="catering" currentPath="/catering/catering-management-system" />

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
