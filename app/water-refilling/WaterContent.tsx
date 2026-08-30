"use client"

import { useState, useEffect, useRef } from "react"
import {
  Truck, Users, PackageOpen, Boxes, MessageSquare, MapPin,
  Settings, BarChart3, CheckCircle2, ChevronRight,
  CalendarCheck,
Zap , Menu , X } from "lucide-react"
import { usePricing, type Plan } from "@/lib/usePricing"
import InternalLinks from "@/components/InternalLinks"
import HubGuides from "@/components/blog/HubGuides"
import type { BlogPost } from "@/lib/blog"
import BookDemoForm from "@/components/BookDemoForm"
import { FAQS } from "./faqs"

const INK = "#161616"
const BLUE = "#2f6bff"
const AMBER = "#ff9e2c"
const CREAM = "#fbf7f0"
const display = { fontFamily: "'Hanken Grotesk', system-ui, sans-serif" }

const FEATURES = [
  { icon: Truck, title: "Delivery Orders", desc: "Take refill orders in seconds - pick the customer, enter gallons delivered and empties returned, and move each order from Pending → Out for Delivery → Delivered. Every order gets an auto ticket number." },
  { icon: Users, title: "Customers & Container Deposits", desc: "Keep a profile for every customer with their own price per gallon and container deposit. Smapey tracks exactly how many of your containers each customer is holding at any time." },
  { icon: PackageOpen, title: "Empties Return Tracking", desc: "When a customer hands back empty containers (with a delivery or just dropping by) record it on the Returns page. Their outstanding container count updates instantly, no manual tally." },
  { icon: Boxes, title: "Inventory & Refills", desc: "See filled stock, gallons reserved for pending deliveries, and empties on hand waiting to be refilled. One click turns refilled empties back into sellable stock." },
  { icon: MessageSquare, title: "Customer SMS Notifications", desc: "Automatically text customers when their water delivery is on the way. SMS is an optional toggle - turn it on or off whenever you like." },
  { icon: MapPin, title: "Delivery Routes & Zones", desc: "Group customers by route or barangay so your delivery rider always knows where to go. Filter today's orders by route to plan the run." },
  { icon: Settings, title: "Station Defaults", desc: "Set one default price per gallon, deposit per gallon, and low-stock threshold. New customers inherit them automatically - override per customer only when you need to." },
  { icon: BarChart3, title: "Dashboard & Revenue", desc: "See today's orders, pending deliveries, unpaid balances, current stock, outstanding containers, and a 7-day revenue trend - everything on one screen." },
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
        <a href="/water-refilling" className="flex items-center gap-2.5">
          <img src="/logo.png" alt="Smapey" className="w-8 h-8 rounded-lg object-cover" />
          <span className="font-extrabold tracking-tight" style={{ color: INK }}>Smapey Water</span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          <a href="/water-refilling" className="text-sm font-semibold hover:opacity-60 transition-opacity" style={{ color: INK }}>Home</a>
          <a href="#features" className="text-sm font-semibold hover:opacity-60 transition-opacity" style={{ color: INK }}>Features</a>
          <a href="#how-it-works" className="text-sm font-semibold hover:opacity-60 transition-opacity" style={{ color: INK }}>How it Works</a>
          <a href="#pricing" className="text-sm font-semibold hover:opacity-60 transition-opacity" style={{ color: INK }}>Pricing</a>
          <a href="#faq" className="text-sm font-semibold hover:opacity-60 transition-opacity" style={{ color: INK }}>FAQ</a>
          <a href="/water-refilling/guide" className="text-sm font-semibold hover:opacity-60 transition-opacity" style={{ color: INK }}>Guide</a>
        </div>
        <div className="hidden md:flex items-center gap-3">
          <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/login`} className="text-sm font-semibold hover:opacity-60 transition-opacity px-2 py-2" style={{ color: INK }}>Sign in</a>
          <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=WATER_REFILLING&plan=FREE`} className="text-sm font-bold px-5 py-2.5 rounded-full border-2 transition-transform hover:-translate-y-0.5" style={{ ...display, background: AMBER, color: INK, borderColor: INK, boxShadow: `3px 3px 0 ${INK}` }}>Get started free</a>
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden" style={{ color: INK }}>{open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}</button>
      </div>
      {open && (
        <div className="md:hidden px-6 py-4 flex flex-col gap-4" style={{ background: CREAM, borderTop: `2px solid ${INK}` }}>
          <a href="/water-refilling" className="text-sm font-semibold" style={{ color: INK }}>Home</a>
          <a href="#features" className="text-sm font-semibold" style={{ color: INK }}>Features</a>
          <a href="#how-it-works" className="text-sm font-semibold" style={{ color: INK }}>How it Works</a>
          <a href="#pricing" className="text-sm font-semibold" style={{ color: INK }}>Pricing</a>
          <a href="#faq" className="text-sm font-semibold" style={{ color: INK }}>FAQ</a>
          <a href="/water-refilling/guide" className="text-sm font-semibold" style={{ color: INK }}>Guide</a>
          <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=WATER_REFILLING&plan=FREE`} className="text-sm font-bold px-4 py-2.5 rounded-full border-2 text-center" style={{ ...display, background: AMBER, color: INK, borderColor: INK }}>Get started free</a>
        </div>
      )}
    </nav>
  )
}

function Hero() {
  const stops = [
    { addr: "Brgy. San Roque · 3 gal", state: "done" },
    { addr: "Mabini St. Apt 4 · 5 gal", state: "done" },
    { addr: "Riverside Eatery · 8 gal", state: "active" },
    { addr: "Villa Hermosa · 2 gal", state: "queued" },
  ]
  const dot = { done: "#10b981", active: AMBER, queued: "rgba(255,255,255,.3)" }

  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden" style={{ background: INK, fontFamily: display.fontFamily }}>
      {/* subtle ripple rings */}
      <div className="absolute inset-0 pointer-events-none hidden lg:block" aria-hidden>
        <div className="absolute rounded-full border-2" style={{ top: "-140px", right: "-90px", width: 380, height: 380, borderColor: "#fff", opacity: 0.06 }} />
        <div className="absolute rounded-full border-2" style={{ bottom: "-160px", left: "-80px", width: 320, height: 320, borderColor: BLUE, opacity: 0.18 }} />
      </div>

      <div className="relative w-full max-w-6xl mx-auto px-6 py-24 grid lg:grid-cols-[1fr_1fr] gap-12 lg:gap-16 items-center">
        {/* LEFT, copy (light text) */}
        <div className="min-w-0 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 text-xs font-bold mb-7" style={{ color: "#fff", borderColor: "rgba(255,255,255,.25)", background: "rgba(255,255,255,.06)" }}>
            <Zap className="w-3 h-3" style={{ color: AMBER }} />
            Built for water refilling stations
          </div>

          <h1 className="font-extrabold tracking-tight mb-6" style={{ color: "#fff", fontSize: "clamp(44px,6vw,78px)", lineHeight: 0.97, letterSpacing: "-0.03em" }}>
            Every gallon,{" "}
            <span className="relative inline-block" style={{ color: "#5b8cff" }}>
              every route
              <span className="absolute left-0 right-0" style={{ bottom: 6, height: 14, background: AMBER, zIndex: -1, transform: "rotate(-1.2deg)" }} />
            </span>
            , on time
          </h1>

          <p className="text-lg max-w-md mx-auto lg:mx-0 mb-9 leading-relaxed" style={{ color: "rgba(255,255,255,.65)" }}>
            Track orders, delivery runs, container returns, and customer balances from one screen. Smapey keeps every drop accounted for, from station to doorstep.
          </p>

          <div className="flex flex-col sm:flex-row items-center lg:justify-start justify-center gap-3 mb-9">
            <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=WATER&plan=FREE`} className="flex items-center gap-2 px-7 py-4 rounded-full font-bold text-sm border-2 transition-transform hover:-translate-y-0.5" style={{ ...display, background: AMBER, color: INK, borderColor: AMBER, boxShadow: "4px 4px 0 rgba(255,255,255,.18)" }}>
              Start for free <ChevronRight className="w-4 h-4" />
            </a>
            <a href="#book-demo" onClick={(e) => { e.preventDefault(); document.getElementById("book-demo")?.scrollIntoView({ behavior: "smooth" }) }} className="flex items-center gap-2 px-7 py-4 rounded-full font-bold text-sm border-2 transition-transform hover:-translate-y-0.5" style={{ ...display, color: "#fff", borderColor: "rgba(255,255,255,.3)", background: "rgba(255,255,255,.04)" }}>
              <CalendarCheck className="w-4 h-4" /> Book a Demo
            </a>
          </div>

          <div className="flex flex-wrap items-center lg:justify-start justify-center gap-x-6 gap-y-2 text-xs font-semibold" style={{ color: "rgba(255,255,255,.6)" }}>
            {["No credit card required", "Free plan forever", "Setup in minutes"].map((t) => (
              <span key={t} className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5" style={{ color: "#34d399" }} />{t}</span>
            ))}
          </div>
        </div>

        {/* RIGHT, delivery-run dispatch card (light card pops on dark) */}
        <div className="relative min-w-0 w-full max-w-md mx-auto">
          {/* floating order chip */}
          <div className="absolute z-10 flex items-center gap-2 bg-white border-2 rounded-full px-3.5 py-2" style={{ top: -20, right: -16, borderColor: INK, boxShadow: `4px 4px 0 ${BLUE}`, transform: "rotate(4deg)" }}>
            <span className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: BLUE, border: `2px solid ${INK}` }}><MessageSquare className="w-3 h-3 text-white" /></span>
            <span className="text-[11px] font-extrabold" style={{ color: INK }}>New order · 8 gal</span>
          </div>

          <div className="relative bg-white border-2 rounded-[24px] p-6" style={{ borderColor: INK, boxShadow: `9px 9px 0 ${BLUE}` }}>
            {/* header */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2.5">
                <span className="w-9 h-9 rounded-xl border-2 flex items-center justify-center" style={{ background: BLUE, borderColor: INK }}><Truck className="w-4 h-4 text-white" /></span>
                <div className="leading-tight">
                  <div className="text-[13px] font-extrabold" style={{ color: INK }}>Delivery Run · AM</div>
                  <div className="text-[11px] font-semibold" style={{ color: "#9a948b" }}>Rider: Jun · 4 stops</div>
                </div>
              </div>
              <span className="text-[10px] font-extrabold tracking-widest rounded-full px-2.5 py-1 border" style={{ color: BLUE, borderColor: BLUE }}>LIVE</span>
            </div>

            {/* route stops */}
            <div className="rounded-[16px] border-2 px-4 py-4 mb-5" style={{ background: CREAM, borderColor: INK }}>
              {stops.map((s, i) => (
                <div key={s.addr} className="flex items-start gap-3">
                  <div className="flex flex-col items-center">
                    <span className="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0" style={{ background: s.state === "done" ? dot.done : s.state === "active" ? AMBER : "#fff", borderColor: INK }}>
                      {s.state === "done" && <CheckCircle2 className="w-3 h-3 text-white" />}
                      {s.state === "active" && <MapPin className="w-3 h-3" style={{ color: INK }} />}
                    </span>
                    {i < stops.length - 1 && <span className="w-0.5 h-6" style={{ background: s.state === "done" ? dot.done : "#e7e1d6" }} />}
                  </div>
                  <span className="text-[13px] font-bold pt-px pb-2" style={{ color: s.state === "queued" ? "#9a948b" : INK }}>
                    {s.addr}{s.state === "active" && <span className="ml-1.5 text-[10px] font-extrabold px-1.5 py-0.5 rounded-full align-middle" style={{ background: AMBER, color: INK }}>EN ROUTE</span>}
                  </span>
                </div>
              ))}
            </div>

            {/* stats row */}
            <div className="grid grid-cols-3 gap-2.5">
              <div className="rounded-[12px] border-2 px-3 py-2.5 text-center" style={{ borderColor: INK }}>
                <div className="text-[16px] font-extrabold" style={{ color: INK }}>18</div>
                <div className="text-[9px] font-bold" style={{ color: "#9a948b" }}>GAL TODAY</div>
              </div>
              <div className="rounded-[12px] border-2 px-3 py-2.5 text-center" style={{ borderColor: INK }}>
                <div className="text-[16px] font-extrabold" style={{ color: INK }}>6</div>
                <div className="text-[9px] font-bold" style={{ color: "#9a948b" }}>RETURNS</div>
              </div>
              <div className="rounded-[12px] border-2 px-3 py-2.5 text-center" style={{ background: "#eafaf0", borderColor: INK }}>
                <div className="text-[16px] font-extrabold" style={{ color: "#059669" }}>₱1,260</div>
                <div className="text-[9px] font-bold" style={{ color: "#059669" }}>COLLECTED</div>
              </div>
            </div>
          </div>

          {/* floating containers chip */}
          <div className="absolute z-10 flex items-center gap-2 bg-white border-2 rounded-2xl px-3.5 py-2.5" style={{ bottom: -22, left: -16, borderColor: INK, boxShadow: `4px 4px 0 ${AMBER}`, transform: "rotate(-4deg)" }}>
            <span className="w-7 h-7 rounded-lg border-2 flex items-center justify-center" style={{ background: AMBER, borderColor: INK }}><Boxes className="w-3.5 h-3.5" style={{ color: INK }} /></span>
            <div className="leading-tight">
              <div className="text-[10px] font-bold" style={{ color: "#9a948b" }}>Containers out</div>
              <div className="text-[12px] font-extrabold" style={{ color: INK }}>34</div>
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
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight" style={{ color: INK }}>Everything you need</h2>
          
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
  { step: "01", title: "Set your station defaults", desc: "Enter your default price per gallon and container deposit once. Add your delivery routes and your first customers - each one inherits your defaults automatically." },
  { step: "02", title: "Take orders & deliveries", desc: "Create a delivery order, enter gallons delivered and empties returned, and mark it delivered. Stock goes down automatically and the customer's container balance updates." },
  { step: "03", title: "Track returns, refills & cash", desc: "Log empties customers drop off, refill them back into stock with one click, and record Cash or GCash payments. Your dashboard shows exactly where the money and the bottles are." },
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
  const { plans, isPhilippines } = usePricing("WATER_REFILLING")
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
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4" style={{ color: INK }}>Ready to get started?</h2>
        <p className="mb-8 font-medium" style={{ color: "#5c4a28" }}>Free to start. No credit card required.</p>
        <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=WATER_REFILLING&plan=FREE`} className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold border-2 transition-transform hover:-translate-y-0.5" style={{ ...display, background: INK, color: "#fff", borderColor: INK }}>Get started for free <ChevronRight className="w-4 h-4" /></a>
      </Animate>
    </section>
  )
}

function Footer() {
  return (
    <footer className="px-6 py-8" style={{ background: CREAM, borderTop: `2px solid ${INK}`, fontFamily: display.fontFamily }}>
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2"><img src="/logo.png" alt="Smapey" className="w-6 h-6 rounded-md object-cover" /><span className="text-sm font-extrabold" style={{ color: INK }}>Water by Smapey</span></div>
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
            <div><h2 className="text-white font-extrabold text-lg">{step === "details" ? "Create your account" : "Choose payment method"}</h2><p className="text-sm mt-0.5" style={{ color: "rgba(255,255,255,.7)" }}>{plan.name} plan, <span className="font-bold" style={{ color: AMBER }}>{displayPrice}</span>{plan.period}</p></div>
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

export default function WaterContent({ guides = [] }: { guides?: BlogPost[] }) {
  return (
    <main>
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Pricing />
      <FAQ />
      <BookDemoForm product="WATER_REFILLING" />
      <CTA />
      <InternalLinks cluster="water-refilling" currentPath="/water-refilling" />
      <HubGuides posts={guides} hubPath="/water-refilling" />
      <Footer />
    </main>
  )
}
