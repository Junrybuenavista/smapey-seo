"use client"

import { useState, useEffect } from "react"
import {
  Smartphone, Hash, MessageSquare, CreditCard, BarChart3, Rocket,
  ChevronRight, Zap, BookOpen, ArrowLeft,
} from "lucide-react"
import InternalLinks from "@/components/InternalLinks"

//////////////////////////////////////////////////////
// DATA
//////////////////////////////////////////////////////
const GUIDES = [
  {
    id: "what-is-laundry-app",
    icon: Smartphone,
    title: "What Is a Laundry App?",
    badge: "Introduction",
    badgeColor: "bg-sky-50 text-sky-600 border border-sky-100",
    accentColor: "from-sky-600 to-cyan-400",
    description: "A laundry app is software that helps laundry shop owners manage orders, customers, and payments in one place — replacing notebooks, whiteboards, and manual SMS.",
    steps: [
      {
        title: "Replaces manual recordkeeping",
        detail: "Instead of writing orders in a notebook or tracking them on a whiteboard, a laundry app stores every order digitally — including service type, weight, status, and payment.",
      },
      {
        title: "Connects shop and customer",
        detail: "The app sends SMS notifications to customers when their order is received and when it's ready for pickup — no manual texting from the owner needed.",
      },
      {
        title: "Gives you a real-time dashboard",
        detail: "At any moment, you can open the dashboard and see how many orders are active, how much revenue you've collected today, and which orders are pending pickup.",
      },
    ],
    tip: "You don't need a computer. LaundryOS runs in any web browser — a smartphone or tablet is enough to manage your entire shop.",
  },
  {
    id: "key-features",
    icon: Hash,
    title: "Key Features to Look For",
    badge: "Buying Guide",
    badgeColor: "bg-blue-50 text-blue-600 border border-blue-100",
    accentColor: "from-blue-600 to-sky-400",
    description: "Not all laundry apps are the same. Here's what to look for when choosing software for a small laundry shop in the Philippines.",
    steps: [
      {
        title: "Order ticket system",
        detail: "A good laundry app auto-generates unique ticket numbers for each order (like YYMMDD-001). This prevents confusion at pickup and helps customers track their orders without calling you.",
      },
      {
        title: "SMS notifications",
        detail: "The app should send automatic SMS to customers — at minimum when the order is accepted and when it's ready. Manual texting from your personal number looks unprofessional and wastes time.",
      },
      {
        title: "Payment flexibility",
        detail: "Your app should support Cash, GCash, Maya, and Bank Transfer. In the Philippines, most customers pay via GCash — your system should record and track this per order.",
      },
      {
        title: "Free plan for small shops",
        detail: "If you're just starting out, a free plan with no time limit is essential. Avoid apps with 14-day trials that pressure you to upgrade before you've tested the product.",
      },
    ],
    tip: "LaundryOS offers a free plan with no credit card required. You can test every feature before deciding to upgrade.",
  },
  {
    id: "order-tracking",
    icon: BarChart3,
    title: "How Order Tracking Works",
    badge: "Core Feature",
    badgeColor: "bg-green-50 text-green-600 border border-green-100",
    accentColor: "from-cyan-500 to-teal-400",
    description: "Order tracking is the foundation of any laundry app. It lets you and your staff know exactly where each order is at every stage of the process.",
    steps: [
      {
        title: "Received",
        detail: "When a customer drops off laundry, you create an order: phone number, kilos, service type (e.g. Wash Dry Fold), and payment method. A ticket number is generated automatically.",
      },
      {
        title: "Washing → Drying → Ready",
        detail: "As laundry moves through your shop, you update the status. Staff can see the current state of every order without asking you — reducing confusion during busy hours.",
      },
      {
        title: "Released",
        detail: "When a customer picks up their order and pays, you mark it Released. The order moves to your completed records and is counted in your daily revenue.",
      },
      {
        title: "Full order history",
        detail: "Every order is permanently stored. You can search by ticket number, customer phone, or date to find past orders, resolve disputes, or review payment history.",
      },
    ],
    tip: "Teach your staff to update order status in real time. Customers who call to check on their laundry can be answered in seconds.",
  },
  {
    id: "sms-notifications",
    icon: MessageSquare,
    title: "SMS Notifications",
    badge: "Customer Experience",
    badgeColor: "bg-amber-50 text-amber-600 border border-amber-100",
    accentColor: "from-sky-500 to-blue-400",
    description: "Automatic SMS notifications are one of the most impactful features a laundry shop can use. They reduce incoming calls and improve customer satisfaction.",
    steps: [
      {
        title: "Order received notification",
        detail: "When you accept a new order, an SMS is automatically sent to the customer's phone number confirming their order and ticket number. This sets expectations and builds trust.",
      },
      {
        title: "Ready for pickup notification",
        detail: "When you mark an order as Ready, the customer gets an SMS immediately. This reduces the need for customers to call and ask — and gets them in the door faster.",
      },
      {
        title: "No app needed for customers",
        detail: "SMS goes directly to the customer's phone. They don't need to download an app, create an account, or check a website. Plain text works on all phones, even older ones.",
      },
      {
        title: "Toggle on or off",
        detail: "If you want to control when SMS is sent, you can toggle auto-notifications on or off from the admin panel. You can also send SMS manually at any point during an order.",
      },
    ],
    tip: "On the Pro plan, SMS is sent automatically when order status changes. On the Free plan, you can trigger SMS manually with one tap.",
  },
  {
    id: "payment-options",
    icon: CreditCard,
    title: "Payment Options",
    badge: "Billing",
    badgeColor: "bg-green-50 text-green-600 border border-green-100",
    accentColor: "from-teal-500 to-cyan-400",
    description: "In the Philippines, customers pay via a mix of cash and digital wallets. Your laundry app should handle all of them without extra setup.",
    steps: [
      {
        title: "Cash",
        detail: "The most common payment method for walk-in customers. Record cash payments per order and track outstanding balances from your dashboard.",
      },
      {
        title: "GCash",
        detail: "GCash is widely used across the Philippines. Mark orders as paid via GCash with one tap — no QR code integration needed for recording purposes.",
      },
      {
        title: "Maya",
        detail: "Maya (formerly PayMaya) is the second most popular digital wallet in the country. Supported as a payment option the same way as GCash.",
      },
      {
        title: "Bank Transfer & Others",
        detail: "For customers who prefer bank transfer, you can record the payment method and confirm it manually before marking the order as paid.",
      },
    ],
    tip: "Always confirm GCash and Maya payments before marking an order as paid. Ask customers to show the transaction confirmation on their screen.",
  },
  {
    id: "getting-started",
    icon: Rocket,
    title: "How to Get Started with Smapey",
    badge: "Quick Start",
    badgeColor: "bg-sky-50 text-sky-600 border border-sky-100",
    accentColor: "from-sky-600 to-blue-500",
    description: "Getting started with Smapey LaundryOS takes less than 5 minutes. No training, no installation, no complicated setup.",
    steps: [
      {
        title: "Create your free account",
        detail: "Go to smapey.com/laundry and click Get Started. Select the LaundryOS product and the Free plan. No credit card required.",
      },
      {
        title: "Set up your service types",
        detail: "Add the services your shop offers — Wash Dry Fold, Dry Clean, Steam Press, etc. Set a price per kilogram or per piece for each service.",
      },
      {
        title: "Accept your first order",
        detail: "Click New Order. Enter the customer's phone number and name. Choose the service type, enter the weight in kilos, and submit. Ticket number is auto-generated.",
      },
      {
        title: "Update order status as you go",
        detail: "As your laundry moves through washing and drying, update the status. When it's ready, mark it Ready — the customer gets an SMS automatically.",
      },
      {
        title: "Collect payment and release",
        detail: "When the customer arrives, confirm payment via Cash, GCash, or Maya. Mark the order as Released — it's counted in your daily revenue.",
      },
    ],
    tip: "Your first order takes about 30 seconds to create. Most shop owners are fully set up within 10 minutes of signing up.",
  },
]

//////////////////////////////////////////////////////
// HERO
//////////////////////////////////////////////////////
function Hero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: "#0a1628",
        backgroundImage: "repeating-linear-gradient(45deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 28px)",
        backgroundSize: "28px 28px",
      }}
    >
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(14,165,233,0.12) 0%, transparent 70%)" }} />
      <div className="absolute -bottom-20 -right-40 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(14,165,233,0.07) 0%, transparent 70%)" }} />

      <div className="relative max-w-6xl mx-auto px-6 pt-16 pb-14">
        <a href="/laundry" className="inline-flex items-center gap-1.5 text-white/40 hover:text-white/70 text-sm transition-colors mb-8">
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to LaundryOS
        </a>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-semibold mb-5">
          <BookOpen className="w-3 h-3" />
          Laundry Shop Guide
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
          How to Run a Laundry Shop with Software
        </h1>
        <p className="text-white/50 max-w-2xl text-lg leading-relaxed">
          Everything you need to know about laundry shop management — from tracking orders to collecting GCash payments and growing your customer base.
        </p>

        <div className="flex flex-wrap gap-2 mt-8">
          {GUIDES.map((g) => {
            const Icon = g.icon
            return (
              <a key={g.id} href={`#${g.id}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/50 hover:text-white text-xs font-medium transition-all">
                <Icon className="w-3 h-3" />
                {g.title}
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}

//////////////////////////////////////////////////////
// STICKY SIDEBAR (TOC)
//////////////////////////////////////////////////////
function Sidebar() {
  const [activeId, setActiveId] = useState<string>("")

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
    )
    GUIDES.forEach((g) => {
      const el = document.getElementById(g.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <aside className="hidden lg:block w-60 shrink-0">
      <div className="sticky top-24">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4 px-3">On this page</p>
        <nav className="flex flex-col gap-1">
          {GUIDES.map((g) => {
            const Icon = g.icon
            const isActive = activeId === g.id
            return (
              <a key={g.id} href={`#${g.id}`}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 ${
                  isActive ? "bg-slate-900 text-white font-medium shadow-sm" : "text-slate-500 hover:text-slate-700 hover:bg-slate-100"
                }`}>
                <div className={`w-6 h-6 rounded-md bg-gradient-to-tr ${g.accentColor} flex items-center justify-center shrink-0`}>
                  <Icon className="w-3 h-3 text-white" />
                </div>
                <span className="leading-snug">{g.title}</span>
              </a>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}

//////////////////////////////////////////////////////
// GUIDE CARD
//////////////////////////////////////////////////////
function GuideCard({ guide }: { guide: (typeof GUIDES)[0] }) {
  const Icon = guide.icon
  return (
    <div id={guide.id} className="mb-16 scroll-mt-24">
      <div className="flex items-start gap-4 mb-6">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${guide.accentColor} flex items-center justify-center shrink-0 shadow-lg`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold mb-2 ${guide.badgeColor}`}>
            {guide.badge}
          </span>
          <h2 className="text-xl font-bold text-slate-800">{guide.title}</h2>
          <p className="text-slate-500 text-sm mt-1 leading-relaxed">{guide.description}</p>
        </div>
      </div>

      <div className="bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden">
        {guide.steps.map((step, i) => (
          <div key={i} className={`flex gap-4 p-5 ${i < guide.steps.length - 1 ? "border-b border-slate-100" : ""}`}>
            <span className={`w-7 h-7 rounded-full bg-gradient-to-tr ${guide.accentColor} text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 shadow-sm`}>
              {i + 1}
            </span>
            <div>
              <p className="text-sm font-semibold text-slate-800 mb-1">{step.title}</p>
              <p className="text-sm text-slate-500 leading-relaxed">{step.detail}</p>
            </div>
          </div>
        ))}
      </div>

      {guide.tip && (
        <div className="mt-4 flex items-start gap-3 px-4 py-3.5 rounded-xl bg-sky-50 border border-sky-100">
          <Zap className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
          <p className="text-sm text-sky-700 leading-relaxed">
            <span className="font-semibold">Tip: </span>
            {guide.tip}
          </p>
        </div>
      )}
    </div>
  )
}

//////////////////////////////////////////////////////
// CTA
//////////////////////////////////////////////////////
function CTA() {
  return (
    <section className="py-16 border-t border-slate-100 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="rounded-2xl bg-gradient-to-br from-[#0a1628] to-sky-950 p-10 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(14,165,233,0.15) 0%, transparent 70%)" }} />
          <div className="relative">
            <h3 className="text-2xl font-extrabold text-white mb-2">Ready to set up your laundry shop?</h3>
            <p className="text-white/40 text-sm">Start for free — no credit card required. Cancel anytime.</p>
          </div>
          <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=LAUNDRY&plan=FREE`}
            className="relative inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-400 hover:from-sky-400 hover:to-cyan-300 text-white font-semibold text-sm transition-all shadow-xl shadow-sky-600/20 shrink-0">
            Create your laundry shop for free
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  )
}

//////////////////////////////////////////////////////
// FOOTER
//////////////////////////////////////////////////////
function Footer() {
  return (
    <footer className="bg-[#060b16] border-t border-white/5 px-6 py-8">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="LaundryOS" className="w-6 h-6 rounded-md object-cover" />
          <span className="text-white/60 text-sm font-semibold">LaundryOS by Smapey</span>
        </div>
        <p className="text-white/20 text-xs">© {new Date().getFullYear()} Smapey. All rights reserved.</p>
      </div>
    </footer>
  )
}

//////////////////////////////////////////////////////
// PAGE
//////////////////////////////////////////////////////
export default function GuideContent() {
  return (
    <main>
      <Hero />

      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6 flex gap-12">
          <Sidebar />
          <div className="flex-1 min-w-0">
            {GUIDES.map((guide) => (
              <GuideCard key={guide.id} guide={guide} />
            ))}
          </div>
        </div>
      </section>

      <CTA />
      <InternalLinks cluster="laundry" currentPath="/laundry/guide" />
      <Footer />
    </main>
  )
}
