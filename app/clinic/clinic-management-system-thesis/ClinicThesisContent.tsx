"use client"

import { useState, useEffect, useRef } from "react"
import InternalLinks from "@/components/InternalLinks"
import Link from "next/link"
import {
  BookOpen, Users, CalendarDays, CheckCircle2, ChevronRight,
  Menu, X, Database, BarChart3, Shield, ListOrdered,
  Stethoscope, ClipboardList, HeartPulse, ArrowRight,
} from "lucide-react"

const MODULES = [
  {
    icon: Users,
    title: "Patient Management Module",
    desc: "Stores and retrieves patient demographic data — full name, contact number, date of birth, medical notes, and visit history. Supports search by name or phone.",
    color: "from-blue-600 to-blue-400", shadow: "shadow-blue-500/20",
  },
  {
    icon: Stethoscope,
    title: "Doctor & Staff Module",
    desc: "Manages medical personnel — their specialties, contact information, availability schedules (per day of week), and active/inactive status.",
    color: "from-cyan-600 to-blue-400", shadow: "shadow-cyan-500/20",
  },
  {
    icon: CalendarDays,
    title: "Appointment Management Module",
    desc: "Handles appointment booking — linking a patient to a doctor, date, time, and chief complaint. Supports multi-status workflow: Pending, Confirmed, In Queue, In Progress, Completed, Cancelled, No Show.",
    color: "from-blue-500 to-cyan-400", shadow: "shadow-blue-400/20",
  },
  {
    icon: ListOrdered,
    title: "Queue Management Module",
    desc: "A real-time board that tracks the active patient queue per doctor. Patients are moved between Waiting, In Consultation, and Done — triggered by staff actions.",
    color: "from-blue-700 to-blue-500", shadow: "shadow-blue-600/20",
  },
  {
    icon: BarChart3,
    title: "Analytics & Reporting Module",
    desc: "Aggregates appointment data into dashboard metrics — total appointments today, weekly trend charts, monthly counts, completion rates, and in-queue counts.",
    color: "from-cyan-500 to-blue-500", shadow: "shadow-cyan-500/20",
  },
  {
    icon: Shield,
    title: "User Authentication & Roles Module",
    desc: "Manages user accounts per clinic organization. Supports role-based access control — Admin, Member — with feature-level permissions per product module.",
    color: "from-blue-600 to-cyan-500", shadow: "shadow-blue-500/20",
  },
]

const ENTITIES = [
  { name: "Organization", attrs: ["id", "companyName", "logoUrl", "createdAt"] },
  { name: "Doctor", attrs: ["id", "name", "specialty", "phone", "email", "isActive", "organizationId"] },
  { name: "DoctorSchedule", attrs: ["id", "doctorId", "dayOfWeek", "startTime", "endTime"] },
  { name: "Patient", attrs: ["id", "firstName", "lastName", "phone", "email", "birthDate", "notes", "organizationId"] },
  { name: "Appointment", attrs: ["id", "patientId", "doctorId", "date", "startTime", "status", "chiefComplaint", "notes", "queueNumber"] },
]

const THESIS_TOPICS = [
  "Design and Development of a Web-Based Clinic Management System for Small Medical Practices",
  "Implementation of a Clinic Appointment Management System with Real-Time Queue Tracking",
  "A Patient Information Management System for Primary Care Clinics",
  "Development of a Dental Clinic Management System Using Modern Web Technologies",
  "Role-Based Access Control in a Multi-User Clinic Management System",
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
        <div className="flex items-center gap-2.5"><img src="/logo.png" alt="Smapey" className="w-8 h-8 rounded-lg object-cover" /><span className="text-white font-bold tracking-tight">Smapey Clinic</span></div>
        <div className="hidden md:flex items-center gap-6">
          <a href="/clinic" className="text-sm text-white/60 hover:text-white transition-colors">Home</a>
          <a href="#modules" className="text-sm text-white/60 hover:text-white transition-colors">Modules</a>
          <a href="#entities" className="text-sm text-white/60 hover:text-white transition-colors">Data Model</a>
        </div>
        <div className="hidden md:flex items-center gap-3">
          <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/login`} className="text-sm text-white/60 hover:text-white px-4 py-2">Sign in</a>
          <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=CLINIC&plan=FREE`} className="text-sm font-semibold px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/25 transition-colors">Try it free</a>
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden text-white/60 hover:text-white">{open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}</button>
      </div>
      {open && <div className="md:hidden bg-[#050d1a] border-t border-white/5 px-6 py-4 flex flex-col gap-4">
        <a href="/clinic" className="text-sm text-white/60 hover:text-white">Home</a>
        <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=CLINIC&plan=FREE`} className="text-sm font-semibold px-4 py-2 rounded-lg bg-blue-600 text-white text-center">Try it free</a>
      </div>}
    </nav>
  )
}

export default function ClinicThesisContent() {
  return (
    <main className="bg-white">
      <Navbar />

      {/* HERO */}
      <section className="relative pt-32 pb-20 overflow-hidden" style={{ background: "#050d1a", backgroundImage: "repeating-linear-gradient(45deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 28px)", backgroundSize: "28px 28px" }}>
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(37,99,235,0.14) 0%, transparent 70%)" }} />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-6">
            <BookOpen className="w-3 h-3" /> Thesis guide &amp; reference
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight tracking-tight mb-6">
            Clinic Management System{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-300">Thesis Guide</span>
          </h1>
          <p className="text-lg text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed">
            A complete reference for building a clinic management system — key modules, data models, system architecture, and a working implementation you can explore today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="#modules" onClick={(e) => { e.preventDefault(); document.getElementById("modules")?.scrollIntoView({ behavior: "smooth" }) }} className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all shadow-lg shadow-blue-600/30">Explore the modules <ChevronRight className="w-4 h-4" /></a>
            <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=CLINIC&plan=FREE`} className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white font-medium text-sm transition-all border border-white/10">Try the live system</a>
          </div>
        </div>
      </section>

      {/* WHAT IS */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6">
          <Animate>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight mb-6">What is a Clinic Management System?</h2>
            <div className="prose prose-slate max-w-none">
              <p className="text-slate-600 leading-relaxed mb-4">
                A <strong>clinic management system</strong> (CMS) is a software application that automates and centralizes the operational processes of a medical clinic. It replaces paper-based patient logbooks, manual appointment registers, and disconnected spreadsheets with a unified digital system.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                At its core, a clinic management system handles three primary functions: <strong>patient information management</strong> (storing and retrieving patient records), <strong>appointment scheduling</strong> (booking and tracking patient visits), and <strong>queue management</strong> (real-time tracking of who is waiting, in consultation, and done).
              </p>
              <p className="text-slate-600 leading-relaxed">
                Modern systems also include analytics dashboards, role-based staff access, doctor schedule management, and secure data storage — making the clinic management system a comprehensive operational backbone for small to mid-size medical practices.
              </p>
            </div>
          </Animate>
        </div>
      </section>

      {/* THESIS TOPICS */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-6">
          <Animate>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight mb-3">Suggested Thesis Titles</h2>
            <p className="text-slate-500 mb-8">These thesis topics are commonly used for IT, Computer Science, and Health Informatics capstone projects focused on clinic management systems.</p>
            <div className="space-y-3">
              {THESIS_TOPICS.map((t, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-blue-50 border border-blue-100">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                  <p className="text-slate-700 text-sm leading-relaxed font-medium">{t}</p>
                </div>
              ))}
            </div>
          </Animate>
        </div>
      </section>

      {/* MODULES */}
      <section id="modules" className="py-20 bg-slate-50 border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-6">
          <Animate className="mb-14">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight mb-3">Key System Modules</h2>
            <p className="text-slate-500 max-w-2xl">A fully featured clinic management system is typically divided into these core functional modules.</p>
          </Animate>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {MODULES.map(({ icon: Icon, title, desc, color, shadow }, i) => (
              <Animate key={title} delay={i * 70}>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300 h-full">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-tr ${color} shadow-lg ${shadow} flex items-center justify-center mb-4`}><Icon className="w-5 h-5 text-white" /></div>
                  <h3 className="font-bold text-slate-800 mb-2">{title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* DATA MODEL */}
      <section id="entities" className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-6">
          <Animate className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight mb-3">Data Model Overview</h2>
            <p className="text-slate-500">The key database entities in a clinic management system and their primary attributes.</p>
          </Animate>
          <div className="space-y-4">
            {ENTITIES.map((e, i) => (
              <Animate key={e.name} delay={i * 80}>
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <div className="flex items-center gap-3 px-5 py-3 bg-slate-50 border-b border-slate-100">
                    <Database className="w-4 h-4 text-blue-500" />
                    <span className="font-bold text-slate-800 text-sm">{e.name}</span>
                  </div>
                  <div className="px-5 py-3 flex flex-wrap gap-2">
                    {e.attrs.map((a) => (
                      <code key={a} className="text-xs bg-blue-50 text-blue-700 border border-blue-100 px-2 py-0.5 rounded-md font-mono">{a}</code>
                    ))}
                  </div>
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* ARCHITECTURE */}
      <section className="py-20 bg-slate-50 border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-6">
          <Animate>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight mb-6">System Architecture</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { layer: "Frontend", desc: "Web-based UI — a responsive dashboard where clinic staff book appointments, manage patients, and view the queue board. Built with React or Next.js.", icon: ClipboardList, color: "bg-blue-50 border-blue-200 text-blue-700" },
                { layer: "Backend / API", desc: "RESTful API that handles business logic — authentication, appointment CRUD, queue state transitions, analytics aggregation. Built with Node.js or similar.", icon: Database, color: "bg-cyan-50 border-cyan-200 text-cyan-700" },
                { layer: "Database", desc: "Relational database (PostgreSQL / MySQL) storing all entities — organizations, doctors, patients, appointments, and schedules.", icon: Shield, color: "bg-indigo-50 border-indigo-200 text-indigo-700" },
              ].map(({ layer, desc, icon: Icon, color }, i) => (
                <Animate key={layer} delay={i * 100}>
                  <div className={`rounded-xl border p-5 ${color}`}>
                    <div className="flex items-center gap-2 mb-3"><Icon className="w-4 h-4" /><span className="font-bold text-sm">{layer}</span></div>
                    <p className="text-sm leading-relaxed opacity-80">{desc}</p>
                  </div>
                </Animate>
              ))}
            </div>
          </Animate>
        </div>
      </section>

      {/* LIVE EXAMPLE CTA */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-6">
          <Animate>
            <div className="rounded-2xl overflow-hidden border border-blue-100 shadow-sm">
              <div className="bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-6">
                <div className="flex items-center gap-3 mb-2">
                  <HeartPulse className="w-5 h-5 text-white" />
                  <span className="text-white font-bold text-lg">See a working implementation</span>
                </div>
                <p className="text-blue-100 text-sm">Smapey Clinic Manager is a production-ready clinic management system — all the modules described above are live and usable for free.</p>
              </div>
              <div className="bg-slate-50 px-8 py-6">
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  {[
                    "Patient registration & search",
                    "Doctor profiles & schedules",
                    "Appointment booking & workflow",
                    "Live queue board (Waiting → Done)",
                    "Analytics dashboard & trend charts",
                    "Role-based team access",
                  ].map((f) => (
                    <div key={f} className="flex items-center gap-2 text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" />{f}
                    </div>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=CLINIC&plan=FREE`} className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all shadow-lg shadow-blue-600/20">
                    Try Smapey Clinic for free <ChevronRight className="w-4 h-4" />
                  </a>
                  <Link href="/clinic/guide" className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white border border-slate-200 hover:border-blue-300 text-slate-600 hover:text-blue-600 font-medium text-sm transition-all">
                    Read the guide <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </Animate>
        </div>
      </section>

      <InternalLinks cluster="clinic" currentPath="/clinic/clinic-management-system-thesis" />

      <footer className="bg-slate-900 border-t border-white/5 px-6 py-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2"><img src="/logo.png" alt="Smapey" className="w-6 h-6 rounded-md object-cover" /><span className="text-white/60 text-sm font-semibold">Smapey Clinic Manager</span></div>
          <p className="text-white/20 text-xs">© {new Date().getFullYear()} Smapey. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}
