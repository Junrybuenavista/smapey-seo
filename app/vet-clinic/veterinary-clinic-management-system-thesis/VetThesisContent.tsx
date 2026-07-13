"use client"

import { useState, useEffect, useRef } from "react"
import InternalLinks from "@/components/InternalLinks"
import {
  PawPrint, Users, CalendarDays, CheckCircle2, ChevronRight,
  Menu, X, BarChart3, Shield, ListOrdered, Syringe, Receipt,
  Database, ArrowRight, BookOpen,
} from "lucide-react"

const INK = "#161616"
const BLUE = "#2f6bff"
const AMBER = "#ff9e2c"
const CREAM = "#fbf7f0"
const display = { fontFamily: "'Hanken Grotesk', system-ui, sans-serif" }
const REGISTER_URL = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=VET_CLINIC&plan=FREE`
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
  return (
    <nav className="fixed top-0 inset-x-0 z-50" style={{ background: CREAM, borderBottom: `2px solid ${INK}`, fontFamily: display.fontFamily }}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/vet-clinic" className="flex items-center gap-2.5"><img src="/logo.png" alt="Smapey" className="w-8 h-8 rounded-lg object-cover" /><span className="font-extrabold tracking-tight" style={{ color: INK }}>Smapey Vet</span></a>
        <div className="hidden md:flex items-center gap-3">
          <a href="/vet-clinic" className="text-sm font-semibold hover:opacity-60 transition-opacity px-2 py-2" style={{ color: INK }}>Back to overview</a>
          <a href={REGISTER_URL} className="text-sm font-bold px-5 py-2.5 rounded-full border-2 transition-transform hover:-translate-y-0.5" style={{ ...display, background: AMBER, color: INK, borderColor: INK, boxShadow: `3px 3px 0 ${INK}` }}>Try it live</a>
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden" style={{ color: INK }}>{open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}</button>
      </div>
      {open && <div className="md:hidden px-6 py-4" style={{ background: CREAM, borderTop: `2px solid ${INK}` }}><a href={REGISTER_URL} className="block text-sm font-bold px-4 py-2.5 rounded-full border-2 text-center" style={{ ...display, background: AMBER, color: INK, borderColor: INK }}>Try it live</a></div>}
    </nav>
  )
}

const MODULES = [
  { icon: PawPrint, title: "Pet Management Module", desc: "Stores complete pet profiles - name, species, breed, date of birth, weight, sex, owner contact, and medical notes. Supports search by pet name or owner name. Each pet is linked to an organization and can have multiple appointments and vaccination records." },
  { icon: Users, title: "Veterinarian Module", desc: "Manages vet personnel - name, specialty, contact info, per-day availability schedules, and active/inactive status. Appointments are assigned per vet, and the queue board is filtered per vet at runtime." },
  { icon: CalendarDays, title: "Appointment Management Module", desc: "Handles booking - linking a pet to a vet, date, start time, and chief complaint. Supports a multi-status workflow: Pending → Confirmed → In Queue → In Progress → Completed, Cancelled, or No Show." },
  { icon: ListOrdered, title: "Queue Management Module", desc: "A real-time board that tracks the active patient queue per vet. Pets are moved between Waiting, In Progress, and Done by staff actions. Queue number is auto-assigned on confirmation." },
  { icon: Syringe, title: "Vaccination Records Module", desc: "Logs each vaccination per pet with the vaccine name, date given, and next due date. A 30-day upcoming vaccination report is exposed on the dashboard for proactive owner reminders." },
  { icon: Receipt, title: "Billing & Payment Module", desc: "Creates itemized bills per pet per visit - with line items (description, quantity, unit price, computed amount). Tracks payment status (Unpaid, Partial, Paid), amount paid, payment method, and outstanding balance." },
  { icon: BarChart3, title: "Analytics & Reporting Module", desc: "Aggregates clinic data into dashboard metrics - monthly appointment counts, completion rates, upcoming vaccinations, unpaid bill totals, and 7-day trend charts for appointments and completions." },
  { icon: Shield, title: "User Authentication & Roles Module", desc: "Multi-tenant system - each vet clinic is an isolated organization. Supports role-based access control (Admin, Member) with feature-level permissions per product. Accounts are managed per organization." },
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
  useFont()
  return (
    <main style={{ fontFamily: display.fontFamily }}>
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden pt-32 pb-16" style={{ background: CREAM }}>
        <div className="absolute inset-0 pointer-events-none hidden md:block" aria-hidden>
          <div className="absolute rounded-[22px] border-2" style={{ top: "24%", left: "-70px", width: 240, height: 70, background: AMBER, borderColor: INK, transform: "rotate(-9deg)" }} />
          <div className="absolute rounded-[22px] border-2" style={{ bottom: "16%", right: "-70px", width: 260, height: 74, background: BLUE, borderColor: INK, transform: "rotate(8deg)", boxShadow: "5px 5px 0 rgba(22,22,22,.12)" }} />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border-2 text-xs font-bold mb-6" style={{ color: INK, borderColor: INK, boxShadow: `3px 3px 0 ${BLUE}` }}>
            <BookOpen className="w-3 h-3" /> Thesis Reference
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight mb-6" style={{ color: INK }}>
            Veterinary Clinic Management System, thesis documentation guide
          </h1>
          <p className="text-lg max-w-2xl mx-auto mb-8" style={{ color: "#54514c" }}>
            A practical reference for students writing a thesis on a veterinary clinic management system, covering system modules, database entities, architecture patterns, and suggested thesis titles.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href={REGISTER_URL} className="flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm border-2 transition-transform hover:-translate-y-0.5" style={{ ...display, background: AMBER, color: INK, borderColor: INK, boxShadow: `4px 4px 0 ${INK}` }}>
              Try the live system <ChevronRight className="w-4 h-4" />
            </a>
            <a href="/vet-clinic" className="flex items-center gap-2 px-7 py-3.5 rounded-full border-2 bg-white font-bold text-sm transition-transform hover:-translate-y-0.5" style={{ ...display, color: INK, borderColor: INK }}>
              Product overview
            </a>
          </div>
        </div>
      </section>

      {/* MODULES */}
      <section className="py-20" style={{ background: "#fff", borderTop: `2px solid ${INK}` }}>
        <div className="max-w-6xl mx-auto px-6">
          <Animate className="text-center mb-12">
            <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: BLUE }}>System Modules</p>
            <h2 className="text-3xl font-extrabold" style={{ color: INK }}>Core modules of a veterinary clinic management system</h2>
            <p className="mt-3 max-w-xl mx-auto" style={{ color: "#54514c" }}>These are the standard modules your thesis system should include, each covering a key operational area of a vet clinic.</p>
          </Animate>
          <div className="grid sm:grid-cols-2 gap-5">
            {MODULES.map(({ icon: Icon, title, desc }, i) => {
              const c = accentFor(i)
              return (
                <Animate key={title} delay={i * 70}>
                  <div className="rounded-[20px] p-6 border-2 hover:-translate-y-1 transition-transform flex gap-4 h-full" style={{ background: "#fff", borderColor: INK, boxShadow: `5px 5px 0 ${c}` }}>
                    <div className="w-10 h-10 rounded-[12px] border-2 flex items-center justify-center shrink-0 mt-0.5" style={{ background: c, borderColor: INK }}><Icon className="w-5 h-5" style={{ color: onAccent(c) }} /></div>
                    <div><h3 className="font-extrabold mb-1.5" style={{ color: INK }}>{title}</h3><p className="text-sm leading-relaxed" style={{ color: "#54514c" }}>{desc}</p></div>
                  </div>
                </Animate>
              )
            })}
          </div>
        </div>
      </section>

      {/* DATABASE ENTITIES */}
      <section className="py-20" style={{ background: CREAM, borderTop: `2px solid ${INK}` }}>
        <div className="max-w-6xl mx-auto px-6">
          <Animate className="text-center mb-12">
            <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: BLUE }}>Database Design</p>
            <h2 className="text-3xl font-extrabold" style={{ color: INK }}>Key database entities</h2>
            <p className="mt-3 max-w-xl mx-auto" style={{ color: "#54514c" }}>The core tables (entities) your system needs and their main attributes, useful for your ER diagram and schema design.</p>
          </Animate>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ENTITIES.map(({ name, attrs }, i) => (
              <Animate key={name} delay={i * 60}>
                <div className="rounded-[16px] p-5 border-2" style={{ background: INK, borderColor: INK, boxShadow: `5px 5px 0 ${accentFor(i)}` }}>
                  <div className="flex items-center gap-2 mb-3">
                    <Database className="w-4 h-4 shrink-0" style={{ color: AMBER }} />
                    <span className="font-bold text-sm" style={{ color: "#7ea8ff" }}>{name}</span>
                  </div>
                  <ul className="space-y-1">
                    {attrs.map(a => <li key={a} className="text-xs font-mono" style={{ color: "rgba(255,255,255,.6)" }}>{a}</li>)}
                  </ul>
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* THESIS TITLES */}
      <section className="py-20" style={{ background: "#fff", borderTop: `2px solid ${INK}` }}>
        <div className="max-w-4xl mx-auto px-6">
          <Animate className="text-center mb-12">
            <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: BLUE }}>Suggested Titles</p>
            <h2 className="text-3xl font-extrabold" style={{ color: INK }}>Thesis title ideas</h2>
            <p className="mt-3" style={{ color: "#54514c" }}>Use these as a starting point or adapt them to your specific scope and methodology.</p>
          </Animate>
          <div className="flex flex-col gap-3">
            {THESIS_TOPICS.map((t, i) => {
              const c = accentFor(i)
              return (
                <Animate key={i} delay={i * 70}>
                  <div className="flex items-start gap-3 rounded-[16px] border-2 px-5 py-4" style={{ background: "#fff", borderColor: INK, boxShadow: `4px 4px 0 ${c}` }}>
                    <span className="w-7 h-7 rounded-[8px] border-2 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5" style={{ background: c, color: onAccent(c), borderColor: INK }}>{i + 1}</span>
                    <p className="text-sm leading-relaxed" style={{ color: INK }}>{t}</p>
                  </div>
                </Animate>
              )
            })}
          </div>
        </div>
      </section>

      {/* LIVE SYSTEM CALLOUT */}
      <section className="py-16" style={{ background: CREAM, borderTop: `2px solid ${INK}` }}>
        <div className="max-w-4xl mx-auto px-6">
          <Animate>
            <div className="rounded-[20px] border-2 p-8 flex flex-col sm:flex-row items-center gap-6" style={{ background: "#fff", borderColor: INK, boxShadow: `8px 8px 0 ${BLUE}` }}>
              <div className="flex-1">
                <h3 className="text-xl font-extrabold mb-2" style={{ color: INK }}>Use Smapey as your live working demo</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#54514c" }}>Instead of building a prototype from scratch, use Smapey&apos;s free plan to demonstrate a fully working veterinary clinic management system, with real pet records, appointments, vaccinations, and billing.</p>
                <ul className="mt-4 space-y-1.5">
                  {["All 8 modules already built and working", "Free plan, no credit card required", "Show live features during your thesis defense"].map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm" style={{ color: "#54514c" }}><CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: BLUE }} />{f}</li>
                  ))}
                </ul>
              </div>
              <a href={REGISTER_URL} className="shrink-0 flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm border-2 transition-transform hover:-translate-y-0.5" style={{ ...display, background: AMBER, color: INK, borderColor: INK }}>
                Try the live system <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </Animate>
        </div>
      </section>

      <InternalLinks cluster="vet-clinic" currentPath="/vet-clinic/veterinary-clinic-management-system-thesis" />

      <footer className="px-6 py-8" style={{ background: CREAM, borderTop: `2px solid ${INK}` }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2"><img src="/logo.png" alt="Smapey" className="w-6 h-6 rounded-md object-cover" /><span className="text-sm font-extrabold" style={{ color: INK }}>Vet Clinic Manager by Smapey</span></div>
          <p className="text-xs" style={{ color: "#9a948b" }}>© {new Date().getFullYear()} Smapey. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}
