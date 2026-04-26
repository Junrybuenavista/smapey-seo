"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Footer from "@/components/Footer"

export default function HowToMakeInvoicePage() {
  return (
    <>
    <div className="bg-white">

      {/* HERO */}
      <section className="relative bg-[#060D1F] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-blue-500/15 blur-[140px] rounded-full pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-24 lg:py-32 text-center space-y-7">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-medium px-4 py-1.5 rounded-full mx-auto">
            Beginner Invoice Guide
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
            How to Make an Invoice{" "}
            <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">That Gets You Paid Faster</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Learn step-by-step how to create professional invoices, avoid common mistakes, and follow best billing practices — even if you're a beginner.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <Link href="/invoice/invoice-generation-online">
              <button className="group flex items-center gap-2 px-7 py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold transition-all shadow-lg shadow-blue-600/25 hover:scale-[1.02]">
                Create Free Invoice <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </Link>
            <Link href="/invoice/how-to-create-invoice">
              <button className="px-7 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-medium transition-all">
                Learn Step-by-Step
              </button>
            </Link>
          </div>
          <div className="flex flex-wrap justify-center gap-5 text-sm text-gray-500 pt-1">
            {["Free", "No Signup Required", "Works Everywhere"].map(t => (
              <span key={t} className="flex items-center gap-1.5"><CheckCircle2 size={13} className="text-green-400" />{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT IS */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-4xl mx-auto space-y-5">
          <h2 className="text-3xl font-bold text-gray-900">What is an Invoice?</h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            An invoice is a formal request for payment sent to a client after delivering goods or services. It includes itemized charges, taxes, payment terms, and due dates. Invoices are essential for accounting, legal compliance, and tracking revenue.
          </p>
        </div>
      </section>

      {/* WHEN TO SEND */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-5xl mx-auto space-y-10">
          <h2 className="text-3xl font-bold text-gray-900 text-center">When Should You Send an Invoice?</h2>
          <p className="text-gray-500 text-center">The best time to send an invoice is immediately after completing a service or delivering a product. The sooner you send it, the faster you get paid.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Freelancers", desc: "Send after project completion or milestone delivery." },
              { title: "Businesses", desc: "Send invoices weekly or monthly depending on billing cycle." },
              { title: "Subscriptions", desc: "Automatically send recurring invoices every billing period." },
            ].map(item => (
              <div key={item.title} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY IMPORTANT */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-5xl mx-auto space-y-10">
          <h2 className="text-3xl font-bold text-gray-900">Why Invoices Are Important</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Get Paid Faster", desc: "Clear invoices reduce confusion and speed up payments." },
              { title: "Legal Protection", desc: "Invoices serve as proof of transactions and agreements." },
              { title: "Tax Compliance", desc: "Required for VAT reporting and business records." },
            ].map(item => (
              <div key={item.title} className="p-6 bg-gray-50 border border-gray-100 rounded-2xl shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPONENTS */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-5xl mx-auto space-y-8">
          <h2 className="text-3xl font-bold text-gray-900">Key Components of an Invoice</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              "Invoice Number (unique ID)",
              "Issue Date & Due Date",
              "Seller Details (Name, Address)",
              "Client Details",
              "Line Items (Description, Qty, Price)",
              "Subtotal, Tax, Total",
              "Payment Terms (Net 15 / Net 30)",
              "Notes or Instructions",
            ].map(item => (
              <div key={item} className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl px-4 py-3 shadow-sm text-sm text-gray-700">
                <CheckCircle2 size={15} className="text-green-500 flex-shrink-0" />{item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STEPS */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-5xl mx-auto space-y-10">
          <h2 className="text-3xl font-bold text-gray-900">Step-by-Step: How to Make an Invoice</h2>
          <div className="space-y-4">
            {[
              "Add your business details (Name, Address)",
              "Add client information",
              "Generate a unique invoice number",
              "Set issue date and due date",
              "Add line items (products/services)",
              "Calculate subtotal, tax, and total",
              "Define payment terms (Net 30, etc.)",
              "Send invoice immediately",
            ].map((step, i) => (
              <div key={i} className="flex gap-4 items-start bg-gray-50 p-5 rounded-xl border border-gray-100">
                <div className="w-9 h-9 flex items-center justify-center bg-blue-600 text-white rounded-full font-bold text-sm flex-shrink-0">{i + 1}</div>
                <p className="text-gray-700 pt-1.5">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MISTAKES */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          <h2 className="text-3xl font-bold text-gray-900">Common Invoice Mistakes to Avoid</h2>
          <ul className="space-y-3 text-gray-600">
            {["Missing due date", "Incorrect totals or tax calculation", "No invoice number", "Sending invoice late", "Missing client details"].map(m => (
              <li key={m} className="flex items-center gap-3 text-sm"><span className="text-red-500 font-bold">✕</span>{m}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              { q: "Do I need an invoice?", a: "Yes, invoices are important for tracking payments, accounting, and tax compliance." },
              { q: "What is a due date?", a: "The due date is when the client must pay the invoice (e.g., 7 or 30 days after issue)." },
              { q: "Can I send invoices online?", a: "Yes, you can send invoices via email or use an online invoice generator like Smapey." },
            ].map(item => (
              <div key={item.q} className="border border-gray-100 rounded-xl p-5 bg-gray-50">
                <h3 className="font-semibold text-gray-900 mb-2">{item.q}</h3>
                <p className="text-sm text-gray-500">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#060D1F] py-20 px-6">
        <div className="max-w-3xl mx-auto text-center text-white space-y-6">
          <h2 className="text-4xl font-bold">Stop Wasting Time on Manual Invoices</h2>
          <p className="text-gray-400 text-lg">Create professional invoices in seconds and get paid faster.</p>
          <Link href="/invoice/invoice-generation-online">
            <button className="group flex items-center gap-2 mx-auto px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold transition-all shadow-lg hover:scale-[1.02]">
              Create Free Invoice <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </Link>
          <p className="text-sm text-gray-500">No signup required</p>
        </div>
      </section>

    </div>
    <Footer />
    </>
  );
}