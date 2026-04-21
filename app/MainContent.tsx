"use client"

import Link from "next/link"
import { FileText, Dumbbell, Layers, Sparkles, TrendingUp, Clock, ShieldCheck, Puzzle, User, Briefcase } from "lucide-react"

const floatStyle = `
  @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
  .animate-float   { animation: float 3.5s ease-in-out infinite }
  .animate-float-2 { animation: float 3.5s ease-in-out infinite; animation-delay:-1.8s }
`

const apps = [
  {
    name: "Invoice Software",
    desc: "Create invoices, send instantly, and get paid faster.",
    href: "/invoice",
    register: "https://app.smapey.com/register?product=INVOICE&plan=FREE",
    tag: "Finance",
    tagColor: "bg-blue-50 text-blue-700",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    Icon: FileText,
    features: ["Create & send invoices", "Track payment status", "Download PDF receipts"],
  },
  {
    name: "Gym Management",
    desc: "Manage members, attendance, and subscriptions.",
    href: "/gym",
    register: "https://app.smapey.com/register?product=GYM&plan=FREE",
    tag: "Fitness",
    tagColor: "bg-emerald-50 text-emerald-700",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    Icon: Dumbbell,
    features: ["Member tracking", "QR check-in", "Subscription billing"],
  },
]

const whyItems = [
  { Icon: Layers,      title: "All-in-one platform",  desc: "Invoices, gym, payments — one dashboard. No app switching." },
  { Icon: Sparkles,    title: "Simple & clean",        desc: "No clutter. No learning curve. Tools that work as expected." },
  { Icon: TrendingUp,  title: "Built to scale",        desc: "Start simple. Add more tools as your business grows." },
  { Icon: Clock,       title: "Save time daily",       desc: "Automate repetitive tasks. Real-time updates. Less manual work." },
  { Icon: ShieldCheck, title: "Secure & reliable",     desc: "Modern data protection. Stable infrastructure. Always on." },
  { Icon: Puzzle,      title: "Modular apps",          desc: "Use only what you need. Plug in new tools at any time." },
]

const whoItems = [
  { Icon: User,      title: "Freelancers",      desc: "Invoice clients in seconds, accept payments online, and track every project without a spreadsheet.", features: ["Fast invoice creation", "Online payment links", "Client history"] },
  { Icon: Briefcase, title: "Small businesses", desc: "Automate invoicing, manage cash flow, and run daily operations — all in one place.",                  features: ["Invoice automation", "Payment tracking", "Business overview"] },
  { Icon: Dumbbell,  title: "Gym owners",       desc: "Keep members organized, automate billing, and track attendance — so you can focus on your members.",   features: ["Member management", "QR check-in", "Subscription billing"] },
]

export default function MainContent() {
  return (
    <>
      <style>{floatStyle}</style>

      {/* NAV */}
      <nav className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-14 h-16 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <span className="text-lg font-semibold tracking-tight text-gray-900">Smapey</span>
        <div className="hidden md:flex items-center gap-8">
          <a href="#apps"    className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Products</a>
          <a href="#why"     className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Why us</a>
          <a href="#pricing" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Pricing</a>
        </div>
        <Link href="https://app.smapey.com/register?product=INVOICE&plan=FREE">
          <button className="bg-gray-900 text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-gray-700 transition-colors">
            Get started →
          </button>
        </Link>
      </nav>

      {/* HERO */}
      <section className="min-h-screen pt-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-14 py-24 grid md:grid-cols-2 gap-16 items-center">

          <div>
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-gray-400 mb-6">
              <span className="w-5 h-px bg-gray-200 inline-block" />
              Business tools, simplified
            </span>
            <h1 className="text-5xl md:text-6xl font-semibold tracking-tight leading-[1.07] text-gray-900">
              Simple tools for{" "}
              <span className="text-blue-600">modern businesses</span>
            </h1>
            <p className="mt-6 text-lg text-gray-500 leading-relaxed max-w-md">
              Manage invoicing, members, and daily operations without complexity. One platform, built for clarity.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="https://app.smapey.com/register?product=INVOICE&plan=FREE">
                <button className="bg-gray-900 text-white text-sm font-medium px-6 py-3 rounded-full hover:bg-gray-700 hover:-translate-y-0.5 transition-all">
                  Start free trial →
                </button>
              </Link>
              <button className="text-sm font-medium px-6 py-3 rounded-full border border-gray-200 text-gray-700 hover:border-gray-400 transition-colors">
                See how it works
              </button>
            </div>
            <div className="mt-8 flex flex-wrap gap-5">
              {["No credit card needed", "Setup in minutes", "Cancel anytime"].map(t => (
                <span key={t} className="flex items-center gap-2 text-xs text-gray-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Dashboard mockup */}
          <div className="relative hidden md:flex items-center justify-center h-[480px]">
            <div className="animate-float absolute top-10 -left-4 bg-white border border-gray-100 rounded-2xl px-4 py-3 shadow-lg z-10">
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Invoice</p>
              <p className="text-base font-semibold text-gray-900 mt-0.5">$320 paid</p>
            </div>
            <div className="animate-float-2 absolute bottom-14 -right-4 bg-white border border-gray-100 rounded-2xl px-4 py-3 shadow-lg z-10">
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Members</p>
              <p className="text-base font-semibold text-gray-900 mt-0.5">85 active</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-3xl shadow-2xl p-7 w-[340px]">
              <div className="flex items-center justify-between mb-5">
                <span className="text-sm font-semibold text-gray-800">Business overview</span>
                <span className="text-[11px] font-semibold bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full">Live</span>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-5">
                {[
                  { label: "Revenue", value: "$1,200", fill: "72%", bar: "bg-emerald-500" },
                  { label: "Members", value: "85",     fill: "55%", bar: "bg-blue-500"    },
                ].map(m => (
                  <div key={m.label} className="bg-gray-50 rounded-2xl p-3.5">
                    <p className="text-[11px] text-gray-400 font-medium">{m.label}</p>
                    <p className="text-xl font-bold text-gray-900 mt-1">{m.value}</p>
                    <div className="h-1.5 bg-gray-200 rounded-full mt-2">
                      <div className={`h-full rounded-full ${m.bar}`} style={{ width: m.fill }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-2">
                {[
                  { label: "Invoice #042", badge: "Paid",    cls: "bg-emerald-50 text-emerald-700" },
                  { label: "Invoice #041", badge: "Pending", cls: "bg-amber-50 text-amber-700"     },
                  { label: "Invoice #040", badge: "Sent",    cls: "bg-blue-50 text-blue-700"       },
                ].map(r => (
                  <div key={r.label} className="flex items-center justify-between bg-gray-50 rounded-xl px-3 py-2.5">
                    <span className="text-sm font-medium text-gray-600">{r.label}</span>
                    <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${r.cls}`}>{r.badge}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PAYMENT METHODS STRIPE */}
      <div className="bg-gray-900 py-4 px-6 flex items-center justify-center flex-wrap gap-x-10 gap-y-2">
        {["Stripe", "PayPal", "Apple Pay", "ACH", "Bank transfer"].map((t, i, arr) => (
          <div key={t} className="flex items-center gap-10">
            <span className="text-xs font-semibold tracking-widest uppercase text-gray-500">{t}</span>
            {i < arr.length - 1 && <span className="hidden md:block w-px h-4 bg-gray-700" />}
          </div>
        ))}
      </div>

      {/* APPS */}
      <section className="bg-gray-50 py-24 px-6 md:px-14" id="apps">
        <div className="max-w-6xl mx-auto">
          <span className="text-xs font-semibold tracking-widest uppercase text-gray-400">Our products</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight text-gray-900">
            Two tools, every workflow covered.
          </h2>
          <div className="mt-12 grid md:grid-cols-2 gap-6">
            {apps.map(app => (
              <div key={app.name} className="bg-white border border-gray-200 rounded-3xl p-8 flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-11 h-11 rounded-2xl flex items-center justify-center ${app.iconBg}`}>
                    <app.Icon size={20} className={app.iconColor} />
                  </div>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${app.tagColor}`}>{app.tag}</span>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">{app.name}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-6">{app.desc}</p>
                <ul className="flex flex-col gap-2.5 mb-8 flex-1">
                  {app.features.map(f => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="flex gap-3 mt-auto">
                  <Link href={app.register} className="flex-1 text-center bg-gray-900 text-white text-sm font-medium py-2.5 rounded-full hover:bg-gray-700 transition-colors">
                    Try free
                  </Link>
                  <Link href={app.href} className="flex-1 text-center border border-gray-200 text-gray-700 text-sm font-medium py-2.5 rounded-full hover:border-gray-400 transition-colors">
                    Learn more
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section className="py-24 px-6 md:px-14 bg-white">
        <div className="max-w-6xl mx-auto">
          <span className="text-xs font-semibold tracking-widest uppercase text-gray-400">Built for</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight text-gray-900">
            Who uses Smapey.
          </h2>
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {whoItems.map((w, i) => (
              <div key={w.title} className="border border-gray-100 rounded-3xl p-7 hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
                <span className="text-5xl font-bold text-gray-100 leading-none block mb-5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center mb-4">
                  <w.Icon size={18} className="text-gray-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{w.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-5">{w.desc}</p>
                <ul className="flex flex-col gap-2">
                  {w.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-500">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-300 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY SMAPEY */}
      <section className="bg-gray-900 py-24 px-6 md:px-14" id="why">
        <div className="max-w-6xl mx-auto">
          <span className="text-xs font-semibold tracking-widest uppercase text-gray-500">Why Smapey</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight text-white max-w-xl">
            Everything you need. Nothing you don't.
          </h2>
          <div className="mt-12 grid sm:grid-cols-2 md:grid-cols-3 gap-px bg-gray-800 rounded-3xl overflow-hidden">
            {whyItems.map(w => (
              <div key={w.title} className="bg-gray-900 p-8 hover:bg-gray-800 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center mb-5">
                  <w.Icon size={18} className="text-gray-400" />
                </div>
                <h3 className="text-base font-semibold text-white mb-2">{w.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 px-6 text-center bg-white" id="pricing">
        <div className="max-w-2xl mx-auto">
          <span className="text-xs font-semibold tracking-widest uppercase text-gray-400">Get started</span>
          <h2 className="mt-4 text-4xl md:text-5xl font-semibold tracking-tight text-gray-900">
            Ready to grow without the complexity?
          </h2>
          <p className="mt-5 text-lg text-gray-500 leading-relaxed">
            Join businesses using Smapey to invoice faster, manage members, and take back their time.
          </p>
          <div className="mt-10 flex flex-wrap gap-3 justify-center">
            <Link href="https://app.smapey.com/register?product=INVOICE&plan=FREE">
              <button className="bg-gray-900 text-white text-base font-medium px-8 py-3.5 rounded-full hover:bg-gray-700 hover:-translate-y-0.5 transition-all">
                Start free trial →
              </button>
            </Link>
            <button className="border border-gray-200 text-gray-700 text-base font-medium px-8 py-3.5 rounded-full hover:border-gray-400 transition-colors">
              View pricing
            </button>
          </div>
          <p className="mt-6 text-sm text-gray-400">
            No credit card required · Cancel anytime · Setup in minutes
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-100 px-6 md:px-14 py-8 flex flex-wrap items-center justify-between gap-4 bg-white">
        <span className="text-base font-semibold text-gray-900">Smapey</span>
        <div className="flex gap-6">
          {["Invoice", "Gym", "Privacy", "Terms"].map(l => (
            <a key={l} href="#" className="text-sm text-gray-400 hover:text-gray-600 transition-colors">{l}</a>
          ))}
        </div>
        <span className="text-sm text-gray-300">© 2025 Smapey</span>
      </footer>
    </>
  )
}
