import Link from "next/link"
import { Mail, Link as LinkIcon, FileText, Clock, CreditCard, CheckCircle, AlertCircle, Send } from "lucide-react"
import Footer from "@/components/Footer"

export default function HowToSendInvoicePage() {
  return (
    <>
    <div className="bg-white text-gray-800">

      {/* HERO */}
      <section className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-24 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">How to Send an Invoice (Step-by-Step)</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            Send professional invoices by email or secure link, get paid faster, and follow up like a pro.
          </p>

          <div className="flex gap-4 justify-center flex-col md:flex-row">
            <Link href="/invoice-generation-online">
              <button className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold shadow hover:scale-105 transition">
                Create & Send Invoice Free
              </button>
            </Link>
            <Link href="/free-invoice-template">
              <button className="border border-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition">
                Download Template
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* WHAT IS */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-6">What is an Invoice?</h2>
        <p className="text-gray-600 leading-relaxed">
          An invoice is a formal request for payment that lists products or services provided, including totals,
          due date, and payment instructions. A clear invoice helps avoid confusion and speeds up payment.
        </p>

        <p className="mt-4 text-gray-600">
          If you haven’t created one yet, check our guide on{" "}
          <Link href="/how-to-create-invoice" className="text-blue-600 font-medium underline">
            how to create an invoice
          </Link>
          .
        </p>
      </section>

      {/* WHEN TO SEND */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center">When Should You Send an Invoice?</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Before Work", desc: "Use for deposits or upfront payments." },
              { title: "After Completion", desc: "Send immediately after finishing work." },
              { title: "Recurring", desc: "Automate monthly or subscription invoices." },
            ].map((item, i) => (
              <div key={i} className="p-6 bg-white rounded-2xl shadow border">
                <Clock className="text-blue-600 mb-3" />
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STEPS */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-10 text-center">How to Send an Invoice</h2>

        <div className="grid md:grid-cols-2 gap-8">
          {[
            { icon: FileText, title: "Create Invoice", desc: "Use a template or invoicing software." },
            { icon: CheckCircle, title: "Add Details", desc: "Ensure totals, due date, and payment info are clear." },
            { icon: CreditCard, title: "Add Payment Methods", desc: "Include card, bank transfer, or e-wallet." },
            { icon: Mail, title: "Send via Email", desc: "Attach PDF or send invoice link." },
            { icon: LinkIcon, title: "Use Payment Link", desc: "Allow clients to pay instantly online." },
            { icon: Send, title: "Follow Up", desc: "Send reminders before and after due date." },
          ].map((step, i) => (
            <div key={i} className="p-6 bg-gray-50 rounded-2xl shadow border">
              <step.icon className="text-blue-600 mb-3" />
              <h3 className="font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* METHODS */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center">Best Ways to Send an Invoice</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Email (PDF)", desc: "Most common and professional method." },
              { title: "Invoice Software", desc: "Track views, automate reminders, and get paid faster." },
              { title: "Payment Link", desc: "Quickest option for mobile-first clients." },
            ].map((item, i) => (
              <div key={i} className="p-6 bg-white rounded-2xl shadow border">
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>

          <p className="text-center mt-8 text-gray-600">
            Want to compare tools? See our guide on{" "}
            <Link href="/invoice-processing-software" className="text-blue-600 underline">
              invoice processing software
            </Link>
            .
          </p>
        </div>
      </section>

      {/* FOLLOW UP TIMELINE */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-10 text-center">Invoice Follow-Up Timeline</h2>

        <div className="grid md:grid-cols-4 gap-6">
          {[
            { title: "Send Invoice", desc: "Include payment link and due date." },
            { title: "Before Due", desc: "Friendly reminder 3–5 days before." },
            { title: "Due Date", desc: "Send a 'due today' reminder." },
            { title: "Overdue", desc: "Follow up politely and ask for payment." },
          ].map((item, i) => (
            <div key={i} className="p-5 bg-gray-50 rounded-xl border">
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* EMAIL TEMPLATE */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-6">Invoice Email Template</h2>

        <div className="bg-gray-50 p-6 rounded-2xl shadow border">
          <p className="text-gray-700 whitespace-pre-line">
Subject: Invoice INV-001 from Your Business

Hi [Client Name],

Attached is your invoice for [service/project].

Total: $XXX
Due: [Date]

You can pay via: [payment link]

Let me know if you have any questions.

Thanks,
[Your Name]
          </p>
        </div>
      </section>

      {/* INTERNAL LINKS SECTION */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Learn More About Invoicing</h2>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/invoice-example" className="text-blue-600 underline">Invoice Example</Link>
            <Link href="/invoice-template" className="text-blue-600 underline">Invoice Templates</Link>
            <Link href="/how-to-create-invoice" className="text-blue-600 underline">Create Invoice Guide</Link>
            <Link href="/invoice-free-tool" className="text-blue-600 underline">Free Invoice Tool</Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-3xl p-12 text-center shadow-xl">
          <h2 className="text-3xl font-bold mb-4">Create & Send Your Invoice Now</h2>
          <p className="text-blue-100 mb-6">Start sending professional invoices in minutes.</p>

          <Link href="https://app.smapey.com/invoicing-app">
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
