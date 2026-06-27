"use client"

import { useState, useEffect, useRef } from "react"
import InternalLinks from "@/components/InternalLinks"
import {
  BookOpen, Users, CalendarDays, CheckCircle2, ChevronRight,
  Menu, X, PawPrint, ListOrdered, BarChart3, Syringe,
  Receipt, Clock, Bell, Shield, Lightbulb, Globe, Camera, ArrowLeft,
} from "lucide-react"

const INK = "#161616"
const BLUE = "#2f6bff"
const AMBER = "#ff9e2c"
const CREAM = "#fbf7f0"
const display = { fontFamily: "'Hanken Grotesk', system-ui, sans-serif" }
const REGISTER_URL = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=VET_CLINIC&plan=FREE`

const SECTIONS = [
  {
    id: "setup",
    icon: PawPrint,
    title: "1. Set Up Your Vet Clinic",
    steps: [
      { title: "Create your Smapey account", desc: "Sign up at smapey.com and select Vet Clinic Manager as your product. Your clinic's private workspace is created instantly — no credit card required on the free plan." },
      { title: "Add your veterinarians", desc: "Go to the Vets page and click Add Vet. Enter the vet's name, specialty (e.g. General Practitioner, Surgeon, Exotic Animals), phone, and email. Toggle them Active when they're ready to accept appointments." },
      { title: "Set vet schedules", desc: "Click on a vet's name to manage their availability. Use Add Schedule to define which days and hours they work — e.g. Monday 08:00–17:00. You can add multiple time slots per day and repeat for each working day." },
      { title: "Invite your team", desc: "Go to Settings → Team and invite receptionists or assistants by email. They can log in with their own account and work simultaneously on the same live system. Assign Admin or Member roles based on their responsibilities." },
    ],
  },
  {
    id: "pets",
    icon: Users,
    title: "2. Register Pets",
    steps: [
      { title: "Open the Pets page", desc: "Navigate to Vet Clinic → Pets from the sidebar." },
      { title: "Click Add Pet", desc: "Enter the pet's name, species (Dog, Cat, Bird, Reptile, etc.), breed, date of birth, weight, and sex. Add the owner's name, phone, and email so you can follow up on vaccinations or send appointment reminders." },
      { title: "Add a pet photo", desc: "Upload a photo from your device or snap one on the spot with Take Photo using your phone or tablet camera. The picture shows on the pet's profile, in patient lists, and on their bills — making it easy to match the right pet at a glance." },
      { title: "Add medical notes", desc: "Use the Notes field to record known allergies, chronic conditions, or important background — visible to every vet who looks up the pet's record." },
      { title: "View pet history", desc: "Click Details on any pet to see their full profile — photo, all past appointments, vaccination records, and billing history in one place." },
    ],
  },
  {
    id: "appointments",
    icon: CalendarDays,
    title: "3. Book Appointments",
    steps: [
      { title: "Open the Appointments page", desc: "Navigate to Vet Clinic → Appointments from the sidebar." },
      { title: "Click Book Appointment", desc: "Select the pet (from your registered list), the attending vet, the appointment date, and start time. The form only shows vets who are scheduled on that day." },
      { title: "Add a reason for visit", desc: "Enter the chief complaint — e.g. Annual check-up, Vomiting, Post-surgery follow-up. This helps the vet prepare and makes records more useful over time." },
      { title: "Manage appointment status", desc: "Appointments move through a guided workflow: Pending → Confirmed → In Queue → In Progress → Completed. You can also mark them Cancelled or No Show. The system prevents invalid jumps — a completed visit can't be sent back to the queue — and every change is logged automatically." },
    ],
  },
  {
    id: "online-booking",
    icon: Globe,
    title: "4. Accept Online Bookings",
    steps: [
      { title: "Set up your booking page", desc: "Go to Vet Clinic → Online Booking and claim a short web address for your clinic — for example smapey.com/vet/your-clinic-name. This is your public booking page; no login is required for pet owners to use it." },
      { title: "Share the link", desc: "Copy your booking link and put it on your Facebook page, Google profile, or website. Pet owners open it on any phone or computer and request a visit in under a minute." },
      { title: "Owners submit a request", desc: "On the page, the owner enters their pet's name and species, their own name and phone, an optional preferred vet, the preferred date and time, and the reason for the visit. They can submit even if they've never visited before." },
      { title: "Review and approve requests", desc: "New requests appear on the Booking Requests page and you get a notification. Approve a request to assign a vet and instantly turn it into a real appointment — a new pet profile is created automatically if the pet isn't already on file. Decline requests you can't accommodate." },
    ],
  },
  {
    id: "queue",
    icon: ListOrdered,
    title: "5. Run the Queue Board",
    steps: [
      { title: "Open the Queue page", desc: "Navigate to Vet Clinic → Queue from the sidebar. This shows today's active patient queue in a live board, filterable by vet." },
      { title: "Confirm and enqueue patients", desc: "When a pet owner arrives, click Confirm on their appointment (if still Pending), then In Queue. The pet's card moves to the Waiting column with their assigned queue number." },
      { title: "Start the consultation", desc: "When the vet is ready, click In Progress. The card moves to the In Progress column with an active indicator visible to all staff on screen." },
      { title: "Complete or handle exceptions", desc: "Click Complete when the consultation is done. If the owner didn't show up, click No Show. All actions update the appointment record and remove the card from the active queue." },
    ],
  },
  {
    id: "vaccinations",
    icon: Syringe,
    title: "6. Track Vaccinations",
    steps: [
      { title: "Open the Vaccinations section", desc: "From a pet's profile, click the Vaccinations tab — or navigate to Vet Clinic → Vaccinations to see all upcoming and recent records across all pets." },
      { title: "Log a vaccination", desc: "Click Add Vaccination and select the pet. Enter the vaccine name, date given, and next due date. Optionally add the batch number and who administered it." },
      { title: "Monitor upcoming vaccinations", desc: "The dashboard and analytics page show pets with vaccinations due in the next 30 days — so you can proactively contact owners before the due date." },
      { title: "Review vaccination history", desc: "Each pet's profile shows their full vaccination log — what was given, when, and what's coming up next. Useful during consultations and for owner inquiries." },
    ],
  },
  {
    id: "billing",
    icon: Receipt,
    title: "7. Manage Billing",
    steps: [
      { title: "Open the Billing page", desc: "Navigate to Vet Clinic → Billing from the sidebar." },
      { title: "Create a bill", desc: "Click New Bill, select the pet, and set the bill date. Add line items — each with a description (e.g. Consultation, Rabies Vaccine, Deworming), quantity, and unit price. The total is calculated automatically." },
      { title: "Record payments", desc: "Click Pay on any unpaid bill. Enter the amount received and select the payment method (Cash, GCash, Card, Bank Transfer). The bill status updates to Partial or Paid automatically based on the balance." },
      { title: "View bill details", desc: "Click View on any bill to see the full itemized breakdown, payment history, outstanding balance, and any notes. From the detail view you can also record additional payments." },
    ],
  },
  {
    id: "analytics",
    icon: BarChart3,
    title: "8. View Analytics",
    steps: [
      { title: "Open the Analytics page", desc: "Navigate to Vet Clinic → Analytics from the sidebar." },
      { title: "Review dashboard stat cards", desc: "See at-a-glance totals: active vets, registered pets, today's appointments, completed consultations, upcoming vaccinations in the next 30 days, and total unpaid bill amounts." },
      { title: "Check the 7-day trend chart", desc: "The bar chart shows daily appointment counts and completion counts for the past 7 days — useful for spotting busy periods and tracking your clinic's throughput." },
      { title: "Monitor today's schedule", desc: "The bottom section lists today's queued appointments with pet name, vet, scheduled time, and current status — a quick reference during busy clinic days." },
    ],
  },
]

const TIPS = [
  { icon: Globe, tip: "Put your online booking link on your Facebook page and Google profile — owners can request visits 24/7, even when your reception line is busy or closed." },
  { icon: Camera, tip: "Snap a photo when you register a pet — it makes the right record instantly recognizable in lists, the queue, and on bills." },
  { icon: Clock, tip: "Set up vet schedules before you start booking — the appointment form uses them to show only available vets on each selected date." },
  { icon: Bell, tip: "Check the 30-day vaccination reminder list on the dashboard weekly — proactive owner reminders lead to better follow-through and healthier pets." },
  { icon: Lightbulb, tip: "Register a pet once, then link all their appointments, vaccinations, and bills to that same profile — everything is traceable in one place." },
  { icon: Shield, tip: "Keep the Queue board open on a reception screen throughout the day so all staff can see patient status in real time without asking each other." },
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

function useInView(opts?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null); const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect() } }, { threshold: 0.1, ...opts })
    obs.observe(el); return () => obs.disconnect()
  }, []); return { ref, inView }
}

function Animate({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, inView } = useInView()
  return <div ref={ref} className={className} style={{ transitionProperty: "opacity, transform", transitionDuration: "600ms", transitionTimingFunction: "cubic-bezier(0.4,0,0.2,1)", transitionDelay: `${delay}ms`, opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(24px)" }}>{children}</div>
}

function Navbar() {
  const [open, setOpen] = useState(false)
  const links = [
    { href: "/vet-clinic#features", label: "Features" },
    { href: "/vet-clinic#how-it-works", label: "How it Works" },
    { href: "/vet-clinic#pricing", label: "Pricing" },
    { href: "/vet-clinic#faq", label: "FAQ" },
    { href: "/vet-clinic/guide", label: "Guide" },
  ]
  return (
    <nav className="fixed top-0 inset-x-0 z-50" style={{ background: CREAM, borderBottom: `2px solid ${INK}`, fontFamily: display.fontFamily }}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/vet-clinic" className="flex items-center gap-2.5">
          <img src="/logo.png" alt="Smapey Vet" className="w-8 h-8 rounded-lg object-cover" />
          <span className="font-extrabold tracking-tight" style={{ color: INK }}>Smapey Vet</span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (<a key={l.label} href={l.href} className="text-sm font-semibold hover:opacity-60 transition-opacity" style={{ color: INK }}>{l.label}</a>))}
        </div>
        <div className="hidden md:flex items-center gap-3">
          <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/login`} className="text-sm font-semibold hover:opacity-60 transition-opacity px-2 py-2" style={{ color: INK }}>Sign in</a>
          <a href={REGISTER_URL} className="text-sm font-bold px-5 py-2.5 rounded-full border-2 transition-transform hover:-translate-y-0.5" style={{ ...display, background: AMBER, color: INK, borderColor: INK, boxShadow: `3px 3px 0 ${INK}` }}>Try it free</a>
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden" style={{ color: INK }}>{open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}</button>
      </div>
      {open && (
        <div className="md:hidden px-6 py-4 flex flex-col gap-4" style={{ background: CREAM, borderTop: `2px solid ${INK}` }}>
          {links.map((l) => (<a key={l.label} href={l.href} className="text-sm font-semibold" style={{ color: INK }}>{l.label}</a>))}
          <a href={REGISTER_URL} className="text-sm font-bold px-4 py-2.5 rounded-full border-2 text-center" style={{ ...display, background: AMBER, color: INK, borderColor: INK }}>Try it free</a>
        </div>
      )}
    </nav>
  )
}

export default function VetClinicGuideContent() {
  useFont()
  return (
    <main style={{ fontFamily: display.fontFamily }}>
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden pt-16" style={{ background: CREAM }}>
        <div className="absolute inset-0 pointer-events-none hidden md:block" aria-hidden>
          <div className="absolute rounded-[22px] border-2" style={{ top: "28%", right: "-70px", width: 280, height: 78, background: BLUE, borderColor: INK, transform: "rotate(8deg)", boxShadow: "5px 5px 0 rgba(22,22,22,.12)" }} />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 pt-12 pb-14 text-center">
          <a href="/vet-clinic" className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors mb-8 hover:opacity-60" style={{ color: "#54514c" }}>
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Vet Clinic Manager
          </a>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border-2 text-xs font-bold mb-5" style={{ color: INK, borderColor: INK, boxShadow: `3px 3px 0 ${BLUE}` }}>
            <BookOpen className="w-3 h-3" /> User Guide
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight mb-4" style={{ color: INK }}>
            Smapey Vet Clinic Manager <span style={{ color: BLUE }}>Guide</span>
          </h1>
          <p className="text-lg max-w-2xl mx-auto mb-8" style={{ color: "#54514c" }}>
            Everything you need to set up your clinic, manage pets and vets, take appointments online or at the desk, run the live queue board, track vaccinations, and handle billing — step by step.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-semibold" style={{ color: "#54514c" }}>
            {["5-minute setup", "No training required", "Free plan available"].map((t) => (
              <span key={t} className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* TOC */}
      <section className="py-8" style={{ background: CREAM, borderTop: `2px solid ${INK}`, borderBottom: `2px solid ${INK}` }}>
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex flex-wrap gap-2.5">
            {SECTIONS.map((s, i) => {
              const c = accentFor(i)
              return (
                <a key={s.id} href={`#${s.id}`} className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white border-2 text-xs font-bold transition-transform hover:-translate-y-0.5" style={{ color: INK, borderColor: INK }}>
                  <span className="w-4 h-4 rounded-[5px] border flex items-center justify-center" style={{ background: c, borderColor: INK }}>
                    <s.icon className="w-2.5 h-2.5" style={{ color: onAccent(c) }} />
                  </span>
                  {s.title.replace(/^\d+\.\s/, "")}
                </a>
              )
            })}
          </div>
        </div>
      </section>

      {/* GUIDE SECTIONS */}
      {SECTIONS.map((section, si) => {
        const c = accentFor(si)
        return (
          <section key={section.id} id={section.id} className="py-16 scroll-mt-20" style={{ background: si % 2 === 0 ? "#fff" : CREAM }}>
            <div className="max-w-4xl mx-auto px-6">
              <Animate>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-[14px] border-2 flex items-center justify-center" style={{ background: c, borderColor: INK }}>
                    <section.icon className="w-6 h-6" style={{ color: onAccent(c) }} />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold" style={{ color: INK }}>{section.title}</h2>
                </div>
              </Animate>
              <div className="rounded-[20px] border-2 overflow-hidden" style={{ background: "#fff", borderColor: INK, boxShadow: `6px 6px 0 ${c}` }}>
                {section.steps.map((step, i) => (
                  <div key={step.title} className="flex gap-4 p-5" style={i < section.steps.length - 1 ? { borderBottom: "1px solid rgba(22,22,22,.1)" } : undefined}>
                    <span className="w-7 h-7 rounded-full border-2 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5" style={{ background: c, color: onAccent(c), borderColor: INK }}>{i + 1}</span>
                    <div>
                      <h3 className="font-bold mb-1 text-sm" style={{ color: INK }}>{step.title}</h3>
                      <p className="text-sm leading-relaxed" style={{ color: "#54514c" }}>{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )
      })}

      {/* TIPS */}
      <section className="py-16" style={{ background: CREAM, borderTop: `2px solid ${INK}` }}>
        <div className="max-w-4xl mx-auto px-6">
          <Animate className="mb-8">
            <h2 className="text-xl sm:text-2xl font-extrabold" style={{ color: INK }}>Quick Tips</h2>
          </Animate>
          <div className="grid sm:grid-cols-2 gap-4">
            {TIPS.map(({ icon: Icon, tip }, i) => {
              const c = accentFor(i)
              return (
                <Animate key={i} delay={i * 80}>
                  <div className="flex items-start gap-3 rounded-[16px] p-4 border-2 h-full" style={{ background: "#fff", borderColor: INK, boxShadow: `5px 5px 0 ${c}` }}>
                    <div className="w-8 h-8 rounded-[10px] border-2 flex items-center justify-center shrink-0" style={{ background: c, borderColor: INK }}>
                      <Icon className="w-4 h-4" style={{ color: onAccent(c) }} />
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: "#54514c" }}>{tip}</p>
                  </div>
                </Animate>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6" style={{ background: "#fff" }}>
        <div className="max-w-6xl mx-auto">
          <div className="rounded-[28px] border-2 p-10 flex flex-col md:flex-row items-center justify-between gap-6" style={{ background: AMBER, borderColor: INK, boxShadow: `10px 10px 0 ${INK}` }}>
            <div>
              <h3 className="text-2xl font-extrabold mb-2" style={{ color: INK }}>Ready to get started?</h3>
              <p className="text-sm font-medium" style={{ color: "#5c4a28" }}>Create your free vet clinic account and have your queue running today.</p>
            </div>
            <a href={REGISTER_URL} className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm border-2 transition-transform hover:-translate-y-0.5 shrink-0" style={{ ...display, background: INK, color: "#fff", borderColor: INK }}>
              Start for free <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      <InternalLinks cluster="vet-clinic" currentPath="/vet-clinic/guide" />

      <footer className="px-6 py-8" style={{ background: CREAM, borderTop: `2px solid ${INK}` }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Smapey" className="w-6 h-6 rounded-md object-cover" />
            <span className="text-sm font-extrabold" style={{ color: INK }}>Vet Clinic Manager by Smapey</span>
          </div>
          <p className="text-xs" style={{ color: "#9a948b" }}>© {new Date().getFullYear()} Smapey. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}
