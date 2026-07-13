"use client"

import { useState, useEffect, useRef } from "react"
import InternalLinks from "@/components/InternalLinks"
import {
  Building2, CheckCircle2, ChevronRight,
  Banknote, Zap, AlertTriangle, BarChart3, Receipt, Users, Menu, X,
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

const BILLING_FEATURES = [
  { icon: Banknote, title: "Monthly Rent Billing", desc: "Generate a rent bill for each tenant at the start of the month. Set the amount, due date, and payment method. The system tracks the balance automatically." },
  { icon: Zap, title: "Utility Billing", desc: "Create separate electricity, water, or internet bills per tenant per month. Utilities are clearly separated from rent so tenants always understand what they owe." },
  { icon: Receipt, title: "Partial Payment Support", desc: "Record partial payments on any bill. The remaining balance is tracked automatically - no manual calculations needed." },
  { icon: AlertTriangle, title: "Overdue Bill Alerts", desc: "Every overdue rent bill surfaces on the dashboard with tenant name, room, amount, and due date. You always know who hasn't paid without having to check manually." },
  { icon: BarChart3, title: "Revenue Dashboard", desc: "See rent collected and utilities collected this month - plus a 6-month stacked bar chart showing rent vs. utility revenue trends." },
  { icon: Users, title: "Tenant-linked Bills", desc: "Every bill is linked to a specific tenant and tenancy. Payment history is stored per tenant - you always have a complete record for any dispute or query." },
]

const HOW_IT_WORKS = [
  { step: "1", title: "Set up rooms and assign tenants", desc: "Add your rooms once. Assign tenants with a move-in date and monthly rate. The system links every bill to the right tenant automatically." },
  { step: "2", title: "Generate bills each month", desc: "Create a rent bill and utility bill per tenant. Set amounts and due dates. It takes under a minute per tenant." },
  { step: "3", title: "Record payments as they come in", desc: "When a tenant pays (cash, GCash, Maya, or bank transfer) mark the payment on their bill. Partial payments are tracked. Overdue balances flag themselves." },
]

export default function BoardingHouseBillingContent() {
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
              <Building2 className="w-3.5 h-3.5" /> Management + billing · Philippines
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight mb-5" style={{ color: INK }}>
              Boarding House Management<br />
              <span style={{ color: BLUE }}>and Billing System</span>
            </h1>
            <p className="text-lg max-w-2xl mx-auto mb-8 leading-relaxed" style={{ color: "#54514c" }}>
              Smapey combines boarding house management and billing in one system, rooms, tenants, rent bills, utility bills, payment tracking, and overdue alerts. Built for Philippine landlords who want the whole operation in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href={REGISTER_URL} className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm border-2 transition-transform hover:-translate-y-0.5" style={{ ...display, background: AMBER, color: INK, borderColor: INK, boxShadow: `4px 4px 0 ${INK}` }}>
                Start free, no credit card <ChevronRight className="w-4 h-4" />
              </a>
              <a href="/boarding-house" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border-2 bg-white font-bold text-sm transition-transform hover:-translate-y-0.5" style={{ ...display, color: INK, borderColor: INK }}>
                See full product overview
              </a>
            </div>
          </Animate>
        </div>
      </section>

      {/* WHAT IS IT */}
      <section className="py-20 px-6" style={{ background: "#fff" }}>
        <div className="max-w-4xl mx-auto">
          <Animate>
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-5" style={{ color: INK }}>What is a boarding house management and billing system?</h2>
            <p className="leading-relaxed mb-4" style={{ color: "#54514c" }}>A <strong style={{ color: INK }}>boarding house management and billing system</strong> combines two things that most Philippine landlords still handle separately: (1) managing their property (rooms, tenants, occupancy) and (2) billing tenants for rent and utilities every month.</p>
            <p className="leading-relaxed mb-4" style={{ color: "#54514c" }}>When these two things are in the same system, everything connects automatically. A tenant is assigned to a room, their billing details are already there. They move out, the room is freed and billing stops. They pay a bill, the payment is recorded against their account instantly.</p>
            <p className="leading-relaxed" style={{ color: "#54514c" }}>Smapey is exactly that: a combined boarding house management and billing system that keeps every room, tenant, and payment connected, so you always know the full picture without manually reconciling records.</p>
          </Animate>
        </div>
      </section>

      {/* BILLING FEATURES */}
      <section className="py-20 px-6" style={{ background: CREAM, borderTop: `2px solid ${INK}` }}>
        <div className="max-w-6xl mx-auto">
          <Animate className="text-center mb-14">
            <h2 className="text-2xl sm:text-3xl font-extrabold" style={{ color: INK }}>Billing features built for boarding houses</h2>
            <p className="mt-3 max-w-lg mx-auto" style={{ color: "#54514c" }}>Every billing feature is designed around the way Philippine boarding houses actually collect rent.</p>
          </Animate>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {BILLING_FEATURES.map(({ icon: Icon, title, desc }, i) => {
              const c = accentFor(i)
              return (
                <Animate key={title} delay={i * 70}>
                  <div className="rounded-[20px] border-2 p-6 hover:-translate-y-1 transition-transform h-full" style={{ background: "#fff", borderColor: INK, boxShadow: `6px 6px 0 ${c}` }}>
                    <div className="w-11 h-11 rounded-[12px] border-2 flex items-center justify-center mb-4" style={{ background: c, borderColor: INK }}>
                      <Icon className="w-5 h-5" style={{ color: onAccent(c) }} />
                    </div>
                    <h3 className="font-extrabold mb-2" style={{ color: INK }}>{title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "#54514c" }}>{desc}</p>
                  </div>
                </Animate>
              )
            })}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 px-6" style={{ background: "#fff", borderTop: `2px solid ${INK}` }}>
        <div className="max-w-5xl mx-auto">
          <Animate className="text-center mb-14">
            <h2 className="text-2xl sm:text-3xl font-extrabold" style={{ color: INK }}>How the billing system works</h2>
          </Animate>
          <div className="grid md:grid-cols-3 gap-8">
            {HOW_IT_WORKS.map(({ step, title, desc }, i) => {
              const c = accentFor(i)
              return (
                <Animate key={step} delay={i * 100}>
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-[16px] border-2 font-extrabold text-lg mb-5" style={{ background: c, color: onAccent(c), borderColor: INK }}>{step}</div>
                    <h3 className="font-extrabold mb-2" style={{ color: INK }}>{title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "#54514c" }}>{desc}</p>
                  </div>
                </Animate>
              )
            })}
          </div>
        </div>
      </section>

      {/* COMPARISON */}
      <section className="py-20 px-6" style={{ background: CREAM, borderTop: `2px solid ${INK}` }}>
        <div className="max-w-4xl mx-auto">
          <Animate className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold" style={{ color: INK }}>Manual billing vs. using Smapey</h2>
          </Animate>
          <div className="grid sm:grid-cols-2 gap-6">
            <Animate>
              <div className="rounded-[20px] border-2 p-6 h-full" style={{ background: "#fff", borderColor: INK, boxShadow: `6px 6px 0 ${INK}` }}>
                <p className="font-extrabold text-sm uppercase tracking-widest mb-4" style={{ color: "#d4351c" }}>Manual billing</p>
                {[
                  "Writing bills by hand in a notebook",
                  "Texting tenants individually about rent",
                  "Forgetting who paid and who didn't",
                  "Calculating utility shares with a calculator",
                  "No clear record of payment history",
                  "Overdue accounts slip through the cracks",
                ].map(t => (
                  <div key={t} className="flex items-center gap-2 py-2 text-sm last:border-0" style={{ borderBottom: "1px solid rgba(22,22,22,.08)", color: "#54514c" }}>
                    <span className="font-bold" style={{ color: "#d4351c" }}>✗</span> {t}
                  </div>
                ))}
              </div>
            </Animate>
            <Animate delay={100}>
              <div className="rounded-[20px] border-2 p-6 h-full" style={{ background: "#fff", borderColor: INK, boxShadow: `6px 6px 0 ${AMBER}` }}>
                <p className="font-extrabold text-sm uppercase tracking-widest mb-4" style={{ color: BLUE }}>With Smapey</p>
                {[
                  "Bills created in seconds per tenant",
                  "Overdue accounts flagged automatically",
                  "Every payment recorded and tracked",
                  "Rent and utilities clearly separated",
                  "Full payment history per tenant",
                  "Real-time dashboard with monthly revenue",
                ].map(t => (
                  <div key={t} className="flex items-center gap-2 py-2 text-sm last:border-0" style={{ borderBottom: "1px solid rgba(22,22,22,.08)", color: INK }}>
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" style={{ color: "#0d9f6e" }} /> {t}
                  </div>
                ))}
              </div>
            </Animate>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6" style={{ background: "#fff" }}>
        <Animate className="max-w-3xl mx-auto">
          <div className="rounded-[28px] border-2 p-10 text-center" style={{ background: AMBER, borderColor: INK, boxShadow: `10px 10px 0 ${INK}` }}>
            <h2 className="text-3xl font-extrabold mb-4" style={{ color: INK }}>Try the boarding house billing system for free</h2>
            <p className="mb-8 max-w-lg mx-auto font-medium" style={{ color: "#5c4a28" }}>Free plan available. Issue your first rent and utility bills in under 10 minutes.</p>
            <a href={REGISTER_URL} className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm border-2 transition-transform hover:-translate-y-0.5" style={{ ...display, background: INK, color: "#fff", borderColor: INK }}>
              Get started free <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </Animate>
      </section>

      <InternalLinks cluster="boarding-house" currentPath="/boarding-house/boarding-house-management-and-billing-system" />

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
