"use client"

import { useState, useEffect } from "react"
import {
  Scissors, Calendar, Users, Globe, Inbox, BarChart3,
  ChevronRight, Zap, BookOpen, ArrowLeft,
} from "lucide-react"
import InternalLinks from "@/components/InternalLinks"
import SalonVideo from "@/components/SalonVideo"

//////////////////////////////////////////////////////
// DATA
//////////////////////////////////////////////////////
const GUIDES = [
  {
    id: "introduction",
    icon: Scissors,
    title: "What Is Salon Management Software?",
    badge: "Introduction",
    badgeColor: "bg-pink-50 text-pink-600 border border-pink-100",
    accentColor: "from-pink-600 to-rose-400",
    description: "Salon management software helps salon owners manage appointments, clients, and services in one place — replacing paper appointment books, spreadsheets, and manual follow-up calls.",
    steps: [
      {
        title: "Replaces manual appointment books",
        detail: "Instead of writing appointments in a notebook, the app stores every booking digitally — including client name, service, assigned staff, date, time, and payment status.",
      },
      {
        title: "Gives clients a way to find and book you",
        detail: "Your public booking page lets clients browse your service menu and send a booking inquiry online — without calling you or sending a message first.",
      },
      {
        title: "Keeps your client history intact",
        detail: "Every appointment a client has ever made is stored in their profile. You can see what services they prefer, how often they visit, and how much they've spent.",
      },
    ],
    tip: "You don't need a dedicated computer. Smapey SalonOS runs in any web browser — a tablet or smartphone at the reception desk is all you need.",
  },
  {
    id: "setting-up-services",
    icon: Scissors,
    title: "Setting Up Your Services",
    badge: "Getting Started",
    badgeColor: "bg-rose-50 text-rose-600 border border-rose-100",
    accentColor: "from-rose-600 to-pink-400",
    description: "Your service menu is the foundation of your salon setup. Everything else — your public booking page, appointments, and pricing — flows from the services you define.",
    steps: [
      {
        title: "Add each service you offer",
        detail: "Create a service for each offering: haircut, blowout, hair color, manicure, pedicure, facial, etc. Give each one a name, price, and duration in minutes.",
      },
      {
        title: "Services appear on your booking page automatically",
        detail: "Once you save a service, it appears on your public booking page immediately. Clients can see your full menu and the prices before they inquire.",
      },
      {
        title: "Update prices and durations any time",
        detail: "If your pricing changes or a service takes longer than expected, just edit it in the dashboard. Changes reflect on your booking page instantly.",
      },
      {
        title: "Free plan supports up to 5 services",
        detail: "The free plan lets you add up to 5 service types. The Pro plan supports 20, and the Enterprise plan is unlimited.",
      },
    ],
    tip: "Start with your most popular services first. You can always add more as you grow.",
  },
  {
    id: "managing-appointments",
    icon: Calendar,
    title: "Managing Appointments",
    badge: "Core Feature",
    badgeColor: "bg-fuchsia-50 text-fuchsia-600 border border-fuchsia-100",
    accentColor: "from-fuchsia-600 to-pink-400",
    description: "Appointments are the heart of your salon operations. Smapey SalonOS gives you a clear view of all upcoming, active, and completed appointments.",
    steps: [
      {
        title: "Book appointments directly",
        detail: "Create appointments from the dashboard: pick a client (or create a new one), choose a service, set the date and time, and assign a staff member if needed.",
      },
      {
        title: "Track appointment statuses",
        detail: "Every appointment moves through statuses: Booked → In Progress → Completed. Update the status as the client arrives and as the service is finished.",
      },
      {
        title: "Record payment at completion",
        detail: "When you mark an appointment as Completed, record how the client paid — Cash, GCash, or Bank Transfer. The total is added to your revenue automatically.",
      },
      {
        title: "View your daily schedule",
        detail: "The appointment dashboard shows all bookings for the day in order. You can filter by staff member or service type to see only what's relevant to you.",
      },
    ],
    tip: "Mark appointments as In Progress when the client is in the chair. This keeps your dashboard accurate and makes it easy to see who's currently being served.",
  },
  {
    id: "public-booking-page",
    icon: Globe,
    title: "Using the Public Booking Page",
    badge: "Client Experience",
    badgeColor: "bg-pink-50 text-pink-600 border border-pink-100",
    accentColor: "from-pink-500 to-rose-400",
    description: "Every salon account gets a public-facing booking page — a simple, mobile-friendly page where clients can browse your services and send a booking inquiry.",
    steps: [
      {
        title: "Your page is live the moment you add services",
        detail: "Once you save your first service, your booking page is live. No coding, no website builder, no extra configuration required.",
      },
      {
        title: "Share your link everywhere",
        detail: "Post your booking page URL on Instagram, Facebook, WhatsApp, TikTok, or print it on your business card. Anywhere clients can click or scan a QR code.",
      },
      {
        title: "Clients submit booking inquiries",
        detail: "When a client finds a service they want, they can submit a booking inquiry with their preferred date and time. You'll see it in your Inquiries dashboard immediately.",
      },
      {
        title: "Accept inquiries and convert them to appointments",
        detail: "Review the inquiry, confirm the slot, and with one click convert it into a confirmed appointment. The client is notified and the appointment appears in your dashboard.",
      },
    ],
    tip: "Add your booking page link to your Instagram bio. Most small salon clients discover and book through social media first.",
  },
  {
    id: "client-management",
    icon: Users,
    title: "Client Management",
    badge: "Client Records",
    badgeColor: "bg-rose-50 text-rose-600 border border-rose-100",
    accentColor: "from-rose-500 to-fuchsia-400",
    description: "Your client list is one of your most valuable business assets. Smapey SalonOS stores every client's contact details, appointment history, and notes in one searchable profile.",
    steps: [
      {
        title: "Create client profiles",
        detail: "Add clients by name, phone number, and email. You can create a client profile when booking an appointment or when they submit a booking inquiry.",
      },
      {
        title: "Search clients instantly",
        detail: "Find any client by typing their name or phone number. The search works across your entire client list — no scrolling through a long list needed.",
      },
      {
        title: "View full appointment history",
        detail: "Every appointment a client has ever had — including service, date, amount, and payment method — is stored in their profile. This is useful for personalizing service.",
      },
      {
        title: "Add notes per client",
        detail: "Record client preferences and notes directly in their profile — preferred products, color formulas, allergy notes, or anything else your staff should know.",
      },
    ],
    tip: "Use client notes to record hair color formulas, nail preferences, or skin sensitivities. Your clients will notice when you remember the details.",
  },
  {
    id: "analytics",
    icon: BarChart3,
    title: "Analytics and Revenue Tracking",
    badge: "Business Insights",
    badgeColor: "bg-pink-50 text-pink-600 border border-pink-100",
    accentColor: "from-pink-600 to-fuchsia-500",
    description: "The analytics dashboard gives you a real-time view of how your salon is performing — revenue, appointments, and pending inquiries — all from one screen.",
    steps: [
      {
        title: "Monthly revenue at a glance",
        detail: "The dashboard shows your total revenue for the current month, updated in real time as appointments are completed and payments are recorded.",
      },
      {
        title: "Appointment count and completion rate",
        detail: "See how many appointments were booked, how many were completed, and how many are still pending. This helps you spot slow periods and plan staff schedules.",
      },
      {
        title: "Pending inquiries",
        detail: "Your dashboard alerts you to any unreviewed booking inquiries. Respond quickly to avoid losing clients to competitors who respond faster.",
      },
      {
        title: "Getting started with Smapey SalonOS",
        detail: "Go to smapey.com/salon and click Get Started. Choose the SalonOS product and the free plan. Add your services and your public booking page is live in minutes.",
      },
    ],
    tip: "Check your dashboard at the start and end of each day. It takes 30 seconds and keeps you on top of revenue, pending bookings, and the day's schedule.",
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
        background: "#120a18",
        backgroundImage: "repeating-linear-gradient(45deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 28px)",
        backgroundSize: "28px 28px",
      }}
    >
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(236,72,153,0.12) 0%, transparent 70%)" }} />
      <div className="absolute -bottom-20 -right-40 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(236,72,153,0.07) 0%, transparent 70%)" }} />

      <div className="relative max-w-6xl mx-auto px-6 pt-16 pb-14">
        <a href="/salon" className="inline-flex items-center gap-1.5 text-white/40 hover:text-white/70 text-sm transition-colors mb-8">
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to SalonOS
        </a>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs font-semibold mb-5">
          <BookOpen className="w-3 h-3" />
          Salon Management Guide
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
          How to Run a Salon with Software
        </h1>
        <p className="text-white/50 max-w-2xl text-lg leading-relaxed">
          Everything you need to know about salon management — from setting up your service menu to managing client records and tracking revenue.
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
          if (entry.isIntersecting) setActiveId(entry.target.id)
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
        <div className="mt-4 flex items-start gap-3 px-4 py-3.5 rounded-xl bg-pink-50 border border-pink-100">
          <Zap className="w-4 h-4 text-pink-500 shrink-0 mt-0.5" />
          <p className="text-sm text-pink-700 leading-relaxed">
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
        <div className="rounded-2xl bg-gradient-to-br from-[#120a18] to-pink-950 p-10 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(236,72,153,0.15) 0%, transparent 70%)" }} />
          <div className="relative">
            <h3 className="text-2xl font-extrabold text-white mb-2">Ready to set up your salon?</h3>
            <p className="text-white/40 text-sm">Start for free — no credit card required. Cancel anytime.</p>
          </div>
          <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=SALON&plan=FREE`}
            className="relative inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-pink-600 to-rose-400 hover:from-pink-500 hover:to-rose-300 text-white font-semibold text-sm transition-all shadow-xl shadow-pink-500/20 shrink-0">
            Create your salon for free
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
    <footer className="bg-[#0a0612] border-t border-white/5 px-6 py-8">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="SalonOS" className="w-6 h-6 rounded-md object-cover" />
          <span className="text-white/60 text-sm font-semibold">SalonOS by Smapey</span>
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
      <SalonVideo />

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
      <InternalLinks cluster="salon" currentPath="/salon/guide" />
      <Footer />
    </main>
  )
}
