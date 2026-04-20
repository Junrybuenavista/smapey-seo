"use client"
import Link from "next/link"
import { FileText, CreditCard, BarChart3, Zap } from "lucide-react"
import InternalLinks from "@/components/InternalLinks"
import { useState } from "react"

export default function InvoicingContent() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

const faqs = [
  {
    q: "What is the best invoicing software for auto repair shops?",
    a: "The best invoicing software for auto repair shops includes automation, payment tracking, and estimate-to-invoice workflows. Smapey is designed to simplify billing and improve cash flow for mechanics and repair businesses.",
  },
  {
    q: "Can I use free invoicing software for auto repair?",
    a: "Yes, free invoicing tools can help small auto repair shops get started. However, advanced features like automation, reporting, and online payments are typically included in more complete invoicing software solutions.",
  },
  {
    q: "How do auto repair shops send invoices?",
    a: "Auto repair shops usually use invoicing software to create and send invoices digitally. This allows faster billing, reduces errors, and improves payment tracking for customers.",
  },
  {
    q: "Does invoicing software track payments?",
    a: "Yes, modern invoicing software includes payment tracking features that show which invoices are paid, pending, or overdue, helping repair shops manage cash flow effectively.",
  },
  {
    q: "Can I create estimates and convert them to invoices?",
    a: "Yes, most invoicing software allows you to create estimates and convert them into invoices instantly. This helps streamline your workflow from quote to payment.",
  },
  {
    q: "Is invoicing software better than Excel for auto repair?",
    a: "Yes, invoicing software is far more efficient than Excel because it automates billing, tracks payments, and reduces manual errors, making it ideal for auto repair businesses.",
  },
]
  return (
    <>
    <div className="bg-white">

      {/* HERO */}
     <section className="relative py-20">
  {/* Background */}
  <div className="absolute inset-0 bg-gradient-to-b from-yellow-50 to-white -z-10" />

  <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

    {/* LEFT CONTENT */}
    <div className="text-center md:text-left">

      {/* Badge */}
      <div className="inline-block mb-4 px-3 py-1 text-sm font-medium bg-yellow-100 text-yellow-700 rounded-full">
        Built for Auto Repair Shops 🚗
      </div>

      {/* Headline */}
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
        Invoicing Software for Auto Repair Shops
      </h1>

      {/* Content */}
      <p className="text-lg text-gray-600 mb-4 leading-relaxed">
        Stop wasting time on manual invoices, spreadsheets, and delayed payments. Auto repair shops often struggle with billing inefficiencies and tracking customer payments.
      </p>

      <p className="text-gray-500 mb-6 leading-relaxed">
        Smapey helps mechanics automate invoicing, send professional invoices, and track payments in real time—making it the ideal auto repair invoice software for faster and more accurate billing.
      </p>

      {/* CTA */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
        <a
          href="/invoice/how-it-works"
          className="bg-yellow-500 text-black px-6 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
        >
          View Invoicing App →
        </a>

        <a
          href="/invoice/https://app.smapey.com/register?product=INVOICE&plan=FREE"
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
        src="/images/auto-repair-invoice-dashboard.png"
        alt="invoicing software for auto repair shops dashboard"
        loading="lazy"
        className="relative rounded-2xl shadow-xl border border-gray-100"
      />
    </div>

  </div>
</section>
      {/* FEATURES */}
      <section className="py-20 max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-8">

        <div>
          <Zap className="mb-3" />
          <h3 className="font-semibold">Invoice Automation</h3>
          <p className="text-sm text-gray-600 mt-2">
            Automatically generate repair invoices and reduce manual billing work.
          </p>
        </div>

        <div>
          <CreditCard className="mb-3" />
          <h3 className="font-semibold">Online Payments</h3>
          <p className="text-sm text-gray-600 mt-2">
            Accept payments online and improve cash flow for your repair shop.
          </p>
        </div>

        <div>
          <FileText className="mb-3" />
          <h3 className="font-semibold">Payment Tracking</h3>
          <p className="text-sm text-gray-600 mt-2">
            Track paid and unpaid invoices with real-time billing insights.
          </p>
        </div>

        <div>
          <BarChart3 className="mb-3" />
          <h3 className="font-semibold">Reporting</h3>
          <p className="text-sm text-gray-600 mt-2">
            Analyze revenue, invoices, and customer payments easily.
          </p>
        </div>

      </section>

      {/* SEO BLOCK */}
      <section className="max-w-4xl mx-auto px-6 pb-20 text-gray-700">
        <p>
          Smapey is more than just invoicing software for auto repair—it’s a complete
          contractor invoicing app designed to streamline billing workflows. Whether
          you're managing repair orders, estimates, or customer invoices, this billing
          software simplifies everything from quote creation to final payment collection.
          It’s ideal not only for mechanics but also for electricians, plumbers, and
          construction businesses that need a fast and reliable invoicing system.
        </p>
      </section>

      {/* CTA */}
      <section className="bg-black text-white py-20 text-center">
        <h2 className="text-3xl font-semibold">
          Get Paid Faster with Smarter Invoicing
        </h2>

        <a
          href="/invoice/https://app.smapey.com/register?product=INVOICE&plan=FREE"
          className="inline-block mt-6 px-8 py-4 bg-white text-black rounded-xl"
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
        Frequently Asked Questions
      </h2>
      <p className="text-gray-500 mt-2">
        Everything auto repair shops need to know about invoicing
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
                isOpen ? "max-h-96 pb-5" : "max-h-0"
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