
import Link from "next/link"
import { CheckCircle, FileText, Calculator, Send, Clock, CreditCard, Layers, Hash } from "lucide-react"
import Footer from "@/components/Footer"
import InternalLinks from "@/components/InternalLinks"

export default function HowToCreateInvoicePage() {
  return (
    <>
    <div className="bg-white text-gray-800">
      
      {/* HERO */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-24 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold leading-tight mb-6">
            How to Create an Invoice Like a Pro
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-10">
            Step-by-step guide, templates, and automation tips to create invoices that get paid faster.
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link href="/invoice/invoice-generation-online">
              <button className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold shadow hover:scale-105 transition">
                Create Invoice Free
              </button>
            </Link>
            <Link href="/invoice/free-invoice-template">
              <button className="border border-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition">
                Download Templates
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* WHAT IS INVOICE */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-6">What is an Invoice?</h2>
        <p className="text-gray-600 leading-relaxed">
          An invoice is a document that businesses send to clients to request payment for products or services. 
          It includes details such as items sold, total amount due, payment terms, and due date. 
          A well-structured invoice helps with accounting, recordkeeping, and getting paid faster.
        </p>
      </section>

      {/* FEATURES */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-8">
        {[
          { icon: FileText, title: "Professional Format", desc: "Use structured invoices that look credible and clear." },
          { icon: Calculator, title: "Accurate Totals", desc: "Automatically calculate totals, taxes, and discounts." },
          { icon: Send, title: "Faster Payments", desc: "Clear payment terms help you get paid quicker." },
        ].map((item, i) => (
          <div key={i} className="p-6 rounded-2xl border shadow-sm hover:shadow-lg transition">
            <item.icon className="w-8 h-8 text-blue-600 mb-4" />
            <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
            <p className="text-gray-600">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* STEPS */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center">
            Step-by-Step: Create an Invoice
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              { icon: FileText, title: "Business Info", desc: "Add your company name, logo, and contact details." },
              { icon: Layers, title: "Client Details", desc: "Include your client's billing information." },
              { icon: Hash, title: "Invoice Number", desc: "Assign a unique invoice number for tracking and compliance." },
              { icon: Clock, title: "Dates", desc: "Add issue date and payment due date." },
              { icon: Calculator, title: "Line Items", desc: "List products/services with quantity and price." },
              { icon: CreditCard, title: "Payment Info", desc: "Add payment methods, terms, and instructions." },
            ].map((step, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white shadow border">
                <step.icon className="w-6 h-6 text-blue-600 mb-3" />
                <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CHECKLIST */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-10 text-center">
          What to Include on an Invoice
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {[
            "Business name & contact details",
            "Client name and billing address",
            "Unique invoice number",
            "Invoice date and due date",
            "Itemized list of services/products",
            "Subtotal, taxes, and discounts",
            "Total amount due",
            "Payment terms and instructions",
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <CheckCircle className="text-green-500" />
              <p>{item}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FORMATS */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center">
            Invoice Formats: Which One Should You Use?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Word / Google Docs", desc: "Simple and easy for beginners." },
              { title: "Excel / Sheets", desc: "Best for calculations and tracking." },
              { title: "Invoice Software", desc: "Best for automation, reminders, and payments." },
            ].map((item, i) => (
              <div key={i} className="p-6 bg-white rounded-2xl shadow border">
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PAYMENT TERMS */}
      <section className="max-w-5xl mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-bold mb-6">Payment Terms & Getting Paid Faster</h2>
        <p className="text-gray-600 mb-6">
          Use clear terms like <strong>Net 30</strong>, <strong>Net 15</strong>, or <strong>Due on Receipt</strong>. 
          Always include payment instructions and offer multiple payment methods.
        </p>

        <div className="bg-gray-50 p-6 rounded-2xl shadow">
          <p className="text-gray-700">
            Pro Tip: Send reminders before and after due dates to improve collection rates.
          </p>
        </div>
      </section>

      {/* TYPES */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center">Types of Invoices</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              "Standard invoice (one-time billing)",
              "Recurring invoice (subscriptions)",
              "Deposit or partial payment invoice",
              "Commercial invoice (international trade)",
            ].map((type, i) => (
              <div key={i} className="p-6 bg-white rounded-2xl shadow border">
                <p className="text-gray-700">{type}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MISTAKES */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-10 text-center">Common Invoice Mistakes</h2>

        <div className="grid md:grid-cols-2 gap-6">
          {[
            "Missing payment instructions",
            "No invoice number",
            "Vague service descriptions",
            "Not setting clear due dates",
            "Forgetting taxes or totals",
            "Not sending reminders",
          ].map((mistake, i) => (
            <div key={i} className="flex items-center gap-3">
              <CheckCircle className="text-red-500" />
              <p>{mistake}</p>
            </div>
          ))}
        </div>
      </section>
                    <InternalLinks/>
      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-3xl p-12 text-center shadow-xl">
          <h2 className="text-3xl font-bold mb-4">Create Your Invoice Now</h2>
          <p className="text-blue-100 mb-6">Generate, send, and track invoices in seconds.</p>

          <Link href="https://app.smapey.com/register?product=INVOICE&plan=FREE">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold shadow hover:scale-105 transition">
              Try Our Smapey App
            </button>
          </Link>
        </div>
      </section>

    </div>
    <Footer/></>
  )
}
