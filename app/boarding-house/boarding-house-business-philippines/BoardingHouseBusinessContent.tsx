"use client"

import { useState, useEffect, useRef } from "react"
import InternalLinks from "@/components/InternalLinks"
import {
  Building2, Users, BedDouble, CheckCircle2, ChevronRight,
  Banknote, Zap, BarChart3, AlertTriangle, Menu, X,
} from "lucide-react"

const INK = "#161616"
const BLUE = "#2f6bff"
const AMBER = "#ff9e2c"
const CREAM = "#fbf7f0"
const display = { fontFamily: "'Hanken Grotesk', system-ui, sans-serif" }
const REGISTER_URL = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=BOARDING_HOUSE&plan=FREE`
const accentFor = (i: number) => (i % 2 === 0 ? BLUE : AMBER)
const onAccent = (c: string) => (c === AMBER ? INK : "#fff")

function useFont() {
  useEffect(() => {
    const id = "smapey-pop-fonts"
    if (!document.getElementById(id)) {
      const l = document.createElement("link"); l.id = id; l.rel = "stylesheet"
      l.href = "https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600;700;800&display=swap"
      document.head.appendChild(l)
    }
  }, [])
}

function useInView(opts?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect() } }, { threshold: 0.12, ...opts })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return { ref, inView }
}

function Animate({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, inView } = useInView()
  return (
    <div ref={ref} className={className} style={{ transitionProperty: "opacity, transform", transitionDuration: "600ms", transitionTimingFunction: "cubic-bezier(0.4,0,0.2,1)", transitionDelay: `${delay}ms`, opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(24px)" }}>
      {children}
    </div>
  )
}

function Navbar() {
  const [open, setOpen] = useState(false)
  const links = [
    { href: "/boarding-house#features", label: "Features" },
    { href: "/boarding-house#pricing", label: "Pricing" },
    { href: "/boarding-house#faq", label: "FAQ" },
    { href: "/boarding-house/guide", label: "Guide" },
  ]
  return (
    <nav className="sticky top-0 z-40" style={{ background: CREAM, borderBottom: `2px solid ${INK}`, fontFamily: display.fontFamily }}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/boarding-house" className="flex items-center gap-2.5">
          <img src="/logo.png" alt="Smapey" className="w-8 h-8 rounded-lg object-cover" />
          <span className="font-extrabold tracking-tight" style={{ color: INK }}>Smapey Boarding House</span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (<a key={l.label} href={l.href} className="text-sm font-semibold hover:opacity-60 transition-opacity" style={{ color: INK }}>{l.label}</a>))}
        </div>
        <div className="hidden md:flex items-center gap-3">
          <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/login`} className="text-sm font-semibold hover:opacity-60 transition-opacity px-2 py-2" style={{ color: INK }}>Sign in</a>
          <a href={REGISTER_URL} className="text-sm font-bold px-5 py-2.5 rounded-full border-2 transition-transform hover:-translate-y-0.5" style={{ ...display, background: AMBER, color: INK, borderColor: INK, boxShadow: `3px 3px 0 ${INK}` }}>Try free</a>
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden" style={{ color: INK }}>{open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}</button>
      </div>
      {open && (
        <div className="md:hidden px-6 py-4 flex flex-col gap-4" style={{ background: CREAM, borderTop: `2px solid ${INK}` }}>
          {links.map((l) => (<a key={l.label} href={l.href} className="text-sm font-semibold" style={{ color: INK }}>{l.label}</a>))}
          <a href={REGISTER_URL} className="text-sm font-bold px-4 py-2.5 rounded-full border-2 text-center" style={{ ...display, background: AMBER, color: INK, borderColor: INK }}>Try free</a>
        </div>
      )}
    </nav>
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

const MANAGES = [
  { icon: BedDouble, label: "Rooms", desc: "Add rooms with floor, capacity, and monthly rate. Track which are occupied and which are vacant." },
  { icon: Users, label: "Tenants", desc: "Register tenants with complete profiles — contact, emergency contact, and ID info." },
  { icon: Building2, label: "Tenancies", desc: "Assign tenants to rooms with move-in dates. Record move-outs when they leave." },
  { icon: Banknote, label: "Rent Bills", desc: "Generate monthly rent bills. Record full or partial payments. Track overdue accounts." },
  { icon: Zap, label: "Utility Bills", desc: "Issue separate electricity, water, and internet bills per tenant per month." },
  { icon: BarChart3, label: "Dashboard", desc: "Real-time occupancy, monthly revenue by type, and a 6-month trend chart." },
]

export default function BoardingHouseBusinessContent() {
  useFont()
  return (
    <main style={{ fontFamily: display.fontFamily }}>
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden py-20 px-6" style={{ background: CREAM }}>
        <div className="absolute inset-0 pointer-events-none hidden md:block" aria-hidden>
          <div className="absolute rounded-[22px] border-2" style={{ top: "22%", left: "-70px", width: 240, height: 70, background: AMBER, borderColor: INK, transform: "rotate(-9deg)" }} />
          <div className="absolute rounded-[22px] border-2" style={{ bottom: "14%", right: "-70px", width: 260, height: 74, background: BLUE, borderColor: INK, transform: "rotate(8deg)", boxShadow: "5px 5px 0 rgba(22,22,22,.12)" }} />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <Animate>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border-2 text-xs font-bold mb-5" style={{ color: INK, borderColor: INK, boxShadow: `3px 3px 0 ${BLUE}` }}>
              <Building2 className="w-3.5 h-3.5" /> Boarding house business · Philippines
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight mb-5" style={{ color: INK }}>
              Running a Boarding House Business<br />
              <span style={{ color: BLUE }}>in the Philippines</span>
            </h1>
            <p className="text-lg max-w-2xl mx-auto mb-8 leading-relaxed" style={{ color: "#54514c" }}>
              A boarding house business in the Philippines can be one of the most stable sources of passive income — if you have the right system to manage it. Here&apos;s how Smapey helps landlords stay on top of rooms, tenants, and collections.
            </p>
            <a href={REGISTER_URL} className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full font-bold text-sm border-2 transition-transform hover:-translate-y-0.5" style={{ ...display, background: AMBER, color: INK, borderColor: INK, boxShadow: `4px 4px 0 ${INK}` }}>
              Try Smapey free <ChevronRight className="w-4 h-4" />
            </a>
          </Animate>
        </div>
      </section>

      {/* WHY */}
      <section className="py-20 px-6" style={{ background: "#fff" }}>
        <div className="max-w-4xl mx-auto">
          <Animate>
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-5" style={{ color: INK }}>Why boarding houses are popular in the Philippines</h2>
            <p className="leading-relaxed mb-4" style={{ color: "#54514c" }}>
              The <strong style={{ color: INK }}>boarding house business in the Philippines</strong> thrives near universities, hospitals, call centers, and business districts. Students, nurses, and young professionals need affordable housing close to where they study or work — and bedspaces or dormitory-style rooms fill that gap at a price point that works for both tenant and landlord.
            </p>
            <p className="leading-relaxed mb-4" style={{ color: "#54514c" }}>
              Unlike traditional long-term leases, boarding house arrangements are typically month-to-month — which means landlords can adjust rates, replace tenants quickly, and maintain flexibility over the property. The trade-off is that it requires more active management: collecting rent every month, tracking utility usage per tenant, and keeping records of who lives where.
            </p>
            <p className="leading-relaxed" style={{ color: "#54514c" }}>
              That&apos;s exactly the problem Smapey solves. Instead of managing it all in notebooks, group chats, and spreadsheets, you get a clean system that handles rooms, tenants, billing, and collections — all in one place.
            </p>
          </Animate>
        </div>
      </section>

      {/* CHALLENGES */}
      <section className="py-20 px-6" style={{ background: CREAM, borderTop: `2px solid ${INK}` }}>
        <div className="max-w-6xl mx-auto">
          <Animate className="text-center mb-14">
            <h2 className="text-2xl sm:text-3xl font-extrabold" style={{ color: INK }}>The biggest challenges — and how Smapey solves them</h2>
            <p className="mt-3 max-w-lg mx-auto" style={{ color: "#54514c" }}>Every boarding house owner in the Philippines faces the same four problems. Here&apos;s exactly how the system addresses each one.</p>
          </Animate>
          <div className="grid sm:grid-cols-2 gap-6">
            {CHALLENGES.map(({ icon: Icon, title, problem, solution }, i) => {
              const c = accentFor(i)
              return (
                <Animate key={title} delay={i * 80}>
                  <div className="rounded-[20px] border-2 p-6 h-full" style={{ background: "#fff", borderColor: INK, boxShadow: `6px 6px 0 ${c}` }}>
                    <div className="w-11 h-11 rounded-[12px] border-2 flex items-center justify-center mb-4" style={{ background: c, borderColor: INK }}>
                      <Icon className="w-5 h-5" style={{ color: onAccent(c) }} />
                    </div>
                    <h3 className="font-extrabold mb-3" style={{ color: INK }}>{title}</h3>
                    <div className="space-y-2">
                      <div className="flex gap-2 text-sm">
                        <span className="font-bold shrink-0 mt-0.5" style={{ color: "#d4351c" }}>✗</span>
                        <p className="leading-relaxed" style={{ color: "#54514c" }}>{problem}</p>
                      </div>
                      <div className="flex gap-2 text-sm">
                        <span className="font-bold shrink-0 mt-0.5" style={{ color: "#0d9f6e" }}>✓</span>
                        <p className="leading-relaxed font-medium" style={{ color: INK }}>{solution}</p>
                      </div>
                    </div>
                  </div>
                </Animate>
              )
            })}
          </div>
        </div>
      </section>

      {/* WHAT YOU CAN MANAGE */}
      <section className="py-20 px-6" style={{ background: "#fff", borderTop: `2px solid ${INK}` }}>
        <div className="max-w-4xl mx-auto">
          <Animate className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold" style={{ color: INK }}>What Smapey manages for your boarding house business</h2>
          </Animate>
          <div className="grid sm:grid-cols-2 gap-4">
            {MANAGES.map(({ icon: Icon, label, desc }, i) => {
              const c = accentFor(i)
              return (
                <Animate key={label} delay={i * 60}>
                  <div className="flex items-start gap-4 rounded-[16px] border-2 p-4 h-full" style={{ background: CREAM, borderColor: INK }}>
                    <div className="w-9 h-9 rounded-[10px] border-2 flex items-center justify-center shrink-0 mt-0.5" style={{ background: c, borderColor: INK }}>
                      <Icon className="w-4 h-4" style={{ color: onAccent(c) }} />
                    </div>
                    <div>
                      <p className="font-extrabold text-sm" style={{ color: INK }}>{label}</p>
                      <p className="text-xs mt-0.5 leading-relaxed" style={{ color: "#54514c" }}>{desc}</p>
                    </div>
                  </div>
                </Animate>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6" style={{ background: "#fff" }}>
        <Animate className="max-w-3xl mx-auto">
          <div className="rounded-[28px] border-2 p-10 text-center" style={{ background: AMBER, borderColor: INK, boxShadow: `10px 10px 0 ${INK}` }}>
            <h2 className="text-3xl font-extrabold mb-4" style={{ color: INK }}>Start managing your boarding house business today</h2>
            <p className="mb-8 max-w-lg mx-auto font-medium" style={{ color: "#5c4a28" }}>Free plan available. Set up rooms, add tenants, and issue your first rent bill in under 10 minutes.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href={REGISTER_URL} className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm border-2 transition-transform hover:-translate-y-0.5" style={{ ...display, background: INK, color: "#fff", borderColor: INK }}>
                Get started free <ChevronRight className="w-4 h-4" />
              </a>
              <a href="/boarding-house" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm border-2 bg-white transition-transform hover:-translate-y-0.5" style={{ ...display, color: INK, borderColor: INK }}>
                Learn more about Smapey
              </a>
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-semibold" style={{ color: "#5c4a28" }}>
              {["Free plan forever", "No credit card needed", "Philippines-focused"].map(t => (
                <span key={t} className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5" /> {t}</span>
              ))}
            </div>
          </div>
        </Animate>
      </section>

      <InternalLinks cluster="boarding-house" currentPath="/boarding-house/boarding-house-business-philippines" />

      <footer className="px-6 py-8" style={{ background: CREAM, borderTop: `2px solid ${INK}` }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Smapey" className="w-6 h-6 rounded-md object-cover" />
            <span className="text-sm font-extrabold" style={{ color: INK }}>Boarding House Manager by Smapey</span>
          </div>
          <p className="text-xs" style={{ color: "#9a948b" }}>© {new Date().getFullYear()} Smapey. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}
