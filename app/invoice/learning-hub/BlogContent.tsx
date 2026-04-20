"use client"

import Link from "next/link"
import {
  Calculator,
  PenTool,
  Send,
  FileText,
  Eye,
  User,
  Download,
  BookOpen,
  FileSignature,
  FileSpreadsheet,
} from "lucide-react"
import InternalLinks from "@/components/InternalLinks"
import Footer from "@/components/Footer"

export default function BlogSection() {

  const colorMap: any = {
    blue: "bg-blue-50 text-blue-600 group-hover:text-blue-600",
    green: "bg-green-50 text-green-600 group-hover:text-green-600",
    purple: "bg-purple-50 text-purple-600 group-hover:text-purple-600",
    orange: "bg-orange-50 text-orange-600 group-hover:text-orange-600",
    pink: "bg-pink-50 text-pink-600 group-hover:text-pink-600",
    indigo: "bg-indigo-50 text-indigo-600 group-hover:text-indigo-600",
    teal: "bg-teal-50 text-teal-600 group-hover:text-teal-600",
  }

  const items = [
    {
      href: "invoice-generation-online",
      icon: Calculator,
      color: "blue",
      title: "Free Invoice Generator (Create Instantly)",
      desc: "Generate professional invoices online instantly with automatic calculations.",
    },
    {
      href: "how-to-create-invoice",
      icon: PenTool,
      color: "green",
      title: "How to Create an Invoice (Step-by-Step Guide)",
      desc: "Learn how to create a professional invoice with examples and templates.",
    },
    {
      href: "how-to-send-invoice",
      icon: Send,
      color: "purple",
      title: "How to Send an Invoice to Clients",
      desc: "Discover how to send invoices properly and get paid faster.",
    },
    {
      href: "how-to-make-invoice",
      icon: FileText,
      color: "orange",
      title: "How to Make an Invoice (Simple Guide)",
      desc: "A beginner-friendly guide to making invoices quickly and easily.",
    },
    {
      href: "invoice-example",
      icon: Eye,
      color: "pink",
      title: "Invoice Example (Simple Format)",
      desc: "See a real invoice example with proper format and structure.",
    },
    {
      href: "freelance-invoice",
      icon: User,
      color: "indigo",
      title: "Freelance Invoice Guide",
      desc: "Learn how freelancers bill clients professionally and get paid faster.",
    },
    {
      href: "free-invoice-template",
      icon: Download,
      color: "teal",
      title: "Free Invoice Template (Download & Customize)",
      desc: "Use free invoice templates to save time and create professional invoices.",
    },

    // 🔥 NEW SEO PAGES (YOURS)
    {
      href: "what-is-an-invoice",
      icon: BookOpen,
      color: "blue",
      title: "What is an Invoice? (Complete Guide)",
      desc: "Understand what an invoice is, what to include, and how to use it in your business.",
    },
    {
      href: "pro-forma-invoice",
      icon: FileSignature,
      color: "purple",
      title: "Pro Forma Invoice (Meaning & Example)",
      desc: "Learn when to use a pro forma invoice and how it differs from a standard invoice.",
    },
    {
      href: "google-docs-invoice-template",
      icon: FileSpreadsheet,
      color: "green",
      title: "Google Docs Invoice Template (Free Download)",
      desc: "Download a free template or learn how to automate your invoicing workflow.",
    },
  ]

  return (
    <>
    <section className="mt-32 max-w-6xl mx-auto px-6 py-16">

      {/* HEADER */}
      <div className="text-center mb-20">
        <span className="inline-block text-sm font-medium bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full mb-4">
          Learning Hub
        </span>

        <h1 className="text-3xl md:text-5xl font-bold leading-tight tracking-tight">
          Learn How to Create and Send Invoices
        </h1>

        <p className="text-gray-600 mt-5 max-w-2xl mx-auto text-base md:text-lg">
          Step-by-step guides designed for freelancers and small businesses to
          create, send, and manage invoices like a professional.
        </p>
      </div>

      {/* GRID */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

        {items.map((item, i) => {
          const Icon = item.icon
          const color = colorMap[item.color]

          return (
            <Link
              key={i}
              href={item.href}
              className="group relative bg-white border border-gray-200 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              {/* ICON */}
              <div className={`mb-5 inline-flex p-3 rounded-xl ${color}`}>
                <Icon size={20} />
              </div>

              {/* TITLE */}
              <h3 className="font-semibold text-lg leading-snug transition">
                {item.title}
              </h3>

              {/* DESC */}
              <p className="text-sm text-gray-600 mt-3 leading-relaxed">
                {item.desc}
              </p>

              {/* HOVER ARROW */}
              <span className="absolute bottom-5 right-5 text-gray-300 group-hover:text-gray-500 transition">
                →
              </span>
            </Link>
          )
        })}
      </div>

      {/* DIVIDER */}
      <div className="my-16 h-px w-full bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

      <InternalLinks />

    </section>
    <Footer/>
    </>
  )
}