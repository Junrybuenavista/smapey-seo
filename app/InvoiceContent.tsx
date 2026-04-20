"use client"
import { useState } from "react"
import {
  Send,
  CreditCard,
  BarChart,
  Globe,
  Repeat,
  FileText,
} from "lucide-react"
import Link from "next/link"
import Footer from "@/components/Footer"



export default function InvoicingContent() {
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  function Feature({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="p-5 border rounded-xl flex gap-4 items-start hover:shadow-lg hover:-translate-y-1 transition bg-white">
      
      {/* ICON */}
      <div className="p-2 rounded-lg bg-gray-100">
        {icon}
      </div>

      {/* CONTENT */}
      <div>
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-gray-600 mt-1">{children}</p>
      </div>

    </div>
  )
}

  return (

    <>
 <div className="max-w-5xl mx-auto px-6 py-20 space-y-12">
<section className="py-32 bg-gradient-to-br from-[#0B1220] via-[#0F172A] to-black 
  relative left-1/2 right-1/2 -mx-[50vw] w-screen px-6 lg:px-20 text-white">

  <div className="max-w-[1400px] mx-auto grid md:grid-cols-2 gap-20 items-center">

    {/* LEFT CONTENT */}
    <div className="space-y-6">

      <h1 className="text-5xl md:text-6xl font-bold leading-tight">
        Invoicing Software That Helps You Get Paid Faster
      </h1>

      <p className="text-gray-300 text-lg max-w-xl">
        Create invoices in minutes, send them instantly, and accept online payments without friction.
        Smapey is invoicing software built for freelancers, agencies, startups, and small businesses
        that need speed, simplicity, and reliable support.
      </p>

      {/* CTA */}
      <div className="pt-6 space-y-3">
        <Link href="https://app.smapey.com/invoicing-app">
          <button className="px-8 py-4 bg-white text-black rounded-xl text-lg font-medium hover:scale-105 transition shadow-lg">
            View Invoicing App →
          </button>
        </Link>

        <p className="text-sm text-gray-400">
          Start free trials and send your first invoice today.
        </p>
      </div>

      {/* TRUST / FEATURES */}
      <div className="flex flex-wrap gap-6 text-sm text-gray-400 pt-6">
        <span>✔ Stripe, PayPal, Apple Pay, ACH</span>
        <span>✔ Invoice automation</span>
        <span>✔ Real-time tracking</span>
      </div>

    </div>

    {/* RIGHT VISUAL */}
    <div className="relative flex justify-center">

      {/* glow */}
      <div className="absolute w-[500px] h-[500px] bg-blue-500/20 blur-[120px] rounded-full"></div>

      {/* CARD 1 */}
      <div className="relative rotate-6">
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-2xl w-[320px]">
          <p className="text-sm text-gray-300">Invoice</p>
          <p className="text-lg font-semibold mt-2">USD 1,200.00</p>
          <p className="text-green-400 mt-2 text-sm">✔ Paid</p>
        </div>
      </div>

      {/* CARD 2 */}
      <div className="absolute -bottom-10 -right-10 -rotate-6">
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-2xl w-[320px]">
          <p className="text-sm text-gray-300">Invoice</p>
          <p className="text-lg font-semibold mt-2">USD 850.00</p>
          <p className="text-yellow-400 mt-2 text-sm">⏳ Pending</p>
        </div>
      </div>

    </div>

  </div>
</section>
      {/* PROBLEM */}
<section className="py-16 px-6 bg-white">
  <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">

    {/* LEFT: TEXT */}
    <div className="space-y-6">
      <h2 className="text-4xl font-bold leading-tight">
        Send Invoices Faster and Stop Delaying Revenue
      </h2>

      <p className="text-gray-600">
        Most businesses do not struggle with invoicing because it is hard —
        they struggle because it is slow.
      </p>

      <p className="text-gray-600">
        Manual invoice templates, spreadsheets, and scattered tools lead to delayed invoices,
        missed payments, and unstable cash flow.
      </p>

      <p className="text-gray-600">
        Tools like QuickBooks, Xero, and Sage try to do everything — which creates complexity.
        Meanwhile, free tools like Wave or Zoho Invoice limit features and flexibility.
      </p>

      {/* STRONG STATEMENT */}
      <div className="bg-red-50 border border-red-100 rounded-xl p-4">
        <p className="text-red-600 font-semibold">
          You send invoices late — and you get paid late.
        </p>
      </div>

      {/* BULLETS */}
      <ul className="space-y-2 text-sm text-gray-700 pt-2">
        <li className="flex gap-2">❌ Manual invoice creation</li>
        <li className="flex gap-2">❌ Late payments and follow-ups</li>
        <li className="flex gap-2">❌ Poor cash flow visibility</li>
      </ul>
    </div>

    {/* RIGHT: IMAGE */}
    <div className="relative flex justify-center">

      {/* glow effect */}
      <div className="absolute -inset-8 bg-red-500/10 blur-3xl rounded-2xl"></div>

      <img
        src="/invoice-problem.webp"
        alt="Delayed invoices problem"
        className="relative rounded-2xl shadow-2xl w-full max-w-xl"
      />

      {/* floating badge */}
      <div className="absolute bottom-6 right-6 bg-white border rounded-lg px-4 py-2 shadow text-sm">
        ⚠️ Invoice overdue: 14 days
      </div>

    </div>

  </div>
</section>
<section className="py-16 px-6 bg-gray-50">
  <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">

    {/* LEFT: IMAGE / PRODUCT */}
    <div className="relative flex justify-center">

      {/* glow */}
      <div className="absolute -inset-8 bg-green-500/10 blur-3xl rounded-2xl"></div>

      <img
        src="/public-invoice.png"
        alt="Smapey invoicing dashboard"
        className="relative rounded-2xl shadow-2xl w-full max-w-xl"
      />

      {/* floating success badge */}
      <div className="absolute top-6 left-6 bg-white border rounded-lg px-4 py-2 shadow text-sm">
        ✅ Paid instantly
      </div>

    </div>

    {/* RIGHT: CONTENT */}
    <div className="space-y-6">

     <h2 className="text-3xl md:text-4xl font-bold leading-tight">
        Simple Invoicing Software Built for Speed and Payments
      </h2>

      <p className="text-gray-600 text-lg">
        Smapey is invoice automation software designed to remove friction from the entire invoicing process.
      </p>

      <p className="text-gray-600 text-lg">
        Create customizable invoices using ready invoice templates. Deliver invoices instantly through email
        or shareable links, and accept online payments through integrated payment gateways.
      </p>

      <p className="text-gray-600 text-lg">
        Track invoice status in real time. Send automated reminders and payment reminders without manual follow-up.
      </p>

      {/* BENEFITS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 text-sm">

        <div className="flex items-center gap-2">
          <span>⚡</span> Fast invoice creation
        </div>

        <div className="flex items-center gap-2">
          <span>💳</span> Online payments built-in
        </div>

        <div className="flex items-center gap-2">
          <span>📊</span> Real-time tracking
        </div>

        <div className="flex items-center gap-2">
          <span>🔔</span> Automated reminders
        </div>

      </div>

      {/* FINAL LINE */}
      <p className="text-gray-800 font-semibold pt-4">
        This is invoicing software for small businesses that need to move fast and get paid without delay.
      </p>

    </div>

  </div>
</section>


      {/* FEATURES FULL SEO */}
<section className="space-y-8 ">
  <h2 className="text-3xl md:text-4xl font-bold leading-tight text-center">
    Everything You Need to Manage Invoices and Get Paid
  </h2>

  <div className="grid md:grid-cols-2 gap-6">

    <Feature
      icon={<FileText size={20} />}
      title="Invoice Creation & Templates"
    >
      Create professional invoices instantly using customizable templates.
    </Feature>

    <Feature
      icon={<Send size={20} />}
      title="Send & Deliver Invoices"
    >
      Send invoices via email or shareable links with full control over payment terms.
    </Feature>

    <Feature
      icon={<CreditCard size={20} />}
      title="Online Payments"
    >
      Accept payments through Stripe, PayPal, Apple Pay, and more.
    </Feature>

    <Feature
      icon={<BarChart size={20} />}
      title="Invoice Tracking"
    >
      Track invoice status, overdue payments, and cash flow in real time.
    </Feature>

    <Feature
      icon={<Repeat size={20} />}
      title="Automation & Recurring Billing"
    >
      Automate reminders and recurring invoices for subscriptions and retainers.
    </Feature>

    <Feature
      icon={<Globe size={20} />}
      title="Multi-Currency & Team Access"
    >
      Work with global clients and manage invoices with your team.
    </Feature>

  </div>
</section>


      {/* TARGET USERS */}
<section className="py-16 px-6 bg-white">
  <div className="max-w-6xl mx-auto space-y-16">

    {/* 🔥 HEADER */}
    <div className="text-center max-w-3xl mx-auto space-y-4">
     <h2 className="text-3xl md:text-4xl font-bold leading-tight">
        Built for Freelancers, Agencies, and Small Businesses
      </h2>

      <p className="text-gray-600 text-lg">
        Smapey works as invoicing software for freelancers who need fast invoice generation and online payments.
        It works for agencies managing recurring invoices, team workflows, and client billing.
        It also supports small businesses and startups that need invoice automation, payment tracking,
        and better cash flow visibility — without the complexity of tools like QuickBooks, Xero, or Sage.
      </p>
    </div>

    {/* 🧱 CARDS */}
    <div className="grid md:grid-cols-3 gap-8">

      {/* FREELANCERS */}
      <div className="bg-white p-6 rounded-2xl border shadow-sm hover:shadow-lg transition space-y-4">
        <h3 className="font-semibold text-lg">Freelancers</h3>
        <p className="text-gray-600 text-sm">
          Create invoices in seconds, send them instantly, and accept online payments without hassle.
        </p>

        <ul className="text-sm text-gray-500 space-y-1 pt-2">
          <li>⚡ Fast invoice generation</li>
          <li>💳 Online payments</li>
          <li>📄 Ready-to-use templates</li>
        </ul>
      </div>

      {/* AGENCIES */}
      <div className="bg-white p-6 rounded-2xl border shadow-sm hover:shadow-lg transition space-y-4">
        <h3 className="font-semibold text-lg">Agencies</h3>
        <p className="text-gray-600 text-sm">
          Manage recurring invoices, multiple clients, and billing workflows in one place.
        </p>

        <ul className="text-sm text-gray-500 space-y-1 pt-2">
          <li>🔁 Recurring invoices</li>
          <li>👥 Client management</li>
          <li>📊 Workflow tracking</li>
        </ul>
      </div>

      {/* SMALL BUSINESSES */}
      <div className="bg-white p-6 rounded-2xl border shadow-sm hover:shadow-lg transition space-y-4">
        <h3 className="font-semibold text-lg">Small Businesses</h3>
        <p className="text-gray-600 text-sm">
          Automate invoicing, track payments, and gain full visibility of your cash flow.
        </p>

        <ul className="text-sm text-gray-500 space-y-1 pt-2">
          <li>🤖 Invoice automation</li>
          <li>📈 Payment tracking</li>
          <li>💰 Cash flow insights</li>
        </ul>
      </div>

    </div>

  </div>
</section>
<div className="my-16 h-px w-full bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
      {/* WHY SWITCH */}
   <section className="max-w-6xl mx-auto px-6 py-16 space-y-12 ">

  {/* 🔥 SECTION 1 */}
<div className="py-10 px-6 bg-white">
  <div className="max-w-6xl mx-auto space-y-12">

    {/* 🔥 HEADER */}
    <div className="space-y-4 max-w-3xl">
     <h2 className="text-3xl md:text-4xl font-bold leading-tight">
        Why Businesses Switch from Other Invoicing Software
      </h2>

      <p className="text-gray-600 text-lg">
        Many users start with tools like FreshBooks, Square Invoices, or Wave Financial.
        They switch because of limits, complexity, or poor support.
      </p>

      <p className="text-gray-600 text-lg">
        QuickBooks and Xero become too complex and expensive as you grow.
        FreshBooks introduces pricing based on clients and additional users.
        Zoho Invoice applies limits even in free plans, while Wave adds transaction fees
        and support limitations. Square and Stripe focus on payments but lack full invoice workflows.
      </p>
    </div>

    {/* 💡 BENEFIT CARD */}
    <div className="bg-white p-8 rounded-2xl shadow-md border">

      <p className="text-gray-700 mb-6 font-medium">
        Smapey removes these constraints — no complexity, no surprises, just invoicing that works.
      </p>

      <ul className="grid md:grid-cols-2 gap-4 text-gray-700">

        <li className="flex items-center gap-3">
          <span className="text-green-500 text-xl">✔</span>
          No forced upgrades based on clients
        </li>

        <li className="flex items-center gap-3">
          <span className="text-green-500 text-xl">✔</span>
          No hidden transaction fee surprises
        </li>

        <li className="flex items-center gap-3">
          <span className="text-green-500 text-xl">✔</span>
          No complex accounting system to learn
        </li>

        <li className="flex items-center gap-3">
          <span className="text-green-500 text-xl">✔</span>
          No waiting for support when something breaks
        </li>

      </ul>

      {/* 🔥 STRONG CLOSE */}
      <div className="mt-6 text-green-600 font-semibold">
        Just invoicing software that works.
      </div>

    </div>

  </div>
</div>

  {/* ⚡ SECTION 2 */}
<div className=" px-6 bg-white">
  <div className="max-w-6xl mx-auto space-y-12">

    {/* 🔥 HEADER */}
    <div className="space-y-4 max-w-3xl">
     <h2 className="text-3xl md:text-4xl font-bold leading-tight">
        Improve Cash Flow with Better Invoicing and Payments
      </h2>

      <p className="text-gray-600 text-lg">
        Cash flow is not just about revenue — it is about timing.
      </p>

      <p className="text-gray-600 text-lg">
        Late invoice delivery leads to late payments. Lack of reminders leads to overdue invoices.
        Poor visibility leads to missed follow-ups.
      </p>

      <p className="text-gray-600 text-lg font-medium">
        Smapey improves cash flow by simplifying and automating your invoicing workflow.
      </p>
    </div>

    {/* 💡 BENEFITS CARD */}
    <div className="bg-white p-8 rounded-2xl shadow-md border hover:shadow-xl transition">

      <ul className="grid md:grid-cols-2 gap-5 text-gray-700">

        <li className="flex items-center gap-3">
          <span className="text-blue-500 text-xl">⚡</span>
          Send invoices faster
        </li>

        <li className="flex items-center gap-3">
          <span className="text-blue-500 text-xl">💳</span>
          Provide multiple payment options
        </li>

        <li className="flex items-center gap-3">
          <span className="text-blue-500 text-xl">🔔</span>
          Automate invoice reminders
        </li>

        <li className="flex items-center gap-3">
          <span className="text-blue-500 text-xl">📊</span>
          Track invoice status in real time
        </li>

        <li className="flex items-center gap-3">
          <span className="text-blue-500 text-xl">📉</span>
          Reduce overdue invoices
        </li>

      </ul>

      {/* 🔥 STRONG CLOSE */}
      <div className="mt-6 text-blue-600 font-semibold">
        This is how modern invoicing software should work.
      </div>

    </div>

  </div>
</div>

</section>
<div className="my-16 h-px w-full bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
<section className="py-16 px-6 bg-white">
  <div className="max-w-5xl mx-auto">

    <div className="bg-white border rounded-3xl shadow-xl p-12 text-center space-y-8 bg-gray-50">

      {/* HEADLINE */}
      <h2 className="text-3xl md:text-4xl font-bold">
        Pricing That Does Not Punish Growth
      </h2>

      {/* SEO / CONTEXT */}
      <div className="space-y-4 text-gray-600 max-w-2xl mx-auto text-base">
        <p>
          Most invoicing and billing software introduces limits as you grow.
          FreshBooks charges based on clients, Zoho Invoice limits invoice volume,
          and Invoice Ninja restricts free plans. Wave applies transaction fees.
        </p>

        <p className="font-medium text-gray-700">
          Smapey focuses on simple pricing with no growth penalties.
        </p>

        <p>
          Start with free trials and upgrade based on usage — not restrictions.
          No forced upgrades based on the number of clients.
        </p>
      </div>

      {/* FEATURES */}
      <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-700 pt-4">
        <span className="flex items-center gap-2">✔ No client limits</span>
        <span className="flex items-center gap-2">✔ No hidden fees</span>
        <span className="flex items-center gap-2">✔ Upgrade when you need</span>
        <span className="flex items-center gap-2">✔ Cancel anytime</span>
      </div>

      {/* CTA */}
      <div className="pt-4">
        <Link href="https://app.smapey.com/invoicing-app">
          <button className="px-10 py-4 bg-black text-white rounded-xl text-lg hover:scale-105 transition shadow-lg">
            View Pricing
          </button>
        </Link>
      </div>

      {/* TRUST */}
      <p className="text-sm text-gray-500">
        Start your free trial today — no credit card required
      </p>

      {/* 🔥 CLOSE */}
      <p className="text-green-600 font-semibold">
        Built for businesses that want to grow without limits.
      </p>

    </div>

  </div>
</section>
 

<div className="my-20 flex items-center gap-4">
  <div className="flex-1 h-px bg-gray-200"></div>

  <div className="flex items-center gap-2 px-4 py-1 rounded-full bg-gray-100 text-gray-600 text-sm font-medium">
    START FREE TRIAL
  </div>

  <div className="flex-1 h-px bg-gray-200"></div>
</div>



      {/* CTA */}
<section className="py-20 px-6">
  <div className="max-w-5xl mx-auto">

    <div className="relative rounded-3xl p-[1px] bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-blue-500/30">

      {/* INNER CARD */}
      <div className="relative bg-[#0B1220] text-white rounded-3xl p-12 text-center overflow-hidden">

        {/* 🔥 BACKGROUND GLOW */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-500/20 blur-[120px] rounded-full"></div>

        {/* CONTENT */}
        <div className="relative space-y-8">

          {/* HEADLINE */}
          <h2 className="text-4xl md:text-5xl font-bold leading-tight max-w-3xl mx-auto">
            Get Paid Faster with Smarter Invoicing
          </h2>

          {/* SUBTEXT */}
          <p className="text-gray-300 text-lg max-w-xl mx-auto">
            Create invoices, accept payments, and track everything in one place — without the hassle.
          </p>

          {/* CTA BUTTON */}
          <div className="pt-4">
            <Link href="https://app.smapey.com/register?product=INVOICE&plan=FREE">
              <button className="group relative px-10 py-4 rounded-xl text-lg font-semibold bg-white text-black overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl">

                {/* glow hover */}
                <span className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition"></span>

                <span className="relative flex items-center gap-2 justify-center">
                  Start Free Trial
                  <span className="group-hover:translate-x-1 transition">→</span>
                </span>

              </button>
            </Link>
          </div>

          {/* TRUST BADGES */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400 pt-4">
            <span>✔ No credit card required</span>
            <span>✔ Cancel anytime</span>
            <span>✔ Setup in minutes</span>
          </div>

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

/* COMPONENTS */

function Feature({ title, children }: any) {
  return (
    <div className="border rounded-xl p-5">
      <h3 className="font-semibold mb-1">{title}</h3>
      <p className="text-gray-600 text-sm">{children}</p>
    </div>
  )
}

function Faq({ q, a }: any) {
  return (
    <div className="border rounded-xl p-4">
      <p className="font-medium">{q}</p>
      <p className="text-sm text-gray-600 mt-1">{a}</p>
    </div>
  )
}