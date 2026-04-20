"use client"
import Link from "next/link"
import { FileText, CheckCircle, HelpCircle } from "lucide-react"
import InternalLinks from "@/components/InternalLinks"
export default function GoogleDocsInvoiceContent() {
  return (
    <div className="bg-gradient-to-b from-white via-blue-50/30 to-white text-gray-800">

      {/* HERO */}
      <section className="relative py-28 px-6 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-blue-200/30 blur-[120px] rounded-full" />

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex bg-white border shadow-sm px-4 py-1.5 rounded-full text-sm text-gray-600">
            🧾 Free Invoice Template
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mt-6 leading-tight">
            Google Docs Invoice Template
            <span className="block text-blue-600">Free Download & Guide</span>
          </h1>

          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
            Download a free Google Docs invoice template and learn how to create professional invoices — or automate everything in seconds with modern invoicing software.
          </p>

          <div className="mt-8 flex justify-center gap-4 flex-wrap">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-sm">
              Download Free Template
            </button>
            <Link href="https://app.smapey.com/invoicing-app">
            <button className="bg-white border hover:bg-gray-50 px-6 py-3 rounded-xl">
                Try Smapey Free
            </button>
            </Link>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="max-w-4xl mx-auto px-6 py-16 space-y-6">
        <p className="text-lg">
          A Google Docs invoice template is a simple and accessible way to create invoices manually.
          It allows freelancers and small businesses to generate invoices quickly using a familiar tool.
        </p>

        <p>
          However, while templates are easy to use, they often require repetitive manual work and lack automation features that modern invoicing software provides.
        </p>
      </section>

      {/* HOW TO */}
      <section className="max-w-4xl mx-auto px-6 py-10 space-y-6">
        <h2 className="text-2xl font-semibold">How to create an invoice in Google Docs</h2>

        <p>
          Creating an invoice in Google Docs is straightforward, but requires manual setup each time.
        </p>

        <ol className="space-y-3 text-gray-700">
          <li>1. Open Google Docs and create a new document</li>
          <li>2. Add your business name and logo</li>
          <li>3. Include client details</li>
          <li>4. List products or services</li>
          <li>5. Add total amount and payment terms</li>
        </ol>

        <p>
          While this works for basic needs, it can become time-consuming as your business grows.
        </p>
      </section>

      {/* LIMITATIONS */}
      <section className="max-w-4xl mx-auto px-6 py-10 space-y-6">
        <h2 className="text-2xl font-semibold">Limitations of Google Docs invoice templates</h2>

        <p>
          Templates are helpful for beginners, but they come with several limitations that can slow down your workflow.
        </p>

        <ul className="space-y-3 text-gray-700">
          <li>• Manual editing for every invoice</li>
          <li>• No automation or recurring invoices</li>
          <li>• No payment tracking</li>
          <li>• Higher chance of errors</li>
        </ul>

        <div className="bg-white border rounded-2xl p-6 shadow-sm">
          💡 Tip: If you're sending invoices regularly, switching to invoicing software can save hours every week.
        </div>
      </section>

      {/* WHY SOFTWARE */}
      <section className="max-w-4xl mx-auto px-6 py-10 space-y-6">
        <h2 className="text-2xl font-semibold">Why switch to invoicing software?</h2>

        <p>
          Modern invoicing tools eliminate manual work and provide powerful features that help businesses grow.
        </p>

        <p>
          Instead of editing documents repeatedly, you can generate invoices instantly, automate reminders,
          and track payments in real time.
        </p>
      </section>

      {/* FEATURES */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">

          {[{
            icon: <FileText className="text-blue-600" />,
            title: "Free Template",
            desc: "Start quickly with ready-made invoice formats."
          },
          {
            icon: <CheckCircle className="text-blue-600" />,
            title: "Automation",
            desc: "Generate invoices instantly without manual work."
          },
          {
            icon: <FileText className="text-blue-600" />,
            title: "Real-Time Tracking",
            desc: "Know exactly when clients view and pay invoices."
          }].map((f, i) => (
            <div key={i} className="p-6 bg-white border rounded-2xl shadow-sm hover:shadow-md transition">
              <div className="mb-4">{f.icon}</div>
              <h3 className="font-semibold text-lg">{f.title}</h3>
              <p className="text-sm text-gray-600">{f.desc}</p>
            </div>
          ))}

        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center px-6">
        <div className="max-w-xl mx-auto bg-white border rounded-2xl p-10 shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">
            Stop Using Templates — Start Automating
          </h2>
          <p className="text-gray-600 mb-6">
            Save time, reduce errors, and get paid faster with smart invoicing software.
          </p>
          <Link href="https://app.smapey.com/invoicing-app">
          <button className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-3 rounded-xl">
            Try Smapey Free
          </button>
          </Link>
          
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 max-w-3xl mx-auto px-6">
        <h2 className="text-2xl font-semibold mb-8 text-center">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {[
            {
              q: "Is Google Docs good for invoicing?",
              a: "Yes, it works for basic invoicing, but it lacks automation and tracking features."
            },
            {
              q: "Can I send invoices from Google Docs?",
              a: "Yes, but you need to manually download or share the document each time."
            },
            {
              q: "What is better than invoice templates?",
              a: "Invoicing software is faster, more accurate, and fully automated."
            },
            {
              q: "Are free invoice templates enough for businesses?",
              a: "They are useful for beginners, but growing businesses need automation and tracking."
            },
          ].map((item, i) => (
            <div key={i} className="bg-white border rounded-xl p-5">
              <div className="flex gap-3 mb-2">
                <HelpCircle size={18} />
                <p className="font-medium">{item.q}</p>
              </div>
              <p className="text-sm text-gray-600">{item.a}</p>
            </div>
          ))}
        </div>
      </section>
          <InternalLinks />
    </div>
  )
}