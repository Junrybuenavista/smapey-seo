"use client"

import { useState, useEffect, useRef } from "react"
import InternalLinks from "@/components/InternalLinks"
import Link from "next/link"
import {
  BookOpen, Building2, Users, BedDouble, CheckCircle2, ChevronRight,
  Menu, X, Banknote, Zap, BarChart3, Clock, Lightbulb, Shield, AlertTriangle,
} from "lucide-react"

const SECTIONS = [
  {
    id: "setup",
    icon: Building2,
    title: "1. Set Up Your Boarding House",
    steps: [
      {
        title: "Create your Smapey account",
        desc: "Sign up at smapey.com and select Boarding House Manager as your product. Your private workspace is created instantly — no credit card required on the free plan.",
      },
      {
        title: "Add your rooms",
        desc: "Go to the Rooms page and click Add Room. Enter the room name (e.g. Room 101, Bedspace A), floor number, capacity (how many tenants it can hold), and the monthly rate. Toggle the room Active when it's ready to accept tenants.",
      },
      {
        title: "Invite your team",
        desc: "Go to Settings → Team and invite a co-owner or assistant by email. They can log in with their own account and access the same live system. Assign Admin or Member roles based on their level of access.",
      },
      {
        title: "Configure your currency symbol",
        desc: "In Settings → Organization, confirm your currency symbol (₱ for Philippine Peso). This appears on all bills and the revenue dashboard.",
      },
    ],
  },
  {
    id: "tenants",
    icon: Users,
    title: "2. Register Tenants",
    steps: [
      {
        title: "Open the Tenants page",
        desc: "Navigate to Boarding House → Tenants from the sidebar. This is where all your tenant records live.",
      },
      {
        title: "Click Add Tenant",
        desc: "Enter the tenant's full name, contact number, and email address. Add an emergency contact name and phone number — important if you ever need to reach someone on their behalf.",
      },
      {
        title: "Add ID information",
        desc: "Record the tenant's government ID type and ID number for verification purposes. This stays stored in their profile and is useful for move-out documentation or disputes.",
      },
      {
        title: "View a tenant's profile",
        desc: "Click View on any tenant to see their full record — current room assignment, tenancy history, all rent bills, utility bills, and payment records in one place.",
      },
    ],
  },
  {
    id: "tenancies",
    icon: BedDouble,
    title: "3. Manage Tenancies",
    steps: [
      {
        title: "Open the Tenancies page",
        desc: "Navigate to Boarding House → Tenancies from the sidebar. A tenancy is the active link between a tenant and a room — it records the move-in date, agreed monthly rate, and move-out date when they leave.",
      },
      {
        title: "Create a new tenancy (Move-in)",
        desc: "Click Add Tenancy. Select the tenant and the room, set the move-in date, and enter the agreed monthly rate. Click Save — the room is now marked as occupied and the tenant appears on the dashboard's active tenants count.",
      },
      {
        title: "Record a move-out",
        desc: "Find the tenancy and click Move Out. Enter the move-out date. The tenancy is marked as ended, the room is freed immediately, and the occupancy rate on the dashboard updates automatically.",
      },
      {
        title: "Review tenancy history",
        desc: "Past tenancies stay in the system with their full history — who was in the room, for how long, and at what rate. Useful for resolving disputes or checking a room's rental history.",
      },
    ],
  },
  {
    id: "rent",
    icon: Banknote,
    title: "4. Rent Billing",
    steps: [
      {
        title: "Open the Rent Bills page",
        desc: "Navigate to Boarding House → Rent Bills from the sidebar. This is where you create and manage all monthly rent bills.",
      },
      {
        title: "Create a rent bill",
        desc: "Click New Rent Bill. Select the tenant, enter the billing month, amount, and due date. The system pre-fills the amount from the tenancy's agreed monthly rate — adjust if needed. Click Save to issue the bill.",
      },
      {
        title: "Record a payment",
        desc: "Click Pay on any unpaid or partially paid bill. Enter the amount received and select the payment method: Cash, GCash, Maya, Card, or Bank Transfer. If the amount is less than the total, the bill is marked Partially Paid and the remaining balance is tracked.",
      },
      {
        title: "Monitor overdue bills",
        desc: "Any bill past its due date with an outstanding balance is automatically flagged on the dashboard's Overdue Rent Bills panel — tenant name, room, due date, and amount. No manual checking needed.",
      },
    ],
  },
  {
    id: "utilities",
    icon: Zap,
    title: "5. Utility Billing",
    steps: [
      {
        title: "Open the Utility Bills page",
        desc: "Navigate to Boarding House → Utility Bills from the sidebar. Utility bills are created separately from rent so tenants can clearly see what they owe for electricity, water, or internet.",
      },
      {
        title: "Create a utility bill",
        desc: "Click New Utility Bill. Select the tenant, choose the utility type (Electricity, Water, Internet, or Other), enter the billing month, amount, and due date. Each utility is its own bill — you can create multiple utility bills per tenant per month.",
      },
      {
        title: "Record utility payments",
        desc: "Same as rent — click Pay, enter the amount received, and select the payment method. Partial utility payments are tracked just like rent.",
      },
      {
        title: "Review utility history",
        desc: "A tenant's profile shows all their utility bills alongside their rent bills in a single view — so you can see their full payment history at a glance without switching pages.",
      },
    ],
  },
  {
    id: "dashboard",
    icon: BarChart3,
    title: "6. Dashboard & Analytics",
    steps: [
      {
        title: "Open the Dashboard",
        desc: "Navigate to Boarding House → Dashboard from the sidebar. This is your home screen — it loads every time you open the app and gives you the full picture of your boarding house at a glance.",
      },
      {
        title: "Read the stat cards",
        desc: "The top row shows: Total Rooms, Active Rooms, Active Tenants, Occupancy Rate (%), Overdue Bills count, Unpaid Bills count, and Total Capacity (occupied / total). These update in real time as you add rooms, tenants, and payments.",
      },
      {
        title: "Check monthly revenue",
        desc: "Below the stat cards are three revenue cards for the current month: Rent Collected, Utilities Collected, and Total Collected (the combined sum). This tells you exactly how much cash came in this month and from which source.",
      },
      {
        title: "Read the 6-month revenue chart",
        desc: "The stacked bar chart shows the last 6 months of collections — orange bars for rent, cyan bars for utilities, stacked per month. Hover on a bar to see the exact amounts. Use this to spot seasonal patterns and set rent collection targets.",
      },
      {
        title: "Review overdue bills",
        desc: "The Overdue Rent Bills table shows every rent bill past its due date — tenant name, room, billing month, due date, and amount. Click through to the bill directly from this panel to record a payment.",
      },
      {
        title: "Monitor move-ins and move-outs",
        desc: "The bottom section shows Recent Move-ins (active tenancies) and Recent Move-outs (tenancies ended this month) side by side — so you can track tenant turnover at a glance.",
      },
    ],
  },
]

const TIPS = [
  {
    icon: Clock,
    tip: "Add all your rooms before assigning tenants — the tenancy form pulls the room list, so rooms must exist first.",
  },
  {
    icon: Lightbulb,
    tip: "Create a new tenancy every time a tenant moves in, even if it's the same tenant returning. This keeps a clean, accurate rental history for the room.",
  },
  {
    icon: AlertTriangle,
    tip: "Issue rent and utility bills as separate entries each month — this makes collections clearer and avoids arguments over what each payment was for.",
  },
  {
    icon: Shield,
    tip: "Check the Overdue Rent Bills panel on the dashboard weekly. The sooner you follow up, the easier it is to collect — don't let overdue accounts accumulate.",
  },
]

function useInView(opts?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect() } }, { threshold: 0.1, ...opts })
    obs.observe(el)
    return () => obs.disconnect()
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

function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", fn)
    return () => window.removeEventListener("scroll", fn)
  }, [])
  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#1a0a00]/90 backdrop-blur-md border-b border-white/5 shadow-lg" : "bg-transparent"}`}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/boarding-house" className="flex items-center gap-2.5">
          <img src="/logo.png" alt="Smapey Boarding House" className="w-8 h-8 rounded-lg object-cover" />
          <span className="text-white font-bold tracking-tight">Smapey BH</span>
        </Link>
        <div className="hidden md:flex items-center gap-6">
          <Link href="/boarding-house" className="text-sm text-white/60 hover:text-white transition-colors">Home</Link>
          {[["setup", "Setup"], ["tenants", "Tenants"], ["rent", "Rent"], ["utilities", "Utilities"], ["dashboard", "Dashboard"]].map(([id, label]) => (
            <a key={id} href={`#${id}`}
              onClick={(e) => { e.preventDefault(); document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }) }}
              className="text-sm text-white/60 hover:text-white transition-colors">{label}</a>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-3">
          <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/login`} className="text-sm text-white/60 hover:text-white px-4 py-2">Sign in</a>
          <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=BOARDING_HOUSE&plan=FREE`}
            className="text-sm font-semibold px-4 py-2 rounded-lg bg-orange-600 hover:bg-orange-500 text-white shadow-lg shadow-orange-600/25 transition-colors">
            Try it free
          </a>
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden text-white/60 hover:text-white">
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-[#1a0a00] border-t border-white/5 px-6 py-4 flex flex-col gap-4">
          <Link href="/boarding-house" className="text-sm text-white/60 hover:text-white">Home</Link>
          {[["setup", "Setup"], ["tenants", "Tenants"], ["tenancies", "Tenancies"], ["rent", "Rent Bills"], ["utilities", "Utilities"], ["dashboard", "Dashboard"]].map(([id, label]) => (
            <a key={id} href={`#${id}`}
              onClick={(e) => { e.preventDefault(); document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setOpen(false) }}
              className="text-sm text-white/60 hover:text-white transition-colors">{label}</a>
          ))}
          <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=BOARDING_HOUSE&plan=FREE`}
            className="text-sm font-semibold px-4 py-2 rounded-lg bg-orange-600 text-white text-center">
            Try it free
          </a>
        </div>
      )}
    </nav>
  )
}

export default function BoardingHouseGuideContent() {
  return (
    <main className="bg-white">
      <Navbar />

      {/* HERO */}
      <section className="relative pt-32 pb-16 overflow-hidden"
        style={{ background: "#1a0a00", backgroundImage: "repeating-linear-gradient(45deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 28px)", backgroundSize: "28px 28px" }}>
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(234,88,12,0.15) 0%, transparent 70%)" }} />
        <div className="absolute -bottom-20 -right-40 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(245,158,11,0.10) 0%, transparent 70%)" }} />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold mb-6">
            <BookOpen className="w-3 h-3" /> User Guide
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight tracking-tight mb-4">
            Smapey Boarding House Manager{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-300">
              Guide
            </span>
          </h1>
          <p className="text-lg text-white/50 max-w-2xl mx-auto mb-8">
            Everything you need to set up your boarding house, register tenants, manage tenancies, issue rent and utility bills, record payments, and read the occupancy dashboard — step by step.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-white/30 text-xs">
            {["5-minute setup", "No training required", "Free plan available"].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-orange-400" />{t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* TABLE OF CONTENTS */}
      <section className="py-10 bg-slate-50 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">Jump to section</p>
          <div className="flex flex-wrap gap-2">
            {SECTIONS.map((s) => (
              <a key={s.id} href={`#${s.id}`}
                onClick={(e) => { e.preventDefault(); document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" }) }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:border-orange-300 hover:text-orange-700 text-xs font-medium transition-all shadow-sm">
                <s.icon className="w-3 h-3" />
                {s.title.replace(/^\d+\.\s/, "")}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* GUIDE SECTIONS */}
      {SECTIONS.map((section, si) => (
        <section key={section.id} id={section.id} className={`py-16 ${si % 2 === 0 ? "bg-white" : "bg-slate-50"} border-t border-slate-100`}>
          <div className="max-w-4xl mx-auto px-6">
            <Animate>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-600 to-amber-400 flex items-center justify-center shadow-lg shadow-orange-500/20">
                  <section.icon className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-800">{section.title}</h2>
              </div>
            </Animate>
            <div className="space-y-4">
              {section.steps.map((step, i) => (
                <Animate key={step.title} delay={i * 80}>
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-7 h-7 rounded-full bg-orange-600 text-white text-xs font-bold flex items-center justify-center shrink-0">
                        {i + 1}
                      </div>
                      {i < section.steps.length - 1 && (
                        <div className="w-0.5 flex-1 bg-orange-100 mt-2" />
                      )}
                    </div>
                    <div className="pb-4">
                      <h3 className="font-semibold text-slate-800 mb-1 text-sm">{step.title}</h3>
                      <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                </Animate>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* TIPS */}
      <section className="py-16 bg-orange-50 border-t border-orange-100">
        <div className="max-w-4xl mx-auto px-6">
          <Animate className="mb-8">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-800">Quick Tips</h2>
            <p className="text-slate-500 text-sm mt-1">Things that will save you time once you're up and running.</p>
          </Animate>
          <div className="grid sm:grid-cols-2 gap-4">
            {TIPS.map(({ icon: Icon, tip }, i) => (
              <Animate key={i} delay={i * 80}>
                <div className="flex items-start gap-3 bg-white rounded-xl p-4 border border-orange-100 shadow-sm">
                  <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-orange-600" />
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed">{tip}</p>
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* WORKFLOW SUMMARY */}
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-6">
          <Animate className="mb-10">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-800">Monthly workflow at a glance</h2>
            <p className="text-slate-500 text-sm mt-1">What to do at the start of each month to keep your boarding house running smoothly.</p>
          </Animate>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { step: "1st", title: "Create rent bills", desc: "Issue a rent bill for every active tenant — amount, billing month, and due date." },
              { step: "2nd", title: "Create utility bills", desc: "Issue separate electricity and water bills per tenant based on meter readings or flat allocation." },
              { step: "3rd", title: "Record payments", desc: "As tenants pay throughout the month, record each payment — cash, GCash, or bank transfer." },
              { step: "4th", title: "Follow up overdue", desc: "Check the Overdue Bills panel on the dashboard and follow up with tenants who haven't paid." },
              { step: "5th", title: "Review occupancy", desc: "Check if any rooms will be vacated soon and start lining up new tenants to minimize vacancy." },
              { step: "6th", title: "Check revenue trend", desc: "Review the 6-month chart to see if rent collected is growing, flat, or declining — and act accordingly." },
            ].map(({ step, title, desc }, i) => (
              <Animate key={title} delay={i * 60}>
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-4">
                  <span className="text-xs font-bold text-orange-500 uppercase tracking-widest">{step}</span>
                  <h3 className="font-semibold text-slate-800 text-sm mt-1 mb-1">{title}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white border-t border-slate-100">
        <Animate className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 mb-4">Ready to get started?</h2>
          <p className="text-slate-500 mb-8">
            Create your free boarding house account and have your rooms and first rent bills set up today.
          </p>
          <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=BOARDING_HOUSE&plan=FREE`}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-white font-semibold transition-all shadow-xl shadow-orange-600/20">
            Start for free <ChevronRight className="w-4 h-4" />
          </a>
        </Animate>
      </section>

      <InternalLinks cluster="boarding-house" currentPath="/boarding-house/guide" />

      <footer className="bg-[#0f0500] border-t border-white/5 px-6 py-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Smapey Boarding House Manager" className="w-6 h-6 rounded-md object-cover" />
            <span className="text-white/60 text-sm font-semibold">Smapey Boarding House Manager</span>
          </div>
          <p className="text-white/20 text-xs">© {new Date().getFullYear()} Smapey. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}
