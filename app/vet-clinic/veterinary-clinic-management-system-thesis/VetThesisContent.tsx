"use client"

import { useState, useEffect, useRef } from "react"
import InternalLinks from "@/components/InternalLinks"
import Link from "next/link"
import {
  PawPrint, Users, CalendarDays, CheckCircle2, ChevronRight,
  Menu, X, BarChart3, Shield, ListOrdered, Syringe, Receipt,
  Database, ArrowRight, BookOpen,
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
          <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=VET_CLINIC&plan=FREE`} className="text-sm font-semibold px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white">Try it live</a>
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden text-white/60">{open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}</button>
      </div>
      {open && <div className="md:hidden bg-[#050d1a] border-t border-white/5 px-6 py-4"><a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=VET_CLINIC&plan=FREE`} className="block text-sm font-semibold px-4 py-2 rounded-lg bg-emerald-600 text-white text-center">Try it live</a></div>}
    </nav>
  )
}

const MODULES = [
  { icon: PawPrint, title: "Pet Management Module", desc: "Stores complete pet profiles — name, species, breed, date of birth, weight, sex, owner contact, and medical notes. Supports search by pet name or owner name. Each pet is linked to an organization and can have multiple appointments and vaccination records.", color: "from-emerald-600 to-teal-400", shadow: "shadow-emerald-500/20" },
  { icon: Users, title: "Veterinarian Module", desc: "Manages vet personnel — name, specialty, contact info, per-day availability schedules, and active/inactive status. Appointments are assigned per vet, and the queue board is filtered per vet at runtime.", color: "from-teal-600 to-emerald-400", shadow: "shadow-teal-500/20" },
  { icon: CalendarDays, title: "Appointment Management Module", desc: "Handles booking — linking a pet to a vet, date, start time, and chief complaint. Supports a multi-status workflow: Pending → Confirmed → In Queue → In Progress → Completed, Cancelled, or No Show.", color: "from-emerald-500 to-cyan-400", shadow: "shadow-emerald-400/20" },
  { icon: ListOrdered, title: "Queue Management Module", desc: "A real-time board that tracks the active patient queue per vet. Pets are moved between Waiting, In Progress, and Done by staff actions. Queue number is auto-assigned on confirmation.", color: "from-emerald-700 to-teal-500", shadow: "shadow-emerald-600/20" },
  { icon: Syringe, title: "Vaccination Records Module", desc: "Logs each vaccination per pet with the vaccine name, date given, and next due date. A 30-day upcoming vaccination report is exposed on the dashboard for proactive owner reminders.", color: "from-teal-500 to-emerald-500", shadow: "shadow-teal-500/20" },
  { icon: Receipt, title: "Billing & Payment Module", desc: "Creates itemized bills per pet per visit — with line items (description, quantity, unit price, computed amount). Tracks payment status (Unpaid, Partial, Paid), amount paid, payment method, and outstanding balance.", color: "from-emerald-600 to-cyan-500", shadow: "shadow-emerald-500/20" },
  { icon: BarChart3, title: "Analytics & Reporting Module", desc: "Aggregates clinic data into dashboard metrics — monthly appointment counts, completion rates, upcoming vaccinations, unpaid bill totals, and 7-day trend charts for appointments and completions.", color: "from-cyan-500 to-emerald-500", shadow: "shadow-cyan-500/20" },
  { icon: Shield, title: "User Authentication & Roles Module", desc: "Multi-tenant system — each vet clinic is an isolated organization. Supports role-based access control (Admin, Member) with feature-level permissions per product. Accounts are managed per organization.", color: "from-teal-700 to-emerald-500", shadow: "shadow-teal-600/20" },
]

const ENTITIES = [
  { name: "Organization", attrs: ["id", "companyName", "logoUrl", "currencySymbol", "createdAt"] },
  { name: "Vet", attrs: ["id", "name", "specialty", "phone", "email", "isActive", "organizationId"] },
  { name: "VetSchedule", attrs: ["id", "vetId", "dayOfWeek", "startTime", "endTime"] },
  { name: "Pet", attrs: ["id", "name", "species", "breed", "dateOfBirth", "sex", "weight", "ownerName", "ownerPhone", "ownerEmail", "notes", "organizationId"] },
  { name: "VetAppointment", attrs: ["id", "petId", "vetId", "date", "startTime", "status", "chiefComplaint", "notes", "queueNumber", "organizationId"] },
  { name: "PetVaccination", attrs: ["id", "petId", "vaccineName", "dateGiven", "nextDueDate", "notes"] },
  { name: "PetBill", attrs: ["id", "petId", "date", "totalAmount", "amountPaid", "status", "paymentMethod", "notes"] },
  { name: "PetBillItem", attrs: ["id", "billId", "description", "quantity", "unitPrice", "amount"] },
]

const THESIS_TOPICS = [
  "Design and Development of a Web-Based Veterinary Clinic Management System for Small Animal Clinics",
  "Implementation of a Veterinary Appointment and Queue Management System with Real-Time Status Tracking",
  "A Vaccination Records and Reminder Management System for Veterinary Clinics",
  "Development of a Veterinary Clinic and Pet Shop Management System with Integrated Billing Module",
  "Role-Based Access Control in a Multi-Tenant Veterinary Clinic Information System",
]

export default function VetThesisContent() {
  return (
    <main className="bg-white min-h-screen">
      <Navbar />

      {/* HERO */}
      <section className="relative pt-32 pb-16 overflow-hidden" style={{ background: "#050d1a", backgroundImage: "repeating-linear-gradient(45deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 28px)", backgroundSize: "28px 28px" }}>
        <div className="absolute -top-32 left-0 w-[400px] h-[400px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%)" }} />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-6">
            <BookOpen className="w-3 h-3" /> Thesis Reference
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight tracking-tight mb-6">
            Veterinary Clinic Management System — thesis documentation guide
          </h1>
          <p className="text-lg text-white/50 max-w-2xl mx-auto mb-8">
            A practical reference for students writing a thesis on a veterinary clinic management system — covering system modules, database entities, architecture patterns, and suggested thesis titles.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=VET_CLINIC&plan=FREE`}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm shadow-lg shadow-emerald-600/30">
              Try the live system <ChevronRight className="w-4 h-4" />
            </a>
            <Link href="/vet-clinic" className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white font-medium text-sm border border-white/10">
              Product overview
            </Link>
          </div>
        </div>
      </section>

      {/* MODULES */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <Animate className="text-center mb-12">
            <p className="text-emerald-600 text-sm font-semibold uppercase tracking-widest mb-3">System Modules</p>
            <h2 className="text-3xl font-extrabold text-slate-800">Core modules of a veterinary clinic management system</h2>
            <p className="text-slate-500 mt-3 max-w-xl mx-auto">These are the standard modules your thesis system should include — each covering a key operational area of a vet clinic.</p>
          </Animate>
          <div className="grid sm:grid-cols-2 gap-5">
            {MODULES.map(({ icon: Icon, title, desc, color, shadow }, i) => (
              <Animate key={title} delay={i * 70}>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-all flex gap-4">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${color} shadow-lg ${shadow} flex items-center justify-center shrink-0 mt-0.5`}><Icon className="w-5 h-5 text-white" /></div>
                  <div><h3 className="font-bold text-slate-800 mb-1.5">{title}</h3><p className="text-slate-500 text-sm leading-relaxed">{desc}</p></div>
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* DATABASE ENTITIES */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <Animate className="text-center mb-12">
            <p className="text-emerald-600 text-sm font-semibold uppercase tracking-widest mb-3">Database Design</p>
            <h2 className="text-3xl font-extrabold text-slate-800">Key database entities</h2>
            <p className="text-slate-500 mt-3 max-w-xl mx-auto">The core tables (entities) your system needs and their main attributes — useful for your ER diagram and schema design.</p>
          </Animate>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ENTITIES.map(({ name, attrs }, i) => (
              <Animate key={name} delay={i * 60}>
                <div className="bg-slate-900 rounded-2xl p-5 shadow-sm border border-slate-700 hover:border-emerald-700/50 transition-all">
                  <div className="flex items-center gap-2 mb-3">
                    <Database className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="font-bold text-emerald-300 text-sm">{name}</span>
                  </div>
                  <ul className="space-y-1">
                    {attrs.map(a => <li key={a} className="text-xs font-mono text-slate-400">{a}</li>)}
                  </ul>
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* THESIS TITLES */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6">
          <Animate className="text-center mb-12">
            <p className="text-emerald-600 text-sm font-semibold uppercase tracking-widest mb-3">Suggested Titles</p>
            <h2 className="text-3xl font-extrabold text-slate-800">Thesis title ideas</h2>
            <p className="text-slate-500 mt-3">Use these as a starting point or adapt them to your specific scope and methodology.</p>
          </Animate>
          <div className="flex flex-col gap-3">
            {THESIS_TOPICS.map((t, i) => (
              <Animate key={i} delay={i * 70}>
                <div className="flex items-start gap-3 bg-white border border-slate-200 rounded-xl px-5 py-4 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all">
                  <span className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                  <p className="text-slate-700 text-sm leading-relaxed">{t}</p>
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* LIVE SYSTEM CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <Animate>
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100 rounded-2xl p-8 flex flex-col sm:flex-row items-center gap-6">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-slate-800 mb-2">Use Smapey as your live working demo</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Instead of building a prototype from scratch, use Smapey's free plan to demonstrate a fully working veterinary clinic management system — with real pet records, appointments, vaccinations, and billing.
                </p>
                <ul className="mt-4 space-y-1.5">
                  {["All 8 modules already built and working", "Free plan — no credit card required", "Show live features during your thesis defense"].map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm text-slate-600"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />{f}</li>
                  ))}
                </ul>
              </div>
              <div className="shrink-0">
                <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=VET_CLINIC&plan=FREE`}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all shadow-lg shadow-emerald-600/20">
                  Try the live system <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </Animate>
        </div>
      </section>

      <InternalLinks cluster="vet-clinic" currentPath="/vet-clinic/veterinary-clinic-management-system-thesis" />

      <footer className="bg-[#030810] border-t border-white/5 px-6 py-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2"><img src="/logo.png" alt="Smapey" className="w-6 h-6 rounded-md object-cover" /><span className="text-white/60 text-sm font-semibold">Smapey Vet Clinic Manager</span></div>
          <p className="text-white/20 text-xs">© {new Date().getFullYear()} Smapey. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}
