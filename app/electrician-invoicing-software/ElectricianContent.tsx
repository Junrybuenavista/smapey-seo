"use client"

import Link from "next/link"
import InternalLinks from "@/components/InternalLinks"
import Image from "next/image"
import {
  FileText,
  CreditCard,
  BarChart,
  Zap,
} from "lucide-react"
import { useState } from "react"

const faqs = [
  {
    q: "What should an electrician invoice include?",
    a: "An electrician invoice should include your business details, client information, services provided, labor and material costs, total amount, and payment terms. Using an electrician invoice template ensures consistency and professionalism.",
  },
  {
    q: "Is there a free electrician invoice template?",
    a: "Yes, you can use a free electrician invoice template, but most lack automation. With Smapey, you get a free invoicing tool plus automation, tracking, and online payments.",
  },
  {
    q: "Can I create electrician invoices online?",
    a: "Yes, Smapey allows electricians to create invoices online instantly. You can generate, send, and manage invoices from anywhere.",
  },
  {
    q: "How do electricians track payments?",
    a: "Electricians can track payments using invoicing software that shows paid, pending, and overdue invoices in one dashboard.",
  },
  {
    q: "What is the best invoicing software for electricians?",
    a: "The best invoicing software for electricians includes automation, payment tracking, and estimate-to-invoice workflow—like Smapey.",
  },
  {
    q: "Can I convert estimates into invoices?",
    a: "Yes, Smapey lets you convert estimates into invoices in one click, making your workflow faster and more efficient.",
  },
]

export default function InvoicingContent() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <>
    <main>

      {/* HERO */}
      <section className="py-20 bg-gradient-to-b from-yellow-50 to-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">

          {/* LEFT */}
          <div>
            <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">
              Built for Freelancers 🚀
            </span>

            <h1 className="text-4xl md:text-5xl font-bold mt-4">
              Electrician Invoice Template That Gets You Paid Faster
            </h1>

            <p className="text-lg text-gray-600 mt-4">
              Stop using spreadsheets and outdated electrician invoice templates. 
              Create, send, and track invoices in seconds with our smart invoicing app.
            </p>

            <p className="text-gray-600 mt-3">
              Smapey helps electricians manage billing software, automate invoices, 
              and streamline estimate and invoice workflow for faster payments.
            </p>

            <div className="flex gap-4 mt-6 flex-wrap">
              <Link
                href="https://app.smapey.com/invoicing-app"
                className="bg-yellow-500 text-white px-6 py-3 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-1 transition"
              >
                View Invoicing App →
              </Link>

              <Link
                href="https://app.smapey.com/register?product=INVOICE&plan=FREE"
                className="border border-gray-300 px-6 py-3 rounded-xl hover:border-yellow-500 hover:text-yellow-600 transition"
              >
                Start Free
              </Link>
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative">
            <div className="absolute inset-0 bg-yellow-300 blur-3xl opacity-20"></div>
            <Image
              src="/images/electrician.png"
              alt="electrician invoice template dashboard UI"
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

          <Feature
            icon={<Zap />}
            title="Invoice Automation"
            desc="Automatically generate invoices for electrical jobs and recurring clients."
          />

          <Feature
            icon={<CreditCard />}
            title="Online Payments"
            desc="Accept payments online and reduce delays with fast checkout options."
          />

          <Feature
            icon={<BarChart />}
            title="Payment Tracking"
            desc="Track paid, pending, and overdue invoices in real-time."
          />

          <Feature
            icon={<FileText />}
            title="Reporting & Insights"
            desc="Get financial insights and improve your billing workflow."
          />
        </div>
      </section>

      {/* SEO CONTENT */}
      <section className="py-16 max-w-3xl mx-auto px-6 text-center">
        <p className="text-gray-600 leading-relaxed">
          Smapey is more than just an electrician invoice template—it’s a complete contractor invoicing app.
          Whether you're an electrician, plumber, or construction professional, our billing software helps you
          manage your estimate and invoice workflow efficiently. Create professional invoices, track payments,
          and grow your business with ease.
        </p>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto bg-gray-900 text-white rounded-2xl text-center py-16 px-6">
          <h2 className="text-3xl font-bold">
            Get Paid Faster with Smarter Invoicing
          </h2>

          <Link
            href="https://app.smapey.com/register?product=INVOICE&plan=FREE"
            className="inline-block mt-6 bg-yellow-500 px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl hover:-translate-y-1 transition"
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
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="border rounded-xl p-5 hover:shadow-md hover:border-yellow-500 transition cursor-pointer"
              onClick={() =>
                setOpenIndex(openIndex === i ? null : i)
              }
            >
              <h3 className="font-semibold">{faq.q}</h3>
              {openIndex === i && (
                <p className="text-gray-600 mt-2">{faq.a}</p>
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
      <div className="text-yellow-500 mb-3">{icon}</div>
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-gray-600 mt-2">{desc}</p>
    </div>
  )
}