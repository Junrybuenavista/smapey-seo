"use client"
import Link from "next/link"
import { FileText, CreditCard, BarChart3, Zap } from "lucide-react"
import InternalLinks from "@/components/InternalLinks"
import { useState } from "react"

export default function InvoicingContent() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

const faqs = [
  {
    q: "What is the best invoicing software for contractors?",
    a: "The best invoicing software for contractors includes features like invoice automation, payment tracking, and estimate-to-invoice conversion. Tools like Smapey simplify contractor billing workflows and help businesses get paid faster.",
  },
  {
    q: "Is there free invoicing software for contractors?",
    a: "Yes, many platforms offer free invoicing software for contractors with essential features like invoice creation and payment tracking. Smapey provides a free plan that helps contractors manage billing efficiently.",
  },
  {
    q: "How do contractors create invoices?",
    a: "Contractors create invoices by listing services, materials, pricing, and client details. Using invoicing software automates this process and reduces manual errors while saving time.",
  },
  {
    q: "Can invoicing software track payments?",
    a: "Yes, modern contractor invoicing software includes real-time payment tracking and reporting features. This helps contractors monitor paid, pending, and overdue invoices easily.",
  },
  {
    q: "Does invoicing software include estimates?",
    a: "Many contractor invoicing apps allow users to create estimates and convert them into invoices. This streamlines the workflow from quote to payment and improves efficiency.",
  },
]
  return (
    <>
    <div className="bg-gray-50 min-h-screen">

      {/* HERO */}
    <section className="relative py-20">
  {/* Background */}
  <div className="absolute inset-0 bg-gradient-to-b from-yellow-50 to-white -z-10" />

  <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

    {/* LEFT CONTENT */}
    <div className="text-center md:text-left">

      {/* Badge */}
      <div className="inline-block mb-4 px-3 py-1 text-sm font-medium bg-yellow-100 text-yellow-700 rounded-full">
        Built for Contractors 🛠️
      </div>

      {/* Headline */}
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
        Invoicing Software for Contractors
      </h1>

      {/* Content */}
      <p className="text-lg text-gray-600 mb-4 leading-relaxed">
        Stop using spreadsheets and manual invoices. Contractors waste hours on billing, chasing payments, and managing paperwork.
      </p>

      <p className="text-gray-500 mb-6 leading-relaxed">
        Smapey automates your contractor invoicing workflow—helping electricians, plumbers, and construction professionals send invoices faster, track payments, and get paid on time.
      </p>

      {/* CTA */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
        <a
          href="https://app.smapey.com/invoicing-app"
          className="bg-yellow-500 text-black px-6 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
        >
          View Invoicing App →
        </a>

        <a
          href="https://app.smapey.com/register?product=INVOICE&plan=FREE"
          className="border border-gray-300 px-6 py-3 rounded-xl font-semibold text-gray-700 hover:border-yellow-500 hover:text-yellow-600 transition-all duration-300"
        >
          Start Free
        </a>
      </div>
    </div>

    {/* RIGHT IMAGE */}
    <div className="relative">
      <div className="absolute inset-0 bg-yellow-100 rounded-2xl blur-2xl opacity-40"></div>

      <img
        src="/images/contractor-invoicing-dashboard.png"
        alt="invoicing software for contractors dashboard"
        className="relative rounded-2xl shadow-xl border border-gray-100"
      />
    </div>

  </div>
</section>

      {/* FEATURES */}
      <section className="max-w-6xl mx-auto py-20 px-6 grid md:grid-cols-4 gap-6">

        <div className="bg-white p-6 rounded-xl shadow">
          <Zap />
          <h3 className="font-semibold mt-3">Invoice Automation</h3>
          <p className="text-sm text-gray-600">
            Automatically generate invoices and reduce manual work for contractor billing.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <BarChart3 />
          <h3 className="font-semibold mt-3">Payment Tracking</h3>
          <p className="text-sm text-gray-600">
            Track paid and unpaid invoices in real time with smart reporting tools.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <CreditCard />
          <h3 className="font-semibold mt-3">Online Payments</h3>
          <p className="text-sm text-gray-600">
            Accept online payments and get paid faster from clients anywhere.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <FileText />
          <h3 className="font-semibold mt-3">Reporting</h3>
          <p className="text-sm text-gray-600">
            Generate financial reports and manage contractor income efficiently.
          </p>
        </div>

      </section>

      {/* SEO BLOCK */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <p className="text-gray-700 leading-relaxed">
          Invoicing software for contractors helps streamline billing processes,
          reduce manual errors, and improve cash flow. Whether you're an
          electrician, plumber, or construction contractor, using a contractor
          invoicing app allows you to create estimates, convert them into
          invoices, and track payments in one place. Modern billing software
          replaces spreadsheets and simplifies job-based invoicing workflows.
        </p>
      </section>

      {/* CTA */}
      <section className="bg-black text-white text-center py-16">
        <h2 className="text-3xl font-bold">
          Get Paid Faster with Smarter Invoicing
        </h2>

        <a
          href="https://app.smapey.com/register?product=INVOICE&plan=FREE"
          className="inline-block mt-6 bg-white text-black px-6 py-3 rounded-xl hover:scale-105 transition"
        >
          Start Free Trial
        </a>
      </section>

      {/* FAQ */}
    <section className="mt-20">
  <div className="max-w-3xl mx-auto px-6">

    {/* Header */}
    <div className="text-center mb-10">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
        Common Questions About Contractor Invoicing Software
      </h2>
      <p className="text-gray-500 mt-2">
        Everything contractors need to know about invoicing and payments
      </p>
    </div>

    {/* FAQ Cards */}
    <div className="space-y-4">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index

        return (
          <div
            key={index}
            className="group border border-gray-200 rounded-xl bg-white transition-all duration-300 hover:shadow-md hover:border-yellow-500"
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="w-full text-left p-5 flex justify-between items-center"
            >
              <h3 className="font-semibold text-gray-900 group-hover:text-yellow-600 transition-colors">
                {faq.q}
              </h3>

              <span
                className={`ml-4 text-xl transition-transform duration-300 ${
                  isOpen ? "rotate-45 text-yellow-500" : "text-gray-400"
                }`}
              >
                +
              </span>
            </button>

            <div
              className={`px-5 overflow-hidden transition-all duration-300 ${
                isOpen ? "max-h-40 pb-5" : "max-h-0"
              }`}
            >
              <p className="text-gray-600 leading-relaxed">
                {faq.a}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  </div>
</section>
    </div>
           <InternalLinks />
        </>
  )
}