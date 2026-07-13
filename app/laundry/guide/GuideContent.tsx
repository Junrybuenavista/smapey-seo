"use client"

import { useState, useEffect } from "react"
import { CheckCircle2,
  Smartphone, Hash, MessageSquare, CreditCard, BarChart3, Rocket,
  ChevronRight, Zap, BookOpen, ArrowLeft,
} from "lucide-react"
import InternalLinks from "@/components/InternalLinks"

const INK = "#161616"
const BLUE = "#2f6bff"
const AMBER = "#ff9e2c"
const CREAM = "#fbf7f0"
const display = { fontFamily: "'Hanken Grotesk', system-ui, sans-serif" }

const GUIDES = [
  {
    id: "what-is-laundry-app",
    icon: Smartphone,
    title: "What Is a Laundry App?",
    badge: "Introduction",
    description: "A laundry app is software that helps laundry shop owners manage orders, customers, and payments in one place, replacing notebooks, whiteboards, and manual SMS.",
    steps: [
      { title: "Replaces manual recordkeeping", detail: "Instead of writing orders in a notebook or tracking them on a whiteboard, a laundry app stores every order digitally - including service type, weight, status, and payment." },
      { title: "Connects shop and customer", detail: "The app sends SMS notifications to customers when their order is received and when it's ready for pickup - no manual texting from the owner needed." },
      { title: "Gives you a real-time dashboard", detail: "At any moment, you can open the dashboard and see how many orders are active, how much revenue you've collected today, and which orders are pending pickup." },
    ],
    tip: "You don't need a computer. LaundryOS runs in any web browser, a smartphone or tablet is enough to manage your entire shop.",
  },
  {
    id: "key-features",
    icon: Hash,
    title: "Key Features to Look For",
    badge: "Buying Guide",
    description: "Not all laundry apps are the same. Here's what to look for when choosing software for a small laundry shop in the Philippines.",
    steps: [
      { title: "Order ticket system", detail: "A good laundry app auto-generates unique ticket numbers for each order (like YYMMDD-001). This prevents confusion at pickup and helps customers track their orders without calling you." },
      { title: "SMS notifications", detail: "The app should send automatic SMS to customers - at minimum when the order is accepted and when it's ready. Manual texting from your personal number looks unprofessional and wastes time." },
      { title: "Payment flexibility", detail: "Your app should support Cash, GCash, Maya, and Bank Transfer. In the Philippines, most customers pay via GCash - your system should record and track this per order." },
      { title: "Free plan for small shops", detail: "If you're just starting out, a free plan with no time limit is essential. Avoid apps with 14-day trials that pressure you to upgrade before you've tested the product." },
    ],
    tip: "LaundryOS offers a free plan with no credit card required. You can test every feature before deciding to upgrade.",
  },
  {
    id: "order-tracking",
    icon: BarChart3,
    title: "How Order Tracking Works",
    badge: "Core Feature",
    description: "Order tracking is the foundation of any laundry app. It lets you and your staff know exactly where each order is at every stage of the process.",
    steps: [
      { title: "Received", detail: "When a customer drops off laundry, you create an order: phone number, kilos, service type (e.g. Wash Dry Fold), and payment method. A ticket number is generated automatically." },
      { title: "Washing → Drying → Ready", detail: "As laundry moves through your shop, you update the status. Staff can see the current state of every order without asking you - reducing confusion during busy hours." },
      { title: "Released", detail: "When a customer picks up their order and pays, you mark it Released. The order moves to your completed records and is counted in your daily revenue." },
      { title: "Full order history", detail: "Every order is permanently stored. You can search by ticket number, customer phone, or date to find past orders, resolve disputes, or review payment history." },
    ],
    tip: "Teach your staff to update order status in real time. Customers who call to check on their laundry can be answered in seconds.",
  },
  {
    id: "sms-notifications",
    icon: MessageSquare,
    title: "SMS Notifications",
    badge: "Customer Experience",
    description: "Automatic SMS notifications are one of the most impactful features a laundry shop can use. They reduce incoming calls and improve customer satisfaction.",
    steps: [
      { title: "Order received notification", detail: "When you accept a new order, an SMS is automatically sent to the customer's phone number confirming their order and ticket number. This sets expectations and builds trust." },
      { title: "Ready for pickup notification", detail: "When you mark an order as Ready, the customer gets an SMS immediately. This reduces the need for customers to call and ask - and gets them in the door faster." },
      { title: "No app needed for customers", detail: "SMS goes directly to the customer's phone. They don't need to download an app, create an account, or check a website. Plain text works on all phones, even older ones." },
      { title: "Toggle on or off", detail: "If you want to control when SMS is sent, you can toggle auto-notifications on or off from the admin panel. You can also send SMS manually at any point during an order." },
    ],
    tip: "On the Pro plan, SMS is sent automatically when order status changes. On the Free plan, you can trigger SMS manually with one tap.",
  },
  {
    id: "payment-options",
    icon: CreditCard,
    title: "Payment Options",
    badge: "Billing",
    description: "In the Philippines, customers pay via a mix of cash and digital wallets. Your laundry app should handle all of them without extra setup.",
    steps: [
      { title: "Cash", detail: "The most common payment method for walk-in customers. Record cash payments per order and track outstanding balances from your dashboard." },
      { title: "GCash", detail: "GCash is widely used across the Philippines. Mark orders as paid via GCash with one tap - no QR code integration needed for recording purposes." },
      { title: "Maya", detail: "Maya (formerly PayMaya) is the second most popular digital wallet in the country. Supported as a payment option the same way as GCash." },
      { title: "Bank Transfer & Others", detail: "For customers who prefer bank transfer, you can record the payment method and confirm it manually before marking the order as paid." },
    ],
    tip: "Always confirm GCash and Maya payments before marking an order as paid. Ask customers to show the transaction confirmation on their screen.",
  },
  {
    id: "getting-started",
    icon: Rocket,
    title: "How to Get Started with Smapey",
    badge: "Quick Start",
    description: "Getting started with Smapey LaundryOS takes less than 5 minutes. No training, no installation, no complicated setup.",
    steps: [
      { title: "Create your free account", detail: "Go to smapey.com/laundry and click Get Started. Select the LaundryOS product and the Free plan. No credit card required." },
      { title: "Set up your service types", detail: "Add the services your shop offers - Wash Dry Fold, Dry Clean, Steam Press, etc. Set a price per kilogram or per piece for each service." },
      { title: "Accept your first order", detail: "Click New Order. Enter the customer's phone number and name. Choose the service type, enter the weight in kilos, and submit. Ticket number is auto-generated." },
      { title: "Update order status as you go", detail: "As your laundry moves through washing and drying, update the status. When it's ready, mark it Ready - the customer gets an SMS automatically." },
      { title: "Collect payment and release", detail: "When the customer arrives, confirm payment via Cash, GCash, or Maya. Mark the order as Released - it's counted in your daily revenue." },
    ],
    tip: "Your first order takes about 30 seconds to create. Most shop owners are fully set up within 10 minutes of signing up.",
  },
]

const accentFor = (i: number) => (i % 2 === 0 ? BLUE : AMBER)
const onAccent = (c: string) => (c === AMBER ? INK : "#fff")

function useFont() {
  useEffect(() => {
    const id = "smapey-pop-fonts"
    if (!document.getElementById(id)) {
      const l = document.createElement("link"); l.id = id; l.rel = "stylesheet"
      l.href = "https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600;700;800&display=swap"
      document.head.appendChild(l)
    }
  }, [])
}

function Hero() {
  return (
    <section className="relative overflow-hidden pt-16" style={{ background: CREAM, fontFamily: display.fontFamily }}>
      <div className="absolute inset-0 pointer-events-none hidden md:block" aria-hidden>
        <div className="absolute rounded-[22px] border-2" style={{ top: "30%", right: "-70px", width: 280, height: 78, background: BLUE, borderColor: INK, transform: "rotate(8deg)", boxShadow: "5px 5px 0 rgba(22,22,22,.12)" }} />
      </div>
      <div className="relative max-w-6xl mx-auto px-6 pt-12 pb-14">
        <a href="/laundry" className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors mb-8 hover:opacity-60" style={{ color: "#54514c" }}>
          <ArrowLeft className="w-3.5 h-3.5" /> Back to LaundryOS
        </a>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border-2 text-xs font-bold mb-5" style={{ color: INK, borderColor: INK, boxShadow: `3px 3px 0 ${BLUE}` }}>
          <BookOpen className="w-3 h-3" /> Laundry Shop Guide
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4" style={{ color: INK }}>
          How to Run a Laundry Shop with Software
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed" style={{ color: "#54514c" }}>
          Everything you need to know about laundry shop management, from tracking orders to collecting GCash payments and growing your customer base.
        </p>
          <div className="flex flex-wrap items-center justify-start gap-6 text-xs font-semibold mt-8" style={{ color: "#54514c" }}>
            {["5-minute setup", "No training required", "Free plan available"].map((t) => (
              <span key={t} className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />{t}</span>
            ))}
          </div>
        <div className="flex flex-wrap gap-2.5 mt-8">
          {GUIDES.map((g, i) => {
            const Icon = g.icon
            const c = accentFor(i)
            return (
              <a key={g.id} href={`#${g.id}`} className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white border-2 text-xs font-bold transition-transform hover:-translate-y-0.5" style={{ color: INK, borderColor: INK }}>
                <span className="w-4 h-4 rounded-[5px] border flex items-center justify-center" style={{ background: c, borderColor: INK }}>
                  <Icon className="w-2.5 h-2.5" style={{ color: onAccent(c) }} />
                </span>
                {g.title}
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function Sidebar() {
  const [activeId, setActiveId] = useState<string>("")
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { for (const entry of entries) { if (entry.isIntersecting) setActiveId(entry.target.id) } },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
    )
    GUIDES.forEach((g) => { const el = document.getElementById(g.id); if (el) observer.observe(el) })
    return () => observer.disconnect()
  }, [])
  return (
    <aside className="hidden lg:block w-60 shrink-0">
      <div className="sticky top-24">
        <p className="text-xs font-bold uppercase tracking-widest mb-4 px-3" style={{ color: "#9a948b" }}>On this page</p>
        <nav className="flex flex-col gap-1.5">
          {GUIDES.map((g, i) => {
            const Icon = g.icon
            const isActive = activeId === g.id
            const c = accentFor(i)
            return (
              <a key={g.id} href={`#${g.id}`} onClick={() => setActiveId(g.id)}
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-[12px] text-sm transition-all duration-200 border-2"
                style={isActive ? { background: INK, color: "#fff", borderColor: INK, fontWeight: 700 } : { background: "transparent", color: "#54514c", borderColor: "transparent", fontWeight: 600 }}>
                <span className="w-6 h-6 rounded-[7px] border flex items-center justify-center shrink-0" style={{ background: c, borderColor: INK }}>
                  <Icon className="w-3 h-3" style={{ color: onAccent(c) }} />
                </span>
                <span className="leading-snug">{g.title}</span>
              </a>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}

function GuideCard({ guide, index }: { guide: (typeof GUIDES)[0]; index: number }) {
  const Icon = guide.icon
  const c = accentFor(index)
  return (
    <div id={guide.id} className="mb-16 scroll-mt-24">
      <div className="flex items-start gap-4 mb-6">
        <div className="w-12 h-12 rounded-[14px] border-2 flex items-center justify-center shrink-0" style={{ background: c, borderColor: INK }}>
          <Icon className="w-6 h-6" style={{ color: onAccent(c) }} />
        </div>
        <div>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full border-2 text-xs font-bold mb-2" style={{ background: "#fff", color: INK, borderColor: INK }}>{guide.badge}</span>
          <h2 className="text-xl font-extrabold" style={{ color: INK }}>{guide.title}</h2>
          <p className="text-sm mt-1 leading-relaxed" style={{ color: "#54514c" }}>{guide.description}</p>
        </div>
      </div>
      <div className="rounded-[20px] border-2 overflow-hidden" style={{ background: "#fff", borderColor: INK, boxShadow: `6px 6px 0 ${c}` }}>
        {guide.steps.map((step, i) => (
          <div key={i} className="flex gap-4 p-5" style={i < guide.steps.length - 1 ? { borderBottom: "1px solid rgba(22,22,22,.1)" } : undefined}>
            <span className="w-7 h-7 rounded-full border-2 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5" style={{ background: c, color: onAccent(c), borderColor: INK }}>{i + 1}</span>
            <div>
              <p className="text-sm font-bold mb-1" style={{ color: INK }}>{step.title}</p>
              <p className="text-sm leading-relaxed" style={{ color: "#54514c" }}>{step.detail}</p>
            </div>
          </div>
        ))}
      </div>
      {guide.tip && (
        <div className="mt-4 flex items-start gap-3 px-4 py-3.5 rounded-[14px] border-2" style={{ background: "#fff7e8", borderColor: INK }}>
          <Zap className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "#b06c00" }} />
          <p className="text-sm leading-relaxed" style={{ color: "#5c4a28" }}>
            <span className="font-bold">Tip: </span>{guide.tip}
          </p>
        </div>
      )}
    </div>
  )
}

function CTA() {
  return (
    <section className="py-16 px-6" style={{ background: "#fff", fontFamily: display.fontFamily }}>
      <div className="max-w-6xl mx-auto">
        <div className="rounded-[28px] border-2 p-10 flex flex-col md:flex-row items-center justify-between gap-6" style={{ background: AMBER, borderColor: INK, boxShadow: `10px 10px 0 ${INK}` }}>
          <div>
            <h3 className="text-2xl font-extrabold mb-2" style={{ color: INK }}>Ready to set up your laundry shop?</h3>
            <p className="text-sm font-medium" style={{ color: "#5c4a28" }}>Start for free, no credit card required. Cancel anytime.</p>
          </div>
          <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=LAUNDRY&plan=FREE`} className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm border-2 transition-transform hover:-translate-y-0.5 shrink-0" style={{ ...display, background: INK, color: "#fff", borderColor: INK }}>
            Create your laundry shop for free <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="px-6 py-8" style={{ background: CREAM, borderTop: `2px solid ${INK}`, fontFamily: display.fontFamily }}>
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="LaundryOS" className="w-6 h-6 rounded-md object-cover" />
          <span className="text-sm font-extrabold" style={{ color: INK }}>LaundryOS by Smapey</span>
        </div>
        <p className="text-xs" style={{ color: "#9a948b" }}>© {new Date().getFullYear()} Smapey. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default function GuideContent() {
  useFont()
  return (
    <main style={{ fontFamily: display.fontFamily }}>
      <Hero />
      <section className="py-16" style={{ background: CREAM }}>
        <div className="max-w-6xl mx-auto px-6 flex gap-12">
          <Sidebar />
          <div className="flex-1 min-w-0">
            {GUIDES.map((guide, i) => (
              <GuideCard key={guide.id} guide={guide} index={i} />
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
