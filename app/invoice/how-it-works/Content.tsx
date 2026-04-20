"use client"
import Link from "next/link" 
import Footer from "@/components/Footer"
import { useState, useEffect } from "react"
export default function HowItWorks() {
   const [activeImage, setActiveImage] = useState<string | null>(null)

  // ESC to close
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveImage(null)
    }

    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [])
  const steps = [
    {
      title: "Create Your Free Account",
      desc: "Sign up in seconds and set up your business profile.",
      points: [
        "No credit card required",
        "Instant access",
        "Ready in under 1 minute",
      ],
    },
    {
      title: "Customize Your Branding",
      desc: "Add your logo and personalize your invoices.",
      points: [
        "Upload logo",
        "Set company details",
        "Choose invoice design",
      ],
    },
    {
  title: "Manage Your Team",
  desc: "Easily invite users and control access across your organization.",
  points: [
    "Invite users via email",
    "Set roles & permissions",
    "Secure account access",
  ],
},
    {
      title: "Send Invoices & Get Paid",
      desc: "Create, send, and track invoices in seconds.",
      points: [
        "Email invoices instantly",
        "Auto reminders",
        "Track payments easily",
      ],
    },
  ];

  return (
    <>
    <div className="bg-white">
      {/* HERO */}
<section className="py-32 bg-gradient-to-br from-[#0B1220] via-[#0F172A] to-black 
relative left-1/2 right-1/2 -mx-[50vw] w-screen px-6 lg:px-20 text-white">

  <div className="max-w-[1400px] mx-auto grid md:grid-cols-2 gap-20 items-center">

    {/* LEFT CONTENT */}
   {/* LEFT CONTENT */}
<div className="space-y-6">

  <h1 className="text-5xl md:text-6xl font-bold leading-tight">
    How It Works?
  </h1>

  <p className="text-gray-300 text-lg max-w-xl">
    Smapey makes invoicing simple. Create professional invoices, send them to clients,
    and get paid faster—all in just a few steps.
  </p>

  <p className="text-gray-300 text-lg max-w-xl">
    Whether you're a freelancer, contractor, or small business owner, Smapey helps you
    manage billing, track payments, and stay organized without the hassle.
  </p>

  {/* CTA */}
  <div className="pt-6 space-y-3">
    <Link href="/invoice/https://app.smapey.com/register?product=INVOICE&plan=FREE">
      <button className="px-8 py-4 bg-white text-black rounded-xl text-lg font-medium hover:scale-105 transition shadow-lg">
        Start Free & Try It →
      </button>
    </Link>

    <p className="text-sm text-gray-400">
      No credit card required. Start invoicing in minutes.
    </p>
  </div>

  {/* TRUST / STEPS PREVIEW */}
  <div className="flex flex-wrap gap-6 text-sm text-gray-400 pt-6">
    <span>✔ Create invoice</span>
    <span>✔ Send to client</span>
    <span>✔ Get paid</span>
  </div>

</div>

    {/* RIGHT VISUAL (NEW STYLE 🔥) */}
    <div className="relative flex justify-center items-center">

      {/* glow background */}
      <div className="absolute w-[500px] h-[500px] bg-blue-500/20 blur-[120px] rounded-full"></div>

      {/* MAIN DASHBOARD CARD */}
      <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl w-[380px] p-6">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <p className="text-sm text-gray-400">Dashboard</p>
          <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">
            Live
          </span>
        </div>

        {/* STATS */}
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Total Revenue</span>
            <span className="font-semibold">$12,450</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Pending</span>
            <span className="text-yellow-400">$2,300</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Paid</span>
            <span className="text-green-400">$10,150</span>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="border-t border-white/10 my-4"></div>

        {/* RECENT INVOICE */}
        <div className="space-y-2">
          <p className="text-sm text-gray-400">Recent Invoice</p>

          <div className="flex justify-between text-sm">
            <span>Client A</span>
            <span>$850</span>
          </div>

          <div className="flex justify-between text-sm">
            <span>Client B</span>
            <span className="text-green-400">Paid</span>
          </div>
        </div>

      </div>

      {/* FLOATING SMALL CARD */}
      <div className="absolute -bottom-10 -right-10 rotate-6">
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4 shadow-xl w-[220px]">
          <p className="text-xs text-gray-400">Payment Received</p>
          <p className="text-lg font-semibold mt-1">$1,200</p>
          <p className="text-green-400 text-xs mt-1">✔ Completed</p>
        </div>
      </div>

    </div>

  </div>
</section>

      {/* STEPS */}
      <section className="py-20 max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <div
              key={i}
              className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-xl transition"
            >
              <div className="text-blue-600 font-semibold mb-2">
                Step {i + 1}
              </div>

              <h3 className="text-lg font-bold mb-2">
                {step.title}
              </h3>

              <p className="text-gray-600 text-sm mb-4">
                {step.desc}
              </p>

              <ul className="text-sm text-gray-500 space-y-1">
                {step.points.map((p, idx) => (
                  <li key={idx}>• {p}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
  <section className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 space-y-20">

        {/* Feature 1 */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-sm font-semibold text-blue-600 mb-2">
              CREATE INVOICE
            </p>
            <h2 className="text-3xl font-bold mb-4">
              Create & send invoices in seconds
            </h2>
            <p className="text-gray-600 text-lg">
              Stop wasting time with manual invoices. Generate professional invoices instantly 
              and send them to your clients with one click — so you can focus on growing your business.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-3 hover:shadow-2xl transition">
            <div className="overflow-hidden rounded-xl">
              <img
                src="/how-it-works/createinvoice.png"
                alt="Create invoice UI"
                onClick={() => setActiveImage("/how-it-works/createinvoice.png")}
                className="w-full h-auto object-contain transition-transform duration-500 hover:scale-105 cursor-zoom-in"
              />
            </div>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 bg-white rounded-2xl shadow-lg p-3 hover:shadow-2xl transition">
            <div className="overflow-hidden rounded-xl">
              <img
                src="/how-it-works/dashboard-preview.png"
                alt="Dashboard preview"
                onClick={() => setActiveImage("/how-it-works/dashboard-preview.png")}
                className="w-full h-auto object-contain transition-transform duration-500 hover:scale-105 cursor-zoom-in"
              />
            </div>
          </div>

          <div className="order-1 md:order-2">
            <p className="text-sm font-semibold text-blue-600 mb-2">
              DASHBOARD
            </p>
            <h2 className="text-3xl font-bold mb-4">
              Manage all your invoices in one place
            </h2>
            <p className="text-gray-600 text-lg">
              Track invoices, clients, and payments from a clean dashboard. 
              Instantly see what’s paid, pending, or overdue — and take action without digging through spreadsheets.
            </p>
          </div>
        </div>

        {/* Feature 3 */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-sm font-semibold text-blue-600 mb-2">
              PROFESSIONAL INVOICES
            </p>
            <h2 className="text-3xl font-bold mb-4">
              Create invoices your clients will trust
            </h2>
            <p className="text-gray-600 text-lg">
              Send clean, detailed invoices with item breakdowns, taxes, and due dates. 
              Impress your clients and reduce confusion — making it easier for them to pay you faster.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-3 hover:shadow-2xl transition">
            <div className="overflow-hidden rounded-xl">
              <img
                src="/how-it-works/public-invoice.png"
                alt="Invoice preview"
                onClick={() => setActiveImage("/how-it-works/public-invoice.png")}
                className="w-full h-auto object-contain transition-transform duration-500 hover:scale-105 cursor-zoom-in"
              />
            </div>
          </div>
        </div>

        {/* Feature 4 */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 bg-white rounded-2xl shadow-lg p-3 hover:shadow-2xl transition">
            <div className="overflow-hidden rounded-xl">
              <img
                src="/how-it-works/invoice-dashboard.png"
                alt="Revenue dashboard"
                onClick={() => setActiveImage("/how-it-works/invoice-dashboard.png")}
                className="w-full h-auto object-contain transition-transform duration-500 hover:scale-105 cursor-zoom-in"
              />
            </div>
          </div>

          <div className="order-1 md:order-2">
            <p className="text-sm font-semibold text-blue-600 mb-2">
              ANALYTICS
            </p>
            <h2 className="text-3xl font-bold mb-4">
              Stay on top of your cash flow
            </h2>
            <p className="text-gray-600 text-lg">
              Monitor revenue, unpaid invoices, and payment trends in real time. 
              Make smarter decisions and never lose track of your business finances again.
            </p>
          </div>
        </div>

      </div>

      {/* 🔥 IMAGE ZOOM MODAL */}
      {activeImage && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-6"
          onClick={() => setActiveImage(null)}
        >
          <img
            src={activeImage}
            alt="Zoomed preview"
            className="max-w-full max-h-full rounded-xl shadow-2xl"
          />
        </div>
      )}
    </section>
    </div>
        <Footer />
        </>
        
  );
}