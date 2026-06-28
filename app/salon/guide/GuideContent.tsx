"use client"

import { useState, useEffect } from "react"
import { CheckCircle2,
  Scissors, Calendar, Users, Globe, BarChart3,
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
    id: "introduction",
    icon: Scissors,
    title: "What Is Salon Management Software?",
    badge: "Introduction",
    description: "Salon management software helps salon owners manage appointments, clients, and services in one place — replacing paper appointment books, spreadsheets, and manual follow-up calls.",
    steps: [
      { title: "Replaces manual appointment books", detail: "Instead of writing appointments in a notebook, the app stores every booking digitally — including client name, service, assigned staff, date, time, and payment status." },
      { title: "Gives clients a way to find and book you", detail: "Your public booking page lets clients browse your service menu and send a booking inquiry online — without calling you or sending a message first." },
      { title: "Keeps your client history intact", detail: "Every appointment a client has ever made is stored in their profile. You can see what services they prefer, how often they visit, and how much they've spent." },
    ],
    tip: "You don't need a dedicated computer. Smapey SalonOS runs in any web browser — a tablet or smartphone at the reception desk is all you need.",
  },
  {
    id: "setting-up-services",
    icon: Scissors,
    title: "Setting Up Your Services",
    badge: "Getting Started",
    description: "Your service menu is the foundation of your salon setup. Everything else — your public booking page, appointments, and pricing — flows from the services you define.",
    steps: [
      { title: "Add each service you offer", detail: "Create a service for each offering: haircut, blowout, hair color, manicure, pedicure, facial, etc. Give each one a name, price, and duration in minutes." },
      { title: "Services appear on your booking page automatically", detail: "Once you save a service, it appears on your public booking page immediately. Clients can see your full menu and the prices before they inquire." },
      { title: "Update prices and durations any time", detail: "If your pricing changes or a service takes longer than expected, just edit it in the dashboard. Changes reflect on your booking page instantly." },
      { title: "Free plan supports up to 5 services", detail: "The free plan lets you add up to 5 service types. The Pro plan supports 20, and the Enterprise plan is unlimited." },
    ],
    tip: "Start with your most popular services first. You can always add more as you grow.",
  },
  {
    id: "managing-appointments",
    icon: Calendar,
    title: "Managing Appointments",
    badge: "Core Feature",
    description: "Appointments are the heart of your salon operations. Smapey SalonOS gives you a clear view of all upcoming, active, and completed appointments.",
    steps: [
      { title: "Book appointments directly", detail: "Create appointments from the dashboard: pick a client (or create a new one), choose a service, set the date and time, and assign a staff member if needed." },
      { title: "Track appointment statuses", detail: "Every appointment moves through statuses: Booked → In Progress → Completed. Update the status as the client arrives and as the service is finished." },
      { title: "Record payment at completion", detail: "When you mark an appointment as Completed, record how the client paid — Cash, GCash, or Bank Transfer. The total is added to your revenue automatically." },
      { title: "View your daily schedule", detail: "The appointment dashboard shows all bookings for the day in order. You can filter by staff member or service type to see only what's relevant to you." },
    ],
    tip: "Mark appointments as In Progress when the client is in the chair. This keeps your dashboard accurate and makes it easy to see who's currently being served.",
  },
  {
    id: "public-booking-page",
    icon: Globe,
    title: "Using the Public Booking Page",
    badge: "Client Experience",
    description: "Every salon account gets a public-facing booking page — a simple, mobile-friendly page where clients can browse your services and send a booking inquiry.",
    steps: [
      { title: "Your page is live the moment you add services", detail: "Once you save your first service, your booking page is live. No coding, no website builder, no extra configuration required." },
      { title: "Share your link everywhere", detail: "Post your booking page URL on Instagram, Facebook, WhatsApp, TikTok, or print it on your business card. Anywhere clients can click or scan a QR code." },
      { title: "Clients submit booking inquiries", detail: "When a client finds a service they want, they can submit a booking inquiry with their preferred date and time. You'll see it in your Inquiries dashboard immediately." },
      { title: "Accept inquiries and convert them to appointments", detail: "Review the inquiry, confirm the slot, and with one click convert it into a confirmed appointment. The client is notified and the appointment appears in your dashboard." },
    ],
    tip: "Add your booking page link to your Instagram bio. Most small salon clients discover and book through social media first.",
  },
  {
    id: "client-management",
    icon: Users,
    title: "Client Management",
    badge: "Client Records",
    description: "Your client list is one of your most valuable business assets. Smapey SalonOS stores every client's contact details, appointment history, and notes in one searchable profile.",
    steps: [
      { title: "Create client profiles", detail: "Add clients by name, phone number, and email. You can create a client profile when booking an appointment or when they submit a booking inquiry." },
      { title: "Search clients instantly", detail: "Find any client by typing their name or phone number. The search works across your entire client list — no scrolling through a long list needed." },
      { title: "View full appointment history", detail: "Every appointment a client has ever had — including service, date, amount, and payment method — is stored in their profile. This is useful for personalizing service." },
      { title: "Add notes per client", detail: "Record client preferences and notes directly in their profile — preferred products, color formulas, allergy notes, or anything else your staff should know." },
    ],
    tip: "Use client notes to record hair color formulas, nail preferences, or skin sensitivities. Your clients will notice when you remember the details.",
  },
  {
    id: "analytics",
    icon: BarChart3,
    title: "Analytics and Revenue Tracking",
    badge: "Business Insights",
    description: "The analytics dashboard gives you a real-time view of how your salon is performing — revenue, appointments, and pending inquiries — all from one screen.",
    steps: [
      { title: "Monthly revenue at a glance", detail: "The dashboard shows your total revenue for the current month, updated in real time as appointments are completed and payments are recorded." },
      { title: "Appointment count and completion rate", detail: "See how many appointments were booked, how many were completed, and how many are still pending. This helps you spot slow periods and plan staff schedules." },
      { title: "Pending inquiries", detail: "Your dashboard alerts you to any unreviewed booking inquiries. Respond quickly to avoid losing clients to competitors who respond faster." },
      { title: "Getting started with Smapey SalonOS", detail: "Go to smapey.com/salon and click Get Started. Choose the SalonOS product and the free plan. Add your services and your public booking page is live in minutes." },
    ],
    tip: "Check your dashboard at the start and end of each day. It takes 30 seconds and keeps you on top of revenue, pending bookings, and the day's schedule.",
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
        <a href="/salon" className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors mb-8 hover:opacity-60" style={{ color: "#54514c" }}>
          <ArrowLeft className="w-3.5 h-3.5" /> Back to SalonOS
        </a>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border-2 text-xs font-bold mb-5" style={{ color: INK, borderColor: INK, boxShadow: `3px 3px 0 ${BLUE}` }}>
          <BookOpen className="w-3 h-3" /> Salon Management Guide
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4" style={{ color: INK }}>
          How to Run a Salon with Software
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed" style={{ color: "#54514c" }}>
          Everything you need to know about salon management — from setting up your service menu to managing client records and tracking revenue.
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
            <h3 className="text-2xl font-extrabold mb-2" style={{ color: INK }}>Ready to set up your salon?</h3>
            <p className="text-sm font-medium" style={{ color: "#5c4a28" }}>Start for free — no credit card required. Cancel anytime.</p>
          </div>
          <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=SALON&plan=FREE`} className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm border-2 transition-transform hover:-translate-y-0.5 shrink-0" style={{ ...display, background: INK, color: "#fff", borderColor: INK }}>
            Create your salon for free <ChevronRight className="w-4 h-4" />
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
          <img src="/logo.png" alt="SalonOS" className="w-6 h-6 rounded-md object-cover" />
          <span className="text-sm font-extrabold" style={{ color: INK }}>SalonOS by Smapey</span>
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
      <InternalLinks cluster="salon" currentPath="/salon/guide" />
      <Footer />
    </main>
  )
}
