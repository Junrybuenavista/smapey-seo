"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { CheckCircle2, ChevronRight, Menu, X, Zap, Bubbles, Search, Check } from "lucide-react"
import { usePricing, type Plan } from "@/lib/usePricing"

//////////////////////////////////////////////////////
// CONFIG + LAYERED POP TOKENS
//////////////////////////////////////////////////////
export const REGISTER_URL = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=CAR_WASH&plan=FREE`
export const LOGIN_URL = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/login`
export const HUB_PATH = "/car-wash"
export const GUIDE_URL = "/car-wash/guide"
export const PRICES_PATH = "/car-wash/car-wash-price-list-philippines"
export const START_PATH = "/car-wash/how-to-start-a-car-wash-business-philippines"
export const NAV_LINKS = ["Features", "How it Works", "Pricing", "FAQ", "Guide"]

export const INK = "#161616"
export const BLUE = "#2f6bff"
export const AMBER = "#ff9e2c"
export const CREAM = "#fbf7f0"
export const MUTED = "#54514c"
export const FAINT = "#9a948b"
export const display = { fontFamily: "'Hanken Grotesk', system-ui, sans-serif" }

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

//////////////////////////////////////////////////////
// ANIMATION
//////////////////////////////////////////////////////
function useInView() {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    // Any part of the block on screen counts. A share-of-the-block threshold
    // (this used to be 15%) can never be met by a block taller than the screen
    // divided by that share, which left a long article invisible on phones.
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect() } },
      { threshold: 0, rootMargin: "0px 0px -40px 0px" }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return { ref, inView }
}

export function Animate({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, inView } = useInView()
  return (
    <div ref={ref} className={className} style={{
      transitionProperty: "opacity, transform", transitionDuration: "600ms",
      transitionTimingFunction: "cubic-bezier(0.4,0,0.2,1)", transitionDelay: `${delay}ms`,
      opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(28px)",
    }}>
      {children}
    </div>
  )
}

//////////////////////////////////////////////////////
// NAVBAR
//////////////////////////////////////////////////////
export function Navbar() {
  const [open, setOpen] = useState(false)
  useFont()
  const linkHref = (l: string) =>
    l === "Guide" ? GUIDE_URL : `${HUB_PATH}#${l.toLowerCase().replace(/\s+/g, "-")}`
  return (
    <nav className="fixed top-0 inset-x-0 z-50" style={{ background: CREAM, borderBottom: `2px solid ${INK}`, fontFamily: display.fontFamily }}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href={HUB_PATH} className="flex items-center gap-2.5">
          <img src="/logo.png" alt="Smapey Carwash" className="w-8 h-8 rounded-lg object-cover" />
          <span className="font-extrabold tracking-tight" style={{ color: INK }}>Smapey Carwash</span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (<a key={l} href={linkHref(l)} className="text-sm font-semibold hover:opacity-60 transition-opacity" style={{ color: INK }}>{l}</a>))}
        </div>
        <div className="hidden md:flex items-center gap-3">
          <a href={LOGIN_URL} className="text-sm font-semibold hover:opacity-60 transition-opacity px-2 py-2" style={{ color: INK }}>Sign in</a>
          <a href={REGISTER_URL} className="text-sm font-bold px-5 py-2.5 rounded-full border-2 transition-transform hover:-translate-y-0.5" style={{ ...display, background: AMBER, color: INK, borderColor: INK, boxShadow: `3px 3px 0 ${INK}` }}>Get started</a>
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden" style={{ color: INK }} aria-label={open ? "Close menu" : "Open menu"}>{open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}</button>
      </div>
      {open && (
        <div className="md:hidden px-6 py-4 flex flex-col gap-4" style={{ background: CREAM, borderTop: `2px solid ${INK}` }}>
          {NAV_LINKS.map((l) => (<a key={l} href={linkHref(l)} className="text-sm font-semibold" style={{ color: INK }}>{l}</a>))}
          <a href={REGISTER_URL} className="text-sm font-bold px-4 py-2.5 rounded-full border-2 text-center" style={{ ...display, background: AMBER, color: INK, borderColor: INK }}>Get started</a>
        </div>
      )}
    </nav>
  )
}

//////////////////////////////////////////////////////
// PRICING
//////////////////////////////////////////////////////
export function Pricing() {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null)
  const { plans, isPhilippines } = usePricing("CAR_WASH")
  const handleSelect = (p: Plan) => {
    if (p.planKey === "FREE") { window.location.assign(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=${p.product}&plan=FREE`); return }
    setSelectedPlan(p)
  }
  return (
    <section id="pricing" className="py-24" style={{ background: "#fff", fontFamily: display.fontFamily }}>
      <div className="max-w-6xl mx-auto px-6">
        <Animate className="text-center mb-16">
          <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: BLUE }}>Pricing</p>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight" style={{ color: INK }}>Simple, transparent pricing</h2>
          <p className="mt-4" style={{ color: MUTED }}>Start free. Upgrade when the cars outgrow it.</p>
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
                  <p className="text-sm mb-4" style={{ color: p.highlight ? "rgba(255,255,255,.7)" : FAINT }}>{p.desc}</p>
                  <div className="flex items-end gap-1 mb-6">
                    <span className="text-4xl font-extrabold tracking-tight" style={{ color: p.highlight ? "#fff" : INK }}>{displayPrice}</span>
                    <span className="text-sm mb-1" style={{ color: p.highlight ? "rgba(255,255,255,.6)" : FAINT }}>{p.period}</span>
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

//////////////////////////////////////////////////////
// CTA
//////////////////////////////////////////////////////
export function CTA({ title = "Ready to put every car on record?", subtitle = "Take your first car today. Free plan, no card, and the plate history starts building from the first wash." }: { title?: string; subtitle?: string }) {
  return (
    <section className="py-16 px-6" style={{ background: "#fff", fontFamily: display.fontFamily }}>
      <div className="max-w-6xl mx-auto">
        <div className="rounded-[28px] border-2 p-10 flex flex-col md:flex-row items-center justify-between gap-6" style={{ background: AMBER, borderColor: INK, boxShadow: `10px 10px 0 ${INK}` }}>
          <div>
            <h2 className="text-2xl font-extrabold mb-2" style={{ color: INK }}>{title}</h2>
            <p className="text-sm font-medium" style={{ color: "#5c4a28" }}>{subtitle}</p>
          </div>
          <a href={REGISTER_URL} className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm border-2 transition-transform hover:-translate-y-0.5 shrink-0" style={{ ...display, background: INK, color: "#fff", borderColor: INK }}>
            Get started for free <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  )
}

//////////////////////////////////////////////////////
// FOOTER
//////////////////////////////////////////////////////
export function Footer() {
  return (
    <footer className="px-6 py-8" style={{ background: CREAM, borderTop: `2px solid ${INK}`, fontFamily: display.fontFamily }}>
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Smapey Carwash" className="w-6 h-6 rounded-md object-cover" />
          <span className="text-sm font-extrabold" style={{ color: INK }}>Carwash by Smapey</span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-semibold">
          <a href={HUB_PATH} className="hover:opacity-60 transition-opacity" style={{ color: FAINT }}>Overview</a>
          <a href={GUIDE_URL} className="hover:opacity-60 transition-opacity" style={{ color: FAINT }}>Guide</a>
          <a href={PRICES_PATH} className="hover:opacity-60 transition-opacity" style={{ color: FAINT }}>Price list</a>
          <Link href="/" className="hover:opacity-60 transition-opacity" style={{ color: FAINT }}>Smapey Home</Link>
        </div>
        <p className="text-xs" style={{ color: FAINT }}>© {new Date().getFullYear()} Smapey. All rights reserved.</p>
      </div>
    </footer>
  )
}

//////////////////////////////////////////////////////
// SHARED SECTION HELPERS
//////////////////////////////////////////////////////
export function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: BLUE }}>{children}</p>
}

export function HeroShell({ children }: { children: React.ReactNode }) {
  return (
    <section className="relative overflow-hidden pt-16" style={{ background: CREAM, fontFamily: display.fontFamily }}>
      <div className="absolute inset-0 pointer-events-none hidden md:block" aria-hidden>
        <div className="absolute rounded-[22px] border-2" style={{ top: "26%", left: "-70px", width: 240, height: 70, background: AMBER, borderColor: INK, transform: "rotate(-9deg)" }} />
        <div className="absolute rounded-[22px] border-2" style={{ bottom: "16%", right: "-70px", width: 260, height: 74, background: BLUE, borderColor: INK, transform: "rotate(8deg)", boxShadow: "5px 5px 0 rgba(22,22,22,.12)" }} />
      </div>
      <div className="relative max-w-6xl mx-auto px-6 py-24 w-full">{children}</div>
    </section>
  )
}

export function HeroBadge({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border-2 text-xs font-bold mb-6" style={{ color: INK, borderColor: INK, boxShadow: `3px 3px 0 ${BLUE}` }}>
      <Bubbles className="w-3.5 h-3.5" style={{ color: BLUE }} />{children}
    </div>
  )
}

/**
 * Hero built around the counter, not a stock photo.
 *
 * The product's promise is that a returning car takes seconds: type the plate,
 * and its size and usual package come back, priced from the shop's own board.
 * So the card shows that happening. Prices match the typical board a new shop
 * starts with, so the example never disagrees with the price list guide.
 */
export function CounterHero({
  badge, title, subtitle, ctaNote,
}: {
  badge: string
  title: React.ReactNode
  subtitle: string
  ctaNote?: string
}) {
  const lines = [
    { name: "Wash & Vacuum", price: "₱160", on: true },
    { name: "Wax", price: "₱410", on: true },
    { name: "Engine Wash", price: "₱450", on: false },
  ]
  return (
    <section className="relative overflow-hidden pt-16" style={{ background: CREAM, fontFamily: display.fontFamily }}>
      {/* One shape, bled off the edge, so the card stays the thing worth looking at. */}
      <div className="absolute inset-0 pointer-events-none hidden lg:block" aria-hidden>
        <div className="absolute rounded-[26px] border-2" style={{ top: "18%", left: "-90px", width: 260, height: 78, background: AMBER, borderColor: INK, transform: "rotate(-8deg)" }} />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-20 lg:py-24 grid lg:grid-cols-[1.05fr_.95fr] gap-14 lg:gap-10 items-center">
        <div className="min-w-0">
          <HeroBadge>{badge}</HeroBadge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight mb-6" style={{ color: INK }}>
            {title}
          </h1>
          <p className="text-lg leading-relaxed mb-8 max-w-xl" style={{ color: MUTED }}>{subtitle}</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a href={REGISTER_URL} className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full font-bold border-2 transition-transform hover:-translate-y-0.5"
               style={{ ...display, background: AMBER, color: INK, borderColor: INK, boxShadow: `5px 5px 0 ${INK}` }}>
              Start free <ChevronRight className="w-4 h-4" />
            </a>
            <a href="#features" className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full font-bold border-2 bg-white transition-transform hover:-translate-y-0.5"
               style={{ ...display, color: INK, borderColor: INK }}>
              See what it does
            </a>
          </div>
          {ctaNote && <p className="mt-4 text-xs font-semibold" style={{ color: FAINT }}>{ctaNote}</p>}
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-semibold" style={{ color: MUTED }}>
            {["No credit card required", "Free plan forever", "Setup in 5 minutes"].map((t) => (
              <span key={t} className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />{t}</span>
            ))}
          </div>
        </div>

        {/* The counter */}
        <div className="relative min-w-0">
          <div className="rounded-[26px] border-2 bg-white overflow-hidden" style={{ borderColor: INK, boxShadow: `10px 10px 0 ${INK}` }}>
            <div className="px-5 py-4 border-b-2 flex items-center gap-3" style={{ borderColor: INK, background: CREAM }}>
              <Search className="w-4 h-4 shrink-0" style={{ color: FAINT }} />
              <span className="text-lg font-extrabold tracking-wider" style={{ color: INK }}>NBC 1234</span>
              <span className="ml-auto text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full border-2 whitespace-nowrap"
                    style={{ background: "#fff", color: INK, borderColor: INK }}>6th visit</span>
            </div>

            <div className="px-5 py-4 border-b-2" style={{ borderColor: "#eee7db" }}>
              <p className="font-extrabold" style={{ color: INK }}>Toyota Vios · Sedan / Hatchback</p>
              <p className="text-xs mt-0.5" style={{ color: FAINT }}>Usually Wash &amp; Vacuum · last visit 28 Sep</p>
            </div>

            <div className="px-5 pt-4 pb-2">
              <p className="text-[10px] font-bold uppercase tracking-widest mb-2.5" style={{ color: FAINT }}>From your price board</p>
              <div className="flex flex-wrap gap-2">
                {lines.map((l) => (
                  <span key={l.name} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border-2 text-sm font-bold"
                        style={l.on ? { background: BLUE, color: "#fff", borderColor: INK } : { background: "#fff", color: INK, borderColor: "#d8d2c6" }}>
                    {l.on && <Check className="w-3.5 h-3.5" />}{l.name} <span style={{ opacity: l.on ? 0.85 : 0.6 }}>{l.price}</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="px-5 py-3.5 flex items-center justify-between gap-3">
              <span className="text-sm font-semibold" style={{ color: MUTED }}>Washers: Ana, Ben</span>
              <span className="flex items-center gap-1" aria-label="4 of 5 stamps">
                {[0, 1, 2, 3, 4].map((i) => (
                  <span key={i} className="w-3.5 h-3.5 rounded-full border-2" style={{ borderColor: INK, background: i < 4 ? AMBER : "#fff" }} />
                ))}
              </span>
            </div>

            <div className="px-5 py-3 border-t-2 flex items-center justify-between gap-3" style={{ borderColor: INK, background: CREAM }}>
              <span className="text-xs font-semibold" style={{ color: MUTED }}>Priced from the board, not from memory</span>
              <span className="text-lg font-extrabold" style={{ color: INK }}>₱570</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

//////////////////////////////////////////////////////
// ARTICLE PRIMITIVES
//////////////////////////////////////////////////////
export function ArticleHero({ badge, title, intro }: { badge: string; title: React.ReactNode; intro: string }) {
  return (
    <HeroShell>
      <div className="max-w-3xl mx-auto text-center">
        <HeroBadge>{badge}</HeroBadge>
        <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight mb-6" style={{ color: INK }}>{title}</h1>
        <p className="text-lg leading-relaxed" style={{ color: MUTED }}>{intro}</p>
      </div>
    </HeroShell>
  )
}

export function AH2({ children, id }: { children: React.ReactNode; id?: string }) {
  return <h2 id={id} className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-14 mb-4 scroll-mt-24" style={{ color: INK }}>{children}</h2>
}

export function AH3({ children }: { children: React.ReactNode }) {
  return <h3 className="text-lg font-extrabold tracking-tight mt-8 mb-2" style={{ color: INK }}>{children}</h3>
}

export function AP({ children }: { children: React.ReactNode }) {
  return <p className="leading-relaxed my-4" style={{ color: MUTED }}>{children}</p>
}

export function Bullets({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="my-5 space-y-2.5">
      {items.map((t, i) => (
        <li key={i} className="flex gap-3" style={{ color: MUTED }}>
          <CheckCircle2 className="w-4 h-4 shrink-0 mt-1" style={{ color: BLUE }} />
          <span className="text-sm leading-relaxed">{t}</span>
        </li>
      ))}
    </ul>
  )
}

/**
 * Three or four answers above the body copy, for the reader deciding in a few
 * seconds whether this page has what they came for. Each entry is a fact
 * stated as an answer, not a label.
 */
export function KeyFacts({ items }: { items: { k: string; v: React.ReactNode }[] }) {
  return (
    <dl
      className="my-8 grid gap-px rounded-[16px] overflow-hidden border-2"
      style={{ borderColor: INK, background: INK, gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", boxShadow: `5px 5px 0 ${AMBER}` }}
    >
      {items.map((it, i) => (
        <div key={i} className="p-4" style={{ background: "#fff" }}>
          <dt className="text-[10px] font-extrabold uppercase tracking-widest mb-1.5" style={{ color: BLUE }}>{it.k}</dt>
          <dd className="m-0 text-sm font-semibold leading-snug" style={{ color: INK }}>{it.v}</dd>
        </div>
      ))}
    </dl>
  )
}

/**
 * Label and amount rows. On a phone the amount drops under its label rather
 * than squeezing the label into a narrow column, since ranges like
 * "₱302,400 – ₱453,600" can't wrap.
 */
export function CostTable({ rows, note, total }: { rows: [string, React.ReactNode][]; note?: string; total?: [string, React.ReactNode] }) {
  const line = "px-5 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-0.5 sm:gap-6"
  return (
    <div className="my-6 rounded-[16px] border-2 overflow-hidden" style={{ borderColor: INK, boxShadow: `5px 5px 0 ${BLUE}` }}>
      <dl className="m-0 text-sm">
        {rows.map(([label, value], i) => (
          <div key={i} className={line} style={{ background: i % 2 ? CREAM : "#fff" }}>
            <dt style={{ color: MUTED }}>{label}</dt>
            <dd className="m-0 font-extrabold tabular-nums sm:text-right sm:whitespace-nowrap" style={{ color: INK }}>{value}</dd>
          </div>
        ))}
        {total && (
          <div className={line} style={{ background: "#fff", borderTop: `2px solid ${INK}` }}>
            <dt className="font-extrabold" style={{ color: INK }}>{total[0]}</dt>
            <dd className="m-0 font-extrabold tabular-nums sm:text-right sm:whitespace-nowrap" style={{ color: INK }}>{total[1]}</dd>
          </div>
        )}
      </dl>
      {note && <p className="px-5 py-3 text-xs" style={{ color: FAINT, background: CREAM, borderTop: `2px solid ${INK}` }}>{note}</p>}
    </div>
  )
}

/**
 * A grid of prices by service and vehicle size, laid out the way a shop's own
 * board is. Scrolls sideways on a phone with the service column pinned, so a
 * row never loses its label.
 */
export function PriceGrid({ sizes, rows, note }: { sizes: string[]; rows: { name: string; prices: (string | null)[] }[]; note?: string }) {
  return (
    <div className="my-6 rounded-[16px] border-2 overflow-hidden" style={{ borderColor: INK, boxShadow: `5px 5px 0 ${BLUE}` }}>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr style={{ background: INK }}>
              <th className="sticky left-0 z-10 text-left px-4 py-3 font-bold text-white min-w-[140px]" style={{ background: INK }}>Service</th>
              {sizes.map((s) => (
                <th key={s} className="px-3 py-3 font-bold text-white text-center min-w-[96px] leading-tight">{s}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r.name} style={{ background: i % 2 ? CREAM : "#fff" }}>
                <th scope="row" className="sticky left-0 z-10 text-left px-4 py-3 font-bold" style={{ color: INK, background: i % 2 ? CREAM : "#fff" }}>{r.name}</th>
                {r.prices.map((p, j) => (
                  <td key={j} className="px-3 py-3 text-center font-extrabold whitespace-nowrap tabular-nums" style={{ color: p ? INK : "#c9c2b6" }}>{p ?? "—"}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {note && <p className="px-5 py-3 text-xs" style={{ color: FAINT, background: CREAM, borderTop: `2px solid ${INK}` }}>{note}</p>}
    </div>
  )
}

/**
 * Source attribution for a figure or requirement, so the reader can check it
 * themselves and tell a primary source from a dated secondary one.
 */
export function Cite({ children }: { children: React.ReactNode }) {
  return (
    <p className="my-4 text-xs leading-relaxed pl-4 py-1" style={{ color: "#8a857e", borderLeft: `3px solid ${AMBER}` }}>
      {children}
    </p>
  )
}

export function FAQList({ faqs }: { faqs: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <div className="flex flex-col gap-3 my-6">
      {faqs.map(({ q, a }, i) => (
        <div key={i} className="rounded-[16px] overflow-hidden border-2 bg-white" style={{ borderColor: INK }}>
          <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left font-bold text-sm" style={{ color: INK }} aria-expanded={open === i}>
            {q}
            <ChevronRight className="w-4 h-4 transition-transform duration-200 shrink-0" style={{ color: BLUE, transform: open === i ? "rotate(90deg)" : "rotate(0deg)" }} />
          </button>
          {open === i && <div className="px-5 pb-4 text-sm leading-relaxed pt-3" style={{ color: MUTED, borderTop: "1px solid rgba(22,22,22,.1)" }}>{a}</div>}
        </div>
      ))}
    </div>
  )
}

export function SoftwarePitch({
  title = "Run your shop with Smapey Carwash",
  body = "Every car goes on record by its plate and is priced from your own board. Each washer's share is worked out from the cars they washed, and at closing it tells you what the drawer should hold.",
  cta = "Start free",
}: { title?: string; body?: string; cta?: string }) {
  return (
    <div className="my-12 rounded-[24px] border-2 p-6 sm:p-8" style={{ background: CREAM, borderColor: INK, boxShadow: `8px 8px 0 ${BLUE}` }}>
      <div className="flex flex-col sm:flex-row items-start gap-4">
        <span className="w-12 h-12 rounded-[14px] border-2 flex items-center justify-center shrink-0" style={{ background: BLUE, borderColor: INK }}>
          <Bubbles className="w-6 h-6 text-white" />
        </span>
        <div>
          <h3 className="text-xl font-extrabold mb-2" style={{ color: INK }}>{title}</h3>
          <p className="text-sm leading-relaxed mb-4" style={{ color: MUTED }}>{body}</p>
          <a href={REGISTER_URL} className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm border-2 transition-transform hover:-translate-y-0.5" style={{ ...display, background: AMBER, color: INK, borderColor: INK }}>
            {cta} <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  )
}

//////////////////////////////////////////////////////
// PAYMENT MODAL
//////////////////////////////////////////////////////
type CheckoutMethod = "paypal" | "paymongo"
const Spinner = () => (
  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
  </svg>
)

export function PaymentModal({ plan, isPhilippines, onClose }: {
  plan: { name: string; phpPrice: string; usdPrice: string; period: string; planKey: string; product: string } | null
  isPhilippines: boolean; onClose: () => void
}) {
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
      const endpoint = token
        ? (method === "paypal" ? "/api/billing/subscribe/paypal" : "/api/billing/subscribe/paymongo")
        : (method === "paypal" ? "/api/billing/newaccount/paypal" : "/api/billing/newaccount/paymongo")
      const payload = token ? { product: plan.product, plan: plan.planKey } : { name, email, product: plan.product, plan: plan.planKey }
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
        method: "POST", headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || JSON.stringify(data))
      window.location.assign(data.approveUrl || data.checkoutUrl)
    } catch (err) { alert(err instanceof Error && err.message ? err.message : "Checkout failed") } finally { setLoading(null) }
  }
  const handleContinue = () => {
    if (!name.trim() || !email.trim()) { alert("Name and email are required"); return }
    if (!isPhilippines) checkout("paypal"); else setStep("payment")
  }
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" style={{ fontFamily: display.fontFamily }}>
      <div className="bg-white rounded-[22px] w-full max-w-md overflow-hidden border-2" style={{ borderColor: INK, boxShadow: `10px 10px 0 ${AMBER}` }}>
        <div className="px-6 py-5 flex items-center justify-between" style={{ background: INK }}>
          <div className="flex items-center gap-3">
            {step === "payment" && !token && (
              <button onClick={() => setStep("details")} className="text-white/70 hover:text-white transition" aria-label="Back">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
              </button>
            )}
            <div>
              <h2 className="text-white font-extrabold text-lg">{step === "details" ? "Create your account" : "Choose payment method"}</h2>
              <p className="text-sm mt-0.5" style={{ color: "rgba(255,255,255,.7)" }}>{plan.name} plan, <span className="font-bold" style={{ color: AMBER }}>{displayPrice}</span>{plan.period}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-white/70 hover:text-white transition-colors" aria-label="Close"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-6 flex flex-col gap-4">
          {step === "details" && (
            <>
              <input placeholder="Full name" value={name} onChange={e => setName(e.target.value)} className="w-full border-2 rounded-xl px-4 py-2.5 text-sm focus:outline-none" style={inputStyle} />
              <input type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} className="w-full border-2 rounded-xl px-4 py-2.5 text-sm focus:outline-none" style={inputStyle} />
              <button onClick={handleContinue} disabled={loading !== null} className="w-full py-3 rounded-full border-2 font-bold text-sm flex items-center justify-center gap-2 transition-transform hover:-translate-y-0.5 disabled:opacity-60" style={{ ...display, background: AMBER, color: INK, borderColor: INK }}>
                {loading ? <><Spinner /> Redirecting…</> : <>Continue <ChevronRight className="w-4 h-4" /></>}
              </button>
            </>
          )}
          {step === "payment" && (
            <>
              {isPhilippines && (
                <button onClick={() => checkout("paymongo")} disabled={loading !== null} className="w-full flex items-center gap-4 px-5 py-4 border-2 rounded-2xl transition-all group" style={{ borderColor: INK }}>
                  <div className="w-10 h-10 rounded-xl bg-green-600 flex items-center justify-center shrink-0"><svg viewBox="0 0 24 24" className="w-5 h-5 fill-white"><path d="M3 3h7v7H3zm0 11h7v7H3zm11-11h7v7h-7zm0 11h7v7h-7z"/></svg></div>
                  <div className="flex-1 text-left"><p className="text-sm font-bold" style={{ color: INK }}>QR Ph / GCash / Card</p><p className="text-xs" style={{ color: FAINT }}>Philippine payment methods</p></div>
                  {loading === "paymongo" ? <Spinner /> : <ChevronRight className="w-4 h-4" style={{ color: INK }} />}
                </button>
              )}
              <button onClick={() => checkout("paypal")} disabled={loading !== null} className="w-full flex items-center gap-4 px-5 py-4 border-2 rounded-2xl transition-all group" style={{ borderColor: INK }}>
                <div className="w-10 h-10 rounded-xl bg-[#003087] flex items-center justify-center shrink-0"><svg viewBox="0 0 24 24" className="w-5 h-5 fill-white"><path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c1.379 8.883-5.43 11.61-10.377 11.61H8.23l-1.133 7.184h3.78c.458 0 .848-.332.92-.783l.038-.196.728-4.617.047-.252a.93.93 0 0 1 .919-.784h.578c3.746 0 6.678-1.522 7.534-5.927.358-1.833.173-3.363-.42-4.494z"/></svg></div>
                <div className="flex-1 text-left"><p className="text-sm font-bold" style={{ color: INK }}>PayPal</p><p className="text-xs" style={{ color: FAINT }}>Pay with your PayPal account</p></div>
                {loading === "paypal" ? <Spinner /> : <ChevronRight className="w-4 h-4" style={{ color: INK }} />}
              </button>
            </>
          )}
          <p className="text-center text-xs flex items-center justify-center gap-1" style={{ color: FAINT }}>
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
            Secure checkout · Cancel anytime · No hidden fees
          </p>
        </div>
      </div>
    </div>
  )
}

//////////////////////////////////////////////////////
// TYPICAL PRICES
//////////////////////////////////////////////////////

/**
 * The typical Philippine board a new Smapey Carwash shop starts with, exactly
 * as seeded by the app (src/modules/car-wash/car-wash.catalog.ts in the API).
 * The price list guide and the hero both read from here, so a shop that signs
 * up after reading the guide sees the same numbers on its own board.
 *
 * Averages of published counter-carwash price lists, searched 4-5 October
 * 2026. The sources and the working are cited where the table is shown.
 */
export const TYPICAL_SIZES = ["Sedan / Hatchback", "SUV / AUV / MPV", "Pick-up", "Van", "Motorcycle", "Big bike"]

export const TYPICAL_ROWS: { name: string; prices: (string | null)[] }[] = [
  { name: "Wash",                    prices: ["₱130", "₱160", "₱190", "₱230", "₱110", "₱110"] },
  { name: "Wash & Vacuum",           prices: ["₱160", "₱190", "₱220", "₱260", null, null] },
  { name: "Wax",                     prices: ["₱410", "₱490", "₱590", "₱820", null, null] },
  { name: "Engine Wash",             prices: ["₱450", "₱500", "₱550", "₱600", null, null] },
  { name: "Interior Detailing",      prices: ["₱3,000", "₱3,800", "₱4,100", "₱4,700", null, null] },
  { name: "Glass Watermark Removal", prices: ["₱1,200", "₱1,400", "₱1,600", "₱1,800", null, null] },
]
