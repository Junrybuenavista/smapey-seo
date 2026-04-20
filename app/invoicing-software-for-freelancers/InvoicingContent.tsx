"use client"

import Link from "next/link"
import {
  FileText,
  CreditCard,
  BarChart3,
  RefreshCcw,
} from "lucide-react"
import InternalLinks from "@/components/InternalLinks"
import { useState } from "react"

export default function InvoicingContent() {
    const [openIndex, setOpenIndex] = useState<number | null>(null)

        const faqs = [
        {
            q: "What is the best invoicing software for freelancers?",
            a: "The best invoicing software for freelancers should automate billing, track payments, and support online payments. Smapey combines all these features in one simple platform.",
        },
        {
            q: "Is there free invoicing software for freelancers?",
            a: "Yes, many tools offer free plans. Smapey provides a free invoicing solution that includes essential features like invoice creation and payment tracking.",
        },
        {
            q: "How do freelancers create invoices?",
            a: "Freelancers can create invoices using invoicing software by adding client details, services, and pricing. Automation tools like Smapey simplify this process.",
        },
        {
            q: "Can invoicing software track payments?",
            a: "Yes, modern invoicing apps track payments automatically and show real-time invoice status such as paid or overdue.",
        },
        {
            q: "What is the difference between estimates and invoices?",
            a: "An estimate is a price quote sent before work starts, while an invoice is a request for payment after services are completed.",
        },
        ]
  return (
    <>
    <div className="px-6 py-12 max-w-5xl mx-auto">

      {/* HERO */}
   <section className="relative py-20">
  {/* Background Glow */}
  <div className="absolute inset-0 bg-gradient-to-b from-yellow-50 to-white -z-10" />

  <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
    
    {/* LEFT CONTENT */}
    <div className="text-center md:text-left">
      
      {/* Badge */}
      <div className="inline-block mb-4 px-3 py-1 text-sm font-medium bg-yellow-100 text-yellow-700 rounded-full">
        Built for Freelancers 🚀
      </div>

      {/* Headline */}
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-gray-900 mb-6">
        Invoicing Software for Freelancers
      </h1>

      {/* Description */}
      <p className="text-lg text-gray-600 mb-4 leading-relaxed">
        Still using spreadsheets or manual billing? Freelancers often lose time chasing payments and managing invoices manually.
      </p>

      <p className="text-gray-500 mb-6 leading-relaxed">
        Smapey automates your invoicing workflow so you can send invoices faster, track payments, and get paid on time.
      </p>

      {/* CTA */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
        <Link
          href="https://app.smapey.com/invoicing-app"
          className="bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
        >
          View Invoicing App →
        </Link>

        <Link
          href="https://app.smapey.com/register?product=INVOICE&plan=FREE"
          className="border border-gray-300 px-6 py-3 rounded-lg font-semibold text-gray-700 hover:border-yellow-500 hover:text-yellow-600 transition-all duration-300"
        >
          Start Free
        </Link>
      </div>
    </div>

    {/* RIGHT IMAGE */}
    <div className="relative">
      <div className="absolute inset-0 bg-yellow-100 rounded-2xl blur-2xl opacity-40"></div>

      <img
        src="/images/freelancer-invoicing-dashboard.png"
        alt="invoicing software for freelancers dashboard"
        className="relative rounded-2xl shadow-xl border border-gray-100"
      />
    </div>

  </div>
</section>

      {/* FEATURES */}
      <section className="grid md:grid-cols-2 gap-6">

        <div className="border p-5 rounded-xl">
          <FileText className="mb-3" />
          <h3 className="font-semibold">Invoice Automation</h3>
          <p className="text-sm text-gray-600">
            Automatically create and send invoices to clients, reducing manual work and improving billing efficiency.
          </p>
        </div>

        <div className="border p-5 rounded-xl">
          <RefreshCcw className="mb-3" />
          <h3 className="font-semibold">Payment Tracking</h3>
          <p className="text-sm text-gray-600">
            Track invoice status in real time and monitor paid, pending, and overdue invoices easily.
          </p>
        </div>

        <div className="border p-5 rounded-xl">
          <CreditCard className="mb-3" />
          <h3 className="font-semibold">Online Payments</h3>
          <p className="text-sm text-gray-600">
            Accept online payments through integrated payment systems and get paid faster.
          </p>
        </div>

        <div className="border p-5 rounded-xl">
          <BarChart3 className="mb-3" />
          <h3 className="font-semibold">Reporting</h3>
          <p className="text-sm text-gray-600">
            Generate reports to track income, client activity, and overall business performance.
          </p>
        </div>

      </section>

      {/* SEO CONTENT */}
      <section className="mt-12 text-gray-700">
        <p>
          Smapey is not just invoicing software for freelancers—it also works as a powerful contractor invoicing app for industries like electricians, plumbers, and construction professionals. Whether you need a billing software solution or an estimate and invoice workflow, Smapey simplifies your entire process from quote to payment.
        </p>
      </section>

      {/* CTA */}
      <section className="mt-12 bg-black text-white p-10 rounded-xl text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Get Paid Faster with Smarter Invoicing
        </h2>

        <Link
          href="https://app.smapey.com/register?product=INVOICE&plan=FREE"
          className="bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold"
        >
          Start Free Trial
        </Link>
      </section>

      {/* FAQ */}
      <section className="mt-20">
  <div className="max-w-3xl mx-auto">

    {/* Header */}
    <div className="text-center mb-10">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
        Frequently Asked Questions
      </h2>
      <p className="text-gray-500 mt-2">
        Everything freelancers need to know about invoicing
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

            {/* Answer */}
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