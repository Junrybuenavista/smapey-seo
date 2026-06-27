"use client"

import { useState, useEffect, useRef } from "react"
import {
  CalendarDays, Clock, Users, CheckCircle2, ChevronRight,
  Menu, X, Star, Briefcase, Bell, CreditCard, BarChart3,
  Shield, Zap, CalendarCheck, UserCheck, BookOpen,
} from "lucide-react"
import { usePricing, type Plan } from "@/lib/usePricing"
import InternalLinks from "@/components/InternalLinks"
import BookDemoForm from "@/components/BookDemoForm"

const INK = "#161616"
const BLUE = "#2f6bff"
const AMBER = "#ff9e2c"
const CREAM = "#fbf7f0"
const display = { fontFamily: "'Hanken Grotesk', system-ui, sans-serif" }

const FEATURES = [
  { icon: CalendarDays, title: "Appointment Management", desc: "Create, confirm, cancel, and complete appointments in a clean calendar-style interface. Everything in one organized place." },
  { icon: Briefcase, title: "Service Catalog", desc: "Define your services with custom durations, prices, and capacity. Activate or deactivate services anytime without deleting them." },
  { icon: Clock, title: "Availability Scheduling", desc: "Set your open hours per day of the week and assign staff to specific time blocks. Control exactly when clients can book." },
  { icon: CreditCard, title: "Deposit Tracking", desc: "Record deposit amounts and mark them as paid or unpaid. Keep your cash flow visible without a separate spreadsheet." },
  { icon: UserCheck, title: "Staff Assignment", desc: "Assign appointments to specific staff members. Clients always know who they're seeing, and your team stays coordinated." },
  { icon: Bell, title: "Status Workflow", desc: "Move appointments through Pending → Confirmed → Completed with one click. Track no-shows and cancellations automatically." },
  { icon: BarChart3, title: "Booking Dashboard", desc: "See today's appointments, monthly totals, upcoming schedules, and completion rates at a glance from your dashboard." },
  { icon: Users, title: "Team Collaboration", desc: "Invite front desk staff, receptionists, and clinic managers. Control who can create, edit, or just view appointments." },
  { icon: Shield, title: "Multi-tenant & Secure", desc: "Each business gets its own isolated data. Your client list, services, and appointments are never shared with anyone else." },
]

const FAQS = [
  { q: "Who is this built for?", a: "Any service-based business with appointments — dental clinics, hair salons, massage studios, tutoring centers, beauty spas, and more. If clients book time slots with your staff, this is for you." },
  { q: "Can clients book appointments themselves online?", a: "Currently, appointments are created by your staff through the dashboard. This is designed as an internal scheduling tool — ideal for businesses where clients call or walk in and staff enters the booking." },
  { q: "How does deposit tracking work?", a: "When creating an appointment, you can record a deposit amount and mark it as Paid or Unpaid. It's a simple record-keeping field — no payment processing is involved at the appointment level." },
  { q: "Can I assign different staff to different appointments?", a: "Yes. Each appointment has an optional staff name field. You can assign Dr. Santos to one booking and Dr. Reyes to another — all tracked separately." },
  { q: "What happens when an appointment is completed?", a: "You mark it as Completed in the dashboard. It stays in your appointment history so you can track your monthly totals, completion rates, and client records over time." },
]

function useInView(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect() } }, { threshold: 0.15, ...options })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return { ref, inView }
}

function Animate({ children, className = "", delay = 0, style }: { children: React.ReactNode; className?: string; delay?: number; style?: React.CSSProperties }) {
  const { ref, inView } = useInView()
  return (
    <div ref={ref} className={className} style={{ ...style, transitionProperty: "opacity, transform", transitionDuration: "600ms", transitionTimingFunction: "cubic-bezier(0.4,0,0.2,1)", transitionDelay: `${delay}ms`, opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(28px)" }}>
      {children}
    </div>
  )
}

function Navbar() {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const id = "smapey-pop-fonts"
    if (!document.getElementById(id)) {
      const l = document.createElement("link"); l.id = id; l.rel = "stylesheet"
      l.href = "https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600;700;800&display=swap"
      document.head.appendChild(l)
    }
  }, [])
  return (
    <nav className="fixed top-0 inset-x-0 z-50" style={{ background: CREAM, borderBottom: `2px solid ${INK}`, fontFamily: display.fontFamily }}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/booking" className="flex items-center gap-2.5">
          <img src="/logo.png" alt="Smapey Booking" className="w-8 h-8 rounded-lg object-cover" />
          <span className="font-extrabold tracking-tight" style={{ color: INK }}>Smapey Booking</span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          <a href="/booking" className="text-sm font-semibold hover:opacity-60 transition-opacity" style={{ color: INK }}>Home</a>
          <a href="#features" className="text-sm font-semibold hover:opacity-60 transition-opacity" style={{ color: INK }}>Features</a>
          <a href="#how-it-works" className="text-sm font-semibold hover:opacity-60 transition-opacity" style={{ color: INK }}>How it Works</a>
          <a href="#pricing" className="text-sm font-semibold hover:opacity-60 transition-opacity" style={{ color: INK }}>Pricing</a>
          <a href="#faq" className="text-sm font-semibold hover:opacity-60 transition-opacity" style={{ color: INK }}>FAQ</a>
          <a href="/booking/guide" className="text-sm font-semibold hover:opacity-60 transition-opacity" style={{ color: INK }}>Guide</a>
        </div>
        <div className="hidden md:flex items-center gap-3">
          <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/login`} className="text-sm font-semibold hover:opacity-60 transition-opacity px-2 py-2" style={{ color: INK }}>Sign in</a>
          <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=BOOKING&plan=FREE`} className="text-sm font-bold px-5 py-2.5 rounded-full border-2 transition-transform hover:-translate-y-0.5" style={{ ...display, background: AMBER, color: INK, borderColor: INK, boxShadow: `3px 3px 0 ${INK}` }}>Get started free</a>
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden" style={{ color: INK }}>{open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}</button>
      </div>
      {open && (
        <div className="md:hidden px-6 py-4 flex flex-col gap-4" style={{ background: CREAM, borderTop: `2px solid ${INK}` }}>
          <a href="/booking" className="text-sm font-semibold" style={{ color: INK }}>Home</a>
          <a href="#features" className="text-sm font-semibold" style={{ color: INK }}>Features</a>
          <a href="#how-it-works" className="text-sm font-semibold" style={{ color: INK }}>How it Works</a>
          <a href="#pricing" className="text-sm font-semibold" style={{ color: INK }}>Pricing</a>
          <a href="#faq" className="text-sm font-semibold" style={{ color: INK }}>FAQ</a>
          <a href="/booking/guide" className="text-sm font-semibold" style={{ color: INK }}>Guide</a>
          <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=BOOKING&plan=FREE`} className="text-sm font-bold px-4 py-2.5 rounded-full border-2 text-center" style={{ ...display, background: AMBER, color: INK, borderColor: INK }}>Get started free</a>
        </div>
      )}
    </nav>
  )
}

function Hero() {
  const slots = [
    { time: "9:00",  name: "Ana Dela Cruz · Consultation", state: "done" },
    { time: "10:30", name: "Marco Lim · Follow-up",        state: "next" },
    { time: "1:00",  name: "Open slot",                    state: "open" },
    { time: "2:30",  name: "Grace Tan · Session",          state: "booked" },
  ]
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden" style={{ background: CREAM, fontFamily: display.fontFamily }}>
      <div className="absolute inset-0 pointer-events-none hidden lg:block" aria-hidden>
        <div className="absolute rounded-full border-2" style={{ top: "-130px", right: "-90px", width: 360, height: 360, borderColor: INK, opacity: 0.06 }} />
        <div className="absolute rounded-full border-2" style={{ bottom: "-150px", left: "-80px", width: 300, height: 300, borderColor: INK, opacity: 0.05 }} />
      </div>

      <div className="relative w-full max-w-6xl mx-auto px-6 py-24 grid lg:grid-cols-[1fr_1fr] gap-12 lg:gap-16 items-center">
        {/* LEFT — copy */}
        <div className="min-w-0 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border-2 text-xs font-bold mb-7" style={{ color: INK, borderColor: INK, boxShadow: `3px 3px 0 ${BLUE}` }}>
            <Zap className="w-3 h-3" />
            Built for appointment-based businesses
          </div>

          <h1 className="font-extrabold tracking-tight mb-6" style={{ color: INK, fontSize: "clamp(44px,6vw,78px)", lineHeight: 0.97, letterSpacing: "-0.03em" }}>
            Your whole day,{" "}
            <span className="relative inline-block" style={{ color: BLUE }}>
              booked solid
              <span className="absolute left-0 right-0" style={{ bottom: 6, height: 14, background: AMBER, zIndex: -1, transform: "rotate(-1.2deg)" }} />
            </span>
          </h1>

          <p className="text-lg max-w-md mx-auto lg:mx-0 mb-9 leading-relaxed" style={{ color: "#54514c" }}>
            Let clients book themselves, send automatic reminders, and fill every open slot. Smapey runs your calendar so you spend less time scheduling and more time working.
          </p>

          <div className="flex flex-col sm:flex-row items-center lg:justify-start justify-center gap-3 mb-9">
            <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=BOOKING&plan=FREE`} className="flex items-center gap-2 px-7 py-4 rounded-full font-bold text-sm border-2 transition-transform hover:-translate-y-0.5" style={{ ...display, background: AMBER, color: INK, borderColor: INK, boxShadow: `4px 4px 0 ${INK}` }}>
              Start for free <ChevronRight className="w-4 h-4" />
            </a>
            <a href="#book-demo" onClick={(e) => { e.preventDefault(); document.getElementById("book-demo")?.scrollIntoView({ behavior: "smooth" }) }} className="flex items-center gap-2 px-7 py-4 rounded-full font-bold text-sm border-2 bg-white transition-transform hover:-translate-y-0.5" style={{ ...display, color: INK, borderColor: INK }}>
              <CalendarCheck className="w-4 h-4" /> Book a Demo
            </a>
          </div>

          <div className="flex flex-wrap items-center lg:justify-start justify-center gap-x-6 gap-y-2 text-xs font-semibold" style={{ color: "#54514c" }}>
            {["No credit card required", "Free plan forever", "Setup in minutes"].map((t) => (
              <span key={t} className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />{t}</span>
            ))}
          </div>
        </div>

        {/* RIGHT — day-schedule card */}
        <div className="relative min-w-0 w-full max-w-md mx-auto">
          {/* floating reminder chip */}
          <div className="absolute z-10 flex items-center gap-2 bg-white border-2 rounded-full px-3.5 py-2" style={{ top: -20, right: -16, borderColor: INK, boxShadow: `4px 4px 0 ${BLUE}`, transform: "rotate(4deg)" }}>
            <span className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: BLUE, border: `2px solid ${INK}` }}><Bell className="w-3 h-3 text-white" /></span>
            <span className="text-[11px] font-extrabold" style={{ color: INK }}>Reminder sent</span>
          </div>

          <div className="relative bg-white border-2 rounded-[24px] p-6" style={{ borderColor: INK, boxShadow: `9px 9px 0 ${INK}` }}>
            {/* header */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2.5">
                <span className="w-9 h-9 rounded-xl border-2 flex items-center justify-center" style={{ background: BLUE, borderColor: INK }}><CalendarDays className="w-4 h-4 text-white" /></span>
                <div className="leading-tight">
                  <div className="text-[13px] font-extrabold" style={{ color: INK }}>Today · Tue, Nov 18</div>
                  <div className="text-[11px] font-semibold" style={{ color: "#9a948b" }}>6 appointments</div>
                </div>
              </div>
              <span className="text-[10px] font-extrabold tracking-widest rounded-full px-2.5 py-1 border" style={{ color: BLUE, borderColor: BLUE }}>85% FULL</span>
            </div>

            {/* slot rows */}
            <div className="flex flex-col gap-2.5 mb-5">
              {slots.map((s) => {
                const isNext = s.state === "next"
                const isOpen = s.state === "open"
                return (
                  <div key={s.time} className="flex items-center gap-3 rounded-[14px] border-2 px-3.5 py-3" style={{ background: isNext ? AMBER : isOpen ? "#fff" : CREAM, borderColor: INK, borderStyle: isOpen ? "dashed" : "solid" }}>
                    <span className="text-[12px] font-extrabold w-12 shrink-0" style={{ color: INK }}>{s.time}</span>
                    <span className="flex-1 text-[12px] font-bold" style={{ color: isOpen ? "#9a948b" : INK }}>{s.name}</span>
                    {s.state === "done" && <CheckCircle2 className="w-4 h-4" style={{ color: "#059669" }} />}
                    {isNext && <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded-full" style={{ background: INK, color: "#fff" }}>NEXT</span>}
                    {isOpen && <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded-full" style={{ background: "#eafaf0", color: "#059669" }}>OPEN</span>}
                    {s.state === "booked" && <Clock className="w-4 h-4" style={{ color: BLUE }} />}
                  </div>
                )
              })}
            </div>

            {/* footer stats */}
            <div className="grid grid-cols-2 gap-2.5">
              <div className="rounded-[12px] border-2 px-3 py-2.5 text-center" style={{ borderColor: INK }}>
                <div className="text-[16px] font-extrabold" style={{ color: INK }}>1</div>
                <div className="text-[9px] font-bold" style={{ color: "#9a948b" }}>OPEN SLOT</div>
              </div>
              <div className="rounded-[12px] border-2 px-3 py-2.5 text-center" style={{ background: "#eafaf0", borderColor: INK }}>
                <div className="text-[16px] font-extrabold" style={{ color: "#059669" }}>₱4,500</div>
                <div className="text-[9px] font-bold" style={{ color: "#059669" }}>TODAY</div>
              </div>
            </div>
          </div>

          {/* floating self-booking chip */}
          <div className="absolute z-10 flex items-center gap-2 bg-white border-2 rounded-2xl px-3.5 py-2.5" style={{ bottom: -22, left: -16, borderColor: INK, boxShadow: `4px 4px 0 ${AMBER}`, transform: "rotate(-4deg)" }}>
            <span className="w-7 h-7 rounded-lg border-2 flex items-center justify-center" style={{ background: AMBER, borderColor: INK }}><UserCheck className="w-3.5 h-3.5" style={{ color: INK }} /></span>
            <div className="leading-tight">
              <div className="text-[10px] font-bold" style={{ color: "#9a948b" }}>Client booked</div>
              <div className="text-[12px] font-extrabold" style={{ color: INK }}>online</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Features() {
  return (
    <section id="features" className="py-24" style={{ background: "#fff", fontFamily: display.fontFamily }}>
      <div className="max-w-6xl mx-auto px-6">
        <Animate className="text-center mb-16">
          <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: BLUE }}>Features</p>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight" style={{ color: INK }}>Everything your front desk needs</h2>
          <p className="mt-4 max-w-xl mx-auto" style={{ color: "#54514c" }}>From services to schedules to staff — Smapey Booking keeps your appointments organized so you can focus on your clients.</p>
        </Animate>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map(({ icon: Icon, title, desc }, i) => {
            const c = i % 2 === 0 ? BLUE : AMBER
            return (
              <Animate key={title} delay={i * 80}>
                <div className="rounded-[22px] p-6 border-2 h-full transition-transform hover:-translate-y-1" style={{ background: CREAM, borderColor: INK, boxShadow: `6px 6px 0 ${c}` }}>
                  <div className="w-12 h-12 rounded-[14px] border-2 flex items-center justify-center mb-4" style={{ background: c, borderColor: INK }}>
                    <Icon className="w-5 h-5" style={{ color: c === AMBER ? INK : "#fff" }} />
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
  )
}

const STEPS = [
  { step: "01", title: "Set up your services", desc: "Add the services you offer — like a 30-min consultation or haircut — with duration, price, and capacity." },
  { step: "02", title: "Define your availability", desc: "Set which days and hours you're open. Assign staff names to specific time slots if needed." },
  { step: "03", title: "Book and manage clients", desc: "Create appointments, track deposits, confirm bookings, and mark them complete when done." },
]

function HowItWorks() {
  const acc = [BLUE, AMBER, BLUE, AMBER]
  return (
    <section id="how-it-works" className="py-24" style={{ background: CREAM, fontFamily: display.fontFamily }}>
      <div className="max-w-6xl mx-auto px-6">
        <Animate className="text-center mb-16">
          <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: BLUE }}>How it Works</p>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight" style={{ color: INK }}>Up and running in minutes</h2>
        </Animate>
        <div className="grid md:grid-cols-3 gap-6">
          {STEPS.map(({ step, title, desc }, i) => (
            <Animate key={step} delay={i * 120}>
              <div className="rounded-[22px] border-2 p-8 h-full transition-transform hover:-translate-y-1" style={{ background: "#fff", borderColor: INK, boxShadow: `6px 6px 0 ${acc[i % acc.length]}` }}>
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-[16px] border-2 font-extrabold text-lg mb-5" style={{ background: acc[i % acc.length], color: acc[i % acc.length] === AMBER ? INK : "#fff", borderColor: INK }}>{step}</div>
                <h3 className="font-extrabold mb-2" style={{ color: INK }}>{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#54514c" }}>{desc}</p>
              </div>
            </Animate>
          ))}
        </div>
      </div>
    </section>
  )
}

function Pricing() {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null)
  const { plans, isPhilippines } = usePricing("BOOKING")
  const handleSelect = (p: Plan) => { if (p.planKey === "FREE") { window.location.href = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=${p.product}&plan=FREE`; return } setSelectedPlan(p) }
  return (
    <section id="pricing" className="py-24" style={{ background: CREAM, fontFamily: display.fontFamily }}>
      <div className="max-w-6xl mx-auto px-6">
        <Animate className="text-center mb-16">
          <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: BLUE }}>Pricing</p>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight" style={{ color: INK }}>Start free. Upgrade when ready.</h2>
          <p className="mt-4" style={{ color: "#54514c" }}>The free plan stays free forever.</p>
          {isPhilippines !== null && (
            <div className="inline-flex items-center gap-1.5 mt-4 px-3 py-1 rounded-full bg-white border-2 text-xs font-semibold" style={{ borderColor: INK, color: INK }}>
              <span>{isPhilippines ? "🇵🇭" : "🌍"}</span>
              <span>Prices in <span className="font-extrabold">{isPhilippines ? "Philippine Peso (₱)" : "US Dollar ($)"}</span></span>
            </div>
          )}
        </Animate>
        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {plans.map((p, i) => {
            const displayPrice = isPhilippines === null ? "..." : isPhilippines ? p.phpPrice : p.usdPrice
            return (
              <Animate key={p.name} delay={i * 100}>
                <div className="rounded-[24px] p-8 border-2 h-full transition-transform hover:-translate-y-1" style={p.highlight ? { background: BLUE, borderColor: INK, boxShadow: `8px 8px 0 ${INK}`, color: "#fff" } : { background: "#fff", borderColor: INK, boxShadow: `8px 8px 0 ${AMBER}` }}>
                  {p.highlight && <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border-2 text-xs font-bold mb-4" style={{ background: AMBER, color: INK, borderColor: INK }}><Zap className="w-3 h-3" /> Most popular</span>}
                  <p className="font-extrabold text-lg mb-1" style={{ color: p.highlight ? "#fff" : INK }}>{p.name}</p>
                  <p className="text-sm mb-4" style={{ color: p.highlight ? "rgba(255,255,255,.7)" : "#9a948b" }}>{p.desc}</p>
                  <div className="flex items-end gap-1 mb-6">
                    <span className="text-4xl font-extrabold tracking-tight" style={{ color: p.highlight ? "#fff" : INK }}>{displayPrice}</span>
                    <span className="text-sm mb-1" style={{ color: p.highlight ? "rgba(255,255,255,.6)" : "#9a948b" }}>{p.period}</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {p.features.map((f) => (<li key={f} className="flex items-center gap-2.5 text-sm"><CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: p.highlight ? AMBER : BLUE }} /><span style={{ color: p.highlight ? "rgba(255,255,255,.85)" : "#3f3b36" }}>{f}</span></li>))}
                  </ul>
                  <button onClick={() => handleSelect(p)} className="w-full text-center py-3 rounded-full text-sm font-bold border-2 transition-transform hover:-translate-y-0.5" style={p.highlight ? { ...display, background: AMBER, color: INK, borderColor: INK } : { ...display, background: INK, color: "#fff", borderColor: INK }}>{p.cta}</button>
                </div>
              </Animate>
            )
          })}
        </div>
      </div>
      {selectedPlan && <PaymentModal plan={selectedPlan} isPhilippines={isPhilippines ?? false} onClose={() => setSelectedPlan(null)} />}
    </section>
  )
}

function FAQ() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <section id="faq" className="py-24" style={{ background: "#fff", fontFamily: display.fontFamily }}>
      <div className="max-w-2xl mx-auto px-6">
        <Animate className="text-center mb-16">
          <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: BLUE }}>FAQ</p>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight" style={{ color: INK }}>Common questions</h2>
        </Animate>
        <div className="flex flex-col gap-3">
          {FAQS.map(({ q, a }, i) => (
            <Animate key={i} delay={i * 60}>
              <div className="rounded-[18px] overflow-hidden border-2 bg-white" style={{ borderColor: INK }}>
                <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between px-5 py-4 text-left font-bold text-sm" style={{ color: INK }}>{q}<ChevronRight className="w-4 h-4 transition-transform duration-200 shrink-0" style={{ color: BLUE, transform: open === i ? "rotate(90deg)" : "rotate(0deg)" }} /></button>
                {open === i && <div className="px-5 pb-4 text-sm leading-relaxed pt-3" style={{ color: "#54514c", borderTop: "1px solid rgba(22,22,22,.1)" }}>{a}</div>}
              </div>
            </Animate>
          ))}
        </div>
      </div>
    </section>
  )
}

function CTA() {
  return (
    <section className="py-24 px-6" style={{ background: "#fff", fontFamily: display.fontFamily }}>
      <Animate className="relative max-w-3xl mx-auto rounded-[30px] border-2 p-12 md:p-16 text-center" style={{ background: AMBER, borderColor: INK, boxShadow: `10px 10px 0 ${INK}` }}>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4" style={{ color: INK }}>Ready to take control of your bookings?</h2>
        <p className="mb-8 font-medium" style={{ color: "#5c4a28" }}>Join service businesses using Smapey Booking to manage appointments without the chaos.</p>
        <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=BOOKING&plan=FREE`} className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold border-2 transition-transform hover:-translate-y-0.5" style={{ ...display, background: INK, color: "#fff", borderColor: INK }}>Get started for free <ChevronRight className="w-4 h-4" /></a>
      </Animate>
    </section>
  )
}

function Footer() {
  return (
    <footer className="px-6 py-8" style={{ background: CREAM, borderTop: `2px solid ${INK}`, fontFamily: display.fontFamily }}>
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2"><img src="/logo.png" alt="Smapey Booking" className="w-6 h-6 rounded-md object-cover" /><span className="text-sm font-extrabold" style={{ color: INK }}>Booking by Smapey</span></div>
        <p className="text-xs" style={{ color: "#9a948b" }}>© {new Date().getFullYear()} Smapey. All rights reserved.</p>
      </div>
    </footer>
  )
}

type CheckoutMethod = "paypal" | "paymongo"
const Spinner = () => (<svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>)

function PaymentModal({ plan, isPhilippines, onClose }: { plan: { name: string; phpPrice: string; usdPrice: string; period: string; planKey: string; product: string } | null; isPhilippines: boolean; onClose: () => void }) {
  const [step, setStep] = useState<"details" | "payment">("details")
  const [name, setName] = useState(""); const [email, setEmail] = useState("")
  const [loading, setLoading] = useState<CheckoutMethod | null>(null)
  const [token, setToken] = useState<string | null>(null)
  useEffect(() => { const t = localStorage.getItem("accessToken"); setToken(t); if (t) setStep("payment") }, [])
  if (!plan) return null
  const displayPrice = isPhilippines ? plan.phpPrice : plan.usdPrice
  const inputStyle = { borderColor: INK, color: INK } as React.CSSProperties
  const checkout = async (method: CheckoutMethod) => {
    try {
      setLoading(method)
      const endpoint = token ? (method === "paypal" ? "/api/billing/subscribe/paypal" : "/api/billing/subscribe/paymongo") : (method === "paypal" ? "/api/billing/newaccount/paypal" : "/api/billing/newaccount/paymongo")
      const payload = token ? { product: plan.product, plan: plan.planKey } : { name, email, product: plan.product, plan: plan.planKey }
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, { method: "POST", headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) }, body: JSON.stringify(payload) })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || JSON.stringify(data))
      const redirectUrl = data.approveUrl || data.checkoutUrl
      if (!redirectUrl) throw new Error("No redirect URL returned")
      window.location.href = redirectUrl
    } catch (err: any) { alert(err?.message || "Checkout failed. Please try again.") } finally { setLoading(null) }
  }
  const handleContinue = () => { if (!name.trim() || !email.trim()) { alert("Name and email are required"); return } if (!isPhilippines) { checkout("paypal") } else { setStep("payment") } }
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" style={{ fontFamily: display.fontFamily }}>
      <div className="bg-white rounded-[22px] w-full max-w-md overflow-hidden border-2" style={{ borderColor: INK, boxShadow: `10px 10px 0 ${AMBER}` }}>
        <div className="px-6 py-5 flex items-center justify-between" style={{ background: INK }}>
          <div className="flex items-center gap-3">
            {step === "payment" && !token && <button onClick={() => setStep("details")} className="text-white/70 hover:text-white transition"><svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 5l-7 7 7 7"/></svg></button>}
            <div><h2 className="text-white font-extrabold text-lg">{step === "details" ? "Create your account" : "Choose payment method"}</h2><p className="text-sm mt-0.5" style={{ color: "rgba(255,255,255,.7)" }}>{plan.name} plan — <span className="font-bold" style={{ color: AMBER }}>{displayPrice}</span>{plan.period}</p></div>
          </div>
          <button onClick={onClose} className="text-white/70 hover:text-white transition-colors"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-6 flex flex-col gap-4">
          {step === "details" && (<>
            <input placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} className="w-full border-2 rounded-xl px-4 py-2.5 text-sm focus:outline-none" style={inputStyle} />
            <input type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border-2 rounded-xl px-4 py-2.5 text-sm focus:outline-none" style={inputStyle} />
            <button onClick={handleContinue} disabled={loading !== null} className="w-full py-3 rounded-full border-2 font-bold text-sm flex items-center justify-center gap-2 transition-transform hover:-translate-y-0.5 disabled:opacity-60" style={{ ...display, background: AMBER, color: INK, borderColor: INK }}>{loading ? <><Spinner /> Redirecting…</> : <>Continue <ChevronRight className="w-4 h-4" /></>}</button>
          </>)}
          {step === "payment" && (<>
            {isPhilippines && (<button onClick={() => checkout("paymongo")} disabled={loading !== null} className="w-full flex items-center gap-4 px-5 py-4 border-2 rounded-2xl transition-all group" style={{ borderColor: INK }}><div className="w-10 h-10 rounded-xl bg-green-600 flex items-center justify-center shrink-0"><svg viewBox="0 0 24 24" className="w-5 h-5 fill-white"><path d="M3 3h7v7H3zm0 11h7v7H3zm11-11h7v7h-7zm0 11h7v7h-7z"/></svg></div><div className="flex-1 text-left"><p className="text-sm font-bold" style={{ color: INK }}>QR Ph / GCash / Card</p><p className="text-xs" style={{ color: "#9a948b" }}>Philippine payment methods</p></div>{loading === "paymongo" ? <Spinner /> : <ChevronRight className="w-4 h-4" style={{ color: INK }} />}</button>)}
            <button onClick={() => checkout("paypal")} disabled={loading !== null} className="w-full flex items-center gap-4 px-5 py-4 border-2 rounded-2xl transition-all group" style={{ borderColor: INK }}><div className="w-10 h-10 rounded-xl bg-[#003087] flex items-center justify-center shrink-0"><svg viewBox="0 0 24 24" className="w-5 h-5 fill-white"><path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c1.379 8.883-5.43 11.61-10.377 11.61H8.23l-1.133 7.184h3.78c.458 0 .848-.332.92-.783l.038-.196.728-4.617.047-.252a.93.93 0 0 1 .919-.784h.578c3.746 0 6.678-1.522 7.534-5.927.358-1.833.173-3.363-.42-4.494z"/></svg></div><div className="flex-1 text-left"><p className="text-sm font-bold" style={{ color: INK }}>PayPal</p><p className="text-xs" style={{ color: "#9a948b" }}>Pay with your PayPal account</p></div>{loading === "paypal" ? <Spinner /> : <ChevronRight className="w-4 h-4" style={{ color: INK }} />}</button>
          </>)}
          <p className="text-center text-xs flex items-center justify-center gap-1" style={{ color: "#9a948b" }}><svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>Secure checkout · Cancel anytime · No hidden fees</p>
        </div>
      </div>
    </div>
  )
}

export default function BookingLandingPage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Pricing />
      <FAQ />
      <BookDemoForm product="BOOKING" />
      <CTA />
      <InternalLinks cluster="booking" currentPath="/booking" />
      <Footer />
    </main>
  )
}
