"use client"

import { useState, useEffect, useRef } from "react"
import InternalLinks from "@/components/InternalLinks"
import { ChefHat, CheckCircle2, ChevronRight, CalendarDays, Package, Banknote, FlaskConical, UserCheck, BarChart3, Menu, X } from "lucide-react"
import { FAQS } from "./faqs"

const INK = "#161616"
const BLUE = "#2f6bff"
const AMBER = "#ff9e2c"
const CREAM = "#fbf7f0"
const display = { fontFamily: "'Hanken Grotesk', system-ui, sans-serif" }
const REGISTER_URL = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=CATERING&plan=FREE`
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
    { href: "/catering#features", label: "Features" },
    { href: "/catering#pricing", label: "Pricing" },
    { href: "/catering#faq", label: "FAQ" },
    { href: "/catering/guide", label: "Guide" },
  ]
  return (
    <nav className="sticky top-0 z-40" style={{ background: CREAM, borderBottom: `2px solid ${INK}`, fontFamily: display.fontFamily }}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/catering" className="flex items-center gap-2.5">
          <img src="/logo.png" alt="Smapey" className="w-8 h-8 rounded-lg object-cover" />
          <span className="font-extrabold tracking-tight" style={{ color: INK }}>Smapey Catering</span>
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
  { icon: CalendarDays, problem: "Bookings tracked in a group chat or notebook", solution: "A centralized booking list with status, event date, guest count, and assigned packages, every booking visible at once." },
  { icon: Banknote, problem: "Chasing clients for partial payments and balances", solution: "Payment milestones per booking (reservation fee, partial, and final balance) with status tracking and overdue alerts on the dashboard." },
  { icon: Package, problem: "Re-quoting the same packages every inquiry", solution: "A package catalog with name, description, and price per head. Attach packages to any booking in seconds." },
  { icon: FlaskConical, problem: "No clear picture of food costs per event", solution: "A supply catalog with unit types and cost per unit. Link ingredients to packages and estimate procurement cost before the event." },
  { icon: UserCheck, problem: "Staff assignments scattered across messages", solution: "Assign staff to each booking directly in the system. Everyone sees their roster, no separate announcement needed." },
  { icon: BarChart3, problem: "No clear view of monthly revenue and collections", solution: "A revenue dashboard with upcoming events, money collected this month, pending milestones, and a monthly trend chart." },
]

const WHAT_YOU_GET = [
  "Event booking management with status tracking",
  "Client profiles with full booking history",
  "Package catalog with price per head",
  "Payment milestones per booking, reservation, partial, balance",
  "Supply catalog with unit costs",
  "Staff assignment per event",
  "Revenue dashboard with monthly trend chart",
  "GCash, Cash, Maya, Card, Bank Transfer payment logging",
  "Free plan, no credit card required",
  "Accessible from any browser, any device",
]

export default function CateringBusinessPhilippinesContent() {
  useFont()
  const [open, setOpen] = useState<number | null>(null)
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
              <ChefHat className="w-3.5 h-3.5" /> Catering business · Philippines
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight mb-5" style={{ color: INK }}>
              Run your catering business in the Philippines<br />
              <span style={{ color: BLUE }}>without the paperwork chaos</span>
            </h1>
            <p className="text-lg max-w-2xl mx-auto mb-8 leading-relaxed" style={{ color: "#54514c" }}>
              Smapey is built for Philippine catering businesses, manage bookings, packages, payment milestones, supply costs, and staff assignments all from one clean dashboard.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href={REGISTER_URL} className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm border-2 transition-transform hover:-translate-y-0.5" style={{ ...display, background: AMBER, color: INK, borderColor: INK, boxShadow: `4px 4px 0 ${INK}` }}>
                Start free, no credit card <ChevronRight className="w-4 h-4" />
              </a>
              <a href="/catering" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border-2 bg-white font-bold text-sm transition-transform hover:-translate-y-0.5" style={{ ...display, color: INK, borderColor: INK }}>
                See full product overview
              </a>
            </div>
          </Animate>
        </div>
      </section>

      {/* PROBLEMS & SOLUTIONS */}
      <section className="py-20 px-6" style={{ background: "#fff" }}>
        <div className="max-w-4xl mx-auto">
          <Animate className="mb-12 text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold" style={{ color: INK }}>The problems every Philippine catering business faces, and how Smapey solves them</h2>
          </Animate>
          <div className="grid sm:grid-cols-2 gap-6">
            {CHALLENGES.map(({ icon: Icon, problem, solution }, i) => {
              const c = accentFor(i)
              return (
                <Animate key={problem} delay={i * 70}>
                  <div className="rounded-[20px] p-6 border-2 hover:-translate-y-1 transition-transform h-full" style={{ background: "#fff", borderColor: INK, boxShadow: `6px 6px 0 ${c}` }}>
                    <div className="w-10 h-10 rounded-[12px] border-2 flex items-center justify-center mb-4" style={{ background: c, borderColor: INK }}>
                      <Icon className="w-5 h-5" style={{ color: onAccent(c) }} />
                    </div>
                    <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: "#d4351c" }}>Problem</p>
                    <p className="font-medium text-sm mb-3" style={{ color: INK }}>{problem}</p>
                    <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: "#0d9f6e" }}>Solution</p>
                    <p className="text-sm leading-relaxed" style={{ color: "#54514c" }}>{solution}</p>
                  </div>
                </Animate>
              )
            })}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="py-20 px-6" style={{ background: CREAM, borderTop: `2px solid ${INK}` }}>
        <div className="max-w-4xl mx-auto">
          <Animate>
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-5" style={{ color: INK }}>The catering business landscape in the Philippines</h2>
            <p className="leading-relaxed mb-4" style={{ color: "#54514c" }}>The catering industry in the Philippines is driven by a culture of large family gatherings, weddings, debuts, baptisms, and corporate events. Filipino families are known for going all-out on celebrations, which means catering businesses often handle high-value bookings where getting the payment schedule and supply planning right is critical.</p>
            <p className="leading-relaxed mb-4" style={{ color: "#54514c" }}>Most catering businesses in the Philippines start small, a home-based operation run by one or two people, often taking bookings through Facebook or referrals. As the business grows, the operational complexity grows with it: more clients, more events running simultaneously, more staff to coordinate, and more suppliers to track.</p>
            <p className="leading-relaxed" style={{ color: "#54514c" }}>The shift from running a catering business on notebooks, spreadsheets, and Messenger threads to using a dedicated catering management system is usually what separates businesses that scale from those that stay stuck in manual operations. Smapey is designed to make that shift as easy as possible, free to start, no IT setup, accessible from any device.</p>
          </Animate>
        </div>
      </section>

      {/* WHAT YOU GET */}
      <section className="py-20 px-6" style={{ background: "#fff", borderTop: `2px solid ${INK}` }}>
        <div className="max-w-4xl mx-auto">
          <Animate className="mb-10 text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold" style={{ color: INK }}>What you get with Smapey</h2>
          </Animate>
          <div className="grid sm:grid-cols-2 gap-4">
            {WHAT_YOU_GET.map((item, i) => (
              <Animate key={item} delay={i * 40}>
                <div className="flex items-start gap-3 p-4 rounded-[14px] border-2" style={{ background: CREAM, borderColor: INK }}>
                  <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" style={{ color: BLUE }} />
                  <span className="text-sm" style={{ color: INK }}>{item}</span>
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6" style={{ background: CREAM, borderTop: `2px solid ${INK}` }}>
        <div className="max-w-2xl mx-auto">
          <Animate className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold" style={{ color: INK }}>Frequently asked questions</h2>
          </Animate>
          <div className="flex flex-col gap-3">
            {FAQS.map(({ q, a }, i) => (
              <Animate key={i} delay={i * 60}>
                <div className="rounded-[16px] overflow-hidden border-2 bg-white" style={{ borderColor: INK }}>
                  <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between px-5 py-4 text-left font-bold text-sm" style={{ color: INK }}>
                    {q}
                    <ChevronRight className="w-4 h-4 transition-transform duration-200 shrink-0" style={{ color: BLUE, transform: open === i ? "rotate(90deg)" : "rotate(0deg)" }} />
                  </button>
                  {open === i && <div className="px-5 pb-4 text-sm leading-relaxed pt-3" style={{ color: "#54514c", borderTop: "1px solid rgba(22,22,22,.1)" }}>{a}</div>}
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6" style={{ background: "#fff" }}>
        <Animate className="max-w-3xl mx-auto">
          <div className="rounded-[28px] border-2 p-10 text-center" style={{ background: AMBER, borderColor: INK, boxShadow: `10px 10px 0 ${INK}` }}>
            <h2 className="text-3xl font-extrabold mb-4" style={{ color: INK }}>Ready to run your catering business smarter?</h2>
            <p className="mb-8 max-w-lg mx-auto font-medium" style={{ color: "#5c4a28" }}>Free forever for small catering businesses. No setup fee, no credit card, no IT team required.</p>
            <a href={REGISTER_URL} className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm border-2 transition-transform hover:-translate-y-0.5" style={{ ...display, background: INK, color: "#fff", borderColor: INK }}>
              Get started free <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </Animate>
      </section>

      <InternalLinks cluster="catering" currentPath="/catering/catering-business-philippines" />

      <footer className="px-6 py-8" style={{ background: CREAM, borderTop: `2px solid ${INK}` }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Smapey" className="w-6 h-6 rounded-md object-cover" />
            <span className="text-sm font-extrabold" style={{ color: INK }}>Catering Manager by Smapey</span>
          </div>
          <p className="text-xs" style={{ color: "#9a948b" }}>© {new Date().getFullYear()} Smapey. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}
