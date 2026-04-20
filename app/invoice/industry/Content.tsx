"use client"

import Link from "next/link"
import Footer from "@/components/Footer"

const industries = [
  {
  title: "invoice processing software",
  href: "invoice-processing-software",
  desc: "Automate billing workflows and get paid faster with smart invoicing software.",
  },
  {
    title: "Consultant Invoice Software",
    href: "invoicing-software-for-consultants",
    desc: "Create professional invoices, track payments, and get paid faster as a consultant.",
  },
  {
    title: "Freelancer Invoice Software",
    href: "invoicing-software-for-freelancers",
    desc: "Create invoices faster, track payments, and automate billing for freelance work.",
  },
  {
    title: "Auto Repair Invoice Software",
    href: "invoicing-software-for-auto-repair",
    desc: "Create invoices faster, track payments, and automate billing for your auto repair shop.",
  },
  {
    title: "Contractor Invoice Software",
    href: "invoicing-software-for-contractors",
    desc: "Create invoices, track payments, and automate billing for contractor jobs.",
  },
  {
    title: "Construction Invoice Software",
    href: "invoice-software-for-construction",
    desc: "Manage project invoices, track payments, and streamline billing for construction projects.",
  },
  {
    title: "Invoicing Software for Plumbers",
    href: "invoicing-software-for-plumbers",
    desc: "Job-based billing, fast invoices, and quicker payments for plumbing businesses.",
  },
  {
    title: "Electrician Invoicing Software",
    href: "electrician-invoicing-software",
    desc: "Simple invoicing for electrical jobs with real-time tracking.",
  },
  {
    title: "HVAC Invoicing Software",
    href: "hvac-invoicing-software",
    desc: "Automate recurring invoices and manage service contracts easily.",
  },
  {
    title: "legal billing software",
    href: "legal-billing-software",
    desc: "Automate legal invoicing, track billable hours, and get paid faster with ease.",
  },
]

export default function Content() {
  return (
    <>
    <div className="bg-white">

      {/* HERO */}
<section className="py-28 bg-gradient-to-br from-[#0B1220] via-[#0F172A] to-black text-white px-6 relative overflow-hidden">

  {/* GLOW */}
  <div className="absolute w-[700px] h-[700px] bg-blue-500/20 blur-[140px] rounded-full top-[-120px] left-1/2 -translate-x-1/2"></div>

  <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">

    {/* LEFT CONTENT */}
    <div className="space-y-6 text-center md:text-left">

      {/* TAG */}
      <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/10 text-sm text-gray-300">
        🏢 Industries
      </div>

      {/* HEADLINE */}
      <h1 className="text-4xl md:text-5xl font-bold leading-tight">
        Invoicing Software Built for Every Industry
      </h1>

      {/* TEXT */}
      <p className="text-gray-300 text-lg max-w-xl">
        Whether you're a freelancer, contractor, or small business,
        Smapey helps you invoice faster, track payments, and manage billing with ease.
      </p>

      {/* INDUSTRY TAGS */}
      <div className="flex flex-wrap gap-3 text-sm text-gray-300 justify-center md:justify-start">
        {["Freelancers","Contractors","Consultants","Plumbers","Electricians","Auto Repair"].map((item) => (
          <span key={item} className="bg-white/10 px-3 py-1 rounded-full">
            {item}
          </span>
        ))}
      </div>

      {/* CTA */}
      <div className="pt-4 space-y-3">
        <Link href="https://app.smapey.com/register?product=INVOICE&plan=FREE">
          <button className="px-8 py-4 bg-white text-black rounded-xl font-medium hover:scale-105 transition shadow-lg">
            Start Free →
          </button>
        </Link>

        <p className="text-sm text-gray-400">
          No credit card required • Setup in minutes
        </p>
      </div>

    </div>

    {/* RIGHT VISUAL 🔥 */}
  <div className="relative flex justify-center md:justify-end">

  {/* GLOW */}
  <div className="absolute w-[450px] h-[450px] bg-blue-500/20 blur-[120px] rounded-full"></div>

  {/* IMAGE */}
  <img
    src="/industry-illustration.png"
    alt="FAQ illustration"
    className="relative w-[420px] md:w-[500px] lg:w-[560px] max-w-none drop-shadow-2xl"
  />

</div>

  </div>
</section>

      {/* INDUSTRY GRID */}
      <section className="py-20 max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-6">

          {industries.map((item, i) => (
            <Link
              key={i}
              href={item.href}
              className="group border rounded-xl p-5 bg-white transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-blue-500"
            >
              <h3 className="font-semibold text-lg transition-colors group-hover:text-blue-600">
                {item.title} →
              </h3>

              <p className="text-sm text-gray-600 mt-2 group-hover:text-gray-800 transition-colors">
                {item.desc}
              </p>
            </Link>
          ))}

        </div>
      </section>



    </div>
    <Footer />
    </>
    
  )
}