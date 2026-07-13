"use client"

import { useState, useEffect, useRef } from "react"
import InternalLinks from "@/components/InternalLinks"
import {
  BookOpen, Users, CalendarDays, CheckCircle2, ChevronRight,
  Menu, X, Stethoscope, ListOrdered, BarChart3,
  Clock, HeartPulse, UserCheck, ClipboardList, ArrowLeft,
} from "lucide-react"

const INK = "#161616"
const BLUE = "#2f6bff"
const AMBER = "#ff9e2c"
const CREAM = "#fbf7f0"
const display = { fontFamily: "'Hanken Grotesk', system-ui, sans-serif" }
const REGISTER_URL = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=CLINIC&plan=FREE`

const SECTIONS = [
  {
    id: "setup",
    icon: Stethoscope,
    title: "1. Set Up Your Clinic",
    steps: [
      { title: "Create your Smapey account", desc: "Sign up at smapey.com and select Clinic Manager as your product. Your clinic account is created immediately - no credit card required on the free plan." },
      { title: "Add doctors", desc: "Go to the Doctors page. Click Add Doctor and fill in the doctor's name, specialty (e.g. General Practitioner, Dentist), phone, and email. Save to add them to your clinic roster." },
      { title: "Set doctor schedules", desc: "Click on a doctor's name to expand their schedule. Use the Add Slot form to define which days and hours they're available - e.g. Monday 8:00–17:00. Repeat for each day they work." },
      { title: "Invite your team", desc: "Go to Settings → Team and invite receptionists or nurses. They'll receive an email and can log in with their own account. Assign them Admin or Member access based on their role." },
    ],
  },
  {
    id: "patients",
    icon: Users,
    title: "2. Register Patients",
    steps: [
      { title: "Open the Patients page", desc: "Navigate to Clinic → Patients from the sidebar." },
      { title: "Enter patient details", desc: "Click Register Patient and fill in their demographics - first and last name, date of birth, gender, phone, email, and home address. Only the name is required, so you can register a walk-in fast and complete the rest later." },
      { title: "Record medical & emergency info", desc: "Add the patient's blood type, any allergies (e.g. Penicillin, peanuts), and an emergency contact name and phone. Allergies are surfaced prominently in the patient's record so they're never missed at the point of care." },
      { title: "Save the profile", desc: "The patient is now stored in your clinic's records. Search for them anytime by name or phone - the list pages results so it stays fast even with thousands of patients." },
      { title: "Open a patient's record", desc: "Click Details on any patient to see their full chart - demographics, a highlighted allergy alert, emergency contact, notes, and their complete visit history with the status of every past appointment. Click Edit to update any of it at any time." },
    ],
  },
  {
    id: "appointments",
    icon: CalendarDays,
    title: "3. Book Appointments",
    steps: [
      { title: "Open the Appointments page", desc: "Navigate to Clinic → Appointments from the sidebar." },
      { title: "Click Book Appointment", desc: "Select the patient (from your registered patient list), the doctor, the date, and the start time." },
      { title: "Add a chief complaint", desc: "Optionally enter the reason for the visit - e.g. Annual check-up, Toothache, Follow-up. This helps the doctor prepare before the consultation." },
      { title: "Save the appointment", desc: "The appointment is created with a Pending status and a queue number. You can filter appointments by doctor, date, or status at any time." },
    ],
  },
  {
    id: "queue",
    icon: ListOrdered,
    title: "4. Run the Queue Board",
    steps: [
      { title: "Open the Queue page", desc: "Navigate to Clinic → Queue from the sidebar. This shows today's patient queue in a live kanban board." },
      { title: "Confirm & enqueue patients", desc: "Click Confirm on a pending appointment, then Enqueue when the patient arrives. The card moves to the Waiting column." },
      { title: "Start the consultation", desc: "When the doctor is ready, click Call In. The patient's card moves to In Consultation with an active pulse indicator." },
      { title: "Complete or handle exceptions", desc: "When the consultation is done, click Done. If the patient didn't show, click No Show. If cancelled, click Cancel. The board follows a guided workflow (a completed visit can't accidentally be moved back into the queue) and every action is logged automatically." },
    ],
  },
  {
    id: "analytics",
    icon: BarChart3,
    title: "5. View Analytics",
    steps: [
      { title: "Open the Analytics page", desc: "Navigate to Clinic → Analytics from the sidebar." },
      { title: "Review stat cards", desc: "See totals for: active doctors, registered patients, today's appointments, completed consultations, and monthly totals." },
      { title: "Check the 7-day chart", desc: "The bar chart shows total appointments and completions for each of the last 7 days - helpful for spotting busy vs. slow periods." },
      { title: "Monitor today's schedule", desc: "The bottom section of the analytics page shows today's queued patients with their doctor, time, and current status." },
    ],
  },
]

const TIPS = [
  { icon: Clock, tip: "Set up doctor schedules before booking, this prevents confusion about who's available on which days." },
  { icon: UserCheck, tip: "Fill in allergies and an emergency contact when you register a patient, the allergy alert shows at the top of their record, so it's never missed during a consult." },
  { icon: ClipboardList, tip: "Use the chief complaint field when booking, it helps doctors prepare and makes appointment notes more useful over time." },
  { icon: HeartPulse, tip: "Keep the Queue page open on a clinic tablet or screen throughout the day for real-time visibility." },
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
    { href: "/clinic#features", label: "Features" },
    { href: "/clinic#how-it-works", label: "How it Works" },
    { href: "/clinic#pricing", label: "Pricing" },
    { href: "/clinic#faq", label: "FAQ" },
    { href: "/clinic/guide", label: "Guide" },
  ]
  return (
    <nav className="fixed top-0 inset-x-0 z-50" style={{ background: CREAM, borderBottom: `2px solid ${INK}`, fontFamily: display.fontFamily }}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/clinic" className="flex items-center gap-2.5">
          <img src="/logo.png" alt="Smapey Clinic" className="w-8 h-8 rounded-lg object-cover" />
          <span className="font-extrabold tracking-tight" style={{ color: INK }}>Smapey Clinic</span>
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

export default function ClinicGuideContent() {
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
          <a href="/clinic" className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors mb-8 hover:opacity-60" style={{ color: "#54514c" }}>
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Clinic Manager
          </a>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border-2 text-xs font-bold mb-5" style={{ color: INK, borderColor: INK, boxShadow: `3px 3px 0 ${BLUE}` }}>
            <BookOpen className="w-3 h-3" /> User guide
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight mb-4" style={{ color: INK }}>
            Smapey Clinic Manager <span style={{ color: BLUE }}>Guide</span>
          </h1>
          <p className="text-lg max-w-2xl mx-auto mb-8" style={{ color: "#54514c" }}>
            Everything you need to set up your clinic, manage patients and doctors, book appointments, and run a live queue, step by step.
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
              <p className="text-sm font-medium" style={{ color: "#5c4a28" }}>Create your free clinic account and have your queue running today.</p>
            </div>
            <a href={REGISTER_URL} className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm border-2 transition-transform hover:-translate-y-0.5 shrink-0" style={{ ...display, background: INK, color: "#fff", borderColor: INK }}>
              Start for free <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      <InternalLinks cluster="clinic" currentPath="/clinic/guide" />

      <footer className="px-6 py-8" style={{ background: CREAM, borderTop: `2px solid ${INK}` }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Smapey" className="w-6 h-6 rounded-md object-cover" />
            <span className="text-sm font-extrabold" style={{ color: INK }}>Clinic Manager by Smapey</span>
          </div>
          <p className="text-xs" style={{ color: "#9a948b" }}>© {new Date().getFullYear()} Smapey. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}
