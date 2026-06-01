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

const BILLING_FEATURES = [
  {
    icon: Banknote,
    title: "Payment Milestones per Booking",
    desc: "Split each booking's total into milestones — reservation fee, partial payment, and final balance. Each milestone has an amount, due date, and payment status. Outstanding balances show on the dashboard automatically.",
    color: "from-rose-500 to-pink-400", shadow: "shadow-rose-400/20",
  },
  {
    icon: CalendarDays,
    title: "Booking-Linked Billing",
    desc: "Every payment is tied to a specific booking. No standalone invoices floating in a spreadsheet — collections are always linked to the event they belong to.",
    color: "from-pink-500 to-rose-400", shadow: "shadow-pink-400/20",
  },
  {
    icon: Package,
    title: "Package-Based Pricing",
    desc: "Attach catering packages with price per head to each booking. The system calculates the expected total automatically — no manual computation per inquiry.",
    color: "from-rose-600 to-pink-500", shadow: "shadow-rose-500/20",
  },
  {
    icon: BarChart3,
    title: "Revenue Dashboard",
    desc: "See total revenue this month, payments collected, pending milestones, and overdue amounts — all on one screen. Monthly trend chart so you can see peak and slow seasons.",
    color: "from-pink-600 to-rose-500", shadow: "shadow-pink-500/20",
  },
  {
    icon: FlaskConical,
    title: "Supply Cost Tracking",
    desc: "Maintain a supply catalog with unit costs to estimate procurement expenses per event. Know your food cost before you finalize a booking.",
    color: "from-rose-500 to-red-400", shadow: "shadow-rose-400/20",
  },
  {
    icon: UserCheck,
    title: "Staff & Operations",
    desc: "Assign staff per booking, track event status from Pending to Completed, and get auto-settlement of outstanding milestones when a booking is marked done.",
    color: "from-rose-600 to-pink-400", shadow: "shadow-rose-500/20",
  },
]

const FAQS = [
  {
    q: "What is a catering management and billing system?",
    a: "A catering management and billing system combines event booking management with payment tracking in one tool. It handles client registration, event booking, package assignment, payment milestone creation and collection, supply catalog management, and staff assignment — replacing separate spreadsheets, paper records, and manual invoicing.",
  },
  {
    q: "How does billing work in Smapey's catering system?",
    a: "Billing is milestone-based per booking. You create milestones for each booking (e.g., 30% reservation fee, 50% partial payment two weeks before the event, 20% balance on event day). Each milestone records the amount, due date, payment method, and paid/unpaid status. The dashboard shows all outstanding milestones at a glance.",
  },
  {
    q: "Does the billing system support partial payments?",
    a: "Yes. Each milestone can be marked as paid, partially paid, pending, or overdue. This matches how Philippine catering payments typically work — clients rarely pay in full upfront, so milestone tracking is central to the billing process.",
  },
  {
    q: "What payment methods can I log?",
    a: "You can record collections as Cash, GCash, Maya, Card, or Bank Transfer. Smapey doesn't process payments — it records what you collect and keeps your milestone history accurate.",
  },
  {
    q: "Is there a difference between the management system and billing system?",
    a: "In Smapey, they're the same system. The catering management module handles the operational side (bookings, packages, staff, supplies) and the billing side (payment milestones, collections, revenue tracking) together. You don't need separate software for each.",
  },
  {
    q: "Is it free?",
    a: "Yes — Smapey's free plan includes full catering management and billing capabilities. Upgrade to PRO or ENTERPRISE when your business needs higher limits.",
  },
]

export default function CateringManagementBillingContent() {
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
              <ChefHat className="w-3.5 h-3.5" /> Catering management & billing · Philippines
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-5">
              Catering Management and Billing System<br />
              <span className="text-rose-600">in one dashboard</span>
            </h1>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-8 leading-relaxed">
              Smapey combines catering management and billing in one place. Handle bookings, packages, payment milestones, supply costs, and staff assignment — without switching between tools or maintaining separate records.
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
              Why catering management and billing belong in the same system
            </h2>
            <p className="text-slate-500 leading-relaxed mb-4">
              Most catering businesses manage their operations in one place (a notebook, a spreadsheet, or a group chat) and track billing in another (receipts, another spreadsheet, or manually). The result is always the same: something slips through the cracks. A milestone goes unrecorded. A balance isn't followed up on. A payment is forgotten.
            </p>
            <p className="text-slate-500 leading-relaxed mb-4">
              A <strong className="text-slate-700">catering management and billing system</strong> solves this by keeping operational records and financial records in the same place. When you create a booking, you set the packages. When you set the packages, the expected revenue is established. When you create milestones, they're tied to that booking. When you record a payment, it updates the dashboard.
            </p>
            <p className="text-slate-500 leading-relaxed">
              This is how Smapey works: management and billing are not separate modules — they're the same workflow. Every booking has a payment trail, and every payment trail traces back to a specific event.
            </p>
          </Animate>
        </div>
      </section>

      {/* BILLING FEATURES */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <Animate className="text-center mb-14">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
              Management and billing features
            </h2>
            <p className="text-slate-500 mt-3 max-w-lg mx-auto">
              Every feature works together — bookings, packages, milestones, and revenue tracking in one connected system.
            </p>
          </Animate>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {BILLING_FEATURES.map(({ icon: Icon, title, desc, color, shadow }, i) => (
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

      {/* HOW MILESTONE BILLING WORKS */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <Animate className="mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 text-center">
              How milestone billing works in practice
            </h2>
          </Animate>
          <div className="space-y-6">
            {[
              {
                step: "1",
                title: "Create a booking for the event",
                desc: "Add the client, event date, venue, and guest count. Attach your catering packages — the expected revenue is visible immediately.",
              },
              {
                step: "2",
                title: "Set up payment milestones",
                desc: "Add milestones for the booking — typically a reservation deposit (20–30%), a mid-payment before the event, and the final balance on event day. Each milestone has a due date and amount.",
              },
              {
                step: "3",
                title: "Record collections as they come in",
                desc: "When a client pays, mark the milestone as paid, log the method (GCash, Cash, Maya, Bank Transfer), and record the date. Partial payments are tracked automatically.",
              },
              {
                step: "4",
                title: "See your revenue position at a glance",
                desc: "The dashboard shows total collected this month, pending milestones, overdue amounts, and your monthly revenue trend — all updated in real time.",
              },
            ].map(({ step, title, desc }, i) => (
              <Animate key={step} delay={i * 80}>
                <div className="flex gap-5 items-start">
                  <div className="shrink-0 w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 to-pink-400 flex items-center justify-center text-white font-extrabold text-sm shadow-md shadow-rose-400/20">
                    {step}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 mb-1">{title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT YOU GET */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <Animate className="mb-10 text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800">Complete catering management and billing — free</h2>
          </Animate>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              "Event bookings with status tracking",
              "Client profiles with booking history",
              "Catering package catalog",
              "Payment milestones per booking",
              "Partial payment tracking",
              "GCash, Cash, Maya, Card, Bank Transfer logging",
              "Overdue milestone alerts on the dashboard",
              "Revenue and collections summary",
              "Monthly revenue trend chart",
              "Supply catalog with unit costs",
              "Staff assignment per event",
              "Free plan — no credit card required",
            ].map((item, i) => (
              <Animate key={item} delay={i * 40}>
                <div className="flex items-start gap-3 p-4 rounded-xl border border-slate-100 bg-white hover:bg-rose-50 hover:border-rose-100 transition-all">
                  <CheckCircle2 className="w-4 h-4 text-rose-500 mt-0.5 shrink-0" />
                  <span className="text-slate-700 text-sm">{item}</span>
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 bg-white">
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
          <h2 className="text-3xl font-extrabold mb-4">Catering management and billing — free to start</h2>
          <p className="text-rose-100/80 mb-8 max-w-lg mx-auto">
            Set up your first booking, attach a package, create your payment milestones, and track collections — all in one dashboard. No credit card, no setup fee.
          </p>
          <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=CATERING&plan=FREE`}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white text-rose-600 font-semibold hover:bg-rose-50 transition-all shadow-xl">
            Get started free <ChevronRight className="w-4 h-4" />
          </a>
        </Animate>
      </section>

      <InternalLinks cluster="catering" currentPath="/catering/catering-management-and-billing-system" />

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
