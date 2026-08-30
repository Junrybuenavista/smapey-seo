"use client"

/**
 * Shared chrome + article primitives for the /laundry cluster.
 *
 * Adapted from app/water-refilling/_shared.tsx, which is the same shape. The
 * two are near-identical apart from branding; if a third cluster needs these,
 * lift AH2/AP/Bullets/CostTable/Cite/FAQList into a shared article module
 * rather than copying a third time.
 */

import { useState, useEffect, useRef } from "react"
import { CheckCircle2, ChevronRight, Menu, X, Zap, Shirt } from "lucide-react"
import { usePricing, type Plan } from "@/lib/usePricing"

//////////////////////////////////////////////////////
// CONFIG + LAYERED POP TOKENS
//////////////////////////////////////////////////////
export const REGISTER_URL = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=LAUNDRY&plan=FREE`
export const LOGIN_URL = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/login`
export const NAV_LINKS = ["Features", "How it Works", "Pricing", "FAQ", "Guide"]

const INK = "#161616"
const BLUE = "#2f6bff"
const AMBER = "#ff9e2c"
const CREAM = "#fbf7f0"
const display = { fontFamily: "'Hanken Grotesk', system-ui, sans-serif" }

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
function useInView(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect() } },
      { threshold: 0.15, ...options }
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
    l === "Guide" ? "/laundry/guide" : `/laundry#${l.toLowerCase().replace(/\s+/g, "-")}`
  return (
    <nav className="fixed top-0 inset-x-0 z-50" style={{ background: CREAM, borderBottom: `2px solid ${INK}`, fontFamily: display.fontFamily }}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/laundry" className="flex items-center gap-2.5">
          <img src="/logo.png" alt="Smapey LaundryOS" className="w-8 h-8 rounded-lg object-cover" />
          <span className="font-extrabold tracking-tight" style={{ color: INK }}>Smapey LaundryOS</span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (<a key={l} href={linkHref(l)} className="text-sm font-semibold hover:opacity-60 transition-opacity" style={{ color: INK }}>{l}</a>))}
        </div>
        <div className="hidden md:flex items-center gap-3">
          <a href={LOGIN_URL} className="text-sm font-semibold hover:opacity-60 transition-opacity px-2 py-2" style={{ color: INK }}>Sign in</a>
          <a href={REGISTER_URL} className="text-sm font-bold px-5 py-2.5 rounded-full border-2 transition-transform hover:-translate-y-0.5" style={{ ...display, background: AMBER, color: INK, borderColor: INK, boxShadow: `3px 3px 0 ${INK}` }}>Get started</a>
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden" style={{ color: INK }}>{open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}</button>
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
  const { plans, isPhilippines } = usePricing("LAUNDRY")
  const handleSelect = (p: Plan) => {
    if (p.planKey === "FREE") { window.location.href = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=${p.product}&plan=FREE`; return }
    setSelectedPlan(p)
  }
  return (
    <section id="pricing" className="py-24" style={{ background: "#fff", fontFamily: display.fontFamily }}>
      <div className="max-w-6xl mx-auto px-6">
        <Animate className="text-center mb-16">
          <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: BLUE }}>Pricing</p>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight" style={{ color: INK }}>Simple, transparent pricing</h2>
          <p className="mt-4" style={{ color: "#54514c" }}>Start free. Upgrade as your shop grows.</p>
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

//////////////////////////////////////////////////////
// CTA
//////////////////////////////////////////////////////
export function CTA({ title = "Ready to run your shop smarter?", subtitle = "Join laundry shop owners who use Smapey to track every order, claim stub, and payment - without a notebook or a whiteboard." }: { title?: string; subtitle?: string }) {
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
          <img src="/logo.png" alt="Smapey LaundryOS" className="w-6 h-6 rounded-md object-cover" />
          <span className="text-sm font-extrabold" style={{ color: INK }}>Laundry Shop by Smapey</span>
        </div>
        <div className="flex items-center gap-5 text-xs font-semibold">
          <a href="/laundry" className="hover:opacity-60 transition-opacity" style={{ color: "#9a948b" }}>Overview</a>
          <a href="/laundry/guide" className="hover:opacity-60 transition-opacity" style={{ color: "#9a948b" }}>Guide</a>
          <a href="/" className="hover:opacity-60 transition-opacity" style={{ color: "#9a948b" }}>Smapey Home</a>
        </div>
        <p className="text-xs" style={{ color: "#9a948b" }}>© {new Date().getFullYear()} Smapey. All rights reserved.</p>
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

export function TrustRow({ items = ["No credit card required", "Free plan forever", "Setup in 5 minutes"] }: { items?: string[] }) {
  return (
    <div className="mt-16 flex flex-wrap items-center justify-center gap-6 text-xs font-semibold" style={{ color: "#54514c" }}>
      {items.map((t) => (
        <span key={t} className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />{t}</span>
      ))}
    </div>
  )
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
      <Shirt className="w-3.5 h-3.5" style={{ color: BLUE }} />{children}
    </div>
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
        <p className="text-lg leading-relaxed" style={{ color: "#54514c" }}>{intro}</p>
      </div>
    </HeroShell>
  )
}

/**
 * The handful of facts a reader wants before deciding to read anything.
 *
 * Borrowed from the way job boards front-load type, salary and location above
 * the body copy: someone landing here is deciding in about three seconds
 * whether this page answers their question, and a wall of prose makes them
 * guess. Each entry is one fact, stated as an answer rather than a label.
 *
 * Keep it to three or four. This is a summary, not a specification table - the
 * moment it grows past a glance it stops doing the job it exists for.
 */
export function KeyFacts({ items }: { items: { k: string; v: React.ReactNode }[] }) {
  return (
    <dl
      className="my-8 grid gap-px rounded-[16px] overflow-hidden border-2"
      style={{
        borderColor: INK,
        background: INK,
        gridTemplateColumns: `repeat(auto-fit, minmax(150px, 1fr))`,
        boxShadow: `5px 5px 0 ${AMBER}`,
      }}
    >
      {items.map((it, i) => (
        <div key={i} className="p-4" style={{ background: "#fff" }}>
          <dt
            className="text-[10px] font-extrabold uppercase tracking-widest mb-1.5"
            style={{ color: BLUE }}
          >
            {it.k}
          </dt>
          <dd className="m-0 text-sm font-semibold leading-snug" style={{ color: INK }}>
            {it.v}
          </dd>
        </div>
      ))}
    </dl>
  )
}

export function AH2({ children }: { children: React.ReactNode }) {
  return <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-14 mb-4" style={{ color: INK }}>{children}</h2>
}

export function AP({ children }: { children: React.ReactNode }) {
  return <p className="leading-relaxed my-4" style={{ color: "#54514c" }}>{children}</p>
}

export function Bullets({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="my-5 space-y-2.5">
      {items.map((t, i) => (
        <li key={i} className="flex gap-3" style={{ color: "#54514c" }}>
          <CheckCircle2 className="w-4 h-4 shrink-0 mt-1" style={{ color: BLUE }} />
          <span className="text-sm leading-relaxed">{t}</span>
        </li>
      ))}
    </ul>
  )
}

export function CostTable({ rows, note }: { rows: [string, React.ReactNode][]; note?: string }) {
  return (
    <div className="my-6 rounded-[16px] border-2 overflow-hidden" style={{ borderColor: INK, boxShadow: `5px 5px 0 ${BLUE}` }}>
      <table className="w-full text-sm">
        <tbody>
          {rows.map(([label, value], i) => (
            <tr key={i} style={{ background: i % 2 ? CREAM : "#fff" }}>
              <td className="px-5 py-3" style={{ color: "#54514c" }}>{label}</td>
              <td className="px-5 py-3 text-right font-extrabold whitespace-nowrap" style={{ color: INK }}>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {note && <p className="px-5 py-3 text-xs" style={{ color: "#9a948b", background: CREAM, borderTop: `2px solid ${INK}` }}>{note}</p>}
    </div>
  )
}

/**
 * Source attribution for a figure or requirement. Used where a page states a
 * regulatory rule or a peso figure, so the reader can check it themselves and
 * we can tell primary sources from dated secondary ones.
 */
export function Cite({ children }: { children: React.ReactNode }) {
  return (
    <p className="my-4 text-xs leading-relaxed pl-4 py-1" style={{ color: "#8a857e", borderLeft: `3px solid ${AMBER}` }}>
      {children}
    </p>
  )
}

/**
 * A figure this page needs but nobody has sourced yet.
 *
 * The standing rule on this site is that a peso figure is either sourced and
 * dated or it does not appear - inventing one is worse than omitting it,
 * because a reader budgets against it. So a draft states the shape of the
 * number and marks the hole, rather than filling it with something plausible.
 *
 * Every page containing one of these must be noIndex. scripts/check-drafts.mjs
 * enforces that and fails the build if a marked page is indexable, so a draft
 * cannot reach Google by being forgotten about.
 */
export function NeedsFigure({ children }: { children: React.ReactNode }) {
  return (
    <mark
      data-needs-figure
      className="px-2 py-0.5 rounded font-bold text-xs"
      style={{ background: "#ffe8c2", color: "#8a5200", border: `1px dashed ${AMBER}` }}
    >
      FIGURE NEEDED — {children}
    </mark>
  )
}

/** Banner for a page that is still a draft, so nobody mistakes it for live copy. */
export function DraftNotice({ needs }: { needs: string[] }) {
  return (
    <div
      className="my-8 rounded-[16px] border-2 p-6"
      style={{ borderColor: "#8a5200", background: "#fff8ec" }}
      data-draft-notice
    >
      <p className="font-extrabold text-sm mb-2" style={{ color: "#8a5200" }}>
        Draft - not indexed, not linked
      </p>
      <p className="text-sm leading-relaxed mb-3" style={{ color: "#54514c" }}>
        Everything below is written except the figures listed here. Supply these
        with a source and a date and the page is ready to publish.
      </p>
      <ul className="text-sm list-disc pl-5" style={{ color: "#54514c" }}>
        {needs.map((n, i) => (
          <li key={i} className="mb-1">{n}</li>
        ))}
      </ul>
    </div>
  )
}

export function FAQList({ faqs }: { faqs: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <div className="flex flex-col gap-3 my-6">
      {faqs.map(({ q, a }, i) => (
        <div key={i} className="rounded-[16px] overflow-hidden border-2 bg-white" style={{ borderColor: INK }}>
          <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between px-5 py-4 text-left font-bold text-sm" style={{ color: INK }}>
            {q}
            <ChevronRight className="w-4 h-4 transition-transform duration-200 shrink-0" style={{ color: BLUE, transform: open === i ? "rotate(90deg)" : "rotate(0deg)" }} />
          </button>
          {open === i && <div className="px-5 pb-4 text-sm leading-relaxed pt-3" style={{ color: "#54514c", borderTop: "1px solid rgba(22,22,22,.1)" }}>{a}</div>}
        </div>
      ))}
    </div>
  )
}

export function SoftwarePitch() {
  return (
    <div className="my-12 rounded-[24px] border-2 p-8" style={{ background: CREAM, borderColor: INK, boxShadow: `8px 8px 0 ${BLUE}` }}>
      <div className="flex items-start gap-4">
        <span className="w-12 h-12 rounded-[14px] border-2 flex items-center justify-center shrink-0" style={{ background: BLUE, borderColor: INK }}>
          <Shirt className="w-6 h-6 text-white" />
        </span>
        <div>
          <h3 className="text-xl font-extrabold mb-2" style={{ color: INK }}>Run your shop with Smapey LaundryOS</h3>
          <p className="text-sm leading-relaxed mb-4" style={{ color: "#54514c" }}>
            A business plan gets you started, software keeps you running. Smapey tracks every delivery order, container
            deposit, inventory level, and payment so you always know your stock, your bottles, and who still owes you.
          </p>
          <a href={REGISTER_URL} className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm border-2 transition-transform hover:-translate-y-0.5" style={{ ...display, background: AMBER, color: INK, borderColor: INK }}>
            Start free <ChevronRight className="w-4 h-4" />
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
      window.location.href = data.approveUrl || data.checkoutUrl
    } catch (err: any) { alert(err?.message || "Checkout failed") } finally { setLoading(null) }
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
              <button onClick={() => setStep("details")} className="text-white/70 hover:text-white transition">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
              </button>
            )}
            <div>
              <h2 className="text-white font-extrabold text-lg">{step === "details" ? "Create your account" : "Choose payment method"}</h2>
              <p className="text-sm mt-0.5" style={{ color: "rgba(255,255,255,.7)" }}>{plan.name} plan, <span className="font-bold" style={{ color: AMBER }}>{displayPrice}</span>{plan.period}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-white/70 hover:text-white transition-colors"><X className="w-5 h-5" /></button>
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
                  <div className="flex-1 text-left"><p className="text-sm font-bold" style={{ color: INK }}>QR Ph / GCash / Card</p><p className="text-xs" style={{ color: "#9a948b" }}>Philippine payment methods</p></div>
                  {loading === "paymongo" ? <Spinner /> : <ChevronRight className="w-4 h-4" style={{ color: INK }} />}
                </button>
              )}
              <button onClick={() => checkout("paypal")} disabled={loading !== null} className="w-full flex items-center gap-4 px-5 py-4 border-2 rounded-2xl transition-all group" style={{ borderColor: INK }}>
                <div className="w-10 h-10 rounded-xl bg-[#003087] flex items-center justify-center shrink-0"><svg viewBox="0 0 24 24" className="w-5 h-5 fill-white"><path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c1.379 8.883-5.43 11.61-10.377 11.61H8.23l-1.133 7.184h3.78c.458 0 .848-.332.92-.783l.038-.196.728-4.617.047-.252a.93.93 0 0 1 .919-.784h.578c3.746 0 6.678-1.522 7.534-5.927.358-1.833.173-3.363-.42-4.494z"/></svg></div>
                <div className="flex-1 text-left"><p className="text-sm font-bold" style={{ color: INK }}>PayPal</p><p className="text-xs" style={{ color: "#9a948b" }}>Pay with your PayPal account</p></div>
                {loading === "paypal" ? <Spinner /> : <ChevronRight className="w-4 h-4" style={{ color: INK }} />}
              </button>
            </>
          )}
          <p className="text-center text-xs flex items-center justify-center gap-1" style={{ color: "#9a948b" }}>
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
            Secure checkout · Cancel anytime · No hidden fees
          </p>
        </div>
      </div>
    </div>
  )
}
