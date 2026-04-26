"use client"

import Link from "next/link"
import { FileText, CreditCard, BarChart3, Zap, CheckCircle2, ArrowRight, ChevronDown } from "lucide-react"
import { useState } from "react"
import InternalLinks from "@/components/InternalLinks"

const faqs = [
  { q: "What is the best invoicing software for auto repair shops?", a: "The best invoicing software for auto repair shops includes automation, payment tracking, and estimate-to-invoice workflows. Smapey is designed to simplify billing and improve cash flow for mechanics and repair businesses." },
  { q: "Can I use free invoicing software for auto repair?", a: "Yes, free invoicing tools can help small auto repair shops get started. However, advanced features like automation, reporting, and online payments are typically included in more complete invoicing software solutions." },
  { q: "How do auto repair shops send invoices?", a: "Auto repair shops usually use invoicing software to create and send invoices digitally. This allows faster billing, reduces errors, and improves payment tracking for customers." },
  { q: "Does invoicing software track payments?", a: "Yes, modern invoicing software includes payment tracking features that show which invoices are paid, pending, or overdue, helping repair shops manage cash flow effectively." },
  { q: "Can I create estimates and convert them to invoices?", a: "Yes, most invoicing software allows you to create estimates and convert them into invoices instantly. This helps streamline your workflow from quote to payment." },
  { q: "Is invoicing software better than Excel for auto repair?", a: "Yes, invoicing software is far more efficient than Excel because it automates billing, tracks payments, and reduces manual errors, making it ideal for auto repair businesses." },
]

export default function InvoicingContent() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <>
    <div className="bg-white">
      {/* HERO */}
      <section className="relative bg-[#060D1F] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-orange-500/10 blur-[140px] rounded-full pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-24 lg:py-32 grid lg:grid-cols-2 gap-14 items-center">
          <div className="space-y-7">
            <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 text-orange-300 text-sm font-medium px-4 py-1.5 rounded-full">
              <Zap size={13} /> Built for Auto Repair Shops
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
              Invoicing Software for Auto Repair Shops —{" "}
              <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">Get Paid Faster</span>
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
              Stop wasting time on manual invoices and spreadsheets. Automate invoicing, send professional bills, and track payments in real time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link href="https://app.smapey.com/register?product=INVOICE&plan=FREE">
                <button className="group flex items-center gap-2 px-7 py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold transition-all shadow-lg shadow-blue-600/25 hover:scale-[1.02]">
                  Start Free Trial <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                </button>
              </Link>
              <Link href="/invoice/how-it-works">
                <button className="px-7 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-medium transition-all">
                  View Invoicing App
                </button>
              </Link>
            </div>
            <div className="flex flex-wrap gap-5 text-sm text-gray-500 pt-1">
              {["No credit card required", "Cancel anytime", "Setup in minutes"].map(t => (
                <span key={t} className="flex items-center gap-1.5"><CheckCircle2 size={13} className="text-green-400" />{t}</span>
              ))}
            </div>
          </div>

          <div className="relative hidden lg:flex items-center justify-end">
            <div className="relative bg-white/5 border border-white/10 rounded-2xl p-8 w-full max-w-md space-y-5">
              <p className="text-xs text-gray-500 uppercase tracking-widest">Auto Repair Invoices</p>
              {[
                { label: "Brake replacement — Honda Civic", amount: "$540", status: "Paid", color: "text-green-400 bg-green-500/10" },
                { label: "Engine diagnostic — Ford F-150", amount: "$220", status: "Pending", color: "text-yellow-400 bg-yellow-500/10" },
                { label: "Oil change + tire rotation", amount: "$95", status: "Sent", color: "text-blue-400 bg-blue-500/10" },
              ].map(item => (
                <div key={item.label} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                  <div>
                    <p className="text-sm font-medium">{item.label}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{item.amount}</p>
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${item.color}`}>{item.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-7xl mx-auto space-y-14">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-widest">Features</span>
            <h2 className="text-4xl font-bold text-gray-900">Built for Auto Repair Billing</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Zap size={22} />, title: "Invoice Automation", desc: "Automatically generate repair invoices and reduce manual billing work.", color: "bg-orange-50 text-orange-600" },
              { icon: <CreditCard size={22} />, title: "Online Payments", desc: "Accept payments online and improve cash flow for your repair shop.", color: "bg-blue-50 text-blue-600" },
              { icon: <FileText size={22} />, title: "Payment Tracking", desc: "Track paid and unpaid invoices with real-time billing insights.", color: "bg-green-50 text-green-600" },
              { icon: <BarChart3 size={22} />, title: "Reporting", desc: "Analyze revenue, invoices, and customer payments easily.", color: "bg-purple-50 text-purple-600" },
            ].map(({ icon, title, desc, color }) => (
              <div key={title} className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${color}`}>{icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="bg-gray-50 py-24 px-6">
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="text-center space-y-4">
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-widest">Why Smapey</span>
            <h2 className="text-4xl font-bold text-gray-900">Complete Auto Shop Billing Software</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              More than just invoicing software for auto repair — a complete contractor invoicing app designed to streamline billing workflows from repair order to final payment.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              "Create repair invoices in under 2 minutes",
              "Convert repair estimates into invoices instantly",
              "Accept online payments from customers anywhere",
              "See real-time status of every job invoice",
              "Automated reminders reduce late payments",
              "Works for shops of all sizes",
            ].map(item => (
              <div key={item} className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl px-4 py-3 shadow-sm text-sm text-gray-700">
                <CheckCircle2 size={15} className="text-green-500 flex-shrink-0" />{item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#060D1F] py-20 px-6">
        <div className="max-w-3xl mx-auto text-center text-white space-y-6">
          <h2 className="text-4xl font-bold">Get Paid Faster with Smarter Invoicing</h2>
          <p className="text-gray-400 text-lg">Start sending professional auto repair invoices today.</p>
          <Link href="https://app.smapey.com/register?product=INVOICE&plan=FREE">
            <button className="group flex items-center gap-2 mx-auto px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold transition-all shadow-lg hover:scale-[1.02]">
              Start Free Trial <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </Link>
          <p className="text-sm text-gray-500">No credit card required</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-widest">FAQ</span>
            <h2 className="text-4xl font-bold text-gray-900">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-gray-100 rounded-xl bg-white shadow-sm overflow-hidden">
                <button onClick={() => setOpenIndex(openIndex === i ? null : i)} className="w-full flex justify-between items-center p-5 text-left">
                  <span className="font-medium text-gray-900">{faq.q}</span>
                  <ChevronDown size={18} className={`text-gray-400 transition-transform ${openIndex === i ? "rotate-180" : ""}`} />
                </button>
                {openIndex === i && <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed">{faq.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
    <InternalLinks />
    </>
  )
}
