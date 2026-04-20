import Link from "next/link"
import Image from "next/image"
import {
  FileText,
  ClipboardList,
  DollarSign,
  Smartphone,
  Layers,
  CheckCircle,
} from "lucide-react"
import InternalLinks from "@/components/InternalLinks"

export default function ConstructionInvoiceContent() {
  return (
    <>
    <div className="bg-white text-gray-900">

      {/* HERO */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

          {/* TEXT */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Best Invoice Software for Construction Companies
            </h1>

            <p className="mt-6 text-lg text-gray-600">
              Manage construction invoices, track project payments, and simplify
              billing workflows. Built for contractors and construction businesses.
            </p>

            <div className="mt-8 flex gap-4">
              <Link
                href="how-it-works"
                className="px-8 py-4 bg-black text-white rounded-xl text-lg hover:scale-105 transition shadow-lg"
              >
                View Invoicing App →
              </Link>
            </div>
          </div>

          {/* IMAGE */}
          <div className="flex justify-center">
            <Image
              src="/images/construction-invoice.png"
              alt="Construction invoice software illustration"
              width={500}
              height={500}
              className="rounded-2xl shadow-lg"
              priority
            />
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-lg text-gray-700 leading-relaxed">
            Managing invoices in construction is more complex than standard
            billing. From progress billing to subcontractor payments,
            construction companies need specialized invoice software.
          </p>

          <p className="mt-4 text-lg text-gray-700 leading-relaxed">
            Smapey helps construction businesses create professional invoices,
            track project payments, and manage billing workflows—all in one
            simple platform.
          </p>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-center">
            Key Features of Construction Invoice Software
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mt-12">

            <Feature icon={<ClipboardList />} text="Progress billing based on project milestones" />
            <Feature icon={<FileText />} text="Convert estimates into invoices instantly" />
            <Feature icon={<DollarSign />} text="Track paid and unpaid invoices" />
            <Feature icon={<Layers />} text="Manage subcontractor billing easily" />
            <Feature icon={<Smartphone />} text="Create invoices from mobile or job site" />
            <Feature icon={<CheckCircle />} text="Professional invoice templates" />

          </div>
        </div>
      </section>

      {/* WHY SECTION */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-semibold">
            Why Construction Businesses Need Specialized Invoice Software
          </h2>

          <p className="mt-6 text-gray-700 leading-relaxed">
            Construction projects involve materials, labor, subcontractors, and
            timelines. Generic invoicing tools often lack the features needed to
            handle project-based billing.
          </p>

          <p className="mt-4 text-gray-700 leading-relaxed">
            With construction invoice software, you can streamline billing,
            reduce payment delays, and maintain accurate financial tracking
            across all your projects.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-semibold">
            Start Using Smapey for Construction Invoicing
          </h2>

          <p className="mt-4 text-gray-300">
            Create invoices, manage projects, and get paid faster—all in one place.
          </p>

          <div className="mt-8">
            <Link
              href="https://app.smapey.com/register?product=INVOICE&plan=FREE"
              className="px-10 py-4 bg-white text-black rounded-xl text-lg hover:scale-105 transition shadow-lg"
            >
              Start Free Trial
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-center">
            Frequently Asked Questions
          </h2>

          <div className="mt-10 space-y-8">
            <FAQ
              q="What is the best invoice software for construction?"
              a="The best construction invoice software includes features like progress billing, estimate tracking, and subcontractor management."
            />
            <FAQ
              q="What software do construction companies use?"
              a="Construction companies use specialized invoicing tools to manage project-based billing, track payments, and organize financial data."
            />
            <FAQ
              q="How do you create invoices for construction projects?"
              a="You can create invoices by listing labor, materials, and project milestones. Using software automates this process and reduces errors."
            />
          </div>
        </div>
      </section>

    </div>
        <InternalLinks />
      </>
  )
}

/* 🔧 COMPONENTS */

function Feature({ icon, text }: any) {
  return (
    <div className="p-6 bg-white rounded-2xl shadow-sm border flex items-start gap-4">
      <div className="text-black">{icon}</div>
      <p className="text-gray-700">{text}</p>
    </div>
  )
}

function FAQ({ q, a }: any) {
  return (
    <div>
      <h3 className="font-semibold text-lg">{q}</h3>
      <p className="mt-2 text-gray-600">{a}</p>
    </div>
  )
}