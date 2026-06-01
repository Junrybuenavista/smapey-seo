"use client"

import { useState, useEffect, useRef } from "react"
import InternalLinks from "@/components/InternalLinks"
import Link from "next/link"
import {
  BookOpen, Users, CalendarDays, CheckCircle2, ChevronRight,
  Menu, X, PawPrint, ListOrdered, BarChart3, Syringe,
  Receipt, Clock, Bell, Shield, Lightbulb,
} from "lucide-react"

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
      { title: "Add medical notes", desc: "Use the Notes field to record known allergies, chronic conditions, or important background — visible to every vet who looks up the pet's record." },
      { title: "View pet history", desc: "Click View on any pet to see their full profile — all past appointments, vaccination records, and billing history in one place." },
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
      { title: "Manage appointment status", desc: "Appointments move through a multi-step workflow: Pending → Confirmed → In Queue → In Progress → Completed. You can also mark them Cancelled or No Show. Each status change is logged automatically." },
    ],
  },
  {
    id: "queue",
    icon: ListOrdered,
    title: "4. Run the Queue Board",
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
    title: "5. Track Vaccinations",
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
    title: "6. Manage Billing",
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
    title: "7. View Analytics",
    steps: [
      { title: "Open the Analytics page", desc: "Navigate to Vet Clinic → Analytics from the sidebar." },
      { title: "Review dashboard stat cards", desc: "See at-a-glance totals: active vets, registered pets, today's appointments, completed consultations, upcoming vaccinations in the next 30 days, and total unpaid bill amounts." },
      { title: "Check the 7-day trend chart", desc: "The bar chart shows daily appointment counts and completion counts for the past 7 days — useful for spotting busy periods and tracking your clinic's throughput." },
      { title: "Monitor today's schedule", desc: "The bottom section lists today's queued appointments with pet name, vet, scheduled time, and current status — a quick reference during busy clinic days." },
    ],
  },
]

const TIPS = [
  { icon: Clock, tip: "Set up vet schedules before you start booking — the appointment form uses them to show only available vets on each selected date." },
  { icon: Bell, tip: "Check the 30-day vaccination reminder list on the dashboard weekly — proactive owner reminders lead to better follow-through and healthier pets." },
  { icon: Lightbulb, tip: "Register a pet once, then link all their appointments, vaccinations, and bills to that same profile — everything is traceable in one place." },
  { icon: Shield, tip: "Keep the Queue board open on a reception screen throughout the day so all staff can see patient status in real time without asking each other." },
]

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
  const [open, setOpen] = useState(false); const [scrolled, setScrolled] = useState(false)
  useEffect(() => { const fn = () => setScrolled(window.scrollY > 20); window.addEventListener("scroll", fn); return () => window.removeEventListener("scroll", fn) }, [])
  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#050d1a]/90 backdrop-blur-md border-b border-white/5 shadow-lg" : "bg-transparent"}`}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/vet-clinic" className="flex items-center gap-2.5"><img src="/logo.png" alt="Smapey Vet" className="w-8 h-8 rounded-lg object-cover" /><span className="text-white font-bold tracking-tight">Smapey Vet</span></Link>
        <div className="hidden md:flex items-center gap-6">
          <Link href="/vet-clinic" className="text-sm text-white/60 hover:text-white transition-colors">Home</Link>
          {[["setup", "Setup"], ["queue", "Queue"], ["vaccinations", "Vaccinations"], ["billing", "Billing"]].map(([id, label]) => (
            <a key={id} href={`#${id}`} onClick={(e) => { e.preventDefault(); document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }) }} className="text-sm text-white/60 hover:text-white transition-colors">{label}</a>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-3">
          <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/login`} className="text-sm text-white/60 hover:text-white px-4 py-2">Sign in</a>
          <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=VET_CLINIC&plan=FREE`} className="text-sm font-semibold px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/25 transition-colors">Try it free</a>
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden text-white/60 hover:text-white">{open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}</button>
      </div>
      {open && (
        <div className="md:hidden bg-[#050d1a] border-t border-white/5 px-6 py-4 flex flex-col gap-4">
          <Link href="/vet-clinic" className="text-sm text-white/60 hover:text-white">Home</Link>
          <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=VET_CLINIC&plan=FREE`} className="text-sm font-semibold px-4 py-2 rounded-lg bg-emerald-600 text-white text-center">Try it free</a>
        </div>
      )}
    </nav>
  )
}

export default function VetClinicGuideContent() {
  return (
    <main className="bg-white">
      <Navbar />

      {/* HERO */}
      <section className="relative pt-32 pb-16 overflow-hidden" style={{ background: "#050d1a", backgroundImage: "repeating-linear-gradient(45deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 28px)", backgroundSize: "28px 28px" }}>
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(16,185,129,0.13) 0%, transparent 70%)" }} />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-6">
            <BookOpen className="w-3 h-3" /> User Guide
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight tracking-tight mb-4">
            Smapey Vet Clinic Manager{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-300">Guide</span>
          </h1>
          <p className="text-lg text-white/50 max-w-2xl mx-auto mb-8">
            Everything you need to set up your clinic, manage pets and vets, book appointments, run the live queue board, track vaccinations, and handle billing — step by step.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-white/30 text-xs">
            {["5-minute setup", "No training required", "Free plan available"].map((t) => (
              <span key={t} className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* TABLE OF CONTENTS */}
      <section className="py-10 bg-slate-50 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex flex-wrap gap-2">
            {SECTIONS.map((s) => (
              <a key={s.id} href={`#${s.id}`}
                onClick={(e) => { e.preventDefault(); document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" }) }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:border-emerald-300 hover:text-emerald-700 text-xs font-medium transition-all">
                <s.icon className="w-3 h-3" />{s.title.replace(/^\d+\.\s/, "")}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* GUIDE SECTIONS */}
      {SECTIONS.map((section, si) => (
        <section key={section.id} id={section.id} className={`py-16 ${si % 2 === 0 ? "bg-white" : "bg-slate-50"} border-t border-slate-100`}>
          <div className="max-w-4xl mx-auto px-6">
            <Animate>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                  <section.icon className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-800">{section.title}</h2>
              </div>
            </Animate>
            <div className="space-y-4">
              {section.steps.map((step, i) => (
                <Animate key={step.title} delay={i * 80}>
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-7 h-7 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center shrink-0">{i + 1}</div>
                      {i < section.steps.length - 1 && <div className="w-0.5 flex-1 bg-emerald-100 mt-2" />}
                    </div>
                    <div className="pb-4">
                      <h3 className="font-semibold text-slate-800 mb-1 text-sm">{step.title}</h3>
                      <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                </Animate>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* TIPS */}
      <section className="py-16 bg-emerald-50 border-t border-emerald-100">
        <div className="max-w-4xl mx-auto px-6">
          <Animate className="mb-8">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-800">Quick Tips</h2>
          </Animate>
          <div className="grid sm:grid-cols-2 gap-4">
            {TIPS.map(({ icon: Icon, tip }, i) => (
              <Animate key={i} delay={i * 80}>
                <div className="flex items-start gap-3 bg-white rounded-xl p-4 border border-emerald-100 shadow-sm">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-emerald-600" />
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed">{tip}</p>
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white border-t border-slate-100">
        <Animate className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 mb-4">Ready to get started?</h2>
          <p className="text-slate-500 mb-8">Create your free vet clinic account and have your queue running today.</p>
          <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=VET_CLINIC&plan=FREE`}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-semibold transition-all shadow-xl shadow-emerald-600/20">
            Start for free <ChevronRight className="w-4 h-4" />
          </a>
        </Animate>
      </section>

      <InternalLinks cluster="vet-clinic" currentPath="/vet-clinic/guide" />

      <footer className="bg-[#030810] border-t border-white/5 px-6 py-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2"><img src="/logo.png" alt="Smapey" className="w-6 h-6 rounded-md object-cover" /><span className="text-white/60 text-sm font-semibold">Smapey Vet Clinic Manager</span></div>
          <p className="text-white/20 text-xs">© {new Date().getFullYear()} Smapey. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}
