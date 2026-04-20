"use client"

import { useState } from "react"
import {
  FileText,
  CreditCard,
  BarChart3,
  Clock,
} from "lucide-react"
import InternalLinks from "@/components/InternalLinks"
import Link from "next/link"

const faqs = [
  {
    q: "What is the best invoicing software for consultants?",
    a: "The best invoicing software for consultants automates billing, tracks payments, and simplifies client management. Tools like Smapey help consultants create professional invoices and get paid faster.",
  },
  {
    q: "How do consultants create invoices?",
    a: "Consultants can create invoices using invoicing software that generates professional documents, adds services, and calculates totals automatically. This saves time and reduces errors.",
  },
  {
    q: "Is there free invoicing software for consultants?",
    a: "Yes, many invoicing tools offer free plans. These usually include basic billing features, making them ideal for freelancers and consultants starting out.",
  },
  {
    q: "Can I track time and invoices together?",
    a: "Yes, many invoicing platforms include time tracking features. This allows consultants to convert tracked hours directly into invoices.",
  },
  {
    q: "What should a consultant invoice include?",
    a: "A consultant invoice should include services provided, hourly rates, total amount, payment terms, and client details for clarity and professionalism.",
  },
  {
    q: "How do consultants get paid faster?",
    a: "Using online invoicing software with payment integrations helps consultants receive payments faster through automated reminders and easy checkout.",
  },
]

export default function InvoicingContent() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <>
    <main className="bg-white">

      {/* HERO */}
      <section className="py-20 bg-gradient-to-b from-yellow-50 to-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center px-6">

          {/* LEFT */}
          <div>
            <span className="inline-block mb-4 text-sm bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
              Built for Freelancers 🚀
            </span>

            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Invoicing Software for Consultants
            </h1>

            <p className="text-gray-600 mt-4 text-lg">
              Still using spreadsheets or manual billing? Consultants lose time and delay payments with outdated workflows.
            </p>

            <p className="text-gray-500 mt-4">
              Use smart billing software with invoice automation, payment tracking, and online invoicing to streamline your process and get paid faster.
            </p>

         <div className="mt-6 flex gap-4">
  <Link
    href="https://smapey.com/invoicing-app"
    className="bg-yellow-500 text-white px-6 py-3 rounded-xl shadow hover:shadow-lg hover:-translate-y-1 transition inline-block"
  >
    View Invoicing App →
  </Link>

  <Link
    href="https://smapey.com/register?product=INVOICE&plan=FREE"
    className="border px-6 py-3 rounded-xl hover:bg-gray-50 inline-block"
  >
    Start Free
  </Link>
</div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative">
            <div className="absolute inset-0 bg-yellow-200 blur-3xl opacity-30 rounded-full"></div>
            <img
              src="/images/consultant-invoice-dashboard.png"
              alt="invoicing software for consultants dashboard"
              className="relative rounded-2xl shadow-xl border"
            />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-6">
        <Feature icon={<FileText />} title="Invoice Automation" desc="Create and send professional invoices instantly with automated workflows." />
        <Feature icon={<CreditCard />} title="Online Payments" desc="Accept payments online and reduce delays with integrated payment options." />
        <Feature icon={<Clock />} title="Payment Tracking" desc="Track invoice status and send reminders to improve cash flow." />
        <Feature icon={<BarChart3 />} title="Reporting" desc="Get insights into your billing software performance and revenue." />
      </section>

      {/* SEO CONTENT */}
      <section className="py-10 max-w-3xl mx-auto px-6 text-gray-600">
        <p>
          Whether you're a consultant, electrician, plumber, or working in construction,
          having a reliable contractor invoicing app is essential. Modern billing software
          simplifies your estimate and invoice workflow, helping professionals manage projects,
          track payments, and deliver accurate invoices without manual work.
        </p>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="bg-gray-900 text-white rounded-2xl text-center py-16 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold">
            Get Paid Faster with Smarter Invoicing
          </h2>

      <Link href="https://smapey.com/register?product=INVOICE&plan=FREE">
  <button className="mt-6 bg-yellow-500 px-6 py-3 rounded-xl shadow hover:shadow-lg hover:-translate-y-1 transition">
    Start Free Trial
  </button>
</Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 max-w-3xl mx-auto px-6">
        <h2 className="text-2xl font-bold text-center mb-8">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((f, i) => (
            <div
              key={i}
              className="border rounded-xl p-5 hover:shadow-lg hover:border-yellow-500 transition cursor-pointer"
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

    </main>
     <InternalLinks />
                </>
  )
}

function Feature({ icon, title, desc }: any) {
  return (
    <div className="border rounded-xl p-6 hover:shadow-lg transition">
      <div className="mb-3 text-yellow-500">{icon}</div>
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-gray-600 mt-2">{desc}</p>
    </div>
  )
}