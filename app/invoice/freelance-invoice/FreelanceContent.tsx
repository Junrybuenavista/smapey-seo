"use client"

import Link from "next/link"
import { CheckCircle2, ArrowRight, XCircle } from "lucide-react"
import InternalLinks from "@/components/InternalLinks"
import Footer from "@/components/Footer"

export default function FreelanceInvoiceGuide() {
  return (
    <>
    <div className="bg-white">
      {/* HERO */}
      <section className="relative bg-[#060D1F] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-blue-500/15 blur-[140px] rounded-full pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-6 py-24 lg:py-32 text-center space-y-7">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-medium px-4 py-1.5 rounded-full mx-auto">
            Freelance Invoice Guide 2026
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
            Freelance Invoice Template & Guide —{" "}
            <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Get Paid Faster</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Struggling with late payments? Learn how to create professional freelance invoices, avoid common mistakes, and get paid faster — with free templates included.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <Link href="/invoice/invoice-generation-online">
              <button className="group flex items-center gap-2 px-7 py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold transition-all shadow-lg shadow-blue-600/25 hover:scale-[1.02]">
                Free Invoice Generator <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </Link>
            <Link href="/invoice/free-invoice-template">
              <button className="px-7 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-medium transition-all">
                Free Invoice Template
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* WHY INVOICING MATTERS */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          <h2 className="text-3xl font-bold text-gray-900">Why Freelance Invoices Matter</h2>
          <p className="text-gray-600 leading-relaxed">
            Poor invoicing is one of the biggest reasons freelancers experience delayed payments. A clear, professional invoice builds trust, reduces confusion, and helps you get paid on time.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {["Reduces late payments", "Builds professionalism and trust", "Keeps financial records organized", "Prevents disputes with clients"].map(item => (
              <div key={item} className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm text-gray-700">
                <CheckCircle2 size={15} className="text-green-500 flex-shrink-0" />{item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INVOICE PREVIEW */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Freelance Invoice Example</h2>
          <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-100">
            <div className="flex justify-between mb-8">
              <div>
                <p className="font-bold text-lg text-gray-900">Your Freelance Business</p>
                <p className="text-sm text-gray-500">you@email.com</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-xl text-gray-900">INVOICE</p>
                <p className="text-sm text-gray-500">#F-001</p>
                <p className="text-sm text-gray-500">Date: Aug 1, 2026</p>
              </div>
            </div>
            <div className="mb-6">
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-1">Billed To</p>
              <p className="font-medium text-gray-900">Client Name</p>
              <p className="text-sm text-gray-500">client@email.com</p>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-left text-gray-500 text-xs uppercase tracking-widest">
                  <th className="py-2">Service</th>
                  <th className="py-2">Qty</th>
                  <th className="py-2">Rate</th>
                  <th className="py-2 text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { service: "Website Design", qty: 1, rate: "$300", total: "$300" },
                  { service: "Development", qty: 1, rate: "$700", total: "$700" },
                ].map(row => (
                  <tr key={row.service} className="border-b border-gray-100">
                    <td className="py-3 text-gray-700">{row.service}</td>
                    <td className="py-3 text-gray-700">{row.qty}</td>
                    <td className="py-3 text-gray-700">{row.rate}</td>
                    <td className="py-3 text-right text-gray-700">{row.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-end mt-6">
              <div className="text-right space-y-1">
                <p className="text-sm text-gray-500">Subtotal: $1,000</p>
                <p className="text-xl font-bold text-blue-600">Total: $1,000</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CHECKLIST */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          <h2 className="text-3xl font-bold text-gray-900">What to Include in a Freelance Invoice</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              "Your business name and contact details",
              "Client information",
              "Invoice number and dates",
              "Detailed list of services",
              "Pricing and total amount",
              "Payment terms (Net 7, Net 15, etc.)",
              "Payment methods (PayPal, bank transfer)",
            ].map(item => (
              <div key={item} className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm text-gray-700">
                <CheckCircle2 size={15} className="text-green-500 flex-shrink-0" />{item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STEP GUIDE */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-5xl mx-auto space-y-10">
          <h2 className="text-3xl font-bold text-gray-900 text-center">How to Create a Freelance Invoice</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { step: "1", title: "Add Client Details", desc: "Include name, email, and business information." },
              { step: "2", title: "List Services Clearly", desc: "Break down your work into clear line items." },
              { step: "3", title: "Set Payment Terms", desc: "Define due date and accepted payment methods." },
            ].map(item => (
              <div key={item.step} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                <div className="w-9 h-9 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mb-4">{item.step}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MISTAKES */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          <h2 className="text-3xl font-bold text-gray-900">Common Invoice Mistakes to Avoid</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              "Missing invoice number or dates",
              "Vague descriptions like 'design work'",
              "Incorrect totals",
              "No payment terms",
              "Not following up on unpaid invoices",
            ].map(item => (
              <div key={item} className="flex items-center gap-3 bg-red-50 border border-red-100 rounded-xl px-4 py-3 text-sm text-gray-700">
                <XCircle size={15} className="text-red-400 flex-shrink-0" />{item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#060D1F] py-20 px-6">
        <div className="max-w-3xl mx-auto text-center text-white space-y-6">
          <h2 className="text-4xl font-bold">Start Creating Professional Invoices Today</h2>
          <p className="text-gray-400 text-lg">Save time, get paid faster, and grow your freelance business.</p>
          <Link href="https://app.smapey.com/register?product=INVOICE&plan=FREE">
            <button className="group flex items-center gap-2 mx-auto px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold transition-all shadow-lg hover:scale-[1.02]">
              Try Smapey Free <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </Link>
          <p className="text-sm text-gray-500">No credit card required</p>
        </div>
      </section>
    </div>
    <InternalLinks />
    <Footer />
    </>
  )
}
