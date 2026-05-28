"use client"

import Link from "next/link"
import { Flower2, ChevronRight, CheckCircle2, Calendar, HandHelping, HeartPulse, Globe, Inbox, BarChart3 } from "lucide-react"

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

export default function GuideContent() {
  return (
    <div className="min-h-screen bg-white">

      {/* HERO */}
      <section className="bg-gradient-to-br from-emerald-50 via-white to-teal-50 border-b border-slate-100">
        <div className="max-w-3xl mx-auto px-6 py-16">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-400 flex items-center justify-center shadow-md shadow-emerald-500/30">
              <Flower2 className="w-4 h-4 text-white" />
            </div>
            <Link href="/massage" className="font-bold text-slate-700 text-sm tracking-tight hover:text-emerald-600 transition">
              Smapey Massage & Spa
            </Link>
          </div>
          <p className="text-xs uppercase tracking-widest font-bold text-emerald-600 mb-2">Guide</p>
          <h1 className="text-3xl md:text-5xl font-black text-slate-800 tracking-tight leading-tight">
            How to run your massage business with Smapey
          </h1>
          <p className="text-slate-500 text-base md:text-lg mt-5">
            A step-by-step walkthrough — from adding your first service to taking your first online booking.
          </p>
        </div>
      </section>

      {/* SECTIONS */}
      <section className="max-w-3xl mx-auto px-6 py-16 space-y-12">
        {SECTIONS.map(s => {
          const Icon = s.icon
          return (
            <article key={s.title}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-emerald-500" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-slate-800 tracking-tight">{s.title}</h2>
              </div>
              <div className="space-y-3 pl-13 text-slate-600 text-sm md:text-base leading-relaxed">
                {s.body.map((p, i) => (
                  <p key={i} className="flex gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-1" />
                    <span>{p}</span>
                  </p>
                ))}
              </div>
            </article>
          )
        })}
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-6 pb-20 text-center">
        <div className="rounded-3xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 px-6 py-12">
          <h2 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">
            Ready to set up your spa?
          </h2>
          <p className="text-slate-500 text-base mt-3">
            Start free — no credit card required. Upgrade only when you outgrow the free plan.
          </p>
          <Link href="/register"
            className="inline-flex items-center gap-2 px-7 py-3 mt-6 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-white font-semibold text-sm shadow-lg shadow-emerald-500/30 hover:opacity-90 transition">
            Start Free <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-100 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Flower2 className="w-4 h-4 text-emerald-500" />
            <span>Smapey Massage & Spa</span>
          </div>
          <div className="flex gap-5">
            <Link href="/massage" className="hover:text-slate-700 transition">Product</Link>
            <Link href="/privacy-policy" className="hover:text-slate-700 transition">Privacy</Link>
            <Link href="/terms-and-conditions" className="hover:text-slate-700 transition">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
