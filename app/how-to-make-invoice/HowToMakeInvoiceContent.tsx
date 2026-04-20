"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Footer from "@/components/Footer"

export default function HowToMakeInvoicePage() {
  return (
    <>
    <div className="bg-white text-gray-800">
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-100" />

        <div className="relative max-w-6xl mx-auto px-6 py-20 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold leading-tight mb-6"
          >
            How to Make an Invoice
            <span className="text-blue-600 block mt-2">
              That Gets You Paid Faster
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Learn step-by-step how to create professional invoices, avoid common
            mistakes, and follow Philippines BIR requirements — even if you're a
            beginner.
          </motion.p>

          {/* CTA */}
          <div className="mt-10 flex justify-center gap-4 flex-wrap">
            <Link
              href="/"
              className="bg-blue-600 text-white px-8 py-4 rounded-2xl shadow-lg hover:bg-blue-700 transition font-semibold"
            >
              Create Free Invoice
            </Link>

            <Link
              href="#steps"
              className="px-8 py-4 rounded-2xl border border-gray-300 hover:bg-gray-100 transition"
            >
              Learn Step-by-Step
            </Link>
          </div>

          {/* TRUST BADGES */}
          <div className="mt-10 text-sm text-gray-500">
            ✔ Free • ✔ No Signup Required • ✔ BIR Ready
          </div>
        </div>
      </section>

      {/* ================= INTRO ================= */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-4">
          What is an Invoice?
        </h2>
        <p className="text-gray-600 leading-relaxed text-lg">
          An invoice is a formal request for payment sent to a client after
          delivering goods or services. It includes itemized charges, taxes,
          payment terms, and due dates. Invoices are essential for accounting,
          legal compliance, and tracking revenue.
        </p>
      </section>

      <section className="mt-16 max-w-3xl mx-auto">
  <h2 className="text-3xl font-bold text-center">
    When Should You Send an Invoice?
  </h2>

  <p className="text-gray-600 mt-6 text-center">
    The best time to send an invoice is immediately after completing a service
    or delivering a product. The sooner you send it, the faster you get paid.
  </p>

  <div className="mt-8 grid md:grid-cols-3 gap-6">

    <div className="bg-white border rounded-xl p-5">
      <h3 className="font-semibold">Freelancers</h3>
      <p className="text-sm text-gray-600 mt-2">
        Send after project completion or milestone delivery.
      </p>
    </div>

    <div className="bg-white border rounded-xl p-5">
      <h3 className="font-semibold">Businesses</h3>
      <p className="text-sm text-gray-600 mt-2">
        Send invoices weekly or monthly depending on billing cycle.
      </p>
    </div>

    <div className="bg-white border rounded-xl p-5">
      <h3 className="font-semibold">Subscriptions</h3>
      <p className="text-sm text-gray-600 mt-2">
        Automatically send recurring invoices every billing period.
      </p>
    </div>

  </div>
</section>
<div className="my-16 h-px w-full bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

      {/* ================= WHY IMPORTANT ================= */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8">
            Why Invoices Are Important
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Get Paid Faster",
                desc: "Clear invoices reduce confusion and speed up payments.",
              },
              {
                title: "Legal Protection",
                desc: "Invoices serve as proof of transactions and agreements.",
              },
              {
                title: "Tax Compliance",
                desc: "Required for VAT reporting and business records.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-2xl shadow border"
              >
                <h3 className="font-semibold text-lg mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= COMPONENTS ================= */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-8">
          Key Components of an Invoice
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {[
            "Invoice Number (unique ID)",
            "Issue Date & Due Date",
            "Seller Details (Name, Address, TIN)",
            "Client Details",
            "Line Items (Description, Qty, Price)",
            "Subtotal, VAT, Total",
            "Payment Terms (Net 15 / Net 30)",
            "Notes or Instructions",
          ].map((item, i) => (
            <div
              key={i}
              className="p-5 border rounded-xl hover:shadow transition"
            >
              {item}
            </div>
          ))}
        </div>
      </section>
             <section className="bg-blue-600 text-white text-center py-20 px-6">
        <h2 className="text-4xl font-bold mb-4">
          Start Creating Invoices Today
        </h2>

        <p className="mb-8 text-blue-100 max-w-xl mx-auto">
          Save time, avoid mistakes, and get paid faster using our free invoice
          generator.
        </p>

        <Link
          href="/"
          className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-semibold shadow hover:bg-gray-100"
        >
          Generate Invoice Now
        </Link>
      </section>

      {/* ================= STEPS ================= */}
      <section id="steps" className="bg-gray-50 py-16">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8">
            Step-by-Step: How to Make an Invoice
          </h2>

          <div className="space-y-6">
            {[
              "Add your business details (Name, Address, TIN)",
              "Add client information",
              "Generate a unique invoice number",
              "Set issue date and due date",
              "Add line items (products/services)",
              "Calculate subtotal, VAT (12%), and total",
              "Define payment terms (Net 30, etc.)",
              "Send invoice immediately",
            ].map((step, i) => (
              <div
                key={i}
                className="flex gap-4 items-start bg-white p-5 rounded-xl border"
              >
                <div className="w-8 h-8 flex items-center justify-center bg-blue-600 text-white rounded-full font-bold">
                  {i + 1}
                </div>
                <p className="text-gray-600">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-20 max-w-3xl mx-auto">
  <h2 className="text-3xl font-bold text-center">
    Best Payment Methods to Include
  </h2>

  <p className="text-gray-600 mt-6 text-center">
    The easier you make it for clients to pay, the faster you get paid.
  </p>

  <div className="grid md:grid-cols-2 gap-6 mt-10">

    {[
      "Bank Transfer",
      "GCash / Maya",
      "Credit/Debit Card",
      "PayPal",
      "Cash",
      "Online payment links"
    ].map((method, i) => (
      <div key={i} className="bg-green-50 border border-green-100 p-4 rounded-xl">
        💳 {method}
      </div>
    ))}

  </div>
</section>

      {/* ================= COMMON MISTAKES ================= */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-6">
          Common Invoice Mistakes to Avoid
        </h2>

        <ul className="space-y-3 text-gray-600">
          <li>❌ Missing due date</li>
          <li>❌ Incorrect totals or tax calculation</li>
          <li>❌ No invoice number</li>
          <li>❌ Sending invoice late</li>
          <li>❌ Missing client details</li>
        </ul>
      </section>


      {/* ================= PH SECTION ================= */}
      <section className="bg-blue-50 py-16">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6">
            Philippines Invoice Requirements (BIR)
          </h2>

          <div className="grid md:grid-cols-2 gap-6 text-gray-700">
            <ul className="space-y-2">
              <li>✔ Must include TIN</li>
              <li>✔ Sales Invoice (not OR)</li>
              <li>✔ VAT (12%) if applicable</li>
            </ul>

            <ul className="space-y-2">
              <li>✔ Authority to Print (ATP)</li>
              <li>✔ Sequential numbering</li>
              <li>✔ Itemized breakdown required</li>
            </ul>
          </div>
        </div>
      </section>
      
      {/* ================= CTA ================= */}
     

      <section className="mt-24 max-w-3xl mx-auto">
  <h2 className="text-3xl font-bold text-center">
    Frequently Asked Questions
  </h2>

  <div className="mt-10 space-y-6">

    <div>
      <h3 className="font-semibold">Do I need an invoice?</h3>
      <p className="text-gray-600 text-sm mt-2">
        Yes, invoices are important for tracking payments, accounting, and tax compliance.
      </p>
    </div>

    <div>
      <h3 className="font-semibold">What is a due date?</h3>
      <p className="text-gray-600 text-sm mt-2">
        The due date is when the client must pay the invoice (e.g., 7 or 30 days).
      </p>
    </div>

    <div>
      <h3 className="font-semibold">Can I send invoices online?</h3>
      <p className="text-gray-600 text-sm mt-2">
        Yes, you can send invoices via email or use an online invoice generator.
      </p>
    </div>

  </div>
</section>
<div className="mt-24 mb-24 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-3xl p-12 text-center max-w-4xl mx-auto shadow-xl">

          <h3 className="text-3xl font-bold">
            Stop Wasting Time on Manual Invoices
          </h3>

          <p className="mt-4 text-blue-100">
            Create professional invoices in seconds and get paid faster.
          </p>

          <a
            href="/invoice-generation-online"
            className="inline-block mt-8 bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100"
          >
            Create Free Invoice →
          </a>

        </div>
    </div>

    

    <Footer/></>
  );
}