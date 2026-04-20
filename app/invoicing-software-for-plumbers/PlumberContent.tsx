"use client"

import { useState } from "react"
import Image from "next/image"
import {
  FileText,
  CreditCard,
  BarChart,
  Zap,
} from "lucide-react"
import InternalLinks from "@/components/InternalLinks"

const faqs = [
  {
    q: "What is the best plumbing invoice software?",
    a: "The best plumbing invoice software helps automate billing, track payments, and manage jobs in one place. Tools like Smapey are built specifically for contractors and plumbers to simplify invoicing workflows.",
  },
  {
    q: "Can plumbers use free invoicing software?",
    a: "Yes, many platforms offer free plans for small plumbing businesses. Smapey provides a free invoicing plan so you can create invoices, track payments, and manage customers without upfront cost.",
  },
  {
    q: "How do plumbers create professional invoices?",
    a: "Plumbers can use invoicing software to generate branded invoices with customer details, job descriptions, and pricing. This eliminates manual spreadsheets and reduces billing errors.",
  },
  {
    q: "What features should plumbing billing software have?",
    a: "Good plumbing billing software includes invoice automation, payment tracking, estimates, reporting, and online payments. These features help streamline operations and improve cash flow.",
  },
  {
    q: "Is invoicing software worth it for small plumbing businesses?",
    a: "Yes, it saves time, reduces errors, and helps you get paid faster. Even small plumbing businesses benefit from automated invoicing and payment reminders.",
  },
  {
    q: "Can I accept payments with plumbing invoice software?",
    a: "Yes, modern invoicing apps allow you to accept online payments via cards and digital methods, making it easier for customers to pay instantly.",
  },
]

export default function InvoicingContent() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <>
    <div className="bg-white">

      {/* HERO */}
      <section className="py-20 bg-gradient-to-b from-yellow-50 to-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

          {/* LEFT */}
          <div>
            <span className="inline-block bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
              Built for Plumbers 🚀
            </span>

            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Plumbing Invoice Software That Gets You Paid Faster
            </h1>

            <p className="text-lg text-gray-600 mt-4">
              Stop wasting time on spreadsheets and manual billing. This plumbing invoicing app helps automate invoices, track payments, and manage your business in one place.
            </p>

            <p className="text-gray-600 mt-4">
              Smapey is a powerful plumbing billing software designed for contractors who want faster payments, better organization, and less admin work.
            </p>

            <div className="flex gap-4 mt-6">
              <a
                href="https://app.smapey.com/invoicing-app"
                className="bg-yellow-500 text-white px-6 py-3 rounded-xl shadow hover:shadow-lg hover:-translate-y-1 transition-all"
              >
                View Invoicing App →
              </a>

              <a
                href="https://app.smapey.com/register?product=INVOICE&plan=FREE"
                className="border px-6 py-3 rounded-xl hover:bg-gray-50"
              >
                Start Free
              </a>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative">
            <div className="absolute inset-0 bg-yellow-300 blur-3xl opacity-20 rounded-2xl"></div>

            <Image
              src="/images/plumber.png"
              alt="plumbing invoice software dashboard UI"
              width={600}
              height={400}
              className="rounded-2xl shadow-xl border relative"
            />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-8">

          <Feature icon={<Zap />} title="Invoice Automation">
            Automatically generate invoices and reduce manual errors in your service invoicing workflow.
          </Feature>

          <Feature icon={<CreditCard />} title="Online Payments">
            Accept card and digital payments directly from your invoices and get paid faster.
          </Feature>

          <Feature icon={<FileText />} title="Payment Tracking">
            Track paid, pending, and overdue invoices in real time with smart billing software.
          </Feature>

          <Feature icon={<BarChart />} title="Reporting">
            Get insights into revenue, jobs, and customer data with built-in analytics.
          </Feature>

        </div>
      </section>

      {/* SEO BLOCK */}
      <section className="max-w-3xl mx-auto px-6 pb-20 text-gray-600 text-lg">
        <p>
          Smapey is more than just a plumbing invoice software. It’s a complete contractor invoicing app designed for plumbers, electricians, and construction professionals. From estimate and invoice workflow to full billing software features, you can manage your entire business in one place. Whether you're running a small plumbing business or scaling your service company, Smapey simplifies invoicing and helps you get paid faster.
        </p>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto bg-gray-900 text-white rounded-2xl text-center py-16 px-6">
          <h2 className="text-3xl font-bold">
            Get Paid Faster with Smarter Invoicing
          </h2>

          <a
            href="https://app.smapey.com/register?product=INVOICE&plan=FREE"
            className="inline-block mt-6 bg-yellow-500 text-white px-6 py-3 rounded-xl shadow hover:shadow-lg hover:-translate-y-1 transition-all"
          >
            Start Free Trial
          </a>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 max-w-3xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-10">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="border rounded-xl p-5 hover:shadow-md hover:border-yellow-500 transition-all"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full text-left font-semibold"
              >
                {faq.q}
              </button>

              {open === i && (
                <p className="text-gray-600 mt-3">{faq.a}</p>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
      <InternalLinks />
                </>
  )
}

function Feature({ icon, title, children }: any) {
  return (
    <div className="border rounded-xl p-6 hover:shadow-lg transition-all">
      <div className="text-yellow-500 mb-3">{icon}</div>
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-gray-600">{children}</p>
    </div>
  )
}