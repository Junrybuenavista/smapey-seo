"use client"
import {
  Send,
  CreditCard,
  BarChart3,
  Globe,
  Repeat,
  FileText,
  CheckCircle2,
  ArrowRight,
  Zap,
  Bell,
  TrendingUp,
  Shield,
} from "lucide-react"
import Link from "next/link"
import Footer from "@/components/Footer"

export default function InvoicingContent() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative bg-[#060D1F] text-white overflow-hidden">
        {/* grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* glow orbs */}
        <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-blue-600/20 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-indigo-600/15 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-28 lg:py-36 grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT */}
          <div className="space-y-8">
            {/* badge */}
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/25 text-blue-300 text-sm font-medium px-4 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              Trusted by 10,000+ freelancers &amp; businesses
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight">
              Invoicing Software{" "}
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                That Gets You Paid
              </span>{" "}
              Faster
            </h1>

            <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
              Create invoices in minutes, send them instantly, and accept online
              payments without friction. Built for freelancers, agencies, and
              small businesses.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2">
              <Link href="https://app.smapey.com/register?product=INVOICE&plan=FREE">
                <button className="group flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 rounded-xl text-base font-semibold transition-all duration-200 shadow-lg shadow-blue-600/25 hover:shadow-blue-500/40 hover:scale-[1.02]">
                  Start Free Trial
                  <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                </button>
              </Link>
              <Link href="/invoice/how-it-works" className="text-gray-400 hover:text-white text-sm font-medium transition-colors underline underline-offset-4">
                See how it works
              </Link>
            </div>

            <div className="flex flex-wrap gap-5 text-sm text-gray-500 pt-2">
              {["No credit card required", "Cancel anytime", "Setup in minutes"].map((t) => (
                <span key={t} className="flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-green-400" />
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* RIGHT — invoice card stack */}
          <div className="relative flex items-center justify-center lg:justify-end h-[380px]">
            {/* card 1 — back */}
            <div className="absolute right-0 top-4 rotate-6 w-[300px] bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm shadow-2xl">
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-3">Invoice #1041</p>
              <p className="text-2xl font-bold">USD 4,500.00</p>
              <div className="mt-3 flex items-center gap-2 text-sm">
                <span className="w-2 h-2 rounded-full bg-yellow-400" />
                <span className="text-yellow-400">Awaiting payment</span>
              </div>
              <div className="mt-4 h-1.5 bg-white/10 rounded-full">
                <div className="h-full w-1/3 bg-yellow-400/60 rounded-full" />
              </div>
            </div>

            {/* card 2 — front */}
            <div className="relative -rotate-2 w-[300px] bg-gradient-to-br from-white/10 to-white/5 border border-white/15 rounded-2xl p-6 backdrop-blur-md shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs text-gray-400 uppercase tracking-widest">Invoice #1042</p>
                <span className="text-xs bg-green-500/15 text-green-400 border border-green-500/20 px-2 py-0.5 rounded-full font-medium">Paid</span>
              </div>
              <p className="text-3xl font-bold">USD 1,200.00</p>
              <p className="text-sm text-gray-400 mt-1">Acme Corp • Web Design</p>
              <div className="mt-5 flex items-center gap-3">
                <div className="flex-1 h-1.5 bg-white/10 rounded-full">
                  <div className="h-full w-full bg-green-400/70 rounded-full" />
                </div>
                <span className="text-xs text-green-400">100%</span>
              </div>
              {/* payment pill */}
              <div className="mt-4 flex items-center gap-2 bg-white/5 rounded-lg px-3 py-2 text-xs text-gray-300">
                <CreditCard size={12} className="text-blue-400" />
                Paid via Stripe · 2 mins ago
              </div>
            </div>

            {/* floating stat */}
            <div className="absolute -bottom-2 -left-4 lg:left-0 bg-white text-gray-900 rounded-xl px-4 py-3 shadow-xl text-sm font-medium flex items-center gap-2">
              <TrendingUp size={14} className="text-green-500" />
              <span>Avg. paid in <strong>2.4 days</strong></span>
            </div>
          </div>
        </div>

        {/* payment badges bar */}
        <div className="relative border-t border-white/[0.06] bg-white/[0.02]">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 py-5 flex flex-wrap items-center justify-center gap-8 text-sm text-gray-500">
            {["Stripe", "PayPal", "Apple Pay", "ACH", "Bank Transfer"].map((p) => (
              <span key={p} className="font-medium tracking-wide">{p}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ────────────────────────────────────────────── */}
      <section className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-14 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "10,000+", label: "Invoices sent monthly" },
            { value: "2.4 days", label: "Average payment time" },
            { value: "99.9%", label: "Platform uptime" },
            { value: "50+", label: "Currencies supported" },
          ].map(({ value, label }) => (
            <div key={label}>
              <p className="text-3xl font-bold text-gray-900">{value}</p>
              <p className="text-sm text-gray-500 mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROBLEM ──────────────────────────────────────────── */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <span className="text-sm font-semibold text-red-500 uppercase tracking-widest">The Problem</span>
            <h2 className="text-4xl font-bold leading-tight text-gray-900">
              Slow Invoicing Kills Your Cash Flow
            </h2>
            <p className="text-gray-600 text-lg">
              Most businesses don't struggle because invoicing is hard — they struggle because it's slow. Manual templates, scattered tools, and missed follow-ups lead to late payments and unpredictable revenue.
            </p>

            <div className="bg-red-50 border-l-4 border-red-400 rounded-r-xl p-4">
              <p className="text-red-700 font-semibold text-sm">You send invoices late — you get paid late.</p>
            </div>

            <ul className="space-y-3 text-sm text-gray-600">
              {[
                "Manual invoice creation wastes hours every week",
                "Late payments disrupt your cash flow",
                "No visibility into who owes you what",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-red-100 text-red-500 flex items-center justify-center flex-shrink-0 text-xs font-bold">✕</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 bg-red-500/8 blur-3xl rounded-3xl" />
            <div className="relative bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl p-8 shadow-lg space-y-4">
              <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest">Cash Flow Pain Points</p>
              {[
                { label: "Invoice delivery time", value: "3–5 days", color: "bg-red-400" },
                { label: "Average payment delay", value: "21 days", color: "bg-orange-400" },
                { label: "Overdue follow-ups", value: "Manual", color: "bg-yellow-400" },
                { label: "Payment visibility", value: "None", color: "bg-red-400" },
              ].map(({ label, value, color }) => (
                <div key={label} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                  <span className="text-gray-600 text-sm">{label}</span>
                  <span className={`text-xs font-semibold text-white px-2.5 py-1 rounded-full ${color}`}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SOLUTION ─────────────────────────────────────────── */}
      <section className="bg-gray-50 py-24 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          {/* visual */}
          <div className="relative order-2 md:order-1">
            <div className="absolute -inset-6 bg-green-500/8 blur-3xl rounded-3xl" />
            <div className="relative bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl p-8 shadow-lg space-y-4">
              <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest">With Smapey</p>
              {[
                { label: "Invoice delivery time", value: "Instant", color: "bg-green-500" },
                { label: "Average payment time", value: "2.4 days", color: "bg-green-500" },
                { label: "Overdue follow-ups", value: "Automated", color: "bg-blue-500" },
                { label: "Payment visibility", value: "Real-time", color: "bg-blue-500" },
              ].map(({ label, value, color }) => (
                <div key={label} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                  <span className="text-gray-600 text-sm">{label}</span>
                  <span className={`text-xs font-semibold text-white px-2.5 py-1 rounded-full ${color}`}>{value}</span>
                </div>
              ))}
              <div className="mt-2 flex items-center gap-2 text-sm text-green-600 font-medium">
                <CheckCircle2 size={16} />
                Paid instantly · no chasing required
              </div>
            </div>
          </div>

          {/* text */}
          <div className="space-y-6 order-1 md:order-2">
            <span className="text-sm font-semibold text-green-600 uppercase tracking-widest">The Solution</span>
            <h2 className="text-4xl font-bold leading-tight text-gray-900">
              Invoicing Software Built for Speed and Payments
            </h2>
            <p className="text-gray-600 text-lg">
              Smapey removes every friction point from your invoicing workflow. Create professional invoices from templates, deliver them instantly, and accept payments through Stripe, PayPal, Apple Pay, and more.
            </p>
            <div className="grid grid-cols-2 gap-3 pt-2">
              {[
                { icon: <Zap size={14} />, text: "Fast invoice creation" },
                { icon: <CreditCard size={14} />, text: "Built-in online payments" },
                { icon: <BarChart3 size={14} />, text: "Real-time tracking" },
                { icon: <Bell size={14} />, text: "Automated reminders" },
              ].map(({ icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-sm text-gray-700 bg-white border border-gray-100 rounded-lg px-3 py-2.5 shadow-sm">
                  <span className="text-blue-500">{icon}</span>
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────── */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-7xl mx-auto space-y-14">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-widest">Features</span>
            <h2 className="text-4xl font-bold text-gray-900">Everything You Need to Get Paid</h2>
            <p className="text-gray-500 text-lg">One platform to create, send, and track invoices — no extra tools needed.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <FileText size={22} />,
                title: "Invoice Creation & Templates",
                desc: "Create professional invoices instantly using 10+ customizable templates.",
                color: "bg-blue-50 text-blue-600",
              },
              {
                icon: <Send size={22} />,
                title: "Send & Deliver Invoices",
                desc: "Deliver via email or shareable links with full control over payment terms.",
                color: "bg-indigo-50 text-indigo-600",
              },
              {
                icon: <CreditCard size={22} />,
                title: "Online Payments",
                desc: "Accept payments through Stripe, PayPal, Apple Pay, ACH, and more.",
                color: "bg-purple-50 text-purple-600",
              },
              {
                icon: <BarChart3 size={22} />,
                title: "Invoice Tracking",
                desc: "Track status, overdue payments, and cash flow in real time from one dashboard.",
                color: "bg-green-50 text-green-600",
              },
              {
                icon: <Repeat size={22} />,
                title: "Recurring Billing",
                desc: "Automate reminders and recurring invoices for subscriptions and retainers.",
                color: "bg-yellow-50 text-yellow-600",
              },
              {
                icon: <Globe size={22} />,
                title: "Multi-Currency & Teams",
                desc: "Work with global clients and manage invoices across your entire team.",
                color: "bg-rose-50 text-rose-600",
              },
            ].map(({ icon, title, desc, color }) => (
              <div
                key={title}
                className="group p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${color}`}>
                  {icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────── */}
      <section className="bg-[#060D1F] text-white py-24 px-6">
        <div className="max-w-7xl mx-auto space-y-14">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-sm font-semibold text-blue-400 uppercase tracking-widest">How It Works</span>
            <h2 className="text-4xl font-bold">Get Paid in 3 Simple Steps</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Create Your Invoice",
                desc: "Pick a template, fill in client details and line items — done in under 2 minutes.",
                icon: <FileText size={24} />,
              },
              {
                step: "02",
                title: "Send Instantly",
                desc: "Email your invoice or share a payment link directly with your client.",
                icon: <Send size={24} />,
              },
              {
                step: "03",
                title: "Get Paid Online",
                desc: "Clients pay via Stripe, PayPal, or Apple Pay. You get notified instantly.",
                icon: <CreditCard size={24} />,
              },
            ].map(({ step, title, desc, icon }, i) => (
              <div key={step} className="relative">
                {i < 2 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-px border-t border-dashed border-white/10 z-0" style={{ width: "calc(100% - 2rem)", left: "calc(100% - 1rem)" }} />
                )}
                <div className="relative bg-white/5 border border-white/10 rounded-2xl p-7 space-y-4 hover:bg-white/8 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-4xl font-bold text-white/10">{step}</span>
                    <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center">
                      {icon}
                    </div>
                  </div>
                  <h3 className="font-semibold text-lg">{title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHO IT'S FOR ─────────────────────────────────────── */}
      <section className="bg-gray-50 py-24 px-6">
        <div className="max-w-7xl mx-auto space-y-14">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-widest">Who It's For</span>
            <h2 className="text-4xl font-bold text-gray-900">Built for the Way You Work</h2>
            <p className="text-gray-500 text-lg">
              Whether you're a solo freelancer or growing agency, Smapey fits your workflow.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Freelancers",
                desc: "Create invoices in seconds, send them instantly, and accept online payments without hassle.",
                items: ["Fast invoice generation", "Online payments", "Ready-to-use templates"],
                gradient: "from-blue-500 to-indigo-600",
              },
              {
                title: "Agencies",
                desc: "Manage recurring invoices, multiple clients, and billing workflows in one place.",
                items: ["Recurring invoices", "Client management", "Workflow tracking"],
                gradient: "from-indigo-500 to-purple-600",
              },
              {
                title: "Small Businesses",
                desc: "Automate invoicing, track payments, and gain full visibility of your cash flow.",
                items: ["Invoice automation", "Payment tracking", "Cash flow insights"],
                gradient: "from-purple-500 to-rose-600",
              },
            ].map(({ title, desc, items, gradient }) => (
              <div key={title} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className={`h-1.5 bg-gradient-to-r ${gradient}`} />
                <div className="p-7 space-y-5">
                  <h3 className="font-bold text-xl text-gray-900">{title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                  <ul className="space-y-2.5">
                    {items.map((item) => (
                      <li key={item} className="flex items-center gap-2.5 text-sm text-gray-700">
                        <CheckCircle2 size={14} className="text-green-500 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY SWITCH ───────────────────────────────────────── */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-7xl mx-auto space-y-14">
          <div className="max-w-3xl space-y-4">
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-widest">Why Smapey</span>
            <h2 className="text-4xl font-bold text-gray-900">
              Why Businesses Switch from QuickBooks, FreshBooks & Wave
            </h2>
            <p className="text-gray-600 text-lg">
              Complex tools built for accountants — not for the way you actually work. Smapey is focused, fast, and simple.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Competitors */}
            <div className="bg-red-50 border border-red-100 rounded-2xl p-8 space-y-5">
              <h3 className="font-bold text-gray-900 text-lg">Other Tools</h3>
              {[
                "Charge more as your client list grows",
                "Hidden transaction fees eat your revenue",
                "Complex accounting systems to learn",
                "Slow or unhelpful support",
                "Features you'll never use",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 text-sm text-gray-600">
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-red-100 text-red-500 flex items-center justify-center flex-shrink-0 text-xs font-bold">✕</span>
                  {item}
                </div>
              ))}
            </div>

            {/* Smapey */}
            <div className="bg-green-50 border border-green-100 rounded-2xl p-8 space-y-5">
              <h3 className="font-bold text-gray-900 text-lg">Smapey</h3>
              {[
                "No forced upgrades based on clients",
                "No hidden transaction fee surprises",
                "No complex accounting system to learn",
                "Fast, responsive support when you need it",
                "Just invoicing — done right",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 text-sm text-gray-700">
                  <CheckCircle2 size={16} className="mt-0.5 text-green-500 flex-shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CASH FLOW ────────────────────────────────────────── */}
      <section className="bg-gray-50 py-24 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-widest">Cash Flow</span>
            <h2 className="text-4xl font-bold text-gray-900">
              Improve Cash Flow with Better Invoicing
            </h2>
            <p className="text-gray-600 text-lg">
              Cash flow is about timing. Late delivery leads to late payments. Smapey automates and accelerates every step.
            </p>
            <div className="grid grid-cols-1 gap-4 pt-2">
              {[
                { icon: <Zap size={16} />, text: "Send invoices the moment work is done" },
                { icon: <CreditCard size={16} />, text: "Offer multiple payment options to clients" },
                { icon: <Bell size={16} />, text: "Automate payment reminders — no chasing" },
                { icon: <BarChart3 size={16} />, text: "Track invoice status in real time" },
                { icon: <Shield size={16} />, text: "Reduce overdue invoices significantly" },
              ].map(({ icon, text }) => (
                <div key={text} className="flex items-center gap-3 text-sm text-gray-700 bg-white border border-gray-100 rounded-xl px-4 py-3 shadow-sm">
                  <span className="text-blue-500">{icon}</span>
                  {text}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-lg space-y-6">
            <h3 className="font-bold text-gray-900">Payment Timeline</h3>
            {[
              { label: "Invoice sent", time: "Day 0", active: true },
              { label: "Client views invoice", time: "Day 0", active: true },
              { label: "Payment received", time: "Day 2.4 avg", active: true },
              { label: "Automated reminder (if needed)", time: "Day 7", active: false },
            ].map(({ label, time, active }) => (
              <div key={label} className="flex items-center gap-4">
                <div className={`w-3 h-3 rounded-full flex-shrink-0 ${active ? "bg-green-500" : "bg-gray-200"}`} />
                <div className="flex-1 flex items-center justify-between">
                  <span className="text-sm text-gray-700">{label}</span>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${active ? "bg-green-50 text-green-600" : "bg-gray-50 text-gray-400"}`}>
                    {time}
                  </span>
                </div>
              </div>
            ))}
            <p className="text-xs text-gray-400 pt-2 border-t border-gray-50">
              vs industry average of 21+ days with manual invoicing
            </p>
          </div>
        </div>
      </section>

      {/* ── PRICING ──────────────────────────────────────────── */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-widest">Pricing</span>
            <h2 className="text-4xl font-bold text-gray-900">Pricing That Doesn't Punish Growth</h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              No client limits. No hidden fees. No forced upgrades. Start free and scale without restrictions.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-sm">
            {[
              "No client limits",
              "No hidden fees",
              "Upgrade when you need",
              "Cancel anytime",
            ].map((item) => (
              <span key={item} className="flex items-center gap-2 bg-green-50 text-green-700 border border-green-100 px-4 py-2 rounded-full font-medium">
                <CheckCircle2 size={14} />
                {item}
              </span>
            ))}
          </div>

          <Link href="/invoice/how-it-works">
            <button className="px-10 py-4 bg-gray-900 text-white rounded-xl text-base font-semibold hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all">
              View Pricing Plans
            </button>
          </Link>

          <p className="text-sm text-gray-400">Start your free trial today — no credit card required</p>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────── */}
      <section className="bg-[#060D1F] py-28 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-blue-600/20 blur-[140px] rounded-full pointer-events-none" />
        <div className="relative max-w-3xl mx-auto text-center text-white space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            Get Paid Faster with{" "}
            <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Smarter Invoicing
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Create invoices, accept payments, and track everything in one place — without the complexity.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link href="https://app.smapey.com/register?product=INVOICE&plan=FREE">
              <button className="group flex items-center gap-2 px-10 py-4 bg-blue-600 hover:bg-blue-500 rounded-xl text-base font-semibold transition-all duration-200 shadow-lg shadow-blue-600/30 hover:scale-[1.02]">
                Start Free Trial
                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </Link>
            <Link href="/invoice/how-it-works">
              <button className="px-10 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-base font-medium transition-all duration-200">
                Learn More
              </button>
            </Link>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500 pt-2">
            {["No credit card required", "Cancel anytime", "Setup in minutes"].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <CheckCircle2 size={13} className="text-green-400" />
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
