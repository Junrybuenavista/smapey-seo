"use client"

import {
  Mail,
  CreditCard,
  Users,
  BarChart,
  Clock,
  Scale,
  Bell
} from "lucide-react"
import Link from "next/link"
import InternalLinks from "@/components/InternalLinks"

export default function InvoicingContent() {
  return (
    <div className="bg-gradient-to-br from-yellow-50 to-white">

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">

        <div>
          <span className="inline-block bg-yellow-100 text-yellow-700 px-4 py-1 rounded-full text-sm mb-4">
            Legal Billing Software ⚖️
          </span>

          <h1 className="text-4xl font-bold leading-tight">
            Get Paid Faster Without Billing Errors or Compliance Risk
          </h1>

          <p className="text-lg text-gray-600 mt-4">
            Smapey helps law firms track billable hours, generate compliant invoices,
            and collect payments faster — without spreadsheets or manual billing.
          </p>

          <p className="text-gray-600 mt-4">
            Built for lawyers who need accurate billing, trust accounting,
            and predictable cash flow.
          </p>

          <div className="flex gap-4 mt-6">
            <Link
              href="/invoice/how-it-works"
              className="bg-black text-white px-6 py-3 rounded-lg"
            >
              View Invoicing App →
            </Link>

            <Link
              href="https://app.smapey.com/register?product=INVOICE&plan=FREE"
              className="border px-6 py-3 rounded-lg"
            >
              Start Free
            </Link>
          </div>

          <p className="text-sm text-gray-400 mt-3">
            Built for law firms, attorneys, and legal professionals.
          </p>
        </div>

        <div className="relative">
          <img
            src="/images/legal-billing-dashboard.png"
            alt="legal billing software dashboard"
            className="rounded-2xl shadow-2xl"
          />
        </div>
      </section>

      {/* WORKFLOW */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold mb-8">
            From Time Tracking → Invoice → Payment (Fully Automated)
          </h2>

          <div className="grid md:grid-cols-5 gap-6 text-sm text-gray-600">
            <div>1. Track billable time</div>
            <div>2. Auto-generate invoices</div>
            <div>3. Send to clients</div>
            <div>4. Auto follow-ups</div>
            <div>5. Get paid faster</div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-8">

        <div className="flex gap-4">
          <Clock />
          <div>
            <h3 className="font-semibold">Billable Time Tracking</h3>
            <p className="text-gray-600">
              Track billable hours accurately with timers and manual entries linked to cases.
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <Mail />
          <div>
            <h3 className="font-semibold">Legal Invoice Generation</h3>
            <p className="text-gray-600">
              Create detailed invoices with time entries and professional legal formats.
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <Scale />
          <div>
            <h3 className="font-semibold">Trust Accounting</h3>
            <p className="text-gray-600">
              Manage client funds with compliant trust tracking and clear balances.
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <CreditCard />
          <div>
            <h3 className="font-semibold">Online Payments</h3>
            <p className="text-gray-600">
              Accept secure payments and reduce delays with faster collections.
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <Bell />
          <div>
            <h3 className="font-semibold">Automatic Reminders</h3>
            <p className="text-gray-600">
              Stop chasing clients — smart reminders follow up for you automatically.
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <BarChart />
          <div>
            <h3 className="font-semibold">Financial Reporting</h3>
            <p className="text-gray-600">
              Track revenue, outstanding invoices, and firm performance in real-time.
            </p>
          </div>
        </div>

      </section>

      {/* WHY SWITCH */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold mb-8">
            Why Law Firms Switch to Smapey
          </h2>

          <div className="grid md:grid-cols-2 gap-6 text-left text-gray-600">
            <div>
              ❌ Manual time tracking & billing errors  
              <br />✅ Accurate billable hour tracking
            </div>
            <div>
              ❌ Delayed client payments  
              <br />✅ Faster collections with automation
            </div>
            <div>
              ❌ Compliance risks in billing  
              <br />✅ Built-in legal billing workflows
            </div>
            <div>
              ❌ No visibility on firm revenue  
              <br />✅ Real-time financial insights
            </div>
          </div>
        </div>
      </section>

      {/* SEO */}
      <section className="max-w-4xl mx-auto px-6 pb-16 text-gray-700 text-center">
        <p>
          Smapey is a legal billing software designed for law firms to track billable hours,
          generate compliant invoices, and manage client payments efficiently.
        </p>

        <p className="mt-4">
          It simplifies legal billing workflows including time tracking, invoicing,
          trust accounting, and reporting — helping lawyers reduce errors,
          stay compliant, and get paid faster.
        </p>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <div className="bg-black text-white text-center py-16 rounded-xl">
          <h2 className="text-3xl font-bold">
            Start Simplifying Your Legal Billing Today
          </h2>

          <p className="mt-3 text-gray-300">
            No spreadsheets. No errors. Just faster payments.
          </p>

          <Link
            href="https://app.smapey.com/register?product=INVOICE&plan=FREE"
            className="inline-block mt-6 bg-white text-black px-6 py-3 rounded-lg"
          >
            Start Free Trial
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <h2 className="text-3xl font-bold text-center mb-10">
          Frequently Asked Questions
        </h2>

        <div className="space-y-6 text-gray-600">

          <div>
            <h3 className="font-semibold text-black">
              What is legal billing software?
            </h3>
            <p>
              Legal billing software helps law firms track billable hours,
              generate invoices, and manage payments while staying compliant.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-black">
              How do lawyers track billable hours?
            </h3>
            <p>
              Lawyers use timers or manual tracking tools to log time per case,
              which is then used to generate invoices.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-black">
              What is trust accounting?
            </h3>
            <p>
              Trust accounting ensures client funds are kept separate from firm funds
              and managed according to legal regulations.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-black">
              Can this replace spreadsheets?
            </h3>
            <p>
              Yes, Smapey automates billing workflows and eliminates manual tracking.
            </p>
          </div>

        </div>
      </section>

      <InternalLinks />
    </div>
  )
}