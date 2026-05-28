"use client"

import Link from "next/link"
import { Calendar, Users, Flower2, Globe, Inbox, BarChart3, HandHelping, HeartPulse, CheckCircle2, ChevronRight, Zap } from "lucide-react"

const FEATURES = [
  {
    icon: Calendar,
    title: "Appointment Scheduling",
    desc: "Book sessions, assign services and therapists, set durations. View your day at a glance.",
  },
  {
    icon: HandHelping,
    title: "Therapist Management",
    desc: "Track your therapists, their specialties, and assign them to sessions. Filter the calendar by therapist.",
  },
  {
    icon: HeartPulse,
    title: "Client Intake & Health Notes",
    desc: "Full client profiles with medical conditions, allergies, focus areas, and pressure preferences — visible only to staff.",
  },
  {
    icon: Flower2,
    title: "Service Menu",
    desc: "Swedish, deep tissue, hot stone, reflexology — define your full menu with prices and durations. Each service appears on your public booking page automatically.",
  },
  {
    icon: Globe,
    title: "Public Booking Page",
    desc: "Your spa gets a unique URL clients can visit to browse services and send a booking inquiry. Choose from 5 spa-themed designs.",
  },
  {
    icon: Inbox,
    title: "Inquiry Management",
    desc: "See all incoming booking requests in one place. Approve, reject, or convert them into confirmed appointments with one click.",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    desc: "Track monthly revenue, session count, completed appointments, therapist utilization, and pending inquiries.",
  },
]

const STEPS = [
  { num: "1", title: "Set up your services", desc: "Add your massage menu — Swedish, deep tissue, hot stone, foot massage. Set prices and durations." },
  { num: "2", title: "Add your therapists", desc: "List your team with their specialties so clients know who's available." },
  { num: "3", title: "Publish your booking page", desc: "Pick a theme (Zen, Stone, Bamboo, Ivory, or Charcoal), customize your URL, and share." },
  { num: "4", title: "Accept inquiries", desc: "Approve booking requests from your public page and convert them to confirmed appointments." },
]

const PLANS = [
  { name: "FREE", price: "Free", features: ["10 services", "30 appointments/mo", "2 team members", "Client intake forms", "Public booking page", "1 page design"] },
  { name: "PRO", price: "$6/mo", features: ["50 services", "Unlimited appointments", "5 team members", "Therapist filters", "Deposit tracking", "Revenue reports", "3 page designs"], highlighted: true },
  { name: "ENTERPRISE", price: "$14/mo", features: ["Unlimited everything", "Unlimited inquiries", "All 5 page designs", "Priority support"] },
]

const FAQ = [
  {
    q: "Is there a free plan?",
    a: "Yes. The free plan includes up to 10 services, 30 appointments per month, 2 team members, and a public booking page. No credit card required.",
  },
  {
    q: "Can clients book online?",
    a: "Yes. Every business gets a unique public URL (e.g. smapey.com/massage/your-spa) where clients can browse services and send a booking request. Approve or decline from your dashboard.",
  },
  {
    q: "Can I track therapist assignments?",
    a: "Yes. Add your therapists, assign them to appointments, and filter the schedule by therapist. Each appointment can also record the client's pressure preference and focus areas.",
  },
  {
    q: "Do you store health information securely?",
    a: "Yes. Health notes are stored on each client profile and only visible to authenticated staff in your organization.",
  },
  {
    q: "Can I take deposits?",
    a: "On the Pro plan and above, you can upload a payment QR (GCash, Maya, bank) and require a reference number before clients can submit a booking request.",
  },
]

export default function MassageContent() {
  return (
    <div className="min-h-screen bg-white">

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-teal-50 border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-28">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-400 flex items-center justify-center shadow-md shadow-emerald-500/30">
              <Flower2 className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-slate-700 tracking-tight">Smapey Massage & Spa</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-800 tracking-tight leading-tight max-w-3xl">
            Manage your massage business. <span className="text-emerald-600">Get more bookings.</span>
          </h1>
          <p className="text-slate-500 text-lg mt-5 max-w-2xl">
            Everything you need to run a small spa or massage business — therapists, appointments, client intake forms, a public booking page, and revenue reports. Start free.
          </p>
          <div className="flex flex-wrap items-center gap-3 mt-8">
            <Link href="/register"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-white font-semibold text-sm shadow-lg shadow-emerald-500/30 hover:opacity-90 transition">
              Start Free <ChevronRight className="w-4 h-4" />
            </Link>
            <Link href="/massage/guide"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-200 text-slate-600 font-semibold text-sm hover:bg-slate-50 transition">
              How it works
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-widest font-bold text-emerald-600 mb-2">Features</p>
          <h2 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tight">Built for spas and wellness clinics</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map(f => {
            const Icon = f.icon
            return (
              <div key={f.title} className="rounded-2xl border border-slate-100 p-6 bg-white hover:shadow-md transition">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-400 flex items-center justify-center shadow-md shadow-emerald-500/20 mb-4">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <p className="font-bold text-slate-800 text-base mb-1.5">{f.title}</p>
                <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-slate-50 border-y border-slate-100">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-widest font-bold text-emerald-600 mb-2">How it works</p>
            <h2 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tight">Up and running in minutes</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            {STEPS.map(s => (
              <div key={s.num} className="bg-white rounded-2xl border border-slate-100 p-6">
                <div className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-sm border border-emerald-200 mb-4">
                  {s.num}
                </div>
                <p className="font-bold text-slate-800 mb-1.5">{s.title}</p>
                <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-widest font-bold text-emerald-600 mb-2">Pricing</p>
          <h2 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tight">Start free. Upgrade when you grow.</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {PLANS.map(p => (
            <div key={p.name}
              className={`rounded-2xl border p-6 ${p.highlighted ? "border-emerald-500 shadow-xl shadow-emerald-500/10" : "border-slate-200"}`}>
              <div className="flex items-center gap-2 mb-3">
                <p className="font-bold text-xs uppercase tracking-widest text-slate-500">{p.name}</p>
                {p.highlighted && <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-bold border border-emerald-200">POPULAR</span>}
              </div>
              <p className="text-3xl font-black text-slate-800 mb-4">{p.price}<span className="text-sm font-normal text-slate-400">{p.price === "Free" ? "" : ""}</span></p>
              <ul className="space-y-2 mb-6">
                {p.features.map(f => (
                  <li key={f} className="flex items-start gap-2 text-sm text-slate-600">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> {f}
                  </li>
                ))}
              </ul>
              <Link href="/register"
                className={`block text-center py-2.5 rounded-xl font-semibold text-sm transition ${p.highlighted ? "bg-gradient-to-tr from-emerald-500 to-teal-400 text-white shadow-md shadow-emerald-500/30 hover:opacity-90" : "border border-slate-200 text-slate-600 hover:bg-slate-50"}`}>
                Get started
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-slate-50 border-y border-slate-100">
        <div className="max-w-3xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-widest font-bold text-emerald-600 mb-2">FAQ</p>
            <h2 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tight">Frequently asked questions</h2>
          </div>
          <div className="space-y-4">
            {FAQ.map(f => (
              <details key={f.q} className="bg-white rounded-2xl border border-slate-100 px-5 py-4 group">
                <summary className="cursor-pointer font-semibold text-slate-800 text-sm flex items-center justify-between">
                  {f.q}
                  <ChevronRight className="w-4 h-4 text-slate-400 group-open:rotate-90 transition" />
                </summary>
                <p className="text-slate-500 text-sm mt-3 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-bold border border-emerald-200 mb-5">
          <Zap className="w-3 h-3" /> Free Plan Available
        </div>
        <h2 className="text-3xl md:text-5xl font-black text-slate-800 tracking-tight max-w-2xl mx-auto">
          Ready to run your spa with less stress?
        </h2>
        <p className="text-slate-500 text-lg mt-5 max-w-xl mx-auto">
          Set up your services, share your booking link, and start taking inquiries today.
        </p>
        <Link href="/register"
          className="inline-flex items-center gap-2 px-8 py-3.5 mt-8 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-white font-semibold text-sm shadow-lg shadow-emerald-500/30 hover:opacity-90 transition">
          Start Free <ChevronRight className="w-4 h-4" />
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-100 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Flower2 className="w-4 h-4 text-emerald-500" />
            <span>Smapey Massage & Spa</span>
          </div>
          <div className="flex gap-5">
            <Link href="/massage/guide" className="hover:text-slate-700 transition">Guide</Link>
            <Link href="/privacy-policy" className="hover:text-slate-700 transition">Privacy</Link>
            <Link href="/terms-and-conditions" className="hover:text-slate-700 transition">Terms</Link>
            <Link href="/" className="hover:text-slate-700 transition">All Products</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
