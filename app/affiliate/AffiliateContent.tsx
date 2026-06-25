"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import {
  Share2, Users, BadgeCheck, HandCoins, Repeat, ShieldCheck, Banknote,
  Megaphone, Clock, Sparkles, Plus, Minus, ChevronDown, ChevronRight,
} from "lucide-react"
import SiteNavbar from "@/components/SiteNavbar"

const APP = "https://app.smapey.com"

// Public summary of the live affiliate config (GET /api/affiliate/program).
interface Program {
  enabled: boolean
  commission: {
    type: "percentage" | "flat"
    rate: number
    recurrence: "first_payment" | "recurring" | "first_n_months"
    recurringMonths: number
    currency: string
  }
  payout: { minThreshold: number }
  whoCanJoin: "anyone" | "existing_customers" | "invite_only"
}

const FALLBACK: Program = {
  enabled: true,
  commission: { type: "percentage", rate: 20, recurrence: "first_n_months", recurringMonths: 12, currency: "PHP" },
  payout: { minThreshold: 1000 },
  whoCanJoin: "existing_customers",
}

const SYMBOLS: Record<string, string> = { PHP: "₱", USD: "$", EUR: "€" }

const money = (currency: string, amount: number) =>
  `${SYMBOLS[currency] ?? ""}${amount.toLocaleString(undefined, { maximumFractionDigits: 0 })}`

const commissionHeadline = (p: Program) => {
  const { type, rate, recurrence, recurringMonths, currency } = p.commission
  const value = type === "percentage" ? `${rate}%` : money(currency, rate)
  if (type === "flat") return recurrence === "recurring" ? `${value} every month` : `${value} per paying signup`
  if (recurrence === "first_payment") return `${value} of the first payment`
  if (recurrence === "recurring") return `${value} of every payment, for life`
  return `${value} of every payment for ${recurringMonths} months`
}

// ── Design tokens ──────────────────────────────────────────────────────────
const INK = "#161616"
const BLUE = "#2f6bff"
const AMBER = "#ff9e2c"
const CREAM = "#fbf7f0"
const display = { fontFamily: "'Hanken Grotesk', system-ui, sans-serif" }

export default function AffiliateContent() {
  const [program, setProgram] = useState<Program>(FALLBACK)

  // Load the display + body fonts (no-op if already present).
  useEffect(() => {
    const id = "smapey-affiliate-fonts"
    if (!document.getElementById(id)) {
      const l = document.createElement("link")
      l.id = id
      l.rel = "stylesheet"
      l.href =
        "https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600;700;800&display=swap"
      document.head.appendChild(l)
    }
  }, [])

  useEffect(() => {
    const base = process.env.NEXT_PUBLIC_API_URL ?? ""
    fetch(`${base}/api/affiliate/program`)
      .then((r) => r.json())
      .then((data) => { if (data && typeof data.enabled === "boolean") setProgram(data) })
      .catch(() => {})
  }, [])

  const { currency } = program.commission

  const months =
    program.commission.recurrence === "first_payment" ? 1
    : program.commission.recurrence === "first_n_months" ? program.commission.recurringMonths
    : 12

  const rateLabel =
    program.commission.type === "percentage" ? `${program.commission.rate}%` : money(currency, program.commission.rate)

  const durationLabel =
    program.commission.recurrence === "recurring" ? "for life"
    : program.commission.recurrence === "first_n_months" ? `for ${program.commission.recurringMonths} months`
    : "first payment"

  const stats = [
    { value: rateLabel, sub: program.commission.type === "flat" ? "Per paying signup" : "Of every payment" },
    {
      value: program.commission.recurrence === "recurring" ? "Lifetime" : program.commission.recurrence === "first_n_months" ? `${program.commission.recurringMonths} months` : "First pay",
      sub: "How long you earn",
    },
    { value: money(currency, program.payout.minThreshold), sub: "Minimum payout" },
  ]

  const steps = [
    { Icon: Share2, title: "Share your link", desc: "Copy your unique referral link and drop it anywhere — Stories, bios, group chats, your link-in-bio." },
    { Icon: Users, title: "They sign up", desc: "Anyone who taps your link and creates an account is tagged to you automatically for 60 days." },
    { Icon: BadgeCheck, title: "They subscribe", desc: "When your referral starts a paid plan, the sale is credited to you and a commission is recorded." },
    { Icon: HandCoins, title: "You get paid", desc: "After a short hold, earnings unlock. Cash out via GCash, bank, or account credit." },
  ]

  const whys = [
    { Icon: Repeat, title: "Recurring income", desc: `You don't earn once — you keep earning ${durationLabel} as your referrals stay subscribed.` },
    { Icon: ShieldCheck, title: "Fair 60-day tracking", desc: "We remember your referral for 60 days, so you still get credit even if they sign up later." },
    { Icon: Banknote, title: "Real payouts", desc: "GCash, bank transfer, or account credit. Low minimum, no hoops — genuinely cashable." },
    { Icon: Megaphone, title: "Easy to promote", desc: "Smapey fits gyms, salons, clinics, rentals, lending — a fit for almost any audience." },
    { Icon: Clock, title: "Always-on dashboard", desc: "Clicks, sign-ups, conversions and earnings update in real time. No spreadsheets." },
    { Icon: Sparkles, title: "Free to start", desc: "No fees, no quotas. Grab your link and start sharing in minutes." },
  ]

  return (
    <main className="min-h-screen" style={{ background: CREAM, color: INK, fontFamily: "'Hanken Grotesk', system-ui, sans-serif" }}>
      <SiteNavbar alwaysLight />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="max-w-[1180px] mx-auto px-6 md:px-8 pt-28 pb-8 grid lg:grid-cols-[1.1fr_.9fr] gap-12 items-center">
        <div>
          <span className="inline-flex items-center gap-2 bg-white border-2 font-semibold text-[13px] px-4 py-1.5 rounded-full"
            style={{ ...display, borderColor: INK, boxShadow: `3px 3px 0 ${BLUE}` }}>
            For creators &amp; influencers
          </span>
          <h1 className="text-[52px] md:text-[78px] font-extrabold mt-6 leading-[.98] tracking-[-.035em]" style={display}>
            Refer once.<br />Earn <span style={{ color: BLUE }}>again</span> &amp; <span style={{ color: AMBER }}>again.</span>
          </h1>
          <p className="text-[18px] md:text-[19px] leading-relaxed mt-5 max-w-[460px]" style={{ color: "#54514c" }}>
            Drop your Smapey link in your bio and earn <strong style={{ color: INK }}>{commissionHeadline(program)}</strong> — paid out via GCash, bank, or credit.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <Link href={`${APP}/login`} className="inline-flex items-center gap-2 font-bold text-[17px] px-7 py-4 rounded-full border-2"
              style={{ ...display, background: AMBER, color: INK, borderColor: INK, boxShadow: `4px 4px 0 ${INK}` }}>
              Get my referral link <ChevronRight className="w-4 h-4" />
            </Link>
            <Link href={`${APP}/register`} className="inline-flex items-center font-bold text-[17px] px-7 py-4 rounded-full border-2 bg-white"
              style={{ ...display, color: INK, borderColor: INK }}>
              Free account
            </Link>
          </div>
        </div>

        {/* stacked-layer motif (echoes the Smapey mark) */}
        <div className="relative h-[320px] hidden lg:block" aria-hidden>
          <div className="absolute rounded-[22px] border-2 flex items-center justify-center" style={{ top: 30, left: 30, width: 340, height: 92, background: AMBER, borderColor: INK, transform: "rotate(-6deg)" }}>
            <span className="font-extrabold text-[22px] tracking-[-.02em]" style={{ ...display, color: INK }}>Recurring payouts</span>
          </div>
          <div className="absolute rounded-[24px] border-2 flex items-center px-7" style={{ top: 110, left: 10, width: 360, height: 100, background: BLUE, borderColor: INK, transform: "rotate(3deg)", boxShadow: "5px 5px 0 rgba(22,22,22,.15)" }}>
            <span className="text-white font-extrabold text-[30px] tracking-[-.02em]" style={display}>{rateLabel} × {months} months</span>
          </div>
          <div className="absolute rounded-[22px] border-2 flex items-center justify-center" style={{ top: 210, left: 46, width: 320, height: 88, background: AMBER, borderColor: INK, transform: "rotate(-3deg)" }}>
            <span className="font-extrabold text-[22px] tracking-[-.02em]" style={{ ...display, color: INK }}>Paid via GCash</span>
          </div>
        </div>
      </section>

      {/* ── STATS ────────────────────────────────────────────────────────── */}
      <section className="max-w-[1180px] mx-auto px-6 md:px-8 pt-10 grid sm:grid-cols-3 gap-4">
        {stats.map((s, i) => (
          <div key={i} className="bg-white border-2 rounded-[22px] p-7" style={{ borderColor: INK, boxShadow: `5px 5px 0 ${INK}` }}>
            <div className="text-[44px] md:text-[50px] font-extrabold tracking-[-.03em] leading-none" style={display}>{s.value}</div>
            <div className="text-[15px] font-semibold mt-1.5" style={{ color: "#54514c" }}>{s.sub}</div>
          </div>
        ))}
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section className="max-w-[1180px] mx-auto px-6 md:px-8 pt-24">
        <h2 className="text-[40px] md:text-[50px] font-extrabold tracking-[-.03em] text-center" style={display}>Four easy steps</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
          {steps.map(({ Icon, title, desc }, i) => (
            <div key={title} className="bg-white border-2 rounded-[22px] p-6" style={{ borderColor: INK, boxShadow: `5px 5px 0 ${BLUE}` }}>
              <div className="w-[42px] h-[42px] rounded-full border-2 flex items-center justify-center font-extrabold text-[18px] mb-4"
                style={{ ...display, background: AMBER, borderColor: INK }}>{i + 1}</div>
              <Icon className="w-7 h-7 mb-3" style={{ color: INK }} />
              <h3 className="text-[19px] font-bold" style={display}>{title}</h3>
              <p className="text-[14.5px] leading-relaxed mt-2" style={{ color: "#54514c" }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── EARNINGS CALCULATOR ──────────────────────────────────────────── */}
      <EarningsCalculator program={program} months={months} />

      {/* ── WHY JOIN ─────────────────────────────────────────────────────── */}
      <section className="max-w-[1180px] mx-auto px-6 md:px-8 pt-24">
        <h2 className="text-[40px] md:text-[50px] font-extrabold tracking-[-.03em] text-center" style={display}>Why you'll love it</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
          {whys.map(({ Icon, title, desc }) => (
            <div key={title} className="bg-white border-2 rounded-[22px] p-7" style={{ borderColor: INK, boxShadow: `5px 5px 0 ${AMBER}` }}>
              <div className="w-12 h-12 rounded-[14px] border-2 flex items-center justify-center mb-4" style={{ background: BLUE, borderColor: INK }}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-[19px] font-bold" style={display}>{title}</h3>
              <p className="text-[14.5px] leading-relaxed mt-2" style={{ color: "#54514c" }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <FAQ program={program} months={months} />

      {/* ── FINAL CTA ────────────────────────────────────────────────────── */}
      <section className="max-w-[1180px] mx-auto px-6 md:px-8 py-24">
        <div className="border-2 rounded-[30px] py-16 md:py-[70px] px-8 text-center" style={{ background: AMBER, borderColor: INK, boxShadow: `8px 8px 0 ${INK}` }}>
          <h2 className="text-[40px] md:text-[56px] font-extrabold tracking-[-.035em] leading-none" style={display}>
            Grab your link &amp;<br />start earning today
          </h2>
          <Link href={`${APP}/login`} className="inline-block mt-8 font-bold text-[18px] px-9 py-4 rounded-full text-white" style={{ ...display, background: INK }}>
            Get my referral link
          </Link>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <footer className="border-t-2" style={{ borderColor: INK }}>
        <div className="max-w-[1180px] mx-auto px-6 md:px-8 py-7 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2.5">
            <img src="/logo.png" alt="Smapey" className="h-7 w-7 object-contain" />
            <span className="font-bold" style={display}>Smapey</span>
          </Link>
          <div className="flex items-center gap-6 text-sm font-semibold" style={{ color: "#54514c" }}>
            <Link href="/affiliate">Affiliate</Link>
            <Link href="/privacy-policy">Privacy</Link>
            <Link href="/terms-and-conditions">Terms</Link>
          </div>
          <p className="text-sm" style={{ color: "#8a857d" }}>© {new Date().getFullYear()} Smapey</p>
        </div>
      </footer>
    </main>
  )
}

/* ── Earnings calculator ─────────────────────────────────────────────────── */

function EarningsCalculator({ program, months }: { program: Program; months: number }) {
  const { currency } = program.commission
  const PLAN_PRICES = [299, 499, 999]
  const [referrals, setReferrals] = useState(5)
  const [price, setPrice] = useState(499)

  const perPayment = useMemo(
    () => (program.commission.type === "percentage" ? (price * program.commission.rate) / 100 : program.commission.rate),
    [program, price]
  )
  const monthly = perPayment * referrals
  const total = monthly * months

  return (
    <section className="max-w-[1180px] mx-auto px-6 md:px-8 pt-24">
      <div className="border-2 rounded-[30px] p-8 md:p-[50px] grid lg:grid-cols-2 gap-10 items-center text-white"
        style={{ background: BLUE, borderColor: INK, boxShadow: `8px 8px 0 ${INK}` }}>
        {/* controls */}
        <div>
          <h2 className="text-[34px] md:text-[42px] font-extrabold tracking-[-.03em] mb-7" style={display}>Count your coins</h2>

          <div className="flex items-center justify-between mb-3">
            <span className="font-semibold text-white/85">Paying referrals</span>
            <span className="font-extrabold text-[24px]" style={{ ...display, color: AMBER }}>{referrals}</span>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setReferrals((r) => Math.max(1, r - 1))} aria-label="Fewer referrals"
              className="shrink-0 w-[42px] h-[42px] rounded-[12px] bg-white border-2 flex items-center justify-center" style={{ borderColor: INK, color: INK }}>
              <Minus className="w-4 h-4" />
            </button>
            <input type="range" min={1} max={50} value={referrals} onChange={(e) => setReferrals(Number(e.target.value))}
              className="flex-1 h-2 rounded-full border-2 appearance-none cursor-pointer"
              style={{ borderColor: INK, background: "rgba(255,255,255,.4)", accentColor: AMBER }} />
            <button onClick={() => setReferrals((r) => Math.min(50, r + 1))} aria-label="More referrals"
              className="shrink-0 w-[42px] h-[42px] rounded-[12px] bg-white border-2 flex items-center justify-center" style={{ borderColor: INK, color: INK }}>
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <p className="font-semibold text-white/85 mt-6 mb-3">Their plan price (monthly)</p>
          <div className="flex gap-2.5">
            {PLAN_PRICES.map((p) => {
              const active = price === p
              return (
                <button key={p} onClick={() => setPrice(p)} className="flex-1 py-3 rounded-[13px] font-bold text-[16px] border-2"
                  style={{
                    ...display,
                    background: active ? AMBER : "rgba(255,255,255,.12)",
                    color: active ? INK : "#fff",
                    borderColor: active ? INK : "rgba(255,255,255,.4)",
                  }}>
                  {money(currency, p)}
                </button>
              )
            })}
          </div>
        </div>

        {/* result */}
        <div className="border-2 rounded-[22px] p-9 text-center" style={{ background: CREAM, borderColor: INK, color: INK }}>
          <p className="font-semibold" style={{ color: "#54514c" }}>You could earn</p>
          <div className="text-[56px] md:text-[72px] font-extrabold tracking-[-.04em] leading-none mt-1.5" style={display}>{money(currency, monthly)}</div>
          <p className="font-semibold mt-1 mb-5" style={{ color: "#54514c" }}>every month</p>
          <div className="rounded-[14px] py-4 font-bold text-[18px] text-white" style={{ ...display, background: INK }}>
            {money(currency, total)} <span style={{ color: AMBER }}>over {months} month{months > 1 ? "s" : ""}</span>
          </div>
        </div>
      </div>
      <p className="text-center text-xs mt-4" style={{ color: "#8a857d" }}>
        Based on your {commissionHeadline(program)} commission. Illustrative — real earnings depend on the plans your referrals choose and how long they stay.
      </p>
    </section>
  )
}

/* ── FAQ accordion ───────────────────────────────────────────────────────── */

function FAQ({ program, months }: { program: Program; months: number }) {
  const { currency } = program.commission
  const items = [
    { q: "How do I join the affiliate program?", a: program.whoCanJoin === "existing_customers" ? "Sign in to your Smapey account, open the Affiliate Program page from your account menu, and click Join to get your link instantly. No account yet? Create a free one first." : program.whoCanJoin === "invite_only" ? "The program is currently invite-only. Get in touch and we'll set you up." : "Just create a free account, open the Affiliate Program page, and grab your link — no approval needed." },
    { q: "How much can I earn?", a: `You earn ${commissionHeadline(program)} on each referral. There's no cap on how many businesses you can refer, so your income scales with how much you share.` },
    { q: "How long does my referral stay tracked?", a: "When someone taps your link, we remember it for 60 days. As long as they sign up within that window, you get the credit — even if they don't subscribe right away." },
    { q: "When and how do I get paid?", a: `New commissions are held briefly to cover refunds, then approved. Once your approved balance reaches ${money(currency, program.payout.minThreshold)}, you can request a payout via GCash, bank transfer, or account credit.` },
    { q: "What happens if my referral cancels or refunds?", a: "If a referral cancels or refunds before a commission clears the hold period, that commission is reversed. Earnings already approved and paid are yours to keep." },
  ]

  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="max-w-[820px] mx-auto px-6 md:px-8 pt-24">
      <h2 className="text-[40px] md:text-[50px] font-extrabold tracking-[-.03em] text-center mb-10" style={display}>Good questions</h2>
      <div className="flex flex-col gap-3.5">
        {items.map((it, i) => {
          const isOpen = open === i
          return (
            <div key={it.q} className="bg-white border-2 rounded-[18px] overflow-hidden" style={{ borderColor: INK }}>
              <button onClick={() => setOpen(isOpen ? null : i)} className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left">
                <span className="font-bold text-[17px]" style={display}>{it.q}</span>
                <ChevronDown className={`w-6 h-6 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} style={{ color: BLUE }} />
              </button>
              {isOpen && <p className="px-6 pb-[22px] -mt-1 text-[15px] leading-relaxed" style={{ color: "#54514c" }}>{it.a}</p>}
            </div>
          )
        })}
      </div>
    </section>
  )
}
