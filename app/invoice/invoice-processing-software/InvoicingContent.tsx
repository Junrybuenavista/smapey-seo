"use client"

import Link from "next/link"
import {
  Mail,
  CreditCard,
  Users,
  BarChart,
} from "lucide-react"
import InternalLinks from "@/components/InternalLinks"

export default function InvoicingContent() {
  return (
    <main>

      {/* HERO */}
      <section className="bg-gradient-to-br from-yellow-50 to-white py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">

          {/* LEFT */}
          <div>
            <span className="inline-block bg-yellow-100 text-yellow-700 px-4 py-1 rounded-full text-sm mb-4">
              Built for software 🚀
            </span>

            <h1 className="text-4xl font-bold leading-tight">
              Invoice Processing Software for Faster Payments
            </h1>

            <p className="mt-4 text-gray-600 text-lg">
              Stop wasting time on manual invoicing, spreadsheets, and delayed payments.
              Smapey helps you automate your invoice processing workflow with powerful
              invoice processing automation software designed for modern teams.
            </p>

            <p className="mt-3 text-gray-500">
              With the best automated invoice processing software, you can send invoices,
              track payments, and manage billing all in one place—so you get paid faster.
            </p>

            <div className="mt-6 flex gap-4">
              <Link
                href="how-it-works"
                className="bg-black text-white px-6 py-3 rounded-lg"
              >
                View Invoicing App →
              </Link>

              <Link
                href="https://app.smapey.com/register?product=INVOICE&plan=FREE"
                className="border px-6 py-3 rounded-lg"
              >
                Start Free
              </Link>
            </div>
          </div>

          {/* RIGHT */}
          <div className="rounded-2xl shadow-xl bg-white p-4">
            <img
              src="/images/invoice-dashboard.png"
              alt="invoice processing software dashboard"
              className="rounded-xl"
            />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10">

        <div className="flex gap-4">
          <Mail />
          <div>
            <h3 className="font-semibold text-lg">Email Templates</h3>
            <p className="text-gray-600">
              Send professional invoices instantly using customizable templates and automated workflows.
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <CreditCard />
          <div>
            <h3 className="font-semibold text-lg">Payment Tracking</h3>
            <p className="text-gray-600">
              Track invoice payments in real-time and reduce delays with smart billing software tools.
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <Users />
          <div>
            <h3 className="font-semibold text-lg">Collaborate With Your Team</h3>
            <p className="text-gray-600">
              Manage invoices together with your team using shared access and workflow automation.
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <BarChart />
          <div>
            <h3 className="font-semibold text-lg">Reporting</h3>
            <p className="text-gray-600">
              Gain insights with reporting tools that help optimize your invoice processing system.
            </p>
          </div>
        </div>

      </section>

      {/* SEO BLOCK */}
      <section className="max-w-4xl mx-auto px-6 text-center pb-20">
        <p className="text-gray-600 leading-relaxed">
          Smapey is more than just an invoice processing software—it’s a complete contractor invoicing app,
          billing software, and estimate + invoice workflow solution. Built for software teams,
          it simplifies billing operations, reduces manual work, and ensures accurate invoicing from
          estimates to final payments.
        </p>
      </section>

      {/* CTA */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto bg-black text-white rounded-xl text-center py-16 px-6">
          <h2 className="text-3xl font-bold">
            Get Paid Faster with Smarter Invoicing
          </h2>

          <Link
            href="https://app.smapey.com/register?product=INVOICE&plan=FREE"
            className="inline-block mt-6 bg-white text-black px-6 py-3 rounded-lg"
          >
            Start Free Trial
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-10">
          Frequently Asked Questions
        </h2>

        <div className="space-y-6">

          <div>
            <h3 className="font-semibold">
              What is the best invoice processing software for software companies?
            </h3>
            <p className="text-gray-600">
              The best invoice processing software automates billing, tracks payments, and integrates with your workflow.
              Smapey is designed specifically for software teams needing efficient automation.
            </p>
          </div>

          <div>
            <h3 className="font-semibold">
              How to automate invoice processing in a SaaS business?
            </h3>
            <p className="text-gray-600">
              You can automate invoice processing by using software that generates invoices, sends them automatically,
              and tracks payments in real time like Smapey.
            </p>
          </div>

          <div>
            <h3 className="font-semibold">
              How does invoice processing automation software work?
            </h3>
            <p className="text-gray-600">
              It digitizes invoice creation, approval, and payment tracking, reducing manual tasks and improving accuracy.
            </p>
          </div>

          <div>
            <h3 className="font-semibold">
              How to create an invoice using automated software?
            </h3>
            <p className="text-gray-600">
              Simply input your details, choose a template, and the system generates and sends invoices automatically.
            </p>
          </div>

          <div>
            <h3 className="font-semibold">
              How can I get an invoice from an invoicing system?
            </h3>
            <p className="text-gray-600">
              Most systems allow you to download or receive invoices via email instantly after generation.
            </p>
          </div>

        </div>
      </section>
       <InternalLinks />
    </main>
  )
}