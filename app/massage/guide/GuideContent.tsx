"use client"

import { useState, useEffect, useRef } from "react"
import { Flower2, ChevronRight, Calendar, HandHelping, HeartPulse, Globe, Inbox, BarChart3, Menu, X, ArrowLeft, BookOpen } from "lucide-react"
import InternalLinks from "@/components/InternalLinks"

const INK = "#161616"
const BLUE = "#2f6bff"
const AMBER = "#ff9e2c"
const CREAM = "#fbf7f0"
const display = { fontFamily: "'Hanken Grotesk', system-ui, sans-serif" }
const REGISTER_URL = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=MASSAGE&plan=FREE`

const SECTIONS = [
  {
    icon: Flower2,
    title: "1. Add your services",
    body: [
      "Open Services in the dashboard and add each massage offering: Swedish, deep tissue, hot stone, foot reflexology, prenatal, couples, etc.",
      "For each service, set a price, duration (30/60/90 min), an optional description, and an optional photo.",
      "Toggle services active or inactive — only active services appear on your public booking page and in the appointment booking form.",
    ],
  },
  {
    icon: HandHelping,
    title: "2. Add your therapists",
    body: [
      "Open Therapists and add each team member. Include their full name, phone, email, and a comma-separated list of specialties (e.g. \"Swedish, Deep Tissue, Hot Stone\").",
      "Therapists you mark inactive won't be assignable to new appointments but their history stays on file.",
      "When booking an appointment, you can assign a specific therapist — or leave it unassigned and decide later.",
    ],
  },
  {
    icon: HeartPulse,
    title: "3. Capture client intake",
    body: [
      "Each client profile has two notes fields: general notes (visit history, preferences) and confidential health notes (allergies, conditions, pregnancy, areas to avoid).",
      "Health notes are flagged with a badge on the client list so staff can see at a glance who has medical info on file.",
      "Each appointment can also record focus areas (e.g. \"lower back, shoulders\") and pressure preference (Light / Medium / Firm / Deep).",
    ],
  },
  {
    icon: Calendar,
    title: "4. Book and manage appointments",
    body: [
      "Create a new appointment by picking a client, service, therapist (optional), date, and time. The duration and price auto-fill from the service.",
      "Track status through the session lifecycle: Booked → In Progress → Completed (or Cancelled / No Show).",
      "Completing an appointment automatically updates the client's visit count, total spent, and last visit date.",
      "Filter the appointment list by status, therapist, date, or specific client.",
    ],
  },
  {
    icon: Globe,
    title: "5. Publish your public booking page",
    body: [
      "Open Public Page and pick a URL like smapey.com/massage/your-spa.",
      "Choose one of five spa-themed designs: Zen (soft green), Stone (slate minimal), Bamboo (warm earth), Ivory (cream luxe), or Charcoal (dark sophisticated).",
      "Upload a cover photo, add a tagline, and pick an accent color to match your brand.",
      "Share the link on Instagram, Facebook, Google Maps — anywhere clients can find you.",
    ],
  },
  {
    icon: Inbox,
    title: "6. Accept booking inquiries",
    body: [
      "When a client submits a booking request from your public page, it appears in Inquiries with their name, phone, preferred date, and notes.",
      "Approve to confirm interest, reject if you can't accommodate, then click \"Book Appointment\" to convert the inquiry into a real appointment with a client profile auto-created.",
      "Optionally enable a deposit QR code (GCash, Maya, bank) — clients will need to enter a payment reference before submitting a request.",
    ],
  },
  {
    icon: BarChart3,
    title: "7. Track your business",
    body: [
      "The dashboard shows today's appointments, monthly revenue, completed sessions, total clients and therapists, pending inquiries, and a 7-day appointment trend chart.",
      "Use it daily to know what's coming up, and at month-end to see how the spa is performing.",
    ],
  },
]

function useFont() {
  useEffect(() => {
    const id = "smapey-pop-fonts"
    if (!document.getElementById(id)) {
      const l = document.createElement("link")
      l.id = id; l.rel = "stylesheet"
      l.href = "https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600;700;800&display=swap"
      document.head.appendChild(l)
    }
  }, [])
}

function useInView() {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect() } }, { threshold: 0.15 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return { ref, inView }
}

function Animate({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, inView } = useInView()
  return (
    <div ref={ref} className={className} style={{ transitionProperty: "opacity, transform", transitionDuration: "600ms", transitionTimingFunction: "cubic-bezier(0.4,0,0.2,1)", transitionDelay: `${delay}ms`, opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(28px)" }}>
      {children}
    </div>
  )
}

function Navbar() {
  const [open, setOpen] = useState(false)
  const links = [
    { href: "/massage#features", label: "Features" },
    { href: "/massage#how-it-works", label: "How it Works" },
    { href: "/massage#pricing", label: "Pricing" },
    { href: "/massage#faq", label: "FAQ" },
    { href: "/massage/guide", label: "Guide" },
  ]
  return (
    <nav className="fixed top-0 inset-x-0 z-50" style={{ background: CREAM, borderBottom: `2px solid ${INK}`, fontFamily: display.fontFamily }}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/massage" className="flex items-center gap-2.5">
          <img src="/logo.png" alt="Smapey" className="w-8 h-8 rounded-lg object-cover" />
          <span className="font-extrabold tracking-tight" style={{ color: INK }}>Smapey Massage</span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (<a key={l.label} href={l.href} className="text-sm font-semibold hover:opacity-60 transition-opacity" style={{ color: INK }}>{l.label}</a>))}
        </div>
        <div className="hidden md:flex items-center gap-3">
          <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/login`} className="text-sm font-semibold hover:opacity-60 transition-opacity px-2 py-2" style={{ color: INK }}>Sign in</a>
          <a href={REGISTER_URL} className="text-sm font-bold px-5 py-2.5 rounded-full border-2 transition-transform hover:-translate-y-0.5" style={{ ...display, background: AMBER, color: INK, borderColor: INK, boxShadow: `3px 3px 0 ${INK}` }}>Get started</a>
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden" style={{ color: INK }}>{open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}</button>
      </div>
      {open && (
        <div className="md:hidden px-6 py-4 flex flex-col gap-4" style={{ background: CREAM, borderTop: `2px solid ${INK}` }}>
          {links.map((l) => (<a key={l.label} href={l.href} className="text-sm font-semibold" style={{ color: INK }}>{l.label}</a>))}
          <a href={REGISTER_URL} className="text-sm font-bold px-4 py-2.5 rounded-full border-2 text-center" style={{ ...display, background: AMBER, color: INK, borderColor: INK }}>Get started</a>
        </div>
      )}
    </nav>
  )
}

export default function GuideContent() {
  useFont()
  return (
    <main style={{ fontFamily: display.fontFamily }}>
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden pt-16" style={{ background: CREAM }}>
        <div className="absolute inset-0 pointer-events-none hidden md:block" aria-hidden>
          <div className="absolute rounded-[22px] border-2" style={{ top: "28%", right: "-70px", width: 280, height: 78, background: BLUE, borderColor: INK, transform: "rotate(8deg)", boxShadow: "5px 5px 0 rgba(22,22,22,.12)" }} />
        </div>
        <div className="relative max-w-3xl mx-auto px-6 pt-12 pb-14 text-center">
          <a href="/massage" className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors mb-8 hover:opacity-60" style={{ color: "#54514c" }}>
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Massage & Spa
          </a>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border-2 text-xs font-bold mb-5" style={{ color: INK, borderColor: INK, boxShadow: `3px 3px 0 ${BLUE}` }}>
            <BookOpen className="w-3 h-3" /> Step-by-step guide
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4" style={{ color: INK }}>
            How to run your massage business with Smapey
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: "#54514c" }}>
            A step-by-step walkthrough — from adding your first service to taking your first online booking.
          </p>
        </div>
      </section>

      {/* SECTIONS */}
      <section className="py-16" style={{ background: CREAM }}>
        <div className="max-w-3xl mx-auto px-6 space-y-12">
          {SECTIONS.map(({ icon: Icon, title, body }, idx) => {
            const c = idx % 2 === 0 ? BLUE : AMBER
            return (
              <Animate key={title}>
                <div className="rounded-[20px] border-2 overflow-hidden" style={{ background: "#fff", borderColor: INK, boxShadow: `6px 6px 0 ${c}` }}>
                  <div className="flex items-center gap-4 px-6 py-5" style={{ borderBottom: `2px solid ${INK}`, background: CREAM }}>
                    <div className="w-10 h-10 rounded-[12px] border-2 flex items-center justify-center shrink-0" style={{ background: c, borderColor: INK }}>
                      <Icon className="w-5 h-5" style={{ color: c === AMBER ? INK : "#fff" }} />
                    </div>
                    <h2 className="text-lg font-extrabold" style={{ color: INK }}>{title}</h2>
                  </div>
                  <div className="px-6 py-5 space-y-4">
                    {body.map((para, i) => (
                      <p key={i} className="text-sm leading-relaxed" style={{ color: "#54514c" }}>{para}</p>
                    ))}
                  </div>
                </div>
              </Animate>
            )
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6" style={{ background: "#fff" }}>
        <div className="max-w-6xl mx-auto">
          <div className="rounded-[28px] border-2 p-10 flex flex-col md:flex-row items-center justify-between gap-6" style={{ background: AMBER, borderColor: INK, boxShadow: `10px 10px 0 ${INK}` }}>
            <div>
              <h3 className="text-2xl font-extrabold mb-2" style={{ color: INK }}>Ready to set up your spa?</h3>
              <p className="text-sm font-medium" style={{ color: "#5c4a28" }}>Start free — no credit card required. Upgrade only when you outgrow the free plan.</p>
            </div>
            <a href={REGISTER_URL} className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm border-2 transition-transform hover:-translate-y-0.5 shrink-0" style={{ ...display, background: INK, color: "#fff", borderColor: INK }}>
              Start free <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      <InternalLinks cluster="massage" currentPath="/massage/guide" />

      <footer className="px-6 py-8" style={{ background: CREAM, borderTop: `2px solid ${INK}` }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Smapey" className="w-6 h-6 rounded-md object-cover" />
            <span className="text-sm font-extrabold" style={{ color: INK }}>Massage &amp; Spa by Smapey</span>
          </div>
          <p className="text-xs" style={{ color: "#9a948b" }}>© {new Date().getFullYear()} Smapey. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}
