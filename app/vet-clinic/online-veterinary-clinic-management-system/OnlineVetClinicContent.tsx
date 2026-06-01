"use client"

import { useState, useEffect, useRef } from "react"
import InternalLinks from "@/components/InternalLinks"
import Link from "next/link"
import {
  PawPrint, CalendarDays, Syringe, Receipt, BarChart3, ListOrdered,
  CheckCircle2, ChevronRight, Menu, X, Globe, Wifi, Lock, Smartphone,
  Users, Shield,
} from "lucide-react"

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
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => { const fn = () => setScrolled(window.scrollY > 20); window.addEventListener("scroll", fn); return () => window.removeEventListener("scroll", fn) }, [])
  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#050d1a]/90 backdrop-blur-md border-b border-white/5 shadow-lg" : "bg-transparent"}`}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/vet-clinic" className="flex items-center gap-2.5"><img src="/logo.png" alt="Smapey" className="w-8 h-8 rounded-lg object-cover" /><span className="text-white font-bold tracking-tight">Smapey Vet</span></Link>
        <div className="hidden md:flex items-center gap-3">
          <Link href="/vet-clinic" className="text-sm text-white/60 hover:text-white px-4 py-2">Back to overview</Link>
          <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=VET_CLINIC&plan=FREE`} className="text-sm font-semibold px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/25">Get started free</a>
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden text-white/60">{open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}</button>
      </div>
      {open && <div className="md:hidden bg-[#050d1a] border-t border-white/5 px-6 py-4"><a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=VET_CLINIC&plan=FREE`} className="block text-sm font-semibold px-4 py-2 rounded-lg bg-emerald-600 text-white text-center">Get started free</a></div>}
    </nav>
  )
}

const ONLINE_BENEFITS = [
  {
    icon: Globe,
    title: "Access from any browser",
    desc: "No download, no installation, no device restrictions. Open a browser tab and your clinic dashboard is there — on any laptop, desktop, or tablet.",
    color: "from-emerald-600 to-teal-400",
    shadow: "shadow-emerald-500/20",
  },
  {
    icon: Smartphone,
    title: "Mobile-ready interface",
    desc: "The dashboard is fully responsive. Staff can check the appointment queue, record a vaccination, or look up a pet record from a phone between consultations.",
    color: "from-teal-600 to-emerald-400",
    shadow: "shadow-teal-500/20",
  },
  {
    icon: Wifi,
    title: "Real-time data, always in sync",
    desc: "Every update — a new appointment, a payment recorded, a queue status change — is reflected instantly for every staff member logged in at the same time.",
    color: "from-emerald-500 to-cyan-400",
    shadow: "shadow-emerald-400/20",
  },
  {
    icon: Lock,
    title: "Secure cloud storage",
    desc: "Pet records, vaccination history, and billing data are stored securely in the cloud — no local backups needed, no risk of losing records when a computer fails.",
    color: "from-emerald-700 to-teal-500",
    shadow: "shadow-emerald-600/20",
  },
  {
    icon: Users,
    title: "Multi-staff, role-based access",
    desc: "Invite your entire team — vets, receptionists, admin — and assign role-based permissions. Everyone works from the same live system simultaneously.",
    color: "from-teal-500 to-emerald-500",
    shadow: "shadow-teal-500/20",
  },
  {
    icon: Shield,
    title: "Isolated per clinic",
    desc: "Your clinic's data is completely isolated from other organizations. Each clinic gets its own private environment — records, billing, and staff accounts are never shared.",
    color: "from-emerald-600 to-cyan-500",
    shadow: "shadow-emerald-500/20",
  },
]

const MODULES = [
  { icon: PawPrint, title: "Pet Records", desc: "Online profiles for every patient — species, breed, owner contacts, medical notes, and full appointment history." },
  { icon: CalendarDays, title: "Appointment Booking", desc: "Book and manage vet appointments online. Full status workflow: Pending → Confirmed → In Queue → In Progress → Completed." },
  { icon: ListOrdered, title: "Live Queue Board", desc: "A real-time online board that shows every waiting and in-progress patient per vet — updated instantly across all devices." },
  { icon: Syringe, title: "Vaccination Tracking", desc: "Log vaccines online and get a 30-day upcoming reminder dashboard so no follow-up is ever missed." },
  { icon: Receipt, title: "Online Billing", desc: "Create itemized bills, track payment status (Unpaid, Partial, Paid), and record payments — all from the browser." },
  { icon: BarChart3, title: "Dashboard Analytics", desc: "Monthly trends, completion rates, unpaid totals, and upcoming vaccination counts — live in your online dashboard." },
]

const FAQS = [
  {
    q: "Does Smapey require any software installation?",
    a: "No. Smapey is entirely browser-based — you access it at smapey.com from any device. There's nothing to download or install.",
  },
  {
    q: "Can multiple staff members use it at the same time?",
    a: "Yes. Smapey is a multi-user online system. You can invite vets, receptionists, and admin staff — each with their own login — and they can all work simultaneously on the same live data.",
  },
  {
    q: "Is the data stored securely online?",
    a: "All data is stored in a secure cloud database. Your clinic's records are isolated from other organizations, and you don't need to manage any local backups.",
  },
  {
    q: "Can I access it from a phone?",
    a: "Yes. The interface is responsive and works on mobile browsers. Staff can check the queue board, update appointment status, or look up a pet record from a smartphone.",
  },
  {
    q: "Is there a free plan?",
    a: "Yes — Smapey's free plan lets you get started with no credit card required. You can manage pets, appointments, vaccinations, and billing at no cost.",
  },
]

export default function OnlineVetClinicContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  return (
    <main className="bg-white min-h-screen">
      <Navbar />

      {/* HERO */}
      <section className="relative pt-32 pb-20 overflow-hidden" style={{ background: "#050d1a", backgroundImage: "repeating-linear-gradient(45deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 28px)", backgroundSize: "28px 28px" }}>
        <div className="absolute -top-32 right-0 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%)" }} />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-6">
            <Globe className="w-3 h-3" /> Fully Online — No Installation Required
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight tracking-tight mb-6">
            Online veterinary clinic management system — run your vet clinic from any browser
          </h1>
          <p className="text-lg text-white/50 max-w-2xl mx-auto mb-10">
            Smapey is a cloud-based veterinary clinic management system. No software to install — just open a browser and manage pet records, appointments, vaccinations, queue boards, and billing from anywhere.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=VET_CLINIC&plan=FREE`}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all shadow-lg shadow-emerald-600/30">
              Start for free <ChevronRight className="w-4 h-4" />
            </a>
            <Link href="/vet-clinic" className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white font-medium text-sm transition-all border border-white/10">
              See all features
            </Link>
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-5 text-white/30 text-xs">
            {["No download needed", "Free to start", "Works on any device", "Multi-user"].map(t => (
              <span key={t} className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ONLINE BENEFITS */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <Animate className="text-center mb-12">
            <p className="text-emerald-600 text-sm font-semibold uppercase tracking-widest mb-3">Why Online?</p>
            <h2 className="text-3xl font-extrabold text-slate-800">What makes an online vet clinic system different</h2>
            <p className="text-slate-500 mt-3 max-w-xl mx-auto">Browser-based means your team, your data, and your tools are always in sync — from the front desk to the exam room.</p>
          </Animate>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {ONLINE_BENEFITS.map(({ icon: Icon, title, desc, color, shadow }, i) => (
              <Animate key={title} delay={i * 70}>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md hover:-translate-y-1 transition-all h-full">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${color} shadow-lg ${shadow} flex items-center justify-center mb-4`}><Icon className="w-5 h-5 text-white" /></div>
                  <h3 className="font-bold text-slate-800 mb-2">{title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* MODULES */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <Animate className="text-center mb-12">
            <p className="text-emerald-600 text-sm font-semibold uppercase tracking-widest mb-3">System Modules</p>
            <h2 className="text-3xl font-extrabold text-slate-800">Everything you need — online, in one system</h2>
            <p className="text-slate-500 mt-3 max-w-xl mx-auto">Six core modules, all connected, all accessible from any browser tab.</p>
          </Animate>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {MODULES.map(({ icon: Icon, title, desc }, i) => (
              <Animate key={title} delay={i * 70}>
                <div className="flex gap-4 p-5 rounded-2xl border border-slate-100 hover:border-emerald-200 hover:shadow-md transition-all bg-white">
                  <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="w-4.5 h-4.5 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 mb-1 text-sm">{title}</h3>
                    <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
                  </div>
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6">
          <Animate className="text-center mb-14">
            <p className="text-emerald-600 text-sm font-semibold uppercase tracking-widest mb-3">Getting Started</p>
            <h2 className="text-3xl font-extrabold text-slate-800">Up and running in minutes</h2>
            <p className="text-slate-500 mt-3">No IT setup, no server provisioning — just sign up and go.</p>
          </Animate>
          <div className="flex flex-col gap-6">
            {[
              { step: "1", title: "Create your free account", desc: "Sign up at smapey.com — no credit card required. Your clinic's private workspace is ready in seconds." },
              { step: "2", title: "Add your vets and configure your clinic", desc: "Enter your veterinarians, their schedules, and your clinic's basic info. Done in under five minutes." },
              { step: "3", title: "Start managing pets, appointments, and billing", desc: "Begin adding pet profiles, booking appointments, and recording vaccinations. Everything updates online in real time." },
            ].map(({ step, title, desc }, i) => (
              <Animate key={step} delay={i * 100}>
                <div className="flex gap-5 items-start">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white font-extrabold text-lg flex items-center justify-center shrink-0">{step}</div>
                  <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex-1">
                    <h3 className="font-bold text-slate-800 mb-1">{title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <Animate className="text-center mb-12">
            <p className="text-emerald-600 text-sm font-semibold uppercase tracking-widest mb-3">FAQ</p>
            <h2 className="text-3xl font-extrabold text-slate-800">Common questions</h2>
          </Animate>
          <div className="flex flex-col gap-3">
            {FAQS.map(({ q, a }, i) => (
              <Animate key={i} delay={i * 60}>
                <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full text-left flex items-center justify-between px-5 py-4 font-semibold text-slate-800 text-sm hover:bg-slate-50 transition"
                  >
                    {q}
                    <ChevronRight className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${openFaq === i ? "rotate-90" : ""}`} />
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-4 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">{a}</div>
                  )}
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 relative overflow-hidden" style={{ background: "#050d1a" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "repeating-linear-gradient(45deg, rgba(255,255,255,0.015) 0px, rgba(255,255,255,0.015) 1px, transparent 1px, transparent 28px)", backgroundSize: "28px 28px" }} />
        <Animate className="relative max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-extrabold text-white mb-4">Your vet clinic, fully online — starting today</h2>
          <p className="text-white/40 mb-8">Free plan. No installation. No credit card required.</p>
          <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=VET_CLINIC&plan=FREE`}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-semibold transition-all shadow-xl">
            Get started for free <ChevronRight className="w-4 h-4" />
          </a>
        </Animate>
      </section>

      <InternalLinks cluster="vet-clinic" currentPath="/vet-clinic/online-veterinary-clinic-management-system" />

      <footer className="bg-[#030810] border-t border-white/5 px-6 py-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2"><img src="/logo.png" alt="Smapey" className="w-6 h-6 rounded-md object-cover" /><span className="text-white/60 text-sm font-semibold">Smapey Vet Clinic Manager</span></div>
          <p className="text-white/20 text-xs">© {new Date().getFullYear()} Smapey. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}
