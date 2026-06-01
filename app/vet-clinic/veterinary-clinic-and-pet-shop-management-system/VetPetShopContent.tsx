"use client"

import { useState, useEffect, useRef } from "react"
import InternalLinks from "@/components/InternalLinks"
import Link from "next/link"
import { PawPrint, Syringe, Receipt, CalendarDays, CheckCircle2, ChevronRight, Menu, X, BarChart3, ListOrdered, Users, Shield } from "lucide-react"

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
          <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/login`} className="text-sm text-white/60 hover:text-white px-4 py-2">Sign in</a>
          <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=VET_CLINIC&plan=FREE`} className="text-sm font-semibold px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/25">Get started free</a>
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden text-white/60">{open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}</button>
      </div>
      {open && <div className="md:hidden bg-[#050d1a] border-t border-white/5 px-6 py-4"><a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=VET_CLINIC&plan=FREE`} className="block text-sm font-semibold px-4 py-2 rounded-lg bg-emerald-600 text-white text-center">Get started free</a></div>}
    </nav>
  )
}

const CAPABILITIES = [
  { icon: PawPrint, title: "Pet Profiles", desc: "Complete pet records — species, breed, age, weight, owner info, medical notes, and visit history. Works for dogs, cats, birds, reptiles, and more.", color: "from-emerald-600 to-teal-400", shadow: "shadow-emerald-500/20" },
  { icon: CalendarDays, title: "Appointment Management", desc: "Book clinic visits and grooming sessions by pet, vet or staff member, date, and time. Status tracking from Pending to Completed.", color: "from-teal-600 to-emerald-400", shadow: "shadow-teal-500/20" },
  { icon: Syringe, title: "Vaccination Tracking", desc: "Log every vaccination with vaccine name, date, and next due date. A 30-day reminder list keeps your team ahead of overdue pets.", color: "from-emerald-500 to-cyan-400", shadow: "shadow-emerald-400/20" },
  { icon: ListOrdered, title: "Live Queue Board", desc: "Real-time kanban board showing every pet In Queue, In Progress, or Done — per vet or staff member, all at once.", color: "from-emerald-700 to-teal-500", shadow: "shadow-emerald-600/20" },
  { icon: Receipt, title: "Billing & Payments", desc: "Itemized bills for consultations, grooming, medicines, and supplies. Track partial and full payments across GCash, Cash, Card, and more.", color: "from-teal-500 to-emerald-500", shadow: "shadow-teal-500/20" },
  { icon: BarChart3, title: "Dashboard Analytics", desc: "At-a-glance stats: today's schedule, unpaid bills, upcoming vaccinations, monthly appointment trends, and completion rates.", color: "from-emerald-600 to-cyan-500", shadow: "shadow-emerald-500/20" },
  { icon: Users, title: "Team Management", desc: "Invite vets, groomers, and reception staff with role-based access. Control exactly who can book, edit, bill, or only view.", color: "from-cyan-500 to-emerald-500", shadow: "shadow-cyan-500/20" },
  { icon: Shield, title: "Secure & Isolated", desc: "Your clinic's data is fully isolated — pet records, billing history, and staff accounts are never mixed with other businesses.", color: "from-teal-700 to-emerald-500", shadow: "shadow-teal-600/20" },
]

const COMPARISON = [
  { area: "Pet records & medical history", ours: true, paper: false, spreadsheet: false },
  { area: "Appointment scheduling", ours: true, paper: false, spreadsheet: true },
  { area: "Live queue board", ours: true, paper: false, spreadsheet: false },
  { area: "Vaccination tracking & reminders", ours: true, paper: true, spreadsheet: false },
  { area: "Itemized billing & payments", ours: true, paper: false, spreadsheet: false },
  { area: "Analytics dashboard", ours: true, paper: false, spreadsheet: false },
  { area: "Team roles & access control", ours: true, paper: false, spreadsheet: false },
]

export default function VetPetShopContent() {
  return (
    <main className="bg-white min-h-screen">
      <Navbar />

      {/* HERO */}
      <section className="relative pt-32 pb-20 overflow-hidden" style={{ background: "#050d1a", backgroundImage: "repeating-linear-gradient(45deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 28px)", backgroundSize: "28px 28px" }}>
        <div className="absolute -top-32 left-0 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(16,185,129,0.13) 0%, transparent 70%)" }} />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-6">
            <PawPrint className="w-3 h-3" /> Veterinary Clinic & Pet Shop Management
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight tracking-tight mb-6">
            Veterinary clinic and pet shop management system — all in one place
          </h1>
          <p className="text-lg text-white/50 max-w-2xl mx-auto mb-10">
            Smapey handles everything from pet records and vet appointments to grooming schedules, vaccination tracking, and billing. One system for the whole operation.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=VET_CLINIC&plan=FREE`}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all shadow-lg shadow-emerald-600/30">
              Start free <ChevronRight className="w-4 h-4" />
            </a>
            <Link href="/vet-clinic" className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white font-medium text-sm transition-all border border-white/10">
              Full feature overview
            </Link>
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-5 text-white/30 text-xs">
            {["Free to start", "No credit card needed", "Set up in 5 minutes"].map(t => (
              <span key={t} className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <Animate className="text-center mb-12">
            <p className="text-emerald-600 text-sm font-semibold uppercase tracking-widest mb-3">What's Included</p>
            <h2 className="text-3xl font-extrabold text-slate-800">Built for vet clinics and pet care businesses</h2>
            <p className="text-slate-500 mt-3 max-w-xl mx-auto">Every module connects — from the first appointment to the final bill.</p>
          </Animate>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {CAPABILITIES.map(({ icon: Icon, title, desc, color, shadow }, i) => (
              <Animate key={title} delay={i * 70}>
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md hover:-translate-y-1 transition-all h-full">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${color} shadow-lg ${shadow} flex items-center justify-center mb-3`}><Icon className="w-4.5 h-4.5 text-white" /></div>
                  <h3 className="font-bold text-slate-800 mb-1.5 text-sm">{title}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <Animate className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-slate-800">Why Smapey vs. paper or spreadsheets</h2>
            <p className="text-slate-500 mt-3">A quick comparison of what each option actually handles.</p>
          </Animate>
          <Animate>
            <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="text-left px-5 py-4 font-semibold text-slate-600">Capability</th>
                    <th className="px-5 py-4 font-bold text-emerald-700 text-center">Smapey</th>
                    <th className="px-5 py-4 font-semibold text-slate-400 text-center">Paper</th>
                    <th className="px-5 py-4 font-semibold text-slate-400 text-center">Spreadsheet</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {COMPARISON.map(({ area, ours, paper, spreadsheet }) => (
                    <tr key={area} className="hover:bg-slate-50 transition-colors">
                      <td className="px-5 py-3.5 text-slate-700">{area}</td>
                      <td className="px-5 py-3.5 text-center">{ours ? <span className="text-emerald-500 font-bold text-base">✓</span> : <span className="text-slate-200">—</span>}</td>
                      <td className="px-5 py-3.5 text-center">{paper ? <span className="text-slate-400">✓</span> : <span className="text-slate-200">—</span>}</td>
                      <td className="px-5 py-3.5 text-center">{spreadsheet ? <span className="text-slate-400">✓</span> : <span className="text-slate-200">—</span>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Animate>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 relative overflow-hidden" style={{ background: "#050d1a" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "repeating-linear-gradient(45deg, rgba(255,255,255,0.015) 0px, rgba(255,255,255,0.015) 1px, transparent 1px, transparent 28px)", backgroundSize: "28px 28px" }} />
        <Animate className="relative max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-extrabold text-white mb-4">One system for your entire pet care operation</h2>
          <p className="text-white/40 mb-8">Free to start. Set up in minutes. No contract required.</p>
          <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=VET_CLINIC&plan=FREE`}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-semibold transition-all shadow-xl">
            Get started for free <ChevronRight className="w-4 h-4" />
          </a>
        </Animate>
      </section>

      <InternalLinks cluster="vet-clinic" currentPath="/vet-clinic/veterinary-clinic-and-pet-shop-management-system" />

      <footer className="bg-[#030810] border-t border-white/5 px-6 py-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2"><img src="/logo.png" alt="Smapey" className="w-6 h-6 rounded-md object-cover" /><span className="text-white/60 text-sm font-semibold">Smapey Vet Clinic Manager</span></div>
          <p className="text-white/20 text-xs">© {new Date().getFullYear()} Smapey. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}
