"use client"

import { useState, useEffect, useRef } from "react"
import { CheckCircle2, Users, HandCoins, CalendarRange, Wallet, AlertTriangle, BarChart3, ChevronRight, Menu, X, ArrowLeft, BookOpen } from "lucide-react"
import InternalLinks from "@/components/InternalLinks"

const INK = "#161616"
const BLUE = "#2f6bff"
const AMBER = "#ff9e2c"
const CREAM = "#fbf7f0"
const display = { fontFamily: "'Hanken Grotesk', system-ui, sans-serif" }
const REGISTER_URL = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=LENDING&plan=FREE`

const SECTIONS = [
  {
    icon: Users,
    title: "1. Add your borrowers",
    body: [
      "Open Borrowers in the dashboard and click Add Borrower. Fill in the full name, phone number, email, address, and any ID or reference details you want on record.",
      "Borrower profiles are reusable, you create them once and attach them to any number of loans. Each profile keeps a running history of every loan and payment.",
      "The dashboard automatically tracks each borrower's total borrowed, outstanding balance, and active loan count, so you can see their standing at a glance before issuing a new loan.",
    ],
  },
  {
    icon: HandCoins,
    title: "2. Issue a loan",
    body: [
      "Open Loans and click New Loan. Select a borrower, then set the principal amount, interest rate, term (number of installments), and the disbursement date.",
      "Choose the repayment frequency (weekly, bi-weekly, or monthly) and the system computes the installment amount and total repayable for you.",
      "Add notes for your records (purpose of the loan, collateral, guarantor) and save. The loan is created with an Active status and linked to the borrower's profile.",
    ],
  },
  {
    icon: CalendarRange,
    title: "3. Review the amortization schedule",
    body: [
      "The moment a loan is created, a full amortization schedule is generated, every due date and installment amount laid out from the first payment to the last.",
      "Each scheduled installment shows the amount due and its status, so you and the borrower both know exactly what is owed and when.",
      "No manual computation, no spreadsheets, the schedule recalculates automatically based on the principal, interest rate, and term you entered.",
    ],
  },
  {
    icon: Wallet,
    title: "4. Record payments",
    body: [
      "When a borrower pays, open the loan and click Record Payment. Enter the amount and choose the method, Cash, GCash, or Bank Transfer.",
      "Partial payments are fully supported. The loan's outstanding balance drops immediately and the relevant installments are marked as paid.",
      "Every payment is timestamped and kept in the loan's history, giving you a clear, auditable record of what each borrower has settled.",
    ],
  },
  {
    icon: AlertTriangle,
    title: "5. Track overdue loans and collections",
    body: [
      "Loans with a missed due date are flagged as overdue automatically. The dashboard shows who is late, how much they owe, and how many days past due.",
      "Filter your loan list by overdue status to build a daily collections worklist, then follow up by phone or message before the debt ages further.",
      "Mark a loan as Defaulted when it can no longer be collected, it stays in history and is reflected in your default-rate analytics.",
    ],
  },
  {
    icon: BarChart3,
    title: "6. Monitor your lending analytics",
    body: [
      "The Analytics dashboard shows monthly collections, total outstanding balance, repayment rate, and default rate, all updated in real time.",
      "A 6-month Collections vs. Disbursed chart shows cash collected against money lent out, so you can see whether your loan book is growing healthily.",
      "The loan portfolio breakdown splits your loans into Active, Fully Paid, and Defaulted, giving you an instant read on the health of your lending business.",
    ],
  },
]

function useFont() {
  useEffect(() => {
    const id = "smapey-pop-fonts"
    if (!document.getElementById(id)) {
      const l = document.createElement("link")
      l.id = id; l.rel = "stylesheet"
      l.href = "https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600;700;800&display=swap"
      document.head.appendChild(l)
    }
  }, [])
}

function useInView() {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect() } }, { threshold: 0.15 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return { ref, inView }
}

function Animate({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, inView } = useInView()
  return (
    <div ref={ref} className={className} style={{ transitionProperty: "opacity, transform", transitionDuration: "600ms", transitionTimingFunction: "cubic-bezier(0.4,0,0.2,1)", transitionDelay: `${delay}ms`, opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(28px)" }}>
      {children}
    </div>
  )
}

function Navbar() {
  const [open, setOpen] = useState(false)
  const links = [
    { href: "/lending#features", label: "Features" },
    { href: "/lending#how-it-works", label: "How it Works" },
    { href: "/lending#pricing", label: "Pricing" },
    { href: "/lending#faq", label: "FAQ" },
    { href: "/lending/guide", label: "Guide" },
  ]
  return (
    <nav className="fixed top-0 inset-x-0 z-50" style={{ background: CREAM, borderBottom: `2px solid ${INK}`, fontFamily: display.fontFamily }}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/lending" className="flex items-center gap-2.5">
          <img src="/logo.png" alt="Smapey" className="w-8 h-8 rounded-lg object-cover" />
          <span className="font-extrabold tracking-tight" style={{ color: INK }}>Smapey Lending</span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (<a key={l.label} href={l.href} className="text-sm font-semibold hover:opacity-60 transition-opacity" style={{ color: INK }}>{l.label}</a>))}
        </div>
        <div className="hidden md:flex items-center gap-3">
          <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/login`} className="text-sm font-semibold hover:opacity-60 transition-opacity px-2 py-2" style={{ color: INK }}>Sign in</a>
          <a href={REGISTER_URL} className="text-sm font-bold px-5 py-2.5 rounded-full border-2 transition-transform hover:-translate-y-0.5" style={{ ...display, background: AMBER, color: INK, borderColor: INK, boxShadow: `3px 3px 0 ${INK}` }}>Get started</a>
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden" style={{ color: INK }}>{open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}</button>
      </div>
      {open && (
        <div className="md:hidden px-6 py-4 flex flex-col gap-4" style={{ background: CREAM, borderTop: `2px solid ${INK}` }}>
          {links.map((l) => (<a key={l.label} href={l.href} className="text-sm font-semibold" style={{ color: INK }}>{l.label}</a>))}
          <a href={REGISTER_URL} className="text-sm font-bold px-4 py-2.5 rounded-full border-2 text-center" style={{ ...display, background: AMBER, color: INK, borderColor: INK }}>Get started</a>
        </div>
      )}
    </nav>
  )
}

export default function GuideContent() {
  useFont()
  return (
    <main style={{ fontFamily: display.fontFamily }}>
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden pt-16" style={{ background: CREAM }}>
        <div className="absolute inset-0 pointer-events-none hidden md:block" aria-hidden>
          <div className="absolute rounded-[22px] border-2" style={{ top: "28%", right: "-70px", width: 280, height: 78, background: BLUE, borderColor: INK, transform: "rotate(8deg)", boxShadow: "5px 5px 0 rgba(22,22,22,.12)" }} />
        </div>
        <div className="relative max-w-3xl mx-auto px-6 pt-12 pb-14 text-center">
          <a href="/lending" className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors mb-8 hover:opacity-60" style={{ color: "#54514c" }}>
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Lending
          </a>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border-2 text-xs font-bold mb-5" style={{ color: INK, borderColor: INK, boxShadow: `3px 3px 0 ${BLUE}` }}>
            <BookOpen className="w-3 h-3" /> User Guide
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4" style={{ color: INK }}>
            How to run your lending business with Smapey
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: "#54514c" }}>
            A step-by-step walkthrough covering borrowers, loan issuance, amortization schedules, payment tracking, collections, and lending analytics.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-semibold mt-8" style={{ color: "#54514c" }}>
            {["5-minute setup", "No training required", "Free plan available"].map((t) => (
              <span key={t} className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />{t}</span>
            ))}
          </div>
        </div>
      </section>
      {/* JUMP TO SECTION */}
      <section className="py-8" style={{ background: CREAM, borderTop: `2px solid ${INK}`, borderBottom: `2px solid ${INK}` }}>
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#9a948b" }}>Jump to section</p>
          <div className="flex flex-wrap gap-2.5">
            {SECTIONS.map(({ icon: Icon, title }, i) => {
              const c = i % 2 === 0 ? BLUE : AMBER
              return (
                <a key={i} href={`#s${i}`} className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white border-2 text-xs font-bold transition-transform hover:-translate-y-0.5" style={{ color: INK, borderColor: INK }}>
                  <span className="w-4 h-4 rounded-[5px] border flex items-center justify-center" style={{ background: c, borderColor: INK }}>
                    <Icon className="w-2.5 h-2.5" style={{ color: c === AMBER ? INK : "#fff" }} />
                  </span>
                  {title.replace(/^\d+\.\s*/, "")}
                </a>
              )
            })}
          </div>
        </div>
      </section>


      {/* SECTIONS */}
      <section className="py-16" style={{ background: CREAM }}>
        <div className="max-w-3xl mx-auto px-6 space-y-12">
          {SECTIONS.map(({ icon: Icon, title, body }, idx) => {
            const c = idx % 2 === 0 ? BLUE : AMBER
            return (
              <Animate key={title}>
                <div id={`s${idx}`} className="rounded-[20px] border-2 overflow-hidden scroll-mt-24" style={{ background: "#fff", borderColor: INK, boxShadow: `6px 6px 0 ${c}` }}>
                  <div className="flex items-center gap-4 px-6 py-5" style={{ borderBottom: `2px solid ${INK}`, background: CREAM }}>
                    <div className="w-10 h-10 rounded-[12px] border-2 flex items-center justify-center shrink-0" style={{ background: c, borderColor: INK }}>
                      <Icon className="w-5 h-5" style={{ color: c === AMBER ? INK : "#fff" }} />
                    </div>
                    <h2 className="text-lg font-extrabold" style={{ color: INK }}>{title}</h2>
                  </div>
                  <ul className="px-6 py-5 space-y-3">
                    {body.map((line, i) => (
                      <li key={i} className="flex gap-3 text-sm leading-relaxed" style={{ color: "#54514c" }}>
                        <span className="w-1.5 h-1.5 rounded-full shrink-0 mt-2" style={{ background: c }} />
                        {line}
                      </li>
                    ))}
                  </ul>
                </div>
              </Animate>
            )
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6" style={{ background: "#fff" }}>
        <div className="max-w-6xl mx-auto">
          <div className="rounded-[28px] border-2 p-10 flex flex-col md:flex-row items-center justify-between gap-6" style={{ background: AMBER, borderColor: INK, boxShadow: `10px 10px 0 ${INK}` }}>
            <div>
              <h3 className="text-2xl font-extrabold mb-2" style={{ color: INK }}>Ready to get started?</h3>
              <p className="text-sm font-medium" style={{ color: "#5c4a28" }}>Free plan, 20 borrowers, 30 active loans. No credit card required.</p>
            </div>
            <a href={REGISTER_URL} className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm border-2 transition-transform hover:-translate-y-0.5 shrink-0" style={{ ...display, background: INK, color: "#fff", borderColor: INK }}>
              Start free <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      <InternalLinks cluster="lending" currentPath="/lending/guide" />

      <footer className="px-6 py-8" style={{ background: CREAM, borderTop: `2px solid ${INK}` }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Smapey" className="w-6 h-6 rounded-md object-cover" />
            <span className="text-sm font-extrabold" style={{ color: INK }}>Lending by Smapey</span>
          </div>
          <p className="text-xs" style={{ color: "#9a948b" }}>© {new Date().getFullYear()} Smapey. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}
