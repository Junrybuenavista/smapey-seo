"use client"

import Link from "next/link"
import { FileText, CreditCard, BarChart3, Zap } from "lucide-react"
import { useState } from "react"
import InternalLinks from "@/components/InternalLinks"

export default function InvoicingContent() {
  const [open, setOpen] = useState<number | null>(null)

  const faqs = [
    {
      q: "What is the best HVAC invoice software?",
      a: "The best HVAC invoice software helps contractors create invoices, track payments, and automate billing. Smapey is designed specifically for service businesses, making invoicing faster and easier.",
    },
    {
      q: "Can HVAC technicians create invoices on mobile?",
      a: "Yes, modern HVAC invoicing software allows technicians to create and send invoices directly from mobile devices, improving efficiency in the field.",
    },
    {
      q: "Is there free HVAC invoicing software?",
      a: "Yes, some platforms like Smapey offer free plans with essential invoicing features, perfect for small HVAC businesses or freelancers.",
    },
    {
      q: "How does HVAC invoicing software work?",
      a: "It automates invoice creation, tracks payments, and manages billing workflows so HVAC professionals can focus on their jobs instead of paperwork.",
    },
    {
      q: "Can I send estimates and invoices together?",
      a: "Yes, many HVAC invoice tools include estimate-to-invoice workflows, allowing you to convert quotes into invoices instantly.",
    },
    {
      q: "Does HVAC software support online payments?",
      a: "Most HVAC invoicing software supports online payments, enabling faster transactions and improved cash flow.",
    },
  ]

  return (
    <>
    <div>
      {/* HERO */}
      <section className="py-20 bg-gradient-to-b from-yellow-50 to-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-block bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm mb-4">
              Built for HVAC 🚀
            </span>

            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              HVAC Invoice Software for Faster Payments
            </h1>

            <p className="text-lg text-gray-600 mt-4">
              Stop wasting time on manual invoices, spreadsheets, and delayed payments.
              Use HVAC invoicing software to automate billing and get paid faster.
            </p>

            <p className="text-gray-500 mt-3">
              Smapey helps contractors with invoice software for HVAC, payment tracking,
              and estimate-to-invoice workflows.
            </p>

            <div className="flex gap-4 mt-6">
              <Link
                href="/invoice/how-it-works"
                className="bg-yellow-500 text-white px-6 py-3 rounded-xl shadow hover:shadow-lg hover:-translate-y-1 transition"
              >
                View Invoicing App →
              </Link>

              <Link
                href="/invoice/https://app.smapey.com/register?product=INVOICE&plan=FREE"
                className="border px-6 py-3 rounded-xl hover:border-yellow-500 hover:text-yellow-600 transition"
              >
                Start Free
              </Link>
            </div>
          </div>

          {/* IMAGE */}
          <div className="relative">
            <div className="absolute inset-0 bg-yellow-200 blur-3xl opacity-30 rounded-full"></div>
            <img
              src="/images/hvac.png"
              alt="HVAC invoice software dashboard"
              className="relative rounded-2xl shadow-xl border"
            />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-8">
          <Feature
            icon={<Zap />}
            title="Invoice Automation"
            desc="Automatically generate invoices for HVAC jobs and recurring services."
          />
          <Feature
            icon={<CreditCard />}
            title="Online Payments"
            desc="Accept payments online and reduce delays in your billing process."
          />
          <Feature
            icon={<BarChart3 />}
            title="Payment Tracking"
            desc="Track paid, pending, and overdue invoices with real-time insights."
          />
          <Feature
            icon={<FileText />}
            title="Reporting"
            desc="Get reports on revenue, billing, and contractor performance."
          />
        </div>

        {/* SEO BLOCK */}
        <div className="mt-12 text-gray-600 max-w-3xl">
          <p>
            Smapey is more than just HVAC invoice software—it’s a complete contractor invoicing app designed for service professionals.
            Whether you're in HVAC, plumbing, or construction, this billing software simplifies your estimate and invoice workflow,
            helping electricians, plumbers, and contractors manage jobs and payments efficiently.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="bg-gray-900 text-white rounded-2xl text-center py-16 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold">
            Get Paid Faster with Smarter Invoicing
          </h2>

          <Link
            href="/invoice/https://app.smapey.com/register?product=INVOICE&plan=FREE"
            className="inline-block mt-6 bg-yellow-500 px-6 py-3 rounded-xl shadow hover:shadow-lg hover:-translate-y-1 transition"
          >
            Start Free Trial
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-10">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((f, i) => (
            <div
              key={i}
              className="border rounded-xl p-5 hover:shadow-md transition cursor-pointer"
              onClick={() => setOpen(open === i ? null : i)}
            >
              <h3 className="font-semibold">{f.q}</h3>
              {open === i && (
                <p className="text-gray-600 mt-2">{f.a}</p>
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

function Feature({ icon, title, desc }: any) {
  return (
    <div className="border rounded-xl p-6 hover:shadow-lg transition">
      <div className="text-yellow-500 mb-3">{icon}</div>
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-gray-600 mt-2">{desc}</p>
    </div>
  )
}