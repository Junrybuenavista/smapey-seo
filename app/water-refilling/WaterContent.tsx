"use client"

import { useState } from "react"
import BookDemoForm from "@/components/BookDemoForm"
import {
  Truck, Users, PackageOpen, Boxes, MessageSquare, MapPin,
  Settings, BarChart3, CheckCircle2, ChevronRight,
  CalendarCheck,
} from "lucide-react"
import InternalLinks from "@/components/InternalLinks"
import {
  Navbar, Footer, Pricing, CTA, Animate, Eyebrow,
  HeroShell, HeroBadge, TrustRow, REGISTER_URL,
} from "./_shared"

const FEATURES = [
  {
    icon: Truck,
    title: "Delivery Orders",
    desc: "Take refill orders in seconds — pick the customer, enter gallons delivered and empties returned, and move each order from Pending → Out for Delivery → Delivered. Every order gets an auto ticket number.",
    color: "from-cyan-600 to-blue-400",
    shadow: "shadow-cyan-500/20",
  },
  {
    icon: Users,
    title: "Customers & Container Deposits",
    desc: "Keep a profile for every customer with their own price per gallon and container deposit. Smapey tracks exactly how many of your containers each customer is holding at any time.",
    color: "from-blue-600 to-sky-400",
    shadow: "shadow-blue-500/20",
  },
  {
    icon: PackageOpen,
    title: "Empties Return Tracking",
    desc: "When a customer hands back empty containers — with a delivery or just dropping by — record it on the Returns page. Their outstanding container count updates instantly, no manual tally.",
    color: "from-sky-500 to-cyan-400",
    shadow: "shadow-sky-500/20",
  },
  {
    icon: Boxes,
    title: "Inventory & Refills",
    desc: "See filled stock, gallons reserved for pending deliveries, and empties on hand waiting to be refilled. One click turns refilled empties back into sellable stock.",
    color: "from-cyan-500 to-teal-400",
    shadow: "shadow-cyan-500/20",
  },
  {
    icon: MessageSquare,
    title: "Customer SMS Notifications",
    desc: "Automatically text customers when their water delivery is on the way. SMS is an optional toggle — turn it on or off whenever you like.",
    color: "from-blue-600 to-cyan-400",
    shadow: "shadow-blue-500/20",
  },
  {
    icon: MapPin,
    title: "Delivery Routes & Zones",
    desc: "Group customers by route or barangay so your delivery rider always knows where to go. Filter today's orders by route to plan the run.",
    color: "from-teal-500 to-cyan-400",
    shadow: "shadow-teal-500/20",
  },
  {
    icon: Settings,
    title: "Station Defaults",
    desc: "Set one default price per gallon, deposit per gallon, and low-stock threshold. New customers inherit them automatically — override per customer only when you need to.",
    color: "from-sky-600 to-blue-500",
    shadow: "shadow-sky-600/20",
  },
  {
    icon: BarChart3,
    title: "Dashboard & Revenue",
    desc: "See today's orders, pending deliveries, unpaid balances, current stock, outstanding containers, and a 7-day revenue trend — everything on one screen.",
    color: "from-cyan-500 to-sky-400",
    shadow: "shadow-cyan-500/20",
  },
]

const STEPS = [
  {
    step: "01",
    title: "Set your station defaults",
    desc: "Enter your default price per gallon and container deposit once. Add your delivery routes and your first customers — each one inherits your defaults automatically.",
  },
  {
    step: "02",
    title: "Take orders & deliveries",
    desc: "Create a delivery order, enter gallons delivered and empties returned, and mark it delivered. Stock goes down automatically and the customer's container balance updates.",
  },
  {
    step: "03",
    title: "Track returns, refills & cash",
    desc: "Log empties customers drop off, refill them back into stock with one click, and record Cash or GCash payments. Your dashboard shows exactly where the money and the bottles are.",
  },
]

const FAQS = [
  {
    q: "What does water refilling station software actually do?",
    a: "It replaces the notebook. Smapey tracks every delivery order, how many gallons you have in stock, how much each customer owes, and — the tricky part — how many of your containers each customer is still holding. It also handles payments and a simple revenue dashboard.",
  },
  {
    q: "How does container deposit tracking work?",
    a: "Every customer has a running count: containers you've lent out minus containers they've returned. When you deliver gallons, the count goes up; when they return empties (on the Returns page or with a delivery), it goes down. You always know who is holding your bottles.",
  },
  {
    q: "What happens to empty containers when they come back?",
    a: "Returned empties lower the customer's outstanding count but don't become sellable stock until they're refilled. Smapey shows an 'Empties on Hand' number, and a one-click Refill turns them back into filled, sellable gallons.",
  },
  {
    q: "Do my customers need to install an app?",
    a: "No. Customers don't need anything. Optional SMS notifications go straight to their phone number when a delivery is on the way.",
  },
  {
    q: "Can I use it on my phone during deliveries?",
    a: "Yes. Smapey runs in any web browser on your phone, tablet, or computer — nothing to download. Your rider can update order status from the road.",
  },
  {
    q: "Is there a free plan?",
    a: "Yes. The Free plan lets you run a small station at no cost with no credit card. Upgrade to Pro only when you outgrow the limits.",
  },
]

function Features() {
  return (
    <section id="features" className="py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        <Animate className="text-center mb-16">
          <Eyebrow>Features</Eyebrow>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">
            Everything your water station needs
          </h2>
          <p className="text-slate-500 mt-4 max-w-xl mx-auto">
            From the first delivery to tracking every borrowed container — Smapey covers the whole operation in one simple dashboard.
          </p>
        </Animate>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map(({ icon: Icon, title, desc, color, shadow }, i) => (
            <Animate key={title} delay={i * 70}>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300 h-full">
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-tr ${color} shadow-lg ${shadow} flex items-center justify-center mb-4`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold text-slate-800 mb-2">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              </div>
            </Animate>
          ))}
        </div>
      </div>
    </section>
  )
}

function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <Animate className="text-center mb-16">
          <Eyebrow>How it Works</Eyebrow>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">
            Up and running in three steps
          </h2>
        </Animate>

        <div className="grid md:grid-cols-3 gap-8">
          {STEPS.map(({ step, title, desc }, i) => (
            <Animate key={step} delay={i * 120}>
              <div className="relative text-center group">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-cyan-50 border-2 border-cyan-100 text-cyan-600 font-extrabold text-lg mb-5 group-hover:bg-gradient-to-tr group-hover:from-cyan-400 group-hover:to-blue-500 group-hover:text-white group-hover:border-transparent transition-all duration-300">
                  {step}
                </div>
                <h3 className="font-bold text-slate-800 mb-2">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              </div>
            </Animate>
          ))}
        </div>

        <Animate delay={300}>
          <div className="mt-12 text-center">
            <a href="/water-refilling/guide" className="inline-flex items-center gap-2 text-cyan-600 font-semibold text-sm hover:gap-3 transition-all">
              Read the full step-by-step guide
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </Animate>
      </div>
    </section>
  )
}

function FAQ() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section id="faq" className="py-24 bg-slate-50">
      <div className="max-w-2xl mx-auto px-6">
        <Animate className="text-center mb-16">
          <Eyebrow>FAQ</Eyebrow>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">
            Common questions
          </h2>
        </Animate>

        <div className="flex flex-col gap-3">
          {FAQS.map(({ q, a }, i) => (
            <Animate key={i} delay={i * 50}>
              <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left text-slate-700 font-medium text-sm hover:bg-slate-50 transition-colors"
                >
                  {q}
                  <ChevronRight className={`w-4 h-4 text-cyan-400 transition-transform duration-200 shrink-0 ${open === i ? "rotate-90" : ""}`} />
                </button>
                {open === i && (
                  <div className="px-5 pb-4 text-sm text-slate-500 leading-relaxed border-t border-slate-100 pt-3">
                    {a}
                  </div>
                )}
              </div>
            </Animate>
          ))}
        </div>
      </div>
    </section>
  )
}

function Hero() {
  return (
    <HeroShell>
      <div className="text-center">
        <HeroBadge>Built for water refilling stations in the Philippines</HeroBadge>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight mb-6">
          Run your water refilling station{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-400">
            without the notebook
          </span>
        </h1>
        <p className="text-lg text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed">
          Smapey tracks deliveries, customers, container deposits, returns, inventory, and payments —
          so you always know who has your bottles and where your money is.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={REGISTER_URL}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-sm transition-all shadow-lg shadow-cyan-600/30"
          >
            Start for free
            <ChevronRight className="w-4 h-4" />
          </a>
          <a
            href="#features"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white font-medium text-sm transition-all border border-white/10"
          >
            See features
          </a>
          <a
            href="#book-demo"
            onClick={(e) => { e.preventDefault(); document.getElementById("book-demo")?.scrollIntoView({ behavior: "smooth" }) }}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white font-medium text-sm transition-all border border-white/10"
          >
            <CalendarCheck className="w-4 h-4" />
            Book a Demo
          </a>
        </div>
        <TrustRow />
      </div>
    </HeroShell>
  )
}

export default function WaterContent() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Pricing />
      <FAQ />
      <BookDemoForm product="WATER_REFILLING" />
      <CTA />
      <InternalLinks cluster="water-refilling" currentPath="/water-refilling" />
      <Footer />
    </main>
  )
}
