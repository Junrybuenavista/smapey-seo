
import Link from "next/link"
import { CheckCircle, FileText, Calculator, Send, Clock, CreditCard, Layers, Hash, ArrowRight } from "lucide-react"
import Footer from "@/components/Footer"
import InternalLinks from "@/components/InternalLinks"

export default function HowToCreateInvoicePage() {
  return (
    <>
    <div className="bg-white">

      {/* HERO */}
      <section className="relative bg-[#060D1F] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-blue-500/15 blur-[140px] rounded-full pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-24 lg:py-32 text-center space-y-7">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-medium px-4 py-1.5 rounded-full mx-auto">
            Complete Invoice Guide
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
            How to Create an Invoice —{" "}
            <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Like a Pro</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Step-by-step guide, templates, and automation tips to create invoices that get paid faster.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <Link href="/invoice/invoice-generation-online">
              <button className="group flex items-center gap-2 px-7 py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold transition-all shadow-lg shadow-blue-600/25 hover:scale-[1.02]">
                Create Invoice Free <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </Link>
            <Link href="/invoice/free-invoice-template">
              <button className="px-7 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-medium transition-all">
                Download Templates
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* WHAT IS */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-4xl mx-auto space-y-5">
          <h2 className="text-3xl font-bold text-gray-900">What is an Invoice?</h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            An invoice is a document that businesses send to clients to request payment for products or services. It includes details such as items sold, total amount due, payment terms, and due date. A well-structured invoice helps with accounting, recordkeeping, and getting paid faster.
          </p>
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
          {[
            { icon: FileText, title: "Professional Format", desc: "Use structured invoices that look credible and clear." },
            { icon: Calculator, title: "Accurate Totals", desc: "Automatically calculate totals, taxes, and discounts." },
            { icon: Send, title: "Faster Payments", desc: "Clear payment terms help you get paid quicker." },
          ].map((item) => (
            <div key={item.title} className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 bg-blue-50 text-blue-600">
                <item.icon size={22} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* STEPS */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-5xl mx-auto space-y-10">
          <h2 className="text-3xl font-bold text-gray-900 text-center">Step-by-Step: Create an Invoice</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: FileText, step: "1", title: "Business Info", desc: "Add your company name, logo, and contact details." },
              { icon: Layers, step: "2", title: "Client Details", desc: "Include your client's billing information." },
              { icon: Hash, step: "3", title: "Invoice Number", desc: "Assign a unique invoice number for tracking and compliance." },
              { icon: Clock, step: "4", title: "Dates", desc: "Add issue date and payment due date." },
              { icon: Calculator, step: "5", title: "Line Items", desc: "List products/services with quantity and price." },
              { icon: CreditCard, step: "6", title: "Payment Info", desc: "Add payment methods, terms, and instructions." },
            ].map((s) => (
              <div key={s.step} className="flex gap-4 items-start bg-gray-50 p-5 rounded-xl border border-gray-100">
                <div className="w-9 h-9 flex items-center justify-center bg-blue-600 text-white rounded-full font-bold text-sm flex-shrink-0">{s.step}</div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{s.title}</h3>
                  <p className="text-sm text-gray-500">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CHECKLIST */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-5xl mx-auto space-y-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center">What to Include on an Invoice</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              "Business name & contact details",
              "Client name and billing address",
              "Unique invoice number",
              "Invoice date and due date",
              "Itemized list of services/products",
              "Subtotal, taxes, and discounts",
              "Total amount due",
              "Payment terms and instructions",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl px-4 py-3 shadow-sm text-sm text-gray-700">
                <CheckCircle size={15} className="text-green-500 flex-shrink-0" />{item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FORMATS */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-5xl mx-auto space-y-10">
          <h2 className="text-3xl font-bold text-gray-900 text-center">Invoice Formats: Which Should You Use?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Word / Google Docs", desc: "Simple and easy for beginners." },
              { title: "Excel / Sheets", desc: "Best for calculations and tracking." },
              { title: "Invoice Software", desc: "Best for automation, reminders, and payments.", highlight: true },
            ].map((item) => (
              <div key={item.title} className={`p-6 rounded-2xl border shadow-sm ${item.highlight ? "border-blue-200 bg-blue-50" : "border-gray-100 bg-gray-50"}`}>
                <h3 className={`font-semibold mb-2 ${item.highlight ? "text-blue-700" : "text-gray-900"}`}>{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <InternalLinks />

      {/* CTA */}
      <section className="bg-[#060D1F] py-20 px-6">
        <div className="max-w-3xl mx-auto text-center text-white space-y-6">
          <h2 className="text-4xl font-bold">Create Your Invoice Now</h2>
          <p className="text-gray-400 text-lg">Generate, send, and track invoices in seconds.</p>
          <Link href="https://app.smapey.com/register?product=INVOICE&plan=FREE">
            <button className="group flex items-center gap-2 mx-auto px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold transition-all shadow-lg hover:scale-[1.02]">
              Try Smapey Free <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </Link>
          <p className="text-sm text-gray-500">No credit card required</p>
        </div>
      </section>

    </div>
    <Footer />
    </>
  )
}
