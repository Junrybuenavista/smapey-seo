"use client"

import Link from "next/link"
import { FileText, Wand2, LayoutTemplate, ArrowRight } from "lucide-react"
import InternalLinks from "@/components/InternalLinks"
import Footer from "@/components/Footer"

export default function InvoiceFreeToolPage() {
  return (
    <>
    <main className="relative overflow-hidden">

      {/* BACKGROUND GRADIENT */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-gray-50 via-white to-white" />

      <div className="max-w-6xl mx-auto px-6 py-20">

        {/* HERO */}
        <section className="text-center mb-20">
          <span className="inline-block mb-4 px-3 py-1 text-sm bg-gray-100 rounded-full">
            🚀 100% Free Invoice Tool
          </span>

          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Create Professional Invoices
            <span className="block text-gray-400">
              Instantly & For Free
            </span>
          </h1>

          <p className="text-gray-500 mt-6 max-w-2xl mx-auto text-lg">
            Generate, customize, and download invoices in seconds.
            No signup required. Built for freelancers and businesses.
          </p>

          <div className="flex justify-center gap-4 mt-8 flex-wrap">
            <Link
              href="invoice-generation-online"
              className="bg-black text-white px-7 py-3.5 rounded-xl flex items-center gap-2 hover:scale-105 transition"
            >
              <Wand2 size={18} />
              Create Invoice Now
            </Link>

            <Link
              href="free-invoice-template"
              className="border px-7 py-3.5 rounded-xl flex items-center gap-2 hover:bg-gray-100 transition"
            >
              <LayoutTemplate size={18} />
              Browse Templates
            </Link>
          </div>
        </section>

        {/* FEATURES */}
        <section className="grid md:grid-cols-3 gap-6 mb-24">
          {[
            {
              icon: <FileText />,
              title: "Instant Invoice Generator",
              desc: "Create invoices in seconds with our easy-to-use tool.",
            },
            {
              icon: <LayoutTemplate />,
              title: "Premium Templates",
              desc: "Modern, clean, and professional invoice designs.",
            },
            {
              icon: <Wand2 />,
              title: "Fully Customizable",
              desc: "Add logo, client info, and items with ease.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="group border bg-white/70 backdrop-blur p-6 rounded-2xl hover:shadow-xl transition"
            >
              <div className="mb-4 text-gray-700 group-hover:scale-110 transition">
                {item.icon}
              </div>
              <h3 className="font-semibold text-lg">{item.title}</h3>
              <p className="text-gray-500 mt-2 text-sm">{item.desc}</p>
            </div>
          ))}
        </section>

        {/* CHOICE SECTION */}
        <section className="mb-24">
          <h2 className="text-2xl font-bold mb-8 text-center">
            Choose How You Want to Create Your Invoice
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            {/* GENERATOR */}
            <div className="group border bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 hover:shadow-xl transition">
              <h3 className="text-xl font-semibold mb-2">
                Online Invoice Generator
              </h3>
              <p className="text-gray-500 mb-6">
                Quickly generate invoices using our interactive builder.
              </p>

              <Link
                href="invoice-generation-online"
                className="flex items-center gap-2 font-medium group-hover:gap-3 transition"
              >
                Start Generating <ArrowRight size={16} />
              </Link>
            </div>

            {/* TEMPLATE */}
            <div className="group border bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 hover:shadow-xl transition">
              <h3 className="text-xl font-semibold mb-2">
                Free Invoice Templates
              </h3>
              <p className="text-gray-500 mb-6">
                Download ready-made templates instantly.
              </p>

              <Link
                href="free-invoice-template"
                className="flex items-center gap-2 font-medium group-hover:gap-3 transition"
              >
                View Templates <ArrowRight size={16} />
              </Link>
            </div>

          </div>
        </section>

        {/* CONTENT */}
        <section className="max-w-3xl mx-auto mb-24 text-center">
          <h2 className="text-2xl font-bold mb-4">
            What is an Invoice Free Tool?
          </h2>
          <p className="text-gray-600">
            An invoice free tool allows you to create professional invoices
            without paying for expensive software. Perfect for freelancers,
            startups, and businesses needing quick billing.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8 text-sm">
            {[
              "No registration",
              "Unlimited invoices",
              "Download as PDF",
              "Modern templates",
              "Easy customization",
              "Fast & simple",
            ].map((item, i) => (
              <div
                key={i}
                className="bg-gray-50 border rounded-lg py-2 px-3"
              >
                ✓ {item}
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <div className="bg-black text-white rounded-3xl py-12 px-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Start Creating Your Invoice for Free
            </h2>
            <p className="text-gray-300 mb-6">
              No sign up. No limits. Just create and download.
            </p>

            <Link
              href="invoice-generation-online"
              className="bg-white text-black px-8 py-3 rounded-xl inline-flex items-center gap-2 hover:opacity-90"
            >
              Create Invoice Now
            </Link>
          </div>
        </section>
  <InternalLinks />
      </div>
      
    </main>
     <Footer />
    </>
  )
}