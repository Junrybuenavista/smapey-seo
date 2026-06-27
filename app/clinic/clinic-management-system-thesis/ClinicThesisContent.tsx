"use client"

import { useState, useEffect, useRef } from "react"
import InternalLinks from "@/components/InternalLinks"
import {
  BookOpen, Users, CalendarDays, CheckCircle2, ChevronRight,
  Menu, X, Database, BarChart3, Shield, ListOrdered,
  Stethoscope, ClipboardList, HeartPulse, ArrowRight,
} from "lucide-react"

const INK = "#161616"
const BLUE = "#2f6bff"
const AMBER = "#ff9e2c"
const CREAM = "#fbf7f0"
const display = { fontFamily: "'Hanken Grotesk', system-ui, sans-serif" }
const REGISTER_URL = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=CLINIC&plan=FREE`
const accentFor = (i: number) => (i % 2 === 0 ? BLUE : AMBER)
const onAccent = (c: string) => (c === AMBER ? INK : "#fff")

const MODULES = [
  { icon: Users, title: "Patient Management Module", desc: "Stores and retrieves patient demographic data — full name, contact number, date of birth, medical notes, and visit history. Supports search by name or phone." },
  { icon: Stethoscope, title: "Doctor & Staff Module", desc: "Manages medical personnel — their specialties, contact information, availability schedules (per day of week), and active/inactive status." },
  { icon: CalendarDays, title: "Appointment Management Module", desc: "Handles appointment booking — linking a patient to a doctor, date, time, and chief complaint. Supports multi-status workflow: Pending, Confirmed, In Queue, In Progress, Completed, Cancelled, No Show." },
  { icon: ListOrdered, title: "Queue Management Module", desc: "A real-time board that tracks the active patient queue per doctor. Patients are moved between Waiting, In Consultation, and Done — triggered by staff actions." },
  { icon: BarChart3, title: "Analytics & Reporting Module", desc: "Aggregates appointment data into dashboard metrics — total appointments today, weekly trend charts, monthly counts, completion rates, and in-queue counts." },
  { icon: Shield, title: "User Authentication & Roles Module", desc: "Manages user accounts per clinic organization. Supports role-based access control — Admin, Member — with feature-level permissions per product module." },
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

const ARCHITECTURE = [
  { layer: "Frontend", desc: "Web-based UI — a responsive dashboard where clinic staff book appointments, manage patients, and view the queue board. Built with React or Next.js.", icon: ClipboardList },
  { layer: "Backend / API", desc: "RESTful API that handles business logic — authentication, appointment CRUD, queue state transitions, analytics aggregation. Built with Node.js or similar.", icon: Database },
  { layer: "Database", desc: "Relational database (PostgreSQL / MySQL) storing all entities — organizations, doctors, patients, appointments, and schedules.", icon: Shield },
]

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
    { href: "/clinic", label: "Home" },
    { href: "#modules", label: "Modules" },
    { href: "#entities", label: "Data Model" },
    { href: "/clinic/guide", label: "Guide" },
  ]
  return (
    <nav className="fixed top-0 inset-x-0 z-50" style={{ background: CREAM, borderBottom: `2px solid ${INK}`, fontFamily: display.fontFamily }}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/clinic" className="flex items-center gap-2.5"><img src="/logo.png" alt="Smapey" className="w-8 h-8 rounded-lg object-cover" /><span className="font-extrabold tracking-tight" style={{ color: INK }}>Smapey Clinic</span></a>
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

export default function ClinicThesisContent() {
  useFont()
  return (
    <main style={{ fontFamily: display.fontFamily }}>
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden pt-32 pb-20" style={{ background: CREAM }}>
        <div className="absolute inset-0 pointer-events-none hidden md:block" aria-hidden>
          <div className="absolute rounded-[22px] border-2" style={{ top: "24%", left: "-70px", width: 240, height: 70, background: AMBER, borderColor: INK, transform: "rotate(-9deg)" }} />
          <div className="absolute rounded-[22px] border-2" style={{ bottom: "16%", right: "-70px", width: 260, height: 74, background: BLUE, borderColor: INK, transform: "rotate(8deg)", boxShadow: "5px 5px 0 rgba(22,22,22,.12)" }} />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border-2 text-xs font-bold mb-6" style={{ color: INK, borderColor: INK, boxShadow: `3px 3px 0 ${BLUE}` }}>
            <BookOpen className="w-3 h-3" /> Thesis guide &amp; reference
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight mb-6" style={{ color: INK }}>
            Clinic Management System <span style={{ color: BLUE }}>Thesis Guide</span>
          </h1>
          <p className="text-lg max-w-2xl mx-auto mb-10 leading-relaxed" style={{ color: "#54514c" }}>
            A complete reference for building a clinic management system — key modules, data models, system architecture, and a working implementation you can explore today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="#modules" className="flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm border-2 transition-transform hover:-translate-y-0.5" style={{ ...display, background: AMBER, color: INK, borderColor: INK, boxShadow: `4px 4px 0 ${INK}` }}>Explore the modules <ChevronRight className="w-4 h-4" /></a>
            <a href={REGISTER_URL} className="flex items-center gap-2 px-7 py-3.5 rounded-full border-2 bg-white font-bold text-sm transition-transform hover:-translate-y-0.5" style={{ ...display, color: INK, borderColor: INK }}>Try the live system</a>
          </div>
        </div>
      </section>

      {/* WHAT IS */}
      <section className="py-20" style={{ background: "#fff", borderTop: `2px solid ${INK}` }}>
        <div className="max-w-4xl mx-auto px-6">
          <Animate>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-6" style={{ color: INK }}>What is a Clinic Management System?</h2>
            <p className="leading-relaxed mb-4" style={{ color: "#54514c" }}>A <strong style={{ color: INK }}>clinic management system</strong> (CMS) is a software application that automates and centralizes the operational processes of a medical clinic. It replaces paper-based patient logbooks, manual appointment registers, and disconnected spreadsheets with a unified digital system.</p>
            <p className="leading-relaxed mb-4" style={{ color: "#54514c" }}>At its core, a clinic management system handles three primary functions: <strong style={{ color: INK }}>patient information management</strong> (storing and retrieving patient records), <strong style={{ color: INK }}>appointment scheduling</strong> (booking and tracking patient visits), and <strong style={{ color: INK }}>queue management</strong> (real-time tracking of who is waiting, in consultation, and done).</p>
            <p className="leading-relaxed" style={{ color: "#54514c" }}>Modern systems also include analytics dashboards, role-based staff access, doctor schedule management, and secure data storage — making the clinic management system a comprehensive operational backbone for small to mid-size medical practices.</p>
          </Animate>
        </div>
      </section>

      {/* THESIS TOPICS */}
      <section className="py-20" style={{ background: CREAM, borderTop: `2px solid ${INK}` }}>
        <div className="max-w-4xl mx-auto px-6">
          <Animate>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3" style={{ color: INK }}>Suggested Thesis Titles</h2>
            <p className="mb-8" style={{ color: "#54514c" }}>These thesis topics are commonly used for IT, Computer Science, and Health Informatics capstone projects focused on clinic management systems.</p>
            <div className="space-y-3">
              {THESIS_TOPICS.map((t, i) => {
                const c = accentFor(i)
                return (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-[16px] border-2" style={{ background: "#fff", borderColor: INK, boxShadow: `4px 4px 0 ${c}` }}>
                    <span className="w-6 h-6 rounded-full border-2 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5" style={{ background: c, color: onAccent(c), borderColor: INK }}>{i + 1}</span>
                    <p className="text-sm leading-relaxed font-medium" style={{ color: INK }}>{t}</p>
                  </div>
                )
              })}
            </div>
          </Animate>
        </div>
      </section>

      {/* MODULES */}
      <section id="modules" className="py-20 scroll-mt-20" style={{ background: "#fff", borderTop: `2px solid ${INK}` }}>
        <div className="max-w-6xl mx-auto px-6">
          <Animate className="mb-14">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3" style={{ color: INK }}>Key System Modules</h2>
            <p className="max-w-2xl" style={{ color: "#54514c" }}>A fully featured clinic management system is typically divided into these core functional modules.</p>
          </Animate>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {MODULES.map(({ icon: Icon, title, desc }, i) => {
              const c = accentFor(i)
              return (
                <Animate key={title} delay={i * 70}>
                  <div className="rounded-[20px] p-6 border-2 hover:-translate-y-1 transition-transform h-full" style={{ background: "#fff", borderColor: INK, boxShadow: `6px 6px 0 ${c}` }}>
                    <div className="w-11 h-11 rounded-[12px] border-2 flex items-center justify-center mb-4" style={{ background: c, borderColor: INK }}><Icon className="w-5 h-5" style={{ color: onAccent(c) }} /></div>
                    <h3 className="font-extrabold mb-2" style={{ color: INK }}>{title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "#54514c" }}>{desc}</p>
                  </div>
                </Animate>
              )
            })}
          </div>
        </div>
      </section>

      {/* DATA MODEL */}
      <section id="entities" className="py-20 scroll-mt-20" style={{ background: CREAM, borderTop: `2px solid ${INK}` }}>
        <div className="max-w-4xl mx-auto px-6">
          <Animate className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3" style={{ color: INK }}>Data Model Overview</h2>
            <p style={{ color: "#54514c" }}>The key database entities in a clinic management system and their primary attributes.</p>
          </Animate>
          <div className="space-y-4">
            {ENTITIES.map((e, i) => (
              <Animate key={e.name} delay={i * 80}>
                <div className="rounded-[16px] overflow-hidden border-2" style={{ borderColor: INK, background: "#fff" }}>
                  <div className="flex items-center gap-3 px-5 py-3" style={{ background: INK }}>
                    <Database className="w-4 h-4" style={{ color: AMBER }} />
                    <span className="font-bold text-sm text-white">{e.name}</span>
                  </div>
                  <div className="px-5 py-3 flex flex-wrap gap-2">
                    {e.attrs.map((a) => (
                      <code key={a} className="text-xs px-2 py-0.5 rounded-md font-mono border" style={{ background: "#eaf1ff", color: "#21314f", borderColor: "rgba(47,107,255,.25)" }}>{a}</code>
                    ))}
                  </div>
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* ARCHITECTURE */}
      <section className="py-20" style={{ background: "#fff", borderTop: `2px solid ${INK}` }}>
        <div className="max-w-4xl mx-auto px-6">
          <Animate>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-6" style={{ color: INK }}>System Architecture</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {ARCHITECTURE.map(({ layer, desc, icon: Icon }, i) => {
                const c = accentFor(i)
                return (
                  <Animate key={layer} delay={i * 100}>
                    <div className="rounded-[16px] border-2 p-5 h-full" style={{ background: CREAM, borderColor: INK, boxShadow: `5px 5px 0 ${c}` }}>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="w-8 h-8 rounded-[10px] border-2 flex items-center justify-center" style={{ background: c, borderColor: INK }}><Icon className="w-4 h-4" style={{ color: onAccent(c) }} /></span>
                        <span className="font-extrabold text-sm" style={{ color: INK }}>{layer}</span>
                      </div>
                      <p className="text-sm leading-relaxed" style={{ color: "#54514c" }}>{desc}</p>
                    </div>
                  </Animate>
                )
              })}
            </div>
          </Animate>
        </div>
      </section>

      {/* LIVE EXAMPLE CTA */}
      <section className="py-20" style={{ background: CREAM, borderTop: `2px solid ${INK}` }}>
        <div className="max-w-4xl mx-auto px-6">
          <Animate>
            <div className="rounded-[24px] overflow-hidden border-2" style={{ borderColor: INK, boxShadow: `10px 10px 0 ${INK}` }}>
              <div className="px-8 py-6" style={{ background: BLUE }}>
                <div className="flex items-center gap-3 mb-2">
                  <HeartPulse className="w-5 h-5 text-white" />
                  <span className="text-white font-extrabold text-lg">See a working implementation</span>
                </div>
                <p className="text-sm" style={{ color: "rgba(255,255,255,.85)" }}>Smapey Clinic Manager is a production-ready clinic management system — all the modules described above are live and usable for free.</p>
              </div>
              <div className="px-8 py-6 bg-white">
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  {[
                    "Patient registration & search",
                    "Doctor profiles & schedules",
                    "Appointment booking & workflow",
                    "Live queue board (Waiting → Done)",
                    "Analytics dashboard & trend charts",
                    "Role-based team access",
                  ].map((f) => (
                    <div key={f} className="flex items-center gap-2 text-sm" style={{ color: INK }}>
                      <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: BLUE }} />{f}
                    </div>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a href={REGISTER_URL} className="flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-sm border-2 transition-transform hover:-translate-y-0.5" style={{ ...display, background: AMBER, color: INK, borderColor: INK }}>
                    Try Smapey Clinic for free <ChevronRight className="w-4 h-4" />
                  </a>
                  <a href="/clinic/guide" className="flex items-center justify-center gap-2 px-6 py-3 rounded-full border-2 font-bold text-sm transition-transform hover:-translate-y-0.5" style={{ ...display, background: "#fff", color: INK, borderColor: INK }}>
                    Read the guide <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </Animate>
        </div>
      </section>

      <InternalLinks cluster="clinic" currentPath="/clinic/clinic-management-system-thesis" />

      <footer className="px-6 py-8" style={{ background: CREAM, borderTop: `2px solid ${INK}` }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2"><img src="/logo.png" alt="Smapey" className="w-6 h-6 rounded-md object-cover" /><span className="text-sm font-extrabold" style={{ color: INK }}>Clinic Manager by Smapey</span></div>
          <p className="text-xs" style={{ color: "#9a948b" }}>© {new Date().getFullYear()} Smapey. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}
