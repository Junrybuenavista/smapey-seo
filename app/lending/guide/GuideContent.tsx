"use client"

import { Users, HandCoins, CalendarRange, Wallet, AlertTriangle, BarChart3, ChevronRight } from "lucide-react"

const SECTIONS = [
  {
    icon: Users,
    title: "1. Add your borrowers",
    body: [
      "Open Borrowers in the dashboard and click Add Borrower. Fill in the full name, phone number, email, address, and any ID or reference details you want on record.",
      "Borrower profiles are reusable — you create them once and attach them to any number of loans. Each profile keeps a running history of every loan and payment.",
      "The dashboard automatically tracks each borrower's total borrowed, outstanding balance, and active loan count — so you can see their standing at a glance before issuing a new loan.",
    ],
  },
  {
    icon: HandCoins,
    title: "2. Issue a loan",
    body: [
      "Open Loans and click New Loan. Select a borrower, then set the principal amount, interest rate, term (number of installments), and the disbursement date.",
      "Choose the repayment frequency — weekly, bi-weekly, or monthly — and the system computes the installment amount and total repayable for you.",
      "Add notes for your records (purpose of the loan, collateral, guarantor) and save. The loan is created with an Active status and linked to the borrower's profile.",
    ],
  },
  {
    icon: CalendarRange,
    title: "3. Review the amortization schedule",
    body: [
      "The moment a loan is created, a full amortization schedule is generated — every due date and installment amount laid out from the first payment to the last.",
      "Each scheduled installment shows the amount due and its status, so you and the borrower both know exactly what is owed and when.",
      "No manual computation, no spreadsheets — the schedule recalculates automatically based on the principal, interest rate, and term you entered.",
    ],
  },
  {
    icon: Wallet,
    title: "4. Record payments",
    body: [
      "When a borrower pays, open the loan and click Record Payment. Enter the amount and choose the method — Cash, GCash, or Bank Transfer.",
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
      "Mark a loan as Defaulted when it can no longer be collected — it stays in history and is reflected in your default-rate analytics.",
    ],
  },
  {
    icon: BarChart3,
    title: "6. Monitor your lending analytics",
    body: [
      "The Analytics dashboard shows monthly collections, total outstanding balance, repayment rate, and default rate — all updated in real time.",
      "A 6-month Collections vs. Disbursed chart shows cash collected against money lent out, so you can see whether your loan book is growing healthily.",
      "The loan portfolio breakdown splits your loans into Active, Fully Paid, and Defaulted, giving you an instant read on the health of your lending business.",
    ],
  },
]

export default function GuideContent() {
  return (
    <div className="min-h-screen bg-white">

      {/* HERO */}
      <section className="bg-gradient-to-br from-slate-100 via-white to-slate-100 border-b border-slate-100">
        <div className="max-w-3xl mx-auto px-6 py-16">
          <div className="flex items-center gap-2 mb-5">
            <a href="/lending" className="text-sm text-slate-700 hover:text-slate-800 font-medium transition-colors">Lending</a>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-sm text-slate-500">Guide</span>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-600 to-slate-800 flex items-center justify-center">
              <HandCoins className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm font-semibold text-slate-700 uppercase tracking-wider">Complete Guide</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight mb-4">
            How to run your lending business with Smapey
          </h1>
          <p className="text-slate-500 leading-relaxed text-lg mb-8">
            A step-by-step walkthrough covering borrowers, loan issuance, amortization schedules, payment tracking, collections, and lending analytics.
          </p>
          <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=LENDING&plan=FREE`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-semibold text-sm transition-all shadow-lg shadow-slate-600/20">
            Start free <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* GUIDE SECTIONS */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-6 space-y-14">
          {SECTIONS.map(({ icon: Icon, title, body }) => (
            <div key={title} className="flex flex-col sm:flex-row gap-6">
              <div className="shrink-0">
                <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-100 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-slate-700" />
                </div>
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-800 mb-4">{title}</h2>
                <ul className="space-y-3">
                  {body.map((line, i) => (
                    <li key={i} className="flex gap-3 text-slate-600 leading-relaxed text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0 mt-2" />
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-slate-100 to-slate-100 border-t border-slate-100 py-16">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-extrabold text-slate-800 mb-3">Ready to get started?</h2>
          <p className="text-slate-500 mb-6 text-sm">Free plan — 20 borrowers, 30 active loans. No credit card required.</p>
          <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=LENDING&plan=FREE`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-semibold text-sm transition-all shadow-lg shadow-slate-600/20">
            Start free <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-800 border-t border-slate-700 px-6 py-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Smapey" className="w-6 h-6 rounded-md object-cover" />
            <span className="text-white/60 text-sm font-semibold">Lending by Smapey</span>
          </div>
          <div className="flex items-center gap-5 text-white/40 text-xs">
            <a href="/lending" className="hover:text-white/70 transition">Home</a>
            <a href="/privacy-policy" className="hover:text-white/70 transition">Privacy</a>
            <a href="/terms-and-conditions" className="hover:text-white/70 transition">Terms</a>
          </div>
          <p className="text-white/20 text-xs">© {new Date().getFullYear()} Smapey</p>
        </div>
      </footer>

    </div>
  )
}
