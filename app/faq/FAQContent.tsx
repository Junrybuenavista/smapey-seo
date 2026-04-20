"use client"

import {
  HelpCircle,
  FileSpreadsheet,
  RefreshCcw,
  CreditCard,
  Repeat,
  Building,
  LifeBuoy,
} from "lucide-react"
import Footer from "@/components/Footer"

export default function FAQContent() {
  return (
    <>
    <div className="bg-white">

      {/* HERO */}
<section className="py-28 bg-gradient-to-br from-[#0B1220] via-[#0F172A] to-black text-white px-6 relative overflow-hidden">

  {/* GLOW */}
  <div className="absolute w-[600px] h-[600px] bg-blue-500/20 blur-[140px] rounded-full top-[-100px] left-1/2 -translate-x-1/2"></div>

  <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">

    {/* LEFT */}
    <div className="space-y-6 text-center md:text-left">

      <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/10 text-sm text-gray-300">
        ❓ FAQ
      </div>

      <h1 className="text-4xl md:text-5xl font-bold leading-tight">
        Questions? We’ve Got Answers.
      </h1>

      <p className="text-gray-300 text-lg">
        Everything you need to know about switching to Smapey and simplifying your invoicing.
      </p>

      <div className="flex flex-wrap gap-4 text-sm text-gray-400 justify-center md:justify-start">
        <span>✔ Easy to use</span>
        <span>✔ No setup hassle</span>
        <span>✔ Human support</span>
      </div>

    </div>

    {/* RIGHT IMAGE */}
<div className="relative flex justify-center md:justify-end">

  {/* GLOW */}
  <div className="absolute w-[450px] h-[450px] bg-blue-500/20 blur-[120px] rounded-full"></div>

  {/* IMAGE */}
  <img
    src="/faq-illustration.png"
    alt="FAQ illustration"
    className="relative w-[420px] md:w-[500px] lg:w-[560px] max-w-none drop-shadow-2xl"
  />

</div>

  </div>
</section>

      {/* DIVIDER */}
      <div className="my-20 flex items-center gap-4 px-6">
        <div className="flex-1 h-px bg-gray-200"></div>

        <div className="flex items-center gap-2 px-4 py-1 rounded-full bg-gray-100 text-gray-600 text-sm font-medium">
          <HelpCircle size={16} />
          FAQ
        </div>

        <div className="flex-1 h-px bg-gray-200"></div>
      </div>

      {/* FAQ SECTION */}
      <section className="pb-24 px-6">
        <div className="max-w-4xl mx-auto space-y-12">

          {/* HEADER */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              Common Questions Before Switching Invoicing Software
            </h2>

            <p className="text-gray-600 text-lg">
              Everything you need to know before moving to a better invoicing system.
            </p>
          </div>

          {/* FAQ LIST */}
          <div className="space-y-6">

            {/* ITEM */}
            <div className="bg-white border rounded-2xl p-6 shadow-sm hover:shadow-md transition flex gap-4 items-start">
              <div className="p-2 rounded-lg bg-gray-100">
                <FileSpreadsheet size={18} />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">
                  Can I replace Excel with invoicing software?
                </h3>
                <p className="text-gray-600 text-sm">
                  Excel does not support invoice tracking, payment reminders, or online payments.
                  Smapey replaces manual workflows with full invoice automation.
                </p>
              </div>
            </div>

            {/* ITEM */}
            <div className="bg-white border rounded-2xl p-6 shadow-sm hover:shadow-md transition flex gap-4 items-start">
              <div className="p-2 rounded-lg bg-gray-100">
                <RefreshCcw size={18} />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">
                  Can I migrate from QuickBooks, FreshBooks, or Zoho Invoice?
                </h3>
                <p className="text-gray-600 text-sm">
                  Yes. You can recreate invoice templates, import your data, and start sending invoices immediately with support.
                </p>
              </div>
            </div>

            {/* ITEM */}
            <div className="bg-white border rounded-2xl p-6 shadow-sm hover:shadow-md transition flex gap-4 items-start">
              <div className="p-2 rounded-lg bg-gray-100">
                <CreditCard size={18} />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">
                  Does this support payment processing?
                </h3>
                <p className="text-gray-600 text-sm">
                  Yes. Smapey integrates with Stripe, PayPal, and other payment gateways.
                </p>
              </div>
            </div>

            {/* ITEM */}
            <div className="bg-white border rounded-2xl p-6 shadow-sm hover:shadow-md transition flex gap-4 items-start">
              <div className="p-2 rounded-lg bg-gray-100">
                <Repeat size={18} />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">
                  Does this support recurring invoices?
                </h3>
                <p className="text-gray-600 text-sm">
                  Yes. You can automate recurring invoices and payment reminders.
                </p>
              </div>
            </div>

            {/* ITEM */}
            <div className="bg-white border rounded-2xl p-6 shadow-sm hover:shadow-md transition flex gap-4 items-start">
              <div className="p-2 rounded-lg bg-gray-100">
                <Building size={18} />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">
                  Is this suitable for small businesses and startups?
                </h3>
                <p className="text-gray-600 text-sm">
                  Yes. Smapey is built for freelancers, startups, and growing businesses.
                </p>
              </div>
            </div>

            {/* FEATURED ITEM */}
            <div className="bg-green-50 border border-green-200 rounded-2xl p-6 shadow-sm flex gap-4 items-start">
              <div className="p-2 rounded-lg bg-green-100 text-green-600">
                <LifeBuoy size={18} />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">
                  What happens if I need help?
                </h3>
                <p className="text-gray-700 text-sm font-medium">
                  You get real human support. Not bots. Real help when you need it.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
     <Footer />
        </>
  )
}