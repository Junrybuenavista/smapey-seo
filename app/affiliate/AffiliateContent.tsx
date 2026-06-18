"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import {
  Share2, Wallet, TrendingUp, ChevronRight, Users, Gift, Link2, BadgeCheck,
  Clock, ShieldCheck, Sparkles, Megaphone, HandCoins, Plus, Minus, ChevronDown,
  Banknote, CreditCard, Repeat,
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

export default function AffiliateContent() {
  const [program, setProgram] = useState<Program>(FALLBACK)

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

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <SiteNavbar alwaysLight />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-800 to-blue-900 text-white pt-32 pb-28">
        {/* amber glow accents (logo orange) */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-400/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-24 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl" />
        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider bg-white/10 border border-white/15 rounded-full px-4 py-1.5 mb-6">
            <Gift className="w-3.5 h-3.5 text-amber-400" /> Smapey Affiliate Program
          </span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.1]">
            Earn <span className="text-amber-400">{commissionHeadline(program)}</span>
            <br className="hidden md:block" /> for every business you refer.
          </h1>
          <p className="mt-6 text-lg text-blue-100/80 max-w-2xl mx-auto">
            Smapey runs invoicing, gym, salon, booking, lending and more. Refer any business owner who
            could use it — and earn real commission, paid via GCash, bank, or account credit.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <Link href={`${APP}/login`} className="inline-flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-gray-900 font-semibold px-7 py-3.5 rounded-full transition-colors shadow-lg shadow-amber-500/20">
              Get your referral link <ChevronRight className="w-4 h-4" />
            </Link>
            <Link href={`${APP}/register`} className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-white/15 text-white font-semibold px-7 py-3.5 rounded-full transition-colors">
              Create a free account
            </Link>
          </div>
          <p className="mt-4 text-sm text-blue-200/60">
            {program.whoCanJoin === "existing_customers"
              ? "Open to all Smapey customers — sign in and grab your link from your dashboard."
              : program.whoCanJoin === "invite_only"
              ? "Currently invite-only. Contact us to join."
              : "Free to join — anyone can start referring today."}
          </p>
        </div>
      </section>

      {/* ── QUICK FACTS ──────────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 -mt-16 relative z-10">
        <div className="bg-white rounded-3xl shadow-xl shadow-blue-950/10 border border-gray-100 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
          {[
            {
              icon: <TrendingUp className="w-5 h-5" />,
              tint: "blue" as const,
              value: program.commission.type === "percentage" ? `${program.commission.rate}%` : money(currency, program.commission.rate),
              sub: program.commission.type === "flat"
                ? (program.commission.recurrence === "recurring" ? "Per month, per referral" : "Per paying signup")
                : "Of every payment",
            },
            {
              icon: <Repeat className="w-5 h-5" />,
              tint: "amber" as const,
              value: program.commission.recurrence === "recurring" ? "Lifetime"
                : program.commission.recurrence === "first_n_months" ? `${program.commission.recurringMonths} months`
                : "First payment",
              sub: "How long you earn",
            },
            {
              icon: <Wallet className="w-5 h-5" />,
              tint: "blue" as const,
              value: money(currency, program.payout.minThreshold),
              sub: "Minimum payout",
            },
          ].map((f, i) => (
            <div key={i} className="flex items-center gap-4 p-6 md:p-7">
              <div className={`shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center ${f.tint === "amber" ? "bg-amber-100 text-amber-600" : "bg-blue-50 text-blue-600"}`}>
                {f.icon}
              </div>
              <div className="min-w-0">
                <p className="text-2xl font-bold text-gray-900 leading-none truncate">{f.value}</p>
                <p className="text-sm text-gray-500 mt-1.5">{f.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <SectionHeading kicker="How it works" title="From link to payout in four steps" />
        <div className="grid md:grid-cols-4 gap-6 mt-14">
          {[
            { Icon: Share2, title: "Share your link", desc: "Sign in to your Smapey dashboard and copy your unique referral link. Share it anywhere — chats, socials, your website." },
            { Icon: Users, title: "They sign up", desc: "Anyone who clicks your link and creates an account is tagged to you automatically for the next 60 days." },
            { Icon: BadgeCheck, title: "They subscribe", desc: "When your referral starts a paid plan, the sale is credited to you and a commission is recorded." },
            { Icon: HandCoins, title: "You get paid", desc: `After a short hold, earnings become withdrawable. Cash out via GCash, bank, or account credit.` },
          ].map(({ Icon, title, desc }, i) => (
            <div key={title} className="relative rounded-2xl border border-gray-100 bg-gradient-to-b from-white to-blue-50/30 p-7 shadow-sm">
              <div className="absolute -top-4 left-7 w-9 h-9 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center shadow-md shadow-blue-600/30">
                {i + 1}
              </div>
              <Icon className="w-8 h-8 text-amber-500 mb-4 mt-2" />
              <h3 className="font-semibold text-[17px]">{title}</h3>
              <p className="text-gray-600 mt-2 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── EARNINGS CALCULATOR ──────────────────────────────────────────── */}
      <EarningsCalculator program={program} months={months} />

      {/* ── STEP-BY-STEP GUIDE ───────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-6 py-24">
        <SectionHeading kicker="Getting started" title="Your step-by-step guide" />
        <div className="mt-12 space-y-5">
          {[
            { title: "Create or sign in to your Smapey account", body: "The affiliate program lives inside your dashboard. If you don't have an account yet, create a free one — it takes a minute.", cta: { label: "Create free account", href: `${APP}/register` } },
            { title: "Open the Affiliate Program page", body: "From your account menu, click \"Affiliate Program\". Hit Join to instantly generate your unique referral link." },
            { title: "Share your referral link", body: "Send it to business owners you know, post it on Facebook groups, add it to your bio, or include it in your content. Every visitor who signs up through it is tracked to you." },
            { title: "Track referrals & earnings", body: "Your dashboard shows who signed up, who converted to a paid plan, and your pending, available, and paid earnings in real time." },
            { title: "Set your payout method & cash out", body: `Add your GCash number, bank account, or choose account credit. Once your approved balance hits ${money(currency, program.payout.minThreshold)}, request a payout.` },
          ].map((s, i) => (
            <div key={s.title} className="flex gap-5 rounded-2xl border border-gray-100 p-6 hover:border-blue-200 transition-colors">
              <div className="shrink-0 w-10 h-10 rounded-xl bg-blue-50 text-blue-600 font-bold flex items-center justify-center">{i + 1}</div>
              <div>
                <h3 className="font-semibold text-[17px]">{s.title}</h3>
                <p className="text-gray-600 mt-1.5 text-[15px] leading-relaxed">{s.body}</p>
                {s.cta && (
                  <Link href={s.cta.href} className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700 mt-3">
                    {s.cta.label} <ChevronRight className="w-4 h-4" />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHY JOIN ─────────────────────────────────────────────────────── */}
      <section className="bg-blue-50/50 border-y border-blue-100/70 py-24">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeading kicker="Why join" title="A program built to actually pay" />
          <div className="grid md:grid-cols-3 gap-6 mt-14">
            {[
              { Icon: Repeat, title: "Recurring income", desc: "You don't earn once — you keep earning as your referrals stay subscribed, turning a single share into months of income." },
              { Icon: ShieldCheck, title: "Fair 60-day tracking", desc: "We remember your referral for 60 days, so you still get credit even if they sign up later." },
              { Icon: Banknote, title: "Real payouts", desc: "GCash, bank transfer, or account credit. Low minimum, no hoops — your earnings are genuinely cashable." },
              { Icon: Megaphone, title: "Easy to promote", desc: "Smapey covers many niches — gyms, salons, clinics, rentals, lending. There's a fit for almost any audience." },
              { Icon: Clock, title: "Always-on dashboard", desc: "See clicks, sign-ups, conversions and earnings update in real time. No guessing, no spreadsheets." },
              { Icon: Sparkles, title: "Free to start", desc: "No fees, no quotas. Grab your link and start sharing in minutes." },
            ].map(({ Icon, title, desc }) => (
              <div key={title} className="rounded-2xl bg-white border border-gray-100 p-7 shadow-sm">
                <div className="w-11 h-11 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-[17px]">{title}</h3>
                <p className="text-gray-600 mt-2 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW EARNING WORKS (details) ──────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <SectionHeading kicker="The details" title="Exactly how your commission works" />
        <div className="grid md:grid-cols-2 gap-6 mt-14">
          <DetailCard icon={<Link2 className="w-5 h-5" />} title="What gets tracked">
            Anyone who clicks your link and creates a Smapey account within 60 days is attributed to you — across every product, on any device they finish signing up on.
          </DetailCard>
          <DetailCard icon={<CreditCard className="w-5 h-5" />} title="When you earn">
            A commission is recorded the moment a referral makes a real payment on a paid plan. {program.commission.recurrence === "recurring" ? "You keep earning on every renewal, for as long as they stay." : program.commission.recurrence === "first_n_months" ? `You earn on each payment for their first ${program.commission.recurringMonths} months.` : "You earn on their first payment."}
          </DetailCard>
          <DetailCard icon={<Clock className="w-5 h-5" />} title="The hold period">
            New commissions are briefly held to cover refunds and cancellations. Once cleared, they move to "available" and you can withdraw them.
          </DetailCard>
          <DetailCard icon={<Wallet className="w-5 h-5" />} title="Getting paid">
            Choose GCash, bank transfer, or account credit. When your available balance reaches {money(currency, program.payout.minThreshold)}, request a payout right from your dashboard.
          </DetailCard>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <FAQ program={program} months={months} />

      {/* ── FINAL CTA ────────────────────────────────────────────────────── */}
      <section className="px-6 pb-24">
        <div className="max-w-5xl mx-auto rounded-3xl bg-gradient-to-br from-blue-700 to-blue-900 text-white p-12 md:p-16 text-center relative overflow-hidden">
          <div className="absolute -top-16 -right-10 w-72 h-72 bg-amber-400/20 rounded-full blur-3xl" />
          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Start earning with Smapey</h2>
            <p className="text-blue-100/80 mt-3 max-w-xl mx-auto">
              Grab your referral link today and turn the businesses you know into recurring income.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Link href={`${APP}/login`} className="inline-flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-gray-900 font-semibold px-8 py-3.5 rounded-full transition-colors">
                Get your link <ChevronRight className="w-4 h-4" />
              </Link>
              <Link href={`${APP}/register`} className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-white/15 text-white font-semibold px-8 py-3.5 rounded-full transition-colors">
                Create free account
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Slim footer — the full SEO link footer is intentionally omitted here to
          keep the conversion-focused affiliate page clean. */}
      <footer className="border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2.5">
            <img src="/logo.png" alt="Smapey" className="h-7 w-7 object-contain" />
            <span className="font-bold text-gray-900">Smapey</span>
          </Link>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <Link href="/affiliate" className="hover:text-gray-900 transition-colors">Affiliate</Link>
            <Link href="/privacy-policy" className="hover:text-gray-900 transition-colors">Privacy</Link>
            <Link href="/terms-and-conditions" className="hover:text-gray-900 transition-colors">Terms</Link>
          </div>
          <p className="text-sm text-gray-400">© {new Date().getFullYear()} Smapey</p>
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
    <section className="bg-gray-900 text-white py-24">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeading kicker="Earnings calculator" title="See what you could earn" dark />
        <div className="grid lg:grid-cols-2 gap-10 mt-14 items-center">
          {/* controls */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-white/70">Paying referrals</label>
                <span className="text-amber-400 font-bold text-lg">{referrals}</span>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => setReferrals((r) => Math.max(1, r - 1))} className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"><Minus className="w-4 h-4" /></button>
                <input type="range" min={1} max={50} value={referrals} onChange={(e) => setReferrals(Number(e.target.value))} className="flex-1 accent-amber-400" />
                <button onClick={() => setReferrals((r) => Math.min(50, r + 1))} className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"><Plus className="w-4 h-4" /></button>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-white/70 block mb-3">Their plan price (monthly)</label>
              <div className="flex gap-2">
                {PLAN_PRICES.map((p) => (
                  <button key={p} onClick={() => setPrice(p)} className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border transition-colors ${price === p ? "bg-amber-400 text-gray-900 border-amber-400" : "border-white/15 text-white/70 hover:border-white/30"}`}>
                    {money(currency, p)}
                  </button>
                ))}
              </div>
            </div>
            <p className="text-xs text-white/40">
              Based on your {commissionHeadline(program)} commission. Illustrative — real earnings depend on the plans your referrals choose and how long they stay.
            </p>
          </div>

          {/* result */}
          <div className="rounded-3xl bg-gradient-to-br from-blue-600 to-blue-800 p-8 md:p-10">
            <p className="text-blue-100/70 text-sm">Estimated earnings</p>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-5xl font-bold text-amber-400">{money(currency, monthly)}</span>
              <span className="text-blue-100/70">/ month</span>
            </div>
            <div className="mt-6 pt-6 border-t border-white/10 space-y-3 text-sm">
              <Line label="Per referral / month" value={money(currency, perPayment)} />
              <Line label="Paying referrals" value={String(referrals)} />
              <Line label={`Over ${months} month${months > 1 ? "s" : ""}`} value={money(currency, total)} highlight />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Line({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-blue-100/70">{label}</span>
      <span className={`font-semibold ${highlight ? "text-amber-400 text-lg" : "text-white"}`}>{value}</span>
    </div>
  )
}

/* ── FAQ accordion ───────────────────────────────────────────────────────── */

function FAQ({ program, months }: { program: Program; months: number }) {
  const { currency } = program.commission
  const items = [
    { q: "How do I join the affiliate program?", a: program.whoCanJoin === "existing_customers" ? "Sign in to your Smapey account, open the Affiliate Program page from your account menu, and click Join to get your link instantly. No account yet? Create a free one first." : program.whoCanJoin === "invite_only" ? "The program is currently invite-only. Get in touch and we'll set you up." : "Just create a free account, open the Affiliate Program page, and grab your link — no approval needed." },
    { q: "How much can I earn?", a: `You earn ${commissionHeadline(program)} on each referral. There's no cap on how many businesses you can refer, so your income scales with how much you share.` },
    { q: "How long does my referral stay tracked?", a: "When someone clicks your link, we remember it for 60 days. As long as they sign up within that window, you get the credit — even if they don't subscribe right away." },
    { q: "When and how do I get paid?", a: `New commissions are held briefly to cover refunds, then approved. Once your approved balance reaches ${money(currency, program.payout.minThreshold)}, you can request a payout via GCash, bank transfer, or account credit.` },
    { q: "How long do commissions last per referral?", a: program.commission.recurrence === "recurring" ? "For the entire time your referral keeps paying — every renewal earns you commission." : program.commission.recurrence === "first_n_months" ? `For the first ${months} months of each referral's subscription.` : "On the first payment your referral makes." },
    { q: "What happens if my referral cancels or refunds?", a: "If a referral cancels or refunds before a commission clears the hold period, that commission is reversed. Earnings already approved and paid are yours to keep." },
    { q: "Can I refer myself?", a: program.whoCanJoin ? "No — self-referrals are not eligible. The program rewards bringing new businesses to Smapey." : "" },
  ].filter((x) => x.a)

  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="max-w-3xl mx-auto px-6 py-24">
      <SectionHeading kicker="FAQ" title="Questions, answered" />
      <div className="mt-12 space-y-3">
        {items.map((it, i) => {
          const isOpen = open === i
          return (
            <div key={it.q} className="rounded-2xl border border-gray-100 overflow-hidden">
              <button onClick={() => setOpen(isOpen ? null : i)} className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left">
                <span className="font-semibold text-[16px]">{it.q}</span>
                <ChevronDown className={`w-5 h-5 text-blue-600 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
              </button>
              {isOpen && <p className="px-6 pb-6 -mt-1 text-gray-600 text-[15px] leading-relaxed">{it.a}</p>}
            </div>
          )
        })}
      </div>
    </section>
  )
}

/* ── small presentational helpers ────────────────────────────────────────── */

function SectionHeading({ kicker, title, dark }: { kicker: string; title: string; dark?: boolean }) {
  return (
    <div className="text-center">
      <p className="text-sm font-semibold uppercase tracking-wider text-amber-500">{kicker}</p>
      <h2 className={`text-3xl md:text-4xl font-bold tracking-tight mt-2 ${dark ? "text-white" : "text-gray-900"}`}>{title}</h2>
    </div>
  )
}

function DetailCard({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-gray-100 p-7">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center">{icon}</div>
        <h3 className="font-semibold text-[17px]">{title}</h3>
      </div>
      <p className="text-gray-600 text-[15px] leading-relaxed">{children}</p>
    </div>
  )
}
