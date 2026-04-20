"use client"

import Link from "next/link"
import { Dumbbell, FileText,Layers, Sparkles, TrendingUp, ShieldCheck, Clock, Puzzle, Briefcase, User  } from "lucide-react"
import Footer from "@/components/Footer"

const apps = [
  {
    name: "Invoice Software",
    description: "Create invoices, send instantly, and get paid faster.",
    href: "/invoice",
    register: "https://app.smapey.com/register?product=INVOICE&plan=FREE",
    tag: "Finance",
    icon: FileText,
    features: [
      "Create & send invoices",
      "Track payments",
      "Download PDF",
    ],
  },
  {
    name: "Gym Management",
    description: "Manage members, attendance, and subscriptions.",
    href: "/gym",
    register: "https://app.smapey.com/register?product=GYM&plan=FREE",
    tag: "Fitness",
    icon: Dumbbell,
    features: [
      "Member tracking",
      "QR check-in",
      "Subscription billing",
    ],
  },
]

export default function MainContent() {
  return (
    <>
    <main className="bg-white">

      {/* HERO */}
      <section className="relative bg-white overflow-hidden">

  {/* SOFT GRADIENT BACKGROUND */}
  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-100 -z-10" />

  {/* LIGHT GLOW */}
  <div className="absolute top-[-100px] right-[-100px] w-[400px] h-[400px] bg-blue-200 rounded-full blur-3xl opacity-30 -z-10" />

  <div className="max-w-7xl mx-auto px-6 py-28 grid md:grid-cols-2 gap-16 items-center">

    {/* LEFT CONTENT */}
    <div>

      <h1 className="text-4xl md:text-6xl font-semibold leading-tight mb-6 tracking-tight">
        Simple tools for{" "}
        <span className="text-blue-600">modern businesses</span>
      </h1>

      <p className="text-gray-600 text-lg max-w-lg mb-8 leading-relaxed">
        Smapey helps you manage your business clearly — from invoicing to daily operations — 
        without complexity, clutter, or unnecessary features.
      </p>

      {/* SUBTLE FEATURES (NO BUTTONS AS YOU WANTED) */}
      <div className="flex flex-wrap gap-3 text-sm text-gray-500">
        <span className="px-3 py-1 bg-white border rounded-full">Invoice</span>
        <span className="px-3 py-1 bg-white border rounded-full">Gym</span>
        <span className="px-3 py-1 bg-white border rounded-full">More tools coming</span>
      </div>

    </div>

    {/* RIGHT VISUAL */}
    <div className="relative flex justify-center">

      {/* MAIN CARD */}
      <div className="bg-white border rounded-2xl shadow-2xl p-6 w-[360px]">

        <div className="flex justify-between items-center mb-4">
          <p className="text-sm text-gray-400">Smapey</p>
          <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
            Live
          </span>
        </div>

        <h3 className="font-semibold mb-4">Business Overview</h3>

        <div className="grid grid-cols-2 gap-4 mb-5">

          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-xs text-gray-500">Invoices</p>
            <p className="text-lg font-semibold">$1,200</p>
            <div className="mt-2 h-1.5 bg-gray-200 rounded-full">
              <div className="w-2/3 h-full bg-blue-500 rounded-full" />
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-xs text-gray-500">Members</p>
            <p className="text-lg font-semibold">85</p>
            <div className="mt-2 h-1.5 bg-gray-200 rounded-full">
              <div className="w-1/2 h-full bg-blue-500 rounded-full" />
            </div>
          </div>

        </div>

        {/* FAKE LIST */}
        <div className="space-y-2">
          <div className="h-2 bg-gray-100 rounded" />
          <div className="h-2 bg-gray-100 rounded w-5/6" />
          <div className="h-2 bg-gray-100 rounded w-4/6" />
        </div>

      </div>

      {/* FLOATING CARDS */}
      <div className="absolute -left-12 top-10 bg-white border rounded-xl shadow-md px-4 py-3 text-sm">
        <p className="text-gray-400 text-xs">Invoice</p>
        <p className="font-medium">$320 Paid</p>
      </div>

      <div className="absolute -right-12 bottom-10 bg-white border rounded-xl shadow-md px-4 py-3 text-sm">
        <p className="text-gray-400 text-xs">Gym</p>
        <p className="font-medium">85 Members</p>
      </div>

      {/* ACTION FLOAT */}
      <div className="absolute -top-6 right-6 bg-blue-600 text-white text-xs px-3 py-1 rounded-full shadow">
        + New Payment
      </div>

    </div>

  </div>

</section>

 <section className="py-24 px-6 bg-white">

      {/* HEADER */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="text-3xl md:text-4xl font-semibold mb-4">
          Built for modern businesses
        </h2>

        <p className="text-gray-600">
          Whether you're running a gym, managing clients, or handling daily operations — 
          Smapey gives you the tools to stay organized and grow.
        </p>
      </div>

      {/* GRID */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">

        {/* GYM OWNERS */}
        <div className="group border rounded-2xl p-6 hover:shadow-xl transition bg-gradient-to-br from-white to-gray-50">
          
          <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-blue-50 text-blue-600 mb-4">
            <Dumbbell size={22} />
          </div>

          <h3 className="text-lg font-semibold mb-2">
            Gym Owners
          </h3>

          <p className="text-gray-600 text-sm mb-4">
            Manage members, track attendance, and handle subscriptions without hassle.
          </p>

          <ul className="text-sm text-gray-500 space-y-1 mb-6">
            <li>• Member tracking</li>
            <li>• QR check-in</li>
            <li>• Subscription billing</li>
          </ul>

          <Link
            href="/gym"
            className="text-sm text-blue-600 font-medium group-hover:underline"
          >
            Explore Gym →
          </Link>
        </div>

        {/* SMALL BUSINESSES */}
        <div className="group border rounded-2xl p-6 hover:shadow-xl transition bg-gradient-to-br from-white to-gray-50">
          
          <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-blue-50 text-blue-600 mb-4">
            <Briefcase size={22} />
          </div>

          <h3 className="text-lg font-semibold mb-2">
            Small Businesses
          </h3>

          <p className="text-gray-600 text-sm mb-4">
            Simplify your operations — from invoicing to managing daily tasks.
          </p>

          <ul className="text-sm text-gray-500 space-y-1 mb-6">
            <li>• Invoice creation</li>
            <li>• Payment tracking</li>
            <li>• Business overview</li>
          </ul>

          <Link
            href="/invoice"
            className="text-sm text-blue-600 font-medium group-hover:underline"
          >
            Explore Invoice →
          </Link>
        </div>

        {/* FREELANCERS */}
        <div className="group border rounded-2xl p-6 hover:shadow-xl transition bg-gradient-to-br from-white to-gray-50">
          
          <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-blue-50 text-blue-600 mb-4">
            <User size={22} />
          </div>

          <h3 className="text-lg font-semibold mb-2">
            Freelancers
          </h3>

          <p className="text-gray-600 text-sm mb-4">
            Keep your work organized — track clients, invoices, and payments easily.
          </p>

          <ul className="text-sm text-gray-500 space-y-1 mb-6">
            <li>• Simple invoicing</li>
            <li>• Client tracking</li>
            <li>• Payment history</li>
          </ul>

          <Link
            href="/invoice"
            className="text-sm text-blue-600 font-medium group-hover:underline"
          >
            Get Started →
          </Link>
        </div>

      </div>
    </section>

      {/* FEATURED APPS */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
      
      {/* TITLE */}
      <h2 className="text-3xl font-semibold mb-12 text-center">
        All Apps
      </h2>

      {/* GRID */}
      <div className="grid md:grid-cols-2 gap-10">

        {apps.map((app, index) => {
          const Icon = app.icon

          return (
            <div
              key={index}
              className="group relative border rounded-3xl p-8 bg-white hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full"
            >
              
              {/* TOP */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Icon size={20} />
                  </div>

                  <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                    {app.tag}
                  </span>
                </div>
              </div>

              {/* CONTENT */}
              <div className="flex flex-col flex-grow">

                <h3 className="text-xl font-semibold mb-2">
                  {app.name}
                </h3>

                <p className="text-gray-600 mb-6">
                  {app.description}
                </p>

                {/* FEATURES */}
                <ul className="space-y-2 mb-8">
                  {app.features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-sm text-gray-700"
                    >
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>

              </div>

              {/* ACTIONS */}
              <div className="flex gap-3 mt-auto">
                <Link
                  href={app.href}
                  className="flex-1 text-center px-4 py-2 text-sm border rounded-lg hover:bg-gray-50 transition"
                >
                  View
                </Link>

                <Link
                  href={app.register}
                  className="flex-1 text-center px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Try Free
                </Link>
              </div>

              {/* HOVER BORDER GLOW */}
              <div className="absolute inset-0 rounded-3xl border border-blue-500 opacity-0 group-hover:opacity-20 transition pointer-events-none" />

            </div>
          )
        })}

      </div>
    </section>


      {/* WHY SMAPEY */}
 <section className="py-24 bg-gray-50 px-6">
      
      {/* HEADER */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="text-3xl md:text-4xl font-semibold mb-4">
          Why businesses choose Smapey
        </h2>

        <p className="text-gray-600">
          Everything you need to run and grow your business — without complexity,
          clutter, or switching between tools.
        </p>
      </div>

      {/* GRID */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">

        {/* CARD 1 */}
        <div className="bg-white p-6 rounded-2xl border hover:shadow-lg transition">
          <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-blue-50 text-blue-600 mb-4">
            <Layers size={22} />
          </div>

          <h4 className="font-semibold text-lg mb-2">
            All-in-One Platform
          </h4>

          <p className="text-gray-600 text-sm mb-4">
            Manage invoices, members, payments, and daily operations from one clean dashboard.
          </p>

          <ul className="text-sm text-gray-500 space-y-1">
            <li>• No switching between apps</li>
            <li>• Unified data & reporting</li>
            <li>• Built for real workflows</li>
          </ul>
        </div>

        {/* CARD 2 */}
        <div className="bg-white p-6 rounded-2xl border hover:shadow-lg transition">
          <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-blue-50 text-blue-600 mb-4">
            <Sparkles size={22} />
          </div>

          <h4 className="font-semibold text-lg mb-2">
            Simple & Clean
          </h4>

          <p className="text-gray-600 text-sm mb-4">
            No clutter. No learning curve. Just tools that work the way you expect.
          </p>

          <ul className="text-sm text-gray-500 space-y-1">
            <li>• Minimal interface</li>
            <li>• Fast navigation</li>
            <li>• Easy onboarding</li>
          </ul>
        </div>

        {/* CARD 3 */}
        <div className="bg-white p-6 rounded-2xl border hover:shadow-lg transition">
          <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-blue-50 text-blue-600 mb-4">
            <TrendingUp size={22} />
          </div>

          <h4 className="font-semibold text-lg mb-2">
            Built to Scale
          </h4>

          <p className="text-gray-600 text-sm mb-4">
            Start simple and grow — add more tools as your business expands.
          </p>

          <ul className="text-sm text-gray-500 space-y-1">
            <li>• Flexible system</li>
            <li>• Add features anytime</li>
            <li>• No migration needed</li>
          </ul>
        </div>

        {/* CARD 4 */}
        <div className="bg-white p-6 rounded-2xl border hover:shadow-lg transition">
          <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-blue-50 text-blue-600 mb-4">
            <Clock size={22} />
          </div>

          <h4 className="font-semibold text-lg mb-2">
            Save Time Daily
          </h4>

          <p className="text-gray-600 text-sm mb-4">
            Automate repetitive tasks so you can focus on running your business.
          </p>

          <ul className="text-sm text-gray-500 space-y-1">
            <li>• Faster workflows</li>
            <li>• Less manual work</li>
            <li>• Real-time updates</li>
          </ul>
        </div>

        {/* CARD 5 */}
        <div className="bg-white p-6 rounded-2xl border hover:shadow-lg transition">
          <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-blue-50 text-blue-600 mb-4">
            <ShieldCheck size={22} />
          </div>

          <h4 className="font-semibold text-lg mb-2">
            Secure & Reliable
          </h4>

          <p className="text-gray-600 text-sm mb-4">
            Your business data is protected with modern security practices.
          </p>

          <ul className="text-sm text-gray-500 space-y-1">
            <li>• Data protection</li>
            <li>• Stable infrastructure</li>
            <li>• Always accessible</li>
          </ul>
        </div>

        {/* CARD 6 */}
        <div className="bg-white p-6 rounded-2xl border hover:shadow-lg transition">
          <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-blue-50 text-blue-600 mb-4">
            <Puzzle size={22} />
          </div>

          <h4 className="font-semibold text-lg mb-2">
            Expand Anytime
          </h4>

          <p className="text-gray-600 text-sm mb-4">
            Add new tools like Gym, Invoice, and more as your needs grow.
          </p>

          <ul className="text-sm text-gray-500 space-y-1">
            <li>• Modular system</li>
            <li>• Plug-and-play apps</li>
            <li>• Future-ready platform</li>
          </ul>
        </div>

      </div>
    </section>

      {/* CTA */}
 
    </main>
    <Footer/></>
  )
}